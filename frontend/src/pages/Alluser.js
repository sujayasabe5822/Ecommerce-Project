import React, { useEffect, useState } from 'react'
import summaryAPI from '../common'
import {toast} from 'react-toastify'
import moment from 'moment'
import { FaEdit } from "react-icons/fa";
import ChangeUserRole from '../Components/ChangeUserRole';
import { MdDelete } from "react-icons/md";
import DeleteUser from '../Components/DeleteUser';

const Alluser = () => {
  const [allUser,setallUser]=useState([])
  const [openUpdateRole,setopenUpdateRole]=useState(false)
  const[openUserDelete,setOpenUserDelete]=useState(false)
  const[updateUserDetails,setupdateUserDetails]=useState({
    email:"",
    name:"",
    role:"",
   _id:""
  })
  const fetchAllUser=async () => {
    const fetchData=await fetch(summaryAPI.allUser.url,{
      method:summaryAPI.allUser.method,
      credentials:'include'

    })
    const dataResponse=await fetchData.json()
    if(dataResponse.success)
      {
        setallUser(dataResponse.data)
      }
      if(dataResponse.error)
        {
          toast.error(dataResponse.message)
        }
    // console.log("all Users", dataResponse)
  }
  useEffect(()=>{
    fetchAllUser()
  },[])
  return (
    <div>
      <table className='w-full userTable '>
        <thead>
          <th>Sr.No</th>
          <th>Name</th>
          <th>Email</th>
          <th>Role</th>
          <th>Created Date</th>
          <th className='w-24'>Action</th>
        </thead>
        <tbody>
          {
            allUser.map((e,index)=>{
              return (
                <tr>
                  <td>{index+1}</td>
                  <td>{e?.name}</td>
                  <td>{e?.email}</td>
                  <td>{e?.role}</td>
                  <td>{moment(e?.createdAt).format('ll')}</td>
                  <td className='flex gap-2 w-fit'>
                  <button className='     p-2 items-center  ' onClick={()=>
                    {  setupdateUserDetails(e)
                      setopenUpdateRole(true)
                    }}>
                        <div className='bg-red-100 rounded-full -2 p-2 hover:bg-green-500 hover:text-white'>
                        <FaEdit/> 
                        </div>
                     </button>

                     <button className='     p-2 items-center  ' onClick={()=>
                    {   setupdateUserDetails(e)
                      setOpenUserDelete(true)}}>
                        <div className='bg-red-100 rounded-full  p-2 hover:bg-green-500 hover:text-white'>
                        <MdDelete/> 
                        </div>
                     </button>

                        {
                          openUpdateRole&& (
                          <ChangeUserRole name={updateUserDetails.name} 
                          email={updateUserDetails.email} 
                          role={updateUserDetails.role}
                           openUpdateRole={openUpdateRole} 
                           userId={updateUserDetails._id}
                           setopenUpdateRole={setopenUpdateRole} 
                           callFunc={fetchAllUser}
                           />
                          )
                          
                        }
                        {
                          openUserDelete&&( 
                            <DeleteUser name={updateUserDetails.name} 
                          email={updateUserDetails.email} 
                          role={updateUserDetails.role}
                           openUserDelete={openUserDelete} 
                           userId={updateUserDetails._id}
                           setOpenUserDelete={setOpenUserDelete}
                           
                         
                           callFunc={fetchAllUser}
                           />
                          )
                        }

                  </td>
                </tr>
              )
            })
          }
        </tbody>
      </table>

           
    </div>
  )
}

export default Alluser