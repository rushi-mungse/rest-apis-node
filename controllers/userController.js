import Joi from "joi";
import { JWT_REFRESH_SECRET } from "../config";
import User from "../models/user";
import Refresh from "../models/refresh";
import CustomErrorHandler from "../services/CustomErrorHandler";
import JwtServices from "../services/JwtService";

const userController = {
  async me(req, res, next) {
    try {
      const user = await User.findOne({ _id: req.user._id }).select(
        "-password -createdAt -updatedAt -__v"
      );
      if (!user) {
        return next(CustomErrorHandler.unAuthrised("unAuthrised..."));
      }
      return res.status(200).json({ user });
    } catch (error) {
      return next(error);
    }
  },
  async logout(req, res, next) {
    const { refresh_token } = req.body;
    try {
      const { _id } = await JwtServices.verify(
        refresh_token,
        JWT_REFRESH_SECRET
      );

      const refreshSchema = Joi.object({
        refresh_token: Joi.string().required(),
      });

      const { error } = refreshSchema.validate(req.body);
      if (error) return next(error);

      const user = await User.findOne({ _id });
      if (!user) {
        return next(new Error("User not found..."));
      }

      await Refresh.findOneAndDelete({ refreshToken: refresh_token });

      return res.status(200).json({ user });
    } catch (error) {
      return next(new Error("Internal error"));
    }
  },
};

export default userController;
