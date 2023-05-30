import app from "../../server";
import supertest from "supertest";
import { product } from "../../models/product";
import { user } from "../../models/user";
const superTest = supertest(app);


describe("Testing product routes", () => {
    let productTest: product;
    let userTest: user;
    let token: string;
    beforeAll(async () => {
        const data = await superTest.post('/user').send({
            first_name: 'omar',
            last_name: 'ahmed',
            password: 'password123'
        });
        userTest = data.body;
        token = data.headers.authorization;
    });

    describe("Testing index endpoint", () => {
        it("should return empty array", async () => {
            const data = await superTest.get('/product');
            expect(data.body).toEqual([]);
        });
    });

    describe("Testing create endpoint", () => {
        it("should return the created product", async () => {
            const data = await superTest.post('/product')
            .set('authorization', token)
            .send({
                title: 'rice',
                price: 30
            });
            productTest = data.body;
            expect(data.status).toEqual(201);
            expect(data.body.title).toEqual('rice');
            expect(data.body.price).toEqual(30);
        });
        it("should return unauthorized token", async () => {
            const data = await superTest.post('/product')
            .send({
                title: 'rice',
                price: 30
            });
            expect(data.status).toEqual(401);
        });
        it("should return bad request due to undefined title", async () => {
            const data = await superTest.post('/product')
            .set('authorization', token)
            .send({
                title: undefined,
                price: 30
            });
            expect(data.status).toEqual(400);
        });
        it("should return bad request due to undefined price", async () => {
            const data = await superTest.post('/product')
            .set('authorization', token)
            .send({
                title: 'rice',
                price: undefined
            });
            expect(data.status).toEqual(400);
        });
    });

    describe("Testing show endpoint", () => {
        it("should return the needed product", async () => {
            const data = await superTest.get(`/product/${productTest.id}`);
            expect(data.status).toEqual(200);
            expect(data.body.title).toEqual('rice');
            expect(data.body.price).toEqual(30);
        });
        it("should return bad request due to wrong id = abd", async () => {
            const data = await superTest.get(`/product/abc`);
            expect(data.status).toEqual(400);
        });
    });

    describe("Testing edit endpoint", () => {
        it("should edit the needed product", async () => {
            const data = await superTest.put(`/product`)
            .set('authorization', token)
            .send({
                id: productTest.id,
                title: 'rice',
                price: 40
            });
            productTest = data.body;
            expect(data.status).toEqual(201);
            expect(data.body.title).toEqual('rice');
            expect(data.body.price).toEqual(40);
        });
        it("should return unauthorized token", async () => {
            const data = await superTest.put(`/product`)
            .send({
                id: productTest.id,
                title: 'rice',
                price: 40
            });
            expect(data.status).toEqual(401);
        });
    });

    describe("Testing delete endpoint", () => {
        it("should delete the needed product", async () => {
            const data = await superTest.delete(`/product/${productTest.id}`)
            .set('authorization', token);
            expect(data.status).toEqual(200);
        });
        it("shouldn't delete the needed product due to unauthorized token", async () => {
            const data = await superTest.delete(`/product/${productTest.id}`)
            expect(data.status).toEqual(401);
        });
        it("should return bad request due to wrong id = abc", async () => {
            const data = await superTest.delete(`/product/abc`)
            .set('authorization', token);
            expect(data.status).toEqual(400);
        });
    });

    afterAll(async () => {
        await superTest.delete(`/user/${userTest.id}`)
        .set('authorization', token);
    })
});