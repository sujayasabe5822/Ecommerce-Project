import React, { useEffect, useState } from 'react'
import image1 from '../assest/banner/img1.webp'
import image2 from '../assest/banner/img2.webp'
import image3 from '../assest/banner/img3.jpg'
import image4 from '../assest/banner/img4.jpg'
import image5 from '../assest/banner/img5.webp'

import image1Mobile from '../assest/banner/img1_mobile.jpg'
import image2Mobile from '../assest/banner/img2_mobile.webp'
import image3Mobile from '../assest/banner/img3_mobile.jpg'
import image4Mobile from '../assest/banner/img4_mobile.jpg'
import image5Mobile from '../assest/banner/img5_mobile.png'

import { FaAngleLeft } from "react-icons/fa6";
import { FaAngleRight } from "react-icons/fa6";

const BannerProduct = () => {
    const[currentImage,setcurrentImage]=useState(0)
    const deskTopImages=[
        image1,
        image2,
        image3,
        image4,
        image5
    ]

    const mobileImages=[
        image1Mobile,
        image2Mobile,
        image3Mobile,
        image4Mobile,
        image5Mobile
    ]
    const nextImage=()=>{
        if(deskTopImages.length -1> currentImage)
            {

                setcurrentImage(prev=>prev+1)
            }
    }
    const prevImage=()=>{
        if(currentImage!=0)
            {

                setcurrentImage(prev=>prev-1)
            }
    }

    useEffect(()=>{
        const interval=setInterval(()=>{
           if (deskTopImages.length -1> currentImage){
                nextImage()
            }
            else{
                setcurrentImage(0)
            }

        },5000)

        return ()=>clearInterval(interval)
    },[currentImage])
  return (
    <div className='container mx-auto px-4 '>
        <div className='h-56  md:h-80 w-full rounded bg-slate-200 relative'>
            <div style={{ paddingTop: "150px"}} className='absolute text-3xl  hidden z-10 w-full md:flex justify-between'>
                <button onClick={prevImage} style={{alignContent:"initial"}} className='bg-white rounded-full shadow-md'><FaAngleLeft/></button>
                <button onClick={nextImage} style={{alignContent:"end"}} className='bg-white rounded-full shadow-md'><FaAngleRight/></button>
            </div>

            {/* desktop version */}
            <div className='hidden md:flex h-full w-full overflow-hidden '>
            {
                deskTopImages.map((imagesrc,index)=>{
                    return(
                        <div className='h-full w-full min-w-full min-h-full transition-all'style={{transform:`translatex(-${currentImage*100}%`}} key={imagesrc+index}>
                        <img src={imagesrc} className='h-full w-full '/>
            
                        </div>
                    )
                })
            }</div> 

           {/* mobile version */}
           <div className='flex h-full w-full overflow-hidden md:hidden '>
            {
                mobileImages.map((imagesrc,index)=>{
                    return(
                        <div className='h-full w-full min-w-full min-h-full transition-all'style={{transform:`translatex(-${currentImage*100}%`}} key={imagesrc+index}>
                        <img src={imagesrc} className='h-full w-full '/>
            
                        </div>
                    )
                })
            }</div> 

        </div>
    </div>
  )
}

export default BannerProduct