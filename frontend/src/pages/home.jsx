import Navbar from "../components/Navbar"
import React from 'react'


import { WeatherForm } from "../components/weatherForm";


const Home = () => {

  const [pos, setPos] = React.useState({ x: 0, y: 0 });

  const handleMove = (e) => {
    const rect = e.target.getBoundingClientRect();
    setPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  
  return (
    <main className="homescreen h-screen w-full">
        <Navbar />
        
        <section className="hero_section text-white font-bold flex flex-col items-center gap-4 mt-40">
          <h1 className="welcome-text text-3xl font-light font-(family-name:--font-secondary)">Welcome to</h1>
          <div className="logo_animation flex items-center justify-center relative">
            <h1 className="sun_animation text-[112px] hover:cursor-pointer max-lg:hidden">☀️</h1>
            <h1 
            style={{
              "--x": `${pos.x}px`,
              "--y": `${pos.y}px`,
            }}
            onMouseMove={handleMove}
            className="hero-text p-25 text-[180px] text-purple-400 font-bold max-lg:text-[60px] max-lg:p-10">
              Cloudio
            </h1>
            <h1 className="sun_animation text-[112px] hover:cursor-pointer max-lg:hidden">☀️</h1>
          </div>
          
        </section>

        <section className="input_section mt-30 flex flex-col items-center gap-6 max-lg:p-4 max-lg:mt-20">
          
          <h3 className="text-white font-light text-xl font-(family-name:--font-secondary) text-center">Want to find out the weather in your city? You got us</h3>
          
          <WeatherForm />
          
        </section>
    </main>
    
  )
}

export default Home