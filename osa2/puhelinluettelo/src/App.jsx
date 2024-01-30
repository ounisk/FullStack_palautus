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

const Persons = (props) => {
  console.log('kaikki_pers', props)
  const {persons} = props
  return (
    <div>
      {persons.map(person => 
          <Person key={person.name} person={person}/>)}
    </div>
  )
}

const Personform = (props) => {
  console.log('formista tulevat', props)
  const {personform} = props
  return (

    <div> onChange={handleNameChange}</div>
  )
}


const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  //const [filteredPersons, setFilteredPersons] = useState(persons)

  const addName = (event) => {
    event.preventDefault()
    
    if (persons.find(person =>  person.name === newName)) {
      console.log('oli jo') 
      alert(`${newName} is already added to phonebook`)
      setNewName('')
      setNewNumber('')
     
    }
    else {
    event.preventDefault()
    console.log('button clicked', event.target)
      const personObject = {                                         // tämä ao. pätkä lisää uuden noten listaan
        name: newName,
        number: newNumber
      //,important: Math.random() > 0.5,
      //,id: persons.name
      }
      setPersons(persons.concat(personObject))                         // huom! concat, koska ei saa muuttaa tilaa suoraan!!!
      setNewName('') 
      setNewNumber('')
      

      //console.log('button clicked', event.target)
    }
    //event.preventDefault()                                             //pitääkö olla täällä, toimii kyllä vanhalla paikallakin
    }

  //const personsToShow = showAll    
  //    ? persons    : persons.filter(person => person.name.includes(value))


  const handleNameChange = (event) => {
      console.log(event.target.value)
      setNewName(event.target.value)  
    } 

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
    }  

  const handleFilter = (event) => {
    console.log('filterristä', event.target.value)
    setNewFilter(event.target.value) 
  }
    //const value = event.target.value
    //const filtered = persons.filter(person => person.name.includes(value))
    //setFilteredPersons(event.target.value)
    //setFilteredPersons(filtered)
    //console.log('filter', filtered)} 

  return (  // tänne Personform tai Filter komponentti??? siis ylös luo (t.2.10)
    <div>
      <h2>Phonebook</h2>
      filter shown with: <input
          //value={newFilter}
          onChange={handleFilter } />
          
      <form onSubmit={addName}>
          <h2>Add new number</h2>
          <div>name:<input
             value={newName}
            onChange={handleNameChange} /> 
            </div>
          <div>number: <input
            value={newNumber}  
            onChange={handleNumberChange} /> </div>
   
          <button type="submit">add</button>
  
      </form>
      <h2>Numbers</h2>
      {persons.filter(person => person.name.toLowerCase().includes(newFilter)).map(person =>
        <Person key={person.name} person={person}/>
        )}        
   
    </div>
  )

}
// jos Numbersin jälkeen on <ul>{persons....} niin sisentää
//{persons.map(person => 
//<Person key={person.name} person={person}/>
export default App

//{filteredPersons.map(person =>
//<Person key={person.name} person={person}/>)}


// {persons.filter(person => person.name.includes(newFilter)).map(person =>
//<Persons persons={persons}/>
//)}   /ei näin, tällä tuli kaikki yhtäaikaa