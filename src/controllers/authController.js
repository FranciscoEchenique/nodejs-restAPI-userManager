import { pool } from '../db.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { SECRET_KEY } from '../config.js'

const authController = {
    login: async (req, res) => {
        const { email, password } = req.body;

        const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);

        if (!rows[0]) return res.status(404).json({ message: 'User not found' });  

        const matchPassword = bcrypt.compareSync(password, rows[0].password);

        if (!matchPassword) return res.status(401).json({ token: null, message: 'Invalid password' });

        const token = jwt.sign({ id: rows[0].id }, SECRET_KEY, {
            expiresIn: 86400 // 24 hours
        });

        res.json({ token });
    },
}

export default authController