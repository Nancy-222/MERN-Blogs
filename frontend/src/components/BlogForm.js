// import React, { useState, useRef, useEffect } from 'react';
// import { useBlogsContext } from '../hooks/useBlogsContext';
// import ReactQuill from 'react-quill';
// import 'react-quill/dist/quill.snow.css'; // Import styles
// import './BlogForm.css';
// import { useAuthContext } from '../hooks/useAuthContext';

// const BASE_URL = 'http://localhost:4000'; // Define BASE_URL here

// const BlogForm = () => {
//     const { dispatch } = useBlogsContext(); // Ensure dispatch is correctly obtained
//     const [title, setTitle] = useState('');
//     const [content, setContent] = useState('');
//     const [error, setError] = useState(null);
//     const quillRef = useRef(null);
//     const [selectedImage, setSelectedImage] = useState(null);
//     const { user } = useAuthContext()

//     const handleImageChange = (e) => {
//         if (e.target.files && e.target.files[0]) {
//             setSelectedImage(URL.createObjectURL(e.target.files[0]));
//         }
//     };

//     // Adjust height of the Quill editor dynamically
//     useEffect(() => {
//         const handleResize = () => {
//             if (quillRef.current) {
//                 // Reset height to auto to calculate new height
//                 quillRef.current.getEditor().container.style.height = 'auto';
//                 // Set height to scroll height
//                 quillRef.current.getEditor().container.style.height = `${quillRef.current.getEditor().container.scrollHeight}px`;
//             }
//         };

//         // Attach event listener for input events
//         const quillEditor = quillRef.current?.getEditor();
//         if (quillEditor) {
//             quillEditor.on('text-change', handleResize);
//         }

//         // Cleanup event listener on component unmount
//         return () => {
//             if (quillEditor) {
//                 quillEditor.off('text-change', handleResize);
//             }
//         };
//     }, [content]);

//     const handleSubmit = async (e) => {
//         if (!user){
//             setError('You must be logged in')
//             return
//         }

//         e.preventDefault();
    
//         // Validate that title and content are not empty
//         if (!title.trim() || !content.trim()) {
//             setError('Both name and content are required!');
//             return;
//         }

        
//     if (content === '<p><br></p>') {
//         setError('Both name and content are required!');
//         return;
//     }
    
//         const blog = { title, content };
    
//         try {
//             const response = await fetch(`${BASE_URL}/api/blogs/`, {
//                 method: 'POST',
//                 body: JSON.stringify(blog),
//                 headers: {
//                     'Content-Type': 'application/json',
//                     'Authorization': `Bearer ${user.token}`
//                 },
//             });
//             const json = await response.json();
//             if (!response.ok) {
//                 setError(json.error);
//             } else {
//                 setError(null);
//                 setTitle('');
//                 setContent('');
//                 console.log('New blog added', json);
//                 dispatch({ type: 'CREATE_BLOG', payload: json });
//             }
//         } catch (error) {
//             setError('An error occurred while adding the blog.');
//         }
//     };
    

//     return (
//         <form enctype="multipart/form-data" className="create" onSubmit={handleSubmit}>
//             <h3>Add a New Blog</h3>
//             <label>Blog Name<span style={{ color: "red" }}>*</span></label>
//             <input
//                 type="text"
//                 onChange={(e) => setTitle(e.target.value)}
//                 value={title}
//             />

//             <label className="blog-content-wrapper">Blog Content<span style={{ color: "red" }}>*</span></label>
//             <ReactQuill
//                 ref={quillRef}
//                 value={content}
//                 onChange={setContent}
//                 theme="snow"
//                 modules={{
//                     toolbar: [
//                         [{ 'header': '1' }, { 'header': '2' }],
//                         [{ 'font': [] }],
//                         [{ 'list': 'ordered' }, { 'list': 'bullet' }],
//                         ['bold', 'italic', 'underline'],
//                         ['link'],
//                         [{ 'align': [] }],
//                         ['clean'] 
//                     ],
//                 }}
//                 style={{ height: 'auto', minHeight: '100px'}}
//             />

//             <div className="image-upload">
//                 <label>Blog Images</label>
//                 <input type="file" accept="image/*" onChange={handleImageChange} />

//             </div>

//             <button type="submit" className="add-blog-button">Add Blog</button>

//             {error && <div className="error">{error}</div>}
//         </form>
//     );
// };

// export default BlogForm;

import React, { useState, useRef, useEffect } from 'react';
import { useBlogsContext } from '../hooks/useBlogsContext';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import styles
import './BlogForm.css';
import { useAuthContext } from '../hooks/useAuthContext';

const BASE_URL = 'http://localhost:4000'; // Define BASE_URL here

const BlogForm = () => {
    const { dispatch } = useBlogsContext(); // Ensure dispatch is correctly obtained
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [error, setError] = useState(null);
    const quillRef = useRef(null);
    const [selectedImage, setSelectedImage] = useState(null);
    const { user } = useAuthContext();

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
        if (!user){
            setError('You must be logged in');
            return;
        }

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
    
        const blog = { title, content };
    
        try {
            const response = await fetch(`${BASE_URL}/api/blogs/`, {
                method: 'POST',
                body: JSON.stringify(blog),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                },
            });
            const json = await response.json();
            if (!response.ok) {
                setError(json.error);
            } else {
                setError(null);
                setTitle('');
                setContent('');
                console.log('New blog added', json);
                dispatch({ type: 'CREATE_BLOG', payload: json });
            }
        } catch (error) {
            setError('An error occurred while adding the blog.');
        }
    };

    return (
        <form enctype="multipart/form-data" className="create" onSubmit={handleSubmit}>
            <h3>Add a New Blog</h3>
            <label>Blog Name<span style={{ color: "red" }}>*</span></label>
            <input
                type="text"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
            />

            <label className="blog-content-wrapper">Blog Content<span style={{ color: "red" }}>*</span></label>
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
                        ['clean'] 
                    ],
                }}
                style={{ height: 'auto', minHeight: '100px' }}
            />

            <div className="image-upload">
                <label>Blog Images</label>
                <input type="file" accept="image/*" onChange={handleImageChange} />
            </div>

            <button type="submit" className="add-blog-button">Add Blog</button>

            {error && <div className="error">{error}</div>}
        </form>
    );
};

export default BlogForm;
