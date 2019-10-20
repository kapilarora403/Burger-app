import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-burger-app-6d0cc.firebaseio.com/'
});

export default instance;