import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../errors/AppError";
import { IReservationsRepository } from "../../repositories/IReservationsRepository";
import { ICreateReservationDTO } from "../../dtos/ICreateReservationDTO";
import { IUsersRepository } from "../../../accounts/repositories/IUsersRepository";
@injectable()
class ListAvailableTablesUseCase {

    constructor(
        @inject("ReservationsRepository")
        private reservationsRepository: IReservationsRepository,

        @inject("UsersRepository")
        private usersRepository: IUsersRepository,

    ) { }

    async execute({
        id,
        date,
    }) {

        const dateFormatted = new Date(date);

        let tables = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15"];

        const reservations = await this.reservationsRepository.findByDate(
            dateFormatted
        );

        reservations.map((reservation) => {

            var indice = tables.indexOf(reservation.table_spot);
            tables.splice(indice, 1);
        })


        return tables;
    }
}
export { ListAvailableTablesUseCase };