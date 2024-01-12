import { Culture, PrismaClient } from "@prisma/client";
import { IFarmService } from "./interfaces/IFarm.service";
import {
  Farm,
  FarmCultures,
  FarmCulturesInput,
  FarmInput,
} from "../types/farm";

export class FarmService implements IFarmService {
  constructor(private prisma: PrismaClient) {}

  async findAllFarms(): Promise<Farm[]> {
    return this.prisma.farm.findMany({
      select: {
        id: true,
        name: true,
        city: true,
        state: true,
        area_total: true,
        area_arable: true,
        area_vegetation: true,
        produtorRuralId: true,
        cultures: {
          select: {
            farmId: true,
            culture: true,
          },
        },
      },
    });
  }

  async createFarm(
    data: FarmInput & { FarmCultures?: { culture: Culture }[] }
  ): Promise<Farm> {
    const { FarmCultures, ...farmData } = data;

    const farm = await this.prisma.farm.create({
      data: farmData,
      include: {
        cultures: true,
      },
    });

    if (FarmCultures && FarmCultures.length > 0) {
      const culturesData = FarmCultures.map((cultureData) => ({
        ...cultureData,
        farmId: farm.id,
      }));

      await this.prisma.farmCultures.createMany({
        data: culturesData,
        skipDuplicates: true,
      });
    }

    return farm;
  }

  async createFarmCulture(data: FarmCulturesInput): Promise<FarmCultures> {
    return this.prisma.farmCultures.create({
      data: {
        culture: data.culture,
        farmId: data.farmId,
      },
    });
  }

  async findFarmById(id: string): Promise<Farm | null> {
    return this.prisma.farm.findUnique({ where: { id } });
  }

  async deleteFarm(id: string): Promise<void> {
    await this.prisma.farm.delete({ where: { id } });
  }
}

