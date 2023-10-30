import React, { useContext, useEffect } from 'react'
import noteContext from '../context/notes/noteContext'
import Notes from './Notes';
import AddNote from './AddNote';

const Home = (props) => {

  // useEffect(() => {
  //   context.update();
  //   // eslint-disable-next-line
  //   //Using as componetDidMount
  // }, [])

  return (
    <>
     <AddNote showAlert={props.showAlert}/>
      <Notes showAlert={props.showAlert}/>
    </>
  )
}

export default Home