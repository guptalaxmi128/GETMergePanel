import React from 'react';

import Navbar from "../Navigation/Navbar";
// import Navbar from '../Navbar/Navbar';
import Home from "../home/Home";

function LandingPage() {
    return (
        <div className='App'>
           
            <Navbar />
          <Home />
        </div>
    );
}



export default LandingPage;