// axios 보관소
import axios from 'axios';

export default axios.create({
    baseURL: 'http://localhost:5000', // 서버주소
});
