const jwt= require("jsonwebtoken")
async function authToken(req,res,next){
    try{
        const token=req.cookies?.token
        if(!token)
            {
                return res.status(400).json({
                    message:"User not login",
                    error:true,
                    success:false
                })
            }
        jwt.verify(token, process.env.TOKEN_SECRET_KEY, function(err, decoded) {
            // console.log(err)
            // console.log(decoded) // bar

            if(err){
                console.log("error auth",err)
            }
            req.userId=decoded?.tokenData._id
            next()
          });

    }catch(err){
        res.status(400).json({
            message:err.message||err,
            data:[],
            error:true,
            sucess:false
        })
    }
}
module.exports=authToken;