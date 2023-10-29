import React, { useContext } from 'react';
import noteContext from '../context/notes/noteContext';
import NoteItem from './NoteItem';

const Notes = () => {
    const context = useContext(noteContext);
    const { notes } = context;

    return (
        <div className='container'>
            <h1 className='my-3 font-sans font-bold text-2xl'>Your Notes</h1>
            <div className="flex justify-center ml-4">
                <div className="w-[24rem] md:w-[70rem] row overflow-hidden">
                    {notes.map((note) => (
                        <div className="col-md-4" key={note.id}>
                            <NoteItem key={note.id} note={note} />
                        </div>

                    ))}
                </div>
            </div>
        </div>
    );
};

export default Notes;
