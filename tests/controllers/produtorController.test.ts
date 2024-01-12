import { ProdutorController } from "../../src/controllers/produtorController";
import { prisma } from "../../src/services/prisma.service";
import request from "supertest";
import { app } from "../../app";
import { ProdutorService } from "../../src/services/produtor.service";
import { produtorSchema } from "../../src/validation/produtorValidation";
import { ProdutorRural } from "../../src/types/produtor.rural";


const produtorService = new ProdutorService(prisma);
const produtorcontroller = new ProdutorController(produtorService);

describe("ProdutorController", () => {
  it("list all produtors", async () => {
    const response = await request(app).get("/produtor");
    expect(response.statusCode).toBe(200);
  });

  it("creating a produtor with", async () => {
    const produtorData = { name: "Test Produtor", document: "418.400.820-89" };

    const firstResult = produtorSchema.safeParse(produtorData);
    if (firstResult.success) {
      const produtor = await produtorService.createProdutor(firstResult.data);
      await produtorService.deleteProdutor(produtor.id);
    }
    expect(firstResult.success).toBe(true);
  });

  it("fail create produtor with cpf and cnpj validate", async () => {
    const produtorData = { name: "Test Produtor", document: "123" };
    const resultValidate = produtorSchema.safeParse(produtorData);
    let produtor;
    if (resultValidate.success) {
      produtor = await produtorService.createProdutor(resultValidate.data);
    }
    expect(resultValidate.success).toBe(false);
  });

  it("spect not pass validate produtor rural create fail", async () => {
    const produtorData = { bug: "123", name: "Test Produtor", document: "55" };
    const resultValidate = produtorSchema.safeParse(produtorData);
    if (resultValidate.success) {
      await produtorService.createProdutor(resultValidate.data);
    }

    expect(resultValidate.success).toBe(false);
  });

  it("validate update produtor fails", async () => {
    const produtorData = { name: "Test jest Produtor fail", document: "123" };
    const resultValidate = produtorSchema.partial().safeParse(produtorData);

    expect(resultValidate.success).toBeFalsy();
  });

  it("update produtor pass", async () => {
    const produtorData = { name: "Test jest change name" };
    const getOne = await produtorService.findAllProdutors();
    const getId = getOne[0].id
    await produtorService.updateProdutor(getId, { ...produtorData });
    const checkName = await produtorService.findProdutorById(getId);
    expect(checkName?.name).toBe(produtorData.name);
  });

  it("test list all produtors controller", async () => {
    const produtor = await produtorService.findAllProdutors();
    expect(produtor).not.toBeNull();
  });

  it("test create and delete", async () => {
    const produtorData = {
      name: "Test Produtor and delete",
      document: "901.374.670-52",
    };
    const validateData = produtorSchema.safeParse(produtorData);
    let produtorCreate = "";
    if (validateData.success) {
      produtorCreate = (await produtorService.createProdutor(validateData.data))
        .id;
    }

    const deleteProdutor = await produtorService.deleteProdutor(produtorCreate);
    expect(deleteProdutor).toBe(undefined);
  });

  it("test create and find", async () => {
    const produtorData = {
      name: "Test find by id",
      document: "620.504.680-67",
    };
    const validateData = produtorSchema.safeParse(produtorData);
    // let produtorCreate : ProdutorRural = {
    //   id:"",
    //   document:"",
    //   name: ""
    // }

    let id = "";
    if (validateData.success) {
      let produtorCreate = await produtorService.createProdutor(validateData.data);
      id = produtorCreate.id
      const findProdutor = await produtorService.findProdutorById(id);
      expect(produtorCreate).toBe(findProdutor?.id);
    }

    await produtorService.deleteProdutor(id);
  });
});

