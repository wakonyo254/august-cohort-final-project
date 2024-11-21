const express = require('express');
const db = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const bodyParser = require('body-parser');
const session = require('express-session');
const mySqlStore = require('express-mysql-session')(session);
const dotenv = require('dotenv');
const ejs = require('ejs'); 
const path = require('path');
//initialize dotenv and express
dotenv.config();
const app = express();

//set EJS as the views engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
//middleware for the static files
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true }));


//main route center
app.use('/healthhero/api/user', userRoutes);

//try serving


//start a server
const PORT = process.env.PORT || 4200;
app.listen(PORT, () =>{
    console.log(`Server is running at http://localhost:${PORT}`);
})