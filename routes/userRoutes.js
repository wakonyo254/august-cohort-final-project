const express = require('express');
const userController = require('../controllers/userController');
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

router.get('/child_register', (req, res) => {
    res.render('pages/register/child_register');
});


module.exports = router;