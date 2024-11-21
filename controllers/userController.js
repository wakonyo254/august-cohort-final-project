const db = require('../config/db');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator')

//register a new young hero
exports.registerChild = async (req, res) => {
    console.log(req.body);
    const errors = validationResult(req);
    console.log(errors);
    if(!errors.isEmpty()){
        return res.status(400).json({message: 'Enter the correct inputs', error: errors.array()});

    }

    const {first_name, last_name, email, dob, password} = req.body
    //confirm the collected field inputs
    console.log(req.body);
    try{
        const [user] = await db.execute('SELECT * FROM children WHERE email = ?', [email]);
        if(user.length > 0){
            return res.status(400).json({message: 'The user already exists!'});
        }
        //password hashing for storage
        const passwordHash = await bcrypt.hash(password, 10);
        //confirm if password is hashed
        console.log(passwordHash)
        
        await db.execute('INSERT INTO children(first_name, last_name, email, date_of_birth, password_hash) VALUES(?, ?, ?, ?, ?)',
            [first_name, last_name, email, dob, passwordHash]);
            return res.status(201).json({message: 'Young Hero successfully registered!!'});
    } catch(error){
        console.log(error);
        res.status(500).json({message: 'Oops an error occured during registration. Please try again!', error:error.message});
    }
}