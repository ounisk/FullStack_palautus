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

const App = () => {
  // tallenna napit omaan tilaansa
  const headers = {
    parts: ['give feedback','statistics']}

  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total, setTotal] = useState(0)


const handleGoodClick = () =>{
    /*setClicks({...clicks, good: clicks.good + 1})*/
    /*{setAll(allClicks.concat('G'))
    /*console.log('good before', good)*/
    const updatedGood = good + 1
    setGood(updatedGood)
    /*console.log('good after', good)*/
    setTotal(updatedGood + neutral + bad)
    }

  const handleNeutralClick = () => {
    const updatedNeutral = neutral + 1
    setNeutral(updatedNeutral)
    setTotal(good + updatedNeutral + bad)
    }
    
  const handleBadClick = () => {
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
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
      <p>all {total}</p>
      <p> average {(good*1+neutral*0+bad*-1 )/ total}</p>
      <p> positive {(good / total)*100} %</p>
     
    </div>
  )
}


export default App
