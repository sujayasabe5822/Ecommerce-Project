import React, { useContext, useState } from 'react'
import loginIcon from '../assest/signin.gif'
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import summaryAPI from '../common';
import { toast } from 'react-toastify';
import Context from '../context';


const Login = () => {
    const [showPassword,setshowPassword]=useState(false);
    const[data,setData]=useState({
        email:"",
        password:""
    })
    const {fetchUserDetails,fetchCartCount}=useContext(Context)
            


    const navigate=useNavigate()
    const handleOnChange=(e)=>{
        const{name,value}=e.target
            setData((prev)=>{
             return{
                ...prev,
                [name]:value
             }
            })

    }
    const handleSubmit=   async(e)=>{
        e.preventDefault()

        const dataResponse=await fetch(summaryAPI.signIn.url,{
            method:summaryAPI.signIn.method,
            credentials:'include',
            headers:{
              "content-type":"application/json"
            },
            body:JSON.stringify(data)
          })

          const dataAPI=await dataResponse.json()
        //   console.log("after logIn",dataAPI)
          if(dataAPI.success)
            {
              toast.success(dataAPI.message)
              navigate("/")
              fetchUserDetails()
              fetchCartCount()
      
            }
            if(dataAPI.error)
              {
                toast.error(dataAPI.message)
              }

        
    }
  return (
    <section id='login'>
        <div className='container p-4 mx-auto '>
            <div className='w-full max-w-md bg-white p-2 mx-auto'>
                <div className='container mx-auto w-20 h-20 '>
                         <img src={loginIcon} alt='Login Icon' className='bg-transperent'></img>
                </div>
                <div>
                    <form onSubmit={handleSubmit}>
                        <label> Email:</label>
                        <div className='bg-slate-100  '>
                            <input type='text'
                             placeholder='Enter Email Address'
                             name='email'
                             value={data.email}
                             onChange={handleOnChange}
                              className='w-full h-full p-2 outline-none bg-transparent'></input>
                        </div>
                        <label> Password:</label>
                        <div  className='bg-slate-100 flex p-2 '>
                            <input type={showPassword?'text':'password'} 
                            placeholder='Enter Password'
                            name='password'
                            value={data.password}
                            onChange={handleOnChange}
                            className='w-full h-full outline-none bg-transparent'></input>
                            <div onClick={()=>setshowPassword((prev)=>(!prev))}>
                                <span className='text-xl cursor-pointer'>
                                    {
                                        showPassword?
                                        (<FaEyeSlash/>)
                                        :( <FaEye/>)
                                    }
                                   
                                </span>
                            </div>
                            
                        </div>
                        <div >
                        <Link to={'/forget-password'} className='hover:underline hover:text-red-600 block w-fit ml-auto '>
                            Forget Password?
                            
                            </Link>
                        </div>


                        <button type='submit' className='bg-blue-400 text-black px-5 py-2 w-full max-w-[100px] my-5 rounded-sm hover:scale-110 transition-all'>Login</button>
                         <p><Link to={'/Sign-Up'} className='hover:underline mb-4 hover:text-red-600'> Don't have an Account?</Link></p>
                    </form>
                </div>
               
            </div>
        </div>
    </section>
  )
}

export default Login 