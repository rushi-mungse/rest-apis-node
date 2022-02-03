import mongoose from "mongoose";
import { DB_URL } from "./config";
//connection of database
function DbConnect() {
  mongoose.connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const db = mongoose.connection;

  db.on("error", console.error.bind(console, "connection error:"));

  db.once("open", () => {
    console.log("DB Connected..");
  });
}

export default DbConnect;
