const express = require('express')
const app = express()
const connectMongo = require('./db/db');

const bodyParser=require('body-parser');
app.use(bodyParser.json()); //req.body m save krega data 


app.get('/', function (req, res) {
  res.send('welcome to hotel.. howw can i help you ')
})


const personRoutes=require('./routes/personRoutes')
app.use('/person',personRoutes);
const menuRoutes=require('./routes/menuRoutes')
app.use('/menu',menuRoutes);
//listening 

require('dotenv').config(
  {
    path:".env"
  });
  connectMongo(process.env.MONGODB_URL_LOCAL); // reduce lines of code
  const PORT=process.env.PORT;
  
  app.listen(PORT,()=>{
  console.log("listening on port 3000");
})
