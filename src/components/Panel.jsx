import styles from '../styles/Panel.module.css'
import { useState } from 'react';

const totalNotes = [
    {
     id: 1,
     note: "abc"
    },
    {
     id: 2,
     note: "there is nothing left"
    }, 
    {
     id: 3,
     note: "deepak is fuckboy"
    },
    {
     id: 4,
     note: "aniket is playboy"
    }  
   ]

export default function Panel() {

              
  const [currentNotes, setCurrentNotes] = useState(totalNotes);

  const search = async (query) => {
    console.log(query)
    
    // const response = await fetch(
    //   'http://localhost:8080?' + new URLSearchParams({ q })
    // );
    // const currentNotes = await response.json();
    
    const searchedNotes = totalNotes.filter(element => {
      return element.note.includes(query);
    });

    console.log(searchedNotes)
    
    setCurrentNotes(searchedNotes);
  };

    return (
        <div className={styles.panel}>


    <main>
      <h1>Saved Notes</h1>
      <input type = "text" placeholder = "Search" onChange={(e) => search(e.target.value)} />
      <ul>
        {currentNotes.map((item) => (
          <li key={item.id}>
            <strong>{item.note}</strong>
          </li>
        ))}

      </ul>
    </main>
        </div>
    )
}