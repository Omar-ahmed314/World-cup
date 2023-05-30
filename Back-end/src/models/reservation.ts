import Client from "../database";

export type reservation = {
    reservationID?: number,
    userID: number,
    matchID: number,
	seatNo: number,
};

export default class Reservation {
    async index(): Promise<reservation[]> {
        try {
            const connection = await Client.connect();
            const sql = 'SELECT * FROM "Reservations"';
            const result = await connection.query(sql);
            connection.release();
            return result.rows;
        } catch (error) {
            throw new Error(`connection failed at the index query with error ${error}`);
        }
    }

    async show(id: number): Promise<reservation> {
        try {
            const connection = await Client.connect();
            const sql = 'SELECT * FROM "Reservations" WHERE "reservationID" = ($1)';
            const result = await connection.query(sql, [id]);
            connection.release();
            return result.rows[0];
        } catch (error) {
            throw new Error(`connection failed at the show query with error ${error}`);
        }
    }

    async create(Reservation: reservation): Promise<reservation> {
        try {
            const connection = await Client.connect();
            const sql = 'INSERT INTO "Reservations" ("userID","matchID","seatNo") VALUES (($1), ($2), ($3)) RETURNING *';
            const result = await connection.query(sql, [Reservation.userID,Reservation.matchID, Reservation.seatNo]);
            connection.release();
            return result.rows[0];
        } catch (error) {
            throw new Error(`Cannot create new reservation: error ${error}`);
        }
    }

    async edit(Reservation: reservation): Promise<reservation> {
        try {
            const connection = await Client.connect();
            const sql = 'UPDATE "Reservations" SET "seatNo" = ($1) WHERE "reservationID" = ($2) RETURNING *';
            const result = await connection.query(sql, [Reservation.seatNo, Reservation.reservationID]);
            connection.release();
            return result.rows[0];
        } catch (error) {
            throw new Error(`Cannot edit the reservation: error ${error}`);
        }
    }

    async delete(id: number): Promise<reservation> {
        try {
            const connection = await Client.connect();
            const sql = 'DELETE FROM "Reservations" WHERE "reservationID" = ($1)';
            const result = await connection.query(sql, [id]);
            connection.release();
            return result.rows[0];
        } catch (error) {
            throw new Error(`Cannot delete the reservation: error ${error}`);
        }
    }

    async getReserved(matchID: number): Promise<reservation[]> {
        try {
            const connection = await Client.connect();
            const sql = 'SELECT * FROM "Reservations" WHERE "matchID" = ($1)';
            const result = await connection.query(sql, [matchID]);
            connection.release();
            return result.rows;
        } catch (error) {
            throw new Error(`Cannot get the reservations: error ${error}`);
        }
    }

    async getUserReservedMatches(userID: number): Promise<reservation[]> {
        try {
            const connection = await Client.connect();
            const sql = 'SELECT * FROM "Reservations", "Matches" WHERE "userID" = ($1) AND "Reservations"."matchID" = "Matches"."matchID";';
            const result = await connection.query(sql, [userID]);
            connection.release();
            return result.rows;
        } catch (error) {
            throw new Error(`Cannot get the reservations: error ${error}`);
        }
    }

    async deleteAll(): Promise<reservation> {
        try {
            const connection = await Client.connect();
            const sql = 'DELETE FROM "Reservations";';
            const result = await connection.query(sql);
            connection.release();
            return result.rows[0];
        } catch (error) {
            throw new Error(`Cannot delete all the reservations: error ${error}`);
        }
    }
}