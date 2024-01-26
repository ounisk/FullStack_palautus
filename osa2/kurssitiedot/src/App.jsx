//import Course from './components/Course'

const Course = (props) => {
  console.log('propsit nyt', props)
  //<Header course ={props.name}/>
  const { course } = props
  return (
    <div>
    <Header course = {course.name}/>
    <Content parts ={course.parts}/>
    <Total parts = {course.parts}/>
    </div>
  )
}


const Header = ({course} ) => {
  console.log('header', course)
  return (
    <div>
    <h2>
      {course}
    </h2>
    </div>
  )}

const Total = ({ parts} ) =>{
  console.log('summa', parts) 

  //const initialValue = 0   //ei tarvita, https://medium.com/yavar/how-to-use-the-reduce-in-javascript-and-react-4bc8b5f8fa4b
  
  var totalExercises = parts.reduce((previousValue, currentValue) => {
    return previousValue+currentValue.exercises;},0)

    return(
    <div>
    <p><b>total of {totalExercises} exercises</b></p>
    </div>
  )}



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
      <Part key={part.id} part={part.name} exercises={part.exercises}/>)}
      
  </div>
//
   )
   } 

   //{parts.map(part => <Total key={part.id} part={part.name} exercises={part.exercises} />)} ei tarvita Contentissa


const App = () => {
  const courses = [
    {
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
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return (
    <div>
      <h1> Web development curriculum </h1>
        {courses.map(course =>
      <Course key={course.id} course={course} />     // key mukaan niin ei tule erroria consoliin
      )}
    </div>
  )
}

export default App