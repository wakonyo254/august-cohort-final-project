const express = require('express');
const db = require('.config/db');
const bodyParser = require('body-parser');
const session = require('express-session');
const mySqlStore = require('express-mysql-session')(session);
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();
const app = express();

