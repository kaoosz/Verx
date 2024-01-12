import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { ProdutorService } from "../services/produtor.service";
import { Request, Response } from "express";

export class ProdutorController {
  constructor(private produtorService: ProdutorService) {}

  async listAllProdutorsController(req: Request, res: Response) {
    try {
      const listProdutors = await this.produtorService.findAllProdutors();
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

  async findProdutorByIdController(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const findProdutor = await this.produtorService.findProdutorById(id);
      if (!findProdutor)
        return res.status(400).json({ message: "produtor não encontrado" });
      res.json(findProdutor);
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

  async createProdutorController(req: Request, res: Response) {
    try {
      const produtorcreated = await this.produtorService.createProdutor(
        req.body
      );
      res.json(produtorcreated);
    } catch (error: any) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === "P2002") {
          return res.status(400).json({ messsage: "Documento já cadastrado." });
        }

        return res
          .status(400)
          .json({ message: "Erro ao processar sua solicitação." });
      }
      console.error("error no servidor", error);
      res.status(500).json({ message: error.message });
    }
  }

  async deleteProdutorController(req: Request, res: Response) {
    try {
      const { id } = req.params;

      if (!id) return res.status(400).json({ message: "id não encontrado" });
      const produtorExists = await this.produtorService.findProdutorById(id);
      if (!produtorExists)
        return res.status(400).json({ message: "produtor não encontrado" });

      await this.produtorService.deleteProdutor(id);
      res.status(200).json({ message: "produtor rural deletado com sucesso." });
    } catch (error: any) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === "P2002") {
          return res.status(400).json({ messsage: "Documento já cadastrado." });
        }

        return res
          .status(400)
          .json({ message: "Erro ao processar sua solicitação." });
      }
      console.error("error no servidor", error);
      res.status(500).json({ message: error.message });
    }
  }

  async updateProdutorController(req: Request, res: Response) {
    try {
      const { id } = req.params;

      if (!id) return res.status(400).json({ message: "id não encontrado" });
      const produtorExists = await this.produtorService.findProdutorById(id);
      if (!produtorExists)
        return res.status(400).json({ message: "produtor não encontrado" });

      const result = await this.produtorService.updateProdutor(id, req.body);
      res.status(200).json(result);
    } catch (error: any) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === "P2002") {
          return res.status(400).json({ messsage: "Documento já cadastrado." });
        }

        return res
          .status(400)
          .json({ message: "Erro ao processar sua solicitação." });
      }
      console.error("error no servidor", error);
      res.status(500).json({ message: error.message });
    }
  }
}

