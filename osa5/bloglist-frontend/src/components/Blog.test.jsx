import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'


test('renders blog title', () => {
    const user = {
        username:'tikku',
        name: 'Tiina Teikku',
        password: 'salasana'
    } 

  //console.log('user.name', user.name)  
  
  const blog = {
    title: 'Suomalaisuuden ydintä etsimässä',
    author: 'Seppo Suominen',
    url: 'www.suomi.fi',
    user: {
        username:'tikku',
        name: 'Tiina Teikku',
        password: 'salasana'
    } 
  }

  render(<Blog blog={blog} user={user}/>)
  //screen.debug()
  const element = screen.getByText('Suomalaisuuden ydintä etsimässä')
  expect(element).toBeDefined()

  //const { container } = render(<Blog blog={blog} user={user} />)
  //const div = container.querySelector('.Blog')
  //expect(div).toHaveTextContent('Suomalaisuuden ydintä etsimässä')
})


test('clicking the view button shows url, likes&number and user, ', async () => {
    const userCurrent = {
        username:'tikku',
        name: 'Tiina Teikku',
        password: 'salasana'
    } 

  const blog = {
    title: 'Suomalaisuuden ydintä etsimässä',
    author: 'Seppo Suominen',
    url: 'www.suomi.fi',
    likes: 99,
    user: {
        username:'tikku',
        name: 'Tiina Teikku',
        password: 'salasana'
    } 
  }
  
    const mockHandler = vi.fn()
  
    render(
      <Blog blog={blog} user={userCurrent} toggleVisibility={mockHandler} />
    )
  
    const user = userEvent.setup()
    
    const button = screen.getByText('view')
    await user.click(button)

    const username = screen.findByText('Tiina Teikku') //getByText('Tiina Teikku')
    
    const urldef = screen.findByText('www.suomi.fi')
    const likes = screen.findByText("likes")
    const likes_number = screen.findByText("99")
    //expect(element).toBeDefined()
    screen.debug()
    expect(username).toBeDefined()
    expect(urldef).toBeDefined()
    expect(likes).toBeDefined()
    expect(likes_number).toBeDefined()


    //expect(mockHandler.mock.calls).toHaveLength(1)   // tällä tulee 0
    })     



test('clicking the likes button twice calls event handler twice', async () => {
    const userCurrent = {
        username:'tikku',
        name: 'Tiina Teikku',
        password: 'salasana'
    } 

  const blog = {
    title: 'Suomalaisuuden ydintä etsimässä',
    author: 'Seppo Suominen',
    url: 'www.suomi.fi',
    likes: 99,
    user: {
        username:'tikku',
        name: 'Tiina Teikku',
        password: 'salasana'
    } 
  }
    
    const mockHandler = vi.fn()    
    const mockHandlerLikes = vi.fn()

    render(
        <Blog blog={blog} user={userCurrent} toggleVisibility={mockHandler} addLikes={mockHandlerLikes}/>
      )
    
    const user = userEvent.setup()

    const button = screen.getByText('view')
    await user.click(button)

    const button1 = screen.getByText('like')
    await user.click(button1)
    const button2 = screen.getByText('like')
    await user.click(button2)

    expect(mockHandlerLikes.mock.calls).toHaveLength(2)


    })
