import React, { useState, useRef, useEffect } from 'react';
import { useBlogsContext } from '../hooks/useBlogsContext';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import styles
import './BlogFormDetails.css'; // Import the CSS file
// Components
import BlogDetails from '../components/BlogDetails';
import BlogForm from '../components/BlogForm';

const BASE_URL = 'http://localhost:4000'; // Define BASE_URL here

// const formatDate = (dateString) => {
//     const options = { hour12: false, year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' };
//     return new Date(dateString).toLocaleDateString('en-US', options);
// };

const BlogFormDetails = () => {
    const { blogs, dispatch } = useBlogsContext();

    useEffect(() => {
        const fetchBlogs = async () => {
            const response = await fetch(`${BASE_URL}/api/blogs/`);
            const json = await response.json();

            if (response.ok) {
                dispatch({ type: 'SET_BLOGS', payload: json });
            }
        };
        fetchBlogs();
    }, [dispatch]);

    return (
        <div className="home">
            {/* Blog Form at the top */}
            <div className="blog-form">
                <BlogForm />
            </div>

            {/* Display previously added blogs */}
            <div className="blogs">
                {blogs && blogs.map((blog) => (
                    <BlogDetails key={blog._id} blog={blog} />
                ))}
            </div>
        </div>
    );
};

export default BlogFormDetails;