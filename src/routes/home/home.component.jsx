import { useEffect } from "react";

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Animation from "../../components/animation-section/animation-section.component";


import "./home.styles.scss";

const Home = () => {
    
    useEffect(() => {
        const themedClasses = [".navigation-container", ".footer-link"];
        document.querySelector('.outlet-container').style.setProperty('--outlet-bg', 'black'); // Set background behind navbar to black
        Array.from(themedClasses).forEach(cls => {
            document.querySelector(cls).style.setProperty('--theme-color', '#72D822'); // Set navbar color to green
        });
    }, []);
    return (
        <Container fluid className="home-page">
            <Row>
                <Col>
                    <div className="text-center">
                        <Image src="/images/dreamonlogo-new.png" alt="Logo" className="home-logo" fluid />
                    </div>
                </Col>
            </Row>
            <Row className="center-content">
                <div className="border-top-white"></div>
                <Col className="no-padding">
                    <Animation type="fade-in">
                        <div>
                            <h1 className=""><b>Dreamon Interactive</b></h1>
                            <p className="">We're a small independent game studio driven by a simple idea: making games that matter. 
                                For us, it's not about chasing trends or flashy gimmicks - it's about building worlds that feel real, 
                                stories that stay with you, and gameplay that's both fun and meaningful. Every project is a chance to grow, 
                                learn, and create something worth sharing.</p>
                        </div>
                    </Animation>
                </Col>
            </Row>
            <Row className="center-content">
                <div className="border-top-white"></div>
                <Col className="no-padding">
                    <Animation type="fade-in">
                        <div>
                            <p>Our first major project is Nyx Legacy, a story-driven RPG inspired by the classics of the 16-bit era. 
                                It follows two sisters trying to survive in a world tranformed by a mysterious virus - a place filled with danger, loss, but also hope. 
                                The game blends old-school RPG mechanics with modern design: turn-based battles, dungeons full of secrets, and choices that carry real weight.
                                We share our progress step-by-step through <a className="link" href="/blog">blogs</a>, streams, and community updates. Nyx Legacy is still in development, but a playable demo will be available soon. 
                                <br />
                                <br />
                                Available to <a className="link" href="https://store.steampowered.com/app/4016050/Nyx_Legacy/" target="_blank" rel="noopener noreferrer">wishlist on Steam</a> now!
                                <br />
                                <br />
                                <a className="link" href="/nyx-legacy">Click here to learn more about Nyx Legacy!</a>
                            </p>
                        </div>
                    </Animation>
                </Col>
            </Row>
        </Container>
    );
};

export default Home;