import React, { useState, useContext } from 'react';
import noteContext from '../context/notes/noteContext';
import Notes from './Notes';
import AddNoteModal from './AddNoteModal';
import Category from './Category';
import Guidelines from './Guidelines';

const Home = (props) => {
  const context = useContext(noteContext);
  const { notes } = context;


  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="flex">
        {/* 20% width for the Category component */}
          <div className="w-1/6">
            <Category />
          </div>
          {/* // 30% width for the AddNoteModal & Notes Component */}
          <div className={`w-${notes.length === 0 ? '[28rem]' : '[27rem]'} `}>
            <AddNoteModal closeModal={closeModal} showAlert={props.showAlert} />
            <Notes closeModal={closeModal} openModal={openModal} showAlert={props.showAlert} searchKeyword={props.searchKeyword} />
          </div>
        {/* 50% width for the Guidelines Component */}
          <div className="w-2/5">
            <Guidelines />
          </div>
      </div>
    </>
  );
};

export default Home;