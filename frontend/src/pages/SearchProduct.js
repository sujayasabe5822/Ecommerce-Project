import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import summaryAPI from '../common'
import VerticalCard from '../Components/VerticalCardSearch'
import ProductCard from '../Components/ProductCard'

const SearchProduct = () => {
    const query=useLocation()
    // console.log("query search",query.search)
  const [data,setData]=useState([])
  const[loading,setLoading]=useState(false)

    const fetchProduct= async()=>{
      setLoading(true)
        const response=await fetch(summaryAPI.searchProduct.url+query.search,{
            method:summaryAPI.searchProduct.method
        })
          setLoading(false)
        const dataResponse=await response.json()
        console.log("dataResponse",dataResponse)

        setData(dataResponse.data)

    }
    useEffect(()=>{
        fetchProduct()

    },[query.search])
  
  return (
    <div className='container mx-auto p-4'>
      {
        loading && (
          <p className='text-lg text-center'>Loading ...</p>
        )
      }
 
      <p className='text-lg font-semibold my-3'>Search Results : {data.length}</p>

      {
        data.length === 0 && !loading && (
           <p className='bg-white text-lg text-center p-4'>No Data Found....</p>
        )
      }


      {
        data.length !==0 && !loading && (
          <VerticalCard loading={ loading} data={data}/>
          // <ProductCard loading={ loading} data={data}/>
        )
      }

    </div>
  )
}

export default SearchProduct