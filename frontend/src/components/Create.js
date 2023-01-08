import React, { useEffect, useState, Component} from 'react';
import DatePicker from "react-datepicker";
import Form from 'react-bootstrap/Form';
import Autocomplete from "react-google-autocomplete";
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import axiosInstance from "../axios"
import axios from 'axios';
import {Card, FormGroup} from 'react-bootstrap'

function Create() {

    const [src, setSrc] = useState('');
    const [dst, setDst] = useState('');
    const [startDate, setStartDate] = useState(new Date());
    const [count, setCount] = useState(1);
    const [isUber, setIsUber] = useState(false);
    const [seats, setSeats] = useState(1);
    const [luggage, setLuggage] = useState(0);
    const [price, setPrice] = useState(0);


    const navigate = useNavigate();
    const initialFormData = Object.freeze({
        uber:isUber,
        src:src,
        dst:dst,
        date:startDate,
        seats:seats,
        luggage:luggage,
        price:price,
        group:[12],
        host:null,
    });

    const [formData,updateFormData] = useState(initialFormData);


    const handleLocationSelect = (place,s) => {
        console.log(place)
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

    const handleDateChange = (e) => {
        setStartDate(e)
        updateFormData({
            ...formData,
            date:e
        })
    }


    const handleChange = (e) => {
        let name = e.target.name;
        console.log(name)
        switch(name){
            case 'uber':
                if(e.target.value==="on"){
                    setIsUber(true)
                    updateFormData({
                        ...formData,
                        uber:true
                    })
                }else{
                    setIsUber(false)
                    updateFormData({
                        ...formData,
                        uber:false
                    })
                }
                
                break;
            case 'src':
                setSrc(e.target.value)
                updateFormData({
                    ...formData,
                    src:e.target.value
                })
                break;
            case 'dst':
                setDst(e.target.value)
                updateFormData({
                    ...formData,
                    dst:e.target.value
                })
                break;
            case 'date':
                console.log(e.target.value,'?')
                setStartDate(e.target.value)
                updateFormData({
                    ...formData,
                    date:e.target.value
                })
                break;
            case 'seats':
                setSeats(e.target.value)
                updateFormData({
                    ...formData,
                    seats:e.target.value
                })
                break;
            case 'luggage':
                setLuggage(e.target.value)
                updateFormData({
                    ...formData,
                    luggage:e.target.value
                })
                break;
            case 'price':
                setPrice(e.target.value)
                updateFormData({
                    ...formData,
                    price:e.target.value
                })
                break;
            default:
                break;
        }
    }


    const handleSubmit = (e) => {
        // const parseJwt= (token)=> {
        //     if (!token) { return; }
        //     const base64Url = token.split('.')[1];
        //     const base64 = base64Url.replace('-', '+').replace('_', '/');
        //     return JSON.parse(window.atob(base64));
        // }
        
        // const user_obj = parseJwt(localStorage.getItem('access_token'))
        const user_token = localStorage.getItem('access_token')


        if(user_token){
            formData.host = user_token
            console.log("HUUU")
            axiosInstance.post('rides/',{
                date_time:"2023-01-07T19:07:40Z",
                src:formData.src,
                dst:formData.dst,
                group:[12],
                seats:formData.seats,
                price:formData.price,
                uber:formData.uber,
                host:formData.host,
            }).then((res)=>{
                navigate('/')
                alert('post succesful')
            }).catch(()=>alert('oop'))
            console.log(formData)
            // navigate('/maps/:'+formData)
        }else{
            alert("you are not logged in")
        
        }

    }
    return (
        <Form className='create-form'>
            <Form.Check 
                type='checkbox'
                id='isUber'
                label='is this an Uber Pool?'
                onChange={handleChange}
                className='isUber'
                name='uber'
            />
            {/* <Form.Label>Email address</Form.Label> */}
            <Autocomplete placeholder="Enter Pickup Location" name ='src' onChange = {handleChange} apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
                onPlaceSelected={(place) => {
                    handleLocationSelect(place,1)
                }}
            />

                {/* <Form.Label>Email address</Form.Label> */}
                {/* <Form.Control type="email" placeholder="Enter Dropoff Location" /> */}
            <Autocomplete placeholder="Enter Dropoff Location" name ='dst' onChange = {handleChange} apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
                onPlaceSelected={(place) => {
                    handleLocationSelect(place,0)
                }}
            />
            <Form.Group controlId="formDeparture" className='departure-date' id='date-picker-create'>
                <Form.Label>Date and Time of Departure</Form.Label>
                <DatePicker
                    name='date'
                    selected={startDate}
                    onChange={handleDateChange}
                    showTimeSelect
                    timeFormat="HH:mm"
                    timeIntervals={15}
                    timeCaption="time"
                    dateFormat="MMMM d, yyyy h:mm aa"
                    onSelect={(date) => setStartDate(date)}
                />
            </Form.Group>
            <FormGroup className='row-one'>
                <FormGroup className='num-seats'>
                    <Form.Label>Seats Available</Form.Label>
                    {/* <Form.Control name='seats' value={seats} onChange={handleChange}/> */}
                    <select name="seats" value={seats} onChange={handleChange} className='select-container'>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                    </select>
                </FormGroup>
                <FormGroup className='luggage-space'>
                    <Form.Label>Luggage Space</Form.Label>
                    {/* <Form.Control name='luggage' value={luggage} onChange={handleChange}/> */}
                    <select name="luggage" value={luggage} onChange={handleChange} className='select-container'>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                    </select>
                </FormGroup>
            </FormGroup>
            <FormGroup className='row-two'>
                <Form.Label>Price Total</Form.Label>
                <Form.Control name = 'price' value={price} onChange={handleChange}/>
            </FormGroup>




            <Button onClick={handleSubmit} type="button">
                Procceed
            </Button>
        </Form>



                
    )
}

export default Create