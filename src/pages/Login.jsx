import React, { useState } from 'react'
import { FaRegEyeSlash } from "react-icons/fa6";
import { FaRegEye } from "react-icons/fa6";
import toast from 'react-hot-toast';
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import AxiosToastError from '../utils/AxiosToastError';
import { Link, useNavigate } from 'react-router-dom';
import fetchUserDetails from '../utils/fetchUserDetails';
import { useDispatch } from 'react-redux';
import { setUserDetails, SET_TOKEN } from '../store/userSlice';

const Login = () => {
    const [data, setData] = useState({
        phone: "",
        password: "",
        userType: "user"
    })
    const [showPassword, setShowPassword] = useState(false)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleChange = (e) => {
        const { name, value } = e.target

        setData((preve) => {
            return {
                ...preve,
                [name]: value
            }
        })
    }

    const valideValue = Object.values(data).every(el => el)


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await Axios({
                ...SummaryApi.login,
                data: data,
            });
            if (response.data.error) {
                toast.error(response.data.message);
                return;
            }
            toast.success("Login successful");
            const token = response.data.token;
            localStorage.setItem("token", token);
            dispatch(SET_TOKEN(token));
            const userData = {
                _id: response.data.data.userId || "",
                name: response.data.data.name || "",
                email: response.data.data.email || "",
                avatar: response.data.data.avatar || "",
                mobile: response.data.user || "",
                verify_email: response.data.data.verify_email || false,
                last_login_date: response.data.data.last_login_date || null,
                status: response.data.data.status || "",
                address_details: response.data.data.address_details || [],
                shopping_cart: response.data.data.shopping_cart || [],
                orderHistory: response.data.data.orderHistory || [],
                role: response.data.data.userType || "",
            };
            localStorage.setItem("userInfo", JSON.stringify(userData));
            localStorage.setItem("userId", userData?._id);
            dispatch(setUserDetails(userData));
            setData({ phone: "", password: "" });
            navigate("/");
        } catch (error) {
            AxiosToastError(error);
        }
    };


    return (
        <section className='w-full container mx-auto px-2'>
            <div className='bg-white my-4 w-full max-w-lg mx-auto rounded p-7'>

                <form className='grid gap-4 py-4' onSubmit={handleSubmit}>
                    <div className='grid gap-1'>
                        <label htmlFor='phone'>Mobile Number :</label>
                        <input
                            type='phone'
                            id='phone'
                            className='bg-blue-50 p-2 border rounded outline-none focus:border-primary-200'
                            name='phone'
                            value={data.phone}
                            onChange={handleChange}
                            placeholder='Enter your Mobile Number'
                        />
                    </div>
                    <div className='grid gap-1'>
                        <label htmlFor='password'>Password :</label>
                        <div className='bg-blue-50 p-2 border rounded flex items-center focus-within:border-primary-200'>
                            <input
                                type={showPassword ? "text" : "password"}
                                id='password'
                                className='w-full outline-none'
                                name='password'
                                value={data.password}
                                onChange={handleChange}
                                placeholder='Enter your password'
                            />
                            <div onClick={() => setShowPassword(preve => !preve)} className='cursor-pointer'>
                                {
                                    showPassword ? (
                                        <FaRegEye />
                                    ) : (
                                        <FaRegEyeSlash />
                                    )
                                }
                            </div>
                        </div>
                        <Link to={"/forgot-password"} className='block ml-auto hover:text-primary-200'>Forgot password ?</Link>
                    </div>

                    <button disabled={!valideValue} className={` ${valideValue ? "bg-green-800 hover:bg-green-700" : "bg-gray-500"}    text-white py-2 rounded font-semibold my-3 tracking-wide`}>Login</button>

                </form>

                <p>
                    Don't have account? <Link to={"/register"} className='font-semibold text-green-700 hover:text-green-800'>Register</Link>
                </p>
            </div>
        </section>
    )
}

export default Login

