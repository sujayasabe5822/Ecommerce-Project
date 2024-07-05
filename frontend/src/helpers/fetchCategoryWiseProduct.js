const { default: summaryAPI } = require("../common")

const fetchCategoryWiseProduct=async (category)=>{
    const fetchProduct=await fetch(summaryAPI.categoryProductAll.url,{
        method:summaryAPI.categoryProductAll.method,
        headers:{
            "content-type":"application/json"
        },
        body:JSON.stringify({
            category:category
        })
    })
    const dataResponse=await fetchProduct.json()

    return dataResponse
}

export default fetchCategoryWiseProduct