import axios from "axios"
import { TbSquareForbid2 } from "react-icons/tb"

async function getDataCategories() {
    const res=await axios.get('https://ecommerce.ibradev.me/categories/all')
    return res.data
}

async function getDataByCategory(catid) {
    const res=await axios.get(`https://ecommerce.ibradev.me/products/all?categoryId=${catid}`)
    return res.data
}

async function getDataAll() {
    const res=await axios.get(`https://ecommerce.ibradev.me/products/all?limit=100`)
    return res.data
}

async function getProductById({proid}) {
    const res=await axios.get(`https://ecommerce.ibradev.me/products/get/${proid}`)
    return res.data
}
async function getDataBySubCategory(subid) {
    const res=await axios.get(`https://ecommerce.ibradev.me/products/all?subcategoryId=${subid}`)
    return res.data
}

export {
    getDataCategories,
    getDataByCategory,
    getDataBySubCategory,
    getDataAll,
    getProductById
}
