import { Router } from "express";
import { DivisionController } from "./division.controller";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "../user/user.interface";
import { validateRequest } from "../../middlewares/validateRequest";
import {  createDivisionSchema, updateDivisionSchema } from "./division.validation";
import { multerUpload } from "../../config/multer.config";


const router = Router();
/*
 {

 file : Image
 data : body text data => req.body => req.body.data
 }
*/
// Form data -> body, file

router.post(
  "/create",
  checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
  multerUpload.single("file"),
  validateRequest(createDivisionSchema),
  DivisionController.createDivision
);

router.get("/",DivisionController.getAllDivisions);

router.get("/:slug",DivisionController.getSingleDivision)

router.patch("/:id", checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
    validateRequest(updateDivisionSchema),DivisionController.updatedDivision);

router.delete(
  "/:id",
  checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
  DivisionController.deleteDivision
);

export const DivisionRoutes = router;