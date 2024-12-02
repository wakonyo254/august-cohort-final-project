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
//child routes
router.get('/child_register', (req, res) => {
    res.render('child_register');
});

router.post('/child_register', userController.registerChild);

//parent routes

router.get('/parent_register', (req, res) => {
    res.render('parent_register');
});
router.post('/parent_register', userController.registerParent);

//admin routes

router.get('/adminLogin', (req, res) => {
    res.render('adminLogin');
});
router.post('/adminLogin', adminController.adminLogin)

router.get('/admindash', (req, res) => {
    res.render('admindash');
});
router.post('/adminLogin', adminController.adminLogin)


module.exports = router;