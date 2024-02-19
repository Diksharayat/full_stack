const mongoose =require("mongoose");

// connect

const dbConnect=async()=>{
  try {
    await mongoose.connect("mongodb+srv://diksha:SyaCG5a141zq4mfi@mongodb-demo.roiawvw.mongodb.net/?retryWrites=true&w=majority");
    console.log("db connected successfully");
  } catch (error) {
    console.log(error)
    process.exit(1);
  }
}

dbConnect();