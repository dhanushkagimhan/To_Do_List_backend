import { type NextFunction, type Request, type Response } from "express";
import mongoose from "mongoose";
import Task, { type TaskType } from "../../models/Task";
import { type ValidationError, validationResult } from "express-validator";

type ReqPayload = {
    title: string;
    description: string;
};

type ApiResponse = {
    success: boolean;
    data?: TaskType;
    message?: string;
    errors?: ValidationError[];
};

const createTask = async (
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<Response> => {
    try {
        const payload: ReqPayload = req.body;

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            const responseData: ApiResponse = {
                success: false,
                message: "validation failed",
                errors: errors.array(),
            };
            return res.status(400).send(responseData);
        }

        const task = new Task({
            _id: new mongoose.Types.ObjectId(),
            title: payload.title,
            description: payload.description,
        });

        const newTask = await task.save();

        const response: ApiResponse = {
            success: true,
            data: newTask,
        };

        return res.status(201).send(response);
    } catch (error) {
        console.log("unexpected error : ", error);
        const response: ApiResponse = {
            success: false,
            message: "system Error",
        };
        return res.status(500).send(response);
    }
};

export default createTask;
