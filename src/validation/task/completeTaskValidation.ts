import { checkExact, checkSchema } from "express-validator";

export const completeTaskValidation = checkExact(
    checkSchema({
        isCompleted: {
            exists: {
                errorMessage: "isCompleted is required",
                options: { checkFalsy: true },
                bail: true,
            },
            isBoolean: {
                errorMessage: "isCompleted should be boolean",
                bail: true,
            },
        },
        taskId: {
            exists: {
                errorMessage: "taskId is required",
                options: { checkFalsy: true },
                bail: true,
            },
            isString: {
                errorMessage: "taskId should be string",
                bail: true,
            },
        },
    }),
);
