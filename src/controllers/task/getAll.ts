import { type NextFunction, type Request, type Response } from "express";
import Task, { type TaskType } from "../../models/Task";

type ApiResponse = {
    success: boolean;
    data?: TaskType[];
    message?: string;
};

const getAll = async (
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<Response> => {
    try {
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
