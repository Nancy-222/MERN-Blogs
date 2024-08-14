import React, { useState, useEffect } from 'react';
import { useBlogsContext } from '../hooks/useBlogsContext';
import BlogDetails from '../components/BlogDetails';
import BlogForm from '../components/BlogForm';
import { FaUserPlus } from 'react-icons/fa';
import './BlogFormDetails.css';

const BASE_URL = 'http://localhost:4000'; // Define BASE_URL here

const BlogFormDetails = () => {
    const { blogs, dispatch } = useBlogsContext();
    const [users, setUsers] = useState([]);

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

    useEffect(() => {
        const fetchUsers = async () => {
            const response = await fetch(`${BASE_URL}/api/users`);
            const json = await response.json();

            if (response.ok) {
                setUsers(json);
            }
        };
        fetchUsers();
    }, []);

    return (
        <div className="blog-form-details-page">
            <div className="main-content">
                <div className="blog-content">
                    <div className="blog-form-section">
                        <BlogForm />
                    </div>
                    <div className="blog-details-section">
                        {blogs && blogs.map((blog) => (
                            <BlogDetails key={blog._id} blog={blog} />
                        ))}
                        {blogs && blogs.map((blog) => console.log(blog))}
                    </div>
                </div>
                <div className="sidebar">
                    <div className="add-friend">
                        <h3>Add Friends</h3>
                        <ul>
                            {users.map(user => (
                                <li key={user._id}>
                                    <button className="add-friend-btn">
                                        <FaUserPlus />
                                    </button>
                                    {user.firstName} {user.lastName}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default BlogFormDetails;

