
import axios from 'axios'


import { useState, useEffect, createContext, useContext } from 'react'

const SERVER_API = import.meta.env.VITE_DB_API



const AuthContext = createContext()

export function AuthContextProvider({ children }) {

    const [user, setUser] = useState({})

    useEffect(() => {
        const token = localStorage.getItem('token') 
        if (token) {
            console.log('user, ', user)
            axios.get(`${SERVER_API}/api/verify-token`, {
                headers: { Authorization: `Bearer ${token}` },
            })
                .then(response => {
                    const userInfo = {
                        userId: response.data.user.userId,
                        email: response.data.user.email
                    }
                    setUser(userInfo)
                })
                .catch(error => {
                    setUser({})
                    localStorage.removeItem('token')
                })
        }
    },[])

    console.log('user last',user)

    const SignUp = async (userData) => {
        try {
            const response = await axios.post('http://localhost:8080/api/signup', userData)
            console.log(response)
            const userInfo = {
                userId: response.data.user._id,
                email: response.data.user.email
            }

            setUser(userInfo)
            localStorage.setItem('token', response.data.token)
            return response
        } catch (error) {
            console.log('error ',error)
            if (error.response && error.response.data) {
                throw error.response.data.msg
            } else {
                throw 'something went wrong, please try again'
            }
        }

    }

    const SignIn = async (credential) => {
        try {
            const response = await axios.post('http://localhost:8080/api/login', credential)
            const userInfo = {
                userId: response.data.user._id,
                email: response.data.user.email
            }
            setUser(userInfo)
            console.log(user)
            console.log(response.data)
            localStorage.setItem('token', response.data.token)
            return response
        } catch (error) {
            if (error.response && error.response.data) {
                console.log('error', error)
                throw error.response.data.msg
            } else {
                throw 'something went wrong, please try again'
            }
        }
    }

    const SellProduct = async(productDetails) =>{
        try {
            const token = localStorage.getItem('token')
            return await axios.post('http://localhost:8080/api/products', productDetails, {
                headers:{
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            })
        } catch (error) {
            console.log('error',error)
        }
    }

    const getProducts = async() =>{
        try {
            const response = await axios.get('http://localhost:8080/api/products') 
            console.log('respnse', response)
            return response
        } catch (error) {
            console.log('error',error)
        }
        
    }

    const SignOut = () => {
        setUser({})
        localStorage.removeItem('token')
    }

    return (
        <AuthContext.Provider value={{ user, SignUp, SignIn, SignOut, SellProduct, getProducts}}>
            {children}
        </AuthContext.Provider>
    )
}

export function AuthUser() {
    return useContext(AuthContext)
}


