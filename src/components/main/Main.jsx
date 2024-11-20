import React, { useContext } from 'react'
import { DATA } from '../../context/DataContext'

function Main() {
  const {imgsfordeps}=useContext(DATA)
  const {dataCategory}=useContext(DATA)
  return (
    <>
      <main className='pt-[100px] bg-white'>
        <section>
          <div className='overflow-hidden h-[80vh]  w-[95%] mx-[auto] relative'>
            <div className='h-full absolute  w-full  m-[auto] bg-[#35313180]' ></div>
            <img  className='h-full object-top object-cover  w-full  m-[auto] transition-all duration-500 hover:scale-110' 
                  src="https://www.versace.com/dw/image/v2/BGWN_PRD/on/demandware.static/-/Library-Sites-ver-library/default/dwe92ce0c5/Homepage-New/SS25/hp-mercury-18112024-hero-desk.jpg" alt="MainPhoto" />
            <p className='absolute top-[60%]  text-[2em] font-serif text-white w-[100%] text-center'>Black Friday</p>
            <div className='absolute bottom-[100px] w-[100%] flex gap-[20px] text-white flex-col sm:flex-row sm:w-[40%] sm:left-[30%]'>
              <button className='bg-transparent border-2 border-white mx-[auto] w-[200px] py-[10px] hover:bg-gradient-to-r hover:from-white hover:to-white hover:text-black '>Women</button>
              <button className='bg-transparent border-2 border-white mx-[auto] w-[200px] py-[10px] hover:bg-gradient-to-r hover:from-white hover:to-white hover:text-black '>Men</button>
            </div>
          </div>
        </section>


        <div className='flex items-center  justify-between m-[30px]'>
          <div className='h-[1px] border-b-[1px] w-[35%] border-gray-200'></div>
          <p className='text-center text-[2em] font-serif'>Choose a department</p>
          <div className='h-[1px] border-b-[1px] w-[35%] border-gray-200'></div>
        </div>
        
        <section>
          <div className='flex gap-[10px] justify-between flex-wrap w-[100%] px-[40px]'>
            {
              dataCategory && dataCategory.map((item,i)=>{
                return <div key={i} className='w-[100%]  md:w-[49%] relative'>
                <img src={imgsfordeps[i]} alt="" />
                <p className='absolute text-white top-1/2 left-[44%] font-serif text-[2em]'>{item.name}</p>
              </div>
              })
            }
          </div>
        </section>
      </main>
    </>
  )
}

export default Main
