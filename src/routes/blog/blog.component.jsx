import { useEffect, useState } from "react";

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Collapse from 'react-bootstrap/Collapse';
import Form from 'react-bootstrap/Form';

import Animation from "../../components/animation-section/animation-section.component";
import BlogCard from "../../components/blog-card/blog-card.component";

import "./blog.styles.scss";

const Blog = () => {
    // Responsive layout helper
    const getLayout = () => {
        if (typeof window !== 'undefined') {
            return window.innerWidth >= 1144 ? 'horizontal' : 'vertical';
        }
        return 'horizontal';
    };

    const [cardLayout, setCardLayout] = useState(getLayout());
    useEffect(() => {
        const handleResize = () => setCardLayout(getLayout());
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const [formOpen, setFormOpen] = useState(false);
    const [blogPosts, setBlogPosts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const themedClasses = [".navigation-container", ".footer-link"];
        document.querySelector('.outlet-container').style.setProperty('--outlet-bg', 'black'); // Set background behind navbar to black
        Array.from(themedClasses).forEach(cls => {
            document.querySelector(cls).style.setProperty('--theme-color', '#72D822'); // Set navbar color to green
        });
    }, []);

    // get blog posts from blogger api
    const fetchBlogPosts = async (categoryId = null) => {
        setLoading(true);
        try {
            let postsUrl = `https://public-api.wordpress.com/wp/v2/sites/coreytestblog4.wordpress.com/posts?per_page=20`;
            if (categoryId) {
                postsUrl += `&categories=${categoryId}`;
            }
            const postsResponse = await fetch(postsUrl);
            const postsData = await postsResponse.json();
            setBlogPosts(postsData || []);
            setLoading(false);

        } catch (error) {
            setLoading(false);
            console.error('Error fetching blog posts:', error);
        }
    };

    // let link to page theme color
    useEffect(() => {
        document.querySelectorAll(".blog-card-link").forEach(el => {
            el.style.setProperty('--theme-color', 'black');
        });
    }, [blogPosts]);

    useEffect(() => {
        fetchBlogPosts();
    }, []);

    // get categories from blogger api
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                let categoriesUrl = `https://public-api.wordpress.com/wp/v2/sites/coreytestblog4.wordpress.com/categories`;
                const categoriesResponse = await fetch(categoriesUrl);
                const categoriesData = await categoriesResponse.json();
                setCategories(categoriesData || []);
            } catch (error) {
                console.error('Error fetching blog categories:', error);
            }
        };
        fetchCategories();
    }, []);

    return (
        <Container fluid className="blog-page">
            <Row>
                <Col>
                    <div className="text-center">
                        <h1 className="blog-header">Blog</h1>
                        <span>Updates on our progress, thoughts on game development, and more.</span>
                    </div>
                </Col>
            </Row>
            <div className="center-content" style={{ marginTop: 20 }}>
                <div className="blog-filter-form">
                    <Button
                        onClick={() => setFormOpen(!formOpen)}
                        aria-controls="subscribe-form-collapse"
                        aria-expanded={formOpen}
                        className="blog-filter-button"
                    >
                        {formOpen ? 'Close' : 'Filter Posts'}
                    </Button>
                    <Collapse in={formOpen}>
                        <div>
                            <Form.Select disabled={loading} size="lg" onChange={(e) => fetchBlogPosts(e.target.value)}>
                                <option value="">All Posts</option>
                                {categories.map(category => (
                                    <option key={category.id} value={category.id}>
                                        {category.name}
                                    </option>
                                ))}
                            </Form.Select>
                        </div>
                    </Collapse>

                </div>
            </div>

            <div className="center-content" style={{ marginTop: 20 }}>
                {loading ? (
                    <Col className="no-padding text-center" style={{ marginTop: 150, marginBottom: 150 }}>
                        <span className="spinner-border" role="status" aria-hidden="true" style={{ width: '3rem', height: '3rem' }}></span>
                    </Col>
                ) : (
                    <>
                        {blogPosts.map(post => (
                            <Row key={post.id} className="blog-card-row">
                                <Col className="blog-card-zoom">
                                    <Animation type="fade-in">
                                        <BlogCard slug={post.slug} title={post.title} thumbnail={post.jetpack_featured_media_url} content={post.excerpt} layout={cardLayout} />
                                    </Animation>
                                </Col>
                            </Row>
                        ))}
                    </>
                )}
            </div>

        </Container>
    );
};

export default Blog;