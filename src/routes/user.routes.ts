import express from 'express';
import { postNewUser } from '../controllers/user.controllers';

const router = express.Router();

router.post('/new-user', postNewUser);

export default router