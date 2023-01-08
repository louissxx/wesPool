import React, { useEffect, useState} from 'react';
import axios from 'axios';
import Rides from './Rides';

export default function MyReq(props) {
    const [loading,setLoading] = useState(true);
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () =>{
            setLoading(true);
            try {
                const {data: response} = await axios.get('http://127.0.0.1:8000/api/rides/'+props.req_to);
                setData(response);
                setLoading(false);
                console.log(data,'hi')
            } catch (error) {
                console.error(error.message);
            }
        }

        fetchData();
    }, []);


    
    return (
        <div className='user-req'>
            <p>Comment: {props.text_req}</p>
            <hr></hr>
            {(loading) && <p>Loading</p>}
            <div>
                {(!loading) && (
                    <div>
                        <Rides key={data.id} src={data.src} dst={data.dst} price={data.price} date={data.date_time} seats={data.seats} host={data.host} uber={data.uber} id={data.id} group={data.group}/>
                        <button className='delete-req'>Delete</button>
                    </div>
                )}
            </div>
        </div>
    )
}
