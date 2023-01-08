import React from 'react'
import GetUser from './GetUser';


export default function Profile() {
    const parseJwt= (token)=> {
        if (!token) { return; }
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace('-', '+').replace('_', '/');
        return JSON.parse(window.atob(base64));
    }
    
    const user_obj = parseJwt(localStorage.getItem('access_token'))
    


    return (
        <div>
            <p>Hello: </p>
            <GetUser id={user_obj.user_id}/>
        </div>
    )
}
