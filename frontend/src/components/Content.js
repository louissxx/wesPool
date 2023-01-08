import Create from './Create';
import '../styles/content.css'
import Home from './Home';
import React, {useState} from 'react';


function Content() {
  //switch between find a ride view and offer a ride view
  const [view, setView] = useState(<Home/>);
  const [select, setSelect] = useState('view-button-select');
  const [unselect, setUnselect] = useState('view-button-unselect');

  function changeView(n) {
    switch(n.target.name) {
      case 'find':
        setView(<Home/>)
        setSelect('view-button-select')
        setUnselect('view-button-unselect')
        break;
      default:
        setView(<Create/>)
        setSelect('view-button-unselect')
        setUnselect('view-button-select')
        break;
    }

  }

  return (
    <div className='content'>
      <div className='view-buttons'>
        <button className = {select} name = 'find' onClick={changeView}>Find A Ride</button>
        <button className = {unselect} name = 'create' onClick={changeView}>Offer A Ride</button>
      </div>
      {view}
    </div>
  );
}

export default Content;