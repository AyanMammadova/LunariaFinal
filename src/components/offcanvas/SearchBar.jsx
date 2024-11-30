import React, { useContext, useState} from 'react'
import { IoIosSearch } from 'react-icons/io'
import { IoCloseSharp } from 'react-icons/io5'
import { Link, NavLink } from 'react-router-dom'
import { DATA } from '../../context/DataContext'

function SearchBar({setShowSearchBar}) {
  const {dataCategory,dataAll}=useContext(DATA)
  // console.log(dataAll)
  const [searchedData,setSearchedData]=useState(null)

  function handleSearch(inputt){
    const trimmedInput=inputt.trim()
    setSearchedData(dataAll.filter((item => item.name.includes(trimmedInput))))
  }
  console.log(searchedData)
  return (
    <>
    <div className='relative'>
      <div className='w-[100%] absolute top-0 bg-white'>
          <img className='mx-[auto] h-[30px] my-[5px]' src="/img/logo.png" alt="" />
          <div className='w-[250px] bp600:w-[400px] relative mx-[auto] p-[5px] h-[40px] border-[1px] border-gray-200'>
            <input  className='w-[90%] border-white border-2' 
                    type="text" 
                    placeholder='Search...'
                    onChange={(e)=>{handleSearch(e.target.value)}}
            />
            <IoIosSearch className='absolute right-[10px] top-[10px] text-[1.3em]' />
          </div>
          <div>
            <ul className='w-[280px] bp600:w-[450px] overflow-y-hidden  py-[20px] my-[5px] mx-[auto] flex justify-between'>
              <NavLink
                className='rounded navlarim  hover:bg-gray-200 px-[10px] p-[4px]' 

              >
                All
              </NavLink>
              {
                dataCategory && dataCategory.map((item,i)=>{
                  return  <NavLink 
                          className='rounded  navlarim hover:bg-gray-200 px-[10px] p-[4px]' 
                          key={i}>
                            {item.name}
                          </NavLink>
                })
              }
            </ul>
          </div>
          <div className='w-[280px] max-h-[300px] overflow-hidden mx-[auto] mb-[20px] bp600:w-[450px]'>
            {
              searchedData && searchedData.map((item,i)=>{
                return  <>
                        <Link to={`/productbyid/${item.id}`}>
                            <div key={i} className='flex justify-between h-[60px] items-center w-[100%]'>
                              <div className='flex items-center justify-between'>
                                <img className='h-[60px] p-[3px]' src={item.images[0]} alt="" />
                                <p>{item?.name}</p>
                              </div>  
                              <div>
                                <p>{item?.price}$</p>
                              </div>
                            </div>
                            <hr />
                          </Link>
                          </>
              })
            }
          </div>
      </div>

      <IoCloseSharp
      onClick={()=>{setShowSearchBar(false)}}
       className='cursor-pointer absolute text-[1.8em] top-[5px] right-[10px] bp600:top-[20px] bp600:right-[20px]' />
      
    </div>
      
    </>
  )
}

export default SearchBar
