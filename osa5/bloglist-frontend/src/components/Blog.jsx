import { useState } from 'react'

const Blog = ({ blog, addLikes, removeBlog, user}) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const [visible, setVisible] = useState(false)
  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const addLike = () => {
    addLikes(blog.id)
  }

  const removeBlogs = () =>{
    removeBlog(blog.id)
  }
 
  // nappula deletointiin joka näkyy jos

  const RemoveButton = () => {
    //console.log("user", user)
    if (user.name === blog.user.name){
    return (
      <div>
      <button onClick = {removeBlogs}>remove</button>
      </div> 
    )}
  }

  return (
    <div style={blogStyle}>
  <div>
    <div style={hideWhenVisible}>
    {blog.title} <button onClick={() => setVisible(true)}>view</button>
    </div>
    <div style={showWhenVisible}>
    {blog.title}  {blog.author} <button onClick={toggleVisibility}>hide</button>
    <br></br> 
     {blog.url}  <br></br>likes {blog.likes} <button onClick={addLike}>like</button>  <br></br>{blog.user.name} <br></br>
     <RemoveButton/>
     </div>
  </div>  
  
  </div>
)}

export default Blog