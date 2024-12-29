import { FaC, FaChevronDown } from "react-icons/fa6";

function HomeNav2() {
  return (
    <div className="flex my-1 border pt-2 pb-3 pl-1 sm:pl-10 md:pl-36 shadow-[0_1px_1px_0.5px_rgba(0,0,0,0.1)] [&>div]:cursor-pointer">
        <div className="flex items-center font-medium sm:font-semibold text-sm gap-1 sm:gap-3 mr-6 sm:uppercase">All Categories 
            <FaChevronDown />
        </div>
        <div className="flex justify-between gap-2 sm:gap-4 text-sm items-center">
        <div>Cars</div>
        <div>Motorcycles</div>
        <div>Mobile Phones</div>
        <div>For Sale: Houses & Apartments</div>
        <div>Scooters</div>
        <div>Commercial & Other Vehicles</div>
        <div>For Rent: Houses & Apartments</div>
        </div>
    </div>
  )
}

export default HomeNav2