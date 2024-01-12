import { Culture } from "@prisma/client";

export interface Farm {
    id?: string;
    state: string;
    count: number;
}

export interface FarmAreaSum {
    area_arable_total: number;
    area_vegetation_total: number;
}

export interface FarmByState {
    state: string;
    count: number;
}
export interface FarmCultures {
    culture: Culture;
    count: number;
}
export interface FarmTotalArea {
    area_total: number;
}
