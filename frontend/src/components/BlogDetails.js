import { FiThumbsDown, FiThumbsUp, FiTrash } from "react-icons/fi";

const formatDate = (dateString) => {
    const options = { hour12: false, year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString('en-US', options);
};

const BlogDetails = ({ blog, handleUpvote, handleDelete }) => {

    return (
        <div className="blog-details">
            <div className="blog-header">
                <h4>{blog.title}</h4>
                <button className="DeleteBtn" onClick={() => handleDelete(blog._id)}><FiTrash /></button>
            </div>

            <p style={{ marginBottom: "10px"}}><strong>Content: </strong>{blog.content}</p>
            <p><strong>Upvotes: </strong>{blog.upvotes}</p>
            <p><strong>Downvotes: </strong>{blog.downvotes}</p>
            <p>Posted On: {formatDate(blog.createdAt)}</p>

            <div className="reactions-group">
                <button className="upvoteBtn" onClick={() => handleUpvote(blog._id)}>
                    Upvote <FiThumbsUp />
                </button>
                <button className="downvoteBtn">
                    Downvote <FiThumbsDown />
                </button>
            </div>
        </div>
    );
};

export default BlogDetails;
