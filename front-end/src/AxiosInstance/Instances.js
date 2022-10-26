const axios = require('axios')

const AxiosInstance = axios.create({
    baseURL: "http://127.0.0.1:5000",
    headers: {
        'Authorization': 'Bearer ' + sessionStorage.getItem("token")
    }
});
export default AxiosInstance