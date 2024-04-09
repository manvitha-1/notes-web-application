import React from 'react'
import { Link } from 'react-router-dom';

const Header = () => {
    const brandStyle = {
        color: 'white'
    };
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-dark">
            <a className="navbar-brand" href="#" style={brandStyle}>Notes App</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavDropdown">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        {/* <a className="nav-link" href="#" style={brandStyle}>Home</a> */}
                        <Link to="/" className="nav-link" style={brandStyle}>Home</Link>
                    </li>
                    <li className="nav-item">
                        {/* <a className="nav-link" href="#" style={brandStyle}>Login</a> */}
                        <Link to="/login" className="nav-link" style={brandStyle}>Login</Link>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default Header;