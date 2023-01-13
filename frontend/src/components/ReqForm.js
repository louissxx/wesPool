import React, { useState} from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import axiosInstance from "../axios"

function ReqForm(props) {

    
    const user_token = localStorage.getItem('access_token')


    const navigate = useNavigate();
    const initialFormData = Object.freeze({
        text_req:'',
        req_by:user_token,
        req_to:props.data.host,
    });

    const [formData,updateFormData] = useState(initialFormData);

    const handleChange = (e) => {
        updateFormData({
            ...formData,
            [e.target.name]:e.target.value.trim()
        })
    }

    


    // const handleSubmit = (e) => {

    //     axiosInstance.post('requests/',{
    //         text_req:formData.text_req,
    //         req_by:formData.req_by,
    //         req_to:formData.req_to,
    //     }).then((res)=>{
    //         // navigate('/')
    //         console.log(res);
    //         console.log(res.data);
    //     })
    //     console.log(formData,'lol')
    // }

    const handleJoin = (e) =>{
        if(user_token){
            axiosInstance.post('requests/',{
                text_req:formData.text_req,
                req_by:user_token,
                req_to:props.data.id,
            }).then((res)=>{
                alert('post succesful')
            }).catch(()=>alert('oop'))
            // navigate('/maps/:'+formData)
        }else{
            alert("you are not logged in")
        
        }
    }
    return (
        <div>
            <Form>
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Additional Comments</Form.Label>
                    <Form.Control as="textarea" rows={5} name='text_req' onChange={handleChange}/>
                </Form.Group>
                <button onClick = {handleJoin} type="button">
                    Request
                </button>
            </Form>
        </div>
    )
}

export default ReqForm