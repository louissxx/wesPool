import axios from "axios";

// const baseURL = 'http://localhost:8000/api/';
const baseURL = 'http://127.0.0.1:8000/api/'



const GLogin = (res) => {
    axios.post('http://127.0.0.1:8000/auth/convert-token',{
        token: res,
        backend: 'google-oauth2',
        grant_type: 'convert_token',
        client_id:process.env.REACT_APP_client_id,
        client_secret:process.env.REACT_APP_client_secret
    }).then((res2)=>{
        console.log(res2)
        localStorage.setItem('access_token',res2.data.access_token)
        localStorage.setItem('refresh_token',res2.data.refresh_token)
    });
    
};


export default GLogin;