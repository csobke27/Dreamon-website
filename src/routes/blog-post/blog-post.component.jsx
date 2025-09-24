import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Animation from "../../components/animation-section/animation-section.component";

import { WP_API_BASE } from "../../config";

import "./blog-post.styles.scss";

const BlogPost = () => {
    const { slug } = useParams();

    useEffect(() => {
        document.title = `Dreamon | Blog Post: ${slug}`;
    }, [slug]);

    
    const [post, setPost] = useState(null);

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
                setPost(postData[0] || null);
            } catch (error) {
                console.error('Error fetching blog post:', error);
            }
        };
        fetchPost();
    }, [slug]);

    // Responsive layout helper
    const getCenterContentClass = () => {
        if (typeof window !== 'undefined') {
            return window.innerWidth < 768 ? '' : 'center-content';
        }
        return 'center-content';
    };

    const [blogLayout, setBlogLayout] = useState(getCenterContentClass());
    useEffect(() => {
        const handleResize = () => setBlogLayout(getCenterContentClass());
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <Container fluid className="blog-post-page">
            <Row className={blogLayout}>
                {/* <div className="border-top-white"></div> */}
                <Col className="no-padding">
                    <Animation type="fade-in">
                        <div>
                            {post ? (
                                <>
                                <a href="/blog" className="back-link">&larr; Back to Blog</a>
                                {post.jetpack_featured_media_url && (
                                        <Image className="blog-post-image" src={post.jetpack_featured_media_url} alt={post.title} fluid />
                                    )}
                                <div className={`blog-post-content center-content`}>
                                    <h1 className="blog-post-title">{post.title.rendered}</h1>
                                    <div className="blog-post-insert" dangerouslySetInnerHTML={{ __html: post.content.rendered }} />
                                </div>
                                </>
                            ) : (
                                <Col className="no-padding text-center" style={{ marginTop: 150, marginBottom: 150 }}>
                                    <span className="spinner-border" role="status" aria-hidden="true" style={{ width: '3rem', height: '3rem' }}></span>
                                </Col>
                            )}
                        </div>
                    </Animation>
                </Col>
            </Row>
        </Container>
    );
};

export default BlogPost;