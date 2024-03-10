import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState(null)

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

  const handleTitleChange = (event) => {
    setNewTitle(event.target.value)
  }

  const handleAuthorChange = (event) => {
    setNewAuthor(event.target.value)
  }

  const handleUrlChange = (event) => {
    setNewUrl(event.target.value)
  }
      
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
      } catch (exception) {
          setErrorMessage('wrong credentials')
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

  const addBlog =  (event) =>{
    console.log('add blog-button clicked', event.target)
    event.preventDefault()
   
    const blogObject ={
      title: newTitle,
      author: newAuthor,
      url: newUrl
    }  

    blogService
      .create(blogObject)
        .then(returnedBlog => {
          setBlogs(blogs.concat(returnedBlog))

          setNewTitle('')
          setNewAuthor('')
          setNewUrl('')
        })
    }
  

  const blogForm = () => (         
      <form onSubmit={addBlog}>
        <div>
          title
          <input
          type ="text"
          value={newTitle}
          name="Title"
          onChange = {handleTitleChange} />
        </div>
        <div>
          author
          <input
          type ="text"
          value={newAuthor}
          name="Author"
          onChange = {handleAuthorChange} />
        </div>
       <div>
        url
        <input
          type="text"
          value={newUrl}
          name = "Url"
          onChange={handleUrlChange}
        />
      </div>
      <button type="submit">create</button>
    </form>  
  )

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
       {loginForm()}
        </div>
      }
      {user && <div>
        <h2>blogs</h2>
        <p>{user.name} logged in
        <button onClick={() =>
          logout({user })} type="submit">logout</button> </p>
        <h2>create new</h2>
        {blogForm()}

        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog}/>
        )}
      </div>
      }
    </div>
  )
  }

export default App
