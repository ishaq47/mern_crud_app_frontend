import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

function ReadUsers() {
    const [userData, setUserData] = useState([]);
    const {id}= useParams()
    const fetchsingledata= async()=>{
        const res= await axios.get(`http://localhost:5000/read/${id}`)
        console.log(res);
        setUserData(res.data);
    }
    useEffect(()=>{
        fetchsingledata();
    }, [])
  return (
    <div className="overflow-x-auto flex flex-col justify-center items-center">
 
<div className='min-w-[80%] mt-9'>
<h1 className='text-2xl font-semibold'>User Data</h1>
 <table className="min-w-full bg-white shadow-md rounded my-6">
   
   <thead>
     <tr>
       <th className="py-2 px-4 bg-gray-200 text-left">#</th>
       <th className="py-2 px-4 bg-gray-200 text-left">Name</th>
       <th className="py-2 px-4 bg-gray-200 text-left">Email</th>
       <th className="py-2 px-4 bg-gray-200 text-left">Password</th>
      
     </tr>
   </thead>
   <tbody>
       <tr  className="border-b hover:bg-gray-100">
         <td className="py-2 px-4">1</td>
         <td className="py-2 px-4">{userData.name}</td>
         <td className="py-2 px-4">{userData.email}</td>
         <td className="py-2 px-4">{userData.password}</td>
       </tr>
   </tbody>
 </table>
 </div>
</div>
  )
}

export default ReadUsers