// import React, { useEffect, useState } from 'react';
// import { FiArrowUp, FiArrowDown, FiMessageSquare, FiBookmark } from 'react-icons/fi';
// import './BlogPages.css'; // Assuming you have a CSS file for styling

// const formatDate = (dateString) => {
//     const options = { hour12: false, year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' };
//     return new Date(dateString).toLocaleDateString('en-US', options);
// };

// const BlogsPage = () => {
//     const [blogs, setBlogs] = useState([]);
//     const [showComments, setShowComments] = useState({});

//     useEffect(() => {
//         const fetchBlogs = async () => {
//             try {
//                 const response = await fetch('http://localhost:4000/api/blogs');
//                 const data = await response.json();
//                 setBlogs(data);
//             } catch (error) {
//                 console.error('Error fetching blogs:', error);
//             }
//         };
//         fetchBlogs();
//     }, []);

//     const handleCommentFormToggle = (blogId) => {
//         setShowComments(prevState => ({
//             ...prevState,
//             [blogId]: !prevState[blogId]
//         }));
//     };

//     return (
//         <div className="blogs-page">
//             <div className="blog-container">
//                 {blogs.map(blog => (
//                     <div key={blog._id} className="blog-block">
//                         <h4 className="blog-title">{blog.title}</h4>
//                         {blog.image && (
//                             <div className="blog-image">
//                                 <img
//                                     src={blog.image}
//                                     alt="Blog"
//                                     className="blog-image-img"
//                                 />
//                             </div>
//                         )}
//                         <div className="blog-content">
//                             <div dangerouslySetInnerHTML={{ __html: blog.content }} />
//                         </div>
//                         <p className='posted-on'>Posted On: {formatDate(blog.createdAt)}</p>
//                         <p className="blog-author"><strong>By: {blog.author}</strong></p>

//                         <div className="blog-actions">
//                             <button
//                                 title="Upvote"
//                                 className="icon-button"
//                             >
//                                 <FiArrowUp /> {blog.upvotes}
//                             </button>
//                             <button
//                                 title="Downvote"
//                                 className="icon-button"
//                             >
//                                 <FiArrowDown /> {blog.downvotes}
//                             </button>

//                             <button
//                                 title="Add comment"
//                                 className="icon-button"
//                                 onClick={() => handleCommentFormToggle(blog._id)}
//                             >
//                                 <FiMessageSquare /> {blog.comments.length}
//                             </button>
                            
//                             <button
//                                 title="Save Blog"
//                                 className="icon-button"
//                             >
//                                 <FiBookmark /> {blog.saves}
//                             </button>
//                         </div>

//                         {showComments[blog._id] && (
//                             <div className="comments-list">
//                                 {blog.comments.length > 0 ? (
//                                     blog.comments.map(comment => (
//                                         <div key={comment._id} className="comment-item">
//                                             <p><strong>{comment.author}</strong> commented:</p>
//                                             <p>{comment.content}</p>
//                                             <p className="comment-date">{formatDate(comment.createdAt)}</p>
//                                         </div>
//                                     ))
//                                 ) : (
//                                     <p>No comments yet.</p>
//                                 )}
//                             </div>
//                         )}
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default BlogsPage;
import React, { useEffect, useState } from 'react';
import { FiArrowUp, FiArrowDown, FiMessageSquare, FiBookmark } from 'react-icons/fi';
import './BlogPages.css'; // Assuming you have a CSS file for styling

const formatDate = (dateString) => {
    const options = { hour12: false, year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString('en-US', options);
};

const BlogsPage = () => {
    const [blogs, setBlogs] = useState([]);
    const [showComments, setShowComments] = useState({});

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const response = await fetch('http://localhost:4000/api/blogs');
                const data = await response.json();

                // Fetch comments for each blog
                const blogsWithComments = await Promise.all(
                    data.map(async blog => {
                        const commentsResponse = await fetch(`http://localhost:4000/api/blogs/${blog._id}/comments`);
                        const comments = await commentsResponse.json();
                        return { ...blog, comments };
                    })
                );

                setBlogs(blogsWithComments);
            } catch (error) {
                console.error('Error fetching blogs:', error);
            }
        };

        fetchBlogs();
    }, []);

    const handleCommentFormToggle = (blogId) => {
        setShowComments(prevState => ({
            ...prevState,
            [blogId]: !prevState[blogId]
        }));
    };

    return (
        <div className="blogs-page">
            <div className="blog-container">
                {blogs.map(blog => (
                    <div key={blog._id} className="blog-block">
                        <h4 className="blog-title">{blog.title}</h4>
                        {blog.image && (
                            <div className="blog-image">
                                <img
                                    src={blog.image}
                                    alt="Blog"
                                    className="blog-image-img"
                                />
                            </div>
                        )}
                        <div className="blog-content">
                            <div dangerouslySetInnerHTML={{ __html: blog.content }} />
                        </div>
                        <p className='posted-on'>Posted On: {formatDate(blog.createdAt)}</p>
                        <p className="blog-author"><strong>By: {blog.author}</strong></p>

                        <div className="blog-actions">
                            <button
                                title="Upvote"
                                className="icon-button"
                            >
                                <FiArrowUp /> {blog.upvotes}
                            </button>
                            <button
                                title="Downvote"
                                className="icon-button"
                            >
                                <FiArrowDown /> {blog.downvotes}
                            </button>

                            <button
                                title="Add comment"
                                className="icon-button"
                                onClick={() => handleCommentFormToggle(blog._id)}
                            >
                                <FiMessageSquare /> {blog.comments.length}
                            </button>
                            
                            <button
                                title="Save Blog"
                                className="icon-button"
                            >
                                <FiBookmark /> {blog.saves}
                            </button>
                        </div>

                        {showComments[blog._id] && (
                            <div className="comments-list">
                                {blog.comments.length > 0 ? (
                                    blog.comments.map(comment => (
                                        <div key={comment._id} className="comment-item">
                                            <p><strong>{comment.author}</strong> commented:</p>
                                            <p>{comment.content}</p>
                                            <p className="comment-date">{formatDate(comment.createdAt)}</p>
                                        </div>
                                    ))
                                ) : (
                                    <p>No comments yet.</p>
                                )}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BlogsPage;
