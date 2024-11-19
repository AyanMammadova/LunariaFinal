import React, { useContext, useState } from 'react'
import { DATA } from '../../context/DataContext'
import { IoCloseSharp, IoMenu, IoPersonOutline } from 'react-icons/io5'
import { GoHeart } from 'react-icons/go'
import { BsBag } from 'react-icons/bs'
import { MdOutlineSearch } from 'react-icons/md'

function Header() {
  const [showOffCanvas,setShowOffCanvas]=useState(false)
  const {dataCategory}=useContext(DATA)
  const {imgsformenu}=useContext(DATA)
  return (
    <>
      <header>
        {/* headersection1 */}
        <section className='p-[10px] bp1200:p-[30px]'>
          <div className='flex w-[100%] justify-between'>
            <div className='w-[45%]'>
              <ul className='flex bp1200:hidden text-[1.6em]'>
                <li onClick={()=>{setShowOffCanvas(!showOffCanvas)}}>
                  {
                    showOffCanvas ?  <IoCloseSharp />: <IoMenu />
                  }
                </li>
                <li>
                  <MdOutlineSearch />
                </li>
              </ul>
              <ul className='bp1200:flex hidden'>
              {
                  dataCategory && dataCategory.map((item,i)=>{
                  return <div key={i} className='group'>
                  <li className='hover:bg-[#E4E4E4] py-[5px] rounded px-[10px]  text-[1.1em] cursor-pointer' >{item.name}</li>
                  <div className='bg-white absolute p-[40px] left-0 w-screen hidden justify-between group-hover:flex shadow-[0_10px_10px_0_rgba(0,0,0,0.3)]'>
                      <div>
                        <ul>
                            {
                            item.Subcategory.map((item,i)=>{
                                return <li key={i} className='cursor-pointer'>{item.name}</li>
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
      </header>
    </>
  )
}

export default Header
