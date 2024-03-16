import { render, screen } from '@testing-library/react'
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