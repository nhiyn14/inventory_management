const axios = require('axios')

const AxiosInstance = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    headers: {
        'Authorization': 'Bearer ' + sessionStorage.getItem("token")
    }
});
export default AxiosInstance