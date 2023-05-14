import { UsersRepository } from "../../modules/accounts/repositories/UsersRepository";
import { IUsersRepository } from "../../modules/accounts/repositories/IUsersRepository";
import { container } from "tsyringe";
import { IUsersTokensRepository } from "../../modules/accounts/repositories/IUsersTokensRepository";
import { UsersTokensRepository } from "../../modules/accounts/repositories/UsersTokensRepository";
import { ReservationsRepository } from "../../modules/reservations/repositories/ReservationsRepository";
import { IReservationsRepository } from "../../modules/reservations/repositories/IReservationsRepository";

container.registerSingleton<IUsersRepository>(
    "UsersRepository",
    UsersRepository
);

container.registerSingleton<IUsersTokensRepository>(
    "UsersTokensRepository",
    UsersTokensRepository
)

container.registerSingleton<IReservationsRepository>(
    "ReservationsRepository",
    ReservationsRepository
)