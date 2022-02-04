import { JWT_SECRET } from "../config";
import jwt from "jsonwebtoken";

class JwtService {
  static sign(playload, expiry = "60s", secret = JWT_SECRET) {
    return jwt.sign(playload, secret, { expiresIn: expiry });
  }
  static verify(token, secret = JWT_SECRET) {
    return jwt.verify(token, secret);
  }
}

export default JwtService;
