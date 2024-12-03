import React, { useContext } from 'react'
import { TiHeartOutline } from 'react-icons/ti'
import { DATA } from '../../context/DataContext'
import { Link } from 'react-router-dom'
import { VscHeart, VscHeartFilled } from 'react-icons/vsc'
import { IoCloseSharp } from 'react-icons/io5'

function WishList() {
  const {dataFav,handleFavs}=useContext(DATA)
  return (
    <>
      <div className='pt-[150px]'>
        

        <div className='flex p-[40px] gap-[30px]'>
            {
                dataFav ? dataFav.map((item,i)=>{
                    return  <Link key={i} to={`/productbyid/${item.id}`}>
                              <div  className='my-[20px]  shadow-lg bg-white  relative flex cursor-pointer flex-col'>
                                  <div 
                                    className=' relative h-[100%] overflow-hidden group '>
                                    <img 
                                      className={` group-hover:hidden transition-opacity duration-300 ease-in-out `} 
                                      src={item.images[0]} alt="" 
                                    />
                                    <img 
                                    className={`hidden group-hover:block transition-opacity duration-300 ease-in-out`} 
                                    src={item.images[1]} alt="" 
                                    />
                                    {}
                                    <div  
                                      onClick={(e)=>{
                                        e.preventDefault() 
                                        handleFavs(item.id)
                                      }}
                                    >
                                        <IoCloseSharp className={`absolute text-[2em] top-[10px] right-[10px] `}/>
                                    </div>
                                    
                                    <div className={`${item.discount > 1 ? 'hidden' : 'block'}`}>
                                      <div 
                                      onClick={(e)=>{
                                        setShowQuick(true)
                                        setproid(item.id)
                                        e.preventDefault()
                                      }}
                                      className={ ` group-hover:bottom-0  -bottom-full transition-all duration-300 h-[30px]  text-center text-white absolute  w-[100%] bg-[rgba(19,19,19,0.7)]`}>
                                        QUICK VIEW
                                      </div>
                                    </div>
                                  </div>
                                  <div 
                                    className={`${item.discount > 1 ? 'block' : 'hidden'} bg-black text-white w-[40px] text-center rounded absolute top-0 left-0`}>
                                      {item.discount}% 
                                  </div>
                                  <div className='p-[10px]'>
                                      <p className='font-bold text-[1.1em] z-10'>{item.Brands.name}</p>
                                      <p className=' text-nowrap overflow-hidden font-[600] text-ellipsis text-gray-500'>{item.name}</p>
                                      <p className={`${item.discount > 1 ? 'block' : 'hidden'} text-green-700  font-bold`}>
                                          <del className='text-red-500'>{item.price}</del> 
                                          <span className='px-[10px]'>{((item.price*(100-item.discount))/100).toFixed(2)}$</span>
                                      </p>
                                      <p className={`${item.discount > 2 ? 'hidden' : 'block'} font-bold`}>
                                        {item.price}$
                                      </p>
                                  </div>
                              </div>
                            </Link>
                }) : 
                <div className={`${dataFav ? 'hidden' : 'block'} w-[100%]`}>
                    <TiHeartOutline className='text-[7em] text-center w-[100%] text-red-600' />
                    <p className='text-center text-red-600'>Your wishList is empty</p>
                </div>
            }
        </div>
      </div>
    </>
  )
} 

export default WishList
