const BlogDetails = ({ blog}) => {
    return(
        <div className="blog-details">
            <h4>{blog.title}</h4>
            <p><strong>Content: </strong>{blog.content}</p>
            <p><strong>Upvotes: </strong>{blog.upvotes}</p>
            <p><strong>Downvotes: </strong>{blog.downvotes}</p>
            <p>{blog.createdAt}</p>
        </div>
    )
}
export default BlogDetails