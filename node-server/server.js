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

        // Check if the password matches (assuming passwords are stored in plain text)
        if (user.password !== password) {
            console.error("Password mismatch");
            return res.status(401).json("Invalid username or password!");
        }

        // If user is a student, fetch additional data from studenttbl
        if (user.user_role === 'Student') {
            const studentQuery = `
                SELECT last_name, first_name, middle_name, program, grade_level, school_year, semester, enrollment_status 
                FROM enrollmenttbl
                WHERE user_id = $1
            `;
            const studentResult = await pool.query(studentQuery, [user.user_id]);
            const studentData = studentResult.rows[0];

            if (!studentData) {
                return res.status(404).json("Student data not found!");
            }

            // Format the full name
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
            const facultyQuery = `
                SELECT last_name, first_name, middle_name 
                FROM accountstbl
                WHERE user_id = $1
            `;
            const facultyResult = await pool.query(facultyQuery, [user.user_id]);
            const facultyData = facultyResult.rows[0];
        
            const scheduleQuery = `
                SELECT schoolyear, semester 
                FROM scheduletbl 
                WHERE faculty_id = $1 
                ORDER BY subject_id DESC LIMIT 1
            `;
            const scheduleResult = await pool.query(scheduleQuery, [user.user_id]);
            const scheduleData = scheduleResult.rows[0];
        
            if (!facultyData || !scheduleData) {
                return res.status(404).json("Faculty or schedule data not found!");
            }
        
            // Format the full name
            const middleInitial = facultyData.middle_name ? facultyData.middle_name.charAt(0) + "." : "-";
            const fullName = `${facultyData.last_name}, ${facultyData.first_name} ${middleInitial}`;
        
            // Create JWT token with faculty and schedule data
            const token = jwt.sign(
                {
                    userId: user.user_id,
                    role: user.user_role,
                    fullName,
                    schoolYear: scheduleData.schoolyear,
                    semester: scheduleData.semester
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

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});