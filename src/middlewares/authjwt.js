import jwt from 'jsonwebtoken'
import { SECRET_KEY } from '../config.js'
import { pool } from '../db.js';

export const verifyToken = async (req, res, next) => {
    const token = req.headers["x-access-token"];

    if(!token) return res.status(403).json({message: "No token provided"});

    try{

        const {id} = jwt.verify(token, SECRET_KEY);

        req.userId = id;
    
        const user = await pool.query('SELECT * FROM users WHERE id = ?', [id]);

        if(!user) return res.status(404).json({message: "Not user found"});

        next()
    } catch(err) {
        return res.status(401).json({message: "Invalid token"});
    }
}

export const isAdmin = async (req, res, next) => {
    const [rows] = await pool.query('SELECT * FROM users WHERE id = ?', [req.userId]);

    if(!rows[0].rol_id === 1) return res.status(403).json({message: "You need to be an admin to do this action"});

    next();
}