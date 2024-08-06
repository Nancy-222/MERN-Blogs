import { useState } from 'react'
import { useBlogsContext } from '../hooks/useBlogsContext'

const BlogForm = () => {
    const {dispatch} = useBlogsContext()
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [error, setError] = useState(null)

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
            <label>Blog Name:</label>
            <input 
                type="text"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
            />

            <label>Blog Content:</label>
            <input 
                type="text"
                onChange={(e) => setContent(e.target.value)}
                value={content}
            />

            
            <button> Add Blog</button>
            {error && <div className="error">{error}</div>}
        </form>
    )
}

export default BlogForm
//We can add here upvotes and downvotes to manually add them 