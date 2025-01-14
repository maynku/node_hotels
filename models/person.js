const mongoose=require('mongoose')
//const { type } = require('os')
const bcrypt=require('bcrypt');
//defination of person schema 
const personSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    age:{
        type:Number,
        //enum:['chef','waiter','manager'],
        required:true
    },
    mobile:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    address:{
        type:String,
        required:true
    },
    salary:{
        type:Number,
        required:true
    },
    work:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
});

personSchema.pre('save',async function(next){
    const person=this; //current data k sath deal krey current jav v end point call ho 
    if(!person.isModified('password')) return next();
    try {
        //hashpassword generate
        const salt=await bcrypt.genSalt(10);//resposible for hashing additional string 
        const hashedpas=await bcrypt.hash(person.password,salt);
        person.password=hashedpas;
        next();
        
    } catch (error) {
        return next(error);
    }
})

//compare function 
personSchema.methods.comparePassword=async function(candidatePassword){
    try {
        //use bcrypt to comapre password 
        const isMatch=await bcrypt.compare(candidatePassword,this.password);
        return isMatch;
        
    } catch (error) {
        throw error;
    }
}

//prince --->>>> jo fhasodhoseht98wy9438y394
//login ---->> agarwal
// bhfkdsabsknlasnsldnf-->extract salt
//salt+agarwal--->>>hash---> ncsjdhg ghjhdf now campre this hash with this hash 



//cretae person model 
const Person=mongoose.model('Person',personSchema);
module.exports=Person;