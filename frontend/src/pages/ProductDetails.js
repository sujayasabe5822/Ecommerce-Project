import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import summaryAPI from '../common'
import { FaStar } from "react-icons/fa";
import { FaStarHalf } from "react-icons/fa";
import displayINRCurrency from '../helpers/displayCurrency'
import VerticalCardProduct from '../Components/VerticalCardProduct';
import productCategory from '../helpers/productCategory';
import ProductCard from '../Components/ProductCard';

const ProductDetails = () => {
    const [data,setData]=useState({
        productName:"",
    brandName:"",
    category:"",
    productImage:[],
    description:"",
    price:"",
    sellingPrice:""
    })
    const[loading ,setLoading]=useState(false)
    const params =useParams()
    const productImageListLoading=new Array(4).fill(null)

    const [activeImage,setActiveImage]=useState("")
    const[zoomImageCoordinate,setZOOmImageCoodridinate]=useState({
        x:0,
        y:0
    })

    console.log("product id",params)
    const fetchProductDetails=async()=>{
        setLoading(true)
        const response=await fetch(summaryAPI.getProductDetails.url,{
            method:summaryAPI.getProductDetails.method,
            headers:{
                "content-type":"application/json"
            },
            body:JSON.stringify({
                _id:params?.id
            })
        })

        setLoading(false)

        const dataResponse=await response.json()
        setData(dataResponse?.data) 
        setActiveImage(dataResponse?.data.productImage[0])

    }
    const handleMouseEnterProduct=(imageURL)=>{
        setActiveImage(imageURL)
    }
    const handleZoomImage=(e)=>{
        const { left , top, width , height } = e.target.getBoundingClientRect()        
            console.log("coordinate",left,width,top,height)
    }
    useEffect(()=>{

        fetchProductDetails()
    },[params])

  return (

    <div>

 
    <div className='container mx-auto p-4  md:flex gap-4 '>
            {/* product Image div */}
       



                
                    {
                        loading ? (
                            <div className='min-h-200px flex-col  gap-4 lg:flex-row  md:flex '>
                            <div className='flex gap-2  lg:flex-col overflow-scroll scrollbar-none h-full'>
                                
                                   
                                       
                                            <div className='h-20 w-20 bg-slate-200 rounded animate-pulse' >
                                            
                                             </div>
                                            <div className='h-20 w-20 bg-slate-200 rounded animate-pulse' >
                                            
                                             </div>
                                            <div className='h-20 w-20 bg-slate-200 rounded animate-pulse' >
                                            
                                             </div>
                                            <div className='h-20 w-20 bg-slate-200 rounded animate-pulse' >
                                            
                                             </div>
                                        
                                   
                                
                            </div>
                            <div className='h-[300px] w-[300px] lg:h-96 lg:w-96 bg-slate-200'>
                             </div>
                            </div>
                                
                        ):( 
                            <div className='h-200px lg:flex gap-4 '>
                                        <div className='flex gap-2  lg:flex-col overflow-y-scroll  scrollbar-none h-[100px] lg:h-[400px]'>
                                        {
                                            data?.productImage?.map((imageURL,index)=>{
                                                return(
                                                    <div className='h-24 w-24 bg-slate-200 rounded' key={imageURL}>
                                                    <img  src={imageURL} className='w-full h-full object-scale-down mix-blend-multiply cursor-pointer' onMouseEnter={()=>handleMouseEnterProduct(imageURL)} onClick={()=>handleMouseEnterProduct(imageURL)}/>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div> 
                           <div className=' relative  h-96 w-96 lg:h-[500px] lg:w-[500px] rounded   bg-slate-200'>
                             <img src={activeImage} className='object-sacle-down mix-blend-multiply h-full w-auto ' onMouseEnter={handleZoomImage} />

                             {/* zoom by hover */}
                             {/* <div className='hidden lg:block absolute min-w-[500px] overflow-hidden min-h-[400px] bg-slate-200 p-1 -right-[510px] top-0'>
                            <div
                            className='w-full h-full min-h-[400px] min-w-[500px] mix-blend-multiply scale-150'
                            style={{
                              background : `url(${activeImage})`,
                              backgroundRepeat : 'no-repeat'
                              
    
                            }}
                          >
    
                          </div>
                        </div> */}
                        </div>
                        </div> 

                        )
                    }

                  

           

       
            {/* product details div */}

            {
                loading ? (
                    <div className='p-4  w-80 flex-col'>
                    <p className='bg-slate-200 h-6 m-2 w-full  animate-pulse font-bold text-xl py-2 '></p>
                    <h2 className='bg-slate-200 h-6 m-2 w-full  animate-pulse text-semibold text-3xl  lg:text-4xl py-2'></h2>
                    <p className='bg-slate-200 h-6 m-2 w-full  animate-pulse capitalize text-slate-500'></p>

                    <div className='flex gap-2  bg-slate-200 h-6 m-2 w-full  animate-pulse'>
                      
                    </div>
                    
                    <div className=' py-4  '>
                                <p style={{    color: "#1b9430"}} className='bg-slate-200 h-6 m-2 w-full  animate-pulse'></p>
                              <div className='text-2xl grid md:flex gap-3'><p  className=' bg-slate-200 h-6 m-2 w-full  animate-pulse '></p>
                                <p style={{    color: "#ff2d55"}} className='bg-slate-200 h-6 m-2 w-full  animate-pulse'></p>
                    
                                </div>  
                      </div>

                      <div className='flex gap-3'>
                        {/* Add to cart and buy */}
                        <button  className=' bg-slate-200 h-6 m-2 w-full  animate-pulse px-3 py-1 rounded-full' ></button>
                        <button  className=' bg-slate-200 h-6 m-2 w-full  animate-pulse px-3 py-1 rounded-full' ></button>
                      </div>

                      <div>
                        <p className='bg-slate-200 h-6 m-2 w-full  animate-pulse  my-2'> </p>
                        <p className='bg-slate-200 h-6 m-2 w-full  animate-pulse'></p>
                      </div>
                      </div>

                ):(

                    <div className='p-4 flex-col'>
                    <p className='font-bold text-xl py-2 '>Brand:{data?.brandName}</p>
                    <h2 className='text-semibold text-3xl  lg:text-4xl py-2'>{data?.productName}</h2>
                    <p className='capitalize text-slate-500'>{data?.category}</p>

                    <div className='flex gap-2  text-red-500'>
                        <FaStar/>
                        <FaStar/>
                        <FaStar/>
                        <FaStar/>
                        <FaStarHalf/>

                    </div>
                    
                    <div className=' py-4  '>
                                <p style={{    color: "#1b9430"}} className='text-xl'>Special price</p>
                              <div className='text-2xl grid md:flex gap-3'><p  className=' font-medium '>{displayINRCurrency(data?.sellingPrice) }</p>
                                <p style={{    color: "#ff2d55"}} className='text-slate-500 line-through text-ellipsis line-clamp-1'>{displayINRCurrency(data?.price)  }</p>
                    
                                </div>  
                      </div>

                      <div className='flex gap-3'>
                        {/* Add to cart and buy */}
                        <button style={{backgroundColor: "rgb(239 142 56)"}} className=' hover:bg-red-700 text-white px-3 py-1 rounded-full' >Add to Cart</button>
                        <button style={{backgroundColor: "rgb(236 88 9)"}} className=' hover:bg-red-700 text-white px-3 py-1 rounded-full' >Buy Now</button>
                      </div>

                      <div>
                        <p className='text-slate-600 font-medium  my-2'>Description : </p>
                        <p>{data?.description}</p>
                      </div>
        </div>


                )
            }
      

    </div>

    

            {
                data?.category&&(
                    <div className='container mx-auto p-4'>

                        {/* <VerticalCardProduct  category={data?.category} heading={"Similar Products..."}/> */}
                        <ProductCard  category={data?.category} heading={"Similar Products"}/>
                        <p className='p-4 text-2xl font-semibold'>Recommended Products</p>
                             
                           {
                            productCategory?.map((category,index)=>{
                                return(
                                      
                                        <div>
                                            
                                           {/* <VerticalCardProduct  category={category?.value} heading={` Best ${category?.label}`}/> */}
                                           <ProductCard  category={category?.value} heading={` Best ${category?.label}`} />
                                        </div>
                                    
                                )
                            })
                           }

                    </div>
                )
            }


      

    </div>
  )
}

export default ProductDetails