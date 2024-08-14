import React, { useState, useEffect, useRef } from "react";
import { useBlogsContext } from '../hooks/useBlogsContext';
import './BlogDetails.css';
import { useAuthContext } from '../hooks/useAuthContext';
import { FiArrowDown, FiArrowUp, FiTrash, FiMessageSquare } from "react-icons/fi";
import { GoPencil } from "react-icons/go";

const formatDate = (dateString) => {
    const options = { hour12: false, year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString('en-US', options);
};

const BlogDetails = ({ blog }) => {
    const [upvoted, setUpvoted] = useState(false);
    const [downvoted, setDownvoted] = useState(false);
    const [error, setError] = useState(null);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");
    const [newContent, setNewContent] = useState(blog.content);
    const [isEditing, setIsEditing] = useState(false);
    const [showCommentForm, setShowCommentForm] = useState(false);
    const { dispatch } = useBlogsContext();
    const { user } = useAuthContext();

    const textareaRef = useRef(null);

    useEffect(() => {
        if (showCommentForm) {
            fetchComments();
        }
    }, [showCommentForm]);

    useEffect(() => {
        if (isEditing && textareaRef.current) {
            textareaRef.current.style.height = 'auto'; // Reset height
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`; // Set new height
        }
    }, [newContent, isEditing]);

    const handleUpvote = async (id) => {
        if (!user) {
            setError('You must be logged in');
            return;
        }
        try {
            const response = await fetch(`http://localhost:4000/api/blogs/${id}/upvote`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
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
        if (!user) {
            setError('You must be logged in');
            return;
        }
        try {
            const response = await fetch(`http://localhost:4000/api/blogs/${id}/downvote`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
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
        if (!user) {
            setError('You must be logged in');
            return;
        }
        if (window.confirm("Are you sure you want to delete this blog?")) {
            try {
                const response = await fetch(`http://localhost:4000/api/blogs/${id}`, {
                    headers: {
                        'Authorization': `Bearer ${user.token}`
                    },
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

    const handleEdit = () => {
        setIsEditing(!isEditing);
    };

    const handleSaveEdit = async () => {
        if (!user) {
            setError('You must be logged in');
            return;
        }
        try {
            const response = await fetch(`http://localhost:4000/api/blogs/${blog._id}/content`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                },
                body: JSON.stringify({ content: newContent }),
            });

            if (!response.ok) {
                throw new Error('Failed to update the blog');
            }

            const updatedBlog = await response.json();
            dispatch({ type: 'UPDATE_BLOG', payload: updatedBlog });
            setNewContent(updatedBlog.content); // Update content with the latest
            setIsEditing(false); // Switch back to non-edit mode
        } catch (error) {
            console.error(error);
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
                fetchComments();
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
                <div className="actions">
                    <button className="DeleteBtn" title="Delete Blog" onClick={() => handleDelete(blog._id)}><FiTrash /></button>
                    <button className="EditBtn" title="Edit Blog" onClick={handleEdit}><GoPencil /></button>
                </div>
            </div>

            {blog.image && (
                <div className="blog-image">
                    <img src={`http://localhost:4000/uploads/${blog.image}`} alt="Blog" className="blog-image-img" />
                </div>
            )}

            {!isEditing ? (
                <div dangerouslySetInnerHTML={{ __html: blog.content }} />
            ) : (
                <div>
                    <textarea
                        ref={textareaRef}
                        value={newContent}
                        onChange={(e) => setNewContent(e.target.value)}
                        className="edit-content-textarea"
                    />
                    <div className="edit-buttons">
                        <button onClick={handleSaveEdit} className="save-btn">Save</button>
                        <button onClick={() => setIsEditing(false)} className="cancel-btn">Cancel</button>
                    </div>
                </div>
            )}

            <p className='posted-on'>Posted On: {formatDate(blog.createdAt)}</p>
            <p className="blog-author"><strong>By: {blog.author}</strong></p>

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
                    <FiMessageSquare /> {comments.length || 0}
                </button>
            </div>

            {showCommentForm && (
                <div className="comment-form">
                    <textarea
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="Add a comment..."
                    />
                    <button onClick={handleCommentSubmit}>Submit</button>
                </div>
            )}

            <div className="comments">
                {comments.map(comment => (
                    <div key={comment._id} className="comment">
                        <p>{comment.text}</p>
                        <p className="comment-date">Posted on: {formatDate(comment.created)}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BlogDetails;
