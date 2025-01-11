import React, { useContext } from 'react'
import { DATA } from '../../context/DataContext'
import { Link } from 'react-router-dom'
import { IoCloseSharp } from 'react-icons/io5'
import { PiHeartLight } from 'react-icons/pi'

function WishList() {

  const { dataFav, handleFavs, setShowQuick } = useContext(DATA)


  return (
    <>
      <div className='pt-[150px] px-[10px]'>
        <p className='p-[10px] bp600:px-[40px] font-cormorant text-[2em]'>Wishlist</p>
        <div className='flex flex-wrap justify-center  bp600:p-[40px] gap-[30px]'>
          <div className={`${dataFav.length > 0 ? 'hidden' : 'block'} w-[100%]`}>
            <PiHeartLight className='text-[4em] text-center w-[100%] ' />
            <p className='text-center font-cormorant text-[1.5em]'>Your wishlist is empty</p>
          </div>
          <div className={`flex w-[100%] flex-wrap gap-[10px] bp600:gap-[20px] ${dataFav?.length>4 ? 'justify-around' : 'justify-normal'} `}>
            {
              dataFav && dataFav.map((item, i) => {
                return <Link key={i} className='w-[45%]  md:w-[200px]' to={`/details/${item.name.replace(/ /g, '-')}-${item.id}`}>
                  <div className='my-[20px]  w-[100%] shadow-lg bg-white  relative flex cursor-pointer flex-col'>
                    <div
                      className=' relative h-[100%] overflow-hidden group '>
                      <img
                        className={` group-hover:hidden transition-opacity duration-300 ease-in-out `}
                        src={item.images?.[0]} alt=""
                      />
                      <img
                        className={`hidden group-hover:block transition-opacity duration-300 ease-in-out`}
                        src={item.images?.[1]} alt=""
                      />
                      { }
                      <div
                        onClick={(e) => {
                          e.preventDefault()
                          handleFavs(item.id)
                        }}
                      >
                        <IoCloseSharp className={`absolute text-[2em] top-[10px] right-[10px] `} />
                      </div>

                      <div className={`${item.discount > 1 ? 'hidden' : 'block'}`}>
                        <div
                          onClick={(e) => {
                            setShowQuick(true)
                            setproid(item.id)
                            e.preventDefault()
                          }}
                          className={` group-hover:bottom-0  -bottom-full transition-all duration-300 h-[30px]  text-center text-white absolute  w-[100%] bg-[rgba(19,19,19,0.7)]`}>
                          QUICK VIEW
                        </div>
                      </div>
                    </div>
                    <div
                      className={`${item.discount > 1 ? 'block' : 'hidden'} bg-black text-white w-[40px] text-center rounded absolute top-0 left-0`}>
                      {item.discount}%
                    </div>
                    <div className='p-[10px]'>
                      <p className='font-bold text-[1.1em] z-10'>{item?.Brands?.name}</p>
                      <p className=' text-nowrap overflow-hidden font-[600] text-ellipsis text-gray-500'>{item.name}</p>
                      <p className={`${item.discount > 1 ? 'block' : 'hidden'} text-green-700  font-bold`}>
                        <del className='text-red-500'>{item.price}</del>
                        <span className='px-[10px]'>{((item.price * (100 - item.discount)) / 100).toFixed(2)}$</span>
                      </p>
                      <p className={`${item.discount > 2 ? 'hidden' : 'block'} font-bold`}>
                        {item.price}$
                      </p>
                    </div>
                  </div>
                </Link>
              })

            }
          </div>
        </div>
      </div>
    </>
  )
}

export default WishList
