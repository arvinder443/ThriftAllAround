import { Button } from '@mui/material';
import './App.css';
import { useGSAP } from '@gsap/react';
import gsap, { Power0 } from 'gsap/all';

function App() {
  useGSAP(()=>{
    gsap.to('.header',{
      opacity:1,
      delay:2,
      ease:Power0
    })
  })
  return (
    <div className="App min-h-screen bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 flex items-center justify-center">
      <header className=" header App-header text-white text-4xl font-bold p-10 bg-opacity-80 bg-gray-800
      opacity-0 rounded-lg shadow-lg">
        Hello there, I am using Tailwind CSS
        <hr/>
        <Button variant="contained">Contained</Button>

      </header>
    </div>
  );
}

export default App;
