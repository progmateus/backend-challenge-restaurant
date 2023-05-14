import { getRepository, Repository } from "typeorm";
import { ICreateReservationDTO } from "../dtos/ICreateReservationDTO";
import { Reservation } from "../entities/Reservation";
import { IReservationsRepository } from "./IReservationsRepository";

class ReservationsRepository implements IReservationsRepository {
    private repository: Repository<Reservation>

    constructor() {
        this.repository = getRepository(Reservation);
    }



    async create({
        id,
        client_id,
        date,
        table_spot,
    }: ICreateReservationDTO): Promise<Reservation> {
        const value = this.repository.create({
            id,
            client_id,
            date,
            table_spot
        })

        await this.repository.save(value);

        return value;
    }
    async findById(id: string): Promise<Reservation> {
        return await this.repository.findOne(id)
    }

    async delete(id: string): Promise<void> {
        await this.repository.delete(id);
    }

    async findByDate(date: Date): Promise<Reservation[]> {
        return await this.repository.find({ date })
    }

    async list(): Promise<Reservation[]> {
        return await this.repository.find()
    }

    async findByTableAndDate(table_spot: string, date: Date): Promise<Reservation> {

        const reservationsQuery = await this.repository.createQueryBuilder("t")

        reservationsQuery
            .where("date = :date", { date })
            .andWhere("table_spot = :table_spot", { table_spot })


        const reservation = await reservationsQuery.getOne();

        return reservation;
    }



}
export { ReservationsRepository };