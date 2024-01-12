import { Router } from "express";
import { FarmController } from "../controllers/farmController";
import { validateFarm } from "../middleware/validationFarm";
import { validateFarmCulture } from "../middleware/validationFarmCulture";
import { prisma } from "../services/prisma.service";
import { FarmService } from "../services/farm.service";
import { ProdutorService } from "../services/produtor.service";

const farmService = new FarmService(prisma);
const productorService = new ProdutorService(prisma);
const controller = new FarmController(farmService, productorService);
const router = Router();

router.get("/farm", (req, res) => controller.listAllFarmsController(req, res));
router.get("/farm/:id", (req, res) =>
  controller.findFarmByIdController(req, res)
);
router.post("/farm", validateFarm, (req, res) =>
  controller.createFarmController(req, res)
);
router.delete("/farm/:id", (req, res) =>
  controller.deleteFarmController(req, res)
);
router.post("/culture/:farmId", validateFarmCulture, (req, res) =>
  controller.createFarmCultureController(req, res)
);

export default router;

