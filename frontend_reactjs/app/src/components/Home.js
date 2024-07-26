import React, { useEffect } from 'react';
import gsap from 'gsap';

const Home = () => {
  useEffect(() => {
    gsap.fromTo('.home_header', 
      { opacity: 0, y: -50 }, 
      { opacity: 1, y: 0, duration: 1, delay: 1 }
    );

    gsap.fromTo('.home_text', 
      { opacity: 0, y: 50 }, 
      { opacity: 1, y: 0, duration: 1.2, delay: 2 }
    );
  }, []);

  return (
    <div className="w-full max-w-screen-lg mx-auto p-8 flex flex-col lg:flex-row items-center justify-between space-y-8 lg:space-y-0 lg:space-x-8">
      <div className="flex-1 lg:mr-8">
        <h1 className="text-2xl lg:text-3xl font-bold mb-4 home_header">Welcome to ThriftAll Around</h1>
        <p className="text-base lg:text-lg leading-relaxed home_text">
          I created this platform to connect people globally through the joy of thrifting. My website allows users from around the world to discover and purchase unique, second-hand clothing from any location. Explore curated collections and find hidden gems that tell a story, all from the comfort of your home.
        </p>
      </div>
      <div className="flex-1 hidden lg:block">
        <img
          src="/images/home_banner.jpg"  
          alt="Thrift Banner"
          className="w-full h-auto rounded-lg"
        />
      </div>
    </div>
  );
}

export default Home;
