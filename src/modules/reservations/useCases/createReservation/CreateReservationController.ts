import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateReservationUseCase } from "./CreateReservationUseCase";

class CreateReservationController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { table_spot, date } = request.body;

        const { id } = request.user;

        const createReservationUseCase = container.resolve(CreateReservationUseCase);

        await createReservationUseCase.execute({
            client_id: id,
            table_spot,
            date,
        })

        return response.status(201).send();
    }
}
export { CreateReservationController };