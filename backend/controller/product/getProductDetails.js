const productModel = require("../../models/productModel");

const getProductDetails=async (req,res)=>{
try{
        const{_id}=req.body
       
      const product=await productModel.findById(_id)

      res.json({
        data:product,
        message:"product details",
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

module.exports=getProductDetails