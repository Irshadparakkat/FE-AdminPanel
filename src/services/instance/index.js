import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://13.126.105.188:4200/',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
        
    }
});

const getInstance = async (endpoint,data,headers = {})=>{
const response = axiosInstance.get(endpoint,)
}