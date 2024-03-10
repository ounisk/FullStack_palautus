const Notification = ({ message }) => {

    if (message === null) {      
      console.log('toka notificaatio rivi')
      return null
     }
  
    if (message.includes("added")){
    return (
    <div className="error">
        {message}
    </div>
        ) }

    if (message.includes("wrong")){
        return (
        <div className="wronginfo">
            {message}
        </div>
            ) }    
    
  
    return (
      <div className="error">
        {message}
      </div>
    )
  }


  export default Notification