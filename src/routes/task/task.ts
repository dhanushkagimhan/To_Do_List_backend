import express, { type RequestHandler, type Application } from "express";
import * as controller from "../../controllers";
import * as validation from "../../validation";

const taskRouter: Application = express();

taskRouter.post("/", [
    validation.createTaskValidation,
    controller.createTask,
] as RequestHandler[]);

taskRouter.get("/", [
    validation.getAllValidation,
    controller.getAll,
] as RequestHandler[]);

taskRouter.patch("/complete/:taskId", [
    validation.completeTaskValidation,
    controller.completeTask,
] as RequestHandler[]);

taskRouter.delete("/:taskId", [
    validation.deleteTaskValidation,
    controller.deleteTask,
] as RequestHandler[]);

export default taskRouter;
