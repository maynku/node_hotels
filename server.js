const express = require('express')
const app = express()
const connectMongo = require('./db/db');
const Person=require('./models/person');
const bodyParser=require('body-parser');
app.use(bodyParser.json()); //req.body m save krega data 
const passport=require('passport');
const LocalStrategy=require('passport-local').Strategy;


const logRequest = (req, res, next) => {
  console.log(`[${new Date().toLocaleString()}] Request made to: ${req.originalUrl}`);
  next(); // Ensure next middleware/route is called
};

//log request middlware  ################
app.use(logRequest);//for all rotes


//using authetication using local module 
passport.use(new LocalStrategy(async(USERNAME,password,done)=>{
  //autthetication code here 
  try {
    console.log("receved credentials", USERNAME,password);
    const user=await Person.findOne({username:USERNAME}); //match 
    // kr rh hai ki nhi 
   

    if(!user){
      return done(null,false,{message:"incorrect username" })
    }
    const isPassswordMatch=user.password===password? true : false ;

    if(isPassswordMatch){
      return done(null,user);
    }
    else{
      return done(null,false,{message:"incorrect password"})
    }

  } catch (error) {
     return done(error);
  }
}))

//intialisse 
app.use(passport.initialize());

// #############################################


app.get('/',passport.authenticate('local',{session:false}) ,function (req, res) {
  res.send('welcome to hotel.. howw can i help you ')
}) 

const personRoutes=require('./routes/personRoutes')
app.use('/person',personRoutes);
const menuRoutes=require('./routes/menuRoutes')
app.use('/menu',menuRoutes);


//env file 
require('dotenv').config(
  {
    path:".env"
  });
  connectMongo(process.env.MONGODB_URL_LOCAL); // reduce lines of code
  const PORT=process.env.PORT;
  
  app.listen(PORT,()=>{
  console.log("listening on port 3000");
})
