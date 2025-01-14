const passport=require('passport');
const LocalStrategy=require('passport-local').Strategy;
const Person=require('./models/person');
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
      const isPassswordMatch=await user.comparePassword(password);
  
      if(isPassswordMatch){
        return done(null,user);
      }
      else{
        return done(null,false,{message:"incorrect password"})
      }
  
    } catch (error) {
       return done(error);
    }
  }));
  module.exports=passport; //exporting passport as a module 
