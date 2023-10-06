import mongoose, { Schema } from "mongoose";
import { ITodo } from "@/types/schema";

const TodoSchema: Schema<ITodo> = new Schema({
  title: {
    type: String,
    required: [true, "'title' is required to create a todo"],
  },
  description: {
    type: String,
  },
  isCompleted: {
    type: Boolean,
    default: false,
  },
});

export default mongoose.model("TodoModel", TodoSchema);
