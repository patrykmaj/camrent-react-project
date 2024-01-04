import React from "react"
import { Link } from "react-router-dom"

export default function Home() {
    return (
        <>
        <div className="home-hero">
            <h1>Rent best camera for your next project.</h1>
        </div>
        <div className="home-container">
            <div className="home-page-content">
                <h1>Don’t rec with iphone when you could use pro camera.</h1>
                <p>At CAMRENT, we understand the importance of having the right equipment to bring your vision to life. Our passion for photography and videography led us to create a platform where enthusiasts and professionals alike can access cutting-edge cameras without the hefty price tag.</p>
            </div>
            <div className="home-page-cta">
                <h2>Your Movie is waiting.<br />Your Camera is ready.</h2>
                <Link className="link-button" to="/cameras">Explore our cameras</Link>
            </div>
        </div>
        </>
    )
};