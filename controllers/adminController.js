const db = require('../config/db');
const bcrypt = require('bcryptjs');

exports.adminLogin = async (req, res) => {
    const {email, password} = req.body;
    
    try {
        const [user] = await db.execute('SELECT * FROM admin WHERE email = ?', [email]);
        if(user.length === 0){
            return res.status(400).json({message: 'Kindly ask admin for access!!'});
        }
       return res.redirect( "/healthhero/api/user/admindash");

    } catch(error){
        console.log(error);
        res.status(500).json({message: 'An error occured during login..', error:error.message});
    }
}

exports.getYoungHeros = async (req, res) => {
    try {
        //fetch the young heros
        const [heroes] = await  db.execute('SELECT child_id, first_name, email FROM children');
        res.render('youngHeroes', { heroes });
    } catch (error) {
        console.error(error)
        res.status(500).send('Server error fetching data.');
    }
}

// add admin
exports.addAdmin = async (req, res) => {
    const {name, email, password} = req.body
    
    try{
        const [user] = await db.execute('SELECT email FROM admin WHERE email = ?', [email]);
        if(user.length > 0){
            return res.status(400).json({message: 'Admin already exists!'});
        }
        //password hashing for storage
        const password_hash = await bcrypt.hash(password, 10);
        
        
        await db.execute('INSERT INTO admin(name, email, password_hash) VALUES(?, ?, ?)',
            [name, email, password_hash]);
            return res.status(201).json({message: 'Admin successfully added!!'});
    } catch(error){
        console.log(error);
        res.status(500).json({message: 'An error occured while adding admin.', error:error.message});
    }
} 