import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import "./blog-card.styles.scss";

const BlogCard = ({ id, title, thumbnail, content }) => {
    return (
        <Container className="blog-card-container">
            <a href={`#${id}`} className="blog-card-link">
                <Row>
                    <Col>
                        {thumbnail !== '' && (
                            <img className="blog-card-image" src={thumbnail} alt="Blog Post" />
                        )}
                        <div className="blog-card-title">{title.rendered}</div>
                        <div className="blog-card-content" dangerouslySetInnerHTML={{ __html: content.rendered }}  /> {/*style={{ height: '50px', overflow: 'hidden' }} */}
                        {/* <p className="blog-card-content">{content}</p> */}
                    </Col>
                </Row>
            </a>
        </Container>
    );
};

export default BlogCard;