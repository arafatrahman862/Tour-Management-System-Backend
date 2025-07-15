/* eslint-disable no-console */
import { Server } from "http";
import mongoose from "mongoose";
import app from "./app";
import { envVars } from "./app/config/env";
import { seedSuperAdmin } from "./app/utils/seedSuperAdmin";

let server: Server;

const startServer = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://test:test@cluster0.bfg6ad4.mongodb.net/tour-management-system?retryWrites=true&w=majority&appName=Cluster0"
    );
    //  console.log("Server is running on port", envVars.PORT);

    server = app.listen(envVars.PORT, () => {
      console.log(`Server is running on port ${envVars.PORT}`);
    });
  } catch (error) {
    console.log("Error connecting to the database:", error);
  }
};

(async () => {
  await startServer();
  await seedSuperAdmin();
})();


process.on("SIGTERM", (err) => {
  console.log("SIGTERM signal received, shutting down the server", err);

  if (server) {
    server.close(() => {
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
});

process.on("unhandledRejection", (err) => {
  console.log("Unhandled Rejection, shutting down the server", err);

  if (server) {
    server.close(() => {
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
});

process.on("uncaughtException", (err) => {
  console.log("Uncaught Exception, shutting down the server", err);

  if (server) {
    server.close(() => {
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
});
