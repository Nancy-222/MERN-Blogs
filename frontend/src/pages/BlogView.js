import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import './BlogView.css';

const BlogView = () => {
    const { id } = useParams();
    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const BASE_BACK_URL = "http://localhost:4000";

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const response = await fetch(`${BASE_BACK_URL}/api/blogs/${id}`);
                if (!response.ok) {
                    throw new Error('Blog not found');
                }
                const data = await response.json();
                setBlog(data);
                setLoading(false);
            } catch (err) { 
                setError(err.message);
                setLoading(false);
            }
        };
        fetchBlog();
    }, [id]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="blog-details">
            <div className="blog-header">
                <h4>{ blog.title}</h4>

            </div>

            <div dangerouslySetInnerHTML={{ __html: blog.content }} />
            <p>Posted On: {blog.createdAt}</p>
        </div>
    );
};

export default BlogView;
