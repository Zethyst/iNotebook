import React, { useContext, useEffect, useRef, useState } from "react";
import noteContext from "../context/notes/noteContext";
import categoryContext from "../context/categories/categoryContext";
import NoteItem from "./NoteItem";
import { useNavigate } from "react-router-dom";
import NoteAddRoundedIcon from "@mui/icons-material/NoteAddRounded";

const Notes = (props) => {
  const context = useContext(noteContext);
  const [logged, setLogged] = useState(false);
  const [mobileView, setMobileView] = useState(false);
  const category = useContext(categoryContext);
  const navigate = useNavigate();

  const { searchKeyword } = props;
  const { notes, getNotes, editNote } = context;
  let { filteredNotes } = category;

  useEffect(() => {
    if (localStorage.getItem("token")) {
      getNotes();
    } else {
      navigate("/");
    }
    // eslint-disable-next-line
  }, [notes]); //To re-render and display notes on any changes applied to notes.parameters

  const windowWidth = window.innerWidth;

  //if mobile view then close category panel automatically
  useEffect(() => {
    if (windowWidth<= 768) {
      setMobileView(true);
    }
    handleGetStarted();
  }, [])

  const ref = useRef(null);
  const [note, setNote] = useState({
    id: "",
    etitle: "",
    edescription: "",
    etag: "default",
  });

  const updateNote = (currentnote) => {
    ref.current.click();
    setNote({
      id: currentnote._id,
      etitle: currentnote.title,
      edescription: currentnote.description,
      etag: currentnote.tag,
    });
  };
  if (searchKeyword !== "") {
    filteredNotes = notes.filter(
      (note) =>
        note?.title.toLowerCase().includes(searchKeyword.toLowerCase()) ||
        note?.description.toLowerCase().includes(searchKeyword.toLowerCase())
    );
  }

  const handleClick = (e) => {
    e.preventDefault();
    editNote(note.id, note.etitle, note.edescription, note.etag);
    props.showAlert("Your edits have been applied", "success");
  };

  const handleGetStarted = () => {
    try { 
      if (!localStorage.getItem("token")) {
        navigate(mobileView ? '/login-app' : '/login');

        } else {
          setLogged(true);
          let t = props.openModal;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value }); //spread operator to ensure jo bhi values pehle se hain voh rahe aur new values update hojaye eg: [description]:some new value
  };
  return (
    <>
      <button
        ref={ref}
        type="button"
        className="hidden"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      ></button>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div
          className="modal-dialog modal-dialog-centered"
          style={{ fontFamily: "'Montserrat',sans-serif" }}
        >
          <div
            className="modal-content border-none"
            style={{
              background:
                "linear-gradient(132deg, rgba(187,148,86,1) 0%, rgba(246,228,128,1) 35%, rgba(246,241,186,1) 60%, rgba(202,175,90,1) 100%)",
            }}
          >
            <div className="modal-header border-b-yellow-950">
              <h1
                className="modal-title fs-5 font-semibold"
                id="exampleModalLabel"
              >
                Edit Note
              </h1>
              <h3
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></h3>
            </div>
            <form action="">
              <div className="modal-body">
                <div className="mb-3">
                  <label htmlFor="etitle" className="form-label font-medium">
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control outline-none indent-4 gold-plate"
                    id="etitle"
                    name="etitle"
                    style={{ fontFamily: "'Poppins',sans-serif" }}
                    value={note.etitle}
                    minLength={3}
                    required
                    placeholder="Enter a captivating title..."
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="edescription"
                    className="form-label font-medium"
                  >
                    Description
                  </label>
                  <input
                    type="text"
                    className="form-control outline-none indent-4 gold-plate"
                    id="edescription"
                    name="edescription"
                    style={{ fontFamily: "'Poppins',sans-serif" }}
                    value={note.edescription}
                    placeholder="Share the details of your note..."
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="etag" className="form-label font-medium">
                    Tag
                  </label>
                  <input
                    type="text"
                    className="form-control outline-none indent-4 gold-plate"
                    id="etag"
                    name="etag"
                    style={{ fontFamily: "'Poppins',sans-serif" }}
                    value={note.etag}
                    placeholder="Label your note with a tag..."
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="modal-footer border-none pt-0 pb-3">
                {/* <button type="button" className="w-24 h-9 rounded-lg bg-gray-600 hover:bg-gray-700 text-white" data-bs-dismiss="modal">Close</button> */}
                <button
                  disabled={note.etitle.length < 3}
                  type="submit"
                  onClick={handleClick}
                  className="w-full h-9 rounded-lg  bg-[#472523] hover:bg-[#321918] text-white"
                  data-bs-dismiss="modal"
                >
                  Update Note
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className=" text-center ">
        {filteredNotes.length === 0 || !localStorage.getItem("token") ? (
          <>
            <p className="my-3 font-sans font-bold text-2xl">Your Notes</p>
            <i
              className="fa-solid fa-ghost my-12"
              style={{ animation: "float 4s linear infinite", scale: "2.3" }}
            ></i>
            <p className="mb-8 mt-4 text-sm md:text-md p-10">
              Oops! Your notebook is feeling a bit lonely. Time to add some
              notes and fill it with your ideas!
            </p>
            {logged?<button
              style={{
                backgroundColor: "#FBAB7E",
                // backgroundImage: "linear-gradient(62deg, #AE8625 0%, #F7E58A 75%, #F7CE68 100%)"
                backgroundImage:
                  "linear-gradient(62deg, #AE8625 0%, #F7E58A 75%, #D2AC47 100%)",
              }}
              onClick={handleGetStarted}
              type="button"
              className="h-11 rounded-3xl text-white w-32"
              data-bs-toggle="modal"
              data-bs-target="#addNoteModal"
            >
              Get Started
            </button>:<button
              style={{
                backgroundColor: "#FBAB7E",
                // backgroundImage: "linear-gradient(62deg, #AE8625 0%, #F7E58A 75%, #F7CE68 100%)"
                backgroundImage:
                  "linear-gradient(62deg, #AE8625 0%, #F7E58A 75%, #D2AC47 100%)",
              }}
              onClick={handleGetStarted}
              type="button"
              className="h-11 rounded-3xl text-white w-32"
            >
              Get Started
            </button>}
          </>
        ) : (
          <div className="container">
            <h1 className=" mb-3 font-sans -translate-x-24 font-bold text-3xl">
              Notes
            </h1>
            <div className="flex flex-col max-h-[450px]">
              <div
                className={`${props.isSidebarOpen?"w-[15rem]":"w-[25rem]"} transition-all duration-500 ease-out md:w-[28rem] column -translate-x-7`}
                style={{ overflowY: "scroll", overflowX: "clip" }}
              >
                {/* <div key="conditional-message" className='container text-center'>
                                    {notes.length === 0 && "Oops! Your notebook is feeling a bit lonely. Time to add some notes and fill it with your ideas!"}
                                </div> */}
                {filteredNotes?.map((note) => (
                  <div className="col-md-4" key={note._id}>
                    <NoteItem updateNote={updateNote} note={note} />
                  </div>
                ))}
              </div>
            </div>
            <div
              onClick={handleGetStarted}
              style={{
                backgroundColor: "#FBAB7E",
                // backgroundImage: "linear-gradient(62deg, #AE8625 0%, #F7E58A 75%, #F7CE68 100%)"
                backgroundImage:
                  "linear-gradient(62deg, #AE8625 0%, #F7E58A 75%, #D2AC47 100%)",
              }}
              data-bs-toggle="modal"
              data-bs-target="#addNoteModal"
              className="rounded-full h-16 z-50 fixed right-14 bottom-9 w-16 flex justify-center items-center hover:scale-110 transition-all duration-150 cursor-pointer ease-linear"
            >
              <NoteAddRoundedIcon fontSize="large" className="ml-1 mb-1" />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Notes;
