import { useEffect } from "react";

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';

import "./nyx-legacy.styles.scss";
import Animation from "../../components/animation-section/animation-section.component";

const NyxLegacy = () => {
    
    useEffect(() => {
        const themedClasses = [".navigation-container", ".footer-link"];
        document.querySelector('.outlet-container').style.setProperty('--outlet-bg', 'rgb(210 128 54)'); // Set background behind navbar to rgb(210 128 54)
        Array.from(themedClasses).forEach(cls => {
            document.querySelectorAll(cls).forEach(el => {
                el.style.setProperty('--theme-color', 'rgb(210 128 54)');
            });
        });
    }, []);
    return (
        <Container fluid className="nyx-legacy-page">
            <Row>
                <Col className="no-padding">
                    <div className="text-center">
                        <Image src="/images/Nyx-banner.jpg" alt="Logo" className="home-logo" fluid />
                    </div>
                </Col>
            </Row>
            <Row className="center-content" style={{ marginTop: 50 }}>
                <Col className="no-padding">
                    <Animation type="slide-up">
                        <h1 className="nyx-legacy-title"><b>Nyx Legacy</b></h1>
                    </Animation>
                </Col>
            </Row>
            <Row className="center-content">
                <div className="border-top-white no-margin-top"></div>
                <Col className="no-padding">
                    <Animation type="slide-up">
                        <div>
                            <p className="">Immerse yourself in the captivating world of Nyx Legacy, where two sisters venture
                                through a monster-filled realm on a thrilling story-driven quest. Prepare to engage with action-packed
                                challenges and mysterious plot twists that will keep you on the edge of your seat.</p>
                        </div>
                    </Animation>
                </Col>
            </Row>
            <Row className="center-content">
                <div className="border-top-white no-margin-top"></div>
                <Col className="text-center" id="nyx-dungeon-1" lg={6}>
                    <Animation type="flip">
                        <div className="nyx-image-border">
                            <img alt="nyx-dungeon-1" src="/images/nyx-image-1.jpg" width="100%" />
                        </div>
                    </Animation>
                </Col>
                <Col className="text-center" id="nyx-dungeon-2" lg={6}>
                    <Animation type="flip">
                        <div className="nyx-image-border">
                            <img alt="nyx-dungeon-2" src="/images/nyx-image-2.jpg" width="100%" />
                        </div>
                    </Animation>
                </Col>
            </Row>
            <Row className="center-content">
                <div className="border-top-white"></div>
                <Col className="no-padding">
                    <Animation type="fade-in">
                        <div>
                            <p>Nyx Legacy is an old-school RPG that offers an immersive gaming experience.
                                Keep an eye on our blog for the latest updates and developments!
                            </p>
                        </div>
                    </Animation>
                </Col>
            </Row>
            <Row style={{marginTop:40}}>
                <Col className="no-padding">
                    <div className="blog-divider"></div>
                </Col>
            </Row>
            <div className="blog-section row" style={{paddingTop: 50}}>
                <Row className="center-content">
                    <Col className="no-padding">
                        <h1 className=""><b>Blog Updates</b></h1>
                    </Col>
                    <div className="border-top-white no-margin-top"></div>
                </Row>
            </div>
        </Container>
    );
};

export default NyxLegacy;