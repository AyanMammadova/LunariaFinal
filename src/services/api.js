import axios from "axios"

async function getDataCategories() {
    const res=await axios.get('https://ecommerse.apasni.me/categories/all')
    return res.data
}
async function getDataByCategory() {
    const res=await axios.get(`https://ecommerce.ibradev.me/products/all?categoryId=2}`)
    return res.data
}


export {
    getDataCategories,
    getDataByCategory

}
