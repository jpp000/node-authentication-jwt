import express from 'express';
import { getUserData } from '../controllers/dataController.js';
import checkToken from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/user/:id', checkToken, getUserData);

export default router;
