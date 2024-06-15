import React from 'react';
import { ReactComponent as Logo } from './logo.svg';
import './Navbar.css';

const Navbar = () => {
    return (
        <div className="navbar">
            <Logo className="navbar-logo" />
            <div className='navbar-middle'>
                <a href="#home">About</a>
                <a href="#services">Experties</a>
                <a href="#contact">Contact</a>
            </div>
            <button className='button'>Get Started</button>
        </div>
    );
};

export default Navbar;