import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { DATA } from '../../context/DataContext'
import { getDataBySubCategory } from '../../services/api'
import { VscHeart, VscHeartFilled } from 'react-icons/vsc'
import { IoIosArrowBack, IoIosArrowDown, IoIosArrowForward } from 'react-icons/io'
import { BsCheck } from 'react-icons/bs'

function BySubCategory() {
  const { catname, catid, subname, subid } = useParams()
  const { dataCategory, dataFilter, dataFav, handleFavs } = useContext(DATA)
  const [dataByCategory, setDataByCategory] = useState(null)
  const [totalPage, setTotalPage] = useState(1)
  const [colorData, setColorData] = useState(null)
  const [sizeData, setSizeData] = useState(null)
  const [brandData, setBrandData] = useState(null)
  const [page,setPage]=useState(1)

  const [showDiscount, setShowDiscount] = useState(false)

  const [showCats, setShowCats] = useState(false)


  const navigate = useNavigate()
  useEffect(() => {
    getDataBySubCategory(subid, page).then(res => {
      setDataByCategory(res.data)
      setTotalPage(res.meta.totalPages)
      setColorData([...new Set(res.data.flatMap(item => item.Colors))])
      setSizeData([...new Set(res.data.flatMap(item => item.Size))])
      setBrandData([...new Set(res.data.flatMap(item => item.Brands.name))])
    })
  }, [subid, page])
  console.log(sizeData)

  function changeUrlPage(page) {
    window.scrollTo({
      behavior: 'smooth',
      top: 0
    })
    navigate(`/productsbysubcategory/${catname}/${catid}/${subname}/${subid}?page=${page}`)
  }
  console.log(colorData)


  return (
    <>
      <div className=' pt-[150px]'>
        <p className='text-[3em] font-serif text-center'>{subname}</p>
        <ul className='underline flex  gap-[20px] justify-center'>
          {
            dataCategory && dataCategory[catid - 1]?.Subcategory.map((item, i) => {
              return <Link
                to={`/`}
                key={i}>
                {item.name}
              </Link>
            })
          }

        </ul>

        <div className='flex p-[30px] justify-between'>

          {/* FILTERDIV */}
          <div className='w-[80%]'>
            <div>
              {/* CATEGORY */}
              <div>
                <div
                  onClick={() => { setShowCats(!showCats) }}
                  className='text-[.9em] relative font-bold p-[10px] mx-[10px] border-t-4 flex justify-between w-[100%] cursor-pointer'>
                  {dataFilter[0]}
                  <IoIosArrowDown />
                </div>
                <div className={`  transition-all duration-300  `}>
                  <ul className='flex flex-col pl-[30px] uppercase'>
                    {
                      dataCategory ? dataCategory[catid - 1]?.Subcategory.map((item, i) => {
                        return <Link
                          to={`/`}
                          key={i}>
                          {item.name}
                        </Link>
                      }) :
                        ''
                    }
                  </ul>
                </div>
              </div>

              {/* COLORS */}
              <div>
                <div
                  onClick={() => { setShowCats(!showCats) }}
                  className='text-[.9em] relative font-bold p-[10px] mx-[10px] border-t-4 flex justify-between w-[100%] cursor-pointer'>
                  {dataFilter[1]}
                  <IoIosArrowDown />
                </div>
                <div className={`  transition-all duration-300  `}>
                  <ul className='flex flex-col pl-[30px] '>
                    {
                      colorData ? colorData.map((item, i) => {
                        return  <div className='flex cursor-pointer'>
                                  <div className={`h-[20px] mr-[5px] border-[1px] border-black rounded-full w-[20px] bg-${item.toLowerCase()}`}></div>
                                  {item}
                                </div>
                              })
                      :''
                    }
                  </ul>
                </div>
              </div>

              {/* DISCOUNTED */}
              <div>
                <div
                  className='text-[.9em] font-bold p-[10px] mx-[10px] border-t-4 flex justify-between w-[100%] cursor-pointer'>
                  {dataFilter[2]}
                  <IoIosArrowDown />
                </div>
                <div >
                  <div className='flex h-[30px] items-center pl-[30px]'>
                    <div
                      onClick={() => { setShowDiscount(!showDiscount) }}
                      className={`h-[20px] w-[20px] flex items-center justify-center cursor-pointer ${showDiscount ? 'bg-blue-900' : ''} border-[1px]`}>
                      <BsCheck className='text-[1.6em] text-white' />
                    </div>
                    <p className='px-[10px] text-[1.1em]'>Discounted</p>
                  </div>
                </div>
              </div>

              <div>
                <div
                  className='text-[.9em] font-bold p-[10px] mx-[10px] border-t-4 flex justify-between w-[100%] cursor-pointer'>
                  {dataFilter[3]}
                  <IoIosArrowDown />
                </div>
                <div>
                  {
                    sizeData && sizeData.map((item, i) => {
                      return <div className='flex pl-[30px]'>
                        <input type="checkbox" />
                        <p className='px-[10px] text-[1.1em]'>{item}</p>
                      </div>
                    })
                  }
                </div>

              </div>


              <div>
                <div
                  className='text-[.9em] font-bold p-[10px] mx-[10px] border-t-4 flex justify-between w-[100%] cursor-pointer'>
                  {dataFilter[4]}
                  <IoIosArrowDown />
                </div>
              </div>
            </div>

          </div>


          {/* PAGINATIONDIV */}
          <div className='flex flex-col '>
            <div className='flex w-[100%] flex-wrap justify-around'>
              {dataByCategory && dataByCategory.map((item, i) => {
                return <Link key={i} to={`/productbyid/${item.id}`}>
                  <div className='my-[20px] max-w-[300px] shadow-lg bg-white  relative flex cursor-pointer flex-col'>
                    <div
                      className=' relative h-[100%] overflow-hidden group '>
                      <img
                        className={`group-hover:hidden transition-opacity duration-300 ease-in-out `}
                        src={item.images[0]} alt=""
                      />
                      <img
                        className={`hidden group-hover:block transition-opacity duration-300 ease-in-out`}
                        src={item.images[1]} alt=""
                      />
                      { }
                      <div
                        onClick={(e) => {
                          e.preventDefault()
                          handleFavs(item.id)
                        }}

                      >
                        {
                          (dataFav && dataFav.find(itema => itema.id == item.id)) ? <VscHeartFilled className={`absolute text-[2em] top-[10px] right-[10px]`} />
                            : <VscHeart className={`absolute text-[2em] top-[10px] right-[10px] `} />
                        }



                      </div>

                      <div className={``}>
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
                      <p className='font-bold text-[1.1em] z-10'>{item.Brands.name}</p>
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
            <div className='flex mx-[auto] gap-[10px] h-[70px] items-center w-[300px] *:cursor-pointer'>
              <div className='flex items-center'><IoIosArrowBack /> Previous </div>
              {
                Array(totalPage).fill('ayan').map((item, i) =>
                (<div
                  onClick={() => { changeUrlPage(i + 1);setPage(i+1) } }
                  key={i}
                  title={`Page ${i+1}`}
                  className='hover:bg-black flex transition-all duration-100 justify-center items-center rounded border-[1px] border-black  hover:text-white w-[40px] h-[40px]'>
                  {i + 1}
                </div>)
                )
              }
              <div className='flex items-center'>Next  <IoIosArrowForward /></div>
            </div>
          </div>

        </div>



      </div>
    </>
  )
}

export default BySubCategory
