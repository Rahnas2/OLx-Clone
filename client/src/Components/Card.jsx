

function Card({price, year, kilometers, brand, model, mobile_no, image}) {
    const imageUrl = `http://localhost:8080/${image}`;
    return (
        
            <div className="p-2 shadow-lg cursor-pointer transform duration-500  hover:scale-105 border rounded border-gray-400 w-80 h-72 sm:w-72 sm:h-64 lg:w-80 lg:h-72  mb-3">
                <div className="h-[65%] w-full"><img className="object-cover w-full h-full" src={imageUrl} alt="Christmas" /></div>
                <div>
                    <span className='font-extrabold'>₹ {price}</span>
                </div>
                <div>
                    <span className='font-light text-sm'>{year} - {kilometers}</span>
                </div>
                <div>
                    <span className='font-light text-sm'>{brand} - {model}</span>
                </div>
                <div>
                    <span className='font-medium text-sm'>{mobile_no}</span>
                </div>
            </div>
    )
}

export default Card