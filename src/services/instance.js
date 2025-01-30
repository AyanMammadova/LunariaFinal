import axios from "axios";
import ConfigObj from "../config/config";

const axiosInstance = axios.create({
    baseURL: ConfigObj.baseUrl,
    headers: { 
        "Content-Type":"application/json"
     }
})


export default axiosInstance