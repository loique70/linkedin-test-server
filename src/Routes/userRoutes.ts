import express from "express";
import * as userController from "../Controllers/userController";

const router = express.Router();

router.post("/users", userController.createUser);
router.put("/users/:id", userController.updateUser);

export default router;
