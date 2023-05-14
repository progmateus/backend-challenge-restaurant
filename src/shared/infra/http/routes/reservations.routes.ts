import { Router } from "express";
import { CreateReservationController } from "../../../../modules/reservations/useCases/createReservation/CreateReservationController";
import { ensureAuthenticated } from "../middlewares/EnsureAuthenticated";
import { ListAvailableTablesController } from "../../../../modules/reservations/useCases/listAvailableTables/ListAvailableTablesController";
import { ListReservationsController } from "../../../../modules/reservations/useCases/listReservations/ListReservationsController";
import { EnsureAdmin } from "../middlewares/EnsureAdmin";

const reservationsRoutes = Router();
const createReservationController = new CreateReservationController();
const listAvailableTablesController = new ListAvailableTablesController()
const listReservationsController = new ListReservationsController()



reservationsRoutes.post("/", ensureAuthenticated, createReservationController.handle);
reservationsRoutes.get("/tables/available", ensureAuthenticated, listAvailableTablesController.handle);
reservationsRoutes.get("/", ensureAuthenticated, listReservationsController.handle);



export { reservationsRoutes };

