const Account = require("../../model/Account");
const Transaction = require("../../model/Transaction");
const User = require("../../model/User");
const { AppErr } = require("../../utils/appErr");

//create
const createTransactionsControl=async(req,res,next)=>{
 const {name, amount, notes, transactionType,account,category}=req.body
  try {

 // 1. find user
 const userFound= await User.findById(req.user);
 if(!userFound) return next(new AppErr("user not found",404)); 
 // 2. find the account
  const accountFound=await Account.findById(account)
  if(!accountFound) return next(new AppErr("account not found",404)); 
  // 3. create the transaction
  const transaction = await Transaction.create({
    name,
    amount,
    notes,
    transactionType,
    account,
    category,
    createdBy:req.user,

  })
 // 4. push the transaction to the account.
 accountFound.transactions.push(transaction._id)
 // 5. resave the account.
 await accountFound.save();
      res.json(
        {
         status:"success",
         data: transaction
        }
      )
  } catch (error) {
      res.json(error);
  }
}

//single
const getTransactionsControl=async(req,res,next)=>{
  try {
    const {id}=req.params;
    const tran =await Transaction.findById(id);

    res.json({
      status:"success",
      data:tran
    });
  } catch (error) {
    next(new AppErr(error.message,500))
  }
}

//all
const getAllTransactionsControl=async(req,res,next)=>{
  try {
    const trans=await Transaction.find();
    res.status(200).json({
      status:"success",
      data:trans
    });
      // res.json({msg:"get transaction route"})
  } catch (error) {
      next(new AppErr(error.message,500))
  }
}

//delete
const deleteTransactionsControl=async(req,res,next)=>{
  try {
    const {id}=req.params;
    await Transaction.findById(id);
    res.json({
      status:"success",
      data:null
    })
     
  } catch (error) {
    next(new AppErr(error.message,500));
  }
}

//update
const updateTransactionsControl=async(req,res,next)=>{
  try {
    const {id}=req.params;
    const tran=await Transaction.findByIdAndUpdate(id,req.body,{
      new:true,
      runValidators:true,
  });
  
     res.json({
   status:"success",
   data:tran
  })
     
  } catch (error) {
      next(new AppErr(error.message,500));
  }
}
module.exports={
  createTransactionsControl,
  getTransactionsControl,
  getAllTransactionsControl,
  deleteTransactionsControl,
  updateTransactionsControl
}