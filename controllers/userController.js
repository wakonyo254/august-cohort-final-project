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
        const [user] = await db.execute('SELECT email FROM children WHERE email = ?', [email]);
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

//login young hero
exports.loginChild = async (req, res) => {
    const {email, password} = req.body;

    try {
        const [userRow] = await db.execute('SELECT * FROM children WHERE email = ?', [email]);
        if(!user.length > 0){
            console.error('user doesnot exist .please register!');
            return res.status(500).redirect('/child_register')
        }
        const user = userRow[0];

        const  isMatch = await bcrypt.compare(password, passwordHash);

        if(!isMatch){
            return res.status(400).json({message: 'Inavlid credentials!'});
        }

        req.session.user = user
        req.session.save((err) => {
            console.error ('Session save error:', err);
        })
        return res.status(200).json({message: 'Successfully login!', user: req.session.user});
    } catch(error) {
        console.error(error);
        return res.status(500).json({message: 'An error occured during login!!', error});
    }
}

//guadian signup
exports.registerParent = async (req, res) => {
    const { name, email, password } = req.body;
    //check
    console.log('Incoming registration details: ', req.body);
    try{
        const [results] = await db.execute('SELECT email FROM parents WHERE email = ?', [email]);
        //check
        console.log('db results:', results);

        if (results.length > 0) {
            //check
            console.log('guardian exists: ', email);
            return res.status(400).json({message: 'Parent already exists!'});
        }
        //password hash
        const passwordHash = await bcrypt.hash(password, 10);
        //confirm if password is hashed
        console.log('the hashed password:', passwordHash)
        
        await db.execute('INSERT INTO parents(name, email, password_hash) VALUES(?, ?, ?)',
            [name, email, passwordHash]);
            return res.status(201).json({message: 'Guardian successfully registered!!'});
    } catch(error){
        console.log(error);
        res.status(500).json({message: 'An error occured during registration. Please try again!', error:error.message});
    }

    

}


