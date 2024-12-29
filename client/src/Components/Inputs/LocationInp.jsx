import { IoIosSearch  } from "react-icons/io";
import { FaChevronDown } from "react-icons/fa6";

function LocationInp({location}) {
  return (
    <div className="relative hidden sm:block">
        <IoIosSearch className="absolute top-1/4 left-3 w-6 h-6 font-semibold"/>
        <input className="outline-none pl-12 py-3 font-medium placeholder-current border-2 border-current focus:border-2 focus:border-blue-400 rounded min-w-64" type="text" placeholder={location}/>
        <FaChevronDown className="absolute top-1/4 right-5 w-8 h-6 font-extralight cursor-pointer"  />
    </div>
  )
}

export default LocationInp