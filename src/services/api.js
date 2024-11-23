import axios from "axios"

async function getDataCategories() {
    const res=await axios.get('https://ecommerce.ibradev.me/categories/all')
    return res.data
}

async function getDataByCategory(catid) {
    const res=await axios.get(`https://ecommerce.ibradev.me/products/all?categoryId=${catid}}`)
    return res.data
}

async function getDataAll() {
    const res=await axios.get(`https://ecommerce.ibradev.me/products/all?limit=100}`)
    return res.data
}


export {
    getDataCategories,
    getDataByCategory,
    getDataAll
}
