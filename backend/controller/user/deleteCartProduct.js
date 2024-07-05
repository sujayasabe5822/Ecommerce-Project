const cartModel = require("../../models/cartProduct");

const deleteCartProduct=async(req,res)=>{
    try{
        const currentUserId=req.userId
        const cartProductId=req.body._id
        const deletedProduct=await cartModel.deleteOne({_id:cartProductId})
        res.json({
            message:"Prodct Deleted From Cart",
            success:true,
            error:false,
            data:deletedProduct
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

module.exports =deleteCartProduct