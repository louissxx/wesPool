import React, { useEffect, useState} from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Rides from './Rides';
import ReqForm from './ReqForm';
import axiosInstance from '../axios';
import CreateEdit from './CreateEdit.js';
import { useNavigate } from 'react-router-dom';
import GetUser from './GetUser';

//I will make another call to the API, is there a way to avoid this since I already called it before

export default function RideInfo() {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const {id} = useParams();
    const [view, setView] = useState();
    const [select, setSelect] = useState('form-button-select');
    const [isSelected,setIselected] = useState(false)
    const navigate = useNavigate();

    const [loadingUser,setLoadingUser] = useState(true);


    const [viewJoin, setViewJoin] = useState();
    const [selectJoin, setSelectJoin] = useState('form-button-select');
    const [isSelectedJoin,setIselectedJoin] = useState(false)
    const [userId, setUserId] = useState();
    const [reqs, setReqs] = useState();


    useEffect(() => {
        const fetchData = async () =>{
            setLoading(true);
            setLoadingUser(true);
            try {
                // const {data: response} = await axios.get('http://localhost:8000/api/rides/'+id);
                const {data: response} = await axiosInstance.get('rides/'+id);
                const response2 = await axiosInstance.get('users/'+response.host+'/');
                const response3 = await axiosInstance.get('requests/?req_to='+response.id);
                setReqs(response3.data)
                setUserId(response2.data.username)
                setData(response);
                console.log(response3.data)
            } catch (error) {
                console.error(error.message);
            }
            setLoading(false);
            setLoadingUser(false);
        }
  
        fetchData();
    }, [setData]);

    // useEffect(() => {
    //     const fetchData = async () =>{
    //         try {
    //             // const {data: response} = await axios.get('http://localhost:8000/api/rides/'+id);
    //             const response = await axiosInstance.get('users/'+data.host+'/');
    //             console.log(response)

    //         } catch (error) {
    //             console.error(error.message);
    //         }
    //     }
  
    //     fetchData();
    // }, [setUserId]);


    function changeView(n) {
        if(!isSelected){
            setView(<CreateEdit data={data}/>)
            setSelect('view-button-unselect')
            setIselected(true)
        }else{
            setView()
            setSelect('view-button-select')
            setIselected(false)
        }
  
    }

    function changeViewJoin(n){
        if(!isSelectedJoin){
            setViewJoin(<ReqForm data={data}/>)
            setSelectJoin('form-button-unselect')
            setIselectedJoin(true)
        }else{
            setViewJoin()
            setSelectJoin('form-button-select')
            setIselectedJoin(false)
        }

    }

    const handleDelete = (e) =>{
        const user_token = localStorage.getItem('access_token')
        if(user_token){
            // console.log("HUUU")
            axiosInstance.delete('rides/'+data.id+'/',{
                data:{
                    id:data.id
                }
            }).then((res)=>{
                navigate('/')
                alert('post succesful')
            }).catch(()=>alert('oop'))
            // navigate('/maps/:'+formData)
        }else{
            alert("you are not logged in")
        
        }
    }

    const handleSub = (e) => {
        console.log(e.target.name)
        for(const req of reqs){
            console.log(req.id,e.target.name,'what',req.req_by,req.req_to)
            if(req.id==e.target.name){
                console.log(req.req_to,req.req_by,'HUH')
                axiosInstance.put('rides/'+req.req_to+'/',{
                    req_by:req.req_by,
                    id:req.req_to
                }).then((res)=>{
                    handleReqDel(e.target.name)
                    navigate('/')
                    alert('post succesful')
                }).catch(()=>alert('oop'))
            }
        }
    }

    const handleReqDel=(e)=>{
        axiosInstance.delete('requests/'+e+'/',{
            data:{
                id:e
            }
        }).then((res)=>{
            alert('req deleted')
        }).catch(()=>alert('not deleted ):'))
    }

    const handleDel=(e)=>{
        axiosInstance.delete('requests/'+e.target.name+'/',{
            data:{
                id:e.target.name
            }
        }).then((res)=>{
            alert('req deleted')
        }).catch(()=>alert('not deleted ):'))
    }

    return (
        <div>
            {(loading && loadingUser) && <div>Loading / You may not be logged in</div>}
            {(!loading && !loadingUser) && (
                <div>
                    <Rides key={data.id} src={data.src} dst={data.dst} price={data.price} date={data.date_time} seats={data.seats} host={data.host} uber={data.uber} id={data.id} group={data.group}/>
                    {localStorage.getItem('username')===userId && (
                        <div>
                            <div className='view-buttons'>
                                <button className = {select} name = 'edit' onClick={changeView}>Edit</button>
                                <button name = 'delete' onClick={handleDelete}>Delete</button>
                            </div>
                            <h3>Pending Requests</h3>
                                {reqs.map((item) => (
                                    <div key={item.id} className='req_by_info'>
                                        <GetUser id={item.req_by}/>
                                        <p>{item.text_req}</p>
                                        <div>
                                            <button name={item.id} onClick={handleSub}>Accept</button>
                                            <button name={item.id} onClick={handleDel}>Reject</button>
                                        </div>
                                    </div>
                                ))}
                            {view}
                        </div>)}
                    {localStorage.getItem('username')!==userId && (
                        <div>
                            <button name = 'join' className = {selectJoin} onClick={changeViewJoin}>Join</button>
                            {viewJoin}
                        </div>)}
                </div>
            )}
        </div>
    )
}
