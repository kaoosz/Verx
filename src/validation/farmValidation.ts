import { z } from "zod";
import { invalidTypeMessage, invalidUUIDTypeMessage, requiredMessage } from "./validation.functions";

const CultureEnum = z.enum(['SOYBEAN', 'CORN', 'COTTON', 'COFFEE', 'SUGARCANE']);


export const farmCultureSchema = z.object({
    culture: CultureEnum.optional(),
    farmId: z.string({
        required_error: requiredMessage("farmId"),
        invalid_type_error: invalidTypeMessage("farmId","string")
    }).uuid({
        message: invalidUUIDTypeMessage("farmId")
    }).optional()
}).strip().refine((data) => data.culture != null,{
    message: "Cultura inválida ou não fornecida"
})

export const farmSchema = z.object({
    name: z.string({
        required_error: requiredMessage("name"),
        invalid_type_error: invalidTypeMessage("name", "string")
    }),
    city: z.string({
        required_error: requiredMessage("city"),
        invalid_type_error: invalidTypeMessage("city", "string")
    }),
    state: z.string({
        required_error: requiredMessage("state"),
        invalid_type_error: invalidTypeMessage("state", "string")
    }),
    area_total: z.number({
        required_error: requiredMessage("area_total"),
        invalid_type_error: invalidTypeMessage("area_total", "number")
    }),
    area_arable: z.number({
        required_error: requiredMessage("area_arable"),
        invalid_type_error: invalidTypeMessage("area_arable", "number")
    }),
    area_vegetation: z.number({
        required_error: requiredMessage("area_vegetation"),
        invalid_type_error: invalidTypeMessage("area_vegetation", "number")
    }),
    produtorRuralId: z.string({
        required_error: requiredMessage("produtorRuralId"),
        invalid_type_error: invalidTypeMessage("produtorRuralId","uuid")
    }).uuid({
        message: invalidUUIDTypeMessage("produtorRuralId")
    }),
    FarmCultures: z.array(farmCultureSchema).optional(),
}).strip()
.refine((data) => data.area_arable + data.area_vegetation <= data.area_total,{
    message: "A soma das áreas agricultáveis e de vegetação não pode ser maior que a área total da fazenda.",
});
