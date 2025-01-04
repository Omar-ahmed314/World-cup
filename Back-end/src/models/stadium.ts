import Client from "../database";

export type stadium = {
    stadiumID?: number,
    stadiumName: string,
    noRows: number,
	noSeatsPerRow: number,
    imageURL: string
};

export default class Stadium {
    async index(): Promise<stadium[]> {
        try {
            const connection = await Client.connect();
            const sql = 'SELECT * FROM "Stadiums"';
            const result = await connection.query(sql);
            connection.release();
            return result.rows;
        } catch (error) {
            throw new Error(`connection failed at the index query with error ${error}`);
        }
    }

    async show(id: number): Promise<stadium> {
        try {
            const connection = await Client.connect();
            const sql = 'SELECT * FROM "Stadiums" WHERE "stadiumID" = ($1)';
            const result = await connection.query(sql, [id]);
            connection.release();
            return result.rows[0];
        } catch (error) {
            throw new Error(`connection failed at the show query with error ${error}`);
        }
    }

    async create(Stadium: stadium): Promise<stadium> {
        try {
            const connection = await Client.connect();
            const sql = 'INSERT INTO "Stadiums" ("stadiumName", "noRows", "noSeatsPerRow", "imageURL") VALUES (($1), ($2), ($3), ($4)) RETURNING *';
            const result = await connection.query(sql, [Stadium.stadiumName, Stadium.noRows, Stadium.noSeatsPerRow, Stadium.imageURL]);
            connection.release();
            return result.rows[0];
        } catch (error) {
            throw new Error(`Cannot create new stadium: error ${error}`);
        }
    }

    async edit(Stadium: stadium): Promise<stadium> {
        try {
            const connection = await Client.connect();
            const sql = 'UPDATE "Stadiums" SET "stadiumName" = ($1), "noRows" = ($2), "noSeatsPerRow" = ($3), "imageURL" = ($4) WHERE "stadiumID" = ($5) RETURNING *';
            const result = await connection.query(sql, [Stadium.stadiumName, Stadium.noRows, Stadium.noSeatsPerRow, Stadium.imageURL, Stadium.stadiumID]);
            connection.release();
            return result.rows[0];
        } catch (error) {
            throw new Error(`Cannot edit the stadium: error ${error}`);
        }
    }

    async delete(id: number): Promise<stadium> {
        try {
            const connection = await Client.connect();
            const sql = 'DELETE FROM "Stadiums" WHERE "stadiumID" = ($1) RETURNING *';
            const result = await connection.query(sql, [id]);
            connection.release();
            return result.rows[0];
        } catch (error) {
            throw new Error(`Cannot delete the match: error ${error}`);
        }
    }

    async deleteAll(): Promise<stadium> {
        try {
            const connection = await Client.connect();
            const sql = 'DELETE FROM "Stadiums";';
            const result = await connection.query(sql);
            connection.release();
            return result.rows[0];
        } catch (error) {
            throw new Error(`Cannot delete all the matches: error ${error}`);
        }
    }
}