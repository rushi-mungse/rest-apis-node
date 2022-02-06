import Joi from "joi";
import User from "../models/user";
import CustomErrorHandler from "../services/CustomErrorHandler";
import bcrypt from "bcrypt";
import JwtService from "../services/JwtService";
import { JWT_REFRESH_SECRET } from "../config";
import Refresh from "../models/refresh";

const registerController = {
  //register api
  async rgister(req, res, next) {
    //get data from user
    const { name, email, password } = req.body;
    //validate user data
    const userSchema = Joi.object({
      name: Joi.string().min(3).max(30).required(),
      email: Joi.string().email().required(),
      password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
      repeat_password: Joi.ref("password"),
    });
    //if error is got
    const { error } = userSchema.validate(req.body);
    if (error) {
      return next(error);
    }
    //check if user in database
    try {
      const exist = await User.exists({ email });
      if (exist) {
        return next(
          CustomErrorHandler.alreadyExist("This email is already taken.")
        );
      }
    } catch (error) {
      return next(error);
    }

    //Hash password
    const hashPassword = await bcrypt.hash(password, 10);
    const user = new User({
      name,
      email,
      password: hashPassword,
    });
    let access_token, refresh_token;
    try {
      const result = await user.save();
      //creating access token
      access_token = await JwtService.sign({
        _id: result._id,
        role: result.role,
      });

      refresh_token = await JwtService.sign(
        {
          _id: result._id,
          role: result.role,
        },
        "1y",
        JWT_REFRESH_SECRET
      );

      await Refresh.create({ refreshToken: refresh_token });
    } catch (error) {
      return next(error);
    }

    res.json({ access_token, refresh_token });
  },
};

export default registerController;
