const mysql = require('mysql2');
const dotenv = require('dotenv');

//config dotenv
dotenv.config();

//create our pool
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

const createChildrenTable = `
CREATE TABLE IF NOT EXISTS test (
child_id INT AUTO_INCREMENT PRIMARY KEY,
first_name(255) NOT NULL,
last_name(255) NOT NULL,
email VARCHAR(200) NOT NULL,
date_of_birth DATE,
password_hash VARCHAR(255),
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
`;

pool.query(createChildrenTable, (err, result) =>{
    if(err) {
        console.err('Error creating test table', err.message);
        return;
    }
    console.log('Test table successfully created!!!');

    //close pool
    pool.end((err) =>{
        if(err) {
            console.err('Error closing pool', err.message);
            return;
        }
        console.log('Pool closed successfully!!');
    });
});

module.exports = pool.promise();