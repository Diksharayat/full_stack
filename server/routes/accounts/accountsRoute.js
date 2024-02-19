const express =require("express");
const {  
  
    getAllAccountsCtrl, 
    getAccountsCtrl, 
    deleteAccountsCtrl,
    updateAccountsCtrl, 
    createAccountsCtrl} = require("../../controllers/accounts/accountsctrl");
const isLogin = require("../../middlewares/isLogin");

const accountsRoute=express.Router();


//POST/api/v1/accounts
accountsRoute.post("/",isLogin,createAccountsCtrl)

//GET/api/v1/accounts/
accountsRoute.get("/",getAllAccountsCtrl)

//GET/api/v1/accounts/:id
accountsRoute.get("/:id",getAccountsCtrl)

//DELETE/api/v1/accounts/:id
accountsRoute.delete("/:id",deleteAccountsCtrl)

// PUT/api/v1/accounts/:id
accountsRoute.put("/:id",updateAccountsCtrl)








module.exports=accountsRoute;