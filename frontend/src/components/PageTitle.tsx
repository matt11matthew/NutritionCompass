//header bar page:
//make it a nav mar, that when logged in shows navigation tools.
//before login acts as title bar.
import {blue} from "@mui/material/colors";
import './PageTitle.css';
import React from 'react';
import { Navbar, Nav, Container, Button, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

//Problem with default size of viewport
//

interface PageTitleProps {
    loggedin: boolean;
}

function PageTitle()
{
    /*
   return(
        <header className="TitleBar">
            <h1 id="title">Nutrition Compass</h1>
        </header>
    );

     */

    return (
        <div>
            <Navbar className="nc-navbar"  expand="lg">
                <Container>
                    <div className="d-flex w-100 justify-content-between align-items-center">
                        <Navbar.Brand href="#home" className="d-flex align-items-center">
                            <img
                                src={"/CompassAndMonogram2.png"}
                                alt="Logo"
                                width="40" // Adjust the width and height as needed
                                height="40"
                                // className="d-inline-block align-top"
                                className="navbar-img"
                            />
                        </Navbar.Brand>
                            {/*{' '}*/}
                        <span className="navbar-title">Nutrition Compass</span>

                        <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="ms-auto">
                                <Nav.Link href="#home">Dashboard</Nav.Link>
                                <Nav.Link href="#foodList">Food List</Nav.Link>
                                <Nav.Link href="#accountDetails">Account Details</Nav.Link>
                                <Nav.Link href="#userProfile">User Profile</Nav.Link>
                            </Nav>
                        </Navbar.Collapse>
                    </div>
                </Container>
            </Navbar>


        </div>
);
/*
*
    <Container className="mt-5">
                <Card>
                    <Card.Body>
                        <Card.Title>Welcome to MyApp</Card.Title>
                        <Card.Text>
                            This is an example of using React Bootstrap components in a React application.
                        </Card.Text>
                        <Button variant="primary">Learn More</Button>
                    </Card.Body>
                </Card>
            </Container>
* */

}

export default PageTitle;