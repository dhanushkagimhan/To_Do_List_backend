import { type NextFunction, type Request, type Response } from "express";
import Task from "../../models/Task";
import { type ValidationError, validationResult } from "express-validator";

type ApiResponse = {
    success: boolean;
    message?: string;
    errors?: ValidationError[];
};

const deleteTask = async (
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<Response> => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            const responseData: ApiResponse = {
                success: false,
                message: "validation failed",
                errors: errors.array(),
            };
            return res.status(400).send(responseData);
        }

        const taskId = req.params.taskId;

        const task = await Task.findByIdAndDelete(taskId);

        if (task == null) {
            const response: ApiResponse = {
                success: false,
                message: "task not found",
            };
            return res.status(404).send(response);
        }

        const response: ApiResponse = {
            success: true,
        };

        return res.status(200).send(response);
    } catch (error) {
        console.log("unexpected error : ", error);
        const response: ApiResponse = {
            success: false,
            message: "system Error",
        };
        return res.status(500).send(response);
    }
};

export default deleteTask;
