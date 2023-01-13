import '../styles/rides.css'
import React from 'react';
import GetUser from './GetUser';

// is there a way to add an event listener instead of making div an anchor tag? 


function Rides(props) {
    // console.log(props,'what in the waffle')
    const url = '/info/'+props.id.toString()

    return (
      <a href={url}>
        <div className='ride-info'>
          <div className='top-row'>
            <p>{props.src} &#8594; {props.dst}</p>
            <p>Price: {props.price}</p>
          </div>
          <div className='sec-row'>
              <p>Departure: {props.date}</p>
              <p>{props.seats} seats left</p>
          </div>
          <div className='uber'>
              <p>Uber:</p>
          </div>
          <hr></hr>
          <div className='fourth-row'>
              <div className='host'>
                <p>Host</p>
                <GetUser id={props.host}/>
              </div>
              <div className='group'>
              <p>Group</p>
              {props.group.map((user) => (
                        <GetUser key={user} id={user}/>
                      ))}
              </div>
          </div>
        </div>
      </a>
    );
}

export default Rides;