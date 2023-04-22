import express from 'express';
import usersController from '../controllers/usersController.js';
import { verifyToken, isAdmin } from '../middlewares/authjwt.js';

const router = express.Router();

router.get('/', usersController.getUser);

router.get('/:id', usersController.getUserById);

router.post('/', [verifyToken, isAdmin], usersController.postUser);

router.patch('/:id', [verifyToken, isAdmin], usersController.patchUser);

router.delete('/:id', [verifyToken, isAdmin], usersController.deleteUser);

export default router;