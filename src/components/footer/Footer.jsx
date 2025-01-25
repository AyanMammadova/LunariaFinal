import React, { useContext, useState } from "react";
import { FaFacebookF, FaInstagram, FaWhatsapp } from "react-icons/fa";
import FooterSwiper from "./FooterSwiper";
import { DATA } from "../../context/DataContext";
import { IoIosArrowDown } from "react-icons/io";
import { GoCreditCard } from "react-icons/go";
import { FaTruckFast } from "react-icons/fa6";
import { GiBoxUnpacking } from "react-icons/gi";

function Footer() {
  const date = new Date();
  const { footerData } = useContext(DATA)
  const [dataF, setDataF] = useState(footerData)

  function handleSubcats(id) {
    setDataF(dataF.map((item, i) =>
      id == i ? { ...item, shown: !item.shown } : item
    ))
  }

  return (
    <>
      <footer className="p-[10px] bp600:p-[40px] bg-white">
        <section>
          <p className="text-[1.1em] py-[20px]">@LUNARIABAKU</p>
          <FooterSwiper />
        </section>
        <section>
          <div className="bg-[#F7F7F2] text-center my-[30px] py-[30px]">
            <p className="text-[2em] pb-[10px] bp900:text-[3em] font-serif">
              Join our newsletter
            </p>
            <p className="text-[1.2em] bp900:text-[1.5em] font-serif w-[95%] bp900:w-[60%] mx-auto">
              By signing up to Lunaria, you’ll be the first to hear about
              special offers, our new arrivals, new brands and fashion trends.
            </p>
            <div className="py-[20px]">
              <input
                className="w-[80%] bp600:w-auto rounded mx-[10px] border-2 border-gray-300 bg-white text-black font-serif text-[1.2em] h-[40px] px-[20px]"
                type="text"
                placeholder="Enter your email address"
              />
              <button className="w-[80%] bp600:w-auto my-[20px] rounded bg-black text-white text-[1.2em] h-[40px] px-[20px]">
                SUBSCRIBE
              </button>
            </div>
          </div>
        </section>
        <section className="flex font-montserrat justify-around flex-wrap">
          <div className="h-[70px] border-2  my-[10px] flex items-center w-[100%] bp700:w-[30%]">
            <GoCreditCard className="mx-[10px]" /> Safe & Easy payment
          </div>
          <div className="h-[70px] border-2 my-[10px]  flex items-center w-[100%] bp700:w-[30%]">
            <FaTruckFast className="mx-[10px]" /> Express delivery
          </div>
          <div className="h-[70px] border-2 my-[10px]  flex items-center w-[100%] bp700:w-[30%]">
            <GiBoxUnpacking className="mx-[10px]" /> Quick & Easy returns
          </div>
        </section>
        <section className="flex flex-col bp700:flex-row flex-wrap gap-[15px] justify-between text-[.9em]  font-montserrat   py-[20px]">
          {
            dataF.map((item, i) => {
              return <div key={i} className="*:py-[5px] ">
                <p className="text-[1.2em] bp700:text-[1.1em] flex uppercase justify-between">
                  {item.category}
                  <IoIosArrowDown
                    className={`transition-all duration-300 block bp700:hidden ${item.shown ? 'rotate-180' : ''}`}
                    onClick={() => { handleSubcats(i) }}
                  />
                </p>
                {item?.subcats?.map((subitem, subi) => {
                  return <p
                    key={subi}
                    className={` ${item.shown ? 'block' : 'hidden'} bp700:block text-[1.2em] bp700:text-[1em]`}>
                    {subitem}
                  </p>
                })
                }

              </div>
            })
          }

          <div>
            <p>LUNARIUN ACCEPTS</p>
            <img src="/img/visacards.png" alt="" />
            <p>SOCIAL MEDIA</p>
            <div className="flex text-[2em] gap-[20px]">
              <FaFacebookF className="border-2 border-black h-[40px] w-[40px] rounded-full p-[5px]" />
              <FaInstagram className="border-2 border-black h-[40px] w-[40px] rounded-full p-[5px]" />
              <FaWhatsapp className="border-2 border-black h-[40px] w-[40px] rounded-full p-[5px]" />
            </div>
          </div>
        </section>
        <p className="pb-[20px] text-center">
          © Copyright {date.getFullYear()} Lunaira.
        </p>
      </footer >
    </>
  );
}

export default Footer;
