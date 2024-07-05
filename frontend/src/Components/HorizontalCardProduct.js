import React, { useContext, useEffect, useRef, useState } from 'react'
import fetchCategoryWiseProduct from '../helpers/fetchCategoryWiseProduct'
import displayINRCurrency from '../helpers/displayCurrency'
import { FaAngleLeft } from "react-icons/fa6";
import { FaAngleRight } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import addToCart from '../helpers/addToCart';
import Context from '../context';


const HorizontalCardProduct = ({category,heading} ) => {
    const[data,setData]=useState([])
    const[loading,setLoading]=useState(false)
    const loadingList =new Array(13).fill(null)

    const[scroll,setScroll]=useState(0)
    const scrollElement=useRef()
    const {fetchUserDetails,fetchCartCount}=useContext(Context)

    const fetchProductData=async ()=>{
        setLoading(true)
        const fetchCategoryProduct =await fetchCategoryWiseProduct(category)
        setLoading(false)
        setData(fetchCategoryProduct?.data)
    }
    const scrollRight=()=>{
        scrollElement.current.scrollLeft+=300
    }
    const scrollLeft=()=>{
        scrollElement.current.scrollLeft-=300
    }

    const handleCartCount= async(e,id)=>{
         await addToCart(e,id)
        fetchCartCount()

    }
    useEffect(()=>{
        fetchProductData()
    },[])

  return (
    <div className='container mx-auto  p-4 my-6 '>
        <h2 className='text-2xl font-semibold py-4 transition-all'>{heading}</h2>

                <div className='relative hidden md:block'>
                <button  style={{alignContent:"initial"}} className='bg-white text-xl rounded-full shadow-md absolute left-0 top-16'onClick={scrollLeft}><FaAngleLeft/></button>
                <button style={{alignContent:"end"}} className='bg-white  text-xl rounded-full shadow-md absolute right-0 top-16'onClick={scrollRight}><FaAngleRight/></button>
          
                </div>
           <div className='flex gap-3 md:gap-6 overflow-scroll  scrollbar-none' ref={scrollElement}>
               
           {    
                loading?(
                    loadingList.map((product,index)=>{
                        return(
                            <div className='w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] h-36 bg-white rounded-sm shadow flex'>
                                <div className='bg-slate-200 h-full p-4 min-w-[120px] md:min-w-[145px] animate-pulse'>
    
                                </div>
                                <div className='p-4 grid w-full gap-2'>
                                    <h2 className='font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black bg-slate-200 animate-pulse p-1 rounded-full'></h2>
                                    <p className='capitalize text-slate-500 p-1 bg-slate-200 animate-pulse rounded-full'></p>
                                    <div className='flex gap-3 w-full'>
                                        <p className='text-red-600 font-medium p-1 bg-slate-200 w-full animate-pulse rounded-full'></p>
                                        <p className='text-slate-500 line-through p-1 bg-slate-200 w-full animate-pulse rounded-full'></p>
                                    </div>
                                    <button className='text-sm  text-white px-3 py-0.5 rounded-full w-full bg-slate-200 animate-pulse'></button>
                                </div>
                            </div>
                        )
                    })
                ):(
                    data.map((product,index)=>{
                        return (
                          <Link to={`product-details/${product?._id}`} className="w-full max-w-[280px] md:max-w-[350px] h-36 rounded shadow-sm bg-white flex ">
                            <div className="bg-slate-200 h-full p-2 min-w-[120px] md:min-w-[145px]">
                              <img src={product?.productImage[0]} alt=" " className=' hover:scale-110 transition-all object-scale-down h-full' />
                            </div>
                            <div className='p-4 grid w-full '>
                                <h2 className='font-semibold w-full text-base md:text-lg text-ellipsis line-clamp-1'>{product?.productName}</h2>
                                <p className='capitalize text-slate-500'>{product?.category}</p>
    
                                <div className=' grid md:flex gap-3 '>
                                <p style={{    color: "#1b9430"}} className=' font-medium '>{displayINRCurrency(product?.sellingPrice) }</p>
                                <p style={{    color: "#ff2d55"}} className='text-slate-500 line-through text-ellipsis line-clamp-1'>{displayINRCurrency(product?.price)  }</p>
                               </div>
                               <div className=''>
                                <button  style={{backgroundColor: "#f17a11"}} className=' hover:bg-red-700 text-white px-3 py-1 rounded-full' onClick={(e)=>handleCartCount(e,product?._id)}>Add to Cart</button>
                               </div>
                            </div>
                            
                          </Link>
                        );
                    })
                )


                
            }
           </div>


        

    </div>
  )
}

export default HorizontalCardProduct