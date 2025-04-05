import pkg from "pg";
import DotEnv from 'dotenv';

DotEnv.config({path:`.env.${process.env.ENVIRONMENT || 'development'}`});
const { Pool } = pkg;
const pool = new Pool({
    database: process.env.DB_DATABASE,
    host:process.env.DB_HOST,
    user:process.env.DB_USER,
    password:process.env.DB_PASSWORD,
    port:process.env.DB_PORT,
});

pool.connect((err) => {
    if(err){
        console.log(err);
    };
    console.log("Database is connected successfully");
});

export default pool;