import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { Request, Response } from "express";
import { IDashboardService } from "../services/interfaces/IDashboard.service";

export class DashboardController {
  constructor(private dashboardService: IDashboardService) {}

  async findAllFarmsController(req: Request, res: Response) {
    try {
      const listProdutors = await this.dashboardService.findAllFarms();
      return res.status(200).json({
        farms_count: listProdutors,
      });
    } catch (error: any) {
      if (error instanceof PrismaClientKnownRequestError) {
        return res
          .status(400)
          .json({ message: "Erro ao processar sua solicitação." });
      }
      console.error("error no servidor", error);
      return res.status(500).json({ message: error.message });
    }
  }

  async farmsByStateController(req: Request, res: Response) {
    try {
 
      const listProdutors = await this.dashboardService.farmsByState();
      res.json(listProdutors);
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

  async cultureCountsController(req: Request, res: Response) {
    try {
  

      const listProdutors = await this.dashboardService.cultureCounts();
      res.json(listProdutors);
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

  async farmsLandUseController(req: Request, res: Response) {
    try {


      const listProdutors = await this.dashboardService.farmsLandUse();
      res.json(listProdutors);
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

  async farmsTotalAreaController(req: Request, res: Response) {
    try {
      const listProdutors = await this.dashboardService.farmsTotalArea();
      res.json(listProdutors);
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
}

