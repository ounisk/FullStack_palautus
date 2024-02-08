import { useState, useEffect } from 'react'
import axios from 'axios'

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

const Personform = ({onSubmit, newName, newNumber, handleNameChange, handleNumberChange} ) => {
  //console.log('formista tulevat', props)
  //const {personform} = props
  return (
      <form onSubmit={onSubmit}>
          <div>name:<input
            value={newName}
            onChange={handleNameChange} /> 
            </div>
          <div>number: <input
            value={newNumber}  
            onChange={handleNumberChange} /> </div>
            <div> 
          <button type="submit">add</button>
          </div>
      </form>
  )
}


const App = () => {
  //const [persons, setPersons] = useState([
  //  { name: 'Arto Hellas', number: '040-123456' },
  //  { name: 'Ada Lovelace', number: '39-44-5323523' },
  //  { name: 'Dan Abramov', number: '12-43-234345' },
  //  { name: 'Mary Poppendieck', number: '39-23-6423122' }
  //]) koska nyt siirryttytietojen hakuun palvelimelta, ks. alla

  const [persons, setPersons] = useState([])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
 


  useEffect(() => {
    console.log('effect')
    axios 
      .get('http://localhost:3001/persons')
      .then(response => {
          console.log('promise fulfilled') 
          setPersons(response.data)
        })
    }, [])
    console.log('render', persons.length, 'persons')
 
 
    const addName = (event) => {
    event.preventDefault()
    //event.preventDefault()
    
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
      
      axios
      .post('http://localhost:3001/persons', personObject)
      .then(response => {
        setPersons(persons.concat(response.data))                         // huom! concat, koska ei saa muuttaa tilaa suoraan!!!
        setNewName('') 
        setNewNumber('')
        console.log('onko tyhjä', newName)
      })

      //console.log('button clicked', event.target)
    }
    //event.preventDefault()                                             //pitääkö olla täällä, toimii kyllä vanhalla paikallakin
    }


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
 

  return (
    <div>
      <h2>Phonebook</h2>
      filter shown with: <input
          //value={newFilter}
          onChange={handleFilter } />

      <h2>Add new number</h2>          
          <Personform onSubmit={addName}
            newName ={newName}
            handleNameChange={handleNameChange}
            newNumber= {newNumber}
            handleNumberChange ={handleNumberChange}
            />
      
      <h2>Numbers</h2>
          <Persons persons ={persons.filter(person => person.name.includes(newFilter))} /> 
   
    </div>
  )

}
// jos Numbersin jälkeen on <ul>{persons....} niin sisentää
//{persons.map(person => 
//<Person key={person.name} person={person}/>
export default App



// tällä toimii hyvin:
//{persons.filter(person => person.name.toLowerCase().includes(newFilter)).map(person =>
//  <Person key={person.name} person={person}/>
//  )} 

// muokkaus, että hyödyntää kaikki henkilöt renderöivä komponenttia, toimii hyvin:
// <Persons persons ={persons.filter(person => person.name.includes(newFilter))} />
