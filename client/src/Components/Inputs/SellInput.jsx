

function SellInput({label, type, className, name, onchange}) {
    return (
        <div className='mb-4'>
            <label className="" htmlFor={label}>{label}</label><br />
            <input onChange={onchange} className={`border border-gray-500 rounded-sm w-full sm:w-[80%] md:w-[60%] px-3 py-4 mt-1 ${className}`} name={name} type={type} />
        </div>
    )
}

export default SellInput