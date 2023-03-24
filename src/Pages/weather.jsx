import { useState } from "react";
const Weather = () =>{
    const [text, setText] = useState()

    const handleChange = (event) => {
        setText(event.target.value);
      };
    
      const handleSubmit = (e) => {
        e.preventDefault()
        if(text){
          localStorage.setItem('weather', JSON.stringify(text))
          window.location.replace('http://localhost:3000/');
    
        }
    }
    return(
        <div>
          <form onSubmit={handleSubmit}>
          <input type='text' value={text} onChange={handleChange} className="search-input form" placeholder="Search City"></input>
            <button type="submit" className="button-search btn-primary btn">    Search   </button>  
            </form>
        </div>
    )
}

export default Weather