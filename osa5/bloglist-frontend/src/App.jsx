import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'


const App = () => {
  const [blogformVisible, setBlogFormVisible] = useState(false)
  const [blogs, setBlogs] = useState([])
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)


  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])


  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])


  const handleLogin =  async (event) => {
    event.preventDefault()
    console.log('logging in with', username, password)

    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    }
    catch (exception) {
      setErrorMessage('wrong username or password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }

  }


  const loginForm = () => (

    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          type="text"
          data-testid="username"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type="password"
          data-testid="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  )

  const addBlog = (blogObject) => {   // (event) =>{
    //console.log('add blog-button clicked', event.target)
    //event.preventDefault()

    //const blogObject ={
    //  title: newTitle,
    //  author: newAuthor,
    //  url: newUrl
    //}
    blogFormRef.current.toggleVisibility()

    blogService
      .create(blogObject)
      .then(returnedBlog => {
        //setBlogs(blogs.concat(returnedBlog))
        setBlogs(blogs.concat({ ...returnedBlog, user }))  // tämä avulla lisäyksen jälkeen user näkyy, ei tarvi refresh
        console.log('vahvistus lisäyksestä')
        //.catch(error)
        setErrorMessage(
          `a new blog "${blogObject.title}" by ${blogObject.author} was added`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)

        //  setNewTitle('')
        //  setNewAuthor('')
        //  setNewUrl('')
      })

  } //)

  const addLikes = (id) => {
    //console.log('testataan addLike_id', id)
    const blog = blogs.find(blog => blog.id === id)
    const updatedBlog = { ...blog, likes: blog.likes+1 }
    //console.log('updated blog mm. likes', updatedBlog)
    blogService
      .update(blog.id, updatedBlog)
      .then(returnedBlog => {
        //console.log('returned blog', returnedBlog)
        //console.log('muutos blog_likes', returnedBlog.likes)
        setBlogs(blogs.map(blog => blog.id !== returnedBlog.id ? blog : returnedBlog))
      })
  }

  const removeBlog = (id) => {
    //const {blog} = props
    //const {id} = blog.id
    //console.log("poistettava id", id)
    const blog = blogs.find(blog => blog.id === id) // tämä lisätty
    //console.log("poistettava blog", blog)
    if (window.confirm(`Remove blog "${blog.title}" by ${blog.author}?`)){
      blogService
        .remove(blog.id)
        .then(() =>
          blogService
            .getAll()
            .then((response => setBlogs(response)))

        )}
    //console.log("siivottu lista", blogs)
    //console.log("vahvistus poistosta")
    setErrorMessage(
      `${blog.title} was deleted`
    )
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }



  const logout = (props) => {
    //console.log('uloskirjautuja', props)
    window.localStorage.removeItem('loggedBlogappUser')
    //console.log('on poistettu')
    window.location.reload()
  }


  return (
    <div>
      {!user && <div>
        <h2> Log in to application</h2>
        <Notification message={errorMessage} />
        {loginForm()}
      </div>
      }
      {user && <div>
        <h2>Blogs</h2>
        <Notification message={errorMessage} />
        <p>{user.name} logged in
          <button onClick={() =>
            logout({ user })} type="submit">logout</button> </p>
        <Togglable buttonLabel="create new blog" ref ={blogFormRef}>
          <BlogForm createBlog={addBlog}/>

        </Togglable>
        {blogs.sort((a,b) => b.likes - a.likes).map(blog =>
          <Blog key={blog.id} blog={blog} addLikes={addLikes} removeBlog ={removeBlog} user={user}/>
        )}
      </div>
      }
    </div>
  )
}

export default App
