import React,{useState,useContext,useEffect} from 'react'
import DataContext from '/home/niraj/development/react/my-app/src/components/DataContext.js';
import { Link } from 'react-router-dom';
import { isTokenExpired } from './Functions';


export default function Form(prop) {
 const { inputVal, setInputVal } = useContext(DataContext);
 let myArray = inputVal.trim().split(/\s+/);
 let renderedItems = myArray.map((item, index) => (
  <span  id={index} key={index} style={{ display: 'inline-block', margin: '3px', color: '#fff3cd' }}>
    {item} 
  </span>
));
const changeStyleById = (id) => {
  const spanElement = document.getElementById(id);
  if (spanElement) {
    spanElement.style.color = 'yellow'; 
  }
  const spanElement1 = document.getElementById(id-1);
  if (spanElement1) {
    spanElement1.style.color = '#fff3cd'; 
  }
};

const changeStyleById1 = (id) => {
  const spanElement = document.getElementById(id);
  if (spanElement) {
    spanElement.style.color = 'red'; 
  }
 
};
const changeStyleById2 = (id) => {
  const allSpanElements = document.querySelectorAll('span'); // Select all span elements
// Loop through each span element and set the color
  allSpanElements.forEach(spanElement => {
    spanElement.style.color = '#fff3cd'; // Set the color to '#fff3cd'
  });
};

 const[text,Fun1] = useState('');
 const[count,Fun2] = useState(0);
 const[count1,Fun3] = useState(0);
 const [seconds, Fun4] = useState(10);
 const[once,Fun5] = useState('');
 const[nay,Fun6] = useState(0);
 const[wpm,Fun7]= useState(0);
 const[no_wrg_wrd,Fun8]  = useState(0);
 const [wordSet, Fun9] = useState(new Set());
 const [reset_called,Fun10] = useState(0);

 
 const addWordToSet = (newWord) => {
   const updatedSet = new Set([...wordSet, newWord]);
   Fun9(updatedSet);
 };

 function Reset() {
  Fun7(count1)
  Fun8(count-count1)
  Fun10(reset_called+1);
  Fun1('')
  Fun2(0)
  Fun3(0)
  Fun4(10)
  Fun5('')
  // fetch(`http://127.0.0.1:5000/generate_text`)
  //   .then((response) => response.text())
  //   .then((data) => setInputVal(data))
  //   .catch((error) => console.error('Error fetching data:', error));
  const token = localStorage.getItem('jwtToken'); // Retrieve the token from localStorage
  if (token && isTokenExpired(token)!==true) {
    console.log('tokennotexpired');
    fetch(`http://127.0.0.1:5000/generate_text`,{
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }) 
      .then(response => response.text())
      .then(data => setInputVal(data))
      .catch(error => console.error('Error fetching data:', error));
  }
  else{
    console.log('tokenexpired');
    fetch(`http://127.0.0.1:5000/generate_text1`,{
      method: 'GET',
    }) 
      .then(response => response.text())
      .then(data => setInputVal(data))
      .catch(error => console.error('Error fetching data:', error));
  }
}
useEffect(() => {
  // const ratio = no_wrg_wrd !== 0 ? wpm / no_wrg_wrd : wpm;
  const token = localStorage.getItem('jwtToken'); 
   if((wpm+no_wrg_wrd) !==0 && token && isTokenExpired(token)!==true){
       const formData = {
         "wpm":wpm,
         "ratio":no_wrg_wrd,
         'words': Array.from(wordSet)
       }
      fetch('http://127.0.0.1:5000/set_history', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, // Include the JWT token in the request headers
        },
        body: JSON.stringify(formData)
      })
        .then(response => {
          if (response.status===200) {
            return response.json();
          } else {
            throw new Error('unable to connect to server ');
          }
        })
        .then(data => {
          console.log('Response from backend:', data);
        })
        .catch(error => {
          console.error('Error:', error);
          alert('Error: ' + error.message);
        });
    
   }
   Fun9(new Set());
  }, [reset_called]);
function Resecond() {
  if(seconds!==10){
    Fun4(0)
    changeStyleById(0)
  }
}

const handleChange = async (event) => {
  const inputValue = event.target.value;
  Fun1(inputValue);
  Fun5((once)=>once+inputValue[0])
}

useEffect(() => {
if(once.length===1){
  const interval = setInterval(() => {
    Fun4((prevSeconds) => {
      if (prevSeconds === 0) {
        // console.log("hi3",count,count1);
        clearInterval(interval);
        let c;
        if (nay===1) {c=0;}
        else{c=1;}
        Fun6(c)
        changeStyleById2();
        return 10;
      } else {
        return prevSeconds - 1;
      }
    });
  }, 1000);
} 
}, [once]);
useEffect(() => {
  let updatedText = text;
  const lentext = updatedText.length;
  if(updatedText[lentext - 1]===' '){
    Fun2(count => count +1 );
    Fun1('');
    updatedText = updatedText.trim();
    if(updatedText === myArray[count]){     // accessing the  state value just after updation shows old value so use useEffect 
      Fun3(count1 => count1 +1 );
      updatedText='';
    }
  }

}, [text]);
useEffect(() => {
 Reset();
 
}, [nay]);
useEffect(() => {
  let updatedText = text.trim();
  let lentext = updatedText.length;
  const firstPartSlice = myArray[count].slice(0, lentext);
     if(updatedText===firstPartSlice){
      changeStyleById(count);
     }
     else{
      changeStyleById1(count);
      addWordToSet(myArray[count].slice(lentext-2, lentext));
     }
},[text])

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  const displayTime = `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;

  return (
    <div>
    <div className="card text mb-3 my-1" style={{  display: 'flex', justifyContent: 'center', gap: '1rem' ,backgroundColor:'#444c54',color:'white' }}>
      <div className="card-body">
        <h5 className="card-title"style={{ display: "flex",  justifyContent: 'center', color: '#fff3cd' }}>TEXT TO TYPE</h5>
        <p className="card-text"><div>{renderedItems}</div></p>
      </div>
    </div>
    <form style={{  display: 'flex', justifyContent: 'center', gap: '1rem'  }}>
    <div>
      <h4> {displayTime}</h4>
      <p>Timer Clock</p>
    </div>
  <div className="form-group">
    <label htmlFor="exampleFormControlTextarea1">{prop.title}</label>
    <textarea className="form-control" value={text} onChange={handleChange} id="myBox" rows="3" cols="120" style={{backgroundColor:'#a6aeb7'}}></textarea>
  </div>
</form>
<div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
        <button type="button" className="btn btn-outline-success" onClick={Resecond} >Reset</button>  
      </div>
 <div className="container my-3">Total Number of  words Typed:{count}</div>
 <div className="container my-3">Total Number of correct words:{count1}</div>

 {/* <div style={{ backgroundColor: 'burlywood', minHeight: '80vh' }}> */}
      <div style={{ display: 'flex', justifyContent: 'center' , minHeight: '20vh' ,marginTop:"50px"  }}>
        <div className="card my-2" style={{ minHeight: '20vh',width:"40vh" }}>
        <div className="card-body" >
<svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" className="bi bi-emoji-sunglasses" viewBox="0 0 16 16">
<path d="M4.968 9.75a.5.5 0 1 0-.866.5A4.498 4.498 0 0 0 8 12.5a4.5 4.5 0 0 0 3.898-2.25.5.5 0 1 0-.866-.5A3.498 3.498 0 0 1 8 11.5a3.498 3.498 0 0 1-3.032-1.75M7 5.116V5a1 1 0 0 0-1-1H3.28a1 1 0 0 0-.97 1.243l.311 1.242A2 2 0 0 0 4.561 8H5a2 2 0 0 0 1.994-1.839A2.99 2.99 0 0 1 8 6c.393 0 .74.064 1.006.161A2 2 0 0 0 11 8h.438a2 2 0 0 0 1.94-1.515l.311-1.242A1 1 0 0 0 12.72 4H10a1 1 0 0 0-1 1v.116A4.22 4.22 0 0 0 8 5c-.35 0-.69.04-1 .116"/>
<path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-1 0A7 7 0 1 0 1 8a7 7 0 0 0 14 0"/>
</svg>
  <h5 className="card-title">History (last round)</h5>
  {/* <p className="card-text">user_email:{hist['email']}</p> */}
  <p className="card-text"><strong>Number Of Correct words:{wpm}</strong></p>
  <p className="card-text"><strong>Number of Wrong words:{no_wrg_wrd}</strong></p>
  
</div> 

        </div> 
      </div>
    {/* </div> */}
 <span class="placeholder col-12 bg-light"></span>
 <span class="placeholder col-12"></span>
<span class="placeholder col-12 bg-primary"></span>
<span class="placeholder col-12 bg-secondary"></span>
<span class="placeholder col-12 bg-success"></span>
<span class="placeholder col-12 bg-danger"></span>
<span class="placeholder col-12 bg-warning"></span>
<span class="placeholder col-12 bg-info"></span>
<span class="placeholder col-12 bg-dark"></span>
  </div>
  )
}
