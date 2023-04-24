import React from 'react';
import styles from '../styles/Note.module.css'


export default function Note({noteString})  {

    return (
      <div className={styles.note}>

      <p>{noteString} </p>

      </div>
    );
  }

