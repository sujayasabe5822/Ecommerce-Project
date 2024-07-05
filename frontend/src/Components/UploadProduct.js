import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";
import productCategory from "../helpers/productCategory";
import { FaCloudUploadAlt } from "react-icons/fa";
import uploadImage from "../helpers/uploadImage";
import DisplayImage from "../helpers/DisplayImage";
import { MdOutlineDelete } from "react-icons/md";
import summaryAPI from "../common";
import {toast} from 'react-toastify'

const UploadProduct = ({ onclose,setopenUploadProduct,  updateList }) => {
  const [data, setData] = useState({
    productName: "",
    brandName: "",
    category: "",
    productImage: [],
    description: "",
    price: "",
    sellingPrice: "",
  });
  const [uploadProductImageInput, setuploadProductImageInput] = useState("");
  const [openFullScreenImage, setOpenFullScreenImage] = useState(false);
  const [fullScreenImage, setFullScreenImage] = useState("");

  const handleDeleteProductImage=async (index)=>{

    console.log("image index",index)
    
    const newProductImage = [...data.productImage]
    newProductImage.splice(index,1)

    setData((preve)=>{
      return{
        ...preve,
        productImage : [...newProductImage]
      }
    })
    
  }
  const handleUploadProduct = async (e) => {
    const files = Array.from(e.target.files); // Convert FileList to Array
  
    // Loop through each file and upload to Cloudinary
    const uploadPromises = files.map(async (file) => {
      const uploadImageCloudinary = await uploadImage(file);
      return uploadImageCloudinary.url;
    });
  
    // Wait for all uploads to complete
    const uploadedImageUrls = await Promise.all(uploadPromises);
  
    // Update state with the new images
    setData((prev) => {
      return {
        ...prev,
        productImage: [...prev.productImage, ...uploadedImageUrls],
      };
    });
  };
  const handleOnChange = (e) => {
    const { name, value} = e.target

      setData((preve)=>{
        return{
          ...preve,
          [name]  : value
        }
      })
  };
  const handleSubmit=async(e)=>{
    e.preventDefault()
    const fethUploadData=await fetch(summaryAPI.uploadProduct.url,{
      method:summaryAPI.uploadProduct.method,
      credentials:"include",
      headers:{
        "content-type":"application/json"
      },
      body:JSON.stringify(data)
    })

    const dataResponse=await fethUploadData.json()

    if(dataResponse.success)
      {
        toast.success("Product Uploaded")
        onclose(false)
        updateList()
          
      }
      if(dataResponse.error)
        {
          toast.error(dataResponse.message)
        }


  }
  return (
    <div className="fixed w-full h-full bg-slate-200 bg-opacity-40 left-0 right-0 top-0 bottom-0 flex justify-center items-center">
      <div className="bg-white p-2  rounded w-full max-w-2xl z-10 h-full max-h-[80%] overflow-hidden ">
        <div className="flex w-full">
          <h2 className="font-bold text-lg">UploadProduct</h2>
          <div className="ml-auto ">
            <IoMdClose
              className="text-2xl hover:text-red-600 cursor-pointer w-fit "
              onClick={() => onclose(false)}
            />
          </div>
        </div>

        <form className="grid p-4 gap-2 overflow-y-scroll h-full" onSubmit={
          handleSubmit 
          }>
          <label htmlFor="productname">Product Name</label>
          <div className="">
            <input
              className="p-2 bg-slate-100 w-full border rounded"
              type="text"
              id="productname"
              name="productName"
              placeholder="Enter a Product Name"
              value={data.productName}
              onChange={handleOnChange}
            />
          </div>

          <label htmlFor="brandName">Brand Name</label>
          <div className="">
            <input
              className="p-2 bg-slate-100 w-full border rounded"
              type="text"
              id="brandName"
              name="brandName"
              placeholder="Enter a Brand Name"
              value={data.brandName}
              onChange={handleOnChange}
            />
          </div>

          <label htmlFor="category">Category</label>
          <div className="">
            <select
              className="p-2 bg-slate-100 w-full border rounded"
              id="category"
              name="category"
              value={data.category}
              onChange={handleOnChange}
            >
              <option value={""} >
                    Select Category
                  </option>
              {productCategory.map((e, index) => {
                return (
                  <option value={e.value} key={e.value + 1}>
                    {e.label}
                  </option>
                );
              })}
            </select>
          </div>

          <label htmlFor="productImage">
  Product Image
  <div className="p-2 bg-slate-100 w-full border h-48 rounded flex justify-center items-center">
    <div className="text-slate-500 items-center justify-center flex-col cursor-pointer gap-2 ">
      <div className="text-4xl ml-12">
        <FaCloudUploadAlt />
      </div>
      <p className="text-sm">Upload Product Images</p>
      <input
        type="file"
        id="productImage"
        className="hidden"
        onChange={handleUploadProduct}
        multiple // Allow multiple files
      />
    </div>
  </div>
</label>
<div className="flex gap-2">
  {data?.productImage.length > 0 ? (
    data.productImage.map((url, index) => (
      <div key={index}>
        <div className="relative group">
          <img
            src={url}
            alt="Product"
            height={80}
            width={80}
            className="bg-slate-100 cursor-pointer"
            onClick={() => {
              setOpenFullScreenImage(true);
              setFullScreenImage(url);
            }}
          />
          <div
            className="absolute top-0 right-0 p-1 text-white bg-red-500 rounded-full hidden group-hover:block cursor-pointer"
            onClick={() => handleDeleteProductImage(index)}
          >
            <MdOutlineDelete />
          </div>
        </div>
      </div>
    ))
  ) : (
    <p className="text-red-500 text-xs">*Please Upload Images</p>
  )}
</div>


              
          <label htmlFor='price' className='mt-3'>Price :</label>
              <input 
                type='number' 
                id='price' 
                placeholder='Enter Price' 
                value={data.price} 
                name='price'
                onChange={handleOnChange}
                className='p-2 bg-slate-100 border rounded'
                required
              />


              <label htmlFor='sellingPrice' className='mt-3'>Selling Price :</label>
              <input 
                type='number' 
                id='sellingPrice' 
                // placeholder='Enter Selling Price' 
                value={data.sellingPrice} 
                name='sellingPrice'
                onChange={handleOnChange}
                className='p-2 bg-slate-100 border rounded'
                required
              />

              <label htmlFor='description' className='mt-3'>Description :</label>
              <textarea 
                className='h-28 bg-slate-100 border resize-none p-1' 
                placeholder='Enter Product Description' 
                rows={3} 
                onChange={handleOnChange} 
                name='description'
                value={data.description}
              >
              </textarea>




          <button className="bg-red-500 text-white mb-7 py-2 hover:bg-red-700" >
            Upload Product
          </button>
        </form>
      </div>
      {/* display full image */}
      {
        openFullScreenImage && (
          <DisplayImage className="" onClose={()=>setOpenFullScreenImage(false)} imgUrl={fullScreenImage}/>
        )
       }
    </div>
  );
};

export default UploadProduct;
