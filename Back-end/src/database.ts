import { Pool } from 'pg';
import dotenv from 'dotenv';
dotenv.config();

const {
    POSTGRES_HOST,
    POSTGRES_DB,
    POSTGRES_DB_PORT,
    POSTGRES_DB_TEST,
    POSTGRES_USER,
    POSTGRES_PASSWORD,
    ENV
} = process.env;

let Client: Pool;

if(ENV === "dev") {
    Client = new Pool({
        host: POSTGRES_HOST,
        database: POSTGRES_DB,
        port: (POSTGRES_DB_PORT as unknown) as number,
        user: POSTGRES_USER,
        password: POSTGRES_PASSWORD
    });

} else {
    Client = new Pool({
        host: POSTGRES_HOST,
        database: POSTGRES_DB_TEST,
        port: (POSTGRES_DB_PORT as unknown) as number,
        user: POSTGRES_USER,
        password: POSTGRES_PASSWORD
    });
}
    


export default Client;