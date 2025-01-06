import React, { useState } from 'react'
import { TbPhotoEdit } from 'react-icons/tb';

function Cabinet() {
    const [image, setImage] = useState(null);

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => setImage(reader.result);
            reader.readAsDataURL(file);
        }
    };
    return (
        <>
            <div className='pt-[150px] w-[100%] flex justify-center '>
                <div className='flex flex-col bp600:flex-row w-[90%] items-center bp600:items-start bp600:w-[80%]  pt-[20px] bg-blue-100  rounded-md'>
                    <div className="flex w-[100%] relative bp600:w-[40%] flex-col items-center">
                        <label
                            htmlFor="photoInput"
                            className="w-[200px] h-[200px] rounded-full border-2  border-gray-300 flex items-center justify-center  overflow-hidden bg-gradient-to-tr from-blue-200  to-blue-500"
                        >
                            <span
                                className="text-gray-900 bg-white p-[5px] rounded-full text-2xl cursor-pointer z-40 absolute top-[60%] left-[70%]"><TbPhotoEdit /></span>
                            {image ? (
                                <img src={image} className="w-full h-full object-cover" />
                            ) : ''}
                        </label>
                        <input
                        onChange={handleImageChange }
                            id="photoInput"
                            type="file"
                            accept="image/*"
                            className="hidden"
                        />
                    </div>
                    {/* TEXT  DIV */}
                    <div>
                        <p className=' font-bold'>FIRST NAME</p>
                        <input
                            type="text" className='border-[1px] border-gray-400 rounded p-[3px]  w-[95%]' placeholder='First Name' />

                        <p className=' font-bold'>LAST NAME</p>
                        <input
                            type="text" className='border-[1px] border-gray-400 rounded p-[3px]  w-[95%]' placeholder='Last Name' />
                        <p className=' font-bold'>PASSWORD</p>
                        <input
                            type="text" className='border-[1px] border-gray-400 rounded p-[3px]  w-[95%]' placeholder='Last Name' />

                    </div>
                </div>
            </div>
        </>
    )
}

export default Cabinet
