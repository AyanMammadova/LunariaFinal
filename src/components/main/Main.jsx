import React, { useContext } from 'react'
import { DATA } from '../../context/DataContext'

function Main() {
  const {imgsfordeps}=useContext(DATA)
  const {dataCategory}=useContext(DATA)
  return (
    <>
      <main>
        <section>
          <div className='overflow-hidden h-[80vh] w-[95%] mx-[auto] relative'>
            <img className='h-full object-cover object-top w-full  m-[auto] transition-all duration-500 hover:scale-110' src="https://tradium.ibradev.me/img/qadin.jpg" alt="" />
            <p>New Now</p>
            <div className='absolute w-[20%] bottom-[100px] left-[40%] flex gap-[20px] text-white'>
              <button className='bg-transparent border-2 border-white w-[55%] py-[10px] hover:bg-gradient-to-r hover:from-white hover:to-white hover:text-black '>Women</button>
              <button className='bg-transparent border-2 border-white w-[55%] py-[10px] hover:bg-gradient-to-r hover:from-white hover:to-white hover:text-black '>Men</button>
            </div>
          </div>
        </section>

        <p className='text-center'>Choose a department</p>
        <section>
          <div className='flex gap-[10px] justify-between flex-wrap w-[100%] px-[40px]'>
            {
              dataCategory && dataCategory.map((item,i)=>{
                return <div key={i} className='w-[100%]  md:w-[49%] relative'>
                <img src={imgsfordeps[i]} alt="" />
                <p className='absolute text-white left-[40%] top-[40%]'>{item.name}</p>
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
