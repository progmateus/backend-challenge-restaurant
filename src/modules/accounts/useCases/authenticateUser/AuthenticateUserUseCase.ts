import { compare, hash } from "bcryptjs"
import dayjs from "dayjs"
import { inject, injectable } from "tsyringe"
import { sign } from "jsonwebtoken"
import { IUsersRepository } from "../../repositories/IUsersRepository"
import { AppError } from "../../../../errors/AppError"
import { IUsersTokensRepository } from "../../repositories/IUsersTokensRepository"
import auth from "../../../../config/auth"

interface IRequest {
    email: string
    password: string
}

interface IResponse {
    user: {
        id: string,
        email: string
        isAdmin: boolean,
    },
    token: string;
    refresh_token: string;
}

@injectable()
class AuthenticateUserUseCase {

    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository,

        @inject("UsersTokensRepository")
        private usersTokensRepository: IUsersTokensRepository,

    ) { }

    async execute({ email, password }: IRequest) {

        if (email?.length > 80) {
            throw new AppError("Character limit exceeded", 400)
        }

        if (password?.length > 80) {
            throw new AppError("Character limit exceeded", 400)
        }

        const emailLowerCase = email.trim().toLowerCase()

        const user = await this.usersRepository.findByEmail(emailLowerCase);
        const {
            expires_in_token,
            expires_in_refresh_token,
            refresh_token_expires_days,
            ///  secret_token,
            ///  secret_refresh_token
        } = auth

        if (!user) {
            throw new AppError("Email or password incorrect!", 401)
        }

        const passwordMatch = await compare(password, user.password);

        if (!passwordMatch) {
            throw new AppError("Email or password incorrect!", 401)
        }

        const token = sign({}, "secret_token", {
            subject: user.id,
            expiresIn: expires_in_token
        });

        const refresh_token = sign({}, "secret_refresh_token", {
            subject: user.id,
            expiresIn: expires_in_refresh_token
        })

        const refresh_token_expires_date = dayjs().add(refresh_token_expires_days, "days").toDate();


        await this.usersTokensRepository.create({
            user_id: user.id,
            refresh_token,
            expires_date: refresh_token_expires_date
        })


        const tokenReturn: IResponse = {
            token,
            user: {
                id: user.id,
                isAdmin: user.isAdmin,
                email: user.email
            },
            refresh_token,

        };

        return tokenReturn

    }
}
export { AuthenticateUserUseCase };