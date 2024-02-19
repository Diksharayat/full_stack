const bcrypt=require("bcryptjs");

const {AppErr, appErr } = require("../../utils/appErr");
const generateToken = require("../../utils/generateToken");
const User = require("../../model/User");




// Register
const registerUserController=async(req,res,next)=>{
  const {fullname,password,email}=req.body;

     try{
          
     // Check if the email exist
     const userFound=await User.findOne({email});
     if (userFound) {
         return next(appErr("user already exists",400));
     };
    

     // we will handle this error in catch instead of like following
     // // check if the fields are empty
     // if(!email || !password || !fullname)
     // return res.json({message:"please provide all field"})

   
    
     // hash password
       const salt=await bcrypt.genSalt(10);
       const hashedPassword= await bcrypt.hash(password,salt);
       
     // create user
     const user=await User.create({
          fullname,
          email,
          password: hashedPassword,
     });

       res.json({
          status:"success",
          fullname:user.fullname,
          email:user.email,
          id: user._id
     })
  }catch(error){
       next(new Error(error));
  }
}

// login
const loginUserController=async(req, res,next)=>{
  const {email,password} = req.body;
     try{
     // check if email exist
     const userFound= await User.findOne({email});
     if(!userFound) return next(new AppErr("invalid login credentials",400))
     // check for password validity'
      const isPasswordMatch= await bcrypt.compare(password,userFound.password)
      if(!isPasswordMatch) return next(new AppErr("invalid login credentials",400))
     
     
      res.json({
     status:'success',
     fullname:userFound.fullname,
     id:  userFound._id,
     token:generateToken(userFound._id),
     });
  }catch(error){
     next(new AppErr(error.message,500));
  }
}


// profile
const profileUserControl=async(req,res)=>{
     // const result =verifyToken("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1YTRlY2Q1ZGU1OGNlMzRhYjk1MTY5MCIsImlhdCI6MTcwNTMyMDU2MSwiZXhwIjoxNzA1MzI0MTYxfQ.1NDyFy0HrAbRcu0qBcIn7ZbF9P2h0ODImO6hq7oKS0I");
     // console.log(result);
     // how to get the token from header

     // const headerObj=req.headers;
     // const token=headerObj["authorization"].split(" ")[1];
     // console.log(token);
     console.log(req.user);
  try{
     const user=await User.findById(req.user).populate({
          path:"accounts",
          populate:{
               path:"transactions",
               "medel":"Transaction"
          }
     })
       res.json(user);
  }catch(error){
     next(new AppErr(error.message,500));
  }
}

// delete

const deleteUserControl=async(req,res,next)=>{
  await User.findByIdAndDelete(req.user);
  res.status(200).json({
     status:'success',
     data:null
  })
     try{
       res.json({msg:'delete route'})
  }catch(error){
     next(new AppErr(error.message,500));
  }
}

// update
const updateUserControl=async(req,res,next)=>{
     try {
          // check if email exists
          if(req.body.email){
               const userFound =await User.findOne({email: req.body.email});
               if(userFound) return next(new AppErr("Email is taken or you already have this email", 400));
          }
         
        
          //check if user is updating the password 
          if(req.body.password){
          const salt =await bcrypt.genSalt(10);
          const hashedPassword= await bcrypt.hash(req.body.password,salt);
      
          //update the user
          const user= await User.findByIdAndUpdate(req.user,{
               password:hashedPassword,

          },{
               new:true,
               runValidators:true,
          }) ;
          // send the response
          return res.status(200).json({
               status:"success",
               data:user,
          });
     }

        const user=await User.findByIdAndUpdate(req.user,req.body,{
          new:true,
          runValidators:true,
        });
          // send the response
          res.status(200).json({
               status:"success",
               data:user,
          });
     } catch (error) {
        next(new AppErr(error.message,500));
     }
}


module.exports={
  registerUserController,
  loginUserController,
  profileUserControl,
  deleteUserControl,
  updateUserControl
}