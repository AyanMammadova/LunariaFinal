import React, { useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import Layout from './layout/Layout'
import Main from './components/main/Main'
import ByCategory from './components/main/ByCategory'
import ProductById from './components/main/ProductById'
import BySubCategory from './components/main/BySubCategory'
import RegisterPage from './components/login/RegisterPage'

function App() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({
      behavior: 'smooth',
      top: 0
    })
  }, [pathname])
  return (
    <>
     <Routes>
        <Route path='/' element={<Layout/>}>
          <Route index element={<Main/>}/>
          <Route path='/productsbycategory/:catname/:catid' element={<ByCategory/>}/>
          <Route path='/productbyid/:proid' element={<ProductById/>}/>
          <Route path='/productsbysubcategory/:subname/:subid' element={<BySubCategory/>}/>
          <Route path='/register' element={<RegisterPage/>}/>

        </Route>
     </Routes>
    </>
  )
}

export default App
