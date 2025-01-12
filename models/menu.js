const mongoose=require('mongoose')
const menuSchema=new mongoose.Schema({
    dish:{
        type:String,
        required:true
    },
    no_item:{
        type:Number,
        //enum:['chef','waiter','manager'],
        required:true
    },
    ingred:{
        type:String,
        require:false,
    },
    no_sell:{
        type:Number,
    },
    taste:{
        type:String,
        required:true
    }
});

//cretae person model 
const Menu=mongoose.model('Menu',menuSchema);
module.exports=Menu;