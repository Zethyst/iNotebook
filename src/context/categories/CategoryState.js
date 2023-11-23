import React, { useState, useContext, } from 'react'
import categoryContext from './categoryContext'
import noteContext from '../notes/noteContext';

const CategoryState = (props) => {

    const [selectedCategory, setSelectedCategory] = useState("All"); 
    const context = useContext(noteContext);
    const { notes} = context;

    const handleCategoryClick = (category) => {
        setSelectedCategory(category);
    };

    const filteredNotes = selectedCategory === "All" ? notes : notes.filter((note) => note.tag === selectedCategory);

  return (
        <categoryContext.Provider value={{ selectedCategory, handleCategoryClick, filteredNotes }}>
            {props.children}
        </categoryContext.Provider>
  )
}

export default CategoryState;