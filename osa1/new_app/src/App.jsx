const Header = (props) => {
  return (
    <div>
      <h1>{props.course}</h1> 
    </div>
  )
}

const Part = (props) => {
  console.log(props)
  return (
    <div>
      <p>{props.part} {props.exercises}</p> 
    </div>
  )
}


const Content = (props) => {
  console.log(props)
  return (
    <div>
      <Part part = {props.part[0].part} exercises = {props.part[0].exercises} /> 
      <Part part = {props.part[1].part} exercises = {props.part[1].exercises}/>
      <Part part = {props.part[2].part} exercises = {props.part[2].exercises}/>
    </div>
  )
}

const Total = (props) => {
  return (
    <div>
      <p>Number of exercises {props.exercises}</p> 
    </div>
  )
}


const App = () => {
  const course = 'Half Stack application development'
  const parts = [
    {part: 'Fundamentals of React', exercises: 10},
    {part: 'Using props to pass data', exercises: 7},
    {part: 'State of a component', exercises: 14}
  ]

  return (
    <div>
      <Header course = {course}/>
      <Content part = {parts}/>
      <Total exercises = {parts[0].exercises + parts[1].exercises + parts[2].exercises}/>
    </div>
  )
}

export default App
