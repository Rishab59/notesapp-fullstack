import React, { useState, useEffect } from 'react' ;
import { useParams } from 'react-router-dom' ;
import { ReactComponent as ArrowLeft } from '../assets/arrow-left.svg' ;
import { useNavigate } from 'react-router-dom' ;

const NotePage = () => {
    
    let { id } = useParams() ;

    let [note, setNote] = useState({body : '' }) ;

    const navigate = useNavigate() ;

    useEffect(() => {
        getNote() ;
    }, [id])

    let getNote = async () => {

        if (id === 'new') { 
            return
        }

        let response = await fetch(`/api/notes/${id}/`) ;
        let data = await response.json() ;
        setNote(data) ;
    } ;

    let createNote = async () => {
        fetch('/api/notes/', {
            method : "POST",
            headers : {
                'Content-Type' : 'application/json',
            },
            body : JSON.stringify(note)
        }) ;
    } ;
    
    let updateNote = async () => {
        fetch(`/api/notes/${id}/`, {
            method : "PUT",
            headers : {
                'Content-Type' : 'application/json',
            },
            body : JSON.stringify(note)
        }) ;
    } ;

    let deleteNote = async () => {
        fetch(`/api/notes/${id}/`, {
            method : "DELETE",
            headers : {
                'Content-Type' : 'application/json',
            }
        }) ;

        navigate('/') ;
    } ;
    

    const handleTextAreaChange = (e) => {
        setNote({ ...note, body : e.target.value }) ;
    } ;
    
    const handleKeyDown = (e) => {
        if ((e.key === 'Backspace' || e.key === 'Delete') && e.target.selectionStart === 0 && e.target.selectionEnd === e.target.value.length) {
            setNote({ ...note, body : null }) ;
        }
    } ;
    

    let handleSubmit = () => {
        
        //console.log('Note : ', note)
        if(id !== 'new' && note.body === null ){
            deleteNote() ;
        }
        else if(id !== 'new'){
            updateNote() ;
        }
        else if(id === 'new' && note !== null){
            createNote() ;
        }

        navigate('/') ; // Goes Back
    } ;

    return (
        <div className = "note">
            <div className = "note-header">
                <h3>
                    <ArrowLeft onClick = { handleSubmit } />
                </h3>
                
                {id !== 'new' ? (
                        <button onClick = { deleteNote } >Delete</button>
                    ) : (
                        <button onClick = { handleSubmit } >Save</button>
                    )
                }
                
            </div>

            <textarea 
                onChange = { handleTextAreaChange }
                onKeyDown = { handleKeyDown }
                defaultValue = {note?.body} >
            </textarea>

        </div>
    )

}


export default NotePage ;
