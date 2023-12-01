import { checkExact, checkSchema } from "express-validator";

export const getAllValidation = checkExact(checkSchema({}));
