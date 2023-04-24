import { useState } from 'react'
import './App.css'

const totalNotes = [
 {
  id: 1,
  note: "abc"
 },
 {
  id: 2,
  note: "abc"
 }  
]

function App() {
  
  const [currentNotes, setCurrentNotes] = useState(totalNotes);

  const search = async (q) => {
    console.log(q)
    // const response = await fetch(
    //   'http://localhost:8080?' + new URLSearchParams({ q })
    // );
    // const currentNotes = await response.json();
    
    // const searchedNotes = jsonArray.filter(element => {
    //   return element.hobbies.some(hobby => hobby.includes(substring));
    // });

    
    setCurrentNotes(totalNotes);
  };

  return (
    <main>
      <h1>Animal Farm</h1>
      <input type="text" placeholder="Search" onChange={(e) => search(e.target.value)} />
      <ul>
        {currentNotes.map((item) => (
          <li key={item.id}>
            <strong>{item.note}</strong>
          </li>
        ))}

      </ul>
    </main>





  // return (
  //   <div className="search-box">
  //     <input
  //       type="text"
  //       placeholder="Search..."
  //       onChange={handleChange}
  //       value={searchTerm}
  //     />
  //     <ul>
  //     <li> note 1
  //     </li>
  //     <li> note 2
  //     </li>
  //     </ul>
  //   </div>
  );
}


export default App
