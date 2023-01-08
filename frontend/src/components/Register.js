import React,{useState} from "react";
import axiosInstance from "../axios";
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css'


function Register() {
    const navigate = useNavigate();
    const initialFormData = Object.freeze({
        username:'',
        password:''
    });

    const [formData,updateFormData] = useState(initialFormData);

    const handleChange = (e) => {
        updateFormData({
            ...formData,
            [e.target.name]:e.target.value.trim()
        })
    }
    
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData,'this is data submitted');
        axiosInstance.post('users/',{
            username:formData.username,
            password:formData.password,
        }).then((res)=>{
            navigate('/')
            console.log(res);
            console.log(res.data);
        })
    }

    return (
        <div>
            <h1>Create an Account</h1>
            <br/>
            <br/>
            <form>
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input type="text" className="form-control" id="username" placeholder="Enter Username" name ='username' onChange={handleChange}></input>
                </div>
                <br/>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" className="form-control" id="password" placeholder="Enter Password" name='password' onChange={handleChange}></input>
                </div>
                <br/>
                <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Submit</button>
            </form>
        </div>
    )
}

export default Register