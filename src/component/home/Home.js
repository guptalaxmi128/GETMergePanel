import React from 'react';
import Home1 from './home1/Home1';
import Home2 from './home2/Home2';
import Home3 from './home3/Home3';
import Home4 from './home4/Home4';
// import Home5 from './home5/Home5';
// import Home6 from './home6/Home6';
// import Home7 from './home7/Home7';
// import Home8 from './home8/Home8';
// import Home9 from './home9/Home9';
import Footer from './footer/Footer';

function Home() {
  return (
    <div>
      <Home1 />
      <Home2 />
      <Home3 />
      <Home4 />
      {/* <Home5 />
      <Home6 />
      <Home7 />
      <Home8 />
      <Home9 /> */}
      <Footer />
    </div>
  );
}

export default Home;
