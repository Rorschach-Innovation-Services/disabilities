/**
 * Model for Task
 */

import { model, Schema, Document } from "mongoose";

/**
  * Interface representing a Task Document in MongoDB
  */
interface TaskDocument extends Document{
    title: string,
    adminId: Schema.Types.ObjectId,
    admin?: string,
    content: string,
    photo?: string,
    complete: boolean
}
 
 /**
  * Task Schema corresponding to an Task Document
  */
const TaskSchema = new Schema<TaskDocument>({
    title: {
        type: String,
        required: [ true, "Task title required" ],
    },
    adminId: {
        type: Schema.Types.ObjectId,
        ref: "Admin",
        required: true
    },
    admin: String,
    content: {
        type: String,
        required: [true, "Task content required"]
    },
    photo: String,
    complete: {
      type: Boolean,
      default: false
    }
});
 
/**
  * Task Model
  */
const Task = model<TaskDocument>('Task', TaskSchema);
 
export default Task;