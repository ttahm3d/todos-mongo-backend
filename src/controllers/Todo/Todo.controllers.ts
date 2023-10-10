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
