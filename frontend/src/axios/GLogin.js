import axios from "axios";

// const baseURL = 'http://localhost:8000/api/';
const baseURL = 'http://127.0.0.1:8000/api/'



const GLogin = (res) => {
    axios.post('http://127.0.0.1:8000/auth/convert-token',{
        token: res,
        backend: 'google-oauth2',
        grant_type: 'convert_token',
        client_id:'4XYcDuzMX0dE065xKJxXE6B1znigtuGvxceLI9Z6',
        client_secret:'9Q4ff4iCLRoqKxm1qdwUhKul7ivEiaWb6doo9urhTd4N6cJOsrOxfUGYTkEi9TllgM1dY2VzlgnKnd1rokMHDuYuw0bIQpBJ8SzwvvXfC8cZ4iNnFonD5pxpVYz4N5Uk'
    }).then((res2)=>{
        localStorage.setItem('access_token',res2.data.access_token)
        localStorage.setItem('refresh_token',res2.data.refresh_token)
    });
    
};


export default GLogin;