async function userLogout(req,res){
    try{
        res.clearCookie("token")

        res.json({
            message:"logout Succesfully",
            error:false,
            succes:true,
            data:[]
        })
        
    }
    catch(err){
        res.status(500).json({
            message: err.message, // Use err.message to send the error message
            error: true,
            success: false
        });
    }
}

module.exports=userLogout