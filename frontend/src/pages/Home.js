import { useEffect } from 'react';
import { useBlogsContext } from '../hooks/useBlogsContext';

// Components
import BlogDetails from '../components/BlogDetails';
import BlogForm from '../components/BlogForm';

const Home = () => {
    const { blogs, dispatch } = useBlogsContext();

    useEffect(() => {
        const fetchBlogs = async () => {
            const response = await fetch('/api/blogs');
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

export default Home;
