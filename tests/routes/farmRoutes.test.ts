import request from "supertest";
import { app } from "../../app";
import { produtorSchema } from "../../src/validation/produtorValidation";

describe("Farm Routes test list all", () => {
  it("should list all farms", async () => {
    const response = await request(app).get("/farm");
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });
});

describe("create farm", () => {
  it("should create farm and delete", async () => {
    const produtorData = {
      name: "Test Produtor create",
      document: "44.667.650/0001-60",
    };
    const validateData = produtorSchema.safeParse(produtorData);

    if (validateData.success) {
      const produtorCreate = await request(app)
        .post(`/farm`)
        .send(produtorData);
      const farmData = {
        name: "Fazenda Galo branco",
        city: "São José Dos Campos",
        state: "SP",
        area_total: 500,
        area_arable: 100,
        area_vegetation: 100,
        produtorRuralId: produtorCreate.body.id,
      };

      await request(app).post("/farm").send(farmData);
      const dele = await request(app).delete(
        `/produtor/${farmData.produtorRuralId}`
      );
      expect(dele.statusCode).not.toBe(null);
    }
  });
});

describe("Farm Routes test", () => {
  it("should not create a farm if the produtor does not exist", async () => {
    const farmData = {
      name: "Fazenda Galo branco",
      city: "São José Dos Campos",
      state: "SP",
      area_total: 500,
      area_arable: 100,
      area_vegetation: 100,
      produtorRuralId: "produtorCreate",
    };

    const response = await request(app).post("/farm").send(farmData);
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("error", [
      "O campo produtorRuralId é um UUID tipo string.",
    ]);
  });
});

describe("farm and culture create and delete at end", () => {
  it("should create a farm and culture", async () => {
    const produtorData = {
      name: "test jest ronaldo",
      document: "232.650.800-99",
    };
    const validateData = produtorSchema.safeParse(produtorData);
    if (validateData.success) {
      const produtorCreate = await request(app)
        .post(`/produtor`)
        .send(produtorData)
        .expect(200);
      const dataCreate = {
        city: "jest test São Paulo",
        state: "jest test SP",
        area_total: 34,
        area_arable: 12,
        area_vegetation: 13,
        name: "fazenda galo branco",
        produtorRuralId: produtorCreate.body.id,
        FarmCultures: [
          {
            culture: "CORN",
          },
        ],
      };

      const response = await request(app)
        .post(`/farm`)
        .send(dataCreate)
        .expect(200);
      expect(response.body).toHaveProperty(
        "produtorRuralId",
        dataCreate.produtorRuralId
      );
      await request(app)
        .delete(`/produtor/${produtorCreate.body.id}`)
        .expect(200);
    }
  });
});

describe("fail farm and culture create", () => {
  it("should not create a farm culture if the farm does not exist", async () => {
    const farmId = "fail";
    const cultureData = {
      culture: "SOYBEAN",
    };

    const response = await request(app)
      .post(`/culture/${farmId}`)
      .send(cultureData);
    expect(response.body).toHaveProperty("message", "fazenda não encontrada");
  });
});

