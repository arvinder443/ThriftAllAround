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
    <div className="w-[70vw] mx-auto flex items-center justify-between p-8">
      <div className="flex-1 mr-8">
        <h1 className="text-3xl font-bold mb-4 home_header">Welcome to ThriftAll Around</h1>
        <p className="text-lg leading-relaxed home_text">
          I created this platform to connect people globally through the joy of thrifting. My website allows users from around the world to discover and purchase unique, second-hand clothing from any location. Explore curated collections and find hidden gems that tell a story, all from the comfort of your home.
        </p>
      </div>
      <div className="flex-1">
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
