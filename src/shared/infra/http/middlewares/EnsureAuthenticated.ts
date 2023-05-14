import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { AppError } from "../../../../errors/AppError";
import { UsersRepository } from "../../../../modules/accounts/repositories/UsersRepository";

interface IPayload {
    sub: string
}

export async function ensureAuthenticated(
    request: Request,
    response: Response,
    next: NextFunction
) {

    const authHeader = request.headers.authorization;

    const usersrepository = new UsersRepository();


    if (!authHeader) {
        throw new AppError("Token missing!");
    }

    if (authHeader.length > 350) {
        throw new AppError("Invalid Token", 401)
    }

    const [, token] = authHeader.split(" ");

    try {
        const { sub: user_id } = verify(
            token,
            "secret_token"
        ) as IPayload


        const user = await usersrepository.findById(user_id)

        if (!user) {
            throw new AppError("Invalid Token", 401)
        }


        request.user = {
            id: user_id,
        };

        next();
    } catch {
        throw new AppError("Invalid Token", 401);
    }
}