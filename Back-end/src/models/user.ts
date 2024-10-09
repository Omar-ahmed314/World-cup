import Client from "../database";


export type user = {
    userID?: number,
    userName: string,
    firstName: string,
    lastName: string,
    gender: "male" | "female",
    nationality?: string,
    birthDate: string,
    pass: string,
    email: string,
    userRole: "manager" | "fan" | "admin",
    roleApproved: boolean,
};


export default class User {
    async index(): Promise<user[]> {
        try {
            const connection = await Client.connect();
            const sql = 'SELECT * FROM "USERS"';
            const result = await connection.query(sql);
            connection.release();
            return result.rows;
        } catch (error) {
            throw new Error(`connection failed at the index query with error ${error}`);
        }
    }

    async show(userId: number): Promise<user> {
        try {
            const connection = await Client.connect();
            const sql = 'SELECT * FROM "USERS" WHERE "userID" = ($1)';
            const result = await connection.query(sql, [userId]);
            connection.release();
            return result.rows[0];
        } catch (error) {
            throw new Error(`connection field at the show query with error ${error}`);
        }

    }
    async create(User: user): Promise<user> {
        try {

            const connection = await Client.connect()
        
            const sql = 'INSERT INTO "USERS" ("userName","firstName","lastName",gender,nationality,"birthDate",pass,email,"userRole","roleApproved") VALUES (($1),($2),($3),($4),($5),($6),($7),($8),($9),($10)) RETURNING *;'
            const result = await connection.query(sql, [User.userName, User.firstName, User.lastName, User.gender, User.nationality, User.birthDate, User.pass, User.email, User.userRole, User.roleApproved])
            connection.release()
            return result.rows[0]
        } catch (error) {
            throw new Error(`Cannot create a new user: error ${error}`)
        }
    }

    async login(userName: String): Promise<user> {
        try {
            const connection = await Client.connect()
        
            const sql = 'SELECT * FROM "USERS" WHERE "userName" = ($1);'
            const result = await connection.query(sql, [userName])
            connection.release()
            return result.rows[0]
            
        } catch (error) {
            throw new Error(`Cannot login: error ${error}`)
        }
    }

    async edit(User: user): Promise<user> {
        try {
            const connection = await Client.connect();
            const sql = 'UPDATE "USERS" SET "userName"=($1), "firstName" = ($2), "lastName" = ($3), gender = ($4), nationality = ($5), "birthDate" = ($6), pass= ($7), "userRole" = ($8) RETURNING * ';
            const result = await connection.query(sql, [User.userName, User.firstName, User.lastName, User.gender, User.nationality, User.birthDate, User.pass, User.userRole]);
            connection.release();
            return result.rows[0];
        } catch (error) {
            throw new Error(`Cannot edit user with userID ${User.userID}: error ${error}`);
        }
    }

    async delete(userID: number): Promise<user> {
        try {
            const connection = await Client.connect()
            const sql = 'DELETE FROM "USERS" where "userID" = ($1) returning *'
            const result = await connection.query(sql, [userID])
            return result.rows[0]
        }
        catch (error) {
            throw new Error(`Cannot remove user with ID ${userID}: error ${error}`)
        }
    }


    async deleteAll(): Promise<user> {
        try {
            const connection = await Client.connect();
            const sql = 'DELETE FROM "USERS";';
            const result = await connection.query(sql);
            connection.release();
            return result.rows[0];
        } catch (error) {
            throw new Error(`Cannot delete all the users: error ${error}`);
        }
    }

    async userRoleApprove(userID: number): Promise<user> {
        try {
            const connection = await Client.connect()
            const sql = 'UPDATE "USERS" SET "roleApproved"=TRUE WHERE "userID" = ($1) RETURNING *'
            const result = await connection.query(sql, [userID])
            connection.release()
            return result.rows[0]
        }
        catch (error) {
            throw new Error(`cannot authorize user with ID ${userID}, error: ${error}`)
        }
    }

}