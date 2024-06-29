import axios from "axios";

const axiosApi = axios.create({
    baseURL: 'https://test-8-a7bcb-default-rtdb.europe-west1.firebasedatabase.app/                      '
});

export default axiosApi;