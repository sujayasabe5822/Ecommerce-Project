import React, { useState } from 'react'
import loginIcon from '../assest/signin.gif'
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import imageToBase64 from '../helpers/Imagetobase64';
import summaryAPI from '../common';
import { toast } from 'react-toastify';


const SignUp = () => {
  const [showPassword, setshowPassword] = useState(false);
  const [confirmshowPassword, setconfirmshowPassword] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: "",
    confirmpassword: "",
    name: "",
    profilepic: ""
  })
  const navigate=useNavigate()
  // console.log(data)
  const handleOnChange = (e) => {
    const { name, value } = e.target
    setData((prev) => {
      return {
        ...prev,
        [name]: value
      }
    })

  }
  const handleUploadPic=async (e)=>{
  const file=e.target.files[0]
  const profileimg=await imageToBase64(file)
// console.log(profileimg)

  setData((prev)=>{
    return{
        ...prev,
        profilepic:profileimg
    }
  })


  }
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (data.password === data.confirmpassword) {
    const signUpData=await fetch(summaryAPI.signUp.url,{
      method:summaryAPI.signUp.method,
      headers:{
        "content-type":"application/json"
      },
      body:JSON.stringify(data)
    })

   

    const dataAPI=await signUpData.json()
    if(dataAPI.success)
      {
        toast.success(dataAPI.message)
        navigate("/login")

      }
      if(dataAPI.error)
        {
          toast.error(dataAPI.message)
        }
    // console.log(dataAPI)
      }
      else{
        toast.error("Please check Password and Confirm Password")
      }

    
  }


  return (
    <section id='signup'>
      <div className='container p-4 mx-auto '>
        <div className='w-full max-w-md bg-white p-2 mx-auto'>
          <div>
            <div className='container mx-auto w-20 h-20 relative '>
              <img src={data.profilepic || loginIcon} alt='profile pic' className='bg-transperent'></img>
            </div>
            <form>
              <label><div className='text-xm text-center mx-40 mb-5 cursor-pointer bg-slate-200 rounded-xm '>
                Upload Photo
                <input type='file' className='hidden' onChange={handleUploadPic}></input>
              </div></label>
              
              
            </form>

          </div>
          <div>
            <form onSubmit={handleSubmit}>
              <label> Name:</label>
              <div className='bg-slate-100  '>
                <input type='text'
                  placeholder='Enter Your Name'
                  name='name'
                  required
                  value={data.name}
                  onChange={handleOnChange}
                  className='w-full h-full p-2 outline-none bg-transparent'></input>
              </div>

              <label> Email:</label>
              <div className='bg-slate-100  '>
                <input type='email'
                  placeholder='Enter Email Address'
                  name='email'
                  value={data.email}
                  required
                  onChange={handleOnChange}
                  className='w-full h-full p-2 outline-none bg-transparent'></input>
              </div>
              <label> Password:</label>
              <div className='bg-slate-100 flex p-2 '>
                <input type={showPassword ? 'text' : 'password'}
                  placeholder='Enter Password'
                  name='password'
                  value={data.password}
                  required
                  onChange={handleOnChange}
                  className='w-full h-full outline-none bg-transparent'></input>
                <div onClick={() => setshowPassword((prev) => (!prev))}>
                  <span className='text-xl cursor-pointer'>
                    {
                      showPassword ?
                        (<FaEyeSlash />)
                        : (<FaEye />)
                    }

                  </span>
                </div>

              </div>

              <label> Confirm Password:</label>
              <div className='bg-slate-100 flex p-2 '>
                <input type={confirmshowPassword ? 'text' : 'password'}
                  placeholder='Enter Password Again'
                  name='confirmpassword'
                  value={data.confirmpassword}
                  required
                  onChange={handleOnChange}
                  className='w-full h-full outline-none bg-transparent'></input>
                <div onClick={() => setconfirmshowPassword((prev) => (!prev))}>
                  <span className='text-xl cursor-pointer'>
                    {
                      confirmshowPassword ?
                        (<FaEyeSlash />)
                        : (<FaEye />)
                    }

                  </span>
                </div>
               

              </div>
              <div><p className='text-red-600'>{error}</p></div>


              <button type='submit' className='bg-blue-400 text-black px-5 py-2 w-full max-w-[100px] my-5 rounded-sm hover:scale-110 transition-all'>Sign Up</button>
              <p><Link to={'/login'} className='hover:underline mb-4 hover:text-red-600'> Already have an Account?</Link></p>

            </form>
          </div>

        </div>
      </div>
    </section>
  )
}

export default SignUp