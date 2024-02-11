import { useState, useEffect } from 'react'
//import axios from 'axios'
import personService from './services/persons'
//import persons from './services/persons'
//import {removePerson} from './src/App'


const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className="error">
      {message}
    </div>
  )
}

  const Person = ({person,remove}) => {
  //console.log('person person', person)   // (props)
  //const { person } = props
  return (
    <div>
    {person.name} {person.number} <button onClick={() =>
     remove({person })} type="submit">delete</button>   
    </div>
  )
}


const Persons = ({persons, remove}) => {
  //console.log('kaikki_pers', props)
  //const {persons} = props
  console.log('persons tulee täältä', persons)
  console.log('remove funktio', remove)
  return (
    <div>
      {persons.map(person => 
          <Person key={person.name} person={person} remove={remove} />
         )} 
          
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
  const [errorMessage, setErrorMessage] = useState('')


  useEffect(() => {
    console.log('effect')
    personService            //axios 
      .getAll()               ///('http://localhost:3001/persons')
      .then(initialPersons => {
          console.log('promise fulfilled') 
          setPersons(initialPersons)
        })
    }, [])
    console.log('render', persons.length, 'persons')
 
 
    const addName = (event) => {
    event.preventDefault()
    //event.preventDefault()
    
    if (persons.find(person =>  person.name === newName)) {
      console.log('oli jo')
      const person = persons.find(person => person.name === newName) 
      const changedNumber = { ...person, number: newNumber } 
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)){ 
        personService                              
        .update(person.id, changedNumber)          
        .then(returnedPerson => { 
            console.log('returned person', returnedPerson)
            console.log('muutos person_id', returnedPerson.id)  
            setPersons(persons.map(person => person.id !== returnedPerson.id ? person : returnedPerson))   
          })

          console.log("vahvistus numeron muutoksesta")
          setErrorMessage(
            `${person.name}'s number was updated `
              )
          setTimeout(() => {
            setErrorMessage(null)
            }, 5000)
        
      //alert(`${newName} is already added to phonebook`)
        setNewName('')
        setNewNumber('')
     
      }}

    else {
    event.preventDefault()
    console.log('button clicked', event.target)
      const personObject = {                                         // tämä ao. pätkä lisää uuden noten listaan
        name: newName,
        number: newNumber
      //,important: Math.random() > 0.5,
      //,id: persons.name
      }
      
      personService            //axios
      .create(personObject)                    //post('http://localhost:3001/persons', personObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))})                         // huom! concat, koska ei saa muuttaa tilaa suoraan!!!
        
        setNewName('') 
        setNewNumber('')
          
      //.catch(error => {
          console.log("vahvistus lisäyksestä")
          setErrorMessage(
            `${personObject.name} was added`
              )
          setTimeout(() => {
            setErrorMessage(null)
            }, 5000)
         } //)
        console.log('onko tyhjä', newName)
        

      //console.log('button clicked', event.target)
      }//}
    //event.preventDefault()                                             //pitääkö olla täällä, toimii kyllä vanhalla paikallakin
      
    const removePerson = (props) => {
      const {person} = props
      const {id} = person.id
      console.log("poistettava id", person.id)
      console.log("poistettava name", person.name)
     
      if (window.confirm(`Delete ${person.name}?`)){
       personService
        .remove(person.id)
        .then(() =>
          personService
          .getAll()
            //.then (()=>   // ((response => console.log(response)))
            .then((response => setPersons(response)))
            //setPersons(persons.filter((person) => person.id!=id))
            
          )}    
          console.log("siivottu lista", persons)  
          console.log("vahvistus poistosta")
          setErrorMessage(
            `${person.name} was deleted`
              )
          setTimeout(() => {
            setErrorMessage(null)
            }, 5000)
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
      <Notification message={errorMessage} />
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
          <Persons persons ={persons.filter(person => person.name.includes(newFilter))} remove ={removePerson} /> 
   
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
