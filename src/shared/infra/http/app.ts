import "reflect-metadata";
import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';

import "@shared/containers";

import swaggerUi from 'swagger-ui-express';
import swaggerFile from '../../../swagger.json';

import { AppError } from "@shared/errors/AppError";
import createConnection from "@shared/infra/typeorm";

import { router } from '@shared/infra/http/routes';

createConnection();
const app = express();

//app.use(rateLimiter);

app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use(router);

app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
        return response.status(err.statusCode).json({
            status: "error",
            message: err.message
        });
    }

    return response.status(500).json({
        status: "error",
        message: `Internal server error - ${err.message}`
    });
});

export default app;