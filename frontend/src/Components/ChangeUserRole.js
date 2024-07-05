import React from "react";
import ROLE from "../common/role";
import { IoMdClose } from "react-icons/io";
import { useState } from "react";
import summaryAPI from "../common";
import { toast } from "react-toastify";

const ChangeUserRole = ({ name, email, role, setopenUpdateRole ,userId,callFunc}) => {
    
  const [userRole, setuserRole] = useState(role);

  const handleChangeRole = (e) => {
    setuserRole(e.target.value);
    // console.log(e.target.value);
  };
  const updateUserRole = async () => {
    const fetchResponse = await fetch(summaryAPI.updateUser.url,{
        method : summaryAPI.updateUser.method,
        credentials : 'include',
        headers : {
            "content-type" : "application/json"
        },
        body : JSON.stringify({
            userId : userId,
            role : userRole
        })
    })

    const responseData = await fetchResponse.json();

    if(responseData.success)
        {
            toast.success(responseData.message)
            setopenUpdateRole(false)
            callFunc()

        }
        if(responseData.error)
            {
                toast.error(responseData.message)
            }

    
    // console.log("responseData", responseData);
  };
  return (
    <div className=" fixed top-0 bottom-0 left-0 right-0 flex w-full h-full z-10  justify-between items-center bg-slate-200 bg-opacity-10">
      <div className="bg-white shadow-md p-4 w-full max-w-sm mx-auto">
        <button
          className="block ml-auto"
          onClick={() => setopenUpdateRole(false)}
        >
          <IoMdClose />
        </button>
        <h1 className="pb-4 text-lg font-medium">Change User Role</h1>
        <p>Name: {name}</p>
        <p>Email: {email}</p>
        <div className="flex items-center justify-between my-4">
          <p>Role</p>
          <select
            value={userRole}
            onChange={handleChangeRole}
            className="border px-4 py-1 "
          >
            {Object.values(ROLE).map((e) => {
              return (
                <option value={e} key={e}>
                  {e}
                </option>
              );
            })}
          </select>
        </div>
        <button
          className="w-fit mx-auto block border p-2 rounded-full bg-red-600 text-white hover:bg-red-700"
          onClick={updateUserRole }

        >
          Change Role{" "}
        </button>
      </div>
    </div>
  );
};

export default ChangeUserRole;
