const express = require("express");
const router = express.Router();
const todoController = require("../controllers/todoController");

// router.get("/", todoController.get_orders);
// router.get("/single", todoController.get_single_order);

//http://localhost:5000/api/v1/todos/todo_create
console.log("Line8 todos");
router.post("/todo_create", todoController.todo_add);

// router.post("/register", authController.register_user);

module.exports = router;
