import pkg from 'pg';
const { Client } = pkg;

const client = new Client({
    user: 'postgres',        
    host: 'localhost',       
    database: 'SJIT_db', 
    password: 'admin', 
    port: 5432,               
});

// Connect to the database
client.connect()
    .then(() => {
        console.log('Connected to the database');

        // Query data from the registrarTbl
        return client.query('SELECT * FROM registrartbl');
    })
    .then((res) => {
        console.log('Data from registrartbl:');
        console.table(res.rows); 
    })
    .catch((err) => {
        console.error('Error executing query', err.stack);
    })
    .finally(() => {
        client.end();
    });
