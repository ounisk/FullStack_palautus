//import Header from './Header'  / kurssin alikomponentin voi olla samassa moduulissa.

const Course = (props) => {
    console.log('propsit nyt', props)
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
     )
     } 
  
  export default Course
