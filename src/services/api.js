import axios from "axios"

async function getDataCategories() {
    const res=await axios.get('https://ecommerce.ibradev.me/categories/all')
    return res.data
}

async function getDataByCategory(catid) {
    const res=await axios.get(`https://ecommerce.ibradev.me/products/all?categoryId=${catid}&limit=100`)
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
async function getDataBySubCategory(subid,page=1,color,brand,size,minPrice,maxPrice) {
    const res=await axios.get(`https://ecommerce.ibradev.me/products/all?subcategoryId=${subid}&page=${page}${color?.length>0 ? `&color=${color?.map(item=> item).join('%2C')}` : ''}${size?.length ? `&size=${size.map(item => item).join(',')}` : ''}${brand ? `&brandId=${brand}` : ''}${minPrice ? `&minPrice=${minPrice}` : ''}${maxPrice ? `&maxPrice=${maxPrice}` : ''} `)
    return res.data
}


export {
    getDataCategories,
    getDataByCategory,
    getDataBySubCategory,
    getDataAll,
    getProductById
}
