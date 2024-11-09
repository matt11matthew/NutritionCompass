import React from 'react';
import './PageTitle.css';
import { Navbar } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function PageTitle() {
    return (
        <Navbar className="nc-navbar">
            <span className="navbar-title">
                Nutrition Compass
            </span>
        </Navbar>
    );
}

export default PageTitle;
