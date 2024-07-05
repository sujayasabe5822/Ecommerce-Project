const cartModel = require("../../models/cartProduct");

const updateAddToCartProduct=async(req,res)=>{
    try{

        const currentUserId=req.userId
        const cartProductId=req.body._id
        console.log("Cartproductid",cartProductId)
        const qty=req.body.quantity
        console.log("qty",qty)
       
        // const updateProduct = await cartModel.findOneAndUpdate({_id : cartProductId},{
        //     ...(qty && {quantity : qty})
        // })
        const updateProduct = await cartModel.updateOne({_id : cartProductId},{
            ...(qty && {quantity : qty})
        })
       

        res.json({
            message : "Product Updated",
            data : updateProduct,
            error : false,
            success : true
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

module.exports=updateAddToCartProduct