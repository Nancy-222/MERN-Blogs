import { useState } from 'react'
import { useBlogsContext } from '../hooks/useBlogsContext'

const BlogForm = () => {
    const {dispatch} = useBlogsContext()
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [error, setError] = useState(null)
    const [selectedImage, setSelectedImage] = useState(null);

    const handleImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setSelectedImage(URL.createObjectURL(e.target.files[0]));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault()

        const blog ={title,content} //if anything was added add here

        const response = await fetch('/api/blogs', {
            method: 'POST',
            body: JSON.stringify(blog),
            headers: {
                'Content-Type':'application/json'
            }
        })
        const json = await response.json()
        if (!response.ok){
            setError(json.error)
        }
        if (response.ok){
            setError(null)
            setTitle('')
            setContent('')
            console.log('new blog added',json)
            dispatch({type: 'CREATE_BLOG', payload: json})
        }
    }
    return(
        <form className="create" onSubmit={handleSubmit}>
            <h3>Add a New Blog</h3>
            <label>Blog Name<span style={{ color: "red" }}>*</span></label>
            <input 
                type="text"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
            />

            <label>Blog Content<span style={{ color: "red" }}>*</span></label>
            <input 
                type="text"
                onChange={(e) => setContent(e.target.value)}
                value={content}
            />

            <div className="image-upload">
                <label>Blog Images</label>
                <input type="file" accept="image/*" onChange={handleImageChange} />
                {selectedImage && <img src={selectedImage} alt="Selected" className="uploaded-image" />}
            </div>
            
            <button> Add Blog</button>
            {error && <div className="error">{error}</div>}
        </form>
    )
}

export default BlogForm
//We can add here upvotes and downvotes to manually add them 