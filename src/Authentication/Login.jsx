import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate()
    const initialValue = {
        email: '',
        password: '',
    }
    const [inputData, setInputData] = useState(initialValue)
    const handleChange = (e) => {
        const { name, value } = e.target;
        setInputData({ ...inputData, [name]: value });
    };
    const handleSubmit = () => {
        const loggedUser = JSON.parse(localStorage.getItem("allUser")) || []
        const a = loggedUser.find((data) => {
            console.log("p2data", data);
            return inputData.email === data.email;
        })

        console.log('a', a);
        if (a) {
            if (inputData.password === a.password) {
                // console.log('user is successfully login')
                localStorage.setItem("user", JSON.stringify(a));
                navigate("/todo")
                localStorage.setItem("loggedin", true)
                toast.success("user is successfully login")
            } else {
                alert("Wrong Password")
                // toast("Wrong Password")
                // toast.error("Wrong Password");
            }
        } else {
            alert("User doesn't exist")
            // toast("User doesn't exist")
          
            // toast.error("User doesn't exist");
        }
    }

    return (
        <div className='w-full h-screen  flex justify-center items-center'>
            <div className='w-[80%] mx-auto h-[60vh] space-y-3   flex  justify-center items-center flex-col '>
                <div className='md:w-[40%] mx-auto p-2 space-y-3 border-2 border-gray-400 rounded-md' >
                    <h1 className='text-xl font-bold text-center text-gray-600'>LOGIN</h1>
                    <div className='space-y-3 '>
                        <input type="text" placeholder=' Email' className='p-2 w-full rounded-md bg-gray-200' onChange={(e) => handleChange(e)} name='email' required value={inputData.email} />
                        <input type="password" placeholder=' Password' className='p-2 w-full rounded-md bg-gray-200' onChange={(e) => handleChange(e)} name='password' required value={inputData.password} />
                    </div>
                    <div className=''>
                        <button className='bg-gray-600 text-white w-full py-2 text-xl rounded-md ' onClick={handleSubmit}>Log In</button>
                    </div>
                </div>
                <div className=''>
                    <button className=' text-blue-400 w-full py-2 text-lg rounded-md ' onClick={() => navigate('/')}>New to User? Create an account</button>
                </div>
            </div>
        </div>
    )
}

export default Login