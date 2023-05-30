import Product, { product } from "../../models/product";

const productModel = new Product();

describe("Testing the product model", () => {
    let productTest: product;
    describe("Testing the index function", () => {
        it("The function should be declared", () => {
            expect(productModel.index).toBeDefined();
        });
        it("The table should be empty", async () => {
            const data = await productModel.index();
            expect(data).toEqual([]);
        });
    });

    describe("Testing the create function", () => {
        it("The function should be declared", () => {
            expect(productModel.create).toBeDefined();
        });
        it("The product should be created", async () => {
            const productData: product = {
                id: 1,
                title: 'oil',
                price: 10,
            };
            productTest = await productModel.create(productData);
            expect(productTest).toBeDefined();
            expect(productTest.title).toEqual('oil');
            expect(productTest.price).toEqual(10);
        });
    });

    describe("Testing the show function", () => {
        it("The function should be declared", () => {
            expect(productModel.show).toBeDefined();
        });
        it("The product should be exist", async () => {
            const data = await productModel.show(productTest.id);
            expect(data).toBeDefined();
            expect(data.title).toEqual('oil');
            expect(data.price).toEqual(10);
        });
    });

    describe("Testing the edit function", () => {
        it("The function should be declared", () => {
            expect(productModel.edit).toBeDefined();
        });
        it("The product should be updated", async () => {
            const productData: product = productTest;
            productData.price = 30;
            const data = await productModel.edit(productData);
            expect(data).toBeDefined();
            expect(data.title).toEqual('oil');
            expect(data.price).toEqual(30);
        });
    });

    describe("Testing the delete function", () => {
        it("The function should be declared", () => {
            expect(productModel.delete).toBeDefined();
        });
        it("The product should be deleted", async () => {
            await productModel.delete(productTest.id);
            const data = await productModel.show(productTest.id);
            expect(data).toBeUndefined();
        });
    });

    afterAll(async () => {
        await productModel.deleteAll();
    });
});