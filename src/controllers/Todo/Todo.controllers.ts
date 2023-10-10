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
    console.error("[TodoController:GET] -> failed to fetch todos");
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
    console.error("[TodoController:GET] -> failed to fetch todos");
    res.status(500).send({
      messsage: "Failed to fetch todos",
      error,
    });
  }
};

export const saveTodo = async (req: Request, res: Response) => {
  try {
    const { title, description, isCompleted = false } = req.body;
    const todo = await TodoModel.create({ title, description, isCompleted });
    res.status(201).send({
      message: "Successfully created todo",
      todo,
    });
  } catch (error) {
    console.error("[TodoController:POST] -> failed to save todo");
    res.status(500).send({
      messsage: "Failed to create todo",
      error,
    });
  }
};

export const updateTodo = async (req: Request, res: Response) => {
  const todoId: string = req.params.id;
  if (!todoId) res.send(400).json({ error: "Missing parameter 'id'" });

  try {
    const todo: ITodo | null = await TodoModel.findById(todoId);
    if (!todo)
      res.send(404).json({ error: `Could not find todo with id: ${todoId}` });
    else {
      const newTitle = req.body.title || todo?.title;
      const newDescription = req.body.description || todo?.description;
      todo.title = newTitle;
      todo.description = newDescription;
      await todo.save();
      res.status(200).send({
        message: "Updated todo",
      });
    }
  } catch (error) {
    console.error("[TodoController:PUT] -> failed to save todo");
    res.status(500).send({
      messsage: "Failed to update todo",
      error,
    });
  }
};

export const toggleTodoCompletion = async (req: Request, res: Response) => {
  const todoId: string = req.params.id;
  if (!todoId) res.send(400).json({ error: "Missing parameter 'id'" });

  try {
    const todo: ITodo | null = await TodoModel.findById(todoId);
    if (!todo)
      res.send(404).json({ error: `Could not find todo with id: ${todoId}` });
    else {
      todo.isCompleted = !todo.isCompleted;
      await todo.save();
      res.status(204).send({
        message: "Marked todo complete",
      });
    }
  } catch (error) {
    console.error("[TodoController:PATCH] -> failed to save todo");
    res.status(500).send({ message: "Internal server error", error: error });
  }
};

export const deleteTodo = async (req: Request, res: Response) => {
  const todoId: string = req.params.id;
  if (!todoId) res.send(400).json({ error: "Missing parameter 'id'" });
  try {
    const todo: ITodo | null = await TodoModel.findOne({ _id: todoId });
    if (!todo)
      res.send(404).json({ error: `Could not find todo with id: ${todoId}` });
    await TodoModel.deleteOne({ _id: todoId });
    res.status(202).send({
      message: "Deleted todo",
    });
  } catch (error) {
    console.error("[TodoController:DELETE] -> failed to delete todo");
    res.status(500).send({
      messsage: "Failed to delete todo",
      error,
    });
  }
};
