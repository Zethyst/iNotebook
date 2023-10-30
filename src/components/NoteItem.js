import React, { useContext, useState } from 'react'
import noteContext from '../context/notes/noteContext'

const NoteItem = (props) => {
    const { note } = props;
    const context = useContext(noteContext);
    const { deleteNote } = context;

    /*Difference between _id and id:

    id is the parameter which deleteNote is taking from Noteitem i.e the specific _id of the note on which delete is clicked

    this is why in filter function we are saying that only keep those notes with _id which doesnt match with the id (the one that needs to be deleted) */

    return (
        <>
            <div className="relative mx-8 my-6 rounded-2xl flex flex-col justify-center items-center w-64 transition-all duration-500 ease-out hover:scale-105 bg-slate-200" style={{ height: "170px" }}>
                <span className="absolute -top-3 left-1/2 transform -translate-x-1/2  badge rounded-pill bg-danger">{note.tag}</span>
                <div className="flex flex-col my-2 w-48">
                    <p className="font-sans text-xl text-center leading-6 font-semibold paragraph-ellipsis">{note.title}</p>
                    <p className="font-sans text-stone-700 text-sm my-3 text-center w-54 h-8 paragraph-ellipsis-description">{note.description ? note.description : "No Description..."}</p>
                    {/* <p className='font-sans text-center text-xs my-1 w-48 h-5'><small style={{ color: 'grey' }}>Published At {d.toDateString()}, {d.toLocaleTimeString()}</small></p> */}
                </div>
                <div className='flex gap-2'>
                    {/* {Note that: if you put delete note direct inside of onclick instead of in arrow funtion it will run automatically on re-render!} And use preventDefault() to stop page reloading when clicking delete button*/}
                    <a href="/" target='_blank' rel="noreferrer"><button className="bg-purple-700 hover:bg-purple-900 rounded-md font-semibold text-white h-8 w-24" onClick={(e)=>{e.preventDefault(); props.updateNote(note)}}><i className="fa-solid fa-pen-to-square"></i> Edit</button></a>
                    <a href="/" target='_blank' rel="noreferrer"><button className="bg-purple-700 hover:bg-purple-900 rounded-md font-semibold text-white h-8 w-24" onClick={(e) => { e.preventDefault(); deleteNote(note._id) }}><i className="fa-solid fa-trash"></i> Delete</button></a>
                </div>
            </div>
        </>
    );
};

export default NoteItem;
