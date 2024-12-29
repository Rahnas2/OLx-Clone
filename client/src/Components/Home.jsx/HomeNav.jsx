import LocationInp from "../Inputs/LocationInp"
import SearchInp from "../Inputs/SearchInp"

import { FaChevronDown } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa";
import { FiMessageCircle } from "react-icons/fi";
import { MdOutlineNotifications } from "react-icons/md";

import AuthModal from "../AuthModal";

import { useState } from "react";
import { Link } from "react-router-dom";
import { AuthUser } from "../../context/authContext";

function HomeNav() {
    const [open, setOpen] = useState(false)

    let {user} = AuthUser()

    return (
        <div className="bg-[#eff1f3] text-[#153a3e] flex px-1 sm:px-5 py-3 justify-between">

            <div className="cursor-pointer">
                <svg width="48px" height="48px" viewBox="0 0 1024 1024" data-aut-id="icon" class="" fill-rule="evenodd"><path class="rui-w4DG7" d="M661.333 256v512h-128v-512h128zM277.333 298.667c117.824 0 213.333 95.531 213.333 213.333s-95.509 213.333-213.333 213.333c-117.824 0-213.333-95.531-213.333-213.333s95.509-213.333 213.333-213.333zM794.496 384l37.504 37.504 37.504-37.504h90.496v90.496l-37.504 37.504 37.504 37.504v90.496h-90.496l-37.504-37.504-37.504 37.504h-90.496v-90.496l37.504-37.504-37.504-37.504v-90.496h90.496zM277.333 426.667c-47.061 0-85.333 38.293-85.333 85.333s38.272 85.333 85.333 85.333c47.061 0 85.333-38.293 85.333-85.333s-38.272-85.333-85.333-85.333z"></path></svg>
            </div>

            <div className="">
                <LocationInp location="India"/>
            </div>

            <div className="w-full max-w-2xl">
                <SearchInp />
            </div>

           {user?.userId ? 
           <div className="flex items-center gap-2 sm:gap-5 mr-2 sm:mr-5 [&>div]:cursor-pointer">
           <div className="flex">
               <span className="font-bold text-base mr-1">English</span>
               <FaChevronDown className="w-8 h-6 font-extralight cursor-pointer"  />
           </div>

           <div className="">
               <FiMessageCircle className="w-6 h-6" />
           </div>
           <div className="">
               <MdOutlineNotifications className="w-6 h-6" />
           </div>
           <div onClick={() => setOpen(true)} className="flex items-center cursor-pointer">
               <div className="flex items-center justify-center w-9 h-9 rounded-full mr-2 sm:mr-4 bg-blue-300">R</div>
               <FaChevronDown className="font-extralight" />  
           </div>
           <AuthModal status={false} type="login" open={open} onclose={() => setOpen(false)} />
           </div>
           :
           <div className="flex items-center">
           <div className="flex mr-3">
               <span className="font-bold text-base mr-2">English</span>
               <FaChevronDown className="w-8 h-6 font-extralight cursor-pointer"  />
           </div>
           <div onClick={() => setOpen(true)}  className="underline cursor-pointer">Log In</div>
           <AuthModal status={true} type="login" open={open} onclose={() => setOpen(false)} />
           </div>
           }
           
            <Link to="/sell"><div className="flex rounded-full bg-gradient-to-r from-[#ffce32] from-33% via-[#3a77ff] via-33% to-[#23e5db] to-33%">
            <div className="bg-white flex items-center py-1 px-4 m-1 sm:py-2 sm:px-6 sm:m-2 rounded-full">
            <FaPlus className="mr-1" />
            <span className="uppercase font-bold">Sell</span>
            </div>
            </div></Link>

        </div>
    )
}

export default HomeNav