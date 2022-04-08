import axios from 'axios';

function axiosGet(url, params) {
    return axios.get(url, {
        params,
    });
}

export default axiosGet;
