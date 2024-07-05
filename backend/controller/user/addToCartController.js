const cartModel = require("../../models/cartProduct")

const addToCartCOntroller= async(req,res)=>{
try{
        const{productId }=req.body
        console.log("Product Id",productId) 
        const currentUser=req.userId  
        const checkAvailable= await cartModel.findOne({productId:productId,userId:currentUser})
        console.log("checkAvailable",checkAvailable)
        if(checkAvailable){    
            return res.json({
                message:"Product Already Exist in Cart",
                success:false,
                error:true
            })
        }


        const payload={
            productId:productId,
            quantity:1,
            userId:currentUser
        }

        const newProductToCart=new cartModel(payload)
        const saveProduct=await newProductToCart.save()
        res.json({
            message:"Product added in Cart",
            success:true,
            error:false,
            data:saveProduct

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

module.exports=addToCartCOntroller