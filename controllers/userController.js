import User from "../models/user";
import CustomErrorHandler from "../services/CustomErrorHandler";
const userController = {
  async me(req, res, next) {
    try {
      const user = await User.findOne({ _id: req.user._id });
      if (!user) {
        return next(CustomErrorHandler.unAuthrised("unAuthrised..."));
      }
      return res.status(200).json({ user });
    } catch (error) {
      return next(error);
    }
  },
};

export default userController;
