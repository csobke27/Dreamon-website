import { useEffect } from "react";
import { useParams } from 'react-router-dom';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Animation from "../../components/animation-section/animation-section.component";


import "./blog-post.styles.scss";

const BlogPost = () => {
    const { slug } = useParams();
    useEffect(() => {
        const themedClasses = [".navigation-container", ".footer-link"];
        document.querySelector('.outlet-container').style.setProperty('--outlet-bg', 'black'); // Set background behind navbar to black
        Array.from(themedClasses).forEach(cls => {
            document.querySelector(cls).style.setProperty('--theme-color', '#72D822'); // Set navbar color to green
        });
    }, []);
    return (
        <Container fluid className="blog-post-page">
            <Row className="center-content">
                <div className="border-top-white"></div>
                <Col className="no-padding">
                    <Animation type="fade-in">
                        <div>
                            <h1 className=""><b>Blog post goes here for post {slug}</b></h1>
                        </div>
                    </Animation>
                </Col>
            </Row>
        </Container>
    );
};

export default BlogPost;