import { useEffect, useState, useCallback } from "react";

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Collapse from 'react-bootstrap/Collapse';
import Form from 'react-bootstrap/Form';

import Animation from "../../components/animation-section/animation-section.component";
import BlogCard from "../../components/blog-card/blog-card.component";
import Pagination from 'react-bootstrap/Pagination';

import { WP_API_BASE } from "../../config";

import "./blog.styles.scss";

const Blog = () => {

    useEffect(() => {
        document.title = `Dreamon | Blog`;
    }, []);

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
    const [selectedCategory, setSelectedCategory] = useState('');
    const [sortOrder, setSortOrder] = useState('date');
    const [loading, setLoading] = useState(true);
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        const themedClasses = [".navigation-container", ".footer-link"];
        document.querySelector('.outlet-container').style.setProperty('--outlet-bg', 'black'); // Set background behind navbar to black
        Array.from(themedClasses).forEach(cls => {
            document.querySelector(cls).style.setProperty('--theme-color', '#72D822'); // Set navbar color to green
        });
    }, []);

    // get blog posts from blogger api
    const fetchBlogPosts = useCallback(async (categoryId = null, page = 1) => {
        setLoading(true);
        setCurrentPage(page);
        try {
            let postsUrl = `${WP_API_BASE}posts?page=${page}&per_page=5`;
            switch (sortOrder) {
                case 'date':
                    postsUrl += `&order_by=date&order=desc`;
                    break;
                case 'date-reverse':
                    postsUrl += `&order_by=date&order=asc`;
                    break;
                case 'title':
                    postsUrl += `&order_by=title&order=asc`;
                    break;
                case 'title-reverse':
                    postsUrl += `&order_by=title&order=desc`;
                    break;
                default:
                    postsUrl += `&order_by=date&order=desc`;
            }
            if (categoryId) {
                postsUrl += `&categories=${categoryId}`;
            }
            const postsResponse = await fetch(postsUrl);
            setTotalPages(postsResponse.headers.get('X-WP-TotalPages')); // Total number of pages
            const postsData = await postsResponse.json();
            setBlogPosts(postsData || []);
            setLoading(false);

        } catch (error) {
            setLoading(false);
            console.error('Error fetching blog posts:', error);
        }
    }, [sortOrder]);

    // let link to page theme color
    useEffect(() => {
        document.querySelectorAll(".blog-card-link").forEach(el => {
            el.style.setProperty('--theme-color', 'black');
        });
    }, [blogPosts]);

    useEffect(() => {
        fetchBlogPosts(selectedCategory);
    }, [selectedCategory, sortOrder, fetchBlogPosts]);

    // get categories from blogger api
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                let categoriesUrl = `${WP_API_BASE}categories`;
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
                        {formOpen ? 'Close' : 'Filter / Sort'}
                    </Button>
                    <Collapse in={formOpen}>
                        <div>
                            <div>
                            <span style={{ marginRight: 10 }}>Filter by Category:</span>
                            <Form.Select disabled={loading} size="md" onChange={(e) => setSelectedCategory(e.target.value)}>
                                <option value="">All Posts</option>
                                {categories.map(category => (
                                    <option key={category.id} value={category.id}>
                                        {category.name} ({category.count})
                                    </option>
                                ))}
                            </Form.Select>
                            </div>
                            <div style={{ marginTop: 20 }}>
                                <span style={{ marginRight: 10, marginTop: 10 }}>Sort by:</span>
                                <Form.Select disabled={loading} size="md" onChange={(e) => setSortOrder(e.target.value)} value={sortOrder}>
                                    <option value="date">Newest-Oldest</option>
                                    <option value="date-reverse">Oldest-Newest</option>
                                    <option value="title">Title (A-Z)</option>
                                    <option value="title-reverse">Title (Z-A)</option>
                                </Form.Select>
                            </div>
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
                        {blogPosts.length === 0 && (
                            <Col className="no-padding text-center" style={{ marginTop: 50, marginBottom: 50 }}>
                                <h3>No posts found.</h3>
                            </Col>
                        )}
                    </>
                )}
                <div className="pagination-container">
                    <Pagination>
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map(pageNum => (
                            <Pagination.Item key={pageNum} active={pageNum === currentPage} onClick={() => fetchBlogPosts(selectedCategory, pageNum)}>
                                {pageNum}
                            </Pagination.Item>
                        ))}
                    </Pagination>
                </div>
            </div>
        </Container>
    );
};

export default Blog;