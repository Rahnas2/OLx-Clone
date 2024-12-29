
import { FiArrowLeft } from "react-icons/fi";
import { AiOutlineClose } from "react-icons/ai";

import SellInput from "../Components/Inputs/SellInput";
import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";

import validator from 'validator'
import { toast } from "react-toastify";
import { AuthUser } from "../context/authContext";


function Sell() {

    const {SellProduct} = AuthUser()
    
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        category: '',
        brand: '',
        model: '',
        year: '',
        kilometers: '',
        no_owners: '',
        discription: '',
        price: '',
        mobile_no: '',
        image: null
    })

    const handleChange = (e) =>{
        const {name, value} = e.target
        setFormData(prev =>({
            ...prev, [name]: value
        }))
    }
    
    const handleFileChange = (e) =>{
        const file = e.target.files[0]
        setFormData(prev => ({ ...prev, image:file }))
    }

    const removeFile = (i) => {
        setFormData(prev => ({ ...prev, image: null}))
    }

    const handleSubmit = async () =>{
        const { category, brand, model,year, kilometers, no_owners, discription, price, mobile_no, image} = formData

        //validation

        if(validator.isEmpty(category,{ignore_whitespace: true})) return toast.warning('category is required')

        if(validator.isEmpty(brand,{ignore_whitespace: true})) return toast.warning('brand is reqired')

        if(validator.isEmpty(model,{ignore_whitespace: true})) return toast.warning(' model is reqired')

        if(!validator.isNumeric(year) || parseInt(year) < 1000 || parseInt(year) > 2025) return toast.warning('invalid year')

        if(!validator.isNumeric(kilometers) || parseInt(kilometers) < 0) return toast.warning('invalid KM')

        if(!validator.isInt(no_owners) || parseFloat(no_owners) < 0) return toast.warning('invalid owners number')

        if(validator.isEmpty(discription,{ignore_whitespace: true})) return toast.warning(' discription is reqired')

        if(!validator.isNumeric(price) || parseInt(price) < 0) return toast.warning('invalid price')

        if(!validator.isInt(mobile_no) || !validator.isLength(mobile_no,{min:10,max:10})) return toast.warning('invalid mobile no')

        if(!image)  return toast.warning('image is required')  

        const validImageTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/avif'];
        if (!validImageTypes.includes(image.type)) {
          return toast.warning('Invalid image format');
        }

        //validation end    

        try {
            await SellProduct(formData)
            toast.success('product added successfully')
            navigate('/')
        } catch (error) {
            console.log('error',error)
            toast.error('something went wrong')
        }
    }

    return (
        <div className="text-[#153a3e]">
            <nav className="bg-[#eff1f3] px-7 py-5 border shadow-sm">
                <Link to="/"><span className="text-2xl"><FiArrowLeft /></span></Link>
            </nav>
            <section className="w sm:w-[50%] flex justify-self-center flex-col mb-12">
                <h1 className="font-semibold uppercase text-xl my-3 text-center">Sell Your Product</h1>
                <div className="border px-5 py-3 rounded-sm">
                    <h1 className="font-semibold uppercase ">Include some details</h1>

                    <div className="mt-2 mb-4">
                        <label htmlFor="catogory">Choose Category</label> <br />

                        <select onChange={handleChange} className="border border-gray-500 rounded-sm w-full sm:w-[80%] md:w-[60%] px-5 py-4 mt-1 " name="category" id="category">
                            <option value=""></option>
                            <option value="car">Car</option>
                            <option value="bike">Bike</option>
                            <option value="truck">Truck</option>
                        </select>

                    </div>

                    <SellInput onchange={handleChange} label="brand" name='brand' type="text" />

                    <SellInput onchange={handleChange}  label="model" name='model' type="text" />

                    <SellInput onchange={handleChange}  label="year" name='year' type="number" />

                    <SellInput onchange={handleChange} label="kilometers" name='kilometers' type="number" />

                    <SellInput onchange={handleChange} label="no_owners" name='no_owners' type="number" />

                    <div className="mb-2">Discription</div>
                    <textarea onChange={handleChange} className="border border-gray-500 rounded-sm w-full sm:w-[80%] md:w-[60%] h-32 px-3 py-3" name="discription" id=""></textarea>

                    <SellInput onchange={handleChange} label="price" name='price' type="number" />

                    <SellInput onchange={handleChange} label="mobile_no" name='mobile_no' type="number" />

                    <div className="my-4">
                        <div className="font-semibold">Upload Image</div>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            className="mt-2"
                        />
                        {formData.image && (
                            <div className="relative mt-3">
                                <img
                                    src={URL.createObjectURL(formData.image)}
                                    alt="Uploaded"
                                    className="w-24 h-24 object-cover border rounded"
                                />
                                {/* <button
                                    onClick={removeFile}
                                    className="absolute top-1 right-50 bg-[#153a3e] text-white text-xs rounded-full px-2 py-1"
                                >
                                    X
                                </button> */}
                                <div onClick={removeFile}
                                    className="absolute top-1 right-50 bg-[#153a3e] text-white text-xs rounded-full px-2 py-1"><AiOutlineClose /></div>
                            </div>
                        )}
                    </div>


                    <div  className="mb-5 mt-5">
                        <span onClick={handleSubmit} className="px-4 py-3 rounded cursor-pointer bg-[hsl(186,49%,16%)] hover:bg-[hsl(186,49%,26%)] text-white">Submit</span>
                    </div>

                </div>
            </section>
        </div>
    )
}

export default Sell