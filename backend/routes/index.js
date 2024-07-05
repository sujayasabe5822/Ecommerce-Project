const express = require("express");
const userSignUpController = require("../controller/user/userSignUpController");
const userSignInController = require("../controller/user/userSignInController");
const userDetailsController = require("../controller/user/userDetails");
const authToken = require("../middleware/authToken");
const userLogout = require("../controller/user/userLogout");
const allUsers = require("../controller/user/allUsers");
const updateUser = require("../controller/user/updateUser");
const uploadProduct = require("../controller/product/uploadProduct");
const getProductController = require("../controller/product/getProduct");
const updateProductController = require("../controller/product/updateProduct");
const getCategoryProductSingle = require("../controller/product/getCategoryProductSingle");
const getCategoryProductAll = require("../controller/product/getCategoryProductAll");
const getProductDetails = require("../controller/product/getProductDetails");
const addToCartCOntroller = require("../controller/user/addToCartController");
const cartCOunt = require("../controller/user/cartCount");
const viewCart = require("../controller/user/viewCart");
const updateAddToCartProduct = require("../controller/user/updateAddToCartProduct");
const deleteCartProduct = require("../controller/user/deleteCartProduct");
const searchProduct = require("../controller/product/searchProduct");
const userDelete = require("../controller/user/userDelete");
const adminProductDelete = require("../controller/product/adminProductDelete");

const router = express.Router();

router.post("/signup", userSignUpController);
router.post("/signin", userSignInController);
router.get("/user-details", authToken, userDetailsController);
router.get("/userLogout", userLogout);
router.get("/allUsers", authToken, allUsers);
router.post("/userDelete",authToken,userDelete)

router.post("/updateUser", authToken, updateUser);
//upload product
router.post("/uploadProduct", authToken, uploadProduct);
//fet all products
router.get("/getProduct", getProductController);
router.get("/searchProduct",searchProduct)
//product update
router.post("/updateProduct", authToken, updateProductController);
router.get("/getCategoryProduct",getCategoryProductSingle)

router.post('/getCategoryProductAll',getCategoryProductAll)
router.post("/getProductDetails",getProductDetails)

router.post("/addToCart",authToken,addToCartCOntroller)
router.get("/cartCount",authToken,cartCOunt)

router.get("/viewCart",authToken,viewCart)
router.post("/updateCartProduct",authToken,updateAddToCartProduct)
router.post("/deleteCartProduct",authToken,deleteCartProduct)
router.post("/adminProductDelete",authToken,adminProductDelete )
module.exports = router;
