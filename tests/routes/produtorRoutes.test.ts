import request from 'supertest';
import { app } from "../../app";
import { produtorSchema } from "../../src/validation/produtorValidation";


describe("Produtor routes test", () => {

    it('test create and delete', async () => {
        const produtorData = { name: 'Test Produtor and delete', document: '60.735.474/0001-03' };
        const responseCreate = await request(app)
            .post('/produtor')
            .send(produtorData)

        // ID do produtor criado pode ser extraído da resposta
        const produtorCreateId = responseCreate.body.id;

        const responseDelete = await request(app)
            .delete(`/produtor/${produtorCreateId}`)
            .expect(200);
    });
    it("find produtor by id test", async () => {
        const produtorData = { name: 'test create and find by id', document: '65.263.151/0001-88' };
        const validateData = produtorSchema.safeParse(produtorData);

        if (validateData.success) {
            const responseCreate = await request(app).post('/produtor').send(validateData.data)
            const findProdutor = await request(app).get(`/produtor/${responseCreate.body.id}`)
            await request(app).delete(`/produtor/${findProdutor.body.id}`).expect(200);

        }
    });

    it("create produtor by routes", async () => {
        const produtorData = { name: 'test create by route', document: '868.645.480-15' };
        const validateData = produtorSchema.safeParse(produtorData);

        if (validateData.success) {
            const responseCreate = await request(app).post('/produtor').send(validateData.data)
            await request(app).delete(`/produtor/${responseCreate.body.id}`).expect(200);
        }

    });

    it("update produtor by routes", async () => {
        const produtorData = { name: 'test create by route', document: '665.308.190-70' };
        const validateData = produtorSchema.safeParse(produtorData);

        if (validateData.success) {
            const responseCreate = await request(app).post('/produtor').send(validateData.data)
            const responseUpdate = await 
            request(app).patch(`/produtor/${responseCreate.body.id}`).send(
                {name: 'updated'}
            )
            await request(app).delete(`/produtor/${responseUpdate.body.id}`).expect(200);
        }
    });

});
