const express = require("express");
const { Login, Ragiser, GetUser } = require("../controller/userController");

const CheckAuth = require("../middleware/VeryToken");

const UserRouter = express.Router();

UserRouter.post("/register", Ragiser);
UserRouter.post("/login", Login);
UserRouter.get("/user", CheckAuth, GetUser);

module.exports = UserRouter;
