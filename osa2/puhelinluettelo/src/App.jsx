import { useState } from 'react'


const Person = (props) =>{
  console.log('propsit', props)
  const { person } = props
  return (
    <div>
    {person.name}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 

  const [newName, setNewName] = useState('')

  const addName = (event) => {
    event.preventDefault()
    console.log('button clicked', event.target)
    const nameObject = {                     // tämä ao. pätkä lisää uuden noten listaan
      name: newName
      //,important: Math.random() > 0.5,
      //,id: persons.name
    }
  
    setPersons(persons.concat(nameObject))    // huom! concat, koska ei saa muuttaa tilaa suoraan!!!
    setNewName('')
    }

  const handleNameChange = (event) => {
      console.log(event.target.value)
      setNewName(event.target.value)  
    } 

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>

          name: <input
           value={newName}
            onChange={handleNameChange} />
   
   
          <button type="submit">add</button>
  
      </form>
      <h2>Numbers</h2>
     
        {persons.map(person => 
          <Person key={person.name} person ={person}/>
      )}
   
    </div>
  )

}
// jos Numbersin jälkeen on <ul>{persons....} niin sisentää

export default App
