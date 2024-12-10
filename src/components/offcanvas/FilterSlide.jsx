import React, { useContext, useState } from "react";
import { IoClose, IoPersonOutline } from "react-icons/io5";
import { DATA } from "../../context/DataContext";

function FilterSlide() {
  const { dataCategory,setShowFilter,showFilter } = useContext(DATA);
  const [id, setId] = useState(null);
  function showSubs(ids) {
    const news = ids;
    setId(ids);
  }
  return (
    <>
      <div className={`w-full relative flex  z-50  h-[100vh]  bg-pink-300`}>
        <IoClose onClick={()=>{setShowFilter(false)}} className="cursor-pointer absolute top-[30px] right-[10px]" />
      </div>
    </>
  );
}

export default FilterSlide;
