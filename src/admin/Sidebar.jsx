// Sidebar.js
import React from 'react';

const Sidebar = ({ setActiveComponent , activeComponent}) => {
  return (
    <div className="sidebar">
      <ul className='text-white'>
        <li  className={`px-2 py-1 my-4 rounded-md cursor-pointer ${
activeComponent === 'add-question' ? 'bg-accent text-white font-semibold' : 'hover:bg-gray-800'
          }`} onClick={() => setActiveComponent('add-question')}>Add Question</li>

        <li className={`px-2 py-1 my-4 rounded-md cursor-pointer ${activeComponent === 'manage-questions' ? 'bg-accent text-white' : 'hover:bg-gray-800' }`}
         onClick={() => setActiveComponent('manage-questions')}>Manage Questions</li>

        <li className={`px-2 py-1 my-4 rounded-md cursor-pointer ${activeComponent === 'pass-mark' ? 'bg-accent text-white' : 'hover:bg-gray-800' }`} onClick={() => setActiveComponent('pass-mark')}>Pass Mark Setting</li>
      </ul>
    </div>
  );
};

export default Sidebar;