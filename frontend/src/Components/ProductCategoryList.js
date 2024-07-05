import React, { useEffect, useState } from 'react'
import summaryAPI from '../common'
import { Link } from 'react-router-dom'

const ProductCategoryList = () => {
  const [categoryProduct,setcategoryProduct]=useState([])
  const [loading,setLoading]=useState(false)
  const categoryLoading= new Array(13).fill(null)  //13 category


  const fetchcategoryProduct=async ()=>{
    setLoading(true)
    const fetchCategoryProduct=await fetch(summaryAPI.categoryProduct.url)
    const dataResponse=await fetchCategoryProduct.json()
    setcategoryProduct(dataResponse.data)
    setLoading(false)

  }

  useEffect(()=>{
    fetchcategoryProduct()
  },[])
  return (
              <div className=' container mx-auto p-4 '>
                <div className='flex items-center gap-2 overflow-scroll scrollbar-none'>
                  {
                    loading ? (
                      categoryLoading.map((e,index)=>{
                        return(
                          <div className='md:w-20 md:h-20 w-16 h-16  rounded-full bg-slate-200  overflow-hidden ' key={"categoryLoading"+index}>
                        
                          </div>
                        )
                      })
                     
                    ):(
                                        categoryProduct.map((product,index)=>{
                                return(
                                  <Link to={'/product-category/'+product?.category} className='mx-auto cursor-pointer' key={product?.category}>
                                    <div className='md:w-20 md:h-20 w-16 h-16 flex rounded-full p-3  overflow-hidden justify-center items-center bg-slate-200'>
                                      <img  src={product?.productImage[0]} alt={product?.category} className='h-full  object-scale-down mix-blend-multiply hover:scale-125  transition-all'/>
                                    </div>
                                    <p className='text-center text-sm md:text-base capitalize'>{product?.category}</p>
                                  </Link>
                                )
                              })
                
                )
          
              }
    </div>
    </div>
  )
}

export default ProductCategoryList