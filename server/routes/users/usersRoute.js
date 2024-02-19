const express=require("express");
const { registerUserController, loginUserController, profileUserControl, deleteUserControl, updateUserControl } = require("../../controllers/users/usersctrl");
const isLogin = require("../../middlewares/isLogin");
const usersRoute=express.Router();



// POST/api/v1/users/register
usersRoute.post("/register",registerUserController);

// POST/api/v1/users/login
usersRoute.post("/login",loginUserController);

// GET/api/v1/users/profile/
usersRoute.get("/profile/",isLogin,profileUserControl)

// DELETE/api/v1/users/
usersRoute.delete("/",isLogin,deleteUserControl)

// PUT/api/v1/users/profile/:id
usersRoute.put("/",isLogin,updateUserControl)




module.exports=usersRoute;
