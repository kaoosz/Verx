import { produtor } from "./mocks/produtor";
import { prisma } from "../src/services/prisma.service";
import { farms } from "./mocks/farm";
import { Culture } from "@prisma/client";

async function produtorSeeding(){
    try {
        for(let index = 0; index < produtor.length;index++){
            const produtoRural = await prisma.produtorRural.create({
               data:produtor[index]
            })
            const { cultures, ...rest } = farms[index]

            const farm = await prisma.farm.create({
                data:{...rest,produtorRuralId:produtoRural.id}
            })
            if(farms[index].cultures){
                for(const culture  of farms[index].cultures){

                    await prisma.farmCultures.create({
                        data:{
                            farmId: farm.id,
                            culture: culture as Culture
                        }
                    })
                }

            }
        }
        
    } catch (error) {
        console.error(error);
    }
}
produtorSeeding();