import React, { useState, useEffect } from 'react' ;
import ListItem from '../components/ListItem' ;
import AddButton from '../components/AddButton' ;

const NotesListPage = () => {
    
    let [notes, setNotes] = useState([]) ;

    useEffect(() => {
        getNotes()
    }, [])

    let getNotes = async () => {
        let response = await fetch('/api/notes/') ; //we need to await the data to comeback
        let data = await response.json() ;

        //console.log('DATA :', data) ;
        setNotes(data) ;
    }

    return (
        <div className = "notes">
            <div className = "notes-header">
                <h2 className = "notes-title">&#9782; NOTES</h2>
                <p className = "notes-count">{notes.length}</p>
            </div>

            <div className = "notes-list">
                {notes.map((note, index) => (
                    //<h3 key = {index}>{note.body}</h3>
                    <ListItem key = {index} note = {note} />
                ))}
            </div>

            <AddButton />
        </div>
  )
}


export default NotesListPage ;
