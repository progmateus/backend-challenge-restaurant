import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListAvailableTablesUseCase } from "./ListAvailableTablesUseCase";


class ListAvailableTablesController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { date } = request.query;

        const { id } = request.user;

        const listAvailableTablesUseCase = container.resolve(ListAvailableTablesUseCase);

        const availableTables = await listAvailableTablesUseCase.execute({
            date,
            id,
        })

        return response.status(200).json(availableTables);
    }
}
export { ListAvailableTablesController };