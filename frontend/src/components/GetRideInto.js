import React, { useEffect, useState} from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css'
import axiosInstance from '../axios';
import Rides from './Rides';

export default function GetRideInto(props) {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    useEffect(() => {
        const fetchData = async () =>{
            setLoading(true);
            try {
                // const {data: response} = await axios.get('http://localhost:8000/api/rides/'+id);
                const {data: response} = await axiosInstance.get('rides/'+props.id);
                // console.log(response,'HAHSAH')
                setData(response);
            } catch (error) {
                console.error(error.message);
            }
            setLoading(false);
        }
  
        fetchData();
    }, []);
    console.log(data,'lol?')
    return (
        <div>
            {(loading) && <p>Loading</p>}
            {(!loading) && (


                <Rides src={data.src} dst={data.dst} price={data.price} date={data.date_time} seats={data.seats} host={data.host} uber={data.uber} id={data.id} group={data.group}/>
                          
            )}

        </div>
    )
}
