const productModel = require("../../models/productModel");

async function uploadProduct(req, res) {
  try {
    const uploadProductDetails = new productModel(req.body);
    const saveProduct = await uploadProductDetails.save();

    // console.log("product uploaded", req.body)

    res.status(201).json({
      message: "Product Uploaded",
      success: true,
      error: false,
      data: saveProduct,
    });
  } catch (err) {
    res.status(400).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
}

module.exports = uploadProduct;
