import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import DatePicker from "react-datepicker";
import Autocomplete from "react-google-autocomplete";
import { useNavigate } from 'react-router-dom';


import "react-datepicker/dist/react-datepicker.css";

function SearchForm() {
    const [src, setSrc] = useState('');
    const [dst, setDst] = useState('');
    const [startDate, setStartDate] = useState(new Date());

    const navigate = useNavigate();
    const initialFormData = Object.freeze({
        src:'',
        dst:'',
        date:''
    });


    const [formData,updateFormData] = useState(initialFormData);

    const handleLocation = (e) => {
        if(e.target.name==='src'){
            setSrc(e.target.value)
            updateFormData({
                ...formData,
                src:e.target.value
            })
        }else{
            setDst(e.target.value)
            updateFormData({
                ...formData,
                dst:e.target.value
            })
        }
    }

    const handleLocationSelect = (place,s) => {
        if(s){
            setSrc(place.formatted_address)
            updateFormData({
                ...formData,
                src:place.formatted_address
            })
        }else{
            setDst(place.formatted_address)
            updateFormData({
                ...formData,
                dst:place.formatted_address
            })
        }
    }
    
    const handleDateChange = (date) => {
        setStartDate(date)
        updateFormData({
            ...formData,
            date:date
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        let res = []
        for (let key in formData) {
            if(formData[key]){
                res.push(key)
            }
        }

        let url = ''
        for(let k of res) {
            let curr = '/:'+k+formData[k]
            url+=curr
        }  

        console.log(url)

        navigate('/search'+url)


        


        // axiosInstance.post('users/',{
        //     username:formData.username,
        //     password:formData.password,
        // }).then((res)=>{
        //     navigate('/')
        //     console.log(res);
        //     console.log(res.data);
        // })
    }
    return (
        <Form className='search-form'>
                {/* <Form.Label>Email address</Form.Label> */}
                <Autocomplete placeholder="Enter Pickup Location" value = {src} name ='src' onChange = {handleLocation} apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
                    onPlaceSelected={(place) => {
                        handleLocationSelect(place,1)
                    }}
                />

                {/* <Form.Label>Email address</Form.Label> */}
                {/* <Form.Control type="email" placeholder="Enter Dropoff Location" /> */}
                <Autocomplete placeholder="Enter Dropoff Location" value= {dst} name ='dst' onChange = {handleLocation} apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
                    onPlaceSelected={(place) => {
                        handleLocationSelect(place,0)
                    }}
                />
            <Form.Group controlId="formDeparture" className='departure-date'>
                <Form.Label className='label-left'>Date of Departure</Form.Label>
                <DatePicker name='date' selected={startDate} onChange={handleDateChange} onSelect={(date)=>setStartDate(date)}/>
            </Form.Group>
            {/* <Form.Group className="form-row" controlId="formLuggage">
                <Form.Label>Num of Backpacks</Form.Label>
                <Form.Control className='col-sm-10' readonly class="form-control-plaintext" id="backpack" value={backcount}/>
                <Form.Label>Num of Luggage Bag</Form.Label>
                <Form.Control className='col-sm-10' readonly class="form-control-plaintext" id="backpack" value={backcount}/>
            </Form.Group> */}
            <Button onClick = {handleSubmit} variant="primary" type="submit">
                Search
            </Button>
        </Form>
    )
}
export default SearchForm