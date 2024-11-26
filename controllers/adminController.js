const db = require('../config/db');
const bcrypt = require('bcryptjs')

exports.adminLogin = async (req, res) => {
    const {email, password} = req.body;
    
    try {
        const [user] = await db.execute('SELECT * FROM admin WHERE email = ?', [email]);
        if(user.length === 0){
            return res.status(400).json({message: 'Kindly ask admin for access'});
        }
        return window.location.href = "/adminDashboard";

    } catch(error){
        console.log(error);
        res.status(500).json({message: 'An error occured during login..', error:error.message});
    }
}