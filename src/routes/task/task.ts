import express, { type RequestHandler, type Application } from "express";
import * as controller from "../../controllers";
import * as validation from "../../validation";

const taskRouter: Application = express();

taskRouter.post("/", [
    validation.createTaskValidation,
    controller.createTask,
] as RequestHandler[]);

taskRouter.get("/", controller.getAll as RequestHandler);

taskRouter.patch("/complete/:taskId", [
    validation.completeTaskValidation,
    controller.completeTask,
] as RequestHandler[]);

export default taskRouter;
