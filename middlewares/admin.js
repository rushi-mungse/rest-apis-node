import User from "../models/user";
import CustomErrorHandler from "../services/CustomErrorHandler";

const admin = async (req, res, next) => {
  const _id = req.user._id;
  let document;
  try {
    document = await User.findOne({ _id });
  } catch (error) {
    return next(CustomErrorHandler.serverError("Internal error..."));
  }
  if (document.role === "admin") {
    return next();
  } else {
    res.status(404).json({ message: "You are not admin" });
  }
};
export default admin;
