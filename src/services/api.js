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
async function getDataBySubCategory(subid,page=2) {
    const res=await axios.get(`https://ecommerce.ibradev.me/products/all?subcategoryId=${subid}&page=${page}}`)
    return res.data
}
async function getDataBySubBrand(brandId,color,size) {
    const res=await axios.get(`https://ecommerce.ibradev.me/products/all?subcategoryId=2&brandId=${brandId}&color=${color}&size=${size}`)
    return res.data
}


export {
    getDataCategories,
    getDataByCategory,
    getDataBySubCategory,
    getDataAll,
    getProductById,
    getDataBySubBrand
}
