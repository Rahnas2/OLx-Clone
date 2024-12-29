
import { AiOutlineClose } from "react-icons/ai";
import AuthInput from "./Inputs/AuthInput";
import { useState } from "react";
import { AuthUser } from "../context/authContext";

import { toast } from "react-toastify";

import validator from 'validator';


function AuthModal({ status, type, open, onclose }) {

    const [currType, setCurrType] = useState(type)

    const [username, setUserName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const {SignUp, SignIn, SignOut, user} = AuthUser()

    const handleChange = (e) => {
        const { name, value } = e.target
        if (name === 'username') return setUserName(value)

        if (name === 'email') return setEmail(value)

        if (name === 'password') return setPassword(value)

    }

    const handleSubmit = async () => {
        
        //validation
        if(validator.isEmpty(email)) return toast.warning('email is required')
        if(!validator.isEmail(email)) return toast.warning('invalid email')

        if(validator.isEmpty(password)) return toast.warning('passwork is required')    

        if(!validator.isLength(password.trim(),{min:7}) || !validator.matches(password,/[a-z]/) || !validator.matches(password, /[0-9]/) || !validator.matches(password, /[!@#$%^&*(),.?":{}|<>]/)){
            return toast.info('password length should be atleast 7 and contains atleast 1 char, 1 digit and 1 special char')
        }     

        const data = {
            username: username,
            email: email,
            password: password
        }

        if (currType === 'signup') {

            //validation
            if(username.trim().length < 4) return toast.warning('user name should be atleast 4 characters')

            try {
                await SignUp(data)
                toast.success('signup successfully')
                onclose()
            } catch (error) {
                toast.error(error)
            }
        } else {
            try {
                delete data.username
                await SignIn(data)
                toast.success('login successfully')
                onclose()
            } catch (error) {
                toast.error(error)
            }
        }
    }

    const handleLogout = async() =>{
            onclose()
            await SignOut()
            toast.success('signout successfully')
            

    }

    console.log(open)
    console.log(onclose)
    if (status) {
        return (
            <div className={`fixed inset-0 flex justify-center items-center ${open ? " pointer-events-auto z-10 bg-black bg-opacity-35" : "opacity-0 pointer-events-none"}`}>
                <div className="relative flex flex-col justify-center items-center shadow-lg max-w-lg w-full md:mx-0 pt-10 pb-8 px-4 bg-white text text-[#153a3e] text-base">
                    <div className="">
                        <h1 className="uppercase font-bold mb-5 text-lg ">{currType} to continue</h1>
                    </div>
                    {currType === 'signup' && <AuthInput onchange={handleChange} name="username" type="text" placeholder="please enter username" />}

                    <AuthInput onchange={handleChange} name="email" type="email" placeholder="please enter email" />

                    <AuthInput onchange={handleChange} name="password" type="password" placeholder="please enter passoword" />

                    <div onClick={handleSubmit} className="bg-[#153a3e] text-white px-5 py-1 rounded cursor-pointer">
                        {currType === 'login' ? <span>Login</span> : <span>Sign Up</span>}
                    </div>

                    <div className="font-extralight text-sm flex w-full justify-start mt-3 px-1">
                        {currType === 'login' ? <span>Dont you have account?<span onClick={() => setCurrType('signup')} className="font-bold hover:underline cursor-pointer">sign up</span></span>
                            :
                            <span>Already have a account? <span onClick={() => setCurrType('login')} className="font-bold hover:underline cursor-pointer">sign in</span></span>
                        }
                    </div>

                    <div onClick={onclose} className="absolute top-4 right-4 text-2xl cursor-pointer"><AiOutlineClose /></div>
                </div>

            </div>
        )
    }
    return (
        <div className={`relative inset-0 flex  ${open ? " pointer-events-auto z-10 bg-opacity-35" : "opacity-0 pointer-events-none"}`}>
            <div className="bg-white mx-auto fixed top-[10%] right-[14%] border rounded-t px-4 pt-5 pb-3 shadow-lg max-w-52 w-full">
                <h2 className="font-bold text-lg mb-5" ></h2>
                <div onClick={handleLogout} className="cursor-pointer px-3 py-2 hover:bg-teal-100">Log Out</div>
                <div onClick={onclose} className="absolute top-4 right-4 text-2xl cursor-pointer"><AiOutlineClose /></div>
            </div>
        </div>
    )
}

export default AuthModal