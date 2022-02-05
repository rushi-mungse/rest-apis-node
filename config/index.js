//import dotenv module
const dotenv = require("dotenv");
dotenv.config();

//export all environment variables
export const { APP_PORT, DEBUG_MODE, DB_URL, JWT_SECRET, JWT_REFRESH_SECRET } =
  process.env;
