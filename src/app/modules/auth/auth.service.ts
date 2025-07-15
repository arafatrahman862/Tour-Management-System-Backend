/* eslint-disable @typescript-eslint/no-non-null-assertion */
import AppError from "../../errorHelpers/AppError";
import { User } from "../user/user.model";
import httpStatus from "http-status-codes";
import bcryptjs from "bcryptjs";
import { createNewAccessTokenWithRefreshToken, createUserTokens } from "../../utils/userTokens";
import { IUser } from "../user/user.interface";
import { JwtPayload } from "jsonwebtoken";
import { envVars } from "../../config/env";

const credentialLogin = async (payload: Partial<IUser>) => {
  const { email, password } = payload;

  const isUserExist = await User.findOne({
    email,
  });

  if (!isUserExist) {
    throw new AppError(httpStatus.BAD_REQUEST, "User does not exists");
  }

  const isPasswordMatch = await bcryptjs.compare(
    password as string,
    isUserExist.password as string
  );

  if (!isPasswordMatch) {
    throw new AppError(httpStatus.BAD_REQUEST, "Password is incorrect");
  }

  // const jwtPayload = {
  //   userId: isUserExist._id,
  //   email: isUserExist.email,
  //   role: isUserExist.role,
  // };

  // const accessToken = generateToken(
  //   jwtPayload,
  //   envVars.JWT_ACCESS_SECRET,
  //   envVars.JWT_ACCESS_EXPIRES
  // );
  // // const accessToken = jwt.sign(jwtPayload, "secretKey", {
  // //   expiresIn: "1d",
  // // });

  // const refreshToken = generateToken(
  //   jwtPayload,
  //   envVars.JWT_REFRESH_SECRET,
  //   envVars.JWT_REFRESH_EXPIRES
  // );

  const userTokens = createUserTokens(isUserExist);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const {password: pass, ...rest} = isUserExist.toObject();

  return {
    email: isUserExist.email,
    accessToken: userTokens.accessToken,
    refreshToken: userTokens.refreshToken,
    user: rest
  };
};
const getNewAccessToken = async (refreshToken: string) => {
  const newAccessToken = await createNewAccessTokenWithRefreshToken(
    refreshToken
  );

  return {
    accessToken: newAccessToken,
  };
};

const resetPassword = async (oldPassword: string, newPassword: string, decodedToken: JwtPayload) => {

const user = await User.findById(decodedToken.userId);

 
  const isOldPasswordMatch = await bcryptjs.compare(oldPassword, user!.password as string);
if (!isOldPasswordMatch) {
    throw new AppError(httpStatus.UNAUTHORIZED, "Old password is incorrect");
  }

 user!.password = await bcryptjs.hash(newPassword, Number(envVars.BCRYPT_SALT_ROUND));
user!.save();
  
};

export const AuthService = {
  credentialLogin,
  getNewAccessToken,
  resetPassword,
};
