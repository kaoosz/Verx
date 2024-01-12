import { ProdutorRural,ProdutorRuralInput } from "../../types/produtor.rural";

export interface IProdutorService {
    findAllProdutors(): Promise<ProdutorRural[]>;
    findProdutorById(id: string): Promise<ProdutorRural | null>;
    createProdutor(data: ProdutorRuralInput): Promise<ProdutorRural>;
    updateProdutor(id: string, data: ProdutorRuralInput): Promise<ProdutorRural>;
    deleteProdutor(id: string): Promise<void>;
}