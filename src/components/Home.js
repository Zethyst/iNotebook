import React, { useState, useContext, useRef } from 'react';
import noteContext from '../context/notes/noteContext';
import Notes from './Notes';
import AddNoteModal from './AddNoteModal';
import Category from './Category';
import Guidelines from './Guidelines';
import { useEffect } from 'react';

const Home = (props) => {

  const ref=useRef(null);
  const context = useContext(noteContext);
  const { notes } = context;


  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isSidebar2Open, setIsSidebar2Open] = useState(true);

  const windowWidth = window.innerWidth;

  //if mobile view then close category panel automatically
  useEffect(() => {
    if (windowWidth<= 768) {
      handleSideBarClick();
    }
  }, [])
  

  const handleSideBarClick = () => {
    setIsSidebarOpen(!isSidebarOpen);
    setIsSidebar2Open(!isSidebar2Open);
    // ref.current.classList.toggle("sidebar");
  };

  const sidebarWidth = isSidebarOpen ? '1/6' : '0';
  const sidebar2Width = isSidebar2Open ? '42' : '0';

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="flex" style={{transition: "all .9s ease"}}>
        {/* 20% width for the Category component */}
          <div className={`md:w-${sidebarWidth} w-${sidebar2Width}`} style={{transition: "all .7s ease"}}>
            <Category handleSideBarClick={handleSideBarClick} isSidebarOpen={isSidebarOpen} parentRef={ref}/>
          </div>
          <div  className='sidebtn relative translate-y-32 w-10 md:w-8 z-10 h-56 rounded-r-2xl cursor-pointer shadow-lg flex justify-center items-center ' onClick={handleSideBarClick} >
            <div className='h-10 w-1 rounded-lg bg-gray-600'></div>
          </div>
          {/* // 30% width for the AddNoteModal & Notes Component */}
          <div className={`w-${notes ? '[22rem]' : '[20rem]'} md:w-${notes? '[28rem]' : '[27rem]'} relative`} >
            <AddNoteModal closeModal={closeModal} />
            <Notes isSidebarOpen={isSidebarOpen} closeModal={closeModal} openModal={openModal} searchKeyword={props.searchKeyword} />
          </div>
        {/* 50% width for the Guidelines Component */}
          <div className={`md:w-2/5 hidden md:block`} >
            <Guidelines />
          </div>
          
      </div>
    </>
  );
};

export default Home;