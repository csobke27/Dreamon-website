import { useState, useEffect, useRef } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";

import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Footer from "../../components/footer/footer.component";

import "./navigation.styles.scss";

const Navigation = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [currentPath, setCurrentPath] = useState("");
    const location = useLocation();
    const [hideNavbar, setHideNavbar] = useState(false);
    const lastScrollY = useRef(0);
    const scrollTriggerAmount = 106; // Adjust this value as needed

    useEffect(() => {
        const handleScroll = () => {
            const currentScroll = window.scrollY;
            const lastScroll = lastScrollY.current;
            if (Math.abs(currentScroll - lastScroll) > scrollTriggerAmount) {
                if (currentScroll > lastScroll) {
                    setHideNavbar(true); // scrolling down
                } else {
                    setHideNavbar(false); // scrolling up
                }
                lastScrollY.current = currentScroll;
            }
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    }

    const handleNavigation = (event, path) => {
        // event.preventDefault();
        // if (path !== location.pathname) {
        //     setIsTransitioning(true); // Start the transition
        //     setTimeout(() => {
        //         setCurrentPath(path); // Update the current path after the delay
        //         setIsTransitioning(false); // End the transition
        //     }, 1000); // Delay in milliseconds (1 second in this case)
        // }
    };
    return (
        <>
            <Navbar fixed="top" expand={'false'} className={`bg-body-tertiary mb-3 navigation-container ${hideNavbar ? "navbar-hidden" : "navbar-show"}`}>
                <Container fluid>
                    <Navbar.Brand href="/" className="logo">
                        <img alt="Logo" src="/images/Dreamonbrandmerk-no-background.png" width="80" height="80" className="d-inline-block align-top nav-logo" />
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${false}`} className="menu-toggle" />
                    <Navbar.Offcanvas
                        id={`offcanvasNavbar-expand-${false}`}
                        aria-labelledby={`offcanvasNavbarLabel-expand-${false}`}
                        placement="end"
                    >
                        <Offcanvas.Header closeButton>
                            <Offcanvas.Title width="50%" id={`offcanvasNavbarLabel-expand-${false}`}>
                                <img alt="brand" src="/images/dreamonlogo-new.png" width="100%" />
                                {/* Dreamon Interactive */}
                            </Offcanvas.Title>
                        </Offcanvas.Header>
                        <Offcanvas.Body>
                            <Nav className="justify-content-end flex-grow-1 pe-3">
                                <Nav.Link href="/">Home</Nav.Link>
                                <Nav.Link href="/nyx-legacy">Nyx Legacy</Nav.Link>
                                <Nav.Link href="/blog">Blog</Nav.Link>
                                <Nav.Link href="https://www.gofundme.com/f/nyx-legacy-a-story-to-be-told">GoFundMe</Nav.Link>
                                <Row>
                                    <Col className="text-center">
                                        <Nav.Link href="https://discord.gg/dzW8VxDh4a" target="_blank" rel="noopener noreferrer">
                                            <img alt="Discord" src="/images/discord-circle.png" width="30" height="30" className="me-2" />
                                        </Nav.Link>
                                    </Col>
                                    <Col className="text-center">
                                        <Nav.Link href="https://www.twitch.tv/rattacookie" target="_blank" rel="noopener noreferrer">
                                            <img alt="Twitch" src="/images/twitch-circle.png" width="30" height="30" className="me-2" />
                                        </Nav.Link>
                                    </Col>
                                </Row>
                            </Nav>
                        </Offcanvas.Body>
                    </Navbar.Offcanvas>
                </Container>
            </Navbar>
            <div className={`outlet-container ${isTransitioning ? "fade-out" : "fade-in"}`}>
                <Outlet />
            </div>
            <Footer />
            {/* <Navbar className="footer-nav">
                <Container>
                    <Navbar.Text className="footer-text justify-content-center">© 2025 CoreyInDaHouse27. All rights reserved.</Navbar.Text>
                </Container>
            </Navbar> */}
        </>
    )
}

export default Navigation;