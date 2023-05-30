import Client from "../database";
import { user } from "../models/user";

export default class miscQueries {
    async getAllUnauthorizedUsers():
     Promise<user[]> {
        try {
            const connection = await Client.connect();
            const sql = `select *
                            from "USERS" WHERE "userRole"='manager' AND "userApproved"=false`;
            const result = await connection.query(sql);
            connection.release();
            return result.rows;
        } catch (error) {
            throw new Error(`connection failed at the getAllUnauthorizedUsers with error: ${error}`);
        }
    }

    async getUserByName(userName: string): Promise<user> {
        try {
            const connection = await Client.connect();
            const sql = 'SELECT * FROM "USERS" WHERE "userName" = ($1)';
            const result = await connection.query(sql, [userName]);
            connection.release();
            return result.rows[0];
        } catch (error) {
            throw new Error(`connection failed at the getUserByName with error: ${error}`);
        }
    }

}