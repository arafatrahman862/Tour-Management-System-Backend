import cors from "cors";
import express, { Request, Response } from "express";
import httpStatus from "http-status-codes";
import { router } from "./app/routes";
import { globalErrorHandler } from "./app/middlewares/globalErrorHandler";
import notFound from "./app/middlewares/notFound";
import cookieParser from "cookie-parser";
import passport from "passport";
import expressSession from "express-session";
import "./app/config/passport";
import { envVars } from "./app/config/env";

const app = express();

app.use(
  expressSession({
    secret: envVars.EXPRESS_SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use(cors());

app.use("/api/v1", router);
// app.use("/api/v1/tour", TourRoutes);

app.get("/", (req: Request, res: Response) => {
  res.status(httpStatus.ACCEPTED).json({
    message: "Welcome to the Tour Management System Backend",
  });
});

app.use(globalErrorHandler);

// After global error handler, catch all unmatched routes

app.use(notFound);

export default app;
