const getTokenFromHeader =req=>{
 
 // how to get the token from header

 const headerObj=req.headers;
 const token=headerObj["authorization"].split(" ")[1];
if(token !== undefined){
  return token;
}else{
  return{
    status:'failed',
    message:"there is no token attched to the header"
  };
}
};

module.exports=getTokenFromHeader;