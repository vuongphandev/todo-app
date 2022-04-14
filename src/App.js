import { useState, useEffect } from 'react'

import axios from 'axios';

// components
import NoteForm from './components/NoteForm';
import Note from './components/Note';

const App = () => {
  const [notes, setNotes] = useState([
    // { content: 'Do stuffs', id: 1 },
    // { content: 'Make things', id: 2 }
  ])
  const [newNoteContent, setNewNoteContent] = useState('')

  //TODO: implement effect hook to fetch data from db.json
  const fetch = () => {
    axios
      .get('http://localhost:3001/notes')
      .then(response => {
        console.log('data fetched');
        setNotes(response.data)
      })
  }
  useEffect(fetch, [])

  const addNote = (event) => {
    event.preventDefault()
    console.log('event is clicked');
    const noteObject = {
      content: newNoteContent,
      id: notes.length + 1
    }
    const newNotes = [...notes, noteObject]
    setNotes(newNotes)

    setNewNoteContent('')
  }

  const changeNote = (event) => {
    console.log(event.target.value);
    setNewNoteContent(event.target.value)
  }

  return (
    <div>
      <h1>Add a new note</h1>
      <NoteForm addNote={addNote} newNoteContent={newNoteContent} changeNote={changeNote} />

      <h1>ToDo list</h1>
      {
        notes.length > 0
          ? (
            <ul>
              {notes.map(note => <Note key={note.id} content={note.content} />)}
            </ul>
          )
          : 'Everything is done! :D (for now)'
      }
    </div>
  )
}

export default App;
