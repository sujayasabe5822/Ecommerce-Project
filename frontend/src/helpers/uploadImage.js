import { Form } from "react-router-dom"

const url=`https://api.cloudinary.com/v1_1/dahvdkxez/image/upload`  //cloud name before image/upload
const uploadImage=async (image)=>{
    const formData= new FormData()
    formData.append("file",image)
    formData.append("upload_preset","mern_ecommerce_products")
 const dataResponse=await fetch(url,{
    method:"post",
    body:formData
 })
 return dataResponse.json()
}
export default uploadImage