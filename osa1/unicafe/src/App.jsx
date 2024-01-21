import { useState } from 'react'


const Header = (props) => {
  console.log(props)
  return (
    <div>
      <h1>{props.parts[0]}</h1> 
    </div>
  )
}

const Statistics = (props) => {
  console.log(props)
  return (
    <div>
      <h1>{props.parts[1]}</h1> 
    </div>
  )
}

const Button = ({handleClick, text}) => (    /*refaktoroituna*/
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


/*const handleGoodClick = () =>
    /*setClicks({...clicks, good: clicks.good + 1})*/
    /*{setAll(allClicks.concat('G'))
    /*console.log('good before', good)*/
    /*const updatedGood = good + 1
    setGood(updatedGood)
    /*console.log('good after', good)*/
    /*setTotal(updatedGood + updatedNeutral + updatedBad)
    }

  const handleNeutralClick = () =>
    setClicks({...clicks, neutral: clicks.neutral + 1})
    
  const handleBadClick = () =>
    setClicks({...clicks, bad: clicks.bad + 1})*/  
  

  return (
    <div>
      <Header parts ={headers.parts}/>
      <button onClick={() => setGood(good + 1)}>good</button>
      <button onClick={() => setNeutral(neutral + 1)}>neutral</button>
      <button onClick={() => setBad(bad + 1)}>bad</button>
    
      <Statistics parts ={headers.parts}/>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
     
    </div>
  )
}


export default App
