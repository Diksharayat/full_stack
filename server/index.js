const express=require('express');
require("./config/dbConnect");
const cors = require("cors");


const transactionsRoute =require('./routes/transactions/transactionsRoute');

const globalErrHandler = require('./middlewares/globalErrHandler');
const accountsRoute = require('./routes/accounts/accountsRoute');
const usersRoute = require('./routes/users/usersRoute');


const path= require('path')

const app=express();

app.use(express.static(path.join(__dirname + "/public")))
 
// middlewares
app.use(express.json()) //pass incoming data
// cors middleware
app.use(cors());

// routes
// user routes
app.use("/api/v1/users",usersRoute);
//transaction route
app.use("/api/v1/transactions",transactionsRoute);
//account route
app.use("/api/v1/accounts",accountsRoute);



//    account route

// POST/api/v1/accounts
// app.post('/api/v1/accounts',async(req,res)=>{
//       try {
//           res.json({msg:"Create Account route"})
//       } catch (error) {
//           res.json(error);
//       }
// });


// GET/api/v1/accounts/
// app.get('/api/v1/accounts/',async(req,res)=>{
//      try {
//          res.json({msg:"Get single account route Account route"})
//      } catch (error) {
//          res.json(error);
//      }
// });


// GET/api/v1/accounts/:id
// app.get('/api/v1/accounts/:id',async(req,res)=>{
//      try {
//          res.json({msg:"Get single account route Account route"})
//      } catch (error) {
//          res.json(error);
//      }
// });


// DELETE/api/v1/accounts/:id
// app.delete('/api/v1/accounts/:id',async(req,res)=>{
//      try {
//          res.json({msg:"Delete Account route"})
//      } catch (error) {
//          res.json(error);
//      }
// });


// PUT/api/v1/accounts/:id
// app.put('/api/v1/users/:id',async(req,res)=>{
//      try {
//          res.json({msg:"update Account route"})
//      } catch (error) {
//          res.json(error);
//      }
// });





// Error handlers
app.use(globalErrHandler);

 
// listen to server
const port = process.env.PORT||3001;

app.listen(port,console.log(`SERVER IS UP AND RUNNING ON PORT ${port}`));












