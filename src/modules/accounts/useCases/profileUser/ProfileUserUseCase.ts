import { IUsersRepository } from "../../repositories/IUsersRepository";
import { inject, injectable } from "tsyringe";


@injectable()
class ProfileUserUseCase {

    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository
    ) { }

    async execute(id: string): Promise<any> {

        const user = await this.usersRepository.findById(id);

        return {
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin
        }
    }

}
export { ProfileUserUseCase };