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
    res.render('child_register');
});

router.post('/child_register', userController.registerChild);

router.get('/parent_register', (req, res) => {
    res.render('parent_register');
});
router.post('/parent_register', userController.registerParent);

module.exports = router;