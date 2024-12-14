const express = require('express');
const userController = require('../controllers/userController');
const adminController = require('../controllers/adminController');
const { check } = require('express-validator');
const router = express.Router();

//router for child registration
router.post('/child_register', 
    [
        check('first_name', 'first name is required').not().isEmpty(),
        check('last_name', 'last name is required').not().isEmpty(),
        check('email', 'Enter a valid email!').isEmail(),
        check('password', 'Password should be atleast 5 char').isLength({min: 5}),   
    ],
    userController.registerChild
);

//splash page route
router.get('/', (req, res) =>{
    res.render('splash.ejs')
});
//home page routes
router.get('/home', (req, res) =>{
    res.render('home.ejs')
});

//child routes
router.get('/child_register', (req, res) => {
    res.render('child_register.ejs');
});

router.post('/child_register', userController.registerChild);

//child - login
router.get('/child_login', (req, res) => {
    res.render('child_login.ejs');
});

router.post('/child_login', userController.loginChild);

//parent routes

router.get('/parent_register', (req, res) => {
    res.render('parent_register.ejs');
});
router.post('/parent_register', userController.registerParent);

//admin routes

router.get('/adminLogin', (req, res) => {
    res.render('adminLogin');
});
router.post('/adminLogin', adminController.adminLogin)

router.get('/admindash', (req, res) => {
    res.render('admindash.ejs');
});

router.get('/getYoung-hero', adminController.getYoungHeros, (req, res) => {
    res.render('youngHeroes.ejs');
});

router.post('/addAdmin', adminController.addAdmin);

module.exports = router;