import React, { useState } from "react";
import { FaArrowLeft, FaCheck } from "react-icons/fa";
import { MdOutlineLogout } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";

function AccountInfo() {
    const [image, setImage] = useState(null);
    const navigate = useNavigate()
    const [error, setError] = useState(null);
    const [LastPassword,setLastPassword]=useState(null)
    const [newPassword, setNewPassword] = useState(null)
    const savedData = JSON.parse(localStorage.getItem('registerData'));
    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => setImage(reader.result);
            reader.readAsDataURL(file);
        }
    }
    function handleLogout() {
        localStorage.clear()
        navigate('/')
    }
    function handleNewPassword(newp) {
        setNewPassword(newp)
        if (newp.trim().length < 6) {
            setError("Password must be at least 6 characters");
        } else {
            setError(null)
        }
    }
    function handlePasswordChange() {
        if (newPassword.trim().length >= 6) {
            setLastPassword(newPassword)
            savedData.password = newPassword;
            localStorage.setItem('registerData', JSON.stringify(savedData));
            alert("Password updated successfully!");
        }
    };

    return (
        <>
            <Link to={'/cabinet'}
                className={`flex items-center pb-[10px] text-gray-500 hover:text-black px-[50px] bp800:px-[20px] pt-[150px]`}><FaArrowLeft />My Cabinet</Link>

            <div className=" mx-[auto] bp600:flex-row flex justify-between font-montserrat gap-[20px] pt-[20px] items-center bp600:items-start bp900:w-[90%] w-[97%]  rounded-md">

                <div className="md:flex mx-[auto] justify-between gap-[30px]">

                    <div className="bp800:flex justify-center gap-[50px]">
                        <div className="flex flex-col justify-center  items-center ">
                            <label
                                htmlFor="photoInput"
                                className="w-[200px] mx-[auto] h-[200px] rounded-full border-2  border-gray-300 flex items-center justify-center cursor-pointer overflow-hidden bg-gray-100"
                            >
                                {image ? (
                                    <img src={image} alt="Profile" className="w-full h-full object-cover" />
                                ) : (
                                    <span className="text-gray-400 text-2xl">+</span>
                                )}
                            </label>
                            <input
                                id="photoInput"
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={handleImageChange}
                            />
                        </div>
                        <div className="grid bp600:grid-cols-2 w-[100%]  gap-[20px]">
                            <div>
                                <p>Name</p>
                                <div className="mb-2  mx-[auto] bp600:w-[270px] text-gray-600 px-4 py-2 border ">
                                    {savedData?.name}
                                </div>
                                <p>Lastname</p>
                                <div className="mb-2  mx-[auto] bp600:w-[270px] text-gray-600 px-4 py-2 border ">
                                    {savedData?.lastname}
                                </div>
                                Password
                                <div className="mb-2  mx-[auto] bp600:w-[270px] text-gray-600 px-4 py-2 border ">
                                    {LastPassword ? LastPassword :  savedData?.password}
                                </div>
                            </div>
                            <div>
                                <p>Email</p>
                                <div className="mb-2  mx-[auto] bp600:w-[270px] overflow-hidden truncate text-gray-600 px-4 py-2 border ">
                                    {savedData?.email}
                                </div>
                                <p>Number</p>
                                <div className="mb-2  mx-[auto] bp600:w-[270px] text-gray-600 px-4 py-2 border ">
                                    {savedData?.number}
                                </div>
                                Change Password:
                                <div className="relative">
                                    <div className='flex  mb-2  mx-[auto] bp600:w-[270px] text-gray-600 px-4 py-2 border'>
                                        <input
                                            required
                                            type='text'
                                            className='w-[100%] focus:outline-none' placeholder='Password'
                                            onChange={(e) => {
                                                handleNewPassword(e.target.value)
                                            }}
                                        />

                                    </div>
                                    {error && <p className="text-[.7em] text-red-600">Password must be at least 6 characters</p>}

                                    <FaCheck
                                        onClick={() => { if (!error) handlePasswordChange(); }}  // This ensures the function is called
                                        className={`absolute top-[8px] right-[20px] ${error ? 'text-gray-400' : 'text-black'}`}
                                    />
                                </div>
                                <div
                                    onClick={() => { handleLogout() }}
                                    className=' flex justify-end bp500:px-[20px] cursor-pointer'>

                                    <MdOutlineLogout className='text-[1.5em] ' />
                                    <p className='hidden bp900:block'>Log out</p>
                                </div>
                            </div>

                        </div>
                    </div>

                </div>

            </div>
        </>
    );
};

export default AccountInfo;
