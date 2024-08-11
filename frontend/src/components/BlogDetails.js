import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useBlogsContext } from '../hooks/useBlogsContext';
import { FiThumbsDown, FiThumbsUp, FiTrash } from "react-icons/fi";
import './BlogDetails.css';

const formatDate = (dateString) => {
    const options = { hour12: false, year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString('en-US', options);
};

const BlogDetails = () => {
    const { id } = useParams();
    const [blog, setBlog] = useState(null);
    const [upvoted, setUpvoted] = useState(false);
    const [downvoted, setDownvoted] = useState(false);
    const { dispatch } = useBlogsContext();

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const response = await fetch(`http://localhost:4000/api/blogs/${id}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch blog');
                }
                const data = await response.json();
                setBlog(data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchBlog();
    }, [id]);

    const handleUpvote = async () => {
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

    const handleDownvote = async () => {
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

    const handleDelete = async () => {
        if (window.confirm("Are you sure you want to delete this blog?")) {
            try {
                const response = await fetch(`http://localhost:4000/api/blogs/${id}`, {
                    method: 'DELETE',
                });

                if (!response.ok) {
                    throw new Error('Failed to delete the blog');
                }

                dispatch({ type: 'DELETE_BLOG', payload: id });
                // Redirect or show a success message here
            } catch (error) {
                console.error(error);
            }
        }
    };

    if (!blog) {
        return <div>Loading...</div>;
    }

    return (
        <div className="blog-details">
            <div className="blog-header">
                <h4>{blog.title}</h4>
                <button className="DeleteBtn" onClick={handleDelete}><FiTrash /></button>
            </div>

            {blog.image && (
                <div className="blog-image">
                    <img src={`http://localhost:4000/uploads/${blog.image}`} alt="Blog" className="blog-image-img" />
                </div>
            )}

            <div dangerouslySetInnerHTML={{ __html: blog.content }} />
            <p>Posted On: {formatDate(blog.createdAt)}</p>

            <div className="reactions-group">
                <button
                    className={`reactionBtn ${upvoted ? 'active' : ''}`}
                    onClick={handleUpvote}
                >
                    <FiThumbsUp /> {blog.upvotes}
                </button>
                <button
                    className={`reactionBtn ${downvoted ? 'active' : ''}`}
                    onClick={handleDownvote}
                >
                    <FiThumbsDown /> {blog.downvotes}
                </button>
            </div>
        </div>
    );
};

export default BlogDetails;
