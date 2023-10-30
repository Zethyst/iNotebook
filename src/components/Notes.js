import React, { useContext, useEffect, useRef, useState } from 'react';
import noteContext from '../context/notes/noteContext';
import NoteItem from './NoteItem';

const Notes = (props) => {
    const context = useContext(noteContext);
    const { notes, getNotes, addNote, deleteNote, editNote } = context;
    useEffect(() => {
        getNotes();
        // eslint-disable-next-line
    }, [notes]) //To re-render and display notes on any changes applied to notes.parameters

    const ref = useRef(null);
    const [note, setNote] = useState({ id: "", etitle: "", edescription: "", etag: "default" })
    
    const updateNote = (currentnote) => {
        ref.current.click();
        setNote({ id: currentnote._id, etitle: currentnote.title, edescription: currentnote.description, etag: currentnote.tag });
    }
    const handleClick = (e) => {
        e.preventDefault();
        editNote(note.id, note.etitle, note.edescription, note.etag)
        props.showAlert("Your edits have been applied", "success");
    }

    const handleChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })//spread operator to ensure jo bhi values pehle se hain voh rahe aur new values update hojaye eg: [description]:some new value
    }
    return (
        <>
            <button ref={ref} type="button" className="hidden" data-bs-toggle="modal" data-bs-target="#exampleModal"></button>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5 font-semibold" id="exampleModalLabel">Edit Note</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <form action=''>
                            <div className="modal-body">
                                <div className="mb-3">
                                    <label htmlFor="etitle" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="etitle" name='etitle' value={note.etitle} minLength={3} required placeholder='Enter a captivating title...' onChange={handleChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="edescription" className="form-label">Description</label>
                                    <input type="text" className="form-control" id="edescription" name="edescription" value={note.edescription} placeholder='Share the details of your note...' onChange={handleChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="etag" className="form-label">Tag</label>
                                    <input type="text" className="form-control" id="etag" name="etag" value={note.etag} placeholder='Label your note with a tag...' onChange={handleChange} />
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="w-24 h-9 rounded-lg bg-gray-600 hover:bg-gray-700 text-white" data-bs-dismiss="modal">Close</button>
                                <button disabled={note.etitle.length < 3} type="submit" onClick={handleClick} className="w-32 h-9 rounded-lg bg-[#007bff] hover:bg-blue-700 text-white" data-bs-dismiss='modal'>Update Note</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div className='container'>
                <h1 className='my-3 font-sans font-bold text-2xl'>Your Notes</h1>
                <div className="flex justify-center ml-4">
                    <div className="w-[24rem] md:w-[70rem] row overflow-hidden">
                        <div key="conditional-message" className='container'>
                            {notes.length === 0 && "Oops! Your notebook is feeling a bit lonely. Time to add some notes and fill it with your ideas!"}
                        </div>
                        {notes.map((note) => (
                            <div className="col-md-4" key={note._id}>
                                <NoteItem updateNote={updateNote} note={note} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Notes;
