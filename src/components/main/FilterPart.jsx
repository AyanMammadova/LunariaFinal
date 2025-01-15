import React, { useContext, useEffect, useState } from 'react'
import { Box, Slider } from "@mui/material";
import { HiMagnifyingGlass } from "react-icons/hi2";
import { DATA } from '../../context/DataContext';
import { IoIosArrowDown, IoIosCheckmark } from 'react-icons/io';
import { getDataBySubCategory } from "../../services/api";
import { useNavigate } from 'react-router-dom';
import { IoClose } from 'react-icons/io5';

function FilterPart({ catname, subname,setPage, page,isSliding, setdataFinal }) {
    const [discounted, setDiscounted] = useState(false)
    const [minPrice, setMinPrice] = useState(0)
    const [maxPrice, setMaxPrice] = useState(4500)
    const [selectedColors, setSelectedColors] = useState(null)
    const [selectedSizes, setSelectedSizes] = useState(null)
    const [selectedBrand, setSelectedBrand] = useState(null)
    const [colorData, setColorData] = useState(null)
    const [sizeData, setSizeData] = useState(null)
    const [brandData, setBrandData] = useState(null)
    const [prices, setPrices] = useState([minPrice, maxPrice]);
    const { dataCategory, dataFilter, setShowFilter } = useContext(DATA)
    const [newdatafilter, setnewdatafilter] = useState(dataFilter)
    const [totalPage, setTotalPage] = useState(1)
    const navigate = useNavigate()
    // console.log(selectedColors)

    useEffect(() => {
        navigate(`?${page && page != 1 ? `page=${page}` : ''}${selectedColors?.length ? `&color=${selectedColors.map(item => item.toLowerCase()).join(',')}` : ''}${selectedSizes?.length ? `&size=${selectedSizes.map(item => item.toLowerCase()).join(',')}` : ''}${selectedBrand ? `&brand=${selectedBrand}` : ''}${discounted ? `&discounted=true` : ''}${minPrice ? `&minPrice=${minPrice}` : ''}${maxPrice && maxPrice != 4500 ? `&maxPrice=${maxPrice}` : ''}`)
    }, [selectedColors, selectedSizes, page, discounted, selectedBrand, minPrice, maxPrice])


    const catid = dataCategory?.find((item, i) => item.name == catname).id
    const subid = dataCategory?.[catid - 1]?.Subcategory?.find((item, i) => item.name == subname).id
    useEffect(() => {
        setMinPrice(0)
        setMaxPrice(4500)
        setDiscounted(false)
        getDataBySubCategory(subid, page).then((res) => {
            setdataFinal(res.data)
            setTotalPage(res.meta.totalPages)
            setColorData([...new Set(res.data.flatMap((item) => item.Colors))].map((item, i) =>
                ({ name: item, isChecked: false })
            ))
            setSizeData([...new Set(res.data.flatMap((item) => item.Size))].map((item, i) =>
                ({ name: item, isChecked: false })
            ))
            const datanow = res.data.flatMap((item) => ({ name: item.Brands.name, id: item.Brands.id, isChecked: false }))
            setBrandData(
                datanow.reduce((acc, item) => {
                    if (!acc?.some(existingItem => existingItem.id == item.id)) {
                        acc.push(item)
                    }
                    return acc
                }, [])
            )
        })

    }, [subid, page])
    useEffect(() => {
        setSelectedColors(
            colorData?.filter((item) => item.isChecked).map((item) => item.name) || []
        )
        setSelectedSizes(
            sizeData?.filter((item) => item.isChecked).map((item) => item.name) || []
        )
        setSelectedBrand(
            brandData?.find((item, i) => item.isChecked == true)?.id
        )
    }, [colorData, sizeData, brandData])
    const handleChange = (_, newPrices) => {
        setPrices(newPrices);
    }
    function handleShowPrices() {
        setMinPrice(prices[0])
        setMaxPrice(prices[1])
    }
    useEffect(() => {
        getDataBySubCategory(subid, selectedColors?.length>0 || selectedSizes?.length>0 ||  selectedBrand ? 1 : page, selectedColors, selectedBrand, selectedSizes, minPrice, maxPrice).then((res) => {
            const filteredData = discounted ? res.data.filter((item) => item.discount > 1)
                : res.data;
            setdataFinal(filteredData);
        });
    }, [selectedColors, selectedSizes, page, discounted, selectedBrand, minPrice, maxPrice]);
    function handleSubFilter(id) {
        setnewdatafilter(
            newdatafilter.map((item, i) =>
                item.id == id ? { ...item, isOpen: !item.isOpen } : item
            )
        )
    }
    function handleCheckedFilters(filtername, filteri, filtertype, filtertypeid, id) {
        if (filtertype == 'colors') {
            setColorData((prevColorData) =>
                prevColorData.map((item) =>
                    item.name === filtername
                        ? { ...item, isChecked: !item.isChecked }
                        : item
                )
            );
        }
        else if (filtertype == 'sizes') {
            setSizeData(
                sizeData.map((item, i) =>
                    item.name == filtername ? { ...item, isChecked: !item.isChecked } : item)
            )
        }
        else if (filtertype == 'brands') {
            setBrandData((prevBrandData) =>
                prevBrandData.map((item) =>
                    item.name === filtername
                        ? { ...item, isChecked: !item.isChecked }
                        : { ...item, isChecked: false }
                )
            );
        }
        else if (filtertype == 'discount') {
            setDiscounted(!discounted)
        }
    }
    useEffect(() => {
        setnewdatafilter(
            newdatafilter.map((item, i) =>
                item.name == 'colors' ? { ...item, subfilter: [colorData] } :
                    item.name == 'discount' ? { ...item, subfilter: [[{ name: 'discount', isChecked: discounted }]] } :
                        item.name == 'brands' ? { ...item, subfilter: [brandData] } :
                            item.name == 'sizes' ? { ...item, subfilter: [sizeData] } : item
            ))
    }, [dataCategory, colorData, sizeData, brandData, discounted])
    return (
        <>
            <div className={` relative flex justify-between bg-white z-30  h-[100vh]  w-[100%] `}>
                <IoClose onClick={() => { setShowFilter(false) }} className={`z-50 cursor-pointer top-[30px] right-[10px] ${isSliding ? 'absolute' : 'hidden'}`} />
                <div className={`${isSliding ? ' mt-[70px]' : 'mt-[10px]'} w-[95%] mx-[auto]`}>
                    {newdatafilter &&
                        newdatafilter.map((item, i) => {
                            return (
                                <div key={i} className="w-[100%]">
                                    <div
                                        className={`text-[.9em]  bg-white  relative font-bold p-[10px]  mx-[10px] border-t-4 flex justify-between w-[100%] cursor-pointer`}>
                                        <p
                                            onClick={() => {
                                                handleSubFilter(item.id);
                                            }}
                                            className="flex z-0 justify-between capitalize w-[100%]">
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
                                                                className={`p-[5px] ${item.name == 'colors' && subitem.isChecked == true ? 'bg-pink-300' : ''} rounded-xl cursor-pointer flex gap-[10px]  items-center  ${item.name == 'colors' ? 'uppercase' : ' capitalize'}`}>
                                                                <div
                                                                    onClick={() => {
                                                                        handleCheckedFilters(subitem.name, subi, item.name, i, item.id)
                                                                    }}
                                                                    className={`relative  border-[1px] border-black
                                      ${item.name == 'colors' ? 'rounded-full w-[25px] h-[25px]'
                                                                            : 'rounded h-[15px] w-[15px]'}
                                      `}
                                                                    style={{ backgroundColor: subitem.name }}
                                                                >
                                                                    <IoIosCheckmark className={`-right-[5px] 
                                      ${item.name == "colors" ? '-top-[3px]  text-[2em] text-white' : 'text-black -top-[6px]  text-[1.5em]'}   
                                      ${subitem.isChecked ? 'absolute' : 'hidden'}
                                        `}
                                                                    />
                                                                </div>

                                                                {subitem.name}</li>
                                                        )
                                                    })
                                                }
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}

                    <Box sx={{ width: 300 }}>
                        <Slider
                            sx={{
                                '& .MuiSlider-thumb': {
                                    backgroundColor: 'black',
                                },
                                '& .MuiSlider-rail': {
                                    backgroundColor: '#bdbdbd',
                                },
                                '& .MuiSlider-track': {
                                    backgroundColor: 'black',
                                },
                            }}
                            getAriaLabel={() => 'Price range'}
                            value={prices}
                            onChange={handleChange}
                            valueLabelDisplay="auto"
                            min={0}
                            max={10000}
                        />
                    </Box>
                    <div className="flex justify-between w-[100%]">
                        <input
                            onChange={(e) => {
                                setPrices([Number(e.target.value), prices[1]])
                            }}
                            value={prices[0]}
                            className="border-[1px] rounded flex justify-center items-center border-gray-500 h-[30px] w-[35%]"
                            type="number" />
                        <input
                            onChange={(e) => {
                                setPrices([prices[0], Number(e.target.value)])
                            }}
                            value={prices[1]}
                            className="border-[1px] rounded flex justify-center items-center border-gray-500 h-[30px] w-[35%]"
                            type="number" />
                        <div
                            onClick={() => { handleShowPrices() }}
                            className="border-[1px]  rounded cursor-pointer  flex justify-center items-center border-gray-500 h-[30px] w-[30px]">
                            <HiMagnifyingGlass />
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

export default FilterPart
