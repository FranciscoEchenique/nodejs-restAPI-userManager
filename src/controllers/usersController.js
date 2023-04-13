import { pool } from '../db.js'

const usersController = {
    getUser: async (req, res) => {
        try {
            const [rows] =  await pool.query('SELECT * FROM users')
            res.json(rows) 
        } catch (error) {

            return res.status(500).json({
                message: 'Something goes wrong'
            })
        }
    },
    getUserById: async (req, res) => {
        const id = req.params.id
        try {

            const [rows] = await pool.query('SELECT * FROM users WHERE id = ?', [id])

            if(rows.length <= 0) return res.status(404).json({
                message: 'User not found'
            })

            res.json(rows[0])
        } catch (error) {

        return res.status(500).json({
                message: 'Something goes wrong'
            })
        }
    },
    postUser: async (req, res) => {
        const { rol_id, name, lastname, email, password, image } = req.body
        try {
        const [rows] = await pool.query('INSERT INTO users(rol_id, name, lastname, email, password, image) VALUES (?, ?, ?, ?, ?, ?)', [rol_id, name, lastname, email, password, image] )

        res.send({ 
            id: rows.insertId,
            rol_id,
            name,
            lastname,
            email,
            password,
            image
         });
        } catch (error) {
            res.status(500).json({
                message: 'Something goes wrong'
            })
        }
    },
    patchUser: async (req, res) => {

        const id = req.params.id;
        const { rol_id, name, lastname, email, password, image } = req.body;

        try {
            const [result] = await pool.query('UPDATE users SET rol_id = IFNULL(?, rol_id), name = IFNULL(?, name), lastname = IFNULL(?, lastname), email = IFNULL(?, email), password = IFNULL(?, password), image = IFNULL(?, image) WHERE id = ?', [rol_id, name, lastname, email, password, image, id])
            
            if(result.affectedRows <= 0) return res.status(404).json({
                message: 'User not found'
            })

            const [rows] = await pool.query('SELECT * FROM users WHERE id = ?', [id])
            res.json(rows[0])
        } catch (error) {
            return res.status(500).json({
                message: 'Something goes wrong'
            })
        }
        
    },
    deleteUser: async (req, res) => {
        const id = req.params.id;

        try {
            const [result] = await pool.query('DELETE FROM users WHERE id = ?', [id])

            if(result.affectedRows <= 0) return res.status(404).json({
                message: 'User not found'
            })

            res.json({
                message: 'User deleted'
            })
        } catch (error) {
            return res.status(500).json({
                message: 'Something goes wrong'
            })
        }
    }
}

export default usersController;