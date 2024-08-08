import React, { useState, useRef, useEffect } from 'react';
import { useBlogsContext } from '../hooks/useBlogsContext';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import styles

const BlogForm = () => {
    const { dispatch } = useBlogsContext();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [error, setError] = useState(null);
    const quillRef = useRef(null);
    const [selectedImage, setSelectedImage] = useState(null);

    const handleImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setSelectedImage(URL.createObjectURL(e.target.files[0]));
        }
    };

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

    const handleSubmit = async (e) => {
        e.preventDefault();

        const blog = { title, content };

        const response = await fetch('http://localhost:4000/api/blogs/', {
            method: 'POST',
            body: JSON.stringify(blog),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const json = await response.json();
        if (!response.ok) {
            setError(json.error);
        }
        if (response.ok) {
            setError(null);
            setTitle('');
            setContent('');
            console.log('new blog added', json);
            dispatch({ type: 'CREATE_BLOG', payload: json });
        }
    };

    return (
        <form className="create" onSubmit={handleSubmit}>
            <h3>Add a New Blog</h3>
            <label>Blog Name<span style={{ color: "red" }}>*</span></label>
            <input
                type="text"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
            />

            <label>Blog Content<span style={{ color: "red" }}>*</span></label>
            <ReactQuill
                ref={quillRef}
                value={content}
                onChange={setContent}
                theme="snow"
                modules={{
                    toolbar: [
                        [{ 'header': '1' }, { 'header': '2' }],
                        [{ 'font': [] }],
                        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                        ['bold', 'italic', 'underline'],
                        ['link'],
                        [{ 'align': [] }],
                        ['clean'] // remove formatting
                    ],
                }}
                style={{ height: 'auto', minHeight: '100px' }} // Adjust minHeight as needed
            />

     <div className="image-upload">
                <label>Blog Images</label>
                <input type="file" accept="image/*" onChange={handleImageChange} />
                {selectedImage && <img src={selectedImage} alt="Selected" className="uploaded-image" />}
            </div>

            <button>Add Blog</button>
            {error && <div className="error">{error}</div>}
        </form>
    );
};

export default BlogForm;
