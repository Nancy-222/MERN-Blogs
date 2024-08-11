import React, { useState, useEffect } from 'react';
import './BlogPages.css'; // Ensure this file exists or correct the path

const formatDate = (dateString) => {
  const options = { hour12: false, year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' };
  return new Date(dateString).toLocaleDateString('en-US', options);
};

const BlogsPage = () => {
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

  return (
    <div className="blogs-page">
      <div className="blog-container">
        {blogs.map(blog => (
          <div key={blog.id} className="blog-block">
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
            <div className="blog-actions">
              <button className="icon-button">
                <i className="fas fa-arrow-up"></i>
                <span className="icon-value">0</span>
              </button>
              <button className="icon-button">
                <i className="fas fa-arrow-down"></i>
                <span className="icon-value">0</span>
              </button>
              <button className="icon-button">
                <i className="far fa-comment"></i>
                <span className="icon-value">0</span>
              </button>
              <button className="icon-button">
                <i className="far fa-bookmark"></i> {/* Outlined Saved icon */}
                <span className="icon-value">0</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogsPage;

