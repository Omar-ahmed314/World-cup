import app from "../../server";
import supertest from "supertest";
import { user } from "../../models/user";
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';

dotenv.config();
const superTest = supertest(app);


describe("Testing user routes", () => {
    let userTest: user;
    let token: string;
    describe("Testing create endpoint", () => {
        it("should create the user", async () => {
            const data = await superTest.post('/user').send({
                first_name: 'omar',
                last_name: 'ahmed',
                password: 'password123'
            });
            userTest = data.body;
            token = data.headers.authorization;
            const hashedPassword = bcrypt.compareSync(
                'password123'.concat(process.env.SECRET_KEY as unknown as string),
                data.body.password
                );
            expect(data.status).toEqual(201);
            expect(data.body.first_name).toEqual('omar');
            expect(data.body.last_name).toEqual('ahmed');
            expect(hashedPassword).toBeTrue();
        });
        it("shouldn't create the null user and return error", async () => {
            const data = await superTest.post('/user').send({
                first_name: null,
                last_name: '',
                password: 'password123'
            });
            expect(data.status).toEqual(400);
        });
        it("shouldn't create the undefined user and return error", async () => {
            const data = await superTest.post('/user').send({
                first_name: undefined,
                last_name: '',
                password: 'password123'
            });
            expect(data.status).toEqual(400);
        });
    });

    describe("Testing index endpoint", () => {
        it("should return non empty array", async () => {
            const data = await superTest.get('/user')
            .set('authorization', token);
            expect(data.body[0].first_name).toEqual('omar');
            expect(data.body[0].last_name).toEqual('ahmed');
            expect(data.status).toEqual(200);
        });
        it("should return unauthorized request", async () => {
            const data = await superTest.get('/user');
            expect(data.body.msg).toEqual('access token not valid');
            expect(data.status).toEqual(401);
        });
    });


    describe("Testing show endpoint", () => {
        it("should return the needed user", async () => {
            const data = await superTest.get(`/user/${userTest.id}`)
            .set('authorization', token);
            expect(data.status).toEqual(200);
            expect(data.body.first_name).toEqual('omar');
            expect(data.body.last_name).toEqual('ahmed');
        });
        it("should return unauthorized token", async () => {
            const data = await superTest.get(`/user/${userTest.id}`)
            expect(data.status).toEqual(401);
            expect(data.body.msg).toEqual('access token not valid');
        });
        it("should return bad request due to wrong id = abc", async () => {
            const data = await superTest.get(`/user/abc`)
            .set('authorization', token);
            expect(data.status).toEqual(400);
        });
    });

    describe("Testing edit endpoint", () => {
        it("should edit the needed user", async () => {
            const data = await superTest.put(`/user`)
            .set('authorization', token)
            .send({
                id: userTest.id,
                first_name: 'omar',
                last_name: 'ahmed',
                password: 'password234'
            });
            userTest = data.body;
            const hashedPassword = bcrypt.compareSync(
                'password234'.concat(process.env.SECRET_KEY as unknown as string),
                data.body.password
                );
            expect(data.status).toEqual(201);
            expect(data.body.first_name).toEqual('omar');
            expect(data.body.last_name).toEqual('ahmed');
            expect(hashedPassword).toBeTrue();
        });
        it("should return unauthorized token", async () => {
            const data = await superTest.put(`/user`)
            .send({
                id: userTest.id,
                first_name: 'omar',
                last_name: 'ahmed',
                password: 'password234'
            });
            expect(data.status).toEqual(401);
        });
    });

    describe("Testing delete endpoint", () => {
        it("should delete the needed user", async () => {
            const data = await superTest.delete(`/user/${userTest.id}`)
            .set('authorization', token);
            expect(data.status).toEqual(200);
        });
        it("should return unauthorized token", async () => {
            const data = await superTest.delete(`/user/${userTest.id}`)
            expect(data.status).toEqual(401);
        });
    });
});