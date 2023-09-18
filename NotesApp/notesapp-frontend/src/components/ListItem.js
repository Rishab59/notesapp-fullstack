import React from 'react' ;
import { Link } from 'react-router-dom' ;


let getTitle = (note) => {
    let title = note.body.split('\n')[0] ;

    if(title.length > 45) {
        return title.slice(0, 45) ;
    }

    return title ;
} ;


let getContent = (note) => {
    let title = getTitle(note) ;
    let content = note.body.replaceAll('\n', ' ') ;
    content = content.replaceAll(title, '') ;

    if(content.length > 50){
        return content.slice(0, 50) + '...' ;
    }

    return content
} ;


let getUpdatedTime = (note) => {

    let date = new Date(note.updated) ;
    let day = date.getDate() ;
    let month = date.toLocaleString(undefined, { month: 'short' }) ;
    let year = date.getFullYear() ;
    let hours = date.getHours() ;
    let minutes = date.getMinutes() ;
    let seconds = date.getSeconds() ;
    let amPm = hours >= 12 ? 'PM' : 'AM' ;

    // Format the day with an ordinal suffix (e.g: "1st",  "10th")
    let dayFormatted = day + (day % 10 === 1 && day !== 11 ? 'st' : day % 10 === 2 && day !== 12 ? 'nd' : day % 10 === 3 && day !== 13 ? 'rd' : 'th') ;

    // Format hours, minutes, and seconds with leading zeros if less than 10
    let formattedHours = (hours % 12 || 12).toString().padStart(2, '0') ;
    let formattedMinutes = minutes.toString().padStart(2, '0') ;
    let formattedSeconds = seconds.toString().padStart(2, '0') ;

    return `${dayFormatted} ${month} ${year}, ${formattedHours} : ${formattedMinutes} : ${formattedSeconds}  ${amPm}` ;
} ;


const ListItem = ({ note }) => {
  return (
    <Link to = {`/note/${note.id}`}>
        <div className = "notes-list-item">
            <h3>{ getTitle(note) }</h3>
            <p>
                &nbsp;&nbsp;&nbsp;{ getContent(note) }
                <br />
                Last Updated : <span>{ getUpdatedTime(note) }</span>
            </p>
        </div>
    </Link>
  )
} ;


export default ListItem ;
