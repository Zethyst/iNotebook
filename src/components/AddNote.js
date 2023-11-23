import React, { useContext, useState } from 'react'
import noteContext from '../context/notes/noteContext'

const AddNote = (props) => {
    const context = useContext(noteContext);
    const { addNote } = context;
    const [note, setNote] = useState({ title: "", description: "", tag: "" })

    const handleClick = (e) => {
        e.preventDefault();
        if (note.tag==="") {
            note.tag="General";
        }
        addNote(note.title, note.description, note.tag);
        setNote({ title: "", description: "", tag: "" });
        props.showAlert("Your thoughts have been saved", "success");
    }

    const handleChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })//spread operator to ensure jo bhi values pehle se hain voh rahe aur new values update hojaye eg: [description]:some new value
    }
    return (
        <div className='container mt-12'>
            <form action='' className='rounded-2xl p-7 '>
                <h1 className='my-3 font-sans font-bold text-2xl'>Add a Note</h1>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" id="title" name='title' minLength={3} required value={note.title} placeholder='Give your note a headline...' onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input type="text" className="form-control" id="description" name="description" minLength={3} value={note.description} placeholder='Describe your thoughts here...' onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">Tag</label>
                    <input type="text" className="form-control" id="tag" name="tag" value={note.tag} placeholder='Tag it for quick identification..' onChange={handleChange} />
                </div>
                <button disabled={note.title.length<3} onClick={handleClick} type="submit" className="w-24 h-9 rounded-lg bg-[#007bff] hover:bg-blue-700 text-white">Add Note</button>
            </form>
        </div>
    )
}

export default AddNote