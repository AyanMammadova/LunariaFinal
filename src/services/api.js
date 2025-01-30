import axiosInstance from "./instance"

async function getDataCategories() {
    const res=await axiosInstance.get('/categories/all')
    return res.data
}

async function getDataByCategory(catid=1) {
    const res=await axiosInstance.get(`/products/all?categoryId=${catid}&limit=100`)
    return res.data
}
async function getDataAll() {
    const res=await axiosInstance.get(`/products/all?limit=100`)
    return res.data
}
async function getProductById({proid}) {
    const res=await axiosInstance.get(`/products/get/${proid}`)
    return res.data
}
async function getDataBySubCategory(subid,page=1,color,brand,size,minPrice,maxPrice) {
    const res=await axiosInstance.get(`/products/all?subcategoryId=${subid}&page=${page}${color?.length>0 ? `&color=${color?.map(item=> item).join('%2C')}` : ''}${size?.length ? `&size=${size.map(item => item).join(',')}` : ''}${brand ? `&brandId=${brand}` : ''}${minPrice? `&minPrice=${minPrice}` : ''}${maxPrice ? `&maxPrice=${maxPrice}` : ''} `)
    return res.data
}

export {
    getDataCategories,
    getDataByCategory,
    getDataBySubCategory,
    getDataAll,
    getProductById
}
