import express from "express";
import { APP_PORT } from "./config";
import router from "./routers";
import errorHandler from "./middlewares/errorHandler";
import DbConnect from "./database";

const app = express();

app.use(express.json());
app.use("/api", router);
app.use(errorHandler);
DbConnect();
app.get("/", (req, res) => {
  res.send(`Hello you are listening on port ${APP_PORT}`);
});

//creating server
app.listen(APP_PORT, console.log(`Server listening on port ${APP_PORT}`));
