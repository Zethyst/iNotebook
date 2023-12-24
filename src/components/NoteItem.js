import React, { useContext, useState, useRef } from 'react'
import noteContext from '../context/notes/noteContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as regularStar } from '@fortawesome/free-regular-svg-icons';
import { faStar as solidStar } from '@fortawesome/free-solid-svg-icons';

const NoteItem = (props) => {
    const { note } = props;
    const context = useContext(noteContext);
    const { deleteNote } = context;
    const ref= useRef(null);

    // Convert the ISO date string to a Date object
    const formattedDate = new Date(note.date).toLocaleDateString('en-GB');

    const [isStarHovered, setIsStarHovered] = useState(false);
    const [isEditHovered, setIsEditHovered] = useState(false);
    const [isDeleteHovered, setIsDeleteHovered] = useState(false);
    const [goldMode, setGoldMode] = useState(false);

    function capitalize(word) {
        word = (word ?? '').toLowerCase();
        return word.charAt(0).toUpperCase() + word.slice(1);
      }
      

    const getTagColorClass = (tag) => {
        switch (tag) {
          case 'Student':
            return 'bg-blue-500 text-white';
          case 'Personal':
            return 'bg-green-500 text-white';
          case 'General':
            return 'bg-red-500 text-white';
          case 'Business':
            return 'bg-amber-500 text-white';
          case 'Quote':
            return 'bg-purple-500 text-white';
          case 'My target':
            return 'bg-cyan-500 text-white';
          default:
            return 'bg-slate-500 text-white'; 
        }
      };

    const handleDeletion = ()=>{
        ref.current.classList.add("animate-ping");
        ref.current.classList.add("opacity-30");
    }

    const tagColorClass = getTagColorClass(capitalize(note.tag));

    /*Difference between _id and id:

    id is the parameter which deleteNote is taking from Noteitem i.e the specific _id of the note on which delete is clicked, mongodb gives it by default

    this is why in filter function we are saying that only keep those notes with _id which doesnt match with the id (the one that needs to be deleted) */

    return (
        <>
            <div ref={ref} className={`relative mx-8 my-6 rounded-2xl flex flex-col justify-center items-center md:w-96 w-[19rem] transition-all duration-500 ease-out hover:scale-105 ${goldMode ? "bg-[linear-gradient(180deg,#ffd467,#ffe6a9)]" : "bg-[#f5f5f5d2]"}`} style={{ height: "170px" }}>
            <span className={`absolute -top-3 left-1/2 transform -translate-x-1/2 badge rounded-pill ${tagColorClass}`}>{capitalize(note.tag)}</span>
                <header>
                    <div className='flex gap-2'>
                        {/* {Note that: if you put delete note direct inside of onclick instead of in arrow funtion it will run automatically on re-render!} And use preventDefault() to stop page reloading when clicking delete button*/}
                        <i onClick={(e) => { e.preventDefault(); props.updateNote(note) }} onMouseEnter={() => setIsEditHovered(true)}
                            onMouseLeave={() => setIsEditHovered(false)} className={`fa-solid fa-pen-to-square absolute right-14 top-4 cursor-pointer text-${isEditHovered ? "[#01ce01]" : ""}  ${goldMode ? "text-white" : "text-slate-500"}`}></i>
                        <i onClick={(e) => { e.preventDefault(); deleteNote(note._id); handleDeletion()}} onMouseEnter={() => setIsDeleteHovered(true)}
                        onMouseLeave={() => setIsDeleteHovered(false)} className={`fa-solid fa-trash absolute right-24 top-4 cursor-pointer text-${isDeleteHovered ? "[red]" : ""} ${goldMode ? "text-white" : "text-slate-500"}`}></i>
                    </div>
                    <FontAwesomeIcon
                        icon={(isStarHovered || goldMode) ? solidStar : regularStar}
                        className={`absolute right-4 top-4 cursor-pointer ${goldMode ? "text-white" : "text-[#F59E0B]"}`}
                        onClick={() => setGoldMode((prevGoldMode) => !prevGoldMode)}
                        onMouseEnter={() => setIsStarHovered(true)}
                        onMouseLeave={() => setIsStarHovered(false)}
                    />
                </header>

                <div className={`flex flex-col my-2 w-72 px-3`}>
                    <p className="font-sans text-xl text-start leading-6 font-bold max-h-12 overflow-clip">{note.title}</p>
                    <p className={`font-sans text-stone-500 font-medium text-sm mt-3 text-start w-64  max-h-20 overflow-auto`}>{note.description ? note.description : "No Description..."}</p>
                    {/* <p className='font-sans text-center text-xs my-1 w-48 h-5'><small style={{ color: 'grey' }}>Published At {d.toDateString()}, {d.toLocaleTimeString()}</small></p> */}
                </div>

                <footer><p className='absolute right-6 text-sm -translate-y-1 text-slate-400 select-none'>{formattedDate}</p></footer>
            </div>
        </>
    );
};

export default NoteItem;
