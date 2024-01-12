import { z } from "zod";
import { invalidTypeMessage, requiredMessage } from "./validation.functions";
import { checkCpfAndCnpjIsValid } from "../helpers/checkCpfAndCnpj";

export const produtorSchema = z.object({
    name: z.string({
        required_error: requiredMessage("name"),
        invalid_type_error: invalidTypeMessage("name", "string")
    }),
    document: z.string().refine(doc => checkCpfAndCnpjIsValid(doc),{
        message: `documento Invalido deve ser CPF ou CNPJ válido`
    })
}).strip();
