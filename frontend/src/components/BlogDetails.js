import React, { useState } from "react";
import { useBlogsContext } from '../hooks/useBlogsContext';
import './BlogDetails.css';
import { FiThumbsDown, FiThumbsUp, FiTrash } from "react-icons/fi";

const formatDate = (dateString) => {
    const options = { hour12: false, year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString('en-US', options);
};

const BlogDetails = ({ blog }) => {
    const [upvoted, setUpvoted] = useState(false);
    const [downvoted, setDownvoted] = useState(false);
    const { dispatch } = useBlogsContext();

    const handleUpvote = async (id) => {
        try {
            const response = await fetch(`http://localhost:4000/api/blogs/${id}/upvote`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Failed to upvote the blog');
            }

            const updatedBlog = await response.json();
            dispatch({ type: 'UPDATE_BLOG', payload: updatedBlog });
            setUpvoted(true);
            setDownvoted(false);
        } catch (error) {
            console.error(error);
        }
    };

    const handleDownvote = async (id) => {
        try {
            const response = await fetch(`http://localhost:4000/api/blogs/${id}/downvote`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Failed to downvote the blog');
            }

            const updatedBlog = await response.json();
            dispatch({ type: 'UPDATE_BLOG', payload: updatedBlog });
            setDownvoted(true);
            setUpvoted(false);
        } catch (error) {
            console.error(error);
        }
    };

      const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this blog?")) {
            try {
                const response = await fetch(`http://localhost:4000/api/blogs/${id}`, {
                    method: 'DELETE',
                });

                const json = await response.json()
    
                if (!response.ok) {
                    throw new Error('Failed to delete the blog');
                }
    
                dispatch({ type: 'DELETE_BLOG', payload: json });
            } catch (error) {
                console.error(error);
            }
        }
    };
    

    return (
        <div className="blog-details">
            <div className="blog-header">
                <h4>{blog.title}</h4>
                <button className="DeleteBtn" onClick={() => handleDelete(blog._id)}><FiTrash /></button>
            </div>

            {blog.image && (
                <div className="blog-image">
                    <img src={`http://localhost:4000/uploads/${blog.image}`} alt="Blog" className="blog-image-img" />
                </div>
            )}

            <p><strong>Content: </strong></p>
            <div dangerouslySetInnerHTML={{ __html: blog.content }} />
            <p>Posted On: {formatDate(blog.createdAt)}</p>

            <div className="reactions-group">
                <button
                    className={`upvoteBtn ${upvoted ? 'active' : ''}`}
                    onClick={() => handleUpvote(blog._id)}
                >
                    <FiThumbsUp /> {blog.upvotes}
                </button>
                <button
                    className={`downvoteBtn ${downvoted ? 'active' : ''}`}
                    onClick={() => handleDownvote(blog._id)}
                >
                    <FiThumbsDown /> {blog.downvotes}
                </button>
            </div>
        </div>
    );
};

export default BlogDetails;
