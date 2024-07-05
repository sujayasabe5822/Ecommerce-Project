import React, { useEffect } from 'react'
import UploadProduct from '../Components/UploadProduct'
import {useState} from 'react'
import summaryAPI from '../common'
import { toast } from 'react-toastify'
import AdminProductCard from '../Components/AdminProductCard'

const Products = () => {
  const[openUploadProduct,setopenUploadProduct]=useState(false)
  const[allProducts,setallProducts]=useState([])


  const fetchAllProduct=async()=>{
    const fetchProduct=await fetch(summaryAPI.getProduct.url,{
      method:summaryAPI.getProduct.method,
      })

      const dataResponse=await fetchProduct.json()
      

      console.log("all products",dataResponse.data)

      if(dataResponse.success)
        {
          setallProducts(dataResponse?.data || [])
        }
        if(dataResponse.error)
          {
            toast.error(dataResponse.message)
          }
         
  }
  useEffect(()=>{
    fetchAllProduct()
  },[])

  return (
   <div className=''>
     <div className=' bg-white py-2 px-4  flex justify-between items-center'>
      <h1 className='font-bold text-lg '>All Products</h1>
      <button className='border py-1 px-3 rounded-full border-red-600 hover:text-white text-red-600 hover:bg-red-600 transition-all' onClick={()=>setopenUploadProduct(true)} >Upload Product </button>
    </div>
      

      {/* All Products */}
      <div className='flex flex-wrap items-center gap-6  justify-center h-[calc(100vh-190px)] py-4 overflow-y-scroll '>
        {
          allProducts.map((product,index)=>{
            return(
              <AdminProductCard className='' data={product} updateList={fetchAllProduct} key={index+"allProduct"}/>
                
            )
          })
        }
      </div>




  
  {/* Upload product component */}
         {
          openUploadProduct&&(
            <UploadProduct updateList={fetchAllProduct} onclose={setopenUploadProduct}/>
          )
         }

   </div>
  )
}

export default Products