//header bar page:
//make it a nav mar, that when logged in shows navigation tools.
//before login acts as title bar.
import {blue} from "@mui/material/colors";
import './PageTitle.css';
import react from 'react';
import { Navbar, Nav, Container, Button, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';


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
            <Navbar bg="dark" variant="dark" expand="lg">
                <Container>
                    <Navbar.Brand href="#home">MyApp</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="#home">Home</Nav.Link>
                            <Nav.Link href="#about">About</Nav.Link>
                            <Nav.Link href="#contact">Contact</Nav.Link>
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