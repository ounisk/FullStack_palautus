import { useState } from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ createBlog }) => {
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  const handleTitleChange = (event) => {
    setNewTitle(event.target.value)
  }

  const handleAuthorChange = (event) => {
    setNewAuthor(event.target.value)
  }

  const handleUrlChange = (event) => {
    setNewUrl(event.target.value)
  }

  const addBlog = (event) => {
    event.preventDefault()

    createBlog({
      title: newTitle,
      author: newAuthor,
      url: newUrl
    })

    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')
  }

  return (
    <div>
      <h2>create new</h2>

      <form onSubmit={addBlog}>
        <div>
           title
          <input
            type ="text"
            value={newTitle}
            onChange={handleTitleChange}
            id='title-input'
            data-testid= 'title-input'/>
        </div>
        <div>
            author
          <input
            type ="text"
            value={newAuthor}
            name="Author"
            onChange = {handleAuthorChange}
            id='author-input'
            data-testid='author-input' />
        </div>
        <div>
            url
          <input
            type="text"
            value={newUrl}
            name = "Url"
            onChange={handleUrlChange}
            id='url-input'
            data-testid='url-input'
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired
}

export default BlogForm
