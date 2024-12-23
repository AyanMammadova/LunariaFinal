import axios from "axios"

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
async function getDataBySubCategory(subid,page=1) {
    const res=await axios.get(`https://ecommerce.ibradev.me/products/all?subcategoryId=${subid}&page=${page}}`)
    return res.data
}
async function getFilteredData(subid,color,brand,size) {
    const res=await axios.get(`https://ecommerce.ibradev.me/products/all?subcategoryId=${subid}${color ? `&color=${color}` : ''}${brand ? `&brandId=${brand}` : ''}${size ? `&size=${size}` : ''} `)
    return res.data
}

async function getbooks() {
    const res=await axios.get(`https://raw.githubusercontent.com/M-X-3112/Patagonia-data/refs/heads/main/ProductData.json`)
    return res.data
}


export {
    getDataCategories,
    getbooks,
    getDataByCategory,
    getDataBySubCategory,
    getDataAll,
    getProductById,
    getFilteredData
}
