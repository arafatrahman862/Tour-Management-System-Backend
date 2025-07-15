/* eslint-disable no-console */
import { UserController } from "./user.controller";
import { createUserZodSchema, updateUserZodSchema } from "./user.validation";
import { validateRequest } from "../../middlewares/validateRequest";
import { checkAuth } from "../../middlewares/checkAuth";
import { Router } from "express";
import { Role } from "./user.interface";

const router = Router();

// Zod validate Request only post and patch request

router.post(
  "/register",
  validateRequest(createUserZodSchema),
  UserController.createUser
);
router.get("/all-users", checkAuth(Role.ADMIN, Role.SUPER_ADMIN), UserController.getAllUsers);
router.patch(
  "/:id",
  validateRequest(updateUserZodSchema),
  checkAuth(...Object.values(Role)),
  UserController.updateUser
);

export const UserRoutes = router;
