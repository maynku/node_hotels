const express = require("express");
const router = express.Router();
const Person = require('../models/person');

router.post('/',async(req,res)=>{
    try{
        const data=req.body
        const newPerson=new Person(data);
        const response=await newPerson.save();
        console.log("data savwed")
        res.json(response);
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