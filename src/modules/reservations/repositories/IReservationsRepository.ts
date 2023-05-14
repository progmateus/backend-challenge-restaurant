import { ICreateReservationDTO } from "../dtos/ICreateReservationDTO";
import { Reservation } from "../entities/Reservation";

interface IReservationsRepository {

    create(data: ICreateReservationDTO): Promise<Reservation>;
    findById(id: string): Promise<Reservation>;
    findByTableAndDate(table_spot: string, date: Date): Promise<Reservation>;
    findByDate(date: Date): Promise<Reservation[]>;
    list(): Promise<Reservation[]>;
    delete(id: string): Promise<void>;
}

export { IReservationsRepository }