import { getRepository, Repository } from "typeorm"
import { ICreateUserDTO } from "../dtos/ICreateUserDTO";
import { IUsersRepository } from "../repositories/IUsersRepository";
import { User } from "../entities/User";


class UsersRepository implements IUsersRepository {

    private repository: Repository<User>

    constructor() {
        this.repository = getRepository(User)
    }

    async create({
        id,
        name,
        email,
        isAdmin,
        password,
    }: ICreateUserDTO): Promise<void> {
        const user = this.repository.create({
            id,
            name,
            email,
            isAdmin,
            password
        })

        await this.repository.save(user);
    }
    async findById(id: string): Promise<User> {
        const user = await this.repository.findOne(id)
        return user;
    }
    async findByEmail(email: string): Promise<User> {
        const user = await this.repository.findOne({ email })
        return user;
    }

    async update({
        id,
        name,
        email,
        password,
    }: ICreateUserDTO) {
        const user = this.repository.create({
            id,
            name,
            email,
            password,
        })

        await this.repository.save(user);
    }

}
export { UsersRepository };