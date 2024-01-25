//import Course from './components/Course'

const Course = (props) => {
  console.log('propsit nyt', props)
  //<Header course ={props.name}/>
  const { course } = props
  return (
    <div>
    <Header course = {course.name}/>
    <Content parts ={course.parts}/>
    </div>
  )
}


const Header = ({course} ) => {
  console.log('header', course)
  return (
    <div>
    <h1>
      {course}
    </h1>
    </div>
  )}

const Total = ({ sum }) =>
   <p>Number of exercises {sum}</p>

const Part = ( props) => {
   console.log('part', props) 
   const { part, exercises } = props
   return (
    <div>
    <p>
    {part} {exercises}
    </p>
    </div>
   )}


const Content = ({parts}) => {
  console.log('content', parts)
  return (
  <div>
    {parts.map(part =>
      <Part key={part.id} part={part.name} exercises={part.exercises} />
    )}
  </div>

   )
   } 


const App = () => {
  const course = {
    name: 'Half Stack application development',
    id: 1,
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      },
    ]
  }

  return (
    <div>
      <Course course={course} />
    </div>
  )
}

export default App