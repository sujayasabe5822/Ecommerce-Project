const cartModel = require("../../models/cartProduct");

const cartCOunt=async (req,res)=>{
    try{

        const userId=req.userId
        const count=await cartModel.countDocuments({
            userId:userId
        })
        res.json({
            data:{
                count:count
            },
            message:"cart count",
            success:true,
            error:false
        })
    }
    catch(err){
        res.status(400).json({
            message: err.message || err,
            error: true,
            success: false,
          });
    }
}
module.exports=cartCOunt