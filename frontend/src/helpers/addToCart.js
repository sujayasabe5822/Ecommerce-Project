import { toast } from "react-toastify"
import summaryAPI from "../common"


const addToCart=async (e,id)=>{
e?.stopPropagation()
e?.preventDefault()


const response=await fetch(summaryAPI.addToCart.url,{
    method:summaryAPI.addToCart.method,
    headers:{
        "content-type":"application/json"
    },
    credentials:"include",
    body:JSON.stringify({
        productId:id
    })

})

const dataResponse=await response.json()
if(dataResponse.success)
    {
        toast.success(dataResponse.message)
    

    }

    if(dataResponse.error)
        {
            toast.error(dataResponse.message)
        }

}

export default addToCart