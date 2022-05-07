import React from 'react';
import { Outlet } from 'react-router-dom';

import { Bottombar, Navbar, Sidebar } from './components';

function App() {
  return (
    <div className='App'>
      <Navbar />
      <Sidebar />
      <Outlet />
      <Bottombar />
    </div>
  );
}

export default App;
