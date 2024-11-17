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
    password: 'password',
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
            console.error("User  not found");
            return res.status(401).json("Invalid username or password!");
        }

        // Check if the password is correct
        if (password != user.password) {
            console.error("Invalid password");
            return res.status(401).json("Invalid username or password!");
        }

        // If user is a student, fetch additional data from studenttbl
        if (user.user_role === 'Student') {
            // Query to join enrollmenttbl, sectiontbl, and studenttbl
            const studentQuery = `
            SELECT s.last_name, s.first_name, s.middle_name, s.profile, sec.program, sec.grade_level, sec.school_year, sec.semester, s.student_status
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
                    enrollmentStatus: studentData.student_status,
                    profile: studentData.profile
                },
                SECRET_KEY,
                { expiresIn: "1h" }
            );

            return res.json({ message: "Login successful!", token, userRole: user.user_role });
        }

        if (user.user_role === 'Faculty') {
            // Query to join facultytbl, teachingload_tbl, and sectiontbl
            const facultyQuery = `
                SELECT f.last_name, f.first_name, f.middle_name, f.user_role, f.profile, sec.school_year, sec.semester
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
                    semester: facultyData.semester,
                    profile: facultyData.profile
                },
                SECRET_KEY,
                { expiresIn: "1h" }
            );

            let quarter;
            if (facultyData.semester === 'FIRST') {
                quarter = '1st';
            } else if (facultyData.semester === 'SECOND') {
                quarter = '3rd';
            } else {
                quarter = null; // or some default value
            }

            return res.json({ message: "Login successful!", token, userRole: user.user_role, schoolYear: facultyData.school_year, semester: facultyData.semester, quarter });
        }

        // Create JWT token for other roles (Admin, Finance, etc.)
        const token = jwt.sign(
            {
                userId: user.user_id,
                firstName: user.first_name,
                lastName: user.last_name,
                role: user.user_role,
                profile: user.profile
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

// REGISTER STUDENT FUNCTIONS --------------------------------------------------------------

app.get('/students', async (req, res) => {
    try {
        // Query to fetch student_id, last_name, first_name, middle_name, program, and grade_level from studenttbl
        const query = `
            SELECT student_id, last_name, first_name, middle_name, program, grade_level, student_type, student_status
            FROM studenttbl
            WHERE student_status IN ('Not Enrolled', 'Enrolled')
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
    const student_status = "Not Enrolled";
    const formattedDate = new Date(birth_date).toISOString().split('T')[0];

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
            INSERT INTO studenttbl (student_id, student_type, student_status, lrn, first_name, middle_name, last_name, birth_date, sex, place_of_birth, nationality, religion, civil_status, birth_order, contact_number, program, grade_level, strand, user_id, financial_support, scholarship_grant)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21)
        `;
        await client.query(studentQuery, [
            student_id, student_type, student_status, lrn, first_name, middle_name, last_name, formattedDate, sex, place_of_birth, nationality, religion,
            civil_status, birth_order, contact_number, program, grade_level, strand, user_id, financial_support, scholarship_grant // Adding default profile picture here
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

app.get('/getStudentData/:studentId', async (req, res) => {
    const { studentId } = req.params;

    try {
        // Query student data
        const studentData = await pool.query(`
            SELECT student_id,
                   first_name,
                   middle_name,
                   last_name,
                   lrn,
                   TO_CHAR(birth_date, 'YYYY-MM-DD') AS birth_date,
                   sex,
                   place_of_birth,
                   nationality,
                   religion,
                   civil_status,
                   birth_order,
                   contact_number,
                   program,
                   grade_level,
                   strand,
                   financial_support,
                   scholarship_grant,
                   student_type,
                   student_status
            FROM studenttbl
            WHERE student_id = $1
        `, [studentId]);

        // Check if student data exists
        if (!studentData.rows.length) {
            return res.status(404).json({ error: "Student data not found" });
        }

        // Query other related data
        const accountData = await pool.query(`
            SELECT first_name, middle_name, last_name FROM accountstbl WHERE user_id = $1
        `, [studentId]);

        const schoolHistoryData = await pool.query(`
            SELECT school_name,
                   years_attended,
                   honors_awards,
                   school_address
            FROM school_historytbl
            WHERE student_id = $1
        `, [studentId]);

        const addressData = await pool.query(`
            SELECT address,
                   city_municipality,
                   province,
                   country,
                   zip_code
            FROM address_tbl
            WHERE student_id = $1
        `, [studentId]);

        const contactData = await pool.query(`
            SELECT name_father,
                   occupation_father,
                   contact_father,
                   name_mother,
                   occupation_mother,
                   contact_mother
            FROM contacttbl
            WHERE student_id = $1
        `, [studentId]);

        const emergencyContactData = await pool.query(`
            SELECT guardian_name,
                   relationship,
                   guardian_address,
                   contact_guardian
            FROM emergency_contacttbl
            WHERE student_id = $1
        `, [studentId]);

        // Combine the data into a single response object
        const combinedData = {
            studentData: studentData.rows[0],
            accountData: accountData.rows[0] || null, // Optional
            schoolHistoryData: schoolHistoryData.rows[0] || null, // Optional
            addressData: addressData.rows[0] || null, // Optional
            contactData: contactData.rows[0] || null, // Optional
            emergencyContactData: emergencyContactData.rows[0] || null, // Optional
        };

        // Send the combined data as the response
        res.json(combinedData);
    } catch (error) {
        console.error('Error fetching student data:', error);
        res.status(500).send('Error fetching student data');
    }
});


app.put('/updateStudentData/:studentId', async (req, res) => {
    const { studentId } = req.params;
    const {
      lrn, first_name, middle_name, last_name, birth_date, sex, place_of_birth, nationality, religion, civil_status,
      birth_order, contact_number, program, grade_level, strand, financial_support, scholarship_grant,
      school_name, years_attended, honors_awards, school_address,
      address, city_municipality, province, country, zip_code,
      name_father, occupation_father, contact_father, name_mother, occupation_mother, contact_mother,
      guardian_name, relationship, guardian_address, contact_guardian
    } = req.body;

    try {
      await pool.query('BEGIN'); // Start transaction

      // Update studenttbl
      await pool.query(`
        UPDATE studenttbl SET
        lrn = $1, first_name = $2, middle_name = $3, last_name = $4, birth_date = $5, sex = $6, place_of_birth = $7, nationality = $8, religion = $9, civil_status = $10, birth_order = $11, contact_number = $12, program = $13, grade_level = $14, strand = $15, financial_support = $16, scholarship_grant = $17
        WHERE student_id = $18
      `, [lrn, first_name, middle_name, last_name, birth_date, sex, place_of_birth, nationality, religion, civil_status, birth_order, contact_number, program, grade_level, strand, financial_support, scholarship_grant, studentId]);

      // Update accountstbl
      await pool.query(`
        UPDATE accountstbl SET
        first_name = $1, middle_name = $2, last_name = $3
        WHERE user_id = $4
      `, [first_name, middle_name, last_name, studentId]);

      // Update school_historytbl
      await pool.query(`
        UPDATE school_historytbl SET
        school_name = $1, years_attended = $2, honors_awards = $3, school_address = $4
        WHERE student_id = $5
      `, [school_name, years_attended, honors_awards, school_address, studentId]);

      // Update addresstbl
      await pool.query(`
        UPDATE address_tbl SET
        address = $1, city_municipality = $2, province = $3, country = $4, zip_code = $5
        WHERE student_id = $6
      `, [address, city_municipality, province, country, zip_code, studentId]);

      // Update contacttbl
      await pool.query(`
        UPDATE contacttbl SET
        name_father = $1, occupation_father = $2, contact_father = $3, name_mother = $4, occupation_mother = $5, contact_mother = $6
        WHERE student_id = $7
      `, [name_father, occupation_father, contact_father, name_mother, occupation_mother, contact_mother, studentId]);

      // Update emergency_contacttbl
      await pool.query(`
        UPDATE emergency_contacttbl SET
        guardian_name = $1, relationship = $2, guardian_address = $3, contact_guardian = $4
        WHERE student_id = $5
      `, [guardian_name, relationship, guardian_address, contact_guardian, studentId]);

      await pool.query('COMMIT'); // Commit transaction

      res.send('Student data updated successfully');
    } catch (error) {
        await pool.query('ROLLBACK'); // Rollback transaction in case of error
        console.error('Error updating student data:', error);  // Add detailed logging
        res.status(500).send({ message: 'Error updating student data', error: error.message });
     }     
});

app.put('/students/update-type', async (req, res) => {
    const { student_ids } = req.body;

    // Log received student_ids
    console.log('Received student_ids:', student_ids);

    // Validate student_ids array
    if (!student_ids || !Array.isArray(student_ids) || student_ids.length === 0) {
        console.error('Invalid request data. student_ids must be a non-empty array.');
        return res.status(400).json({ success: false, message: 'Invalid request data. student_ids must be a non-empty array.' });
    }

    // Check if any students are already marked as 'Old'
    const placeholders = student_ids.map((_, index) => `($${index + 1})`).join(',');
    const checkSql = `SELECT student_id, student_type FROM studenttbl WHERE student_id IN (${placeholders})`;

    try {
        const checkResults = await pool.query(checkSql, student_ids);
        console.log('Check results:', checkResults.rows);

        const oldStudents = checkResults.rows.filter(student => student.student_type === 'Old');
        if (oldStudents.length > 0) {
            console.error('Operation invalid: Some selected students are already marked as "Old".');
            return res.status(400).json({ success: false, message: 'Operation invalid: Some selected students are already marked as "Old".' });
        }

        const updateSql = `UPDATE studenttbl SET student_type = 'Old' WHERE student_id IN (${placeholders})`;
        await pool.query(updateSql, student_ids);

        return res.status(200).json({ success: true, message: 'Student type updated successfully.' });
    } catch (error) {
        console.error('Error checking/updating student types:', error);
        return res.status(500).json({ success: false, message: 'Database error.' });
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

app.put('/archiveStudents', async (req, res) => {
    const { studentIds, newStatus } = req.body;

    if (!studentIds || studentIds.length === 0) {
      return res.status(400).json({ error: 'No student IDs provided' });
    }

    try {
      // Begin transaction
      const client = await pool.connect();
      await client.query('BEGIN');

      // Update each student_type and student_status based on the provided studentIds
      const queryText = `UPDATE studenttbl SET student_type = 'Archived', student_status = $1 WHERE student_id = ANY($2::text[])`;
      await client.query(queryText, [newStatus, studentIds]);

      // Commit the transaction
      await client.query('COMMIT');
      client.release();

      res.status(200).json({ message: 'Students updated successfully' });
    } catch (err) {
      // Rollback transaction in case of error
      if (client) await client.query('ROLLBACK');
      res.status(500).json({ error: 'Error archiving students' });
      console.error(err.message);
    }
  });

// Admin - Faculty (CRUD) ------------------------------------------------------------------------------------

app.get('/faculties', async (req, res) => {
    try {
      // Query to fetch faculties where faculty_status is 'Active'
      const result = await pool.query(`
        SELECT *
        FROM facultytbl
        WHERE faculty_status = 'Active'
      `);

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
            INSERT INTO facultytbl (faculty_id, first_name, middle_name, last_name, user_role, user_id, faculty_status)
            VALUES ($1, $2, $3, $4, 'Faculty', $5, 'Active')
        `;
        await client.query(facultyQuery, [user_id, first_name, middle_name, last_name, user_id]);

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

app.get('/faculty/:faculty_id', async (req, res) => {
    const facultyId = req.params.faculty_id;

    try {
        // Assuming you're using PostgreSQL and have a pool or client set up
        const result = await pool.query(
            'SELECT last_name, first_name, middle_name FROM facultytbl WHERE faculty_id = $1',
            [facultyId]
        );

        if (result.rows.length > 0) {
            res.status(200).json(result.rows[0]);  // Send the faculty details as JSON
        } else {
            res.status(404).json({ message: 'Faculty not found' });  // If no faculty is found
        }
    } catch (error) {
        console.error('Error fetching faculty:', error);
        res.status(500).json({ message: 'Internal server error' });  // Handle server errors
    }
});

app.put('/faculty/:faculty_id', async (req, res) => {
    const facultyId = req.params.faculty_id;
    const { last_name, first_name, middle_name } = req.body;

    try {
        const result = await pool.query(
            `UPDATE facultytbl
            SET last_name = $1, first_name = $2, middle_name = $3
            WHERE faculty_id = $4 RETURNING *`,
            [last_name, first_name, middle_name, facultyId]
        );

        if (result.rowCount === 0) {
            return res.status(404).json({ message: 'Faculty not found' });
        }

        res.status(200).json({ message: 'Faculty updated successfully', faculty: result.rows[0] });
    } catch (error) {
        console.error('Error updating faculty:', error);
        res.status(500).json({ message: 'Internal server error' });
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
            WHERE faculty_id = ANY($1)
        `;
        await pool.query(deleteFaculties, [facultyIds]);

        // Then, delete from accountstbl (user_id is the same as faculty_id)
        const deleteAccounts = `
            DELETE FROM accountstbl
            WHERE user_id = ANY($1)
        `;
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

app.put('/archiveFaculty', async (req, res) => {
    const { facultyIds } = req.body;

    if (!facultyIds || facultyIds.length === 0) {
      return res.status(400).json({ error: 'No faculty IDs provided' });
    }

    try {
      // Begin transaction
      const client = await pool.connect();
      await client.query('BEGIN');

      // SQL query to update faculty_status to 'Archived' for provided facultyIds
      const queryText = `
        UPDATE facultytbl
        SET faculty_status = 'Archived'
        WHERE faculty_id = ANY($1::text[])
      `;
      await client.query(queryText, [facultyIds]);

      // Commit the transaction
      await client.query('COMMIT');
      client.release();

      res.status(200).json({ message: 'Faculty members archived successfully' });
    } catch (err) {
      // Rollback transaction in case of error
      if (client) await client.query('ROLLBACK');
      res.status(500).json({ error: 'Error archiving faculty members' });
      console.error(err.message);
    }
});


// Registrar & Finance Announcements ---------------------------------------------------------------------------------

app.post('/addAnnouncement', authenticateToken, async (req, res) => {
    const { announce_to, announcement_type, announcement_title, announcement_text } = req.body;

    // Generate unique announcement ID
    const announcement_id = `ANN-${Math.floor(10000 + Math.random() * 90000)}`;

    // Get the current date and timestamp in the correct format for PostgreSQL
    const announcement_timestamp = new Date().toISOString(); // This will be in the format YYYY-MM-DDTHH:mm:ss.sssZ

    // Get the user_id from the database
    const announcement_by = req.user.userId; // Change to match your JWT structure

    try {
        // Insert the new announcement into the database
        const query = `
            INSERT INTO announcementtbl (
                announcement_id, announce_to, announcement_type,
                announcement_title, announcement_text,
                announcement_timestamp, announcement_by
            )
            VALUES ($1, $2, $3, $4, $5, $6, $7)
        `;
        await pool.query(query, [
            announcement_id, announce_to, announcement_type,
            announcement_title, announcement_text,
            announcement_timestamp, announcement_by
        ]);

        res.status(201).json({ message: 'Announcement added successfully.' });
    } catch (error) {
        console.error("Error adding announcement:", error); // Log the error
        res.status(500).json({ message: 'Error adding announcement.', error: error.message }); // Include error message in response
    }
});

app.get('/getAnnouncement/:id', async (req, res) => {
    const { id } = req.params;  // Assuming you will pass the announcement ID in the URL

    try {
        const query = 'SELECT announce_to, announcement_type, announcement_title, announcement_text, announcement_by FROM announcementtbl WHERE announcement_id = $1';
        const result = await pool.query(query, [id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Announcement not found" });
        }

        // Include the announcement ID in the response
        res.status(200).json({ id: id, ...result.rows[0] }); // Send the found data with ID
    } catch (error) {
        console.error('Error fetching announcement:', error);
        res.status(500).json({ error: "Failed to fetch announcement" });
    }
});

app.put('/updateAnnouncement/:id', async (req, res) => {
    const { id } = req.params;  // Extract the ID from the URL
    const { announce_to, announcement_type, announcement_title, announcement_text } = req.body;

    try {
      const query = `
        UPDATE announcementtbl
        SET announce_to = $1, announcement_type = $2, announcement_title = $3, announcement_text = $4
        WHERE announcement_id = $5
      `;
      const result = await pool.query(query, [
        announce_to, announcement_type, announcement_title, announcement_text, id
      ]);

      if (result.rowCount === 0) {
        // No matching record found, return 404
        return res.status(404).json({ message: 'Announcement not found or no changes made.' });
      }

      res.status(200).json({ message: 'Announcement updated successfully.' });
    } catch (error) {
      console.error("Error updating announcement:", error);
      res.status(500).json({ message: 'Error updating announcement.', error: error.message });
    }
  });  

app.delete('/deleteAnnouncements', async (req, res) => {
    const { announcementIds } = req.body;  // Change to announcementIds

    console.log("Received announcement IDs:", announcementIds); // Updated log message

    if (!announcementIds || !Array.isArray(announcementIds) || announcementIds.length === 0) {
      return res.status(400).json({ error: "Invalid request: No announcement IDs provided" });
    }

    try {
      const query = 'DELETE FROM announcementtbl WHERE announcement_id = ANY($1)';  // Update the query to use announcement_id
      await pool.query(query, [announcementIds]);  // Use announcementIds in the query

      res.status(200).json({ message: "Announcements deleted successfully" });
    } catch (error) {
      console.error('Error deleting announcements:', error);
      res.status(500).json({ error: "Failed to delete announcements" });
    }
});


app.get('/announcements', authenticateToken, async (req, res) => {
    try {
        // Query to select all announcements along with the user ID of the announcer
        const query = `
            SELECT
                a.announcement_id,
                a.announcement_title,
                a.announcement_text,
                LEFT(a.announcement_text, 20) AS preview_text,
                a.announcement_timestamp,
                ac.user_id
            FROM
                announcementtbl a
            JOIN
                accountstbl ac ON a.announcement_by = ac.user_id
            ORDER BY
                a.announcement_timestamp DESC
        `;

        const result = await pool.query(query);

        // Map the results to include all necessary fields
        const announcements = result.rows.map(announcement => ({
            id: announcement.announcement_id, // Include ID for potential editing/deleting
            title: announcement.announcement_title,
            text: announcement.announcement_text, // Full text of the announcement
            preview: announcement.preview_text,
            timestamp: announcement.announcement_timestamp,
            userId: announcement.user_id // Include user ID in the response
        }));

        res.status(200).json(announcements); // Respond with the announcements array
    } catch (error) {
        console.error("Error fetching announcements:", error); // Log the error
        res.status(500).json({ message: 'Error fetching announcements.', error: error.message }); // Include error message in response
    }
});

// Manage Accounts --------------------------------------------------------------------------------------

app.post('/registerAccount', async (req, res) => {
    const { first_name, middle_name, last_name, user_role } = req.body;

    try {
        // Generate a random 5-digit number
        const randomNumber = Math.floor(10000 + Math.random() * 90000);

        // Determine the user_id and password format based on user_role
        let user_id;
        if (user_role === 'Registrar') {
            user_id = `RG-${randomNumber}`;
        } else if (user_role === 'Finance') {
            user_id = `FN-${randomNumber}`;
        } else {
            return res.status(400).json({ message: "Invalid user role!" });
        }

        const password = user_id; // Set password as the same value as user_id
        const finance_id = user_id;
        const registrar_id = user_id;

        // Insert into accountstbl
        const accountQuery = `
            INSERT INTO accountstbl (user_id, first_name, middle_name, last_name, password, user_role)
            VALUES ($1, $2, $3, $4, $5, $6)
        `;
        await pool.query(accountQuery, [user_id, first_name, middle_name, last_name, password, user_role]);

        // Insert into role-specific table
        if (user_role === 'Finance') {
            const financeQuery = `
                INSERT INTO financetbl (finance_id, first_name, middle_name, last_name, user_role, user_id, status)
                VALUES ($1, $2, $3, $4, $5, $6, 'Active')
            `;
            await pool.query(financeQuery, [finance_id, first_name, middle_name, last_name, user_role, user_id]);
        } else if (user_role === 'Registrar') {
            const registrarQuery = `
                INSERT INTO registrartbl (registrar_id, first_name, middle_name, last_name, user_role, user_id, status)
                VALUES ($1, $2, $3, $4, $5, $6, 'Active')
            `;
            await pool.query(registrarQuery, [registrar_id, first_name, middle_name, last_name, user_role, user_id]);
        }

        res.status(200).json({ message: "Account registered successfully!", user_id});
    } catch (error) {
        console.error("Error registering account:", error);
        res.status(500).json({ message: "Error registering account." });
    }
});

app.put('/update-account/:id', (req, res) => {
    const accountId = req.params.id;
    const { first_name, middle_name, last_name, password } = req.body;

    // Correct SQL Query for PostgreSQL
    const query = `
        UPDATE accountstbl
        SET
            first_name = $1,
            middle_name = $2,
            last_name = $3,
            password = $4
        WHERE user_id = $5;
    `;

    // Execute the query
    pool.query(query, [first_name, middle_name, last_name, password, accountId], (err, result) => {
        if (err) {
            console.error('Error updating data:', err);
            return res.status(500).json({ message: 'Database error' });
        }

        if (result.rowCount === 0) {
            return res.status(404).json({ message: 'Account not found' });
        }

        res.json({ message: 'Account updated successfully' });
    });
});

app.delete('/deleteAccounts', async (req, res) => {
    const { user_ids } = req.body;

    if (!Array.isArray(user_ids) || user_ids.length === 0) {
        return res.status(400).json({ message: "No accounts selected for deletion." });
    }

    try {
        // Begin a transaction to ensure atomicity
        await pool.query('BEGIN');

        // Fetch user roles for each user_id to determine which tables to delete from
        const roleQuery = 'SELECT user_id, user_role FROM accountstbl WHERE user_id = ANY($1)';
        const roleResult = await pool.query(roleQuery, [user_ids]);

        // Separate the user_ids by their roles
        const financeIds = [];
        const registrarIds = [];

        roleResult.rows.forEach(row => {
            if (row.user_role === 'Finance') {
                financeIds.push(row.user_id);
            } else if (row.user_role === 'Registrar') {
                registrarIds.push(row.user_id);
            }
        });

        // Delete from role-specific tables based on the user_id's role
        if (financeIds.length > 0) {
            const deleteFinanceQuery = 'DELETE FROM financetbl WHERE user_id = ANY($1)';
            await pool.query(deleteFinanceQuery, [financeIds]);
        }

        if (registrarIds.length > 0) {
            const deleteRegistrarQuery = 'DELETE FROM registrartbl WHERE user_id = ANY($1)';
            await pool.query(deleteRegistrarQuery, [registrarIds]);
        }

        // Now delete from accountstbl after role-specific tables are cleared
        const deleteAccountQuery = 'DELETE FROM accountstbl WHERE user_id = ANY($1)';
        await pool.query(deleteAccountQuery, [user_ids]);

        // Commit the transaction if all deletes succeed
        await pool.query('COMMIT');

        res.status(200).json({ message: "Accounts and role-specific records deleted successfully!" });
    } catch (error) {
        // Rollback in case of error
        await pool.query('ROLLBACK');

        // Improved error logging
        console.error("Error deleting accounts:", {
            message: error.message,
            stack: error.stack,
            detail: error.detail || 'No additional details'
        });

        // Send back a more informative response
        res.status(500).json({
            message: "Error deleting accounts.",
            error: error.message,
            detail: error.detail
        });
    }
});


app.get('/getAccounts', async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT user_id, last_name, first_name, middle_name, user_role, status
            FROM financetbl
            WHERE user_role != 'Admin'
            
            UNION
            
            SELECT user_id, last_name, first_name, middle_name, user_role, status
            FROM registrartbl
            WHERE user_role != 'Admin'
        `);
        
        const accounts = result.rows;
        res.status(200).json(accounts);
    } catch (error) {
        console.error("Error fetching accounts:", error);
        res.status(500).json({ message: "Error fetching accounts." });
    }
});


// Manage Schedules -----------------------------------------------------------------------------

app.get('/getSubjects', async (req, res) => {
    try {
        const gradeLevel = req.query.gradeLevel;
        const strand = req.query.strand; // Get the strand from query parameters
        let query = 'SELECT subject_id, subject_name FROM subjecttbl';
        let params = [];

        if (gradeLevel) {
            query += ' WHERE grade_level = $1';
            params = [gradeLevel];
        }

        // Handle strand filtering
        if (strand) {
            if (strand === "Science, Technology, Engineering and Mathematics (STEM)") {
                query += (params.length ? ' AND' : ' WHERE') + ' (strand_classification = $' + (params.length + 1) + ' OR strand_classification = \'All\')';
                params.push('Science, Technology, Engineering and Mathematics (STEM)');
            } else if (strand === "Accountancy, Business and Management (ABM)") {
                query += (params.length ? ' AND' : ' WHERE') + ' (strand_classification = $' + (params.length + 1) + ' OR strand_classification = \'All\')';
                params.push('Accountancy, Business and Management (ABM)');
            } else if (strand === "Humanities and Social Sciences (HUMSS)") {
                query += (params.length ? ' AND' : ' WHERE') + ' (strand_classification = $' + (params.length + 1) + ' OR strand_classification = \'All\')';
                params.push('Humanities and Social Sciences (HUMSS)');
            } else if (strand === "TVL - Industrial Arts (TVL-IA)") {
                query += (params.length ? ' AND' : ' WHERE') + ' (strand_classification = $' + (params.length + 1) + ' OR strand_classification = \'All\' OR strand_classification = \'TVL\')';
                params.push('TVL - Industrial Arts (TVL-IA)');
            } else if (strand === "TVL - Home Economics (TVL-HE)") {
                query += (params.length ? ' AND' : ' WHERE') + ' (strand_classification = $' + (params.length + 1) + ' OR strand_classification = \'All\' OR strand_classification = \'TVL\')';
                params.push('TVL - Home Economics (TVL-HE)');
            } else if (strand === "TVL - Information Communications Technology (TVL-ICT)") {
                query += (params.length ? ' AND' : ' WHERE') + ' (strand_classification = $' + (params.length + 1) + ' OR strand_classification = \'All\' OR strand_classification = \'TVL\')';
                params.push('TVL - Information Communications Technology (TVL-ICT)');
            }
        }

        const result = await pool.query(query, params);
        res.json(result.rows); // Send the list of subjects to the frontend
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});

app.get('/getFaculty', async (req, res) => {
    try {
        // Query to select faculty_id, last_name, first_name, and middle_name where faculty_status is 'Active'
        const result = await pool.query(`
        SELECT
          faculty_id,
          last_name,
          first_name,
          middle_name
        FROM facultytbl
        WHERE faculty_status = 'Active'
      `);

        // Format the data to include the middle initial
        const formattedFaculty = result.rows.map(faculty => {
            const middleInitial = faculty.middle_name ? `${faculty.middle_name.charAt(0)}.` : ''; // Get middle initial
            const fullName = `${faculty.last_name}, ${faculty.first_name} ${middleInitial}`.trim(); // Format full name
            return {
                faculty_id: faculty.faculty_id,
                full_name: fullName,
            };
        });

        // Send the formatted faculty data to the frontend
        res.json(formattedFaculty);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});


app.post("/addSection", async (req, res) => {
    const client = await pool.connect();

    try {
      const {
        subject_id,
        grade_level,
        strand,
        section_name,
        semester,
        school_year,
        program,
        faculty_name,
        schedules,
        faculty_id,
        slot,
      } = req.body;

      // Generate section_id
      const section_id = `${section_name}_${subject_id}_${school_year}_${semester}`;

      // Set section_status to 'Active'
      const section_status = "Active";

      // Insert into sectiontbl
      const insertSectionQuery = `
              INSERT INTO sectiontbl (section_id, subject_id, grade_level, strand, section_name, semester, school_year, program, faculty_name, slot, section_status)
              VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING section_id;
          `;
      const sectionValues = [
        section_id,
        subject_id,
        grade_level,
        strand,
        section_name,
        semester,
        school_year,
        program,
        faculty_name,
        slot,
        section_status,
      ];

      await client.query("BEGIN");
      const sectionResult = await client.query(insertSectionQuery, sectionValues);

      // Insert into scheduletbl (can have multiple schedules)
      const insertScheduleQuery = `
              INSERT INTO scheduletbl (schedule_id, section_id, day, start_time, end_time, room)
              VALUES ($1, $2, $3, $4, $5, $6);
          `;

      for (const schedule of schedules) {
        // Generate schedule_id as section_name + random 5 digit number
        const schedule_id = `${section_name}_${Math.floor(
          10000 + Math.random() * 90000
        )}`;
        const scheduleValues = [
          schedule_id,
          section_id,
          schedule.day,
          schedule.start_time,
          schedule.end_time,
          schedule.room,
        ];
        await client.query(insertScheduleQuery, scheduleValues);
      }

      // Insert into teachingload_tbl
      const insertTeachingLoadQuery = `
              INSERT INTO teachingload_tbl (teachingload_id, faculty_id, section_id)
              VALUES ($1, $2, $3);
          `;

      // Generate teachingload_id as a random 5 digit number
      const teachingload_id = `TL_${Math.floor(10000 + Math.random() * 90000)}`;
      const teachingLoadValues = [teachingload_id, faculty_id, section_id];
      await client.query(insertTeachingLoadQuery, teachingLoadValues);

      // Commit the transaction
      await client.query("COMMIT");
      res.status(201).json({
        message: "Section, Schedule, and Teaching Load successfully added!",
      });
    } catch (error) {
      await client.query("ROLLBACK");
      console.error(error);
      res.status(500).json({ message: "Error adding data", error });
    } finally {
      client.release();
    }
  });

  app.get("/getSections", async (req, res) => {
    try {
      const query = `
          SELECT
              sectiontbl.section_id,
              sectiontbl.grade_level,
              sectiontbl.section_name,
              subjecttbl.subject_name,
              sectiontbl.semester,
              sectiontbl.school_year,
              sectiontbl.strand,
              sectiontbl.faculty_name,
              sectiontbl.section_status
          FROM sectiontbl
          JOIN subjecttbl ON sectiontbl.subject_id = subjecttbl.subject_id
          WHERE sectiontbl.section_status = 'Active';  -- Filter for active sections
        `;
      const result = await pool.query(query);
      res.status(200).json(result.rows);
    } catch (error) {
      console.error("Error executing query:", error);
      res.status(500).send("Internal Server Error");
    }
  });

  app.get("/getSection/:section_id", async (req, res) => {
    const client = await pool.connect();

    try {
        const { section_id } = req.params;

        // Query to get section details
        const sectionQuery = `
            SELECT * FROM sectiontbl WHERE section_id = $1;
        `;
        const sectionResult = await client.query(sectionQuery, [section_id]);

        if (sectionResult.rows.length === 0) {
            return res.status(404).json({ message: "Section not found" });
        }

        const sectionData = sectionResult.rows[0];

        // Query to get schedules related to the section
        const scheduleQuery = `
            SELECT * FROM scheduletbl WHERE section_id = $1;
        `;
        const scheduleResult = await client.query(scheduleQuery, [section_id]);

        // Query to get teaching loads related to the section
        const teachingLoadQuery = `
            SELECT * FROM teachingload_tbl WHERE section_id = $1;
        `;
        const teachingLoadResult = await client.query(teachingLoadQuery, [section_id]);

        // Combine the results
        const responseData = {
            section: sectionData,
            schedules: scheduleResult.rows,
            teachingLoads: teachingLoadResult.rows,
        };

        res.status(200).json(responseData);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching data", error });
    } finally {
        client.release();
    }
});

  app.delete("/deleteSections", async (req, res) => {
    const { selectedSections } = req.body; // selectedSections is expected to be an array of section IDs

    if (!selectedSections || selectedSections.length === 0) {
      return res
        .status(400)
        .json({ message: "No sections selected for deletion" });
    }

    const client = await pool.connect(); // Connect to the database

    try {
      await client.query("BEGIN"); // Begin transaction

      // Convert each section ID to a string to match the database type
      const sectionIds = selectedSections.map((id) => String(id));

      // Delete associated schedules from scheduletbl
      const deleteScheduleQuery = `
          DELETE FROM scheduletbl
          WHERE section_id = ANY($1::text[]);
        `;
      await client.query(deleteScheduleQuery, [sectionIds]);

      // Delete associated teaching loads from teachingload_tbl
      const deleteTeachingLoadQuery = `
          DELETE FROM teachingload_tbl
          WHERE section_id = ANY($1::text[]);
        `;
      await client.query(deleteTeachingLoadQuery, [sectionIds]);

      // Delete sections from sectiontbl
      const deleteSectionsQuery = `
          DELETE FROM sectiontbl
          WHERE section_id = ANY($1::text[]);
        `;
      await client.query(deleteSectionsQuery, [sectionIds]);

      await client.query("COMMIT"); // Commit transaction
      res.status(200).json({
        message: "Sections and their related data deleted successfully",
      });
    } catch (error) {
      await client.query("ROLLBACK"); // Rollback transaction on error
      console.error("Error deleting sections:", error);
      res
        .status(500)
        .json({ message: "Error deleting sections", error: error.message });
    } finally {
      client.release(); // Release the client back to the pool
    }
  });
  // archive sections
  app.post("/archiveSections", async (req, res) => {
    const { selectedSections } = req.body; // selectedSections is expected to be an array of section IDs

    if (!selectedSections || selectedSections.length === 0) {
      return res
        .status(400)
        .json({ message: "No sections selected for archiving" });
    }

    const client = await pool.connect(); // Connect to the database

    try {
      await client.query("BEGIN"); // Begin transaction

      // Convert each section ID to a string to match the database type
      const sectionIds = selectedSections.map((id) => String(id));

      // Update section status in sectiontbl
      const archiveSectionsQuery = `
        UPDATE sectiontbl
        SET section_status = 'Archive'
        WHERE section_id = ANY($1::text[]);
      `;
      await client.query(archiveSectionsQuery, [sectionIds]);

      await client.query("COMMIT"); // Commit transaction
      res.status(200).json({ message: "Sections archived successfully" });
    } catch (error) {
      await client.query("ROLLBACK"); // Rollback transaction on error
      console.error("Error archiving sections:", error);
      res
        .status(500)
        .json({ message: "Error archiving sections", error: error.message });
    } finally {
      client.release(); // Release the client back to the pool
    }
  });

// Enrollment -------------------------------------------------------------------------------------

app.get('/students/not-enrolled', async (req, res) => {
    const { grade_level, strand } = req.query;  // Get grade_level and strand from query params

    try {
        // Build the query to fetch full name (last_name, first_name, middle_name) of students
        // where student_status is 'Not Enrolled' and payment_status is NOT 'Paid' or 'Pending'
        let query = `
            SELECT CONCAT(s.last_name, ', ', s.first_name, ' ', s.middle_name) AS full_name, s.grade_level, s.strand
            FROM studenttbl s
            LEFT JOIN enrollmenttbl e ON s.student_id = e.student_id  -- Join with enrollment table
            WHERE s.student_status = 'Not Enrolled'
              AND (e.payment_status IS NULL OR e.payment_status NOT IN ('Paid', 'Pending'))  -- Exclude Paid and Pending
        `;

        // Add conditions for grade_level and strand if provided
        const params = [];
        if (grade_level) {
            query += ` AND s.grade_level = $${params.length + 1}`;
            params.push(grade_level);
        }
        if (strand) {
            query += ` AND s.strand = $${params.length + 1}`;
            params.push(strand);
        }

        // Sort by grade_level, strand, and full_name
        query += ` ORDER BY s.grade_level ASC, s.strand ASC NULLS LAST, full_name ASC`;

        // Execute the query
        const result = await pool.query(query, params);

        // Send the result as a response
        res.json(result.rows);
    } catch (error) {
        console.error('Error fetching not-enrolled students:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

app.get('/students/details', async (req, res) => {
    const { fullName } = req.query;

    try {
        // Query to get student details
        let studentQuery = `
            SELECT CONCAT(last_name, ', ', first_name, ' ', middle_name) AS full_name,
                   student_id, grade_level, strand, profile, program, student_status
            FROM studenttbl
            WHERE CONCAT(last_name, ', ', first_name, ' ', middle_name) = $1
        `;

        // Query to get the latest school_year and semester
        let sectionQuery = `
            SELECT school_year, semester
            FROM sectiontbl
            ORDER BY school_year DESC, semester DESC
            LIMIT 1
        `;

        // Execute both queries
        const studentResult = await pool.query(studentQuery, [fullName]);
        const sectionResult = await pool.query(sectionQuery);

        // Check if the student exists
        if (!studentResult.rows[0]) {
            console.error('No student found for the given full name:', fullName);
            res.status(404).json({ error: 'Student not found' });
            return;
        }

        const studentData = studentResult.rows[0];

        // If profile is present, convert it to base64; otherwise, set it to null
        const profileBuffer = studentData.profile;
        const base64String = profileBuffer ? profileBuffer.toString('base64') : null;

        // Get the latest school_year and semester
        const { school_year, semester } = sectionResult.rows[0];

        // Send response with both student details and school year/semester
        res.json({ ...studentData, profile: base64String, school_year, semester });
    } catch (error) {
        console.error('Error fetching student details:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

app.get('/subjectsPreview', async (req, res) => {
    try {
        const gradeLevel = req.query.gradeLevel; // Get the grade level from query parameters
        const strand = req.query.strand; // Get the strand from query parameters
        let query = 'SELECT subject_id, subject_name FROM subjecttbl';
        let params = [];

        // Build the query based on the presence of parameters
        if (gradeLevel) {
            query += ' WHERE grade_level = $1';
            params.push(gradeLevel);
        }

        // Handle strand filtering
        if (strand) {
            if (strand === "Science, Technology, Engineering and Mathematics (STEM)") {
                query += (params.length ? ' AND' : ' WHERE') + ' (strand_classification = $' + (params.length + 1) + ' OR strand_classification = \'All\')';
                params.push('Science, Technology, Engineering and Mathematics (STEM)');
            } else if (strand === "Accountancy, Business and Management (ABM)") {
                query += (params.length ? ' AND' : ' WHERE') + ' (strand_classification = $' + (params.length + 1) + ' OR strand_classification = \'All\')';
                params.push('Accountancy, Business and Management (ABM)');
            } else if (strand === "Humanities and Social Sciences (HUMSS)") {
                query += (params.length ? ' AND' : ' WHERE') + ' (strand_classification = $' + (params.length + 1) + ' OR strand_classification = \'All\')';
                params.push('Humanities and Social Sciences (HUMSS)');
            } else if (strand === "TVL - Industrial Arts (TVL-IA)") {
                query += (params.length ? ' AND' : ' WHERE') + ' (strand_classification = $' + (params.length + 1) + ' OR strand_classification = \'All\' OR strand_classification = \'TVL\')';
                params.push('TVL - Industrial Arts (TVL-IA)');
            } else if (strand === "TVL - Home Economics (TVL-HE)") {
                query += (params.length ? ' AND' : ' WHERE') + ' (strand_classification = $' + (params.length + 1) + ' OR strand_classification = \'All\' OR strand_classification = \'TVL\')';
                params.push('TVL - Home Economics (TVL-HE)');
            } else if (strand === "TVL - Information Communications Technology (TVL-ICT)") {
                query += (params.length ? ' AND' : ' WHERE') + ' (strand_classification = $' + (params.length + 1) + ' OR strand_classification = \'All\' OR strand_classification = \'TVL\')';
                params.push('TVL - Information Communications Technology (TVL-ICT)');
            }
        }

        const result = await pool.query(query, params);

        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'No subjects found for the specified criteria' });
        }

        res.json(result.rows); // Send the list of subjects to the frontend
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});

app.get('/getSectionsAndSchedules/:subject_id', async (req, res) => {
    const { subject_id } = req.params;

    try {
        const result = await pool.query(`
            SELECT
                s.section_id,
                s.section_name,
                s.semester,
                s.school_year,
                s.program,
                s.strand,
                s.faculty_name,
                s.grade_level,
                s.slot,
                array_agg(json_build_object(
                    'day', sc.day,
                    'start_time', sc.start_time,
                    'end_time', sc.end_time,
                    'room', sc.room
                )) AS schedules
            FROM sectiontbl s
            JOIN scheduletbl sc
            ON s.section_id = sc.section_id
            WHERE s.subject_id = $1
              AND s.section_status = 'Active'  -- Filter for active sections
            GROUP BY s.section_id, s.section_name, s.semester, s.school_year, s.program, s.strand, s.faculty_name, s.grade_level, s.slot
        `, [subject_id]);

        // Log the fetched data to the console
        console.log("Fetched data:", result.rows);

        res.status(200).json(result.rows);
    } catch (error) {
        console.error("Error fetching sections and schedules:", error);
        res.status(500).json({ message: "Error fetching sections and schedules." });
    }
});

// Function to generate enrollment_id as "student_id + random number"
const generateEnrollmentId = (studentId) => {
    const randomNumber = Math.floor(Math.random() * 10000); // Generate a random 4-digit number
    return `${studentId}_${randomNumber}`; // Combine student_id with an underscore and the random number
};

app.post('/enroll', async (req, res) => {
    const { student_id, section_ids } = req.body; // Extract student_id and section_ids from request body
    const enrollment_date = new Date().toISOString().slice(0, 10);
    const payment_status = 'Pending';

    // Validate input
    if (!student_id || !section_ids || !Array.isArray(section_ids) || section_ids.length === 0) {
        return res.status(400).json({ error: 'Invalid input data' });
    }

    const client = await pool.connect();

    try {
        await client.query('BEGIN');

        // Check if the student_id exists in the studenttbl
        const studentCheckQuery = 'SELECT 1 FROM studenttbl WHERE student_id = $1';
        const studentResult = await client.query(studentCheckQuery, [student_id]);

        if (studentResult.rowCount === 0) {
            throw new Error('Student ID does not exist');
        }

        // Check if all section_ids exist in the sectiontbl
        const sectionCheckQuery = `
            SELECT section_id FROM sectiontbl WHERE section_id = ANY($1::text[])
        `;
        const sectionResult = await client.query(sectionCheckQuery, [section_ids]);

        // Extract found section IDs from the database
        const foundSectionIds = sectionResult.rows.map(row => row.section_id);

        // Check for missing section IDs
        const missingSectionIds = section_ids.filter(section_id => !foundSectionIds.includes(section_id));

        if (missingSectionIds.length > 0) {
            throw new Error(`The following section IDs do not exist: ${missingSectionIds.join(', ')}`);
        }

        // Insert enrollment record for each valid section
        for (let section_id of section_ids) {
            const enrollment_id = generateEnrollmentId(student_id); // Generate unique enrollment_id

            const insertQuery = `
                INSERT INTO enrollmenttbl (enrollment_id, student_id, section_id, payment_status, enrollment_date)
                VALUES ($1, $2, $3, $4, $5)
            `;
            const values = [enrollment_id, student_id, section_id, payment_status, enrollment_date];

            await client.query(insertQuery, values); // Insert the record into the database
        }

        await client.query('COMMIT');
        res.status(200).json({ message: 'Enrollment successfully queued' });
    } catch (error) {
        await client.query('ROLLBACK');
        console.error(error.message || error);
        res.status(500).json({ error: error.message || 'Enrollment queueing failed' });
    } finally {
        client.release();
    }
});

// Finance side
app.get('/students/pending', async (req, res) => {
    try {
      const query = `
        SELECT DISTINCT
          s.student_id,
          s.last_name,
          s.first_name,
          s.middle_name,
          s.grade_level,
          'Pending' AS payment_status
        FROM enrollmenttbl e
        JOIN studenttbl s ON e.student_id = s.student_id
        WHERE e.payment_status = $1
      `;
      const values = ['Pending'];

      const result = await pool.query(query, values);

      // Send the merged student details and payment statuses as a response
      res.status(200).json(result.rows);
    } catch (error) {
      console.error('Error fetching students:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

app.put('/students/:student_id/payment-status', async (req, res) => {
    const { student_id } = req.params; // Get the student_id from the URL parameters
    const newStatus = 'Paid'; // New payment status to be set

    try {
        const query = `
            UPDATE enrollmenttbl
            SET payment_status = $1
            WHERE student_id = $2 AND payment_status = 'Pending'
        `;
        const values = [newStatus, student_id];

        const result = await pool.query(query, values);

        // Check if any row was updated
        if (result.rowCount > 0) {
            res.status(200).json({ message: 'Payment status updated successfully' });
        } else {
            res.status(404).json({ error: 'Student not found or payment status not pending' });
        }
    } catch (error) {
        console.error('Error updating payment status:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

  // Admin Side - Confirm Enrollment

  app.get('/students/paid', async (req, res) => {
    try {
        const query = `
            SELECT DISTINCT
                s.student_id,
                s.last_name,
                s.first_name,
                s.middle_name,
                s.grade_level,
                'Paid' AS payment_status
            FROM enrollmenttbl e
            JOIN studenttbl s ON e.student_id = s.student_id
            WHERE e.payment_status = $1
            AND s.student_status = $2
        `;
        const values = ['Paid', 'Not Enrolled'];

        const result = await pool.query(query, values);

        // Send the merged student details and payment statuses as a response
        res.status(200).json(result.rows);
    } catch (error) {
        console.error('Error fetching students:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.put('/students/:student_id/enroll', async (req, res) => {
    const { student_id } = req.params; // Get the student_id from the URL parameters
    const newStatus = 'Enrolled'; // New status to be set

    try {
        const query = `
            UPDATE studenttbl
            SET student_status = $1
            WHERE student_id = $2 AND student_status = 'Not Enrolled'
        `;
        const values = [newStatus, student_id];

        const result = await pool.query(query, values);

        // Check if any row was updated
        if (result.rowCount > 0) {
            res.status(200).json({ message: 'Student status updated to Enrolled successfully' });
        } else {
            res.status(404).json({ error: 'Student not found or status not pending' });
        }
    } catch (error) {
        console.error('Error updating student status:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

  // Archive ---------------------------------------------------------------------------------------

  app.get('/students/archived', async (req, res) => {
    try {
      // Query to fetch all data from studenttbl where student_type = 'Archived'
      const query = `
        SELECT student_id, last_name, first_name, middle_name, student_status
        FROM studenttbl
        WHERE student_type = 'Archived';
      `;
      const result = await pool.query(query);

      // Send the result as a response
      res.json(result.rows);
    } catch (error) {
      console.error('Error fetching archived students:', error);
      res.status(500).json({ error: 'Server error' });
    }
  });

// Faculty ------------------------------------------------------------------------------------------

app.get('/school_years', (req, res) => {
    // Update the query to sort by school_year in descending order
    const query = 'SELECT DISTINCT school_year FROM sectiontbl ORDER BY school_year DESC';

    // Use the pool to get a connection
    pool.query(query, (error, results) => {
        if (error) {
            console.error('Error fetching school years:', error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        res.json(results);
    });
});

app.get('/teacher/subjects', authenticateToken, async (req, res) => {
    const userId = req.user.userId;  // Get the user_id from the JWT token
    const { modalSchoolYear, modalSemester } = req.query; // Destructure schoolYear and semester from query parameters

    try {
        // Step 1: Check if the faculty exists
        const facultyCheckQuery = 'SELECT faculty_id FROM facultytbl WHERE user_id = $1';
        const facultyCheckResult = await pool.query(facultyCheckQuery, [userId]);

        if (facultyCheckResult.rows.length === 0) {
            return res.status(404).json({ message: 'Faculty not found for this user ID.' });
        }

        const facultyId = facultyCheckResult.rows[0].faculty_id;

        // Step 2: Fetch the subjects with filtering by schoolYear and semester
        const query = `
            SELECT
                st.subject_id,
                sec.section_id,
                st.subject_name,
                sec.grade_level,
                sec.strand,
                sec.section_name,
                sec.semester,
                sec.school_year
            FROM
                accountstbl acc
            JOIN
                facultytbl fac ON acc.user_id = fac.user_id
            JOIN
                teachingload_tbl tl ON fac.faculty_id = tl.faculty_id
            JOIN
                sectiontbl sec ON tl.section_id = sec.section_id
            JOIN
                subjecttbl st ON sec.subject_id = st.subject_id
            WHERE
                acc.user_id = $1
                AND sec.school_year = $2
                AND sec.semester = $3
        `;

        const result = await pool.query(query, [userId, modalSchoolYear, modalSemester]);

        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'No subjects found for this faculty member for the specified school year and semester.' });
        }

        // Step 3: Return the filtered subjects
        res.status(200).json(result.rows);
    } catch (error) {
        console.error('Error executing query:', error);
        return res.status(500).json({ error: 'Database query failed' });
    }
});


app.get('/teacher/students/:section_id/:subject_id', authenticateToken, async (req, res) => {
    const userId = req.user.userId; // Get the user_id from the JWT token
    const { section_id, subject_id } = req.params; // Get section_id and subject_id from the request parameters

    try {
        // Step 1: Get the faculty_id based on the user_id
        const facultyResult = await pool.query(`
            SELECT faculty_id FROM facultytbl WHERE user_id = $1
        `, [userId]);

        if (facultyResult.rows.length === 0) {
            return res.status(404).json({ message: 'Faculty not found for the given user ID.' });
        }

        const facultyId = facultyResult.rows[0].faculty_id;

        // Step 2: Check if the faculty teaches the given section and subject
        const teachingLoadResult = await pool.query(`
            SELECT section_id FROM teachingload_tbl
            WHERE faculty_id = $1 AND section_id = $2
        `, [facultyId, section_id]);

        if (teachingLoadResult.rows.length === 0) {
            return res.status(404).json({ message: 'No teaching load found for this faculty in the specified section.' });
        }

        // Step 3: Fetch students enrolled in the specified section, check student_status, and sort by full_name
        const studentsResult = await pool.query(`
            SELECT
                s.student_id,
                CONCAT(s.last_name, ', ', s.first_name, ' ', s.middle_name) AS full_name,
                s.sex
            FROM studenttbl s
            JOIN enrollmenttbl e ON s.student_id = e.student_id
            JOIN sectiontbl sec ON e.section_id = sec.section_id
            WHERE sec.section_id = $1 
              AND sec.subject_id = $2
              AND s.student_status = 'Enrolled'  -- Check if the student is enrolled
            ORDER BY full_name ASC  -- Sort by full_name in ascending order
        `, [section_id, subject_id]);

        // Step 4: Separate students by gender
        const maleStudents = [];
        const femaleStudents = [];

        studentsResult.rows.forEach(student => {
            if (student.sex === 'Male') {
                maleStudents.push(student);
            } else if (student.sex === 'Female') {
                femaleStudents.push(student);
            }
        });

        // Step 5: Return the students separated by gender
        res.status(200).json({
            male: maleStudents,
            female: femaleStudents
        });
    } catch (error) {
        console.error('Error fetching students for section and subject:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

app.get('/faculty-schedules', authenticateToken, async (req, res) => {
    const userId = req.user.userId;
    const { modalSchoolYear, modalSemester } = req.query; // Retrieve schoolYear and semester from query parameters

    try {
        // Check if the faculty exists
        const facultyCheckQuery = 'SELECT faculty_id FROM facultytbl WHERE user_id = $1';
        const facultyCheckResult = await pool.query(facultyCheckQuery, [userId]);

        if (facultyCheckResult.rows.length === 0) {
            return res.status(404).json({ message: 'Faculty not found for this user ID.' });
        }

        const facultyId = facultyCheckResult.rows[0].faculty_id;

        // Fetch schedules with filtering by schoolYear and semester
        const query = `
            SELECT
                st.subject_id,
                st.subject_name,
                sec.grade_level,
                sec.strand,
                sec.section_name,
                sec.semester,
                sec.school_year,
                sch.day,
                sch.start_time,
                sch.end_time,
                sch.room
            FROM
                accountstbl acc
            JOIN
                facultytbl fac ON acc.user_id = fac.user_id
            JOIN
                teachingload_tbl tl ON fac.faculty_id = tl.faculty_id
            JOIN
                sectiontbl sec ON tl.section_id = sec.section_id
            JOIN
                subjecttbl st ON sec.subject_id = st.subject_id
            JOIN
                scheduletbl sch ON sec.section_id = sch.section_id
            WHERE
                acc.user_id = $1
                AND sec.school_year = $2
                AND sec.semester = $3
            `;

        const result = await pool.query(query, [userId, modalSchoolYear, modalSemester]);
        console.log('Query result:', result.rows); // Log the result for debugging

        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'No schedule found for this faculty member for the specified school year and semester.' });
        }

        // Return the filtered schedules
        res.json(result.rows);
    } catch (error) {
        console.error('Error executing query:', error);
        return res.status(500).json({ error: 'Database query failed' });
    }
});


app.get('/grades/:section_id/:subject_id', authenticateToken, async (req, res) => {
    const userId = req.user.userId; // Get the user_id from the JWT token
    const { section_id, subject_id } = req.params; // Get section_id and subject_id from the request parameters
    const quarter = req.headers['quarter']; // Get the quarter from the header

    if (!quarter) {
        return res.status(400).json({ message: 'Quarter is required in the header-title-list.' });
    }

    try {
        // Step 1: Get the faculty_id based on the user_id
        const facultyResult = await pool.query(`
            SELECT faculty_id FROM facultytbl WHERE user_id = $1
        `, [userId]);

        if (facultyResult.rows.length === 0) {
            return res.status(404).json({ message: 'Faculty not found for the given user ID.' });
        }

        const facultyId = facultyResult.rows[0].faculty_id;

        // Step 2: Check if the faculty teaches the given section and subject
        const teachingLoadResult = await pool.query(`
            SELECT section_id FROM teachingload_tbl
            WHERE faculty_id = $1 AND section_id = $2
        `, [facultyId, section_id]);

        if (teachingLoadResult.rows.length === 0) {
            return res.status(404).json({ message: 'No teaching load found for this faculty in the specified section.' });
        }

        // Step 3: Fetch students enrolled in the specified section, check student_status, and sort by full_name
        const studentsResult = await pool.query(`
            SELECT
                s.student_id,
                CONCAT(s.last_name, ', ', s.first_name, ' ', s.middle_name) AS full_name,
                s.sex,
                g.teachingload_id,
                g.grade_id,
                g.grade,
                g.quarter
            FROM studenttbl s
            JOIN enrollmenttbl e ON s.student_id = e.student_id
            JOIN sectiontbl sec ON e.section_id = sec.section_id
            LEFT JOIN gradestbl g ON g.student_id = s.student_id 
                AND g.teachingload_id IN (SELECT teachingload_id FROM teachingload_tbl WHERE section_id = $1)
                AND g.quarter = $3  -- Match the quarter in the header-title-list
            WHERE sec.section_id = $1 
              AND sec.subject_id = $2
              AND s.student_status = 'Enrolled'  -- Check if the student is enrolled
            ORDER BY full_name ASC  -- Sort by full_name in ascending order
        `, [section_id, subject_id, quarter]); // Pass the quarter as a parameter

        // Step 4: Separate students by gender
        const maleStudents = [];
        const femaleStudents = [];

        studentsResult.rows.forEach(student => {
            if (student.sex === 'Male') {
                maleStudents.push(student);
            } else if (student.sex === 'Female') {
                femaleStudents.push(student);
            }
        });

        // Step 5: Return the students separated by gender
        res.status(200).json({
            male: maleStudents,
            female: femaleStudents
        });
    } catch (error) {
        console.error('Error fetching students for section and subject:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

app.post('/add-grade', authenticateToken, async (req, res) => {
    const userId = req.user.userId; // Get the user_id from the JWT token
    const { grades } = req.body; // Get the array of grades from the front-end request
    const quarter = req.headers['quarter']; // Get the quarter from the headers
  
    const client = await pool.connect(); // Start a transaction
  
    try {
      await client.query('BEGIN'); // Start transaction
  
      // Step 1: Check if userId exists in facultytbl
      const facultyQuery = await client.query('SELECT faculty_id FROM facultytbl WHERE user_id = $1', [userId]);
      if (facultyQuery.rows.length === 0) {
        return res.status(404).json({ error: 'Faculty not found' });
      }
  
      const facultyId = facultyQuery.rows[0].faculty_id;
  
      // Step 2: Check if facultyId exists in teachingload_tbl
      const teachingLoadQuery = await client.query('SELECT teachingload_id FROM teachingload_tbl WHERE faculty_id = $1', [facultyId]);
      if (teachingLoadQuery.rows.length === 0) {
        return res.status(404).json({ error: 'Teaching load not found' });
      }
  
      const teachingLoadId = teachingLoadQuery.rows[0].teachingload_id;
  
      // Step 3: Iterate over the grades array and upsert each grade
      for (const { studentId, grade } of grades) {
        // Check if the grade for this student, quarter, and teaching load already exists
        const existingGradeQuery = `
          SELECT grade_id FROM gradestbl 
          WHERE student_id = $1 AND teachingload_id = $2 AND quarter = $3
        `;
        const existingGradeResult = await client.query(existingGradeQuery, [studentId, teachingLoadId, quarter]);
  
        if (existingGradeResult.rows.length > 0) {
          // If grade exists, update it
          const updateGradeQuery = `
            UPDATE gradestbl 
            SET grade = $1 
            WHERE grade_id = $2
          `;
          const gradeId = existingGradeResult.rows[0].grade_id;
          await client.query(updateGradeQuery, [grade, gradeId]);
        } else {
          // If grade does not exist, insert it
          const gradeId = `${studentId}grade${Math.floor(10000 + Math.random() * 90000)}`;
          const insertGradeQuery = `
            INSERT INTO gradestbl (grade_id, teachingload_id, student_id, grade, quarter)
            VALUES ($1, $2, $3, $4, $5)
          `;
          await client.query(insertGradeQuery, [gradeId, teachingLoadId, studentId, grade, quarter]);
        }
      }
  
      // Commit transaction
      await client.query('COMMIT');
      res.status(200).json({ message: 'Grades added/updated successfully' });
    } catch (err) {
      // Rollback transaction on error
      await client.query('ROLLBACK');
      console.error('Error inserting/updating grades:', err);
      res.status(500).json({ error: 'Internal server error' });
    } finally {
      client.release(); // Release the client back to the pool
    }
  });
  

  app.get('/announcements/faculty', (req, res) => {
    const query = `
        SELECT announcement_id, announce_to, announcement_type,
               announcement_title, announcement_text,
               announcement_by, announcement_timestamp
        FROM announcementtbl
        WHERE announce_to IN ('Faculty', 'All')
        ORDER BY announcement_timestamp DESC
        LIMIT 7
    `;

    // Use the pool to query the database
    pool.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching announcements:', err);
            return res.status(500).json({ error: 'Database query failed' });
        }
        res.json(results.rows); // Ensure to return results.rows for proper formatting
    });
});

app.get('/reports/dropdowns', authenticateToken, (req, res) => {
    const userId = req.user.userId; // Assuming the token contains user_id

    // SQL query to fetch faculty_id based on user_id
    const facultySql = `
        SELECT faculty_id FROM facultytbl WHERE user_id = $1
    `;

    pool.query(facultySql, [userId], (error, facultyResults) => {
        if (error) {
            return res.status(500).json({ error: error.message });
        }

        // Check if facultyResults is empty
        if (facultyResults.rowCount === 0) { // Use rowCount for PostgreSQL
            return res.status(404).json({ message: 'Faculty not found' });
        }

        const facultyId = facultyResults.rows[0].faculty_id; // Access faculty_id safely

        // SQL query to fetch dropdown data based on faculty_id
        const dropdownSql = `
            SELECT DISTINCT
                sec.school_year,
                sec.strand,
                sec.section_name,
                sec.grade_level,  -- Include grade_level in the SELECT statement
                sub.subject_name
            FROM
                teachingload_tbl tl
                JOIN sectiontbl sec ON tl.section_id = sec.section_id
                JOIN subjecttbl sub ON sec.subject_id = sub.subject_id
            WHERE
                tl.faculty_id = $1
        `;

        pool.query(dropdownSql, [facultyId], (error, results) => {
            if (error) {
                return res.status(500).json({ error: error.message });
            }

            // Transform results into the desired dropdown structure
            const dropdownData = {
                school_year: [...new Set(results.rows.map(r => r.school_year))],
                strands: [...new Set(results.rows.map(r => r.strand))],
                sections: [...new Set(results.rows.map(r => r.section_name))],
                grade_levels: [...new Set(results.rows.map(r => r.grade_level))], // Add grade_levels
                subjects: [...new Set(results.rows.map(r => r.subject_name))]
            };

            res.json(dropdownData);
        });
    });
});

app.get('/reports/grades', authenticateToken, (req, res) => {
    const { school_year, semester, quarter, grade_level, section, subject } = req.query;
    const userId = req.user.userId; // Extract user ID from the token

    // Fetch faculty ID based on user ID
    const facultyQuery = `SELECT faculty_id FROM facultytbl WHERE user_id = $1`;

    pool.query(facultyQuery, [userId], (facultyError, facultyResult) => {
        if (facultyError) {
            console.error('Error fetching faculty ID:', facultyError);
            return res.status(500).json({ error: facultyError.message });
        }

        if (facultyResult.rowCount === 0) {
            return res.status(404).json({ message: 'Faculty not found' });
        }

        const facultyId = facultyResult.rows[0].faculty_id;

        // Main query to fetch student grades and names
        const gradesQuery = `
            SELECT
                CONCAT(st.last_name, ', ', st.first_name, ' ', st.middle_name) AS full_name,
                gr.grade,
                sec.school_year,
                sec.semester,
                gr.quarter,
                sec.grade_level,
                sec.section_name,
                sub.subject_name
            FROM
                gradestbl gr
            JOIN teachingload_tbl tl ON gr.teachingload_id = tl.teachingload_id
            JOIN sectiontbl sec ON tl.section_id = sec.section_id
            JOIN subjecttbl sub ON sec.subject_id = sub.subject_id
            JOIN enrollmenttbl en ON sec.section_id = en.section_id AND gr.student_id = en.student_id
            JOIN studenttbl st ON en.student_id = st.student_id
            WHERE
                tl.faculty_id = $1
                AND sec.school_year = $2
                AND sec.semester = $3
                AND gr.quarter = $4
                AND sec.grade_level = $5
                AND sec.section_name = $6
                AND sub.subject_name = $7
                AND sub.subject_name != 'HOMEROOM'
            ORDER BY gr.grade DESC LIMIT 10;
        `;

        const queryParams = [
            facultyId,
            school_year,
            semester,
            quarter,
            grade_level,
            section,
            subject
        ];

        pool.query(gradesQuery, queryParams, (gradesError, gradesResult) => {
            if (gradesError) {
                console.error('Error fetching grades:', gradesError);
                return res.status(500).json({ error: gradesError.message });
            }

            if (gradesResult.rowCount === 0) {
                return res.status(404).json({ message: 'No grades found for the given filters' });
            }

            res.json(gradesResult.rows);
        });
    });
});


// Student ------------------------------------------------------------------------------------------

app.get('/schedule', authenticateToken, async (req, res) => {
    const userId = req.user.userId; // Ensure this matches your JWT payload
    const { modalSchoolYear, modalSemester } = req.query; // Extract parameters from the query string

    // Validate the parameters
    if (!modalSchoolYear || !modalSemester) {
        return res.status(400).json({ error: 'Both school year and semester are required.' });
    }

    const query = `
        SELECT DISTINCT
            sub.subject_id,  -- Include subject_id in the selection
            sub.subject_name,
            sec.section_name,
            sec.school_year,   -- Added school_year
            sec.semester,      -- Added semester
            sec.grade_level,    -- Added grade_level from sectiontbl
            sch.day,
            sch.start_time,
            sch.end_time,
            sch.room,
            sec.faculty_name
        FROM
            accountstbl AS acc
        JOIN
            studenttbl AS stu ON acc.user_id = stu.user_id
        JOIN
            enrollmenttbl AS enroll ON stu.student_id = enroll.student_id
        JOIN
            sectiontbl AS sec ON enroll.section_id = sec.section_id
        JOIN
            subjecttbl AS sub ON sec.subject_id = sub.subject_id
        JOIN
            scheduletbl AS sch ON sec.section_id = sch.section_id
        WHERE
            acc.user_id = $1
            AND sec.school_year = $2
            AND sec.semester = $3
        ORDER BY
            sch.day, sch.start_time;
    `;

    try {
        const { rows } = await pool.query(query, [userId, modalSchoolYear, modalSemester]);

        if (rows.length > 0) {
            return res.status(200).json(rows);
        } else {
            return res.status(404).json({ message: 'No schedule found for this user.' });
        }
    } catch (error) {
        console.error('Database error:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});

app.get('/grades', authenticateToken, async (req, res) => {
    const userId = req.user.userId; // Ensure this matches how user ID is stored
    const { modalSchoolYear, modalSemester, quarterState } = req.query;

    if (!modalSchoolYear || !modalSemester || !quarterState) {
        return res.status(400).send('School year, semester, and quarter state are required');
    }

    try {
        // Log user ID for debugging
        console.log('User  ID:', userId); // Use userId variable

        // Fetch student_id from studenttbl using user_id
        const studentResult = await pool.query(
            'SELECT student_id FROM studenttbl WHERE user_id = $1',
            [userId] // Use the userId variable here
        );

        // Log the result of the student query
        console.log('Student Query Result:', studentResult.rows);

        if (studentResult.rows.length === 0) {
            return res.status(404).send('Student not found');
        }

        const student_id = studentResult.rows[0].student_id;

        // Fetch grades based on school year, semester, and quarter
        const query = `
            SELECT 
                s.student_id, 
                sec.section_name, 
                sub.subject_id, 
                sub.subject_name, 
                sec.school_year, 
                sec.semester, 
                g.quarter, 
                g.grade, 
                sec.faculty_name
            FROM 
                enrollmenttbl AS e  -- Assuming this table links students to sections
            JOIN 
                studenttbl AS s ON e.student_id = s.student_id
            JOIN 
                sectiontbl AS sec ON e.section_id = sec.section_id  -- Link to sectiontbl
            JOIN 
                subjecttbl AS sub ON sec.subject_id = sub.subject_id
            JOIN 
                gradestbl AS g ON s.student_id = g.student_id
            WHERE 
                sec.school_year = $1 
                AND sec.semester = $2 
                AND g.quarter = $3 
                AND s.student_id = $4
        `;

        const gradesResult = await pool.query(query, [modalSchoolYear, modalSemester, quarterState, student_id]);

        if (gradesResult.rows.length === 0) {
            return res.status(404).send('No grades found for the specified criteria');
        }

        res.json(gradesResult.rows);
    } catch (error) {
        console.error('Error fetching grades:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.get('/announcements/students', (req, res) => {
    const query = `
        SELECT announcement_id, announce_to, announcement_type,
               announcement_title, announcement_text,
               announcement_by, announcement_timestamp
        FROM announcementtbl
        WHERE announce_to IN ('Student', 'All')
        ORDER BY announcement_timestamp DESC
        LIMIT 7
    `;

    // Use the pool to query the database
    pool.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching announcements:', err);
            return res.status(500).json({ error: 'Database query failed' });
        }
        res.json(results);
    });
});

app.get('/student-liabilities', authenticateToken, async (req, res) => {
    const userId = req.user.userId; // Retrieve user ID from authenticated request
    const { modalSchoolYear, modalSemester } = req.query;

    // Check if modalSchoolYear and modalSemester are provided
    if (!modalSchoolYear || !modalSemester) {
        return res.status(400).send('School year and semester are required');
    }

    try {
        // Fetch student_id based on user_id
        const studentResult = await pool.query(
            'SELECT student_id FROM studenttbl WHERE user_id = $1',
            [userId]
        );

        if (studentResult.rows.length === 0) {
            return res.status(404).send('Student not found');
        }

        const student_id = studentResult.rows[0].student_id;

        // Query to get liabilities based on student_id, modalSchoolYear, and modalSemester
        const query = `
            SELECT 
                liability_description, 
                created_at, 
                school_year, 
                semester 
            FROM 
                liabilitytbl
            WHERE 
                student_id = $1
                AND school_year = $2
                AND semester = $3
                AND status = 'Pending'
        `;

        const liabilitiesResult = await pool.query(query, [student_id, modalSchoolYear, modalSemester]);

        if (liabilitiesResult.rows.length === 0) {
            return res.status(404).send('No liabilities found for the specified criteria');
        }

        res.json(liabilitiesResult.rows);
    } catch (error) {
        console.error('Error fetching liabilities:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.get('/student-liabilities-paid', authenticateToken, async (req, res) => {
    const userId = req.user.userId; // Retrieve user ID from authenticated request
    const { modalSchoolYear, modalSemester } = req.query;

    // Check if modalSchoolYear and modalSemester are provided
    if (!modalSchoolYear || !modalSemester) {
        return res.status(400).send('School year and semester are required');
    }

    try {
        // Fetch student_id based on user_id
        const studentResult = await pool.query(
            'SELECT student_id FROM studenttbl WHERE user_id = $1',
            [userId]
        );

        if (studentResult.rows.length === 0) {
            return res.status(404).send('Student not found');
        }

        const student_id = studentResult.rows[0].student_id;

        // Query to get liabilities based on student_id, modalSchoolYear, and modalSemester with status 'Paid'
        const query = `
            SELECT 
                liability_description, 
                created_at, 
                school_year, 
                semester,
                status 
            FROM 
                liabilitytbl
            WHERE 
                student_id = $1
                AND school_year = $2
                AND semester = $3
                AND status = 'Paid'
        `;

        const liabilitiesResult = await pool.query(query, [student_id, modalSchoolYear, modalSemester]);

        if (liabilitiesResult.rows.length === 0) {
            return res.status(404).send('No liabilities found for the specified criteria');
        }

        res.json(liabilitiesResult.rows);
    } catch (error) {
        console.error('Error fetching liabilities:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Finance -----------------------------------------------------------------------------------------------

app.get('/liab/school_years', (req, res) => {
    const query = 'SELECT DISTINCT school_year FROM sectiontbl ORDER BY school_year DESC';

    pool.query(query, (error, results) => {
        if (error) {
            console.error('Error fetching school years:', error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        // Send only the rows array, which contains the school_year data
        res.json(results.rows);
    });
});

app.get('/search-student/:student_id', async (req, res) => {
    const { student_id } = req.params;

    const query = `
        SELECT last_name, first_name, middle_name
        FROM studenttbl
        WHERE student_id = $1 AND student_status = 'Enrolled'
    `;

    try {
        const result = await pool.query(query, [student_id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ message: "Student not found or not enrolled" });
        }

        const student = result.rows[0];
        const fullName = `${student.last_name}, ${student.first_name} ${student.middle_name || ''}`.trim();
        
        res.json({ full_name: fullName });
        
    } catch (error) {
        console.error('Error searching for student:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

const generateLiabilityId = (studentId) => {
    const randomNum = Math.floor(1000 + Math.random() * 9000); // Generate a random 4-digit number
    return `LIAB-${studentId}-${randomNum}`;
};

// POST endpoint to add a liability
app.post('/add-liability', async (req, res) => {
    const { liability_description, student_id, student_name, school_year, semester } = req.body;

    // Validate input
    if (!liability_description || !student_id || !student_name || !school_year || !semester) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    const liability_id = generateLiabilityId(student_id);
    const status = 'Pending'; // Default status
    const createdAt = new Date().toISOString().replace('T', ' ').replace('Z', ''); // Generate current time without timezone

    try {
        const query = `
            INSERT INTO liabilitytbl (liability_id, liability_description, student_id, student_name, status, school_year, semester, created_at)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *;
        `;
        const values = [liability_id, liability_description, student_id, student_name, status, school_year, semester, createdAt];

        const result = await pool.query(query, values);
        const newLiability = result.rows[0];

        return res.status(201).json(newLiability);
    } catch (error) {
        console.error('Error adding liability:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/get-liability', async (req, res) => {
    try {
        const query = `
            SELECT
                l.liability_id,
                l.student_id, 
                l.student_name, 
                l.liability_description, 
                l.school_year, 
                l.semester,
                l.status
            FROM 
                liabilitytbl l
            WHERE
                l.status = 'Pending';
        `;

        const result = await pool.query(query);
        const data = result.rows;

        return res.status(200).json(data);
    } catch (error) {
        console.error('Error fetching data:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.put('/update-liability-description/:liability_id', async (req, res) => {
    const { liability_id } = req.params;
    const { liability_description } = req.body; // Get the new description from the request body

    // Check if the liability_description is provided
    if (!liability_description) {
        return res.status(400).json({ message: 'New liability description is required.' });
    }

    try {
        // Query to update the liability description
        const result = await pool.query(
            'UPDATE liabilitytbl SET liability_description = $1 WHERE liability_id = $2 RETURNING *',
            [liability_description, liability_id]
        );

        // Check if any rows were affected
        if (result.rowCount === 0) {
            return res.status(404).json({ message: 'No liability found with the provided ID.' });
        }

        // Send the updated liability as a response
        res.status(200).json({ message: 'Liability description updated successfully', updatedLiability: result.rows[0] });
    } catch (error) {
        console.error('Error updating liability description:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

app.put('/update-liability-status/:liability_id', async (req, res) => {
    const { liability_id } = req.params;
  
    try {
      const result = await pool.query(
        'UPDATE liabilitytbl SET status = $1 WHERE liability_id = $2 AND status = $3 RETURNING *',
        ['Paid', liability_id, 'Pending']
      );
  
      if (result.rowCount === 0) {
        return res.status(404).json({ message: 'No pending liability found with the provided ID.' });
      }
  
      res.status(200).json({ message: 'Status updated to Paid', updatedLiability: result.rows[0] });
    } catch (error) {
      console.error('Error updating liability status:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

  app.delete('/delete-liability/:liability_id', async (req, res) => {
    const { liability_id } = req.params;
  
    try {
      const result = await pool.query(
        'DELETE FROM liabilitytbl WHERE liability_id = $1 RETURNING *',
        [liability_id]
      );
  
      if (result.rowCount === 0) {
        return res.status(404).json({ message: 'Liability not found.' });
      }
  
      res.status(200).json({ message: 'Liability deleted successfully', deletedLiability: result.rows[0] });
    } catch (error) {
      console.error('Error deleting liability:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

  app.get('/students-finance-list', async (req, res) => {
    try {
        const query = `
            SELECT student_id, last_name, first_name, middle_name, program, grade_level, strand
            FROM studenttbl
            WHERE student_status IN ('Enrolled', 'Not Enrolled')
            ORDER BY last_name ASC
        `;
        
        const result = await pool.query(query);
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

app.get('/liabilities/:student_id', async (req, res) => {
    const { student_id } = req.params;

    try {
        // Query to fetch liability data
        const query = `
            SELECT liability_id, liability_description, status
            FROM liabilitytbl
            WHERE student_id = $1
        `;

        const result = await pool.query(query, [student_id]);

        // Check if any data is retrieved
        if (result.rows.length === 0) {
            return res.status(200).json({ message: 'No data found' }); // Change to 200 status
        }

        // Send the data as response
        res.status(200).json(result.rows);
    } catch (error) {
        console.error('Error fetching liabilities:', error);
        res.status(500).json({ message: 'An error occurred while fetching liabilities.' });
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
