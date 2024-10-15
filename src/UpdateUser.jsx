import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import { Navigate, useNavigate, useParams } from 'react-router-dom'

function UpdateUser() {
    const [inputUser, setinputUser]= useState({
        name:"",
        email:"",
        password:""
    })
    const [showPassword, setShowPassword] = useState(false)
    const navigate =useNavigate()
    const {id}= useParams()
    const fetchsingledata= async()=>{
        const res= await axios.get(`http://localhost:5000/read/${id}`)
        console.log(res);
        setinputUser({
            name: res.data.name,
            email:res.data.email,
            password:res.data.password
        });
    }
    useEffect(()=>{
        fetchsingledata();
    }, [])
    const handleChange=(e)=>{
        setinputUser({...inputUser, [e.target.name]:e.target.value})
    }
    const handleSubmit = async(e)=>{
        e.preventDefault();
        // console.log("input user",inputUser)
        const res= await axios.put(`http://localhost:5000/updateuser/${id}`, inputUser)
        console.log(res);
        navigate('/')
    
    

        }
        const togglePasswordVisibility = () => {
            setShowPassword(!showPassword); // Toggle password visibility
          };
  return (
    <div className="overflow-x-auto flex flex-col justify-center items-center">
                 <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-lg w-full max-w-[80%]"
      >
        <h2 className="text-2xl font-semibold mb-6 text-gray-700">Update User</h2>

        <div className="mb-4">
          <label className="block text-gray-600 text-sm font-semibold mb-2" htmlFor="username">
            Full Name
          </label>
          <input
            type="text"
            id='name'
            name="name"
            value={inputUser.name}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your username"
            // required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-600 text-sm font-semibold mb-2" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={inputUser.email}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your email"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-600 text-sm font-semibold mb-2" htmlFor="password">
            Password
          </label>
          <input
          type={showPassword ? "text" : "password"}
            id="password"
            name="password"
            value={inputUser.password}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your password"
            required
          />
            <span
          onClick={togglePasswordVisibility}
          className="relative flex justify-end bottom-5 w-fit float-end right-3 transform -translate-y-1/2 cursor-pointer"
        >
          {showPassword ? <FaEyeSlash /> : <FaEye />} {/* Toggle between eye and eye-slash icon */}
        </span>
        </div>

        <button
          type="submit"
          className="w-fit bg-blue-500 text-white font-semibold py-2 px-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Update User
        </button>
      </form>
    </div>
  )
}

export default UpdateUser