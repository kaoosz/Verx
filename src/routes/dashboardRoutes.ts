import { Router } from "express";
import { DashboardController } from "../controllers/dashboardController";
import { DashboardService } from "../services/dashboard.service";
import { prisma } from "../services/prisma.service";

const service = new DashboardService(prisma);
const controller = new DashboardController(service);
const router = Router();

router.get("/dashboard/total-farms-count", (req, res) =>
  controller.findAllFarmsController(req, res)
);
router.get("/dashboard/total-area", (req, res) =>
  controller.farmsTotalAreaController(req, res)
);
router.get("/dashboard/farms-by-state", (req, res) =>
  controller.farmsByStateController(req, res)
);
router.get("/dashboard/cultures", (req, res) =>
  controller.cultureCountsController(req, res)
);
router.get("/dashboard/land-use", (req, res) =>
  controller.farmsLandUseController(req, res)
);

export default router;
