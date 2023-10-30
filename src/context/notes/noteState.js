import React, { useState } from 'react'
import noteContext from './noteContext'
import { json } from 'react-router-dom';

const NoteState = (props) => {
    let host = "http://127.0.0.1:5000";
    let s1 = {
        "name": "Akshat",
        "class": "10B"
    }
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
                    "Auth-Token": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjUzYmM1YTYxYjA1MmE5NzA2MGU4YWYyIn0sImlhdCI6MTY5ODQxODQ3M30.e-pJAzEh0BGbmaQ5B057gsoowIvo_E3wlqfdqer8d6j2TbmeSEKJr6UhTwZN1lPlI3dousoDvJAbwC3wWuqLfNUWrb28qBQPOiIflWXEPzYMOiM1Iszo2T_s4rc9oTO9RhbyieOAfNs9NYiudQm0qGTICpLfFtkTEEE6r0II2lT8qvi5oG4VASEeKWeU6JECZteb6z1IMlX6wYD6jG9LrW9D0SaROGQDwYS6BmidebmZaypp8O2Hl1fdlmPCcTrSRI-mc5Q1rD_RyFRXHBz4iYOeoJOuFHVqFEb6NiZIlb_mhRnZwBH_ElUVua9T_UrqZoKFltyjffO9sDm9KUxU8A"
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
        const response = await fetch(`${host}/api/notes/addnote`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Auth-Token": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjUzYmM1YTYxYjA1MmE5NzA2MGU4YWYyIn0sImlhdCI6MTY5ODQxODQ3M30.e-pJAzEh0BGbmaQ5B057gsoowIvo_E3wlqfdqer8d6j2TbmeSEKJr6UhTwZN1lPlI3dousoDvJAbwC3wWuqLfNUWrb28qBQPOiIflWXEPzYMOiM1Iszo2T_s4rc9oTO9RhbyieOAfNs9NYiudQm0qGTICpLfFtkTEEE6r0II2lT8qvi5oG4VASEeKWeU6JECZteb6z1IMlX6wYD6jG9LrW9D0SaROGQDwYS6BmidebmZaypp8O2Hl1fdlmPCcTrSRI-mc5Q1rD_RyFRXHBz4iYOeoJOuFHVqFEb6NiZIlb_mhRnZwBH_ElUVua9T_UrqZoKFltyjffO9sDm9KUxU8A"
            },
            body: JSON.stringify({ title, description, tag })
        });
        
        let note = await response.json();
        setNotes(notes.concat(note)); //concat returns an array, push updates an array
    }
    //!Delete a Note
    const deleteNote = async (id) => {
        //TODO: API CALL
        try {
            const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Auth-Token": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjUzYmM1YTYxYjA1MmE5NzA2MGU4YWYyIn0sImlhdCI6MTY5ODQxODQ3M30.e-pJAzEh0BGbmaQ5B057gsoowIvo_E3wlqfdqer8d6j2TbmeSEKJr6UhTwZN1lPlI3dousoDvJAbwC3wWuqLfNUWrb28qBQPOiIflWXEPzYMOiM1Iszo2T_s4rc9oTO9RhbyieOAfNs9NYiudQm0qGTICpLfFtkTEEE6r0II2lT8qvi5oG4VASEeKWeU6JECZteb6z1IMlX6wYD6jG9LrW9D0SaROGQDwYS6BmidebmZaypp8O2Hl1fdlmPCcTrSRI-mc5Q1rD_RyFRXHBz4iYOeoJOuFHVqFEb6NiZIlb_mhRnZwBH_ElUVua9T_UrqZoKFltyjffO9sDm9KUxU8A"
                }
            });
            const json = await response.json();
            console.log(json);
            const newNotes = notes.filter((note) => {
                return note._id != id
            })
            setNotes(newNotes); //concat returns an array, push updates an array
        } catch (error) {

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
                    "Auth-Token": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjUzYmM1YTYxYjA1MmE5NzA2MGU4YWYyIn0sImlhdCI6MTY5ODQxODQ3M30.e-pJAzEh0BGbmaQ5B057gsoowIvo_E3wlqfdqer8d6j2TbmeSEKJr6UhTwZN1lPlI3dousoDvJAbwC3wWuqLfNUWrb28qBQPOiIflWXEPzYMOiM1Iszo2T_s4rc9oTO9RhbyieOAfNs9NYiudQm0qGTICpLfFtkTEEE6r0II2lT8qvi5oG4VASEeKWeU6JECZteb6z1IMlX6wYD6jG9LrW9D0SaROGQDwYS6BmidebmZaypp8O2Hl1fdlmPCcTrSRI-mc5Q1rD_RyFRXHBz4iYOeoJOuFHVqFEb6NiZIlb_mhRnZwBH_ElUVua9T_UrqZoKFltyjffO9sDm9KUxU8A"
                },
                body: JSON.stringify({ title, description, tag })
            });

            const json = await response.json();
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
        <noteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
            {props.children}
        </noteContext.Provider>
    )
}

export default NoteState;