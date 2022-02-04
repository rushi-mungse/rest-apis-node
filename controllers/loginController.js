import Joi from "joi";
import User from "../models/user";
import CustomErrorHandler from "../services/CustomErrorHandler";
import bcrypt from "bcrypt";
import JwtService from "../services/JwtService";

const loginController = {
  //login api
  async login(req, res, next) {
    //get user data
    const { email, password } = req.body;
    //validate user data
    const loginSchema = new Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
    });

    const { error } = loginSchema.validate(req.body);
    if (error) {
      return next(error);
    }
    try {
      const user = await User.findOne({ email });

      if (!user)
        return next(
          CustomErrorHandler.wrongCreditials("Username and password wrong")
        );

      const mach = await bcrypt.compare(password, user.password);

      if (!mach)
        return next(
          CustomErrorHandler.wrongCreditials("Username and password wrong")
        );
      const access_token = await JwtService.sign({ _id: user._id });
      return res.status(200).json({ access_token });
    } catch (error) {
      return next(error);
    }
  },
};
export default loginController;
