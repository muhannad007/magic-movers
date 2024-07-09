import { Request, Response, NextFunction, RequestHandler } from 'express';
import Joi, { ValidationErrorItem } from 'joi';

const validationMiddleware = ((schema: Joi.Schema): RequestHandler => {
    return async(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> => {
        const validationOptions = {
            abortEalry: false,
            allowUnknown: true,
            stripUnknown: true,
        };

        try {
            const value = await schema.validateAsync(
                req.body,
                validationOptions
            );
            req.body = value;
            next();
        } catch (e: any) {
            const errors: String[] = [];
            e.details.forEach((error: ValidationErrorItem) => {
                errors.push(error.message);
            });
            res.status(400).send({ errors: errors });
        }
    }
});

export default validationMiddleware;