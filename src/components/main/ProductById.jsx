import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getProductById } from '../../services/api'

function ProductById() {
    const {proid}=useParams()
    const [product,setProduct]=useState(null)
    useEffect(()=>{
        getProductById({proid}).then(res=>{setProduct(res)})
    },[proid])
    console.log(product?.Colors[0].toLowerCase())

  return (
    <>
        <section className='pt-[160px] p-[40px] w-[100%]'>
            <div className='w-full flex justify-between border-2 border-gray-200'>
                <div>
                    <img 
                    className='h-[70vh] object-top object-cover' 
                    src={product &&  product.images[0]}
                    alt="" />
                </div>
                <div className='text-black w-[50%]'>
                    <p className='font-bold'>{product?.Brands.name}</p>
                    <p className=''>{product?.name}</p>
                    <p className=''>{product?.price} USD</p>
                    <div className=''>Color:
                        {
                            product?.Colors.map((item,i)=>{
                                return <div className={`h-[30px] rounded-full w-[30px] bg-[${item.toLowerCase()}]`}></div>
                            })
                        }
                        
                    </div>

                    
                </div>
            </div>
        </section>
   
    </>
  )
}

export default ProductById
