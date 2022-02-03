import Joi from "joi";
import User from "../models/user";
import CustomErrorHandler from "../services/CustomErrorHandler";

const registerController = {
  async rgister(req, res, next) {
    //get data from user
    const { name, email, password, repeat_password } = req.body;
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
    res.json(req.body);
  },
};

export default registerController;
