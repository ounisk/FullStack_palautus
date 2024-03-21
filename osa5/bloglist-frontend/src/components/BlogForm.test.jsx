import { render, screen } from '@testing-library/react'
import BlogForm from './BlogForm'
import Blog from './Blog'
import userEvent from '@testing-library/user-event'

test('<BlogForm /> updates parent state and calls onSubmit', async () => {
  
  const user = userEvent.setup()
  const createBlog = vi.fn()

  //render(<BlogForm createBlog={createBlog} />)

  const {container } = render (<BlogForm createBlog={createBlog} />)

  //const input = screen.getByRole('textbox')
  const input_title = container.querySelector('#title-input')
  const input_author = container.querySelector('#author-input')
  const input_url = container.querySelector('#url-input')
  //const input_likes = container.querySelector('#likes-input')

  const sendButton = screen.getByText('create')

  await user.type(input_title, 'Lomakkeiden testauksen a&o')
  await user.type(input_author, 'Teukka Testeri')
  await user.type(input_url, 'www.testauksenmaailma.de')

  await user.click(sendButton)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe('Lomakkeiden testauksen a&o')
  expect(createBlog.mock.calls[0][0].author).toBe('Teukka Testeri')
  expect(createBlog.mock.calls[0][0].url).toBe('www.testauksenmaailma.de')
  expect(createBlog.mock.calls[0][0].likes).toBeUndefined()
})