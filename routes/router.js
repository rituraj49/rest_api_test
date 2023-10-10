import express from 'express';
import { createUser, getAll, getSingle, removeUser } from '../controllers/userController.js';

const router = express.Router();

router.post("/create", createUser);
router.get("/get", getAll);
router.delete("/remove/:id", removeUser);
router.get("/get-one/:id", getSingle);

export default router;