const express = require("express");
const router = express.Router();
const Menu = require('../models/menu');
const { route } = require("./personRoutes");
const { json } = require("body-parser");


//for menu 
router.post('/',async(req,res)=>{
    try{
        const data=req.body
        const newMenu=new Menu(data);
        const response=await newMenu.save();
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
        const data=await Menu.find();
        console.log("data fetched");
        res.json(data);
    }
    catch(err){
        console.log(err);
        res.json({error:"internal server error"});
    }
})

//required taste
router.get('/:tasteType',async(req,res)=>{
    try{
        const tasteType=req.params.tasteType; //extract work type
        if(tasteType=='sweet'|| tasteType=='sour'||tasteType=='spicy'){
            const response=await Menu.find({taste:tasteType});
            res.json(response);
        }
        else{
            res.json({error:"invalid taste type"})
        }
    }
    catch(err){
        console.log(err);
        res.json({error:'internal server error'})
    }
})



//update methd
router.put('/:id',async(req,res)=>{
    try{
        const id=req.params.id;
        const updatedmenudata=req.body;
        const response=await Menu.findByIdAndUpdate(id,updatedmenudata,{
            new:true,
            runValidators:true,
        })
        if(!response){
            console.log("menu itrm not found")
            res.json({error:'not found menu ited'})

        }
        console.log("data updated sucessfully")
        res.json(response);
    }
    catch(err){
        console.log(err);
        res.json({error:'internal server error'})
    }
})
//deletee operation 

router.delete('/:id',async(req,res)=>{
    try{
        const id=req.params.id;
    const response=await Menu.findByIdAndDelete(id);
    if(!response){
        console.log("Menu item not foound")
        res.json({error:'Not found'})

    }
    console.log("data deleted");
    res.json({message:'data deleted sucessfully'})
    }catch(err){
        console.log(err);
        res.json({error:'internal server error'})
    }
})
module.exports = router;