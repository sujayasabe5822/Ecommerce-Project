const uploadProductPermission = require("../../helper/permission");
const productModel = require("../../models/productModel");

async function updateProductController(req, res) {
  try {
    // if(!uploadProductPermission(req._userId)){
    //     throw new Error("Permission Denied")
    // }

    const { _id, ...resBody } = req.body; // rest Body

    const updateProduct = await productModel.findByIdAndUpdate(_id, resBody);

    res.json({
      message: "Product Updated Successfully",
      success: true,
      error: false,
      data: updateProduct,
    });
  } catch (err) {
    res.status(400).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
}

module.exports = updateProductController;
