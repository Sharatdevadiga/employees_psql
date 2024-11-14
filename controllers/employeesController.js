import db from "../server.js";

// GETTING ALL EMPLOYEES DATA FROM THE DATABASE
const getAllEmployees = async (req, res) => {
  try {
    const { department } = req.query;

    let queryString = `SELECT * FROM employees`;
    const values = [];

    if (department) {
      queryString += ` WHERE department = $1`;
      values.push(department);
    }
    const result = await db.query(queryString, values);

    const employees = result.rows;
    res.status(200).json({
      message: "success in fetching data",
      data: employees,
    });
  } catch (error) {
    res.status(500).json({
      message: "Couldn't get all employees",
    });
  }
};

// CREATING AN EMPLOYEE AT THE DATABASE
const createAnEmployee = async (req, res) => {
  const { name, email, position, salary, date_of_joining, department } =
    req.body;
  try {
    const result = await db.query(
      `
        INSERT INTO employees (name, email, position, salary, date_of_joining, department)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING *`,
      [name, email, position, salary, date_of_joining, department]
    );

    res.status(201).json({
      message: "Employee created successfully",
      data: result.rows[0],
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

// UPDATING AN EMPLOYEE DATA
const updateAnEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const { position, salary } = req.body;

    const result = await db.query(
      `
            UPDATE employees 
            SET position = $1, salary = $2 
            WHERE id = $3 
            RETURNING *
        `,
      [position, salary, id]
    );

    if (result.rowCount === 0) {
      res.status(404).json({
        message: "Employee not found",
      });
      return;
    }

    res.status(200).json({
      message: "Employee updated successfully",
      data: result.rows[0],
    });
  } catch (error) {
    res.status(500).json({
      message: "Couldn't update employee",
    });
  }
};

// DELETING THE EMPLOYEE DATA
const deleteAnEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await db.query(
      `
            DELETE FROM employees 
            WHERE employees.id = $1 
            RETURNING *
            `,
      [id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Employee not found" });
    }
    res.status(200).json({ message: "Employee deleted successfully" });
  } catch (error) {
    res.status(500).json({
      message: "Couldn't delete employee",
    });
  }
};

export {
  getAllEmployees,
  createAnEmployee,
  updateAnEmployee,
  deleteAnEmployee,
};
