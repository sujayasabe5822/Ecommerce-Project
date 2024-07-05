import React, { useState } from 'react'
import { MdEdit } from "react-icons/md";
import AdminEditProduct from './AdminEditProduct';
import displayINRCurrency from '../helpers/displayCurrency';
import { MdDelete } from "react-icons/md";
import  DeleteAdminProduct from './DeleteAdminProduct'
const AdminProductCard = ({data ,updateList}) => {
  const[editProduct,seteditProduct]=useState(false)
  const[openUploadProduct,setopenUploadProduct]=useState(false)
  const[openDeleteProduct,setOpenDeleteProduct]=useState(false)
   const[deleteProductDetails ,setDeleteProductDetails]=useState({
              productName:"",
              sellingPrice:"",

    })
  const handleDelete=()=>{
    console.log("product delete",data)
    setOpenDeleteProduct(true)

  }
  return (
    <div className='bg-white p-4 w-60 rounded '>
       <div className='w-40 text-center'>
            <div className='w-40 h-40 flex mx-auto justify-center items-center'>
              <img src={data?.productImage[0]} alt='No Product Image available'  className='mx-auto object-fill h-full'/>   
            </div> 
            <h1 className='text-ellipsis line-clamp-2'>{data.productName}</h1>
             
            <div>
              <h1 className='text-elipsis line-clamp-2'>
                  {
                    displayINRCurrency(data.sellingPrice)
                  }
              </h1>
              
             
             <div className='flex'>
                    <div className='bg-red-100 w-fit rounded-full  p-2 hover:bg-red-500 cursor-pointer hover:text-white' onClick={handleDelete}>
                                <MdDelete/> 
                      </div>

                      <div className='w-fit ml-auto p-2  bg-blue-100 hover:bg-blue-500 rounded-full hover:text-white cursor-pointer' onClick={()=>seteditProduct(true)}>
                            <MdEdit/>
                        </div>
             </div>
               
              
            </div>

          </div>
            {
              editProduct&&<AdminEditProduct  productData={data} updateList={updateList} onclose={seteditProduct} />

            }
            {
              openDeleteProduct &&<DeleteAdminProduct product={data} updateList={updateList} setOpenDeleteProduct={setOpenDeleteProduct} />
            }

       </div>
  );
}


export default AdminProductCard