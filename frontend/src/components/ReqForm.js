import React, { useState} from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import axiosInstance from "../axios"

function ReqForm(props) {
    const parseJwt= (token)=> {
        if (!token) { return; }
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace('-', '+').replace('_', '/');
        return JSON.parse(window.atob(base64));
    }
    
    const user_obj = parseJwt(localStorage.getItem('access_token'))


    const navigate = useNavigate();
    const initialFormData = Object.freeze({
        text_req:'',
        req_by:null,
        req_to:null,
    });

    const [formData,updateFormData] = useState(initialFormData);

    const handleChange = (e) => {
        updateFormData({
            ...formData,
            req_by:user_obj.user_id,
            req_to:props.id,
            [e.target.name]:e.target.value.trim()
        })
    }

    


    const handleSubmit = (e) => {
        updateFormData({
            text_req:formData.text_req,
            req_by:user_obj.user_id,
            req_to:props.id,
        })
        e.preventDefault();
        console.log(formData,'lol')
        axiosInstance.post('requests/',{
            text_req:formData.text_req,
            req_by:formData.req_by,
            req_to:formData.req_to,
        }).then((res)=>{
            navigate('/')
            console.log(res);
            console.log(res.data);
        })
    }
    return (
        <div>
            <Form>
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Additional Comments</Form.Label>
                    <Form.Control as="textarea" rows={5} name='text_req' onChange={handleChange}/>
                </Form.Group>
                <Button onClick = {handleSubmit} variant="primary" type="submit">
                    Request
                </Button>
            </Form>



                
        </div>
    )
}

export default ReqForm