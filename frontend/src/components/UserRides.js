import '../styles/content.css'
import React, {useState} from 'react';
import MyRides from './MyRides';
import MyReq from './MyReq';


function Content() {
  //switch between ride view and request view
  const [view, setView] = useState(<MyRides/>);
  const [select, setSelect] = useState('view-button-select');
  const [unselect, setUnselect] = useState('view-button-unselect');

  function changeView(n) {
    switch(n.target.name) {
      case 'myRides':
        setView(<MyRides/>)
        setSelect('view-button-select')
        setUnselect('view-button-unselect')
        break;
      default:
        setView(<MyReq/>)
        setSelect('view-button-unselect')
        setUnselect('view-button-select')
        break;
    }

  }

  return (
    <div className='content'>
      <div className='view-buttons'>
        <button className = {select} name = 'myRides' onClick={changeView}>My Rides</button>
        <button className = {unselect} name = 'myReq' onClick={changeView}>My Requests</button>
      </div>
      {view}
    </div>
  );
}

export default Content;