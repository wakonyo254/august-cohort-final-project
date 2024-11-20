const express = require('express');
//const db = require('.config/db');
const bodyParser = require('body-parser');
const session = require('express-session');
const mySqlStore = require('express-mysql-session')(session);
const dotenv = require('dotenv');
const path = require('path');
//initialize dotenv and express
dotenv.config();
const app = express();

//set EJS as the views engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))
//middleware for the static files
app.use(express.static(path.join(__dirname, 'public')));

//try serving
app.get('/child_signup', (req, res) => {res.render('pages/register/child_signup');});

//start a server
const PORT = 3001;
app.listen(PORT, () =>{
    console.log(`Server is running at http://localhost:${PORT}`);
})