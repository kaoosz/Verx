import { FarmAreaSum, FarmByState, FarmCultures, FarmTotalArea } from "../../types/dashboard";

export interface IDashboardService {
    findAllFarms(): Promise<number>;
    farmsByState(): Promise<FarmByState[]>;
    cultureCounts(): Promise<FarmCultures[]>;
    farmsLandUse(): Promise<FarmAreaSum>;
    farmsTotalArea(): Promise<FarmTotalArea>;
}

