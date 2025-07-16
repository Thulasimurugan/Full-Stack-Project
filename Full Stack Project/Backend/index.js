import  Express  from "express";
import cors from 'cors';
import DotEnv from 'dotenv';
import router from './router/index.js';
import { status } from "./statusCode/index.js";
import pool from "./service/index.js";

const envPath = `.env.${process.env.ENVIRONMENT || 'development'}`;
DotEnv.config({path:envPath});
const app = Express();
const port = process.env.PORT || 4000;
const statusCode = status.statusCode;

pool();
app.use(cors());
app.use(Express.json());
app.use(Express.urlencoded({extended:true}))
app.use(function(req, res, next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,POST");
    res.header("Access-Control-Allow-Headers", "Token");
    res.status(statusCode.OK);
    next();
});
app.use('/vitamins/',router);

app.listen(port,() => {
    console.log(`Tablet Backend is running at server is ${process.env.ENVIRONMENT} and port is ${port}`);
})