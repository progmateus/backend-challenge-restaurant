import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../errors/AppError";
import { IReservationsRepository } from "../../repositories/IReservationsRepository";
import { ICreateReservationDTO } from "../../dtos/ICreateReservationDTO";
import { IUsersRepository } from "../../../accounts/repositories/IUsersRepository";
@injectable()
class ListReservationsUseCase {

    constructor(
        @inject("ReservationsRepository")
        private reservationsRepository: IReservationsRepository,

        @inject("UsersRepository")
        private usersRepository: IUsersRepository,

    ) { }

    async execute(id) {

        const reservations = await this.reservationsRepository.list();

        const reservationsFormatted = [];


        for await (let reservation of reservations) {
            const client = await this.usersRepository.findById(reservation.client_id);

            reservationsFormatted.push({
                client: {
                    id: client.id,
                    name: client.name,
                },
                reservation
            })
        }
        return reservationsFormatted;
    }
}
export { ListReservationsUseCase };