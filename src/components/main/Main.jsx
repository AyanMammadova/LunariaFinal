import React, { useContext } from 'react'
import { DATA } from '../../context/DataContext'
import { Link } from 'react-router-dom'
import ProductSwiper from './ProductSwiper'

function Main() {
  const { imgsfordeps } = useContext(DATA)
  const { dataCategory } = useContext(DATA)
  return (
    <>


      <main className='pt-[100px] w-[100%] bg-white'>
        <section>
          <div className='overflow-hidden h-[80vh]  w-[95%] mx-[auto] relative group'>
            <div className='h-full absolute  w-full  m-[auto] bg-[#35313180] z-10' ></div>
            <img className=' absolute top-0 object-top lg:w-full object-cover h-full  transition-all duration-500 group-hover:scale-110'
              src="https://www.versace.com/dw/image/v2/BGWN_PRD/on/demandware.static/-/Library-Sites-ver-library/default/dwe92ce0c5/Homepage-New/SS25/hp-mercury-18112024-hero-desk.jpg" alt="MainPhoto" />
            {/* <p className='absolute z-20 top-[60%] bp600:top-[70%]  text-[2em] font-serif text-white w-[100%] text-center'>Black Friday</p> */}
            <div className='absolute z-20 bottom-[60px] w-[100%] flex-col bp600:flex-row justify-center flex gap-[20px] text-white bp600:w-[40%] bp600:left-[30%]'>
              <Link to={'/category/Women'}>
                <button className='bg-transparent border-2 border-white ml-[2%] w-[95%]  bp600:w-[200px] py-[10px] hover:bg-[#35313180] font-[600] '>
                  Women
                </button>
              </Link>
              <Link to={'/category/Men'}>
                <button className='bg-transparent border-2 border-white ml-[2%] w-[95%] bp600:w-[200px] py-[10px] hover:bg-[#35313180] font-[600] '>
                  Men
                </button>
              </Link>
            </div>
          </div>
        </section>


        <div className='flex items-center  justify-between mx-[10px] my-[30px]'>
          <div className='h-[1px] border-b-[1px] w-[35%] border-gray-200'></div>
          <p className='text-center text-[1.3em] bp600:text-[2em] font-serif'>Choose a department</p>
          <div className='h-[1px] border-b-[1px] w-[35%] border-gray-200'></div>
        </div>
        {/* DEPARTAMENTS */}
        <section>
          <div className='flex gap-[10px] justify-between flex-wrap w-[100%] px-[10px] bp600:px-[40px]'>
            {
              dataCategory ? dataCategory.map((item, i) => {
                return <Link
                  to={`/category/${item.name}/${item.id}`}
                  key={i}
                  className='w-[100%] group overflow-hidden  md:w-[49%] relative'>
                  <div className='h-full absolute  w-full  m-[auto] bg-[#35313180] z-10' ></div>
                  <img className='bp600:h-full w-full object-cover transition-all duration-200 group-hover:scale-110  ' src={imgsfordeps[i]} alt="" />
                  <p className='absolute z-20 text-white top-1/2 w-[100%] text-center font-serif text-[1.5em] bp600:text-[2em]'>{item.name}</p>
                </Link>
              }) : <div className='w-[100%] flex justify-center'>
                <div className="w-8 h-8 border-4 mx-auto border-gray-300 border-t-black rounded-full animate-spin"></div>
              </div>

            }
          </div>
        </section>
        {/* DISCOUNTED PRODUCTS */}
        <section>
          <div className='p-[10px] bp600:p-[40px]'>
            <p className='font-[600] text-[1.2em]'>HIGHLIGHTS</p>
            <ProductSwiper type={'discount'} />
          </div>
        </section>
      </main>
    </>
  )
}

export default Main
