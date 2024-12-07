import React, { useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import Layout from './layout/Layout'
import Main from './components/main/Main'
import ByCategory from './components/main/ByCategory'
import ProductById from './components/main/ProductById'
import BySubCategory from './components/main/BySubCategory'
import RegisterPage from './components/login/RegisterPage'
import WishList from './components/main/WishList'
import ForgotPassword from './components/login/ForgotPassword'
import Login from './components/login/Login'
import About from './components/main/About'
import ShoppingBagPage from './components/main/ShoppingBagPage'
import CheckOut from './components/main/CheckOut'

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
          <Route path='/productsbysubcategory/:catname/:catid/:subname/:subid' element={<BySubCategory/>}/>
          <Route path='/register' element={<RegisterPage/>}/>
          <Route path='/wishlist' element={<WishList/>}/>
          <Route path='/remind' element={<ForgotPassword/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/about' element={<About/>}/>
          <Route path='/checkout' element={<CheckOut/>}/>
          <Route path='/shoppingbagpage' element={<ShoppingBagPage/>}/>

        </Route>
     </Routes>
    </>
  )
}

export default App
