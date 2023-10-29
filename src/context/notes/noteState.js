import React, { useState } from 'react'
import noteContext from './noteContext'

const NoteState = (props) => {
    let s1 = {
        "name": "Akshat",
        "class": "10B"
    }
    const [state, setState] = useState(s1);
    const update = () => {
        setTimeout(() => {
            setState({
                "name": "Ekansh",
                "class": "11B"
            })
        }, 3000)
    }
    var notesInitial = [

        {
            "_id": "653ea54a840bb3282b4327ee",
            "user": "653bc5a61b052a97060e8af2",
            "title": "Barber",
            "description": "Go to charlie barber and get an undercut",
            "tag": "Personal",
            "date": "2023-10-29T18:32:42.423Z",
            "__v": 0
        },
        {
            "_id": "653ea585840bb3282b4327f0",
            "user": "653bc5a61b052a97060e8af2",
            "title": "Buy Specs",
            "description": "Go to specskart shop and buy a shiny new specs",
            "tag": "Personal",
            "date": "2023-10-29T18:33:41.858Z",
            "__v": 0
        },
        {
            "_id": "653ea585840bb3282b4327f0",
            "user": "653bc5a61b052a97060e8af2",
            "title": "Buy Specs",
            "description": "Go to specskart shop and buy a shiny new specs",
            "tag": "Personal",
            "date": "2023-10-29T18:33:41.858Z",
            "__v": 0
        },
        {
            "_id": "653ea585840bb3282b4327f0",
            "user": "653bc5a61b052a97060e8af2",
            "title": "Buy Specs",
            "description": "Go to specskart shop and buy a shiny new specs",
            "tag": "Personal",
            "date": "2023-10-29T18:33:41.858Z",
            "__v": 0
        }
    ]
    const [notes,setNotes]=useState(notesInitial)
    return (
        <noteContext.Provider value={{ notes,setNotes}}>
            {props.children}
        </noteContext.Provider>
    )
}

export default NoteState;