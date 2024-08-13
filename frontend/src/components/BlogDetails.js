import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { useBlogsContext } from '../hooks/useBlogsContext';
import './BlogDetails.css' ;
import { FiArrowDown, FiArrowUp, FiTrash, FiMessageSquare} from "react-icons/fi";
import { GoPencil } from "react-icons/go";

const formatDate = (dateString) => {
    const options = { hour12: false, year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString('en-US', options);
};

const BlogDetails = ({ blog }) => {
    const [upvoted, setUpvoted] = useState(false);
    const [downvoted, setDownvoted] = useState(false);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");
    const [showCommentForm, setShowCommentForm] = useState(false); // New state for comment form visibility
    const { dispatch } = useBlogsContext();

    useEffect(() => {
        if (showCommentForm) {
            fetchComments(); // Fetch comments if the form is shown
        }
    }, [showCommentForm]);

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

                const json = await response.json();

                if (!response.ok) {
                    throw new Error('Failed to delete the blog');
                }

                dispatch({ type: 'DELETE_BLOG', payload: json });
            } catch (error) {
                console.error(error);
            }
        }
    };

    const fetchComments = async () => {
        try {
            const response = await fetch(`http://localhost:4000/api/blogs/${blog._id}/comments`);
            const data = await response.json();
            setComments(data);
        } catch (error) {
            console.error("Failed to fetch comments", error);
        }
    };

    const handleCommentSubmit = async () => {
        if (!newComment) return;

        try {
            const response = await fetch(`http://localhost:4000/api/blogs/${blog._id}/comments`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
                body: JSON.stringify({ text: newComment }),
            });

            if (response.ok) {
                fetchComments(); // Reload comments
                setNewComment("");
            } else {
                console.error('Failed to submit comment');
            }
        } catch (error) {
            console.error("Failed to submit comment", error);
        }
    };

    const handleCommentFormToggle = () => {
        setShowCommentForm(!showCommentForm);
    };

    return (
        <div className="blog-details">
            <div className="blog-header">
                <h4 className="blog-title">{blog.title}</h4>
                <h6 className="blog-author"> By: {blog.author}</h6>
                <button className="DeleteBtn" onClick={() => handleDelete(blog._id)}><FiTrash /></button>
                {/* <button title="Edit Blog"><GoPencil /></button> */}
            </div>
            
            {blog.image && (
                <div className="blog-image">
                    <img src={`http://localhost:4000/uploads/${blog.image}`} alt="Blog" className="blog-image-img" />
                </div>
            )}

            <div dangerouslySetInnerHTML={{ __html: blog.content }} />
            <p className='posted-on'>Posted On: {formatDate(blog.createdAt)}</p>

            <div className="reactions-group">
                <button title="Upvote"
                    className={`upvoteBtn ${upvoted ? 'active' : ''}`}
                    onClick={() => handleUpvote(blog._id)}
                >
                    <FiArrowUp /> {blog.upvotes}
                </button>
                <button title="Downvote"
                    className={`downvoteBtn ${downvoted ? 'active' : ''}`}
                    onClick={() => handleDownvote(blog._id)}
                >
                    <FiArrowDown /> {blog.downvotes}
                </button>
                <button title="Add Comment"
                    className="commentBtn"
                    onClick={handleCommentFormToggle}
                >
                    <FiMessageSquare />
                </button>
            </div>

            {showCommentForm && (
                <div className="comment-form">
                    <textarea
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="Add a comment..."
                    ></textarea>
                    <button onClick={handleCommentSubmit}>Post Comment</button>
                </div>
            )}
        </div>
    );
};

export default BlogDetails;
