import React, {  useState } from 'react'
import {  useNavigate ,Link} from 'react-router-dom';
import { addUser, getAllUsers } from '../data/userData';
import toast from 'react-hot-toast';

const SignUp = () => {
    const initialValue = {
        name: "",
        email: "",
        password: "",
        position:"",
    };
   
    const [inputdata,setInputData] = useState(initialValue)
    const navigate=useNavigate()
    const handleChange = (e) => {
        const { name, value } = e.target;
        setInputData({ ...inputdata, [name]: value });
    };
    // const handleSubmit = () => {
    //     addUser(inputdata);
    //     const users = getAllUsers();
    //     localStorage.setItem("allUser",JSON.stringify(users))
    //     // console.log('users', users);
    //     setInputData(initialValue);
    //     navigate('/login');
    //     toast.success("user is successfully signUp")
    // }
    const handleSubmit = () => {
        // Basic validation for required fields
        if (!inputdata.name || !inputdata.email || !inputdata.password || !inputdata.position) {
            // toast.error("All fields are required.");
            alert("All fields are required.")
            return;
        }

        addUser(inputdata);
        const users = getAllUsers();
        localStorage.setItem("allUser", JSON.stringify(users));
        setInputData(initialValue);
        navigate('/login');
        // toast.success("User is successfully signed up.");
        alert("User is successfully signed up.")
    };
    //  {console.log("allUser",allUser)}
    return (
        <div className='w-full h-screen  flex justify-center items-center'>
            <div className='w-[80%] mx-auto h-[60vh] space-y-3   flex  justify-center items-center flex-col '>
                <div className='md:w-[40%] mx-auto p-2 space-y-3 border-2 border-gray-400 rounded-md' >
                <h1 className='text-xl font-bold text-center text-gray-600'>CREATE AN ACCOUNT</h1>
                    <div className='space-y-3 '>
                        <input type="text" placeholder=' Name' className='p-2 w-full rounded-md bg-gray-200' onChange={(e) => handleChange(e)} name='name' required  value={inputdata.name}/>
                        <input type="text" placeholder=' Email' className='p-2 w-full rounded-md bg-gray-200' onChange={(e) => handleChange(e)} name='email' required  value={inputdata.email}/>
                        <input type="password" placeholder=' Password' className='p-2 w-full rounded-md bg-gray-200' onChange={(e) => handleChange(e)} name='password' required  value={inputdata.password}/>
                        <input type="text" placeholder='Position' className='p-2 w-full rounded-md bg-gray-200' onChange={(e) => handleChange(e)} name='position' required value={inputdata.position} />
                    </div>
                    <div className=''>
                        <button className='bg-gray-600 text-white w-full py-2 text-xl rounded-md ' onClick={handleSubmit}>Sign Up</button>
                    </div>     
                </div>
                <Link to={"/login"} className=''>
                    <button className=' text-blue-400 w-full py-2 text-xl rounded-md 'onClick={() => navigate('/login')}>Existing User? Log in</button>
                </Link>
            </div>
        </div>
    )
}

export default SignUp