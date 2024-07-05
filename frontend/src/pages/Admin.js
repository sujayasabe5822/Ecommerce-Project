import React, { useEffect } from "react";
import { FaRegUserCircle } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link, Outlet, useNavigate } from "react-router-dom";
import ROLE from "../common/role";

const Admin = () => {
  const user = useSelector((state) => state?.user?.user);
const navigate=useNavigate()

  useEffect(()=>{
    if(user?.role!==ROLE.ADMIN)
      {
        navigate("/")
      }
  },[user])

  return (
    <div className="min-h-[calc(100vh-100px)] md:flex hidden">
      <aside className="bg-white min-h-full w-full max-w-60 customShadow">
        <div className="h-32 flex justify-center items-center  flex-col">
          <div className="text-5xl cursor-pointer relative flex  justify-center">
            {user?.profilepic ? (
              <img
                src={user?.profilepic}
                className="w-20 h-20 rounded-full"
                alt={user?.name}
              />
            ) : (
              <FaRegUserCircle />
            )}
          </div>
          <p className="capitalize text-lg font-semibold">{user?.name}</p>
          <p>{user?.role}</p>
        </div>
        <div>
          {/* {navigation to admin activity} */}
          <div>
            <nav className="grid">
            <Link to={"all-users"} className="pl-5 py-1 hover:bg-slate-100">All Users</Link>
            <Link to={"products"}className="pl-5 py-1 hover:bg-slate-100">ALL Products</Link>
            </nav>
          </div>
        </div>
      </aside>
      <main className="w-full h-full p-2">
      <Outlet/>
      </main>
    </div>
  )
}

export default Admin;
