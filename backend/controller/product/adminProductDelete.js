const productModel = require("../../models/productModel")

const adminProductDelete=async(req,res)=>{
    try{
            const {productId}=req.body
            const deletedProduct=await productModel.deleteOne({_id:productId})
            res.json({
                data:deletedProduct,
                message:"product deleted",
                success:true,
                error:false
            })
    }
    catch(err)
    {
        res.status(400).json({
            message: err.message || err,
            error: true,
            success: false
        })
    }
}
module.exports=adminProductDelete