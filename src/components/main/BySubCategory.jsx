import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { DATA } from "../../context/DataContext";
import { getDataBySubBrand, getDataBySubCategory } from "../../services/api";
import { VscHeart, VscHeartFilled } from "react-icons/vsc";
import {
  IoIosArrowBack,
  IoIosArrowDown,
  IoIosArrowForward,
  IoIosCheckmark,
} from "react-icons/io"
import { IoFilterSharp } from "react-icons/io5"

function BySubCategory() {
  const { catname, catid, subname, subid } = useParams()
  const [sortSelection, showSortSelection] = useState(false)
  const { dataCategory, dataFilter, dataFav, handleFavs, showFilter, setShowFilter } = useContext(DATA)
  const sortData = ['RECOMMENDED ', 'PRICE LOW TO HIGH', 'PRICE HIGH TO LOW']
  const [selectedSort, setSelectedSort] = useState('RECOMMENDED')
  // const [sortedData,setSortedData]=useState()
  const [dataByCategory, setDataByCategory] = useState(null)
  const [totalPage, setTotalPage] = useState(1)
  const [selectedColors, setSelectedColors] = useState(null)
  const [selectedBrand, setSelectedBrand] = useState(null)
  const [selectedSizes, setSelectedSizes] = useState(null)
  const [colorData, setColorData] = useState(null)
  const [sizeData, setSizeData] = useState(null)
  const [brandData, setBrandData] = useState(null)
  const [page, setPage] = useState(1)
  const [showDiscount, setShowDiscount] = useState(false)
  const [newdatafilter, setnewdatafilter] = useState(dataFilter)
  const navigate = useNavigate()
  function handleSubFilter(id) {
    setnewdatafilter(
      newdatafilter.map((item, i) =>
        item.id == id ? { ...item, isOpen: !item.isOpen } : item
      )
    )
  }

  function handleCheckedFilters(filtername, filteri, filtertype) {
    filtertype == 'colors' ? setSelectedColors(filtername) :
      filtertype == 'brands' ? setSelectedBrand(filtername) :
        filtertype == 'sizes' ? setSelectedSizes(filtername) :
          filtertype == 'discount' ? setShowDiscount(true) : ''

    getDataBySubBrand(selectedBrand, selectedColors, selectedSizes).then(res => console.log(res.data))
    // navigate(
    //   `/productsbysubcategory/${catname}/${catid}/${subname}/${subid}?page=${page}&brandId=${selectedBrand}`
    // );
  }
  useEffect(() => {

    setnewdatafilter(
      newdatafilter.map((item, i) =>
        item.name == 'colors' ? { ...item, subfilter: [colorData] } :
          item.name == 'brands' ? { ...item, subfilter: [brandData] } :
            item.name == 'discount' ? { ...item, subfilter: [['discount']] } :
              item.name == 'sizes' ? { ...item, subfilter: [sizeData] } : item
      ))
  }, [dataCategory, colorData, sizeData, brandData])

  useEffect(() => {
    showSortSelection(false)
    getDataBySubCategory(subid, page, selectedBrand).then((res) => {
      setDataByCategory(res.data.sort(() => Math.random() - 0.5))
      setTotalPage(res.meta.totalPages)
      setColorData([...new Set(res.data.flatMap((item) => item.Colors))])
      setSizeData([...new Set(res.data.flatMap((item) => item.Size))])
      setBrandData([...new Set(res.data.flatMap((item) => item.Brands.id))])
    })
  }, [subid, page])
  function handleSort(type){
    setSelectedSort(type)
    if(type=='PRICE LOW TO HIGH')  dataByCategory?.sort(function(a, b){return a.price - b.price}) 
    else if( type=='PRICE HIGH TO LOW') dataByCategory?.sort(function(a, b){return b.price - a.price}) 
    else setDataByCategory(dataByCategory?.sort(() => Math.random() - 0.5)) 
  }

  function changeUrlPage(page) {
    window.scrollTo({
      behavior: "smooth",
      top: 0,
    });
    navigate(
      `/productsbysubcategory/${catname}/${catid}/${subname}/${subid}?page=${page}`
    );
  }

  return (
    <>
      <div className=" pt-[150px]">

        <p className="text-[3em] font-serif text-center">{subname}</p>
        <ul className="underline flex  gap-[20px] justify-center">
          {dataCategory &&
            dataCategory[catid - 1]?.Subcategory.map((item, i) => {
              return (
                <Link to={`/productsbysubcategory/${catname}/${catid}/${item.name}/${item.id}`} key={i}>
                  {item.name}
                </Link>
              );
            })}
        </ul>

        <div className={`${dataByCategory?.length>1 ? 'flex' :'hidden'}  justify-between mx-[40px]`}>
          <div
            onClick={() => {
              setShowFilter(true);
            }}
            className="flex bg-red-300 h-[40px] cursor-pointer items-center lg:hidden gap-[10px]"
          >
            <IoFilterSharp /> FILTERS
          </div>
          <div></div>
          <div className="relative z-30 bg-white h-[50px]">
            <div className="absolute text-[.9em] right-0 w-[200px]">
              <p
                onClick={() => { showSortSelection(!sortSelection) }}
                className="font-montserrat my-[3px] p-[3px]  [100%] border-[1px] flex px-[10px] justify-between items-center">
                {selectedSort}

                <IoIosArrowDown
                  className={`cursor-pointer transition-all duration-300 ${sortSelection ? 'rotate-180' : ''}`}
                />
              </p>
              <div className={`${sortSelection ? 'block' : 'hidden'} py-[10px] bg-white border-[1px] z-40`}>
                {
                  sortData && sortData.map((item, i) => {
                    return (
                      <p key={i}
                        onClick={() => { handleSort(item); showSortSelection(false) }}
                        className="font-montserrat mx-[10px] p-[3px] cursor-pointer flex items-center hover:bg-black hover:text-white transition-all duration-300">
                        {item}
                      </p>)
                  })
                }
              </div>
            </div>
          </div>
        </div>
        {
          dataByCategory?.length>1 ? <div className="flex p-[30px] justify-between">
          {/* FILTERDIV */}
          <div className="hidden lg:block w-[500px] mr-[20px]">
            <div>
              {newdatafilter &&
                newdatafilter.map((item, i) => {
                  return (
                    <div key={i} className="">
                      <div
                        className={`text-[.9em]  bg-white  relative font-bold p-[10px]  mx-[10px] border-t-4 flex justify-between w-[100%] cursor-pointer`}>
                        <p
                          onClick={() => {
                            handleSubFilter(item.id);
                          }}
                          className="flex z-0 justify-between w-[100%]">
                          {item.name}
                          <IoIosArrowDown
                            className={`transition-all duration-300 ${item.name == "price" ? "hidden" : "block"
                              } ${item.isOpen ? "rotate-180" : ""}`} />
                        </p>
                      </div>

                      <div className={` pt-[10px]  w-[100%] `}>
                        <div>
                          <ul className={` pl-[30px] lowercase flex flex-col ${item.isOpen ? "block" : "hidden"}`}>
                            {
                              item.subfilter && item.subfilter[0]?.map((subitem, subi) => {
                                return (
                                  <li key={subi}
                                    className={`p-[5px] cursor-pointer flex gap-[10px]  items-center  ${item.name == 'colors' ? 'uppercase' : ' capitalize'}`}>
                                    <div
                                      onClick={() => { handleCheckedFilters(subitem, subi, item.name) }}
                                      className={`relative  border-[1px] border-black
                                      ${item.name == 'colors' ? 'rounded-full w-[25px] h-[25px]'
                                          : 'rounded h-[15px] w-[15px]'}
                                      `}
                                      style={{ backgroundColor: subitem }}
                                    >
                                      <IoIosCheckmark className={`-right-[5px] 
                                      ${item.name == "colors" ? '-top-[3px]  text-[2em] text-white' : 'text-black -top-[6px]  text-[1.5em]'}   
                                      ${subitem.isChecked ? 'absolute' : 'hidden'}  `}
                                      />
                                    </div>

                                    {subitem}</li>
                                )
                              })
                            }
                          </ul>
                        </div>
                      </div>
                    </div>
                  )
                })}
            </div>
          </div>

          {/* PAGINATIONDIV */}
          <div className="flex flex-col ">
            <div className="flex w-[100%] gap-[20px] flex-wrap justify-around">
              {dataByCategory &&
                dataByCategory.map((item, i) => {
                  return (
                    <Link key={i} to={`/productbyid/${item.id}`}>
                      <div className="my-[20px] max-w-[200px] shadow-lg bg-white  relative flex cursor-pointer flex-col">
                        <div className=" relative h-[100%] overflow-hidden group ">
                          <img
                            className={`group-hover:hidden transition-opacity duration-300 ease-in-out `}
                            src={item.images[0]} />
                          <img
                            className={`hidden group-hover:block transition-opacity duration-300 ease-in-out`}
                            src={item.images[1]} />
                          { }
                          <div
                            onClick={(e) => {
                              e.preventDefault();
                              handleFavs(item.id);
                            }}
                          >
                            {dataFav &&
                              dataFav.find((itema) => itema.id == item.id) ? (
                              <VscHeartFilled className={`absolute text-[2em] top-[10px] right-[10px]`} />
                            ) : (
                              <VscHeart className={`absolute text-[2em] top-[10px] right-[10px] `} />
                            )}
                          </div>

                          <div className={``}>
                            <div
                              onClick={(e) => {
                                setShowQuick(true);
                                setproid(item.id);
                                e.preventDefault();
                              }}
                              className={` group-hover:bottom-0  -bottom-full transition-all duration-300 h-[30px]  text-center text-white absolute  w-[100%] bg-[rgba(19,19,19,0.7)]`}
                            >
                              QUICK VIEW
                            </div>
                          </div>
                        </div>
                        <div
                          className={`${item.discount > 1 ? "block" : "hidden"
                            } bg-black text-white w-[40px] text-center rounded absolute top-0 left-0`}
                        >
                          {item.discount}%
                        </div>
                        <div className="p-[10px]">
                          <p className="font-bold text-[1.1em] z-10">
                            {item.Brands.name}
                          </p>
                          <p className=" text-nowrap overflow-hidden font-[600] text-ellipsis text-gray-500">
                            {item.name}
                          </p>
                          <p
                            className={`${item.discount > 1 ? "block" : "hidden"
                              } text-green-700  font-bold`}
                          >
                            <del className="text-red-500">{item.price}</del>
                            <span className="px-[10px]">
                              {(
                                (item.price * (100 - item.discount)) /
                                100
                              ).toFixed(2)}
                              $
                            </span>
                          </p>
                          <p
                            className={`${item.discount > 1 ? "hidden" : "block"
                              } font-bold`}
                          >
                            {item.price}$
                          </p>
                        </div>
                      </div>
                    </Link>
                  );
                })}
            </div>
            <div className="flex mx-[auto] gap-[10px] h-[70px] items-center w-[300px] *:cursor-pointer">
              <div className="flex items-center">
                <IoIosArrowBack /> Previous{" "}
              </div>
              {Array(totalPage)
                .fill("ayan")
                .map((item, i) => (
                  <div
                    onClick={() => {
                      changeUrlPage(i + 1);
                      setPage(i + 1);
                    }}
                    key={i}
                    title={`Page ${i + 1}`}
                    className="hover:bg-black flex transition-all duration-100 justify-center items-center rounded border-[1px] border-black  hover:text-white w-[40px] h-[40px]"
                  >
                    {i + 1}
                  </div>
                ))}
              <div className="flex items-center">
                Next <IoIosArrowForward />
              </div>
            </div>
          </div>
        </div> : (
            <div>
              <p className='text-center pt-[30px] bp600:px-[40px] font-montserrat text-[1.3em] bp600:text-[2em]'>
                We're sorry, there are no products available for "{subname}" category right now. Please check back later!
              </p>
            </div>)
        }
      </div>
    </>
  );
}

export default BySubCategory;
