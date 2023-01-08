import React, { useEffect, useState} from 'react';
import axios from 'axios';
import Rides from './Rides';
import MyReq from './MyReq';
import axiosInstance from '../axios';

export default function MyRides() {
    const [loading,setLoading] = useState(true);
    const [data, setData] = useState([]);
    const parseJwt= (token)=> {
        if (!token) { return; }
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace('-', '+').replace('_', '/');
        return JSON.parse(window.atob(base64));
    }
    
    const user_obj = parseJwt(localStorage.getItem('access_token'))



    const [loading2,setLoading2] = useState(true);
    const [data2, setData2] = useState([]);


    
    useEffect(() => {
        const fetchData = async () =>{
            setLoading(true);
            try {
                const {data: response} = await axios.get('http://localhost:8000/api/requests/?req_by=3&req_to=');

                setData2(response);
                setLoading2(false);
            } catch (error) {
                console.error(error.message);
            }
        }

        fetchData();
    }, []);
    
    useEffect(() => {
        const fetchData = async () =>{
            setLoading(true);
            try {
                const {data: response} = await axiosInstance.get('rides/?host=&group='+user_obj.user_id);
                setData(response);
                setLoading(false);
            } catch (error) {
                console.error(error.message);
            }
        }

        fetchData();
    }, []);

    console.log(data,data2,'hi there')

    return (
        <div>
            {(loading && loading2) && <p>Loading</p>}
            {(!loading && !loading2) && (
                <div>
                    <div className='confirmed'>
                        <h2>Confirmed Rides</h2>
                        {data.map((item) => (
                            <Rides key={item.id} src={item.src} dst={item.dst} price={item.price} date={item.date_time} seats={item.seats} host={item.host} uber={item.uber} id={item.id} group={item.group}/>
                        ))}
                    </div>
                    <div className='requests'>
                        <h2>My Requests</h2>
                        {data2.map((item) => (
                            <MyReq key={item.id} req_by={item.req_by} req_to={item.req_to} text_req={item.text_req}/>
                            
                        ))}
                    </div>
                </div>
            )}

        </div>
    )
}
