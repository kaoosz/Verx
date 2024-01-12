import { Farm,FarmCultures,FarmCulturesInput,FarmInput } from "../../types/farm";

export interface IFarmService {
    findAllFarms(): Promise<Farm[]>;
    findFarmById(id: string): Promise<Farm | null>;
    createFarm(data: FarmInput): Promise<Farm>;
    createFarmCulture(data: FarmCulturesInput):Promise<FarmCultures>;
}