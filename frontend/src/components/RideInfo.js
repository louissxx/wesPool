import React, { useEffect, useState} from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Rides from './Rides';
import ReqForm from './ReqForm';
import axiosInstance from '../axios';

//I will make another call to the API, is there a way to avoid this since I already called it before

export default function RideInfo() {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const {id} = useParams();
    useEffect(() => {
        const fetchData = async () =>{
            setLoading(true);
            try {
                // const {data: response} = await axios.get('http://localhost:8000/api/rides/'+id);
                const {data: response} = await axiosInstance.get('rides/'+id);
                setData(response);
            } catch (error) {
                console.error(error.message);
            }
            setLoading(false);
        }
  
        fetchData();
    }, []);

    console.log(data,'ride info')
    return (
        <div>
            {loading && <div>Loading / You may not be logged in</div>}
            {!loading && (
                <Rides key={data.id} src={data.src} dst={data.dst} price={data.price} date={data.date_time} seats={data.seats} host={data.host} uber={data.uber} id={data.id} group={data.group}/>
            )}
            {/* <ReqForm id={id}/> */}
        </div>
    )
}
