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
            INSERT INTO studenttbl (student_id, student_type, student_status, lrn, first_name, middle_name, last_name, birth_date, sex, place_of_birth, nationality, religion, civil_status, birth_order, contact_number, program, grade_level, strand, user_id, financial_support, scholarship_grant, profile)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22)
        `;
        await client.query(studentQuery, [
            student_id, student_type, student_status, lrn, first_name, middle_name, last_name, formattedDate, sex, place_of_birth, nationality, religion,
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

app.get('/getStudentData/:studentId', async (req, res) => {
    const { studentId } = req.params;

    try {
        // Query student data from studenttbl
        const studentData = await pool.query(`
            SELECT student_id,
                   first_name,
                   middle_name,
                   last_name,
                   lrn,
                   TO_CHAR(birth_date, 'YYYY-MM-DD') AS birth_date, -- Convert to string
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

        // Query account data from accountstbl
        const accountData = await pool.query(`
            SELECT first_name, middle_name, last_name FROM accountstbl WHERE user_id = $1
        `, [studentId]);

        // Query school history data from school_historytbl
        const schoolHistoryData = await pool.query(`
            SELECT school_name,
                   years_attended,
                   honors_awards,
                   school_address
            FROM school_historytbl
            WHERE student_id = $1
        `, [studentId]);

        // Query address data from addresstbl
        const addressData = await pool.query(`
            SELECT address,
                   city_municipality,
                   province,
                   country,
                   zip_code
            FROM address_tbl
            WHERE student_id = $1
        `, [studentId]);

        // Query contact data from contacttbl
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

        // Query emergency contact data from emergency_contacttbl
        const emergencyContactData = await pool.query(`
            SELECT guardian_name,
                   relationship,
                   guardian_address,
                   contact_guardian
            FROM emergency_contacttbl
            WHERE student_id = $1
        `, [studentId]);

        // Check if all required data exists, if not, return a 404 error
        if (!studentData.rows.length || !accountData.rows.length ||
            !schoolHistoryData.rows.length || !addressData.rows.length ||
            !contactData.rows.length || !emergencyContactData.rows.length) {
            return res.status(404).json({ error: "Student data not found" });
        }

        // Combine the data from different tables into a single response object
        const combinedData = {
            studentData: studentData.rows[0],
            accountData: accountData.rows[0],
            schoolHistoryData: schoolHistoryData.rows[0],
            addressData: addressData.rows[0],
            contactData: contactData.rows[0],
            emergencyContactData: emergencyContactData.rows[0],
        };

        // Send the combined data as the response
        res.json(combinedData);
    } catch (error) {
        // Log the error and return a 500 status code for server errors
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

// Registrar & Finance Announcements ---------------------------------------------------------------------------------

app.post('/addAnnouncement', authenticateToken, async (req, res) => {
    const { announce_to, announcement_type, announcement_title, announcement_text } = req.body;

    // Generate unique announcement ID
    const announcement_id = `ANN-${Math.floor(10000 + Math.random() * 90000)}`;

    // Get the current date and timestamp in local time
    const announcement_timestamp = new Date().toLocaleString("en-US", { timeZone: "Asia/Singapore" }); // Change to your timezone

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

// Registrar & Finance Accounts --------------------------------------------------------------------------------------

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

        // Insert into accountstbl
        const accountQuery = `
            INSERT INTO accountstbl (user_id, first_name, middle_name, last_name, password, user_role)
            VALUES ($1, $2, $3, $4, $5, $6)
        `;

        await pool.query(accountQuery, [user_id, first_name, middle_name, last_name, password, user_role]);

        res.status(200).json({ message: "Account registered successfully!", user_id });
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
      // Delete accounts whose user_id is in the user_ids array
      const deleteQuery = 'DELETE FROM accountstbl WHERE user_id = ANY($1)';
      await pool.query(deleteQuery, [user_ids]);

      res.status(200).json({ message: "Accounts deleted successfully!" });
    } catch (error) {
      console.error("Error deleting accounts:", error);
      res.status(500).json({ message: "Error deleting accounts." });
    }
  });


app.get('/getAccounts', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM accountstbl');
        const accounts = result.rows;
        res.status(200).json(accounts);
    } catch (error) {
        console.error("Error fetching accounts:", error);
        res.status(500).json({ message: "Error fetching accounts." });
    }
});

// Subject and Section -----------------------------------------------------------------------------

app.get('/getSubjects', async (req, res) => {
    try {
      const result = await pool.query('SELECT subject_id, subject_name FROM subjecttbl');
      res.json(result.rows); // Send the list of subjects to the frontend
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server Error');
    }
  });

app.get('/getFaculty', async (req, res) => {
    try {
        // Query to select faculty_id, last_name, first_name, and middle_name
        const result = await pool.query(`
        SELECT 
          faculty_id, 
          last_name, 
          first_name, 
          middle_name 
        FROM facultytbl
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

app.post('/addSection', async (req, res) => {
    const client = await pool.connect();
  
    try {
      const { subject_id, grade_level, strand, section_name, semester, school_year, program, faculty_name, schedules, faculty_id, slot} = req.body;
  
      // Generate section_id
      const section_id = `${section_name}_${subject_id}_${school_year}`;
  
      // Insert into sectiontbl
      const insertSectionQuery = `
        INSERT INTO sectiontbl (section_id, subject_id, grade_level, strand, section_name, semester, school_year, program, faculty_name, slot)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING section_id;
      `;
      const sectionValues = [section_id, subject_id, grade_level, strand, section_name, semester, school_year, program, faculty_name, slot];
  
      await client.query('BEGIN');
      const sectionResult = await client.query(insertSectionQuery, sectionValues);
  
      // Insert into scheduletbl (can have multiple schedules)
      const insertScheduleQuery = `
        INSERT INTO scheduletbl (schedule_id, section_id, day, start_time, end_time, room)
        VALUES ($1, $2, $3, $4, $5, $6);
      `;
  
      for (const schedule of schedules) {
        // Generate schedule_id as section_name + random 5 digit number
        const schedule_id = `${section_name}_${Math.floor(10000 + Math.random() * 90000)}`;
        const scheduleValues = [schedule_id, section_id, schedule.day, schedule.start_time, schedule.end_time, schedule.room];
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
      await client.query('COMMIT');
      res.status(201).json({ message: 'Section, Schedule, and Teaching Load successfully added!' });
    } catch (error) {
      await client.query('ROLLBACK');
      console.error(error);
      res.status(500).json({ message: 'Error adding data', error });
    } finally {
      client.release();
    }
  });

  app.get('/getSections', async (req, res) => {
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
                sectiontbl.faculty_name
            FROM sectiontbl
            JOIN subjecttbl ON sectiontbl.subject_id = subjecttbl.subject_id;
        `;
        const result = await pool.query(query);
        res.status(200).json(result.rows);
    } catch (error) {
        console.error('Error executing query:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.delete('/deleteSections', async (req, res) => {
    const { selectedSections } = req.body; // selectedSections is expected to be an array of section IDs
  
    if (!selectedSections || selectedSections.length === 0) {
      return res.status(400).json({ message: 'No sections selected for deletion' });
    }
  
    const client = await pool.connect(); // Connect to the database
  
    try {
      await client.query('BEGIN'); // Begin transaction
  
      // Convert each section ID to a string to match the database type
      const sectionIds = selectedSections.map(id => String(id));
  
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
  
      await client.query('COMMIT'); // Commit transaction
      res.status(200).json({ message: 'Sections and their related data deleted successfully' });
    } catch (error) {
      await client.query('ROLLBACK'); // Rollback transaction on error
      console.error('Error deleting sections:', error);
      res.status(500).json({ message: 'Error deleting sections', error: error.message });
    } finally {
      client.release(); // Release the client back to the pool
    }
  });

// Enrollment -------------------------------------------------------------------------------------

app.get('/students/not-enrolled', async (req, res) => {
    try {
      // Query to fetch full name (last_name, first_name middle_name) of students where student_status = 'Not Enrolled'
      const query = `
        SELECT CONCAT(last_name, ', ', first_name, ' ', middle_name) AS full_name 
        FROM studenttbl 
        WHERE student_status = 'Not Enrolled';
      `;
      const result = await pool.query(query);
      
      // Send the result as a response
      res.json(result.rows);
    } catch (error) {
      console.error('Error fetching not-enrolled students:', error);
      res.status(500).json({ error: 'Server error' });
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

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});