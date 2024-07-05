import React from 'react';
import { useState } from "react";
import { IoMdClose } from "react-icons/io";
import productCategory from "../helpers/productCategory";
import { FaCloudUploadAlt } from "react-icons/fa";
import uploadImage from "../helpers/uploadImage";
import DisplayImage from "../helpers/DisplayImage";
import { MdOutlineDelete } from "react-icons/md";
import summaryAPI from "../common";
import {toast} from 'react-toastify'

const AdminEditProduct = ({onclose,setopenUploadProduct,  updateList,productData }) => {


    
        const [data, setData] = useState({
          productName: productData?.productName,
          brandName: productData?.brandName,
          category: productData?.category,
          productImage:productData?.productImage|| [],
          description: productData?.description,
          price: productData?.price,
          sellingPrice: productData?.sellingPrice,
          _id:productData?._id
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
          const file = e.target.files[0];
      
          // setuploadProductImageInput(file.name)
          // console.log("File",file)
      
          const uploadImageCloudinary = await uploadImage(file);
          setData((preve) => {
            return {
              ...preve,
              productImage: [...preve.productImage, uploadImageCloudinary.url],
            };
          });
          // console.log("upload image",uploadImageCloudinary.url)
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
          const fethUploadData=await fetch(summaryAPI.updateProduct.url,{
            method:summaryAPI.updateProduct.method,
            credentials:"include",
            headers:{
              "content-type":"application/json"
            },
            body:JSON.stringify(data)
          })
      
          const dataResponse=await fethUploadData.json()
      
          if(dataResponse.success)
            {
              toast.success(dataResponse.message)
              onclose(false)
              updateList()
                
            }
            if(dataResponse.error)
              {
                toast.error(dataResponse.message)
              }
      
      
        }

  return (
    // <div className='fixed bottom-0 right-0 left-0 top-0 bg-red-500 flex justify-center items-center' >
    //    Admin Edit product
    //     </div>
    <div className='fixed w-full  h-full bg-slate-200 bg-opacity-35 top-0 left-0 right-0 bottom-0 flex justify-center items-center'>
    <div className='bg-white p-4 rounded w-full max-w-2xl h-full max-h-[80%] overflow-hidden'>
      <div className="flex w-full">
        <h2 className="font-bold text-lg">Edit Product</h2>
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
              <div className="text-4xl ml-12 ">
                {" "}
                <FaCloudUploadAlt />
              </div>
              <p className="text-sm">Upload Product Images</p>
              <input
                type="file"
                id="productImage"
                className="hidden "
                onChange={handleUploadProduct}
              />
            </div>
          </div>
        </label>
        <div className="flex gap-2">
          {data?.productImage[0] ? (
            data.productImage.map((e,index) => {
              return (
                <div
                  
                >
                  <div className="relative group" >
                      <img
                        src={e}
                        alt="Image"
                        height={80}
                        width={80}
                        className="bg-slate-100 cursor-pointer"
                        onClick={() => {
                          setOpenFullScreenImage(true);
                          setFullScreenImage(e);
                        }}
                      ></img>
                      <div className="absolute top-0 right-0 p-1 text-white bg-red-500 rounded-full hidden group-hover:block  cursor-pointer" onClick={()=>handleDeleteProductImage(index)}>
                          <MdOutlineDelete/>
                      </div>
                  </div>

                  
                </div>
              );
            })
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
          Update Product
        </button>
      </form>
    </div>
    {/* display full image */}
    {
      openFullScreenImage && (
        <DisplayImage onClose={()=>setOpenFullScreenImage(false)} imgUrl={fullScreenImage}/>
      )
     }
  </div>
  )
}

export default AdminEditProduct