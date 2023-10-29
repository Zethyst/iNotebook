import React, { useContext, useEffect } from 'react'
import noteContext from '../context/notes/noteContext'
import Notes from './Notes';

const Home = () => {
  const context = useContext(noteContext);
  const { notes, setNotes } = context;
  // useEffect(() => {
  //   context.update();
  //   // eslint-disable-next-line
  //   //Using as componetDidMount
  // }, [])

  return (
    <>
      <div className='container mt-4'>
        <form>

        <h1 className='my-3 font-sans font-bold text-2xl'>Add a Note</h1>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
            <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
            <input type="password" className="form-control" id="exampleInputPassword1" />
          </div>
          <div className="mb-3 form-check">
            <input type="checkbox" className="form-check-input" id="exampleCheck1" />
            <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
          </div>
          <button type="submit" className="w-24 h-9 rounded-lg bg-[#007bff] hover:bg-blue-700 text-white">Submit</button>
        </form>
      </div>
      <Notes/>
    </>
  )
}

export default Home