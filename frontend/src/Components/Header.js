import React, { useContext, useState } from "react";
import Logo from "./Logo";
import { GrSearch } from "react-icons/gr";
import { FaRegUserCircle } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import summaryAPI from "../common";
import { toast } from "react-toastify";
import { setUserDetails } from "../store/userSlice";
import ROLE from "../common/role";
import Context from "../context";
import logo from "../assest/Ecommerce_Logo.png"

const Header = () => {
  const user = useSelector((state) => state?.user?.user);
  const dispatch = useDispatch();
  const context=useContext(Context)
  const navigate=useNavigate()

  // console.log("user header", user);
  const [menuDisplay, setmenuDisplay] = useState(false);
  const handleLogout = async () => {
    const fetchData = await fetch(summaryAPI.userLogout.url, {
      method: summaryAPI.userLogout.method,
      credentials: "include",
    });
    const userfetchData = await fetchData.json();
    // console.log("after logout",userfetchData)
    if (userfetchData.succes) {
      toast.success("Logout Succesfully");
      dispatch(setUserDetails(null));
    }
    if (userfetchData.error) {
      toast.error(userfetchData.message);
    }
  };
  const handleSearch=(e)=>{
    const{value}=e.target
    if(value)
      {
        navigate(`/search?q=${value}`)
      }
      else{
        navigate("/search")
      }


  }

  return (
    <header className="h-16 shadow-md bg-white">
      <div className="h-full container mx-auto flex items-center px-4 justify-between">
        <div className="py-4">
          <Link to={"/"}>
             <img src={logo} className="w-36 h-36 object-scale-down my-2 mix-blend-multiply" />
            {/* <Logo w={90} h={50} /> */}
          </Link>
        </div>
        <div className="hidden lg:flex items-center justify-between  max-w-sm w-full  ">
          <input
            type="text"
            placeholder="Search Item Here.."
            className="w-full h-8 outline-none pl-2 border rounded-l-full shadow-md"
            onChange={handleSearch}
          />
          <div className="text-lg bg-red-600 flex items-center justify-center h-8 w-10 rounded-r-full">
            <GrSearch />
          </div>
        </div>

        <div className="flex item-center gap-7">

        <div className=" group flex justify-center">
            {
              user?._id &&(
                <div
              className="text-3xl cursor-pointer "
              onClick={() => setmenuDisplay((preve) => !preve)}
            >
              {user?.profilepic ? (
                <img
                  src={user?.profilepic}
                  className="w-10 h-10 rounded-full"
                  alt={user?.name}
                />
              ) : (
                <FaRegUserCircle />
              )}
            </div>
              )
            }

            {menuDisplay && (
              <div
                className="absolute bottom-0 top-7 rounded-sm  hidden md:block h-fit p-4 "
                onClick={() => setmenuDisplay((preve) => !preve)}
              >
                <nav>
                  {user?.role === ROLE.ADMIN && (
                    <Link
                      to={"admin/products"}
                      className=" bg-white shadow-md hover:bg-slate-100 p-1 "
                    >
                      {" "}
                      Admin Panel{" "}
                    </Link>
                  )}
                </nav>
              </div>
            )}
          </div>


            {
              user?._id && (
          <Link to={"viewCart"} className="  text-2xl relative  top-1">
            <span>
              <FaShoppingCart />
            </span>
                      <div className="bg-red-600 text-white h-5 w-5 flex items-center rounded-full justify-center absolute -top-1 -right-2">
                    <p className="text-sm"> {context?.userCartCount}</p>
                  </div>
            
          </Link>
              )
            }

          

          <div className="relative">
            {user?._id ? (
              <button
                onClick={handleLogout}
                className="bg-red-600 text-black rounded-full px-2 py-1 hover:bg-red-700"
              >
                Logout
              </button>
            ) : (
              <Link
                to={"login"}
                className="bg-red-600 text-white rounded-full px-2 py-1 hover:bg-red-700"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
