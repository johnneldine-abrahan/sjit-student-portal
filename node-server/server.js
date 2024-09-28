const express = require('express');
const path = require('path');
const { Pool } = require('pg');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs'); // Use bcrypt for password hashing

const app = express();
const port = 3000;
const SECRET_KEY = 'your-secret-key'; // Change this to a secure key

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'SJIT_db',
    password: 'admin',
    port: 5432,
});

app.use(cors());
app.use(express.json());

app.post("/login", async (req, res) => {
    const { username, password } = req.body;

    try {
        // Query to find the user by username
        const result = await pool.query("SELECT * FROM accountstbl WHERE user_id = $1", [username]);
        const user = result.rows[0];

        // Check if the user exists
        if (!user) {
            console.error("User not found");
            return res.status(401).json("Invalid username or password!");
        }

        // If user is a student, fetch additional data from studenttbl
        if (user.user_role === 'Student') {
            // Query to join enrollmenttbl, sectiontbl, and studenttbl
            const studentQuery = `
            SELECT s.last_name, s.first_name, s.middle_name, sec.program, sec.grade_level, sec.school_year, sec.semester, e.enrollment_status 
            FROM enrollmenttbl e
            INNER JOIN sectiontbl sec ON e.section_id = sec.section_id
            INNER JOIN studenttbl s ON e.student_id = s.student_id
            WHERE e.student_id = $1
            ORDER BY sec.school_year DESC, sec.semester DESC
            LIMIT 1
        `;

            const studentResult = await pool.query(studentQuery, [user.user_id]);
            const studentData = studentResult.rows[0];

            if (!studentData) {
                return res.status(404).json("Student data not found!");
            }

            // Format the full name with middle initial
            const middleInitial = studentData.middle_name ? studentData.middle_name.charAt(0) + "." : "";
            const fullName = `${studentData.last_name}, ${studentData.first_name} ${middleInitial}`;

            // Create JWT token with student data
            const token = jwt.sign(
                {
                    userId: user.user_id,
                    role: user.user_role,
                    fullName,
                    program: studentData.program,
                    gradeLevel: studentData.grade_level,
                    schoolYear: studentData.school_year,
                    semester: studentData.semester,
                    enrollmentStatus: studentData.enrollment_status
                },
                SECRET_KEY,
                { expiresIn: "1h" }
            );

            return res.json({ message: "Login successful!", token, userRole: user.user_role });
        }

        if (user.user_role === 'Faculty') {
            // Query to join facultytbl, teachingload_tbl, and sectiontbl
            const facultyQuery = `
                SELECT f.last_name, f.first_name, f.middle_name, f.user_role, sec.school_year, sec.semester
                FROM facultytbl f
                INNER JOIN teachingload_tbl t ON f.faculty_id = t.faculty_id
                INNER JOIN sectiontbl sec ON t.section_id = sec.section_id
                WHERE f.faculty_id = $1
                ORDER BY sec.school_year DESC, sec.semester DESC
                LIMIT 1
            `;

            const facultyResult = await pool.query(facultyQuery, [user.user_id]);
            const facultyData = facultyResult.rows[0];

            if (!facultyData) {
                return res.status(404).json("Faculty or schedule data not found!");
            }

            // Format the full name with middle initial
            const middleInitial = facultyData.middle_name ? facultyData.middle_name.charAt(0) + "." : "";
            const fullName = `${facultyData.last_name}, ${facultyData.first_name} ${middleInitial}`;

            // Create JWT token with faculty data
            const token = jwt.sign(
                {
                    userId: user.user_id,
                    role: facultyData.user_role,
                    fullName,
                    schoolYear: facultyData.school_year,
                    semester: facultyData.semester
                },
                SECRET_KEY,
                { expiresIn: "1h" }
            );

            return res.json({ message: "Login successful!", token, userRole: user.user_role });
        }

        // Create JWT token for other roles (Admin, Finance, etc.)
        const token = jwt.sign(
            {
                userId: user.user_id,
                firstName: user.first_name,
                lastName: user.last_name,
                role: user.user_role
            },
            SECRET_KEY,
            { expiresIn: "1h" }
        );

        return res.json({ message: "Login successful!", token, userRole: user.user_role });
    } catch (err) {
        console.error("Error during login:", err);
        return res.status(500).json({ message: "Error while querying the database." });
    }
});

// Middleware to protect routes
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.sendStatus(401);

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
}

// Example protected route
app.get('/profile', authenticateToken, (req, res) => {
    res.json({
        userId: req.user.userId,
        firstName: req.user.firstName,
        lastName: req.user.lastName,
        role: req.user.role
    });
});

app.get('/students', async (req, res) => {
    try {
        // Query to fetch student_id, last_name, first_name, middle_name, program, and grade_level from studenttbl
        const query = `
            SELECT student_id, last_name, first_name, middle_name, program, grade_level 
            FROM studenttbl
        `;

        // Execute the query
        const result = await pool.query(query);
        const students = result.rows;

        // Send the result back as JSON
        res.status(200).json(students);
    } catch (error) {
        console.error("Error fetching student data:", error);
        res.status(500).json({ message: "Error fetching student data." });
    }
});

app.post("/registerStudent", async (req, res) => {
    const {
        lrn, first_name, middle_name, last_name, birth_date, sex, place_of_birth, nationality, religion, civil_status,
        birth_order, contact_number, program, grade_level, strand, financial_support, scholarship_grant,
        school_name, years_attended, honors_awards, school_address,
        address, city_municipality, province, country, zip_code,
        name_father, occupation_father, contact_father,
        name_mother, occupation_mother, contact_mother,
        guardian_name, relationship, guardian_address, contact_guardian
    } = req.body;

    // Generate a common student_id, user_id, and password
    const randomNumber = Math.floor(10000 + Math.random() * 90000); // Generates a 5-digit random number
    const student_id = `24-${randomNumber}`;
    const user_id = student_id;
    const password = student_id; // Optionally hash the password with bcrypt if needed
    const user_role = "Student";
    const student_type = "New";

    // Default profile picture (update this to your default image URL or file path)
    const defaultProfilePicture = "src\assets\img\Profile\default_profile.png"; // Replace with actual path or URL

    const client = await pool.connect();

    // Define the generateUniqueId function
    function generateUniqueId(prefix = "") {
        const randomPart = Math.floor(100000 + Math.random() * 900000); // Generates a 6-digit random number
        return `${prefix}${randomPart}`;
    }

    try {
        await client.query('BEGIN'); // Start transaction

        // Insert into accountstbl
        const accountQuery = `
            INSERT INTO accountstbl (user_id, first_name, middle_name, last_name, user_role, password)
            VALUES ($1, $2, $3, $4, $5, $6)
        `;
        await client.query(accountQuery, [
            user_id, first_name, middle_name, last_name, user_role, password // Password can be hashed if needed
        ]);

        // Insert into studentstbl
        const studentQuery = `
            INSERT INTO studenttbl (student_id, student_type, lrn, first_name, middle_name, last_name, birth_date, sex, place_of_birth, nationality, religion, civil_status, birth_order, contact_number, program, grade_level, strand, user_id, financial_support, scholarship_grant, profile)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21)
        `;
        await client.query(studentQuery, [
            student_id, student_type, lrn, first_name, middle_name, last_name, birth_date, sex, place_of_birth, nationality, religion,
            civil_status, birth_order, contact_number, program, grade_level, strand, user_id, financial_support, scholarship_grant, defaultProfilePicture // Adding default profile picture here
        ]);

        // Insert into school_historytbl
        const schoolHistoryQuery = `
            INSERT INTO school_historytbl (sh_id, student_id, school_name, years_attended, honors_awards, school_address)
            VALUES ($1, $2, $3, $4, $5, $6)
        `;
        const sh_id = generateUniqueId(); // Call the unique ID function for school history
        await client.query(schoolHistoryQuery, [
            sh_id, student_id, school_name, years_attended, honors_awards, school_address
        ]);

        // Insert into addresstbl
        const address_id = generateUniqueId("addr-"); // Generate unique address ID
        const addressQuery = `
            INSERT INTO address_tbl (address_id, student_id, address, city_municipality, province, country, zip_code)
            VALUES ($1, $2, $3, $4, $5, $6, $7)
        `;
        await client.query(addressQuery, [
            address_id, student_id, address, city_municipality, province, country, zip_code
        ]);

        // Insert into contacttbl
        const contact_id = generateUniqueId("cont-"); // Generate unique contact ID
        const contactQuery = `
            INSERT INTO contacttbl (contact_id, student_id, name_father, occupation_father, contact_father, name_mother, occupation_mother, contact_mother)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        `;
        await client.query(contactQuery, [
            contact_id, student_id, name_father, occupation_father, contact_father, name_mother, occupation_mother, contact_mother
        ]);

        // Insert into emergency_contacttbl
        const e_contact_id = generateUniqueId("econt-"); // Generate unique emergency contact ID
        const emergencyContactQuery = `
            INSERT INTO emergency_contacttbl (e_contact_id, student_id, guardian_name, relationship, guardian_address, contact_guardian)
            VALUES ($1, $2, $3, $4, $5, $6)
        `;
        await client.query(emergencyContactQuery, [
            e_contact_id, student_id, guardian_name, relationship, guardian_address, contact_guardian
        ]);

        await client.query('COMMIT'); // Commit the transaction
        res.status(200).json({ message: "Student registered successfully with default profile picture!" });
    } catch (error) {
        await client.query('ROLLBACK'); // Roll back the transaction in case of error
        console.error("Error inserting student data transactionally:", error);
        res.status(500).json({ message: "Error inserting student data." });
    } finally {
        client.release();
    }
});

app.delete('/deleteStudent', async (req, res) => {
    const { studentIds } = req.body; // Array of student_ids to delete

    const client = await pool.connect();
    try {
        await client.query('BEGIN'); // Start transaction

        // Step 1: Delete from emergency_contacttbl first
        await client.query('DELETE FROM emergency_contacttbl WHERE student_id = ANY($1)', [studentIds]);

        // Step 2: Delete from other dependent tables as needed
        await client.query('DELETE FROM contacttbl WHERE student_id = ANY($1)', [studentIds]);
        await client.query('DELETE FROM address_tbl WHERE student_id = ANY($1)', [studentIds]);
        await client.query('DELETE FROM school_historytbl WHERE student_id = ANY($1)', [studentIds]);

        // Step 3: Delete from studenttbl
        await client.query('DELETE FROM studenttbl WHERE student_id = ANY($1)', [studentIds]);

        // Step 4: Finally delete from accountstbl
        await client.query('DELETE FROM accountstbl WHERE user_id = ANY($1)', [studentIds]);

        await client.query('COMMIT'); // Commit transaction
        res.status(200).json({ message: "Selected students deleted successfully." });
    } catch (error) {
        await client.query('ROLLBACK'); // Rollback transaction on error
        console.error("Error deleting students:", error);
        res.status(500).json({ message: "Error deleting students." });
    } finally {
        client.release();
    }
});

app.get('/faculties', async (req, res) => {
    try {
      const result = await pool.query('SELECT * FROM facultytbl');
      res.status(200).json(result.rows);
    } catch (error) {
      console.error('Error fetching faculty data:', error);
      res.status(500).json({ error: 'Failed to fetch faculty data' });
    }
  });

app.post('/registerFaculty', async (req, res) => {
    const client = await pool.connect();
    try {
        const { first_name, middle_name, last_name } = req.body;

        // Generate a unique faculty_id, user_id, and password in "FC-XXXXX" format
        const randomNum = Math.floor(10000 + Math.random() * 90000);
        const user_id = `FC-${randomNum}`;
        const password = user_id; // Same as user_id
        const defaultProfilePicture = "src\assets\img\Profile\default_profile.png";

        // SQL transaction to insert into both facultytbl and accountstbl
        await client.query('BEGIN');

        // Insert into accountstbl
        const accountQuery = `
         INSERT INTO accountstbl (user_id, first_name, middle_name, last_name, password, user_role)
         VALUES ($1, $2, $3, $4, $5, 'Faculty')
        `;
        await client.query(accountQuery, [user_id, first_name, middle_name, last_name, password]);

        // Insert into facultytbl
        const facultyQuery = `
            INSERT INTO facultytbl (faculty_id, first_name, middle_name, last_name, user_role, user_id, profile)
            VALUES ($1, $2, $3, $4, 'Faculty', $5, $6)
        `;
        await client.query(facultyQuery, [user_id, first_name, middle_name, last_name, user_id, defaultProfilePicture]);

        await client.query('COMMIT');
        res.status(201).send('Faculty registered successfully.');
    } catch (error) {
        await client.query('ROLLBACK');
        console.error('Error registering faculty:', error);
        res.status(500).send('Failed to register faculty.');
    } finally {
        client.release();
    }
});

app.delete('/deleteFaculty', async (req, res) => {
    const { facultyIds } = req.body;

    if (!facultyIds || facultyIds.length === 0) {
        return res.status(400).send('No faculty IDs provided for deletion');
    }

    try {
        // Start a transaction
        await pool.query('BEGIN');

        // First, delete from facultytbl
        const deleteFaculties = `
            DELETE FROM facultytbl 
            WHERE faculty_id = ANY($1)`;
        await pool.query(deleteFaculties, [facultyIds]);

        // Then, delete from accountstbl
        const deleteAccounts = `
            DELETE FROM accountstbl 
            WHERE user_id IN (
                SELECT user_id 
                FROM facultytbl 
                WHERE faculty_id = ANY($1)
            )`;
        await pool.query(deleteAccounts, [facultyIds]);

        // Commit transaction
        await pool.query('COMMIT');

        res.status(200).send('Faculty and associated accounts deleted successfully');
    } catch (error) {
        // Rollback transaction in case of error
        await pool.query('ROLLBACK');
        console.error('Error deleting faculty data:', error);
        res.status(500).send('Internal server error');
    }
});


app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});