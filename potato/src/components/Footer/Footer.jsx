import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'

const Footer = () => {
  return (
    <footer className='footer' id='footer'>
      <div className="footer-container">

        <div className="footer-section footer-left">
          <img src={assets.logo} alt="logo" className="footer-logo" />
          <p className="footer-description">
            Tomato is your go-to destination for fresh and fast food delivery.
            From local favorites to popular cuisines, we bring delicious meals
            right to your doorstep.
          </p>
          <div className="footer-social-icons">
            <img src={assets.facebook_icon} alt="facebook" />
            <img src={assets.twitter_icon} alt="twitter" />
            <img src={assets.linkedin_icon} alt="linkedin" />
          </div>
        </div>

        <div className="footer-section">
          <h3>Company</h3>
          <ul>
            <li>Home</li>
            <li>About Us</li>
            <li>Delivery</li>
            <li>Privacy Policy</li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Contact</h3>
          <ul>
            <li>+1-212-456-7230</li>
            <li>contact@tomato.com</li>
          </ul>
        </div>

      </div>

      <hr />

      <p className="footer-copyright">
        © 2025 Tomato.com — All Rights Reserved
      </p>
    </footer>
  )
}

export default Footer