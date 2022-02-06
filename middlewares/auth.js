import CustomErrorHandler from "../services/CustomErrorHandler";
import JwtService from "../services/JwtService";

const auth = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return next(CustomErrorHandler.unAuthrised("unAuthrised..."));
  }

  const token = authHeader.split(" ")[1];

  try {
    const { _id, role } = await JwtService.verify(token);
    console.log(role);

    if (!_id && !role) {
      return next(CustomErrorHandler.unAuthrised("unAuthrised..."));
    }

    const user = {
      _id,
      role,
    };
    req.user = user;

    next();
  } catch (error) {
    return next(error);
  }
};

export default auth;
