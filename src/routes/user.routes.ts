import express from 'express';
import { logout, postLogin, postNewUser } from '../controllers/user.controllers';

const router = express.Router();

router.post('/new-user', postNewUser);
router.post('/login', postLogin);
router.get('/logout', logout);

export default router