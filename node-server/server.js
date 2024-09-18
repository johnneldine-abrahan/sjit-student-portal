const express = require('express');
const multer = require('multer');
const path = require('path');
const {Pool} = require('pg');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const app = express();
const port = 3000;


const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'SJIT_db',
    password: 'admin',
    port: 5432,
});