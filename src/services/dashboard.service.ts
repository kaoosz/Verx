import { PrismaClient } from "@prisma/client";
import { IDashboardService } from "./interfaces/IDashboard.service";
import {
  FarmAreaSum,
  FarmByState,
  FarmCultures,
  FarmTotalArea,
} from "../types/dashboard";

export class DashboardService implements IDashboardService {
  constructor(private prisma: PrismaClient) {
  }
 
  async findAllFarms(): Promise<number> {
    return await this.prisma.farm.count();
  }

  async farmsByState(): Promise<FarmByState[]> {
    const result = await this.prisma.farm.groupBy({
      by: ["state"],
      _count: {
        id: true,
      },
    });

    return result.map((item) => ({
      state: item.state,
      count: item._count.id,
    }));
  }

  async cultureCounts(): Promise<FarmCultures[]> {
    const result = await this.prisma.farmCultures.groupBy({
      by: ["culture"],
      _count: {
        farmId: true,
      },
    });

    return result.map((item) => ({
      culture: item.culture,
      count: item._count.farmId,
    }));
  }

  async farmsLandUse(): Promise<FarmAreaSum> {
    const result = await this.prisma.farm.aggregate({
      _sum: {
        area_arable: true,
        area_vegetation: true,
      },
    });

    const farmAreaSum: FarmAreaSum = {
      area_arable_total: result._sum.area_arable || 0,
      area_vegetation_total: result._sum.area_vegetation || 0,
    };

    return farmAreaSum;
  }

  async farmsTotalArea(): Promise<FarmTotalArea> {
    const result = await this.prisma.farm.aggregate({
      _sum: {
        area_total: true,
      },
    });

    const farmAreaTotal: FarmTotalArea = {
      area_total: result._sum.area_total || 0,
    };

    return farmAreaTotal;
  }
}

