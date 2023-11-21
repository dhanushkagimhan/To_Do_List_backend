import express, { type Application } from "express";
import taskRouter from "./task/task";

const router: Application = express();

router.use("/task", taskRouter);

export default router;
