import React, { useContext, useEffect, useState } from 'react'
import { Box, Slider } from "@mui/material";
import { HiMagnifyingGlass } from "react-icons/hi2";
import { DATA } from '../../context/DataContext';
import { useNavigate } from 'react-router-dom';
import { IoIosArrowDown } from 'react-icons/io';

function FilterPart() {
    const { dataCategory, dataFilter, dataFav, handleFavs, showFilter, setShowFilter } = useContext(DATA)

    const [selectedColors, setSelectedColors] = useState(null)
    const [selectedSizes, setSelectedSizes] = useState(null)
    const [selectedBrand, setSelectedBrand] = useState(null)
    const [colorData, setColorData] = useState(null)
    const [sizeData, setSizeData] = useState(null)
    const [brandData, setBrandData] = useState(null)
    const [page, setPage] = useState(null)
    const [newdatafilter, setnewdatafilter] = useState(dataFilter)
    const catid = dataCategory?.find((item, i) => item.name == catname).id
    const subid = dataCategory?.[catid - 1]?.Subcategory?.find((item, i) => item.name == subname).id
    const navigate = useNavigate()
    const [discounted, setDiscounted] = useState(false)
    const [minPrice, setMinPrice] = useState(100)
    const [maxPrice, setMaxPrice] = useState(4500)
    const [value, setValue] = React.useState([minPrice, maxPrice]);
    const [showPrices, setShowPrices] = useState(false)

    const handleChange = (_, newValue) => {
        setValue(newValue);
        setMinPrice(newValue[0])
        setMaxPrice(newValue[1])
    }

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
        else if (filtertype = 'brands') {
            setBrandData(
                brandData.map((item, i) =>
                    item.name == filtername ? { ...item, isChecked: !item.isChecked } : { ...item, isChecked: false }
                )
            )
        }
        else if (filtertype == 'discount') {
            setDiscounted(!discounted)
        }
    }
    useEffect(() => {
        getDataBySubCategory(subid, page, selectedColors, selectedBrand, selectedSizes, minPrice, maxPrice).then((res) => {
            const filteredData = discounted
                ? res.data.filter((item) => item.discount > 1)
                : res.data;
            setdataFinal(filteredData);
        });
    }, [selectedColors, selectedSizes, page, discounted, showPrices, selectedBrand]);
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
    useEffect(() => {
        navigate(`?${page ? `page=${page}` : ''}${selectedColors?.length ? `&color=${selectedColors.map(item => item).join(',')}` : ''}${selectedSizes?.length ? `&size=${selectedSizes.map(item => item).join(',')}` : ''}${selectedBrand ? `&brandId=${selectedBrand}` : ''}${discounted ? `&discounted=true` : ''}${minPrice ? `&minPrice=${minPrice}` : ''}${maxPrice ? `maxPrice=${maxPrice}` : ''}`)
    }, [selectedColors, selectedSizes, page, discounted, showPrices, selectedBrand])

    useEffect(() => {
        setnewdatafilter(
            newdatafilter.map((item, i) =>
                item.name == 'colors' ? { ...item, subfilter: [colorData] } :
                    item.name == 'discount' ? { ...item, subfilter: [[{ name: 'discount', isChecked: discounted }]] } :
                        item.name == 'brands' ? { ...item, subfilter: [brandData] } :
                            item.name == 'sizes' ? { ...item, subfilter: [sizeData] } : item
            ))
    }, [dataCategory, colorData, sizeData, brandData, discounted])

    useEffect(() => {
        setMinPrice(0)
        setMaxPrice(4500)
        setDiscounted(false)
        showSortSelection(false)
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


    return (
        <>
            {/* FILTERDIV */}
            <div className="hidden lg:block w-[40%] mr-[20px]">
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
                            getAriaLabel={() => 'Temperature range'}
                            value={value}
                            onChange={handleChange}
                            valueLabelDisplay="auto"
                            min={0}
                            max={10000}
                        />
                    </Box>
                    <div className="flex justify-between w-[100%]">
                        <input
                            onChange={(e) => {
                                setMinPrice(Number(e.target.value))
                                setValue([Number(e.target.value), maxPrice])
                            }}
                            value={minPrice}
                            className="border-[1px] rounded flex justify-center items-center border-gray-500 h-[30px] w-[35%]"
                            type="number" />
                        <input
                            onChange={(e) => {
                                setMaxPrice(Number(e.target.value))
                                setValue([minPrice, Number(e.target.value)])
                            }}
                            value={maxPrice}
                            className="border-[1px] rounded flex justify-center items-center border-gray-500 h-[30px] w-[35%]"
                            type="number" />
                        <div
                            onClick={() => { setShowPrices(true) }}
                            className="border-[1px] rounded cursor-pointer  flex justify-center items-center border-gray-500 h-[30px] w-[30px]">
                            <HiMagnifyingGlass />
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

export default FilterPart
