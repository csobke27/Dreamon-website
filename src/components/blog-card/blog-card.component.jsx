import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import "./blog-card.styles.scss";

const BlogCard = ({ slug, title, thumbnail, content, layout = "vertical" }) => {
    return (
        <Container className="blog-card-container">
            <a href={`/post/${slug}`} className="blog-card-link">
                <Row>
                    {layout === "horizontal" ? (
                        <>
                                {thumbnail !== '' && (
                                    <>
                                    <Col sm={4}>
                                        <img className="blog-card-image" src={thumbnail} alt="Blog Post" />
                                    </Col>
                                    </>
                                )}
                            <Col>
                                <div className="blog-card-title" style={{marginTop: '10px'}}>{title.rendered.replace("&nbsp;", " ")}</div>
                                <div className="blog-card-content" dangerouslySetInnerHTML={{ __html: content.rendered }} /> {/*style={{ height: '50px', overflow: 'hidden' }} */}
                            </Col>
                        </>
                    ) : (
                        <>
                            <Col>
                                {thumbnail !== '' && (
                                    <img className="blog-card-image" src={thumbnail} alt="Blog Post" />
                                )}
                                <div className="blog-card-title">{title.rendered.replace("&nbsp;", " ")}</div>
                                <div className="blog-card-content" dangerouslySetInnerHTML={{ __html: content.rendered }} /> {/*style={{ height: '50px', overflow: 'hidden' }} */}
                            </Col>
                        </>
                    )}
                </Row>
            </a>
        </Container>
    );
};

export default BlogCard;