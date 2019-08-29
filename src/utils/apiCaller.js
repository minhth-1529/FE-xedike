import axios from 'axios';
import { API_URL } from 'constants/config';

const apiCaller = (endPoint, method = 'GET', body) => {
    return axios({
        method: method,
        url: `${API_URL}/${endPoint}/`,
        data: body
    });
};

export default apiCaller;
