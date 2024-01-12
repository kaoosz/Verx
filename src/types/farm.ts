import { Culture } from "@prisma/client";

export interface Farm {
    id?: string;
    name: string;
    city: string;
    state: string;
    area_total: number;
    area_arable: number;
    area_vegetation: number;
    produtorRuralId: string;
}

export interface FarmInput {
    name: string;
    city: string;
    state: string;
    area_total: number;
    area_arable: number;
    area_vegetation: number;
    produtorRuralId: string;
    FarmCultures?: { culture: Culture }[];
}

export interface FarmCultures {
    farmId: string;
    culture: Culture
}

export interface FarmCulturesInput{
    farmId: string;
    culture: Culture
}
