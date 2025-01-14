const express = require('express')
const app = express()
const connectMongo = require('./db/db');

const bodyParser=require('body-parser');
app.use(bodyParser.json()); //req.body m save krega data 
const passport=require('./auth')


const logRequest = (req, res, next) => {
  console.log(`[${new Date().toLocaleString()}] Request made to: ${req.originalUrl}`);
  next(); // Ensure next middleware/route is called
};

//log request middlware  ################
app.use(logRequest);//for all rotes




//intialisse 
app.use(passport.initialize());

// #############################################

const localAuthMiddleware=passport.authenticate('local',{session:false});
app.get('/',localAuthMiddleware ,function (req, res) {
  res.send('welcome to hotel.. howw can i help you ')
}) 

const personRoutes=require('./routes/personRoutes')
app.use('/person',personRoutes);
const menuRoutes=require('./routes/menuRoutes')
app.use('/menu',localAuthMiddleware,menuRoutes);


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
