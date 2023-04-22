import { pool } from '../db.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { SECRET_KEY } from '../config.js'

const authController = {
    login: async (req, res) => {
        const { email, password } = req.body;

        let [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);

        const rol_id = null;
        const name = null;
        const lastname = null;
        const image = null;

        if (!rows[0]) return res.status(404).json({ message: 'User not found' });

        let passWordToCompare = password;

        if(password === rows[0].password){
           passWordToCompare = bcrypt.hashSync(password, 10);

           await pool.query('UPDATE users SET rol_id = IFNULL(?, rol_id), name = IFNULL(?, name), lastname = IFNULL(?, lastname), email = IFNULL(?, email), password = IFNULL(?, password), image = IFNULL(?, image) WHERE email = ?', [rol_id, name, lastname, email, passWordToCompare, image, email]);

           [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
        }

        const matchPassword = bcrypt.compareSync(password, rows[0].password);

        if (!matchPassword) return res.status(401).json({ token: null, message: 'Invalid password' });

        const token = jwt.sign({ id: rows[0].id }, SECRET_KEY, {
            expiresIn: 86400 // 24 hours
        });

        res.json({ token });
    },
}

export default authController