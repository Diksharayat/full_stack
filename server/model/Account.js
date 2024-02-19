const mongoose= require("mongoose");

// user Schema

const accountSchema= new mongoose.Schema({
  name:{
    type:String,
    required:true,
  },
  accountType:{
    type:String,
    enum: [
      "Saving",
      "Investment",
      "Checking",
      "Credit Card",
      "builing",
      "School",
      "Project",
      "Utilities",
      "Travel",
      "Personal",
      "Groceries",
      "Entertainment",
      "Loan",
      "Cash flow",
      "Uncategorized",
      "Education"
    ],
    required:true,
  
  },

  initialBalance:{
    type:Number,
    default:0,
  },
  

  
  transactions:[
    {
    type:mongoose.Schema.Types.ObjectId,
    ref:"Transaction",
  },
  ],


  createdBy:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
  },

  notes:{
    type:String,
    required:true,

  },

},{
  timestamps:true,
  toJSON:{virtuals:true},
});

// model
const Account = mongoose.model("Account",accountSchema);

module.exports=Account;