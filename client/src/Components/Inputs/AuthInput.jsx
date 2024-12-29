
import React from 'react'

function AuthInput({type, name, placeholder, onchange}) {
    return (
        <div className="w-full mb-5">
            <input onChange={onchange} className="outline-none w-full border border-gray-300 bg-[#eff1f3] focus:border-2 focus:border-blue-400 py-4 px-4 placeholder-[#153a3e]" name={name} type={type} placeholder={placeholder} />
        </div>
    )
}

export default AuthInput