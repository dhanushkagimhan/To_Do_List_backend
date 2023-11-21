import { checkExact, checkSchema } from "express-validator";

export const deleteTaskValidation = checkExact(
    checkSchema({
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
            isLength: {
                options: { min: 24, max: 24 },
                errorMessage: "taskId length should be 24",
            },
        },
    }),
);
