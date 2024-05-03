import React, { createContext, useState ,useEffect} from 'react';
import { isTokenExpired } from './Functions';

const DataContext = createContext();

export const DataProvider = ({ children }) => {
 const [inputVal, setInputVal] = useState('');

  useEffect(() => {
    // Fetch data from the Flask endpoint
    const token = localStorage.getItem('jwtToken'); // Retrieve the token from localStorage
    if (token && isTokenExpired(token)!==true) {
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
      fetch(`http://127.0.0.1:5000/generate_text1`,{
        method: 'GET',
      }) 
        .then(response => response.text())
        .then(data => setInputVal(data))
        .catch(error => setInputVal("Right now Backend Server is not working. Please visit later & Sorry for the inconvenience !"));
    }
   
  }, []);


  return (
    <DataContext.Provider value={{ inputVal, setInputVal }}>
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;


// fetch(`http://127.0.0.1:5000/get_history`, {
//   method: 'GET',
//   headers: {
//     Authorization: `Bearer ${token}`, // Include the JWT token in the request headers
//   },
// })
//   .then((response) => response.json())
//   .then((data) => {
//     console.log("niraj1",data)
//     setFun(data); // Update the 'text' state with the fetched data
//   })
//   .catch((error) => console.error('Error fetching data:', error));

//   console.log("niraj2",hist)
// };