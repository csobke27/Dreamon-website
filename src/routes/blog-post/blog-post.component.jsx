import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Animation from "../../components/animation-section/animation-section.component";
import BlogCard from "../../components/blog-card/blog-card.component";
import Carousel from 'react-bootstrap/Carousel';

import { WP_API_BASE } from "../../config";

import "./blog-post.styles.scss";

const BlogPost = () => {
    const { slug } = useParams();
    useEffect(() => {
        document.title = `Dreamon | Blog Post: ${slug}`;
    }, [slug]);


    const [post, setPost] = useState(null);
    const [relatedPosts, setRelatedPosts] = useState(null);

    useEffect(() => {
        const themedClasses = [".navigation-container", ".footer-link", ".back-link"];
        document.querySelector('.outlet-container').style.setProperty('--outlet-bg', 'black'); // Set background behind navbar to black
        Array.from(themedClasses).forEach(cls => {
            document.querySelectorAll(cls).forEach(el => {
                el.style.setProperty('--theme-color', '#72D822');
            });
        });
    }, []);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const postResponse = await fetch(`${WP_API_BASE}posts?slug=${slug}`);
                const postData = await postResponse.json();
                setPost(postData[0] || []);
                if(postData.length > 0){
                    console.log("Fetching related posts for category...");
                    const categories = postData[0].categories;
                    if(categories.length > 0){
                        try {
                            const relatedResponse = await fetch(`${WP_API_BASE}posts?categories=${categories.join(',')}&per_page=2&exclude=${postData[0].id}`);
                            const relatedData = await relatedResponse.json();
                            setRelatedPosts(relatedData);
                        }
                        catch (error) {
                            console.error('Error fetching related posts:', error);
                        }
                    }
                }
            } catch (error) {
                console.error('Error fetching blog post:', error);
            }
        };
        fetchPost();
    }, [slug]);

    // Responsive layout helper
    // const getCenterContentClass = () => {
    //     if (typeof window !== 'undefined') {
    //         let width = 992; //md = 768 lg = 992 xl = 1200
    //         return window.innerWidth < width ? '' : 'center-content';
    //     }
    //     return 'center-content';
    // };

    // const [blogLayout, setBlogLayout] = useState(getCenterContentClass());
    // useEffect(() => {
    //     const handleResize = () => setBlogLayout(getCenterContentClass());
    //     window.addEventListener('resize', handleResize);
    //     return () => window.removeEventListener('resize', handleResize);
    // }, []);

    return (
        <Container fluid className="blog-post-page">
            <Row > {/* className={blogLayout} */}
                <Col className="related-posts-section" lg={2}></Col>
                {/* <div className="border-top-white"></div> */}
                <Col lg={8} className="no-padding">
                    <Animation type="fade-in">
                        <div>
                            {/* {post === null && (
                                <Col className="no-padding text-center" style={{ marginTop: 150, marginBottom: 150 }}>
                                    <span className="spinner-border" role="status" aria-hidden="true" style={{ width: '3rem', height: '3rem' }}></span>
                                </Col>
                            )} */}
                            {(post && post.length !== 0) ? (
                                <>
                                    <a href="/blog" className="back-link">&larr; Back to Blog</a>
                                    {post.jetpack_featured_media_url && (
                                        <Image className="blog-post-image" src={post.jetpack_featured_media_url} alt={post.title} fluid />
                                    )}
                                    <div className={`blog-post-content center-content`}>
                                        <h1 className="blog-post-title">{post.title.rendered.replace("&nbsp;", " ")} <span className="publish-date">- published on {new Date(post.date).toLocaleDateString()}</span></h1>
                                        <div className="blog-post-insert" dangerouslySetInnerHTML={{ __html: post.content.rendered }} />
                                    </div>
                                </>
                            ) : (post === null) ? (
                                <Col className="no-padding text-center" style={{ marginTop: 150, marginBottom: 150 }}>
                                    <span className="spinner-border" role="status" aria-hidden="true" style={{ width: '3rem', height: '3rem' }}></span>
                                </Col>
                            ) :  (
                                <>
                                    <a href="/blog" className="back-link">&larr; Back to Blog</a>
                                    <Col className="no-padding text-center" style={{ marginTop: 150, marginBottom: 150 }}>
                                        <h3 style={{ color: 'white' }}>Post not found.</h3>
                                    </Col>
                                </>
                            )}
                        </div>
                    </Animation>
                </Col>
                <Col lg={2}>
                    {relatedPosts && relatedPosts.length > 0 && (
                        <div className="related-posts-container center-content">
                            <h3 className="related-posts-title text-center">Related Posts</h3>
                            <div className="d-none d-lg-flex w-100">
                                <Row>
                                {relatedPosts.map(rp => (
                                    <Col xs={12}>
                                        <BlogCard key={rp.id} slug={rp.slug} title={rp.title} thumbnail={rp.jetpack_featured_media_url} content={rp.excerpt} />
                                    </Col>
                                ))}
                                </Row>
                            </div>
                            {/* Show as Carousel on smaller screens */}
                            <div className="d-lg-none w-100">
                                <Carousel style={{ minHeight: '540px' }} interval={null} indicators={false} >
                                    {relatedPosts.map((rp) => (
                                        <Carousel.Item key={rp.id} >
                                            <Animation type="fade-in">
                                                <BlogCard slug={rp.slug} title={rp.title} thumbnail={rp.jetpack_featured_media_url} content={rp.excerpt} />
                                            </Animation>
                                        </Carousel.Item>
                                    ))}
                                </Carousel>
                            </div>
                        </div>
                        )
                    }
                </Col>
            </Row>
        </Container >
    );
};

export default BlogPost;