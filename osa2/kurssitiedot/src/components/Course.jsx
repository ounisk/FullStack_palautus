//import Header from './Header'

const Course = ({ course }) => {
    console.log(course)
    return (
    <div>
      <h1>{course.name}</h1>
      <p>{course.parts[0].name}</p>
    </div>
    )
  }
  
  export default Course

  //  <p>{course.parts[0].name}</p>
  //<Header course={course.parts} /> 