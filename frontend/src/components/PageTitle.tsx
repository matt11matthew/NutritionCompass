//header bar page:
//make it a nav mar, that when logged in shows navigation tools.
//before login acts as title bar.
import {blue} from "@mui/material/colors";
import './PageTitle.css';
import react from 'react';
import { Navbar, Nav, Container, Button, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

//Problem with default size of viewport
//

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
                    <Navbar.Brand href="#home">Nutrition Compass</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="#home">Dashboard</Nav.Link>
                            <Nav.Link href="#about">Food List</Nav.Link>
                            <Nav.Link href="#contact">Account Details</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>


        </div>
    );
/*
*  <Container className="mt-5">
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