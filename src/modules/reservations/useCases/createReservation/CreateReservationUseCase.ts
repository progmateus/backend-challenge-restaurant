import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../errors/AppError";
import { IReservationsRepository } from "../../repositories/IReservationsRepository";
import { ICreateReservationDTO } from "../../dtos/ICreateReservationDTO";
import { IUsersRepository } from "../../../accounts/repositories/IUsersRepository";
@injectable()
class CreateReservationUseCase {

    constructor(
        @inject("ReservationsRepository")
        private reservationsRepository: IReservationsRepository,

        @inject("UsersRepository")
        private usersRepository: IUsersRepository,

    ) { }

    async execute({
        client_id,
        table_spot,
        date,
    }: ICreateReservationDTO) {

        const dateFormatted = new Date(date);
        let tables = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15"];


        const reservationAlreadyExists = await this.reservationsRepository.findByTableAndDate(
            table_spot,
            dateFormatted
        );

        if (reservationAlreadyExists) {
            throw new AppError("This reservation is already taken", 409);
        }


        if (!tables.includes(table_spot)) {
            throw new AppError("Invalid table");

        }

        await this.reservationsRepository.create({
            client_id,
            table_spot,
            date,
        })
    }
}
export { CreateReservationUseCase };