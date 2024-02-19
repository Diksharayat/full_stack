const express=require("express");
const { createTransactionsControl, getTransactionsControl, getAllTransactionsControl, deleteTransactionsControl, updateTransactionsControl } = require("../../controllers/transactions/transactionsctrl");
const isLogin = require("../../middlewares/isLogin");
const transactionsRoute=express.Router();

 //POST/api/v1/transactions
transactionsRoute.post("/",isLogin,createTransactionsControl);



//GET/api/v1/transactions/
transactionsRoute.get("/",getAllTransactionsControl);



//GET/api/v1/transactions/:id
transactionsRoute.get("/:id",getTransactionsControl);

//delete/api/v1/transactions/:id
transactionsRoute.delete("/:id",deleteTransactionsControl);

//PUT/api/v1/transactions/:id
transactionsRoute.put("/:id",updateTransactionsControl);





module.exports=transactionsRoute;