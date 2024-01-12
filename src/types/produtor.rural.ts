
export interface ProdutorRural {
    id: string;
    name: string;
    document: string;

    farms?:{
        id: string;
        name: string;
        city: string;
        state: string;
    }[];

}

export interface ProdutorRuralInput {
    name: string;
    document: string
}

export interface ProdutorRuralInputUpdate {
    name?: string;
    document?: string
}
