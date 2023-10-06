import { Document } from "mongoose";

export interface ITodo extends Document {
  /**
   * Title of todo
   */
  title: string;

  /**
   * In detail description of todo. Optional field
   */
  description?: string;

  /**
   * Used to keep track of whether todo is completed of not. By default will be false
   */
  isCompleted: boolean;
}
