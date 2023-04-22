import express from 'express'
import usersRoute from './routes/usersRoute.js'
import authRoute from './routes/authRoute.js'
import { PORT } from './config.js'
import cors from 'cors'
const app = express();

app.use(cors());

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/api/users', usersRoute);
app.use('/api/auth', authRoute);

app.use((req, res, next) => {
    res.status(404).json({
        message: "Endpoint not found"
    })
})

app.listen(PORT, () => {
    console.log('Server running on port', PORT);
})
