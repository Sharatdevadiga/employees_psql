import express from "express";
import {
  createAnEmployee,
  deleteAnEmployee,
  getAllEmployees,
  updateAnEmployee,
} from "../controllers/employeesController.js";

const employeesRouter = express.Router();

employeesRouter.get("/", getAllEmployees);
employeesRouter.post("/", createAnEmployee);
employeesRouter.put("/:id", updateAnEmployee);
employeesRouter.delete("/:id", deleteAnEmployee);
// employeesRouter.

export default employeesRouter;
