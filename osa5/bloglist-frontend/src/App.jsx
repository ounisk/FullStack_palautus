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
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
          <input
          type="password"
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
          setBlogs(blogs.concat(returnedBlog))

          console.log("vahvistus lisäyksestä")
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
        <h2>blogs</h2>
        <Notification message={errorMessage} />
        <p>{user.name} logged in
        <button onClick={() =>
          logout({user })} type="submit">logout</button> </p>
        <Togglable buttonLabel="create new blog" ref ={blogFormRef}>
            <BlogForm createBlog={addBlog}/>

        </Togglable>

        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog}/>
        )}
      </div>
      }
    </div>
  )
  }

export default App
