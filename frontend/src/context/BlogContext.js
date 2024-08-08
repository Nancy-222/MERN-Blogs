import { createContext, useReducer, useContext } from "react"

export const BlogsContext = createContext()

export const blogsReducer = (state, action) => {
    switch (action.type) {
        case 'SET_BLOGS':
            return {
                blogs: action.payload
            }
        case 'CREATE_BLOG':
            return {
                blogs: [action.payload, ...state.blogs]
            }
        case 'UPDATE_BLOG':
            return {
                blogs: state.blogs.map(blog =>
                blog._id === action.payload._id ? action.payload : blog
                ),
            };
        default:
            return state
    }
}

export const BlogsContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(blogsReducer, { blogs: [] });
  
    return (
      <BlogsContext.Provider value={{ ...state, dispatch }}>
        {children}
      </BlogsContext.Provider>
    );
  };
  
  export const useBlogsContext = () => useContext(BlogsContext);