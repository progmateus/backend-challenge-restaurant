import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../errors/AppError";
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { hash } from "bcryptjs"
@injectable()
class CreateUserUseCase {

    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository,

    ) { }

    async execute({
        name,
        email,
        isAdmin,
        password,
    }: ICreateUserDTO) {


        const nameLowerCase = name.trim().toLowerCase();

        const emailLoweCase = email.trim().toLowerCase();

        const user = await this.usersRepository.findByEmail(emailLoweCase);
        if (user) {
            throw new AppError("User already exists!", 409)
        }

        const passwordHash = await hash(password, 8)

        await this.usersRepository.create({
            name: nameLowerCase,
            isAdmin,
            email: emailLoweCase,
            password: passwordHash
        })
    }
}
export { CreateUserUseCase };