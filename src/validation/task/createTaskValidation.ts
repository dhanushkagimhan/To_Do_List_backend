import { checkExact, checkSchema } from "express-validator";

export const createTaskValidation = checkExact(
    checkSchema({
        title: {
            exists: {
                errorMessage: "title is required",
                options: { checkFalsy: true },
                bail: true,
            },
            isString: {
                errorMessage: "title should be string",
                bail: true,
            },
        },
        description: {
            exists: {
                errorMessage: "description is required",
                options: { checkFalsy: true },
                bail: true,
            },
            isString: {
                errorMessage: "description should be string",
                bail: true,
            },
        },
    }),
);
