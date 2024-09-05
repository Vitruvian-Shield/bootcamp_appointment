import React from 'react';
import './footer.css';
import facebookicon from '../assets/images/facebook.svg'
import xicon from '../assets/images/twitter-x.svg'
import instagramicon from '../assets/images/instagram.svg'

function Footer() {
    return (
        <footer className="footer" id='footer'>
            <div className="footer-content">
                <p>© 2024 vitruvian shield. All rights reserved.</p>
                <p>Follow us on:
                    <a href="#facebook"><img src={facebookicon} alt="" /></a>,
                    <a href="#twitter"><img src={xicon} alt="" /></a>,
                    <a href="#instagram"><img src={instagramicon} alt="" /></a>
                </p>
                <p>Contact us: VS_appointment@email.com</p>
            </div>
        </footer>
    );
}

export default Footer;
