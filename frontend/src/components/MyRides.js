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
    
    const user_token = localStorage.getItem('access_token')



    const [loading2,setLoading2] = useState(true);
    const [data2, setData2] = useState([]);


    const [view, setView] = useState(<div className='test-not-show'>view1</div>);
    const [select, setSelect] = useState('form-button-select');
    const [isSelected,setIselected] = useState(false)
  
    function changeView(n) {
        console.log(n,'hi')
        if(!isSelected){
            setView(<div className='test-show'>view1</div>)
            setSelect('view-button-unselect')
            setIselected(true)
        }else{
            setView(<div className='test-not-show'>view1</div>)
            setSelect('view-button-select')
            setIselected(false)
        }
  
    }


    
    useEffect(() => {
        const fetchData = async () =>{
            setLoading(true);
            try {
                const {data: response} = await axiosInstance.get('requests/?req_by=3&req_to=');

                setData2(response);
                setLoading2(false);
            } catch (error) {
                console.error(error.message);
                setLoading(false);
            }
        }

        fetchData();
    }, []);
    
    useEffect(() => {
        const fetchData = async () =>{
            setLoading(true);
            try {
                const {data: response} = await axiosInstance.get('rides/?host='+user_token+'&group='+user_token);
                setData(response);
                setLoading(false);
            } catch (error) {
                console.error(error.message);
            }
        }

        fetchData();
    }, []);

    console.log(data,data2,'hi there')

    const handleDelete = (e) =>{
        console.log(e)
    }

    return (
        // <div>
        //     {(loading && loading2) && <p>Loading</p>}
        //     {(!loading && !loading2) && (
        //         <div>
        //             <div className='Rides'>
        //                 <h2>Rides</h2>
        //                 {data.map((item) => (
        //                     <Rides key={item.id} src={item.src} dst={item.dst} price={item.price} date={item.date_time} seats={item.seats} host={item.host} uber={item.uber} id={item.id} group={item.group}/>
        //                 ))}
        //             </div>
        //             <div className='Requests'>
        //                 <h2>My Requests</h2>
        //                 {data2.map((item) => (
        //                     <MyReq key={item.id} req_by={item.req_by} req_to={item.req_to} text_req={item.text_req}/>
                            
        //                 ))}
        //             </div>
        //         </div>
        //     )}

        // </div>
        <div>
            {(loading) && <p>Loading</p>}
            {(!loading) && (
                <div className='Rides'>
                    <h2>Your Rides</h2>
                        {data.map((item) => (
                            <div key={item.id}>
                                <Rides src={item.src} dst={item.dst} price={item.price} date={item.date_time} seats={item.seats} host={item.host} uber={item.uber} id={item.id} group={item.group}/>
                                <div className='view-buttons'>
                                    <button id = {item.id} className = {select} name = 'edit' onClick={changeView}>Edit</button>
                                    <button id = {item.id} className = {select} name = 'delete' onClick={handleDelete}>Delete</button>
                                </div>
                                {view}
                            </div>
                        ))}
                </div>
            )}

        </div>
    )
}
