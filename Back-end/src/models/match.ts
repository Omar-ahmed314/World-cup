import Client from "../database";

export type match = {
    matchID?: number,
    firstTeam: string,
    secondTeam: string,
    stadiumID: number,
    matchDay: string,
    matchTime: string,
	referee: string,
	linemanOne: string,
	linemanTwo: string,
};

export type matchWithStadium = {
    matchID?: number,
    firstTeam: string,
    secondTeam: string,
    stadiumID: number,
    matchDay: string,
    matchTime: string,
    referee: string,
    linemanOne: string,
    linemanTwo: string,
    stadiumName: string
};

export default class Match {
    async indexWithStadium(): Promise<matchWithStadium[]> {
        try {
            const connection = await Client.connect();
            const sql = 'SELECT * FROM "Matches", "Stadiums" WHERE "Matches"."stadiumID" = "Stadiums"."stadiumID"';
            const result = await connection.query(sql);
            connection.release();
            return result.rows;
        } catch (error) {
            throw new Error(`connection failed at the index query with error ${error}`);
        }
    }

    async index(): Promise<match[]> {
        try {
            const connection = await Client.connect();
            const sql = 'SELECT * FROM "Matches"';
            const result = await connection.query(sql);
            connection.release();
            return result.rows;
        } catch (error) {
            throw new Error(`connection failed at the index query with error ${error}`);
        }
    }

    async show(id: number): Promise<match> {
        try {
            const connection = await Client.connect();
            const sql = 'SELECT * FROM "Matches" WHERE "matchID" = ($1)';
            const result = await connection.query(sql, [id]);
            connection.release();
            return result.rows[0];
        } catch (error) {
            throw new Error(`connection failed at the show query with error ${error}`);
        }
    }

    async create(Match: match): Promise<match> {
        try {
            const connection = await Client.connect();

            const checksql = 'SELECT * FROM "Matches" WHERE ("secondTeam" = ($1) or "firstTeam" = ($2)) and "matchDay" = ($3);';
            const checkresult = await connection.query(checksql, [Match.firstTeam, Match.secondTeam, Match.matchDay]);
            if (checkresult.rowCount>0)
            {
                throw new Error(`Same team plays on the same day`);
            }

            const sql = 'INSERT INTO "Matches" ( "firstTeam","secondTeam","stadiumID","matchDay","matchTime",referee,"linemanOne","linemanTwo") VALUES (($1), ($2), ($3), ($4), ($5), ($6), ($7), ($8)) RETURNING *';
            const result = await connection.query(sql, [Match.firstTeam, Match.secondTeam, Match.stadiumID, Match.matchDay, Match.matchTime, Match.referee, Match.linemanOne, Match.linemanTwo]);
            connection.release();
            return result.rows[0];
        } catch (error) {
            throw new Error(`Cannot create new match: error ${error}`);
        }
    }

    async edit(Match: match): Promise<match> {
        try {
            const connection = await Client.connect();
            const sql = 'UPDATE "Matches" SET "firstTeam" = ($1), "secondTeam" = ($2), "stadiumID" = ($3), "matchTime" = ($4), referee = ($5), "linemanOne" = ($6), "linemanTwo" = ($7), "matchDay" = ($8) WHERE "matchID" = ($9) RETURNING *';
            const result = await connection.query(sql, [Match.firstTeam, Match.secondTeam, Match.stadiumID, Match.matchTime, Match.referee, Match.linemanOne, Match.linemanTwo, Match.matchDay, Match.matchID]);
            connection.release();
            return result.rows[0];
        } catch (error) {
            throw new Error(`Cannot edit the match: error ${error}`);
        }
    }

    async delete(id: number): Promise<match> {
        try {
            const connection = await Client.connect();
            const sql = 'DELETE FROM "Matches" WHERE "matchID" = ($1)';
            const result = await connection.query(sql, [id]);
            connection.release();
            return result.rows[0];
        } catch (error) {
            throw new Error(`Cannot delete the match: error ${error}`);
        }
    }

    async deleteAll(): Promise<match> {
        try {
            const connection = await Client.connect();
            const sql = 'DELETE FROM "Matches";';
            const result = await connection.query(sql);
            connection.release();
            return result.rows[0];
        } catch (error) {
            throw new Error(`Cannot delete all the matches: error ${error}`);
        }
    }
}