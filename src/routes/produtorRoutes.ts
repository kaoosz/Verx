import { Router } from "express";
import { ProdutorController } from "../controllers/produtorController";
import { validateProdutorCreate } from "../middleware/validationProdutorCreate";
import { validateProdutorUpdate } from "../middleware/validationProdutorUpdate";
import { prisma } from "../services/prisma.service";
import { ProdutorService } from "../services/produtor.service";

const service = new ProdutorService(prisma);
const controller = new ProdutorController(service);
const router = Router();

router.get("/produtor", (req, res) =>
  controller.listAllProdutorsController(req, res)
);
router.get("/produtor/:id", (req, res) =>
  controller.findProdutorByIdController(req, res)
);
router.post("/produtor", validateProdutorCreate, (req, res) =>
  controller.createProdutorController(req, res)
);
router.delete("/produtor/:id", (req, res) =>
  controller.deleteProdutorController(req, res)
);
router.patch("/produtor/:id", validateProdutorUpdate, (req, res) =>
  controller.updateProdutorController(req, res)
);

export default router;
