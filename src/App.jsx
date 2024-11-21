import React, { useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import Layout from './layout/Layout'
import Main from './components/main/Main'
import ByCategory from './components/main/ByCategory'

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
        </Route>
     </Routes>
    </>
  )
}

export default App
