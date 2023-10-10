import { Router } from "express";
import {
  getTodos,
  getTodoById,
  saveTodo,
  deleteTodo,
  updateTodo,
  toggleTodoCompletion,
} from "@/controllers/Todo/Todo.controllers";

const router = Router();

router.get("/todos", getTodos);
router.get("/todos/:id", getTodoById);
router.post("/todos", saveTodo);
router.delete("/todos/:id", deleteTodo);
router.put("/todos/:id", updateTodo);
router.patch("/todos/:id", toggleTodoCompletion);

export default router;
