import React, { useContext, useEffect, useState } from "react";
import { MdCircle, MdOutlineModeEdit } from "react-icons/md";
import { BASKET } from "../../context/BasketContext";
import { BsCheck } from "react-icons/bs";
import { Link, NavLink } from "react-router-dom";
import { FaWhatsapp } from "react-icons/fa";
import OrderSummary from "./OrderSummary";
import { IoIosArrowUp } from "react-icons/io";

function CheckOut() {
  const { basket, SubTotal, removeFromBasket, handleCount } = useContext(BASKET);
  const [summaryFixed, setSummaryFixed] = useState(true);
  const [delivery, setDelivery] = useState(true);
  const [urgent, setUrgent] = useState(false);
  const [gift, setGift] = useState(false);
  const [onlinepay, setOnlinePay] = useState(true);
  const [pickup, setPickup] = useState(false);

  const [payment, setPayment] = useState(false);
  useEffect(() => {
    setUrgent(false)
  }, [pickup])
  const [showOrderSumFull, setShowOrderSumFull] = useState(false)
  onscroll = function () {
    if (window.scrollY >= 700) {
      setSummaryFixed(false)
    } else {
      setSummaryFixed(true)
    }
  }
  
  function handleProceedtoPayment(status) {
    setPayment(status);
    window.scrollTo({
      behavior: "smooth",
      top: 0,
    });
  }


  return (
    <>
      <div className="lg:flex mx-[auto] relative w-[100%] lg:justify-center pt-[130px]">
        <div
          className={` w-[100%] bp600:w-[80%] mx-[auto] lg:w-[70%] lg:ml-[10px]`}
        >
          <p className="font-cormorant text-[1.3em] text-center">
            Secure Checkout
          </p>
          <div className="w-[100%] px-[10px] bp600:px-[80px] flex justify-between items-center">
            <div className="rounded-full border-[1px] border-gray-900 h-[40px] font-montserrat w-[40px] flex justify-center items-center">
              1
            </div>
            <div className={`${payment ? 'border-black' : 'border-gray-300'} w-[37%] border-t-[1px] `}></div>
            <div className={`${payment ? 'border-black' : 'border-gray-300'} rounded-full border-[1px]  h-[40px] font-montserrat w-[40px] flex justify-center items-center`}>
              2
            </div>
            <div className="w-[37%] border-t-[1px] border-gray-300"></div>
            <div className="rounded-full border-[1px] border-gray-300 h-[40px] font-montserrat w-[40px] flex justify-center items-center">
              3
            </div>
          </div>
          <div className="w-[100%] font-montserrat px-[10px] bp600:px-[60px] flex justify-between">
              <p>Delivery</p>
              <p>Review&Pay</p>
              <p>Complete</p>
            </div>
          {/* DIV AFTER PROCEED TO PAYMENT */}
          <div className={`${payment ? "block" : "hidden"} `}>
            <p className="text-[1.3em] font-cormorant px-[40px] pt-[100px] py-[20px] ">
              Delivery Details
            </p>

            <div
              className={`flex flex-wrap gap-[20px] justify-between p-[40px]`}
            >
              <div>
                <p className="font-montserrat ">Customer information</p>
                <p className="font-montserrat pt-[10px] text-[.9em] text-gray-700 ">
                  Ayan Mammadova <br />
                  +994 70 256 10 65 <br />
                  Baku <br />
                  azerbaijan <br />
                </p>
                <button
                  onClick={() => {
                    handleProceedtoPayment(false);
                  }}
                  className=" p-[5px] m-[5px] gap-[10px] rounded justify-between w-[110px] flex items-center transition-all duration-100 hover:border-[1px] border-black"
                >
                  <MdOutlineModeEdit />
                  <p className="font-montserrat uppercase text-gray-700 font-[400]">
                    change
                  </p>
                </button>
              </div>
              <div className={`${pickup ? "hidden" : "block"}`}>
                <p className="font-montserrat ">Delivery options</p>
                <p className="font-montserrat pt-[10px] text-[.9em] text-gray-700 ">
                  {urgent ? "Urgent-15$" : "Standart-Free"} <br />
                </p>
                <button
                  onClick={() => {
                    handleProceedtoPayment(false);
                  }}
                  className=" p-[5px] m-[5px] gap-[10px] rounded justify-between w-[110px] flex items-center transition-all duration-100 hover:border-[1px] border-black"
                >
                  <MdOutlineModeEdit />
                  <p className="font-montserrat uppercase text-gray-700 font-[400]">
                    change
                  </p>
                </button>
              </div>
            </div>
            <hr />
            <div
              onClick={() => {
                setOnlinePay(!onlinepay);
              }}
              className="flex w-[100%] justify-between items-start cursor-pointer"
            >
              <div className="flex items-start gap-[20px] p-[10px] bp600:p-[40px]">
                <div className="p-[2px] border-[1px] text-[.8em] border-black  flex items-center justify-center rounded-full">
                  <MdCircle
                    className={`${onlinepay ? "text-black" : "text-white"}`}
                  />
                </div>
                <div>
                  <p className=" font-montserrat">Online card payment</p>
                  <p className="text-gray-500  py-[10px] font-montserrat">
                    We accept follwing cards
                  </p>
                  <img src="/img/visacards.png" alt="" />
                </div>
              </div>
            </div>
            <div
              onClick={() => {
                setOnlinePay(!onlinepay);
              }}
              className="flex w-[100%] justify-between items-start cursor-pointer"
            >
              <div className="flex items-start gap-[20px] p-[10px] bp600:p-[40px]">
                <div className="p-[2px] border-[1px] text-[.8em] border-black  flex items-center justify-center rounded-full">
                  <MdCircle
                    className={`${onlinepay ? "text-white" : "text-black"}`}
                  />
                </div>
                <div>
                  <p className=" font-montserrat">Cash on Delivery</p>
                  <p className="text-gray-500  py-[10px] font-montserrat">
                    Pay at the courier with cash. Please prepare the exact
                    amount, our couriers might not be able to give you change.
                  </p>
                </div>
              </div>
            </div>
            <Link to={onlinepay ? '/payment' : '/finishorder'}>
              <button

                className="bg-black text-white transition-all font-montserrat duration-200 hover:bg-white hover:text-black text-center w-[95%] rounded mt-[20px] h-[40px] border-[1px] border-black"
              >
                {onlinepay ? 'Go to payment' : 'Complete Order'}
              </button>
            </Link>
            <p className="text-[1.3em] py-[20px] font-cormorant  flex justify-center">
              Need Help?
            </p>
            <button className="h-[45px]  flex w-[95%] mx-auto font-montserrat  gap-[10px] items-center justify-center  transition-all duration-300 border-[1px] border-black  bg-white text-black hover:bg-black hover:text-white">
              <FaWhatsapp />
              SEND US A MESSAGE
            </button>
          </div>
          {/* DIV BEFORE PROCEED TO PAYMENT */}
          <div className={`${payment ? "hidden" : "block"} `}>
            
            <div className="p-[10px] bp400:p-[40px] font-montserrat">
              <p className="font-cormorant text-[1.3em] py-[20px]">
                Select delivery method
              </p>
              <div className=" flex gap-[10px]">
                <button
                  onClick={() => {
                    setDelivery(true);
                    setPickup(false);
                  }}
                  className={`border-[1px] transition-all duration-200 rounded border-black h-[50px] px-[10px] ${delivery ? "bg-black text-white" : "bg-white text-black"
                    }`}
                >
                  Delivery
                </button>
                <button
                  onClick={() => {
                    setPickup(true);
                    setDelivery(false);
                  }}
                  className={`border-[1px] transition-all duration-200 rounded border-black h-[50px] px-[5px] ${pickup ? "bg-black text-white" : "bg-white text-black"
                    }`}
                >
                  Pickup From the Store
                </button>
              </div>
            </div>
            {/* DELİVERY DİV */}
            <div
              className={`${delivery ? "block" : "hidden"
                } p-[10px] bp600:p-[40px] font-montserrat`}
            >
              <div
                onClick={() => {
                  setUrgent(!urgent);
                }}
                className="flex w-[100%] justify-between items-start cursor-pointer"
              >
                <div className="flex items-start gap-[20px]">
                  <div className="p-[2px] border-[1px] text-[.8em] border-black  flex items-center justify-center rounded-full">
                    <MdCircle
                      className={`${urgent ? "text-white" : "text-black"}`}
                    />
                  </div>
                  <div>
                    <p className="uppercase">Standart Delivery</p>
                    <p className="text-gray-500">
                      Orders before 16:00 will be delivered on the same day.{" "}
                      <br />
                      After 16:00 will be delivered on next day.
                    </p>
                  </div>
                </div>
                <div>FREE</div>
              </div>
              <div
                onClick={() => {
                  setUrgent(!urgent);
                }}
                className="flex w-[100%] pt-[20px] justify-between items-start cursor-pointer"
              >
                <div className="flex items-start gap-[20px]">
                  <div className="p-[2px] border-[1px] text-[.8em] border-black text-black flex items-center justify-center rounded-full">
                    <MdCircle
                      className={`${urgent ? "text-black" : "text-white"}`}
                    />
                  </div>
                  <div>
                    <p className="uppercase">Urgent Delivery</p>
                    <p className="text-gray-500">
                      Order will now be and sent you{" "}
                    </p>
                  </div>
                </div>
                <div>15$</div>
              </div>
            </div>
            {/* PİCKUP DİV */}
            <div
              className={`${pickup ? "block" : "hidden"
                } p-[10px] bp600:p-[40px] font-montserrat`}
            >
              <p className="uppercase text-[1.2em]">Collection point</p>
              <div className="border-[1px] border-gray-300">
                <iframe
                  className="w-[100%] h-[300px] rounded"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3039.629058470098!2d49.80693117514747!3d40.37274865831632!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4030634e4ec45f67%3A0xa1628495e445ab6a!2sDiv%20Academy!5e0!3m2!1sen!2saz!4v1733600111389!5m2!1sen!2saz"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
                <p className="font-cormorant font-bold text-[1.3em] p-[10px] bp600:p-[40px]">
                  Lunaria Port Baku
                </p>
                <div className="flex gap-[20px] bp600:flex-row flex-col text-[.9em] p-[10px] bp600:px-[40px] pb-[20px]">
                  <div>
                    <p className="font-monserrat">Store address</p>
                    <p className="font-monserrat bp600:w-[250px] text-gray-500">
                      153 Neftcilar Ave, AZ1001, Baku, Azerbaijan
                    </p>
                  </div>
                  <div>
                    <p className="font-monserrat">Opening hours</p>
                    <p className="font-monserrat text-gray-500">
                      Monday-Sunday: 10am-10pm
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* DELIVERY DETAILS */}
            <div className="border-t-[1px]  mx-[10px] bp600:mx-[40px]">
              <p className="text-[1.3em] font-cormorant py-[20px] ">
                Delivery Details
              </p>
              <div className="flex flex-wrap border-b-[1px] pb-[30px] justify-between">
                <div className="w-[100%] bp600:w-[48%] py-[5px] ">
                  <p className=" text-[.9em] py-[5px]  uppercase font-montserrat">
                    FIRST NAME
                  </p>
                  <input
                    required
                    type="text"
                    className="border-[1px] border-gray-300  p-[5px] font-montserrat w-[95%]"
                    placeholder="First Name"
                  />
                </div>
                <div className="w-[100%] bp600:w-[48%] py-[5px] ">
                  <p className=" text-[.9em] py-[5px]  uppercase font-montserrat">
                    LAST NAME
                  </p>
                  <input
                    required
                    type="text"
                    className="border-[1px] border-gray-300  p-[5px] font-montserrat w-[95%]"
                    placeholder="Last Name"
                  />
                </div>
                <div className="w-[100%] bp600:w-[48%] py-[5px] ">
                  <p className=" text-[.9em] py-[5px]  uppercase font-montserrat">
                    Mobile number (Check loyalty membership)
                  </p>
                  <input
                    required
                    type="text"
                    className="border-[1px] border-gray-300  p-[5px] font-montserrat w-[95%]"
                    placeholder="Last Name"
                  />
                </div>
                <div className="w-[100%] bp600:w-[48%] py-[5px] ">
                  <p className=" text-[.9em] py-[5px]  uppercase font-montserrat">
                    Email Address
                  </p>
                  <input
                    required
                    type="text"
                    className="border-[1px] border-gray-300  p-[5px] font-montserrat w-[95%]"
                    placeholder="Email"
                  />
                </div>
                <div
                  className={`${delivery ? "block" : "hidden"
                    } w-[100%] py-[5px] `}
                >
                  <p className=" text-[.9em] py-[5px]  uppercase font-montserrat">
                    city
                  </p>
                  <input
                    required
                    type="text"
                    className="border-[1px] border-gray-300  p-[5px] font-montserrat w-[95%]"
                    placeholder="City"
                  />
                </div>
                <div
                  className={`${delivery ? "block" : "hidden"
                    } w-[100%] py-[5px] `}
                >
                  <p className=" text-[.9em] py-[5px]  uppercase font-montserrat">
                    Address
                  </p>
                  <input
                    required
                    type="text"
                    className="border-[1px] border-gray-300  p-[5px] font-montserrat w-[95%]"
                    placeholder="Address"
                  />
                </div>
              </div>
              <div
                className={`${delivery ? "block" : "hidden"
                  } w-[100%] py-[5px] `}
              >
                <p className="text-[1.3em] font-cormorant pt-[20px] ">
                  Gifting options
                </p>
                <p className="text-[.9em] font-montserrat  text-gray-500">
                  Please make sure the delivery address belongs to the one
                  receiving the gift
                </p>
              </div>
              <div
                className={`${delivery ? "block" : "hidden"
                  } flex items-center gap-[10px]`}
              >
                <div
                  onClick={() => {
                    setGift(!gift);
                  }}
                  className={`text-white flex border-[1px] cursor-pointer border-black w-[20px] rounded = ${gift ? "bg-black" : "bg-white"
                    }  `}
                >
                  <BsCheck className="font-bold text-[1.2em]" />
                </div>
                <p className="text-[1.3em] font-montserrat ">
                  Send this order as a gift
                </p>
              </div>
              {/* GIFT INPUT */}
              <div
                className={`${gift ? "block" : "hidden"
                  } flex w-[100%] flex-wrap border-b-[1px] pb-[30px] justify-between`}
              >
                <div className="w-[100%] bp600:w-[50%] py-[5px] ">
                  <p className=" text-[.9em] py-[5px]  uppercase font-montserrat">
                    reciever FIRST NAME
                  </p>
                  <input
                    required
                    type="text"
                    className="border-[1px] border-gray-300  p-[5px] font-montserrat w-[95%]"
                    placeholder="First Name"
                  />
                </div>
                <div className="w-[100%] bp600:w-[50%] py-[5px] ">
                  <p className=" text-[.9em] py-[5px]  uppercase font-montserrat">
                    reciever LAST NAME
                  </p>
                  <input
                    required
                    type="text"
                    className="border-[1px] border-gray-300  p-[5px] font-montserrat w-[95%]"
                    placeholder="Last Name"
                  />
                </div>

                <div className="w-[100%] py-[5px] ">
                  <p className=" text-[.9em] py-[5px]  uppercase font-montserrat">
                    Receiver mobile
                  </p>
                  <input
                    required
                    type="text"
                    className="border-[1px] border-gray-300  p-[5px] font-montserrat w-[100%]"
                    placeholder="City"
                  />
                </div>
                <div>
                  <p className=" text-[.9em] py-[5px]  uppercase font-montserrat">
                    note
                  </p>
                  <textarea
                    placeholder="Note"
                    className="border-[1px] border-gray-300  p-[5px] font-montserrat w-full"
                    id=""
                  ></textarea>
                </div>
              </div>

              {/* GO TO PAYMENT */}
              <div>
                <button
                  onClick={() => {
                    handleProceedtoPayment(true);
                  }}
                  className="bg-black text-white transition-all font-montserrat duration-200 hover:bg-white hover:text-black text-center w-[100%] rounded mt-[20px] h-[40px] border-[1px] border-black"
                >
                  Payment to Proceed
                </button>
                <NavLink
                  to={`/shoppingbagpage`}
                  className="relative  flex my-[20px]  w-max mx-[auto]  cursor-pointer group"
                >
                  <span className="text-center uppercase w-[100%]  font-montserrat">
                    back to shopping cart
                  </span>
                  <span className="absolute -bottom-1 left-1/2 w-3/6 transition-all h-[1px] bg-black group-hover:w-0"></span>
                  <span className="absolute -bottom-1 right-1/2 w-3/6 transition-all h-[1px] bg-black group-hover:w-0"></span>
                </NavLink>

                <hr />
                <p className="text-[1.3em] py-[20px] font-cormorant  flex justify-center">
                  Need Help?
                </p>
                <button className="h-[45px] flex w-[100%] font-montserrat  gap-[10px] items-center justify-center  transition-all duration-300 border-[1px] border-black  bg-white text-black hover:bg-black hover:text-white">
                  <FaWhatsapp />
                  SEND US A MESSAGE
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* ORDER DIV */}
        <div className={`${showOrderSumFull ? 'hidden' : 'block'} hidden lg:block lg:w-[30%]`}>
          <OrderSummary urgent={urgent} setShowOrderSumFull={setShowOrderSumFull} pickup={pickup} />
        </div>
        {/* FIXED ORDER DIV */}
        <div className={`${summaryFixed ? 'fixed bottom-0' : ''} lg:hidden z-50 w-[100%] `}>
          <div className={`lg:hidden ${showOrderSumFull ? 'hidden' : 'relative'} w-[100%] h-[100px] mt-[20px]  bg-[#F7F7F2]`}>
            <IoIosArrowUp
              onClick={() => { setShowOrderSumFull(true) }}
              className="text-[1.3em]  cursor-pointer absolute top-[10px] right-[10px]"
            />
            <div className="flex justify-between w-[100%]">
              <div className="flex max-w-[200px] overflow-hidden mx-[20px] items-center ">
                {
                  basket && basket.map((item, i) => {
                    return <img className="h-[90px] p-[10px] object-cover w-[70px]" key={i} src={item.images[0]} />
                  })
                }
                <div className="w-[30px]  text-center font-montserrat bg-black text-white">
                  +{basket.length}
                </div>
              </div>
              <div className="absolute text-[.9em] top-[40px] font-montserrat right-[10px]">
                <p className="">SUBTOTAL</p>
                <p>{urgent ? `${SubTotal + 15}` : `${SubTotal}`} AZN</p>
              </div>
            </div>
          </div>
        </div>


        <div className={`${showOrderSumFull ? 'relative' : 'hidden'} lg:hidden w-[100%]  z-40`}>

          <div
            className="fixed w-[100%] top-0 h-[100vh] bg-[#53525280] "
            onClick={() => { setShowOrderSumFull(false) }}
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="fixed w-[100%]  bottom-0">
              <OrderSummary urgent={urgent} setShowOrderSumFull={setShowOrderSumFull} />
            </div>
          </div>
        </div>

      </div>
    </>
  );
}

export default CheckOut;
