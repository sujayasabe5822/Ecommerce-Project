const productModel = require("../../models/productModel");

const  getCategoryProductAll=async(req,res)=>{

    try{
        const {category}=req.body || req?.query
        const products=await productModel.find({category})
      
        res.json({
            data:products,
            message:"products fetched",
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
module.exports=getCategoryProductAll