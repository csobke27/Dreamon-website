import { useEffect, useState } from "react";

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Carousel from 'react-bootstrap/Carousel';

import Animation from "../../components/animation-section/animation-section.component";
import BlogCard from "../../components/blog-card/blog-card.component";

import { WP_API_BASE } from "../../config";

import "./nyx-legacy.styles.scss";

const NyxLegacy = () => {

    useEffect(() => {
        document.title = "Dreamon | Nyx Legacy";
    }, []);

    const [blogPosts, setBlogPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    // const blogPostTest = "\u003cp\u003eThis is my first blog post (yay!). I’m only using this as a test to see how blog posts are pulled using the blogger API. This will hopefully be a cheaper alternative to Wix (and more user friendly).\u003c/p\u003e\u003cp\u003e\u003cb\u003eBold Test\u003c/b\u003e\u003c/p\u003e\u003cp\u003eIn the end, this should be pulled by the blogger API and placed into the react version of the Dreamon Interactive website. Fingers crossed this works!\u003c/p\u003e";
    // const decodedContent = JSON.parse('"' + blogPostTest + '"');
    useEffect(() => {
        const themedClasses = [".navigation-container", ".footer-link"];
        document.querySelector('.outlet-container').style.setProperty('--outlet-bg', 'rgb(210 128 54)'); // Set background behind navbar to rgb(210 128 54)
        Array.from(themedClasses).forEach(cls => {
            document.querySelectorAll(cls).forEach(el => {
                el.style.setProperty('--theme-color', 'rgb(210 128 54)');
            });
        });
    }, []);

    // get blog posts from blogger api
    useEffect(() => {
        const fetchBlogPosts = async () => {
            setLoading(true);
            try {
                const tag = "nyx-legacy";
                const tagResponse = await fetch(`${WP_API_BASE}categories?slug=${tag}`);
                const tagData = await tagResponse.json();
                if (!tagData.length) {
                    setBlogPosts([]);
                    setLoading(false);
                }else {
                    const tagId = tagData[0].id;
                    const postsResponse = await fetch(`${WP_API_BASE}posts?per_page=3&categories=${tagId}`);
                    const postsData = await postsResponse.json();
                    setBlogPosts(postsData || []);
                    setLoading(false);
                }
            } catch (error) {
                setLoading(false);
                console.error('Error fetching blog posts:', error);
            }
        };
        fetchBlogPosts();
    }, []);

    // let link to page theme color
    useEffect(() => {
        document.querySelectorAll(".blog-card-link").forEach(el => {
            el.style.setProperty('--theme-color', 'rgb(210 128 54)');
        });
    }, [blogPosts]);
    return (
        <Container fluid className="nyx-legacy-page">
            <Row>
                <Col className="no-padding">
                    <div className="text-center">
                        <Image src="/images/Nyx-banner.jpg" alt="Logo" className="nyx-banner-logo" fluid />
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
                <Col className="text-center">
                    <iframe width="596" height="336" src="https://www.youtube.com/embed/M7hUM-_N3NY" title="Nyx legacy Demo trailer" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                </Col>
                {/* <Col className="text-center" id="nyx-dungeon-1" lg={6}>
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
                </Col> */}
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
            <Row className="center-content">
                <div className="border-top-white"></div>
                <Col className="no-padding">
                    <Animation type="expand">
                        <h1 className="nyx-legacy-title text-center"><b>Wishlist now on Steam!</b></h1>
                    </Animation>
                    <Animation type="fade-in">
                        <div className="text-center responsive-iframe d-none d-sm-block"  style={{marginBottom:20, marginTop:20}}>
                            <iframe title="Nyx Legacy Steam Widget" src="https://store.steampowered.com/widget/4016050/" ></iframe>
                        </div>
                        <div className="text-center d-block d-sm-none" style={{marginBottom:20, marginTop:20}}>
                            <button className="wishlist-button" onClick={() => window.open("https://store.steampowered.com/app/4016050/Nyx_Legacy/", "_blank", "noopener,noreferrer")}>Wishlist on Steam</button>
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
                <Row className="center-content" style={{marginTop:20}}>
                        {loading ? (
                            <Col className="no-padding text-center" style={{marginTop: 150, marginBottom: 150}}>
                                <span className="spinner-border" role="status" aria-hidden="true" style={{width: '3rem', height: '3rem'}}></span>
                            </Col>
                        ) : (
                            blogPosts.length === 0 ? (
                                <Col className="no-padding">
                                    <p>No blog posts available at the moment.</p>
                                </Col>
                            ) : (
                                <>
                                    {/* Grid for large screens and up */}
                                    <Row className="d-none d-lg-flex w-100">
                                        {blogPosts.slice(0, 3).map((post) => (
                                            <Col lg={12/blogPosts.length} key={post.id}>
                                                <Animation type="fade-in">
                                                    <BlogCard slug={post.slug} title={post.title} thumbnail={post.jetpack_featured_media_url} content={post.excerpt} />
                                                </Animation>
                                            </Col>
                                        ))}
                                    </Row>
                                    {/* Carousel for medium screens and below */}
                                    <div className="d-lg-none w-100">
                                        <Carousel style={{ minHeight: '540px' }} interval={null} indicators={false} >
                                            {blogPosts.slice(0, 3).map((post) => (
                                                <Carousel.Item key={post.id} >
                                                    <Animation type="fade-in">
                                                        <BlogCard slug={post.slug} title={post.title} thumbnail={post.jetpack_featured_media_url} content={post.excerpt} />
                                                    </Animation>
                                                </Carousel.Item>
                                            ))}
                                        </Carousel>
                                    </div>
                                </>
                            )
                        )}
                </Row>
            </div>
        </Container>
    );
};

export default NyxLegacy;