import React, {useState , useEffect} from "react";
import './App.css';
import {sampleText} from "./sampleText";
import marked from "marked";
import DOMPurify from "dompurify";

function App() {

  
  const [text, settext] = useState(sampleText)
  
  const handleChange = (e) =>{
    const txt= e.target.value
    settext(txt)
  };

//Simlaire a ComponentDidMount
  useEffect(()=>{
    let monText =localStorage.getItem("text")
     if (monText)  {settext(monText);} 
       else{settext(sampleText);}
     },[]);

//Similaire a ComponentDidUpdate
  useEffect(()=>localStorage.setItem("text",text),[text]);
  

  const renderText = (thetext) => {
    const textModif= DOMPurify.sanitize(thetext)
    return marked(textModif);  
  };

  return (
    <div className = "container">
      <div className = "row">
        <div className = "col-sm-6">
          <textarea
            className = "form-control"
            rows = "35"
            value = {text}
            onChange = {handleChange} >
          </textarea>
        </div>

      
        <div className = "col-sm-6">
          <div dangerouslySetInnerHTML= {{ __html: renderText(text)}} ></div>
        </div>
      </div>
    </div>
  
  );
}

export default App;
