import React, { useState, useEffect } from 'react';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import { gapi } from 'gapi-script';
import GLogin from '../axios/GLogin';
import { useNavigate } from 'react-router-dom';

// function Login() {
//     const navigate = useNavigate();
//     const initialFormData = Object.freeze({
//         username:'',
//         password:''
//     });

//     const [formData,updateFormData] = useState(initialFormData);

//     const handleChange = (e) => {
//         updateFormData({
//             ...formData,
//             [e.target.name]:e.target.value.trim()
//         })
//     }
    
//     const handleSubmit = (e) => {
//         e.preventDefault();
//         console.log(formData,'this is data submitted');
//         axiosInstance.post('token/',{
//             username:formData.username,
//             password:formData.password,
//         }).then((res)=>{
//             localStorage.setItem('access_token',res.data.access);
//             localStorage.setItem('refresh_token',res.data.refresh);
//             axiosInstance.defaults.headers['Authorization'] = 'JWT '+localStorage.getItem('access_token');
//             navigate('/')
//         })
//     }

//     return (
//         <div>
//             <h1>Login</h1>
//             <br/>
//             <br/>
//             <form>
//                 <div className="form-group">
//                     <label htmlFor="username">Username</label>
//                     <input type="text" className="form-control" id="username" placeholder="Enter Username" name = 'username' onChange={handleChange}></input>
//                 </div>
//                 <br/>
//                 <div className="form-group">
//                     <label htmlFor="password">Password</label>
//                     <input type="password" className="form-control" id="password" placeholder="Enter Password" name='password' onChange={handleChange}></input>
//                 </div>
//                 <br/>
//                 <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Submit</button>
//             </form>
//         </div>
//     )
// }

// function Login(){

//     const clientId = '928202289442-9cin1krc6r8upqfj4uusmm6gu05eb40b.apps.googleusercontent.com'
//     // console.log(clientId)
//     // const onSuccess = (res) => {
//     //     console.log('success:', res);
//     // };
//     // const onFailure = (err) => {
//     //     console.log('failed:', err);
//     // };
//     // return (
//     //    <GoogleLogin
//     //       clientId={clientId}
//     //       buttonText="Sign in with Google"
//     //       onSuccess={onSuccess}
//     //       onFailure={onFailure}
//     //       cookiePolicy={'single_host_origin'}
//     //       isSignedIn={true}
//     //     />
//     // );
//     const [profile, setProfile] = useState([]);
//     const [loggedIn, setLogin] = useState(false)
//     useEffect(() => {
//         const initClient = () => {
//             gapi.client.init({
//                 clientId: clientId,
//                 scope: ''
//             });
//         };
//         gapi.load('client:auth2', initClient);
//     });

//     const onSuccess = (res) => {
//         console.log(res,'this is what i got')
//         setProfile(res.profileObj);
//         setLogin(true)
//     };

//     const onFailure = (err) => {
//         console.log('failed', err);
//     };

//     const logOut = () => {
//         setProfile(null);
//         setLogin(false)
//     };

//     return (
//         <div>
//             <h2>React Google Login</h2>
//             <br />
//             <br />
//             {!loggedIn && (
//                 <GoogleLogin
//                     clientId={clientId}
//                     buttonText="Sign in with Google"
//                     onSuccess={onSuccess}
//                     onFailure={onFailure}
//                     cookiePolicy={'single_host_origin'}
//                     isSignedIn={true}
//                 />
//             )}
            
            
            
//             {loggedIn &&
//                 (
//                     <div>
//                         <h3>User Logged in</h3>
//                         <p>Name: {profile.name}</p>
//                         <p>Email Address: {profile.email}</p>
//                         <GoogleLogout clientId={clientId} buttonText="Log out" onLogoutSuccess={logOut} />
//                     </div>
//                 )
            
//             }
//         </div>
//     );
// }

// export default Login;


function Login(){
    const navigate = useNavigate();
    const clientId = '928202289442-9cin1krc6r8upqfj4uusmm6gu05eb40b.apps.googleusercontent.com'
    // console.log(clientId)
    // const onSuccess = (res) => {
    //     console.log('success:', res);
    // };
    // const onFailure = (err) => {
    //     console.log('failed:', err);
    // };
    // return (
    //    <GoogleLogin
    //       clientId={clientId}
    //       buttonText="Sign in with Google"
    //       onSuccess={onSuccess}
    //       onFailure={onFailure}
    //       cookiePolicy={'single_host_origin'}
    //       isSignedIn={true}
    //     />
    // );
    const [profile, setProfile] = useState([]);
    const [loggedIn, setLogin] = useState(false)
    useEffect(() => {
        const initClient = () => {
            gapi.auth2.init({
                clientId: clientId,
                scope: ''
            });
        };
        gapi.load('client:auth2', initClient);
    });

    const onSuccess = (res) => {
        console.log(res,'this is what i got')
        setProfile(res.profileObj);
        setLogin(true)
        GLogin(res.accessToken)
    };

    const onFailure = (err) => {
        console.log('failed', err);
    };

    const logOut = () => {

        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        setProfile(null);
        setLogin(false)
        navigate('/')
        


    };

    return (
        <div>
            <h2>React Google Login</h2>
            <br />
            <br />
            {!loggedIn && (
                <GoogleLogin
                    clientId={clientId}
                    buttonText="Sign in with Google"
                    onSuccess={onSuccess}
                    onFailure={onFailure}
                    cookiePolicy={'single_host_origin'}
                    // isSignedIn={true}
                />
            )}
            
            
            
            {loggedIn &&
                (
                    <div>
                        <h3>User Logged in</h3>
                        <p>Name: {profile.name}</p>
                        <p>Email Address: {profile.email}</p>
                        <GoogleLogout clientId={clientId} buttonText="Log out" onLogoutSuccess={logOut} />
                    </div>
                )
            
            }
        </div>
    );
}

export default Login;