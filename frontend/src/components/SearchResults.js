import React, { useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Rides from './Rides';
import '../styles/search.css';

function SearchResults() {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([])
    const {srcID , dstID, dateID } = useParams()


    // const [src, setSrc] = useState('');
    // const [dst, setDst] = useState('');
    // const [startDate, setStartDate] = useState(new Date());

    // const navigate = useNavigate();
    // const initialFormData = Object.freeze({
    //     src:'',
    //     dst:'',
    //     date:''
    // });

    const getUrl = (srcID,dstID,dateID) =>{
      console.log(srcID,dstID)
      let url = '?'
      let d = {}
      if(srcID){
        d[srcID.substring(1,4)] = srcID.substring(1,4)+'='+srcID.substring(4)
      }
      if(dstID){
        d[dstID.substring(1,4)] = dstID.substring(1,4)+'='+dstID.substring(4)
      }
      let prepend = ['src','dst','date_time']
      for(let i=0;i<3;i++){
        if(d[prepend[i]]){
          url+=d[prepend[i]]
          if(i<2){
            url+='&';
          }
        }else{
          url+=prepend[i]+'='
          if(i<2){
            url+='&';
          }
        }
      }

      return url

    }

    // const [formData,updateFormData] = useState(initialFormData);

    // const handleLocation = (e) => {
    //     if(e.target.name==='src'){
    //         setSrc(e.target.value)
    //         updateFormData({
    //             ...formData,
    //             src:e.target.value
    //         })
    //     }else{
    //         setDst(e.target.value)
    //         updateFormData({
    //             ...formData,
    //             dst:e.target.value
    //         })
    //     }
    // }

    // const handleLocationSelect = (place,s) => {
    //     if(s){
    //         setSrc(place.formatted_address)
    //         updateFormData({
    //             ...formData,
    //             src:place.formatted_address
    //         })
    //     }else{
    //         setDst(place.formatted_address)
    //         updateFormData({
    //             ...formData,
    //             dst:place.formatted_address
    //         })
    //     }
    // }
    
    // const handleDateChange = (date) => {
    //     setStartDate(date)
    //     updateFormData({
    //         ...formData,
    //         date:date
    //     })
    // }

    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     console.log(formData,'this is data submitted./...');
    // }

    useEffect(() => {
        const fetchData = async () =>{
            setLoading(true);
            const url = getUrl(srcID,dstID,dateID)
            try {
                const {data: response} = await axios.get('http://127.0.0.1:8000/api/rides/'+url);
                setData(response);
            } catch (error) {
                console.error(error.message);
            }
            setLoading(false);
        }

        fetchData();
    }, []);

    return (
      <div className='find-a-ride'>
        {loading && <div>Loading</div>}
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

export default SearchResults