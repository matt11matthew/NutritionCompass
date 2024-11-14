import React from 'react';
import './PageTitle.css';
import { Navbar } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function PageTitle() {
    return (
        <Navbar className="nc-navbar">
            <div className="navbar-content">
                <img
                    src="/CompassAndMonogram2.png"
                    alt="Logo"
                    width="50"
                    height="50"
                    className="navbar-img"
                />
                <span className="navbar-title">
                    Nutrition Compass
                </span>
            </div>
        </Navbar>
    );
}

export default PageTitle;
