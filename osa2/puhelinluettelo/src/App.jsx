import { useState } from 'react'


const Person = (props) =>{
  console.log('propsit', props)
  const { person } = props
  return (
    <div>
    {person.name} {person.number}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas',
      number: '040-1231244' }
  ]) 

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const addName = (event) => {
    if (persons.find(person =>  person.name === newName)) {
      console.log('oli jo') 
      alert(`${newName} is already added to phonebook`)
      setNewName('')
      setNewNumber('')
     
    }
    else {
    //event.preventDefault()
    console.log('button clicked', event.target)
      const personObject = {                                         // tämä ao. pätkä lisää uuden noten listaan
        name: newName,
        number: newNumber,
      //,important: Math.random() > 0.5,
      //,id: persons.name
      }
     setPersons(persons.concat(personObject))                         // huom! concat, koska ei saa muuttaa tilaa suoraan!!!
      setNewName('') 
      setNewNumber('')

      //console.log('button clicked', event.target)
    }
    event.preventDefault()                                             //pitääkö olla täällä, toimii kyllä vanhalla paikallakin
  }


  const handleNameChange = (event) => {
      console.log(event.target.value)
      setNewName(event.target.value)  
    } 

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
    }  

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>

          <div>name: <input
           value={newName}
            onChange={handleNameChange} /> </div>
          <div>number: <input
            number={newNumber}
            onChange={handleNumberChange} /> </div>
   
          <button type="submit">add</button>
  
      </form>
      <h2>Numbers</h2>
     
        {persons.map(person => 
          <Person key={person.name} person={person}/>
      )}
   
    </div>
  )

}
// jos Numbersin jälkeen on <ul>{persons....} niin sisentää

export default App
