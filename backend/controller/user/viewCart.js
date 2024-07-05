const cartModel = require("../../models/cartProduct");

const viewCart=async(req,res)=>{
    try{
        const currentUser=req.userId
        console.log("user id",currentUser)
        const allProduct=await cartModel.find({userId:currentUser}).populate("productId")
        // console.log("backend view cart",allProduct)

        res.json({
            data:allProduct,
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
module.exports=viewCart