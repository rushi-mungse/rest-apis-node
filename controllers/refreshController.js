import JwtService from "../services/JwtService";
import Joi from "joi";
import User from "../models/user";
import { JWT_REFRESH_SECRET } from "../config";
import Refresh from "../models/refresh";

const refreshController = {
  async refresh(req, res, next) {
    const { refresh_token: refreshToken } = req.body;
    const refreshSchema = Joi.object({
      refresh_token: Joi.string().required(),
    });

    const { error } = refreshSchema.validate(req.body);
    if (error) {
      return next(error);
    }

    try {
      const { _id } = await JwtService.verify(refreshToken, JWT_REFRESH_SECRET);
      if (!_id) {
        return next(new Error("Token is invald"));
      }
      const user = await User.findOne({ _id });
      if (!user) {
        return next(new Error("User not fond"));
      }
      const access_token = await JwtService.sign({
        _id: user._id,
        role: user.role,
      });
      const refresh_token = await JwtService.sign(
        { _id: user._id, role: user.role },
        "1y",
        JWT_REFRESH_SECRET
      );
      await Refresh.create({ refreshToken: refresh_token });
      res.status(200).json({ refresh_token, access_token });
    } catch (error) {
      return next(error);
    }
  },
};

export default refreshController;
