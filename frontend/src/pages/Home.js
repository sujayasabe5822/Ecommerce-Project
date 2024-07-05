import React from 'react'
import ProductCategoryList from '../Components/ProductCategoryList'
import BannerProduct from '../Components/BannerProduct'
import HorizontalCardProduct from '../Components/HorizontalCardProduct'
import VerticalCardProduct from '../Components/VerticalCardProduct'
import ProductCard from '../Components/ProductCard'


const Home = () => {
  return (
    <div >
        <div className=' h-[calc(100vh-110px)] overflow-y-scroll'>
        <ProductCategoryList/>
        <BannerProduct/>
        <HorizontalCardProduct category={"airpodes"} heading={"Top's Airpodes"}/>
        <ProductCard category={"mobiles"} heading={"Top's Mobiles"} /> 

        <VerticalCardProduct  category={"mobiles"} heading={"Top's Mobiles"}/>
        <VerticalCardProduct  category={"camera"} heading={"Camera & Photography"}/>
        <VerticalCardProduct  category={"earphones"} heading={"Top's Earphones"}/>
        <VerticalCardProduct  category={"speakers"} heading={"Top's Blutooth Speakers"}/>
        <VerticalCardProduct  category={"refrigerator"} heading={"Refrigerator"}/>
        <VerticalCardProduct  category={"Mouse"} heading={"Top's Mouse"}/>
        <VerticalCardProduct  category={"televisions"} heading={"Top's TV"}/>
        <VerticalCardProduct  category={"printer"} heading={"Top's Printers"}/>
        <VerticalCardProduct  category={"trimmers"} heading={"Top's Trimmers"}/>
        <VerticalCardProduct  category={"processor"} heading={"Processor and Systems"}/>
        <VerticalCardProduct  category={"watches"} heading={"Top's Watches"}/>

          
        </div>
    </div>
  )
}

export default Home