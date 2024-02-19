import axios from 'axios';
const path = import.meta.env.VITE_URL_BASESMS;
const config = {
    headers: {
        'Authorization': `Bearer ${import.meta.env.VITE_SMS_LANDING_API_KEY}`
    }
};
export default{
    SendConsult(message){
        return axios.post(path, message, config);
    }
};