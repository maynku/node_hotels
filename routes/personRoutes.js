const express = require("express");
const router = express.Router();
const Person = require('../models/person');
const {jwtAuthMiddleware,generateToken}=require('../jwt');
const passport = require("passport");

//login routes 
router.post('/login',async(req,res)=>{
    try {
        const {username,password}=req.body;
        //find user by username
        const user=await Person.findOne({username:username});
        //if user not exist or password does not match, return error 
        if(!user || !(await user.comparePassword(password))){
            return res.json({err :"invalid username or password"})
        }
        //genrate token 
        const payload={
            id:user.id,
            username:user.username
        }

    } catch (error) {
        console.log(error);
        res.json({error:'internl server error'})
    }
})



router.post('/signup',async(req,res)=>{
    try{
        const data=req.body
        const newPerson=new Person(data);
        const response=await newPerson.save();
        console.log("data savwed")

        const token=generateToken(response.username)
        console.log(token);

        res.json({response:response,token:token});
    }
    catch(err){
        console.log(err);
        res.json({err:"internal server error"})
    }
})

router.get('/',async(req,res)=>{
    try{
        const data=await Person.find();
        console.log("data fetched");
        res.json(data);
    }
    catch(err){
        console.log(err);
        res.json({error:"internal server error"});
    }
})

router.get('/:workType',async(req,res)=>{
    try{
        const workType=req.params.workType; //extract work type
        if(workType=='chef'|| workType=='waiter'||workType=='manager'){
            const response=await Person.find({work:workType});
            res.json(response);
        }
        else{
            res.json({error:"invalid work type"})
        }
    }
    catch(err){
        console.log(err);
        res.json({error:'internal server error'})
    }
})
//update 
router.put('/:id',async(req,res)=>{
    try{
        const id=req.params.id; //extract id provided type
        const updatedpersondata=req.body; // updated data for person 
        const response=await Person.findByIdAndUpdate(id,updatedpersondata,{
            new:true, //return updated document 
            runValidators:true, //runn validated is schema provided requird 
        })
        if(!response){
            return res.json({error:'person not found'})
        }
        console.log("data updated")
        res.json(response);


    }
    catch(err){
        console.log(err);
        res.json({error:'internal server error'})
    }
})

router.delete('/:id',async(req,res)=>{
   //finding the id to be dleleted to be extracted from id 
   try{
    const id=req.params.id;
    //assuming you have a person model 
    const response=await Person.findByIdAndDelete(id);
    if(!response){
        res.json({error:"person not found"})
    }
    console.log("data deleted");
    res.json({message:'data deleted sucessfully'})
    }catch(err){
        console.log(err);
        res.json({error:'internal server error'})
   }


})
module.exports = router;