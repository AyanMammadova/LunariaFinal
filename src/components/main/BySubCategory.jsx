import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { DATA } from "../../context/DataContext";
import { getDataBySubCategory } from "../../services/api";
import { VscHeart, VscHeartFilled } from "react-icons/vsc";
import {
  IoIosArrowBack,
  IoIosArrowDown,
  IoIosArrowForward,
} from "react-icons/io";
import { BsCheck } from "react-icons/bs";
import { IoFilterSharp } from "react-icons/io5";

function BySubCategory() {
  const { catname, catid, subname, subid } = useParams();
  const {
    dataCategory,
    dataFilter,
    dataFav,
    handleFavs,
    showFilter,
    setShowFilter,
  } = useContext(DATA);

  const [dataByCategory, setDataByCategory] = useState(null);
  const [totalPage, setTotalPage] = useState(1);
  const [colorData, setColorData] = useState(null);
  const [sizeData, setSizeData] = useState(null);
  const [brandData, setBrandData] = useState(null);
  const [page, setPage] = useState(1);
  const [sfilter, setSFilter] = useState(null);
  const [showDiscount, setShowDiscount] = useState(false);
  const [showCats, setShowCats] = useState(false);
  const [newdatafilter, setnewdatafilter] = useState(dataFilter);
  function handleSubFilter(id) {
    setnewdatafilter(
      newdatafilter.map((item, i) =>
        item.id == id ? { ...item, isOpen: !item.isOpen } : item
      )
    );
  }

  const navigate = useNavigate();
  useEffect(() => {
    getDataBySubCategory(subid, page).then((res) => {
      setDataByCategory(res.data);
      setTotalPage(res.meta.totalPages);
      setColorData([...new Set(res.data.flatMap((item) => item.Colors))]);
      setSizeData([...new Set(res.data.flatMap((item) => item.Size))]);
      setBrandData([...new Set(res.data.flatMap((item) => item.Brands.name))]);
    });
    setnewdatafilter(
      newdatafilter.map((item, i) => ({ ...item, subfilter: colorData }))
    );
  }, [subid, page]);

  // function handleSizeSelect(index) {
  //   setSizeData(
  //     sizeData.map((item, i) =>
  //       i == index ? { ...item, isSelected: true } : item
  //     )
  //   );
  //   console.log(index);
  // }

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
                <Link to={`/`} key={i}>
                  {item.name}
                </Link>
              );
            })}
        </ul>

        <div className="flex  justify-between mx-[40px]">
          <div
            onClick={() => {
              setShowFilter(true);
            }}
            className="flex bg-red-300 h-[40px] cursor-pointer items-center lg:hidden gap-[10px]"
          >
            <IoFilterSharp /> FILTERS
          </div>
          <div></div>
          <div>
            <div>
              <p className="font-montserrat flex items-center">
                RECOMMENDED <IoIosArrowDown />
              </p>
            </div>
          </div>
        </div>
        <div className="flex p-[30px] justify-between">
          {/* FILTERDIV */}
          <div className="hidden lg:block w-[500px] mr-[20px]">
            <div>
              {newdatafilter &&
                newdatafilter.map((item, i) => {
                  return (
                    <div key={i} className="">
                      <div
                        className={`text-[.9em]  bg-white transition-all duration-300  ${
                          item.isOpen ? "h-[150px]" : "h-[40px]"
                        }   relative font-bold p-[10px]  mx-[10px] border-t-4 flex justify-between w-[100%] cursor-pointer`}
                      >
                        <p
                          onClick={() => {
                            handleSubFilter(item.id);
                          }}
                          className="flex justify-between w-[100%]"
                        >
                          {item.name}
                          <IoIosArrowDown
                            className={`transition-all duration-300 ${
                              item.name == "price" ? "hidden" : "block"
                            } ${item.isOpen ? "rotate-180" : ""}`}
                          />
                        </p>
                        <div
                          className={`absolute transition-all duration-300 pt-[10px]  right-0 w-[100%] top-[30px] `}
                        >
                          {item.name == "categories" ? (
                            <div className={`  transition-all duration-300  `}>
                              <ul className="flex flex-col pl-[30px] uppercase">
                                {dataCategory
                                  ? dataCategory[catid - 1]?.Subcategory.map(
                                      (item, i) => {
                                        return (
                                          <Link to={``} key={i}>
                                            {item.name}
                                          </Link>
                                        );
                                      }
                                    )
                                  : ""}
                              </ul>
                            </div>
                          ) : item.name == "colors" ? (
                            colorData ? (
                              colorData.map((item, i) => {
                                return (
                                  <div key={i} className="flex cursor-pointer">
                                    <div
                                      className={`h-[20px] mr-[5px] border-[1px] border-black rounded-full w-[20px] `}
                                      style={{
                                        backgroundColor: item.toLowerCase(),
                                      }}
                                    ></div>
                                    {item}
                                  </div>
                                );
                              })
                            ) : (
                              ""
                            )
                          ) : item.name == "discount" ? (
                            <div className="flex h-[30px] items-center pl-[30px]">
                              <div
                                onClick={() => {
                                  setShowDiscount(!showDiscount);
                                }}
                                className={`h-[20px] w-[20px] flex items-center justify-center cursor-pointer ${
                                  showDiscount ? "bg-blue-900" : ""
                                } border-[1px]`}
                              >
                                <BsCheck className="text-[1.6em] text-white" />
                              </div>
                              <p className="px-[10px] text-[1.1em]">
                                Discounted
                              </p>
                            </div>
                          ) : item.name == "sizes" ? (
                            sizeData ? (
                              sizeData.map((item, i) => {
                                return (
                                  <div
                                    key={i}
                                    onClick={() => {
                                      handleSizeSelect(i);
                                    }}
                                    className="flex cursor-pointer"
                                  >
                                    {/* <div
                                      className={`h-[20px] w-[20px] flex items-center justify-center cursor-pointer ${
                                        item.isSelected
                                          ? "bg-blue-900"
                                          : "bg-white"
                                      } border-[1px]`}
                                    >
                                      <BsCheck className="text-[1.6em] text-white" />
                                    </div> */}
                                    {item}
                                  </div>
                                );
                              })
                            ) : (
                              ""
                            )
                          ) : item.name == "price" ? (
                            <p>price</p>
                          ) : (
                            ""
                          )}
                        </div>
                      </div>
                    </div>
                  );
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
                            src={item.images[0]}
                            alt=""
                          />
                          <img
                            className={`hidden group-hover:block transition-opacity duration-300 ease-in-out`}
                            src={item.images[1]}
                            alt=""
                          />
                          {}
                          <div
                            onClick={(e) => {
                              e.preventDefault();
                              handleFavs(item.id);
                            }}
                          >
                            {dataFav &&
                            dataFav.find((itema) => itema.id == item.id) ? (
                              <VscHeartFilled
                                className={`absolute text-[2em] top-[10px] right-[10px]`}
                              />
                            ) : (
                              <VscHeart
                                className={`absolute text-[2em] top-[10px] right-[10px] `}
                              />
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
                          className={`${
                            item.discount > 1 ? "block" : "hidden"
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
                            className={`${
                              item.discount > 1 ? "block" : "hidden"
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
                            className={`${
                              item.discount > 2 ? "hidden" : "block"
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
        </div>
      </div>
    </>
  );
}

export default BySubCategory;
