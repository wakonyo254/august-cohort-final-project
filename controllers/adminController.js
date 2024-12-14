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
        //password hash
        const password_hash = await bcrypt.hash(password, 10);
        
        
        await db.execute('INSERT INTO admin(name, email, password_hash) VALUES(?, ?, ?)',
            [name, email, password_hash]);
            return res.status(201).json({message: 'Admin successfully added!!'});
    } catch(error){
        console.log(error);
        res.status(500).json({message: 'An error occured while adding admin.', error:error.message});
    }
} 

//add a challenge
exports.addChallenge = async (req, res) => {
    const { title, description, status } = req.body;

    try {
        // Check if the challenge title exists
        const [existingChallenge] = await db.execute('SELECT * FROM challenges WHERE title = ?', [title]);
        if (existingChallenge.length > 0) {
            return res.status(400).json({ message: 'Challenge with this title already exists!' });
        }
        await db.execute('INSERT INTO challenges (title, description, status) VALUES (?, ?, ?)', [title, description, status]);

        // Send a success response
        return res.status(200).json({ message: 'Challenge added successfully!' });
    } catch (error) {
        console.error('Error adding challenge:', error);
        return res.status(500).json({ message: 'An error occurred while adding the challenge.' });
    }
};