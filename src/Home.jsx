import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaEye, FaEdit, FaTrashAlt, FaEyeSlash } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Home = () => {
    const [userData,setuserData]= useState([])
    const [showPassword, setShowPassword] = useState(false)

    const [inputUser, setinputUser]= useState({
        name:"",
        email:"",
        password:""
    })
    const handleChange=(e)=>{
        setinputUser({...inputUser, [e.target.name]:e.target.value})
    }
    const handleSubmit = async(e)=>{
    e.preventDefault();
    // console.log("input user",inputUser)
    const res= await axios.post("http://localhost:5000/createuser", inputUser)
    console.log(res);
   
    fetchalldata()
    setinputUser({ name: "", email: "", password: "" });
    }
 
const fetchalldata= async()=>{
    const res= await axios.get('http://localhost:5000/readallusers')
    console.log(res);
    setuserData(res.data);
}


useEffect(()=>{
    fetchalldata();
    
}, [])
const handleDelete= async(id)=>{
    const res= await axios.delete(`http://localhost:5000/deleteuser/${id}`)
   if(res.status===200)
   {
    fetchalldata()
   }
}
const togglePasswordVisibility = () => {
    setShowPassword(!showPassword); // Toggle password visibility
  };
  return (
    <div className="overflow-x-auto flex flex-col justify-center items-center">
        <header className='bg-gray-200 w-full text-center text-3xl p-4 font-bold text-red-400'>CRUD APP USING MERN</header>
         <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-lg w-full max-w-[80%] mt-5"
      >
        <h2 className="text-2xl font-semibold mb-6 text-gray-700">Create User</h2>

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
            required
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
          className="relative flex justify-end bottom-5 right-3 transform w-fit float-end -translate-y-1/2 cursor-pointer"
        >
          {showPassword ? <FaEyeSlash /> : <FaEye />} {/* Toggle between eye and eye-slash icon */}
        </span>
        </div>

        <button
          type="submit"
          className="w-fit font-semibold bg-blue-500 text-white py-2 px-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Create User
        </button>
      </form>
<div className='min-w-[80%] mt-9'>
    <h1 className='text-2xl font-semibold'>User Data</h1>
      <table className="min-w-full bg-white shadow-md rounded my-6 overflow-x-scroll">
        
        <thead>
          <tr>
            <th className="py-2 px-4 bg-gray-200 text-left">#</th>
            <th className="py-2 px-4 bg-gray-200 text-left">Name</th>
            <th className="py-2 px-4 bg-gray-200 text-left">Email</th>
            <th className="py-2 px-4 bg-gray-200 text-left">Password</th>
            <th className="py-2 px-4 bg-gray-200 text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          {userData.map((user, index) => (
            <tr key={user.id} className="border-b hover:bg-gray-100">
              <td className="py-2 px-4">{index + 1}</td>
              <td className="py-2 px-4">{user.name}</td>
              <td className="py-2 px-4">{user.email}</td>
              <td className="py-2 px-4">{user.password}</td>
              <td className="py-2 px-4 text-center flex justify-center gap-4">
               <Link to={`/readuser/${user._id}`}><FaEye className="text-blue-500 cursor-pointer" title="Read" tooltip='read' /></Link> 
               <Link to={`/updateuser/${user._id}`}><FaEdit className="text-yellow-500 cursor-pointer" title="Update" tooltip='update' /></Link>
                <FaTrashAlt onClick={()=>handleDelete(user._id)} className="text-red-500 cursor-pointer" title="Delete" tooltip='delete' />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  );
};

export default Home;
