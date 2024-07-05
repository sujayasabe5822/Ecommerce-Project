const productModel = require("../../models/productModel");

const getCategoryProduct=async (req,res)=>{
    try{


        const productCategory=await productModel.distinct("category")

        //array to store each product from each category
        const productByCategory=[]
        for(const category of productCategory){
            const product=await productModel.findOne({category})
            if(product)
                {
                    productByCategory.push(product)
                }
        }

        res.json({
            data:productByCategory,
            message:"category-product",
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
module.exports=getCategoryProduct