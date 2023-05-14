import { Router } from "express";

import { usersRoutes } from "./users.routes";
import { authenticateRoutes } from "./authenticate.routes";
import { reservationsRoutes } from "./reservations.routes";

const router = Router();

router.use("/users", usersRoutes);
router.use("/reservations", reservationsRoutes)
router.use(authenticateRoutes);

export { router };