import { PrismaClient } from "@prisma/client";
import { IProdutorService } from "./interfaces/IProdutor.service";
import {
  ProdutorRural,
  ProdutorRuralInput,
  ProdutorRuralInputUpdate,
} from "../types/produtor.rural";
export class ProdutorService implements IProdutorService {
  constructor(private prisma: PrismaClient) {}

  async findAllProdutors(): Promise<ProdutorRural[]> {
    return this.prisma.produtorRural.findMany({
      select: {
        id: true,
        name: true,
        document: true,
        farms: {
          select: {
            id: true,
            name: true,
            state: true,
            city: true,
            cultures: {
              select: {
                culture: true,
              },
            },
          },
        },
      },
    });
  }

  async findProdutorById(id: string): Promise<ProdutorRural | null> {
    return this.prisma.produtorRural.findUnique({ where: { id } });
  }

  async createProdutor(data: ProdutorRuralInput): Promise<ProdutorRural> {
    return this.prisma.produtorRural.create({ data });
  }

  async updateProdutor(
    id: string,
    data: ProdutorRuralInputUpdate
  ): Promise<ProdutorRural> {
    return this.prisma.produtorRural.update({ where: { id }, data });
  }

  async deleteProdutor(id: string): Promise<void> {
    await this.prisma.produtorRural.delete({ where: { id } });
  }
}

