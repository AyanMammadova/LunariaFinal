import React, { useContext, useEffect, useState } from 'react'
import { IoIosSearch } from 'react-icons/io'
import { IoCloseSharp } from 'react-icons/io5'
import { Link} from 'react-router-dom'
import { DATA } from '../../context/DataContext'

function SearchBar({ setShowSearchBar }) {
  const { dataCategory, dataAll } = useContext(DATA)
  const [searchedData, setSearchedData] = useState(null)
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [trimmedInput,setTrimmedInput]=useState(null)

  
  useEffect(()=>{
    const filteredbyInput = dataAll?.filter((item => item.name.toLowerCase().includes(trimmedInput)))
    setSearchedData(
      selectedCategory == 'All' ? filteredbyInput : filteredbyInput.filter(item => item.categoryId == Number(selectedCategory))
    )
  },[trimmedInput,selectedCategory])
  return (
    <>
      <div className='relative h-[100vh]'>
        <div className='w-[100%] h-[100vh] lg:h-auto pt-[30px] absolute top-0 bg-white'>
          <img className='mx-[auto] h-[30px] my-[5px]' src="/img/logo.png" />
          <div className='w-[250px] bp600:w-[400px] relative mx-[auto] p-[5px] h-[40px] border-[1px] border-gray-200'>
            <input className='w-[90%] border-white border-2'
              type="text"
              placeholder='Search...'
              onChange={(e) => { setTrimmedInput(e.target.value.toLowerCase().trim()) }}
            />
            <IoIosSearch className='absolute right-[10px] top-[10px] text-[1.3em]' />
          </div>
          <div>
            <ul className='w-[280px] bp600:w-[450px] overflow-y-hidden  py-[20px] my-[5px] mx-[auto] flex justify-between'>
              <div
                onClick={() => setSelectedCategory('All')}
                className={`${selectedCategory == 'All' ? 'bg-[#e5e7eb]' : ''} cursor-pointer rounded hover:bg-gray-200 px-[10px] p-[4px]`}
              >
                All
              </div>
              {
                dataCategory && dataCategory.map((item, i) => {
                  return <div
                    onClick={() => setSelectedCategory(item.id)}
                    className={`${selectedCategory == item.id ? 'bg-[#e5e7eb]' : ''} cursor-pointer rounded  hover:bg-gray-200 px-[10px] p-[4px]`}
                    key={i}>
                    {item.name}
                  </div>
                })
              }
            </ul>
          </div>
          <div className='w-[280px] max-h-[60vh] lg:max-h-[300px] overflow-y-scroll  mx-[auto] mb-[20px] bp600:w-[450px]'>
            {
              searchedData && searchedData.map((item, i) => {
                return <Link key={i} to={`/productbyid/${item.id}`}>
                  <div className='flex justify-between h-[60px] items-center w-[100%]'>
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
              })
            }
          </div>
        </div>

        <IoCloseSharp
          onClick={() => { setShowSearchBar(false) }}
          className='cursor-pointer absolute text-[1.8em] top-[5px] right-[10px] bp600:top-[20px] bp600:right-[20px]' />

      </div>

    </>
  )
}

export default SearchBar
