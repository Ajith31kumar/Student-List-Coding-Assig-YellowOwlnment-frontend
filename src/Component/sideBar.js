import React from 'react';
import './sidebar.css';

function SideBar() {
  return (
    <div className='sidebar'>
      <div className='profile'>
        <div className='pic'></div>
        <div className='text'>
          <div className='yellow-owl'>Yellow Owl</div>
          <div className='admin'>Admin</div>
        </div>
      </div>
    </div>
  );
}

export default SideBar;
