import React from 'react'
import { IoMdClose } from "react-icons/io";
import summaryAPI from '../common';
import { toast } from 'react-toastify';

const DeleteAdminProduct = ({product,updateList,setOpenDeleteProduct}) => {
    const handleDelete=async()=>{
        const response=await fetch(summaryAPI.adminProductDelete.url,{
            method:summaryAPI.adminProductDelete.method,
            headers:{
                "content-type":"application/json"
            },
            credentials:'include',
            body:JSON.stringify({
                productId:product?._id
            })
        })

        const dataResponse=await response.json()
        if(dataResponse.success)
            {
                toast.success(dataResponse.message)
                updateList()
                setOpenDeleteProduct(false)

            }
            if(dataResponse.error)
                {
                    toast.error(dataResponse.message)
                }

    }
  return (
    <div className=" fixed top-0 bottom-0 left-0 right-0 flex w-full h-full z-10  justify-between items-center bg-slate-200 bg-opacity-10">
      <div className="bg-white shadow-md p-4 w-full max-w-sm mx-auto">
        <button
          className="block ml-auto"
          onClick={() => setOpenDeleteProduct(false)}
        >
          <IoMdClose />
        </button>
       <div className='py-4 flex-col gap-4'>
       <h1 className="pb-4 text-lg font-medium">Delete Product</h1>
        <p>Product Name: {product.productName}</p>
        <p>Brand: {product.brandName}</p>
        <p>Price: {product.sellingPrice}</p>
          
       </div>
         
        
        <button
          className="w-fit mx-auto block border p-2 rounded-full bg-red-600 text-white hover:bg-red-700"
          onClick={handleDelete }

        >
          Delete{" "}
        </button>
      </div>
    </div>
  )
}

export default DeleteAdminProduct
