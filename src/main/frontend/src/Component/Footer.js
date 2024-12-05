/* eslint-disable */
import React from 'react';
import { Link } from 'react-router-dom';

function Header(props) {
    return (
        <div className='bg-color-black color-white'>
            <br/>
            <br/>
            <br/>
            <br/>
            <footer className="py-3 font-size-08em">
                <ul className="nav justify-content-center border-bottom pb-3 mb-3">
                    <li className="nav-item"><a href="#" className="nav-link px-2 color-white">Home</a></li>
                    <li className="nav-item"><a href="#" className="nav-link px-2 color-white">Features</a></li>
                    <li className="nav-item"><a href="#" className="nav-link px-2 color-white">Pricing</a></li>
                    <li className="nav-item"><a href="#" className="nav-link px-2 color-white">FAQs</a></li>
                    <li className="nav-item"><a href="#" className="nav-link px-2 color-white">About</a></li>
                </ul>
                <p className="text-center">© 2024 Company, Inc</p>
            </footer>
        </div>
    );
}

export default Header;