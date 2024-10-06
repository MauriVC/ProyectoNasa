import React, { useEffect } from 'react';
import './Home.css';
import { Title } from '../components/Title';
import Description from '../components/Description';
import Button from '../components/Button';
const Home = () => {
useEffect(() => {
    const handleMouseMove = (e) => {
    const x = (e.clientX / window.innerWidth) * 10 - 5;
    const y = (e.clientY / window.innerHeight) * 10 - 5;
    document.querySelector('.home').style.backgroundPosition = `${50 + x}% ${50 + y}%`;
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
    window.removeEventListener('mousemove', handleMouseMove);
    };
}, []);
const goToSolarSystem = () => {
    window.location.href = "/solar-system/index.html"; 
};
return (
    <>
    <div className='home'>
    </div>
    <div className='home-content'>
        <Title title="Orrery"/>
        <Description description="
            The Orrery Web Project is an interactive 3D web application that simulates the Solar System, allowing users to explore planetary movements and celestial events in real time. Built with Three.js, it offers detailed information about planets, moons, and upcoming space events like eclipses and meteor showers. Users can interact with the 3D model, access real-time data from sources like NASA, and track astronomical events through a retractable sidebar. The project is designed for educational and entertainment purposes, providing a visually engaging way to explore astronomy on any device.
        "/>
        <Button onClick={goToSolarSystem} text="View Solar System" />
    </div>
    </>
);
}
export default Home;