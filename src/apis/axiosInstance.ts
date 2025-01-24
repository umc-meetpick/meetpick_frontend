import axios from "axios";
import.meta.env.API; 

const axiosInstance =axios.create({
    baseURL: import.meta.env.API,
})

export {axiosInstance}