import React, { useEffect, useState} from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css'

function GetUser(props) {
    const [loading,setLoading] = useState(true);
    const [data, setData] = useState([]);
    useEffect(() => {
        const fetchData = async () =>{
            setLoading(true);
            try {
                const {data: response} = await axios.get('http://127.0.0.1:8000/api/users/'+props.id+'/');
                setData(response);
            } catch (error) {
                console.error(error.message);
            }
            setLoading(false);
        }

        fetchData();
    }, []);

    
    return (
        <p>{data.username}</p>
    )
}

export default GetUser