import axios from "axios";

const axiosInstance = axios.create({
    timeout: 50000,
    timeoutErrorMessage: "Request timed out. Please try again.",
})

export const apiConnector=(method,url,bodydata,headers,params)=>{
    return axiosInstance({
        method:`${method}`,
        url:`${url}`,
        data:bodydata?bodydata:null,
        params:params?params:null,
        headers:headers?headers:null
    })

}
