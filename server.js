import express from "express";
import dotenv from "dotenv";
import employeesRouter from "./routes/employeesRouter.js";
import {
  globalErrorHandler,
  routeNotDefined,
} from "./controllers/errorController.js";
import { connectToDB } from "./config/connect.js";

// consigure the env variables
dotenv.config();

// express middleware
const app = express();
app.use(express.json());

// connect to the PSQL database
const db = await connectToDB();

// routes
app.use("/api/employees/", employeesRouter);
app.use("*", routeNotDefined);

// global errorhandler
app.use(globalErrorHandler);

// starting the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("✅ Server started successfully");
});

// export the connected db instance
export default db;
