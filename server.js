import express from "express";
import { APP_PORT } from "./config";
import router from "./routers";
import errorHandler from "./middlewares/errorHandler";
import DbConnect from "./database";
import path from "path";

const app = express();

global.appRoot = path.resolve(__dirname);
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use("/uploads", express.static("uploads"));
app.use("/api", router);
app.use(errorHandler);
DbConnect();

app.get("/", (req, res) => {
  res.send(`Hello you are listening on port ${APP_PORT}`);
});

//creating server
app.listen(APP_PORT, console.log(`Server listening on port ${APP_PORT}`));
