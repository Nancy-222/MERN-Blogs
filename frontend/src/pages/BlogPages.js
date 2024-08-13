import React, { useState, useEffect } from 'react';
import './BlogPages.css'; // Ensure this file exists or correct the path
import { FiArrowDown, FiArrowUp, FiMessageSquare, FiBookmark } from "react-icons/fi";

const formatDate = (dateString) => {
  const options = { hour12: false, year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' };
  return new Date(dateString).toLocaleDateString('en-US', options);
};

const BlogsPage = () => {
  const [showComments, setShowComments] = useState({});
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/blogs');
        if (!response.ok) throw new Error('Failed to fetch blogs');
        const data = await response.json();
        setBlogs(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchBlogs();
  }, []);

  const fetchComments = async (blogId) => {
    try {
      const response = await fetch(`http://localhost:4000/api/blogs/${blogId}/comments`);
      const data = await response.json();
      setShowComments((prevState) => ({
        ...prevState,
        [blogId]: data
      }));
    } catch (error) {
      console.error("Failed to fetch comments", error);
    }
  };

  const handleCommentFormToggle = (blogId) => {
    setShowComments((prevState) => {
      const newShowComments = { ...prevState };
      if (newShowComments[blogId]) {
        delete newShowComments[blogId];
      } else {
        fetchComments(blogId);
        newShowComments[blogId] = [];
      }
      return newShowComments;
    });
  };


//   return (
//     <div className="blogs-page">
//       <div className="blog-container">
//         {blogs.map(blog => (
//           <div key={blog.id} className="blog-block">
//             <h4>{blog.title}</h4>
//             {blog.image && (
//               <img
//                 src={`http://localhost:4000/uploads/${blog.image}`}
//                 alt="Blog"
//                 style={{ maxWidth: '100%', borderRadius: '8px' }}
//               />
//             )}
//             <div dangerouslySetInnerHTML={{ __html: blog.content }} />
//             <p className="posted-on">Posted On: {formatDate(blog.createdAt)}</p>
//             <p className="blog-author"><strong>By: {blog.author}</strong></p> 
//             <div className="blog-actions">
//               <button className="icon-button" title="Upvote">
//                 <FiArrowUp />
//                 <span className="icon-value">{blog.upvotes}</span>
//               </button>
//               <button className="icon-button" title="Downvote">
//                 <FiArrowDown />
//                 <span className="icon-value">{blog.downvotes}</span>
//               </button>
//               <button className="icon-button" title="View Comments">
//                 <FiMessageSquare />
//                 <span className="icon-value">{blog.comments.length}</span>
//               </button>
//               <button className="icon-button" title="View Saved Blogs">
//                 <FiBookmark />
//                 <span className="icon-value">{blog.savedCount || 0}</span>
//               </button>

//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default BlogsPage;

return (
  <div className="blogs-page">
    <div className="blog-container">
      {blogs.map(blog => (
        <div key={blog._id} className="blog-block">
          <h4>{blog.title}</h4>
          {blog.image && (
            <img
              src={`http://localhost:4000/uploads/${blog.image}`}
              alt="Blog"
              style={{ maxWidth: '100%', borderRadius: '8px' }}
            />
          )}
          <div dangerouslySetInnerHTML={{ __html: blog.content }} />
          <p className="posted-on">Posted On: {formatDate(blog.createdAt)}</p>
          <p className="blog-author"><strong>By: {blog.author}</strong></p>
          <div className="blog-actions">
            <button className="icon-button" title="Upvote">
              <FiArrowUp />
              <span className="icon-value">{blog.upvotes}</span>
            </button>
            <button className="icon-button" title="Downvote">
              <FiArrowDown />
              <span className="icon-value">{blog.downvotes}</span>
            </button>
            <button
              className="icon-button"
              title="View Comments"
              onClick={() => handleCommentFormToggle(blog._id)}
            >
              <FiMessageSquare />
              <span className="icon-value">{blog.comments.length}</span>
            </button>
            <button className="icon-button" title="View Saved Blogs">
              <FiBookmark />
              <span className="icon-value">{blog.savedCount || 0}</span>
            </button>
          </div>

          {/* Comment List */}
          {showComments[blog._id] && (
            <div className="comments-list">
              {showComments[blog._id].length > 0 ? (
                showComments[blog._id].map(comment => (
                  <div key={comment._id} className="comment-item">
                    <p><strong>{comment.author}</strong> says:</p>
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

