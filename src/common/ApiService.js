import axios from 'axios'

const AxiosService = axios.create({
    baseURL:"https://daily-dress-colour-women-be.onrender.com/api",
    headers:{
        'Content-Type':"application/json",
    }
})

AxiosService.interceptors.request.use(config=>{
    const token = sessionStorage.getItem('token')
    if(token)
        config.headers.Authorization = `Bearer ${token}`
    return config
})

export default AxiosService