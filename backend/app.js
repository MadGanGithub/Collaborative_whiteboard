import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import routes from "./routes/routes.js";
import session from 'express-session';
import Keycloak from 'keycloak-connect';
import cors from "cors";
const app = express();
//cors
app.use(cors({
    credentials: true,
    origin: "http://localhost:3100",
}));
const memoryStore = new session.MemoryStore();
app.use(session({
    secret: 'mySecret',
    resave: false,
    saveUninitialized: true,
    store: memoryStore
}));
app.use(session({ secret: 'mySecret', resave: false, saveUninitialized: true }));
const keycloak = new Keycloak({ store: memoryStore });
app.use(keycloak.middleware());
const protect = keycloak.protect();
//This converts request body to json
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//cookie parser(if not used,cookies will be undefined)
app.use(cookieParser());
//body parser(To view in postman)
app.use(bodyParser.json());
app.use("/", protect, routes);
export { app, protect };
