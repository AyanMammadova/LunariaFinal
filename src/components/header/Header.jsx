import React, { useContext, useState } from 'react'
import { DATA } from '../../context/DataContext'
import { IoCloseSharp, IoMenu, IoPersonOutline } from 'react-icons/io5'
import { GoHeart } from 'react-icons/go'
import { BsBag } from 'react-icons/bs'
import { MdOutlineSearch } from 'react-icons/md'
import CategorySlide from '../offcanvas/CategorySlide'
import {NavLink } from 'react-router-dom'

function Header() {
  const [showCategorySlide,setShowCategorySlide]=useState(false)
  const {dataCategory}=useContext(DATA)
  const {imgsformenu}=useContext(DATA)
  return (  
    <>
      <header className=' fixed w-[100%] bg-white z-50'>

        <section className=' w-[100%] z-50 bg-white  p-[10px] bp1200:p-[30px]'>
          <div className='flex w-[100%] justify-between'>
            <div className='w-[45%]'>
              <ul className='flex bp1200:hidden text-[1.6em]'>
                <li className='cursor-pointer' onClick={()=>{setShowCategorySlide(!showCategorySlide)}}>
                  {
                    showCategorySlide ?  <IoCloseSharp />: <IoMenu />
                  }
                </li>
                <li>
                  <MdOutlineSearch />
                </li>
              </ul>
              <ul className='bp1200:flex hidden'>
              {
                  dataCategory && dataCategory.map((item,i)=>{
                  return <div key={i} className='cathead'>
                          <NavLink to={`/productsbycategory/${item.name}/${item.id}`}  className='hover:bg-[#E4E4E4] py-[5px] rounded px-[10px]  text-[1.1em] cursor-pointer' >
                            {item.name}
                          </NavLink>
                          <div className='bg-white absolute p-[40px] left-0 w-screen hidden justify-between catim shadow-[0_10px_10px_0_rgba(0,0,0,0.3)]'>
                                <div>
                                  <ul className='flex flex-col gap-[5px]'>
                                      {
                                      item.Subcategory.map((item,i)=>{
                                          return <NavLink key={i} to={'/'} className="relative w-max mx-[10px] cursor-pointer group">
                                                  <span className=''>{item.name}</span>
                                                  <span className="absolute  -bottom-1 left-1/2 w-0 transition-all h-[1px] bg-black group-hover:w-3/6"></span>
                                                  <span className="absolute -bottom-1 right-1/2 w-0 transition-all h-[1px] bg-black group-hover:w-3/6"></span>
                                                </NavLink>
                                        })
                                      }
                                  </ul>
                                </div>
                                <div>
                                  <img src={imgsformenu[i]} alt="imgforthatcategory" />
                                </div>
            
                           </div>
                        </div>
                  })
              }
              </ul>
            </div>

            <div>
              <img src="/img/logo.png" alt="Lunaria.logo" />
            </div>

            <div className='text-[1.6em] w-[43%] justify-end flex gap-[10px]'>
              <IoPersonOutline  className='hidden bp1200:block'/>
              <GoHeart />
              <BsBag />
            </div>
          </div>
        </section>
        
        <section className='hidden bp1200:flex  justify-end z-50 pr-[40px]  pb-[20px]'>
          <div className='bg-white flex justify-between items-center py-[5px] w-[200px] border-[1px] border-gray-300'>
            <input type="text" className='w-[100px] h-[30px] text-gray-200 px-[10px]' placeholder='Search' />
            <MdOutlineSearch  className='text-[1.3em] text-gray-600'/>
          </div>
        </section>

        <div className={`${showCategorySlide ? 'block' : 'hidden'}  bp1200:hidden`}>
          <CategorySlide/>
        </div>
      </header>
    </>
  )
}

export default Header
