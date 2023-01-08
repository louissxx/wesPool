import React, { useEffect, useState} from 'react';
import SearchForm from './SearchForm'
import Rides from './Rides';
import '../styles/search.css'
import axiosInstance from '../axios';

function Home() {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([])

    useEffect(() => {
        const fetchData = async () =>{
            setLoading(true);
            try {
                const {data: response} = await axiosInstance.get('http://127.0.0.1:8000/api/rides/');
                setData(response);
                setLoading(false);
            } catch (error) {
                console.log('not logged in')
            }
        }

        fetchData();
    }, []);

    return (
      <div className='find-a-ride'>
        <SearchForm/>
        {loading && <div>Loading / You may not be logged in</div>}
        {!loading && (
          <div className='ridesDB'>
            {data.map((item) => (
                          <Rides key={item.id} src={item.src} dst={item.dst} price={item.price} date={item.date_time} seats={item.seats} host={item.host} uber={item.uber} id={item.id} group={item.group}/>
                      ))}
          </div>
        )}
      </div>
    )
}

export default Home