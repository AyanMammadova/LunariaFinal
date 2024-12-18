import React, { useState } from 'react';

const ImageWithLoader = () => {
    const [loading, setLoading] = useState(true);

    console.log(loading)
    const handleImageLoad = () => {
        setLoading(false);

    };

    return (
        <div className="relative pt-[150px] h-[500px]">
          
                {/* <div className="absolute inset-0 flex items-center justify-center"> */}
                    <div className="w-8 h-8 border-4 border-gray-300 border-t-black rounded-full animate-spin"></div>
                {/* </div> */}
        </div>
    );
};

export default ImageWithLoader;
