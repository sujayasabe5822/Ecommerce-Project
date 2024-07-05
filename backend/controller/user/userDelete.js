const userModel = require("../../models/userModel");

const userDelete= async(req,res)=>{
    try{
        const {email,name}=req.body
        const deletedUser=await userModel.deleteOne({email:email})
        console.log("deleted user",deletedUser)

        res.json({
            data:deletedUser,
            message:`${name} deleted Successfully`,
            success:true,
            error:false
        })

    }
    catch(err)
    {
        res.status(400).json({
            message: err.message || err,
            error: true,
            success: false,
          });
    }
}
module.exports=userDelete