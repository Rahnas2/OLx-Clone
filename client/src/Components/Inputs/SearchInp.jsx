import { IoIosSearch } from "react-icons/io";

function SearchInp() {
    return (
        <div className="flex">
            <input className="outline-none hidden md:inline-block py-3 px-3 font-medium placeholder-current border-2 border-current rounded focus:border-2 focus:border-blue-400 w-[90%]"
                type="search"
                placeholder="Search"
            />
            <button className="bg-[#153a3e] text-white hidden sm:inline-block  px-3  rounded-r ml-[-3px]">
                <IoIosSearch className="w-8 h-5" />
            </button>
        </div>
    )
}

export default SearchInp