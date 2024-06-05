import React, { useState } from 'react'
import noteContext from './noteContext'
import { useDispatch } from "react-redux";
import { showMessage } from "../../store/reducers/notificationSlice";

const NoteState = (props) => {
    const dispatch = useDispatch();
    let host = "https://inotebook-backend-platinum.onrender.com";
    // let s1 = {
    //     "name": "Akshat",
    //     "class": "10B"
    // }
    // const [state, setState] = useState(s1);
    // const update = () => {
    //     setTimeout(() => {
    //         setState({
    //             "name": "Ekansh",
    //             "class": "11B"
    //         })
    //     }, 3000)
    // }
    
    const [notes, setNotes] = useState([]);

    //!Get all notes
    const getNotes = async () => {
        //*API CALL
        try {
            const response = await fetch(`${host}/api/notes/fetchallnotes`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Auth-Token": localStorage.getItem("token")
                },
            });
            const json = await response.json();
            // console.log(json)
            setNotes(json.notes);
        }
        catch (error) {
            console.error('Error fetching notes:', error);
        }
    }
    //!Add a Note
    const addNote = async (title, description, tag) => {
        //TODO: API CALL
        //*API CALL
        try {
        const response = await fetch(`${host}/api/notes/addnote`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Auth-Token": localStorage.getItem("token")
            },
            body: JSON.stringify({ title, description, tag })
        });

        let note = await response.json();
        setNotes(notes.concat(note)); //concat returns an new array, push just updates the array
        dispatch(showMessage({ message:"Your thoughts have been saved", messageType: 'success' }));
    } catch (error) {
        dispatch(showMessage({ message:"Some Error Occured", messageType: 'error' }));
        console.log(error);
    }
    }
    //!Delete a Note
    const deleteNote = async (id) => {
        //TODO: API CALL
        try {
            const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Auth-Token": localStorage.getItem("token")
                }
            });
            await response.json();
            const newNotes = notes.filter((note) => {
                return note._id !== id
            })
            setNotes(newNotes); //concat returns an array, push updates an array
        } catch (error) {
            console.log(error);
        }
    }

    //!Edit a Note
    const editNote = async (id, title, description, tag) => {
        //*API CALL
        try {

            const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "Auth-Token": localStorage.getItem("token")
                },
                body: JSON.stringify({ title, description, tag })
            });

            await response.json();
            //Logic to edit the note in client
            let newNotes = JSON.parse(JSON.stringify(notes)); //Exact copy of notes, cuz original isn't updating
            for (let i = 0; i < newNotes.length; i++) {
                const element = newNotes[i];
                if (element._id === id) {
                    newNotes[i].title = title;
                    newNotes[i].description = description;
                    newNotes[i].tag = tag;
                    break;
                }
            }
            setNotes(newNotes)
        } catch (error) {
            console.error('Error editing note:', error);
        }
    }
    return (
        <noteContext.Provider value={{notes, addNote, deleteNote, editNote, getNotes }}>
            {props.children}
        </noteContext.Provider>
    )
}

export default NoteState;