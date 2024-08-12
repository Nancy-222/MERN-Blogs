import React, { useState, useRef, useEffect } from 'react';
import { useBlogsContext } from '../hooks/useBlogsContext';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import styles
import './BlogFormDetails.css'; // Import the CSS file

const BASE_URL = 'http://localhost:4000'; // Define BASE_URL here

const formatDate = (dateString) => {
    const options = { hour12: false, year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString('en-US', options);
};

const BlogFormDetails = () => {
    const { dispatch } = useBlogsContext(); // Ensure dispatch is correctly obtained
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [error, setError] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);
    const [blogs, setBlogs] = useState([]); // State for storing blogs
    const quillRef = useRef(null);

    // Fetch blogs from API
    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const response = await fetch(`${BASE_URL}/api/blogs/`);
                const json = await response.json();
                if (response.ok) {
                    setBlogs(json);
                } else {
                    setError(json.error);
                }
            } catch (error) {
                setError('An error occurred while fetching blogs.');
            }
        };

        fetchBlogs();
    }, []);

    // Adjust height of the Quill editor dynamically
    useEffect(() => {
        const handleResize = () => {
            if (quillRef.current) {
                // Reset height to auto to calculate new height
                quillRef.current.getEditor().container.style.height = 'auto';
                // Set height to scroll height
                quillRef.current.getEditor().container.style.height = `${quillRef.current.getEditor().container.scrollHeight}px`;
            }
        };

        // Attach event listener for input events
        const quillEditor = quillRef.current?.getEditor();
        if (quillEditor) {
            quillEditor.on('text-change', handleResize);
        }

        // Cleanup event listener on component unmount
        return () => {
            if (quillEditor) {
                quillEditor.off('text-change', handleResize);
            }
        };
    }, [content]);

    const handleImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setSelectedImage(e.target.files[0]);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        // Validate that title and content are not empty
        if (!title.trim() || !content.trim()) {
            setError('Both name and content are required!');
            return;
        }

        if (content === '<p><br></p>') {
            setError('Both name and content are required!');
            return;
        }
    
        const formData = new FormData();
        formData.append('title', title);
        formData.append('content', content);
        if (selectedImage) {
            formData.append('image', selectedImage);
        }

        try {
            const response = await fetch(`${BASE_URL}/api/blogs/`, {
                method: 'POST',
                body: formData,
                // Remove contentType as FormData handles this automatically
            });
            const json = await response.json();
            if (!response.ok) {
                setError(json.error);
            } else {
                setError(null);
                setTitle('');
                setContent('');
                setSelectedImage(null);
                console.log('New blog added', json);
                dispatch({ type: 'CREATE_BLOG', payload: json });
                // Optionally, refetch blogs to include the newly added blog
                const updatedBlogsResponse = await fetch(`${BASE_URL}/api/blogs/`);
                const updatedBlogs = await updatedBlogsResponse.json();
                setBlogs(updatedBlogs);
            }
        } catch (error) {
            setError('An error occurred while adding the blog.');
        }
    };

    return (
        <div className="blog-form-details-page">
            <div className="blog-form-details-container">
                <h3 className="blog-form-details-heading">Add a New Blog</h3>
                <form className="blog-form-details-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Blog Name<span style={{ color: "red" }}>*</span></label>
                        <input
                            type="text"
                            onChange={(e) => setTitle(e.target.value)}
                            value={title}
                        />
                    </div>

                    <div className="form-group">
                        <label>Blog Content<span style={{ color: "red" }}>*</span></label>
                        <ReactQuill
                            ref={quillRef}
                            value={content}
                            onChange={setContent}
                            modules={{
                                toolbar: [
                                    [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
                                    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                                    ['bold', 'italic', 'underline'],
                                    ['link'],
                                    [{ 'align': [] }],
                                    ['clean'] 
                                ],
                            }}
                        />
                    </div>

                    <div className="form-group">
                        <label>Blog Image</label>
                        <input type="file" onChange={handleImageChange} />
                        {selectedImage && (
                            <p>Selected image: {selectedImage.name}</p>
                        )}
                    </div>

                    {error && <div className="error">{error}</div>}
                    <button type="submit">Add Blog</button>
                </form>
            </div>

            <div className="blogs-list">
                <ul className="blog-items-list">
                    {blogs.map((blog) => (
                        <li key={blog._id} className="blog-item">
                            <h4>{blog.title}</h4>
                            {blog.image && <img src={blog.image} alt={blog.title} />}
                            <div dangerouslySetInnerHTML={{ __html: blog.content }} />
                            <p>Posted On: {formatDate(blog.createdAt)}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default BlogFormDetails;