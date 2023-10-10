import TodoModel from "@/models/Todo/Todo.Model";
import { ITodo } from "@/types/schema";
import { Request, Response } from "express";

export const getTodos = async (req: Request, res: Response) => {
  try {
    const todos = await TodoModel.find();
    res.status(200).send({
      message: "Successfully fetched todo",
      todos,
    });
  } catch (error) {
    console.error(["TodoController:GET -> failed to fetch todos"]);
    res.status(500).send({
      messsage: "Failed to fetch todos",
      error,
    });
  }
};

export const getTodoById = async (req: Request, res: Response) => {
  const todoId: string = req.params.id;
  if (!todoId) res.send(400).json({ error: "Missing parameter 'id'" });
  try {
    const todo: ITodo | null = await TodoModel.findOne({ _id: todoId });
    if (!todo)
      res.send(404).json({ error: `Could not find todo with id: ${todoId}` });
    res.status(200).send({
      message: "Successfully fetched todo",
      todo,
    });
  } catch (error) {
    console.error(["TodoController:GET -> failed to fetch todos"]);
    res.status(500).send({
      messsage: "Failed to fetch todos",
      error,
    });
  }
};
