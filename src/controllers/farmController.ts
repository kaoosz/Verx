import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { FarmService } from "../services/farm.service";
import { ProdutorService } from "../services/produtor.service";
import { Request, Response } from "express";

export class FarmController {
  constructor(
    private farmService: FarmService,
    private produtorService: ProdutorService
  ) {}
  public async listAllFarmsController(req: Request, res: Response) {
    try {
      const listFarms = await this.farmService.findAllFarms();
      res.json(listFarms);
    } catch (error: any) {
      if (error instanceof PrismaClientKnownRequestError) {
        return res
          .status(400)
          .json({ message: "Erro ao processar sua solicitação." });
      }
      console.error("error no servidor", error);
      res.status(500).json({ message: error.message });
    }
  }

  public async findFarmByIdController(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const farmExists = await this.farmService.findFarmById(id);
      if (!farmExists)
        return res.status(400).json({ message: "farm não encontrada" });

      const findFarm = await this.farmService.findFarmById(id);
      res.json(findFarm);
    } catch (error: any) {
      if (error instanceof PrismaClientKnownRequestError) {
        return res
          .status(400)
          .json({ message: "Erro ao processar sua solicitação." });
      }
      console.error("error no servidor", error);
      res.status(500).json({ message: error.message });
    }
  }

  async createFarmController(req: Request, res: Response) {
    try {
      const { produtorRuralId } = req.body;

      const produtorExists = await this.produtorService.findProdutorById(
        produtorRuralId
      );
      if (!produtorExists)
        return res.status(400).json({ message: "produtor não encontrado" });

      const farmcreated = await this.farmService.createFarm(req.body);
      res.status(200).json(farmcreated);
    } catch (error: any) {
      if (error instanceof PrismaClientKnownRequestError) {
        return res
          .status(400)
          .json({ message: "Erro ao processar sua solicitação." });
      }
      console.error("error no servidor", error);
      res.status(500).json({ message: error.message });
    }
  }

  async createFarmCultureController(req: Request, res: Response) {
    try {
      const { farmId } = req.params;
      const { culture } = req.body;

      if (!farmId)
        return res.status(400).json({ message: "farmId não encontrado" });
      const farmExists = await this.farmService.findFarmById(farmId);
      if (!farmExists)
        return res.status(400).json({ message: "fazenda não encontrada" });

      const result = await this.farmService.createFarmCulture({
        farmId: farmId,
        culture: culture,
      });
      res.status(200).json(result);
    } catch (error: any) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === "P2002") {
          return res
            .status(400)
            .json({ messsage: "Cultura já cadastrada para está fazenda." });
        }

        return res
          .status(400)
          .json({ message: "Erro ao processar sua solicitação." });
      }
      console.error("error no servidor", error);
      res.status(500).json({ message: error.message });
    }
  }

  async deleteFarmController(req: Request, res: Response) {
    try {
      const { id } = req.params;

      if (!id) return res.status(400).json({ message: "id não encontrado" });
      const farmExists = await this.farmService.findFarmById(id);
      if (!farmExists)
        return res.status(400).json({ message: "produtor não encontrado" });

      await this.farmService.deleteFarm(id);
      res.status(200).json({ message: "produtor rural deletado com sucesso." });
    } catch (error: any) {
      if (error instanceof PrismaClientKnownRequestError) {
        return res
          .status(400)
          .json({ message: "Erro ao processar sua solicitação." });
      }
      res.status(500).json({ message: error.message });
    }
  }
}

