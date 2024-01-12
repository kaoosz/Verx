import request from "supertest";
import { app } from "../../app";
import { ProdutorService } from "../../src/services/produtor.service";
import { produtorSchema } from "../../src/validation/produtorValidation";
import { FarmService } from "../../src/services/farm.service";
import { prisma } from "../../src/services/prisma.service";

const produtorService = new ProdutorService(prisma);
const farmService = new FarmService(prisma);

describe("FarmController", () => {
  it("farm list all controller", async () => {
    const response = await request(app).get("/farm");
    expect(response.statusCode).toBe(200);
  });
});

describe("FarmController create and delete", () => {
  it("create and delete with controller farm", async () => {
    const produtorData = { name: "Test Produtor", document: "067.197.770-92" };
    const firstResult = produtorSchema.safeParse(produtorData);
    let produtor = null;
    if (firstResult.success) {
      produtor = await (await produtorService.createProdutor(produtorData)).id;
      const dataCreate = {
        city: "jest test São Paulo",
        state: "jest test SP",
        area_total: 34,
        area_arable: 12,
        area_vegetation: 13,
        name: "fazenda galo branco",
        produtorRuralId: produtor,
      };
      const farm = await (await farmService.createFarm(dataCreate)).id;
      await farmService.deleteFarm(farm as string);

      await produtorService.deleteProdutor(produtor);
      expect(produtor).not.toBe(null);
    }
  });
});

describe("create and find by id and delete", () => {
  it("create and delete with controller farm", async () => {
    const produtorData = { name: "jest", document: "760.313.990-24" };
    const firstResult = produtorSchema.safeParse(produtorData);
    let produtor = null;
    if (firstResult.success) {
      produtor = await (await produtorService.createProdutor(produtorData)).id;
      const dataCreate = {
        city: "jest",
        state: "jest",
        area_total: 34,
        area_arable: 12,
        area_vegetation: 13,
        name: "fazendao",
        produtorRuralId: produtor,
      };
      const farm = await (await farmService.createFarm(dataCreate)).id;

      if (farm) {
        const find = await (await farmService.findFarmById(farm))?.id;
        if (find) {
          await farmService.deleteFarm(find);
        }
      }
      const deleteProdu = await produtorService.deleteProdutor(produtor);
      expect(deleteProdu).toBeUndefined();
    }
  });
});

describe("farm by id", () => {
  it("create and delete with controller farm", async () => {
    const produtorData = {
      name: "Test find by id",
      document: "620.504.680-67",
    };
    const validateData = produtorSchema.safeParse(produtorData);
    let produtorCreate = "";
    if (validateData.success) {
      produtorCreate = (await produtorService.createProdutor(validateData.data))
        .id;
      expect(produtorCreate).not.toBe(null);
      const dataCreate = {
        city: "jest",
        state: "jest",
        area_total: 34,
        area_arable: 12,
        area_vegetation: 13,
        name: "fazendao",
        produtorRuralId: produtorCreate,
      };

      const farm = await (await farmService.createFarm(dataCreate)).id;
      if (farm) {
        const find = await (await farmService.findFarmById(farm))?.id;
        if (find) {
          await farmService.deleteFarm(find);
        }
      }
      const deleteProdu = await produtorService.deleteProdutor(produtorCreate);
      expect(deleteProdu).toBeUndefined();
    }
  });
});

