import React, { useEffect, useState} from 'react';
import axios from 'axios';
import Rides from './Rides';
import axiosInstance from '../axios';
import RideInfo from './RideInfo';
import GetRideInto from './GetRideInto';

export default function MyReq(props) {
    const [loading,setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [rideInfo, setRideInfo] = useState([]);
    const [rideLoading,setRideLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () =>{
            setLoading(true);
            try {
                const {data: response} = await axiosInstance.get('requests/');

                setData(response);
                setLoading(false);
            } catch (error) {
                console.error(error.message);
            }
        }

        fetchData();
    }, []);

    console.log(data,'hiii?')
    
    return (
        <div className='user-req'>
            {!loading && (
                <div>
                    <h2>My Requests</h2>
                            {data.map((req) => (
                                <div key={req.id}>
                                    <p>Your Comment: {req.text_req}</p>
                                    <hr></hr>
                                    <GetRideInto id={req.req_to}></GetRideInto>
                                </div>            
                            ))}
                </div>
            )}
        </div>
    )
}
