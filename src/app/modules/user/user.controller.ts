/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status-codes";
import { UserServices } from "./user.service";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { verifyToken } from "../../utils/jwt";
import { envVars } from "../../config/env";
import { JwtPayload } from "jsonwebtoken";


// const createUser = async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     const user = await UserServices.createUser(req.body);

//     res.status(httpStatus.CREATED).json({
//       message: "User created successfully",
//       user,
//     });
//     // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   } catch (err: any) {
//     // eslint-disable-next-line no-console
//     console.log(err);
//     next(err);
//   }
// };
const createUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const user = await UserServices.createUser(req.body);

  // res.status(httpStatus.CREATED).json({
  //   message: "User created successfully",
  //   user,
  // });

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "User Created Successfully",
    data: user,
  });
});
const updateUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

const userId = req.params.id;
// const token = req.headers.authorization
// const verifiedToken = verifyToken(token as string, envVars.JWT_ACCESS_SECRET) as JwtPayload; 

const verifiedToken = req.user;


const payload = req.body;

  const user = await UserServices.updateUser(
    userId,
    payload,
    verifiedToken as JwtPayload
  ); ;

  // res.status(httpStatus.CREATED).json({
  //   message: "User created successfully",
  //   user,
  // });

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "User Updated Successfully",
    data: user,
  });
});

// const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     const users = await UserServices.getAllUsers();

//     return users;
//     // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   } catch (err: any) {
//     // eslint-disable-next-line no-console
//     console.log(err);
//     next(err);
//   }
// };


const getAllUsers = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const result = await UserServices.getAllUsers();


  // res.status(httpStatus.OK).json({
  //   success: true,
  //   message: "All Users retrieved successfully",
  //   data: users,
  // });

   sendResponse(res, {
     success: true,
     statusCode: httpStatus.CREATED,
     message: "All Users Retrieved successfully",
     data: result.data,
     meta: result.meta,
   });


});

export const UserController = {
  createUser,
  getAllUsers,
  updateUser,
};

// route matching -> controller -> service -> model -> database
