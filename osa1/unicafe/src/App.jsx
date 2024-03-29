import { useState } from 'react'


const Header = (props) => {
  console.log(props)
  return (
    <div>
      <h1>{props.parts[0]}</h1> 
    </div>
  )
}

const HeaderStat = (props) => {
  console.log(props)
  return (
    <div>
      <h1>{props.parts[1]}</h1> 
    </div>
  )
}

const Button = ({handleClick, text}) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const StatisticLine = (props) => {
  console.log(props)
  return (
    <div>
      {props.text} {props.value}{props.percentage}
    </div>
  )

}

const Statistics = (props) => {
  console.log(props)
  if (props.parts[4].length === 0) {
    return (
      <div>
        No feedback given
      </div>
      )
    }

    return(
      <div>
      <tr>  
      <td><StatisticLine text='good' /> </td> 
      <td><StatisticLine value = {props.parts[0]}/> </td>
      </tr>
      <tr>
      <td><StatisticLine text='neutral' /> </td> 
      <td><StatisticLine value = {props.parts[1]}/> </td>
      </tr>
      <tr>
      <td><StatisticLine text='bad' /> </td>
      <td><StatisticLine value = {props.parts[2]}/> </td>
      </tr>
      <tr>
      <td><StatisticLine text ='all' /> </td>
      <td><StatisticLine value = {props.parts[3]}/> </td>
      </tr>
      <tr>
      <td><StatisticLine text='average' /> </td>
      <td><StatisticLine value = {((props.parts[0]*1+props.parts[1]*0+props.parts[2]*-1 )/props.parts[3]).toFixed(1)}/> </td>
      </tr>
      <tr>
      <td><StatisticLine text='positive' /> </td> 
      <td><StatisticLine value= {((props.parts[0] / props.parts[3])*100).toFixed(1)} percentage='%' /> </td>
      </tr>
      </div>  
    )


  }

const App = () => {
  // tallenna napit omaan tilaansa
  const headers = {
    parts: ['give feedback','statistics']}

  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total, setTotal] = useState(0)
  const [allClicks, setAll] = useState([])


  const statistics = {
    parts: [good, neutral, bad, total, allClicks]
  }  
  const handleGoodClick = () =>{
    /*setClicks({...clicks, good: clicks.good + 1})*/
    setAll(allClicks.concat('G'))
    /*console.log('good before', good)*/
    const updatedGood = good + 1
    setGood(updatedGood)
    /*console.log('good after', good)*/
    setTotal(updatedGood + neutral + bad)
    }

  const handleNeutralClick = () => {
    setAll(allClicks.concat('N'))
    const updatedNeutral = neutral + 1
    setNeutral(updatedNeutral)
    setTotal(good + updatedNeutral + bad)
    }
    
  const handleBadClick = () => {
    setAll(allClicks.concat('B'))
    const updatedBad = bad + 1
    setBad(updatedBad)
    setTotal(good + neutral + updatedBad)
    }
    

  return (
    <div>
      <Header parts ={headers.parts}/>
      <Button handleClick ={handleGoodClick} text='good' />
      <Button handleClick ={handleNeutralClick} text='neutral' />
      <Button handleClick ={handleBadClick} text='bad' />

      <HeaderStat parts ={headers.parts}/>
      <Statistics parts = {statistics.parts} /> 

    </div>
  )
}


export default App
