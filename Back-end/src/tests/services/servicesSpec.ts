import Order, { order } from "../../models/order";
import Product, { product } from "../../models/product";
import User, { user } from "../../models/user";
import miscQueries from "../../services/services";

const miscQueriesModel = new miscQueries();

describe("Testing the misc Queries (services)", () => {
    let userTest: user;
    let orderTest: order;
    let productTest: product;
    let userModel: User;
    let productModel: Product;
    let orderModel: Order;
    beforeAll(async () => {
        userModel = new User();
        productModel = new Product();
        orderModel = new Order();
        userTest = await userModel.create({
            id: 1,
            first_name: 'omar',
            last_name: 'ahmed',
            password: 'password123'
        });
    });
    describe("Testing get all incompleted orders function", () => {
        it("The function should be declared", async () => {
            expect(miscQueriesModel.getAllIncompletedOrders).toBeDefined();
        });
        it("The function should return all completed orders", async () => {
            orderTest = await orderModel.create({
                id: 1,
                user_id: userTest.id,
                status: false
            });
            productTest = await productModel.create({
                id: 1,
                title: 'rice',
                price: 20
            });
            await orderModel.addProductToOrder(orderTest.id, productTest.id, 30);
            const data = await miscQueriesModel.getAllIncompletedOrders(userTest.id);
            expect(data).toBeDefined();
            expect(data[0].product_id).toEqual(productTest.id);
            expect(data[0].title).toEqual(productTest.title);
            expect(data[0].price).toEqual(productTest.price);
            expect(data[0].quantity).toEqual(30);
            expect(data[0].status).toEqual(orderTest.status);
        });
        it("The function should return no completed orders", async () => {
            orderTest.status = true;
            await orderModel.edit(orderTest);
            const data = await miscQueriesModel.getAllIncompletedOrders(userTest.id);
            expect(data).toEqual([]);
        });
    });

    describe("Testing get user by name function", () => {
        it("The function should be declared", async () => {
            expect(miscQueriesModel.getUserByName).toBeDefined();
        });

        it("The function should return the user", async () => {
            const data = await miscQueriesModel.getUserByName('omar', 'ahmed');
            expect(data).toBeDefined();
            expect(data.first_name).toEqual('omar');
            expect(data.last_name).toEqual('ahmed')
        });

        it("The function should not return the user", async () => {
            const data = await miscQueriesModel.getUserByName('omar', 'Ahmed');
            expect(data).toBeUndefined();
        });
    });

    afterAll(async () => {
        await userModel.deleteAll();
        await productModel.deleteAll();
        await orderModel.deleteAll();
    })
})