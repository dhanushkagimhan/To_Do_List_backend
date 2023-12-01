import { type NextFunction, type Request, type Response } from "express";
import Task, { type TaskType } from "../../models/Task";
import { type ValidationError, validationResult } from "express-validator";

type ApiResponse = {
    success: boolean;
    data?: TaskType[];
    message?: string;
    errors?: ValidationError[];
};

const getAll = async (
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

        const tasks: TaskType[] = await Task.find();

        const response: ApiResponse = {
            success: true,
            data: tasks,
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

export default getAll;
