
import './App.css';
import { Outlet } from 'react-router-dom';
import Footer from './Components/Footer';
import Header from './Components/Header';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import summaryAPI from './common';
import { useEffect, useState } from 'react';
import Context from './context';
import { useDispatch } from 'react-redux';
import { setUserDetails } from './store/userSlice';

export default  function  App() {
  const dispatch=useDispatch()

  const[userCartCount,setUserCartCount]=useState(0)
const fetchUserDetails=async()=>{
  const dataResponse=await fetch(summaryAPI.userDetails.url,{
    method:summaryAPI.userDetails.method,
    credentials:'include'
  })

  const dataApi=await dataResponse.json()
  if(dataApi.success)
    {
      dispatch(setUserDetails(dataApi.data))
    }
  // console.log("dataResponse",dataResponse)
}
const fetchCartCount= async()=>{
  const response=await fetch(summaryAPI.cartCount.url,{
    method:summaryAPI.cartCount.method,
    credentials:"include"
  })
  const dataResponse=await response.json()
  setUserCartCount(dataResponse?.data?.count)
  // console.log("count ",dataResponse)

}
useEffect(()=>{
  fetchUserDetails()
  fetchCartCount()
},[])
  return (
   <>
   <Context.Provider value={{
    fetchUserDetails,
    userCartCount,
    fetchCartCount
   
   }}>
  <ToastContainer position='top-center' />
  <Header/>
  <main className='min-h-[calc(100vh-100px)] pt-2'>
    
   <Outlet/>
  </main>
   <Footer/>
   </Context.Provider>
   </>
  )
}


