import mongoose, { Schema, type Document } from "mongoose";

export type TaskType = {
    title: string;
    description: string;
    isCompleted: boolean;
};

export type TaskModel = {} & TaskType & Document;

const TaskSchema: Schema = new Schema(
    {
        title: { type: String, required: true },
        description: { type: String, required: true },
        isCompleted: { type: Boolean, require: true, default: false },
    },
    {
        versionKey: false,
    },
);

export default mongoose.model<TaskModel>("Task", TaskSchema);
