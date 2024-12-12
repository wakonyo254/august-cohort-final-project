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

const createChildrenTable  = `
CREATE TABLE IF NOT EXISTS children (
child_id INT AUTO_INCREMENT PRIMARY KEY,
first_name VARCHAR(255) NOT NULL,
last_name VARCHAR(255) NOT NULL,
email VARCHAR(200) NOT NULL UNIQUE,
date_of_birth DATE,
password_hash VARCHAR(255),
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
`;
const createParentTable  = `
CREATE TABLE IF NOT EXISTS parents (
parent_id INT AUTO_INCREMENT PRIMARY KEY,
name VARCHAR(255) NOT NULL,
email VARCHAR(255) NOT NULL UNIQUE,
password_hash VARCHAR(255),
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
`;

const createChallengesTable  = `
CREATE TABLE IF NOT EXISTS challenges (
challenge_id INT AUTO_INCREMENT PRIMARY KEY,
title VARCHAR(255) NOT NULL,
description TEXT NOT NULL,
points INT NOT NULL,
status ENUM('active', 'archived') DEFAULT 'active',
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
`;
const createAdminTable  = `
CREATE TABLE IF NOT EXISTS admin (
admin_id INT AUTO_INCREMENT PRIMARY KEY,
name VARCHAR(100) NOT NULL,
email VARCHAR(200) NOT NULL,
password_hash VARCHAR(255) NOT NULL,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
`;

const createAdminlogTable  = `
CREATE TABLE IF NOT EXISTS adminlogs (
log_id INT AUTO_INCREMENT PRIMARY KEY,
admin_id INT NOT NULL,
action TEXT NOT NULL,
timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
FOREIGN KEY(admin_id) REFERENCES admin(admin_id)
);
`;

const createReawardTable  = `
CREATE TABLE IF NOT EXISTS rewards (
    reward_id INT AUTO_INCREMENT PRIMARY KEY,
    child_id INT NOT NULL,
    total_points INT NOT NULL,
    reward_description TEXT,
    redeemed_at TIMESTAMP,
    FOREIGN KEY (child_id) REFERENCES Children(child_id)
);
`;

const createProgressTable  = `
CREATE TABLE IF NOT EXISTS progress (
    progress_id INT AUTO_INCREMENT PRIMARY KEY,
    child_id INT NOT NULL,
    challenge_id INT NOT NULL,
    date_completed DATE NOT NULL,
    FOREIGN KEY (child_id) REFERENCES Children(child_id),
    FOREIGN KEY (challenge_id) REFERENCES Challenges(challenge_id)
);

`;

// 
const queries = [createChildrenTable, createParentTable, createChallengesTable,
     createAdminTable, createAdminlogTable, createReawardTable, createProgressTable];

queries.forEach((query) => {
    pool.query(query, (err, results) =>{
        if(err) {
            console.error(`Error executing query: ${query}`, err.message);
        } else {
            console.log('database tables successfully created!');
        }
    });
});     

module.exports = pool.promise();