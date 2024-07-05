const backendDomain="http://localhost:8000"

const summaryAPI={
    signUp:{
        url:`${backendDomain}/api/signup`,
        method:"post"
    },
    signIn:{
        url:`${backendDomain}/api/signin`,
        method:"post"
    },
    userDetails:{
        url:`${backendDomain}/api/user-details`,
        method:"get"
    },
    userLogout:{
        url:`${backendDomain}/api/userLogout`,
        method:"get"
    },
    allUser:{
        url:`${backendDomain}/api/allUsers`,
        method:"get"

    },
    updateUser:{
        url:`${backendDomain}/api/updateUser`,
        method:"post"

    },
    uploadProduct:{
        url:`${backendDomain}/api/uploadProduct`,
        method:"post"
    },
    getProduct:{
        url:`${backendDomain}/api/getProduct`,
        method:"get"
    },
    updateProduct:{
        url:`${backendDomain}/api/updateProduct`,
        method:"post"
    },
    categoryProduct:{
        url:`${backendDomain}/api/getCategoryProduct`,
        method:"get"
    },
    categoryProductAll:{
        url:`${backendDomain}/api/getCategoryProductAll`,
        method:"post"
    },
    getProductDetails:{
        url:`${backendDomain}/api/getProductDetails`,
        method:"post"

    },
    addToCart:{
        url:`${backendDomain}/api/addToCart`,
        method:"post"

    },
    cartCount:{
        url:`${backendDomain}/api/cartCount`,
        method:"get"
    },
    viewCart:{
        url:`${backendDomain}/api/viewCart`,
        method:"get"
    },

      updateCartProduct: {
        url:`${backendDomain}/api/updateCartProduct`,
        method:"post"
    },
    deleteCart:{
        url:`${backendDomain}/api/deleteCartProduct`,
        method:"post"
    },
    searchProduct:    {

        url:`${backendDomain}/api/searchProduct`,
        method:"get"
    },
    userDelete:{
        url:`${backendDomain}/api/userDelete`,
        method:"post"
    },
    adminProductDelete:{
        url:`${backendDomain}/api/adminProductDelete`,
        method:"post"
    }
    
}

export default summaryAPI