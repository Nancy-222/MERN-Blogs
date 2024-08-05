import{useEffect, useState} from 'react'

//components
import BlogDetails from '../components/BlogDetails'
import BlogForm from '../components/BlogForm'

const Home =() => {
    const [blogs, setBlogs ] = useState(null)
    useEffect(() => {
        const fetchBlogs = async () => {
            const response = await fetch('/api/blogs') 
            const json = await response.json()

            if (response.ok) {
                setBlogs(json)
            }
        }
        fetchBlogs()
    }, [])
    return (
        <div className="home">
            <div className ="blogs">
                {blogs && blogs.map((blog) => (
                    <BlogDetails key={blog._id} blog={blog} />
                ))}
            </div>
            <BlogForm/>

        </div>
    )
}

export default Home