import { Router } from "express";
import {
  createTask,
  getAllTasks,
  updateTask,
  deleteTask,
} from "../controllers/taskController.js";
import isAuthenticated from "../middleware/isAuth.js";
import { taskValidator } from "../validator/taskValidator.js";

const router = Router();

router.get("/", isAuthenticated, getAllTasks);

router.post("/create", isAuthenticated, taskValidator, createTask);

router.put("/update/:id", isAuthenticated, taskValidator, updateTask);

router.delete("/delete/:id", isAuthenticated, deleteTask);

export default router;
