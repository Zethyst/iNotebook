import React, { useContext, useState } from 'react';
import noteContext from '../context/notes/noteContext';
import { useDispatch } from "react-redux";
import { showMessage } from "../store/reducers/notificationSlice";

const AddNoteModal = ({ closeModal }) => {
    
    const context = useContext(noteContext);
    const { addNote } = context;
    const [note, setNote] = useState({ title: '', description: '', tag: '' });
    const dispatch = useDispatch();

    const handleNotify = (msg) => {
      dispatch(showMessage({ message: `${msg}`, messageType: 'success' }));
    };

    const handleClick = (e) => {
        e.preventDefault();
        if (note.tag === '') {
            note.tag = 'General';
        }
        addNote(note.title, note.description, note.tag);
        setNote({ title: '', description: '', tag: '' });

        handleNotify("Your thoughts have been saved");
        closeModal();
    };

    const handleChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value });
    };

    return (
        <div className='modal fade' id='addNoteModal' tabIndex='-1' aria-labelledby='addNoteModalLabel' aria-hidden='true'>
            <div className='modal-dialog modal-dialog-centered'  style={{ fontFamily: "'Montserrat',sans-serif" }} >
                <div className='modal-content border-none' style={{background: "linear-gradient(132deg, rgba(187,148,86,1) 0%, rgba(246,228,128,1) 35%, rgba(246,241,186,1) 60%, rgba(202,175,90,1) 100%)"}}>
                    <div className='modal-header border-b-yellow-950'>
                        <h1 className='modal-title fs-5 font-semibold' id='addNoteModalLabel'>Add a Note</h1>
                        <h3 className="btn-close" data-bs-dismiss="modal" aria-label="Close"></h3>
                    </div>
                    <form action=''>
                        <div className='modal-body'>
                            <div className='mb-3'>
                                <label htmlFor='title' className='form-label font-medium'>Title</label>
                                <input type='text' className='form-control outline-none gold-plate' id='title' name='title' style={{ fontFamily: "'Poppins',sans-serif" }} value={note.title} minLength={3} required placeholder='Give your note a headline...' onChange={handleChange} />
                            </div>
                            <div className='mb-3'>
                                <label htmlFor='description' className='form-label font-medium'>Description</label>
                                <input type='text' className='form-control outline-none gold-plate' id='description' name='description' minLength={3} value={note.description} style={{ fontFamily: "'Poppins',sans-serif" }} placeholder='Describe your thoughts here...' onChange={handleChange} />
                            </div>
                            <div className='mb-3'>
                                <label htmlFor='tag' className='form-label font-medium'>Tag</label>
                                <input type='text' className='form-control outline-none gold-plate' id='tag' name='tag' value={note.tag} style={{ fontFamily: "'Poppins',sans-serif" }} placeholder='Tag it for quick identification..' onChange={handleChange} />
                            </div>
                        </div>
                        <div className='modal-footer border-none pt-0 pb-3'>
                            {/* <button type='button' className='w-24 h-9 rounded-lg bg-gray-600 hover:bg-gray-700 text-white' data-bs-dismiss='modal'>Close</button> */}
                            <button type='submit' onClick={handleClick} className='w-full h-9 rounded-lg bg-[#472523] hover:bg-[#321918] text-white' style={{ fontFamily: "'Poppins',sans-serif" }} data-bs-dismiss='modal'>Add Note</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddNoteModal;
