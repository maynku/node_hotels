const jwt=require('jsonwebtoken');
const jwtAuthMiddleware=(req,res,next)=>{
    //extract the jwt token from the request headers 
    const token=req.headers.authorization.split(' ')[1];
    try {
        //verify the jwt tokens 
        const decode=jwt.verify(token,process.env.JWT_SECRET)

        //attach user info to the request object 
        req.user=decode
        next()
        
    } catch (error) {
        console.log(error);
        res.json({error:'invalid token'})
    }
}
const generateToken=(userData)=>{
    //generate a new JWT token using user data 
    return jwt.sign(userData,process.env.JWT_SECRET)
}
module.exports={jwtAuthMiddleware,generateToken}