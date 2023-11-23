import React, { useContext} from 'react';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import TextSnippetRoundedIcon from '@mui/icons-material/TextSnippetRounded';
import FolderSharedRoundedIcon from '@mui/icons-material/FolderSharedRounded';
import SchoolRoundedIcon from '@mui/icons-material/SchoolRounded';
import categoryContext from '../context/categories/categoryContext';
import CategoryRoundedIcon from '@mui/icons-material/CategoryRounded';



function Category() {

  const category = useContext(categoryContext);
  const { handleCategoryClick} = category;

  return (
    <>
        <div className="p-4 bg-[white] h-[85vh]">
        <h3 className='uppercase text-slate-400'>Categories</h3>
        <ul className='ml-3 space-y-4 text-slate-800' style={{fontFamily:"'Source Sans', sans-serif"}}>
          <li></li>
<li className='flex gap-3 cursor-pointer category' onClick={() => handleCategoryClick("All")}><CategoryRoundedIcon /> <p>All</p></li>
<li className='flex gap-3 cursor-pointer category' onClick={() => handleCategoryClick("General")}><TextSnippetRoundedIcon /> <p>General</p></li>
<li className='flex gap-3 cursor-pointer category' onClick={() => handleCategoryClick("Personal")}><FolderSharedRoundedIcon /> <p>Personal</p></li>
<li className='flex gap-3 cursor-pointer category' onClick={() => handleCategoryClick("Student")}><SchoolRoundedIcon/> <p>Student</p></li>

        </ul>
        <div className='flex absolute bottom-8 cursor-pointer' style={{fontFamily:"'Source Sans', sans-serif"}}><AddCircleRoundedIcon/> <p className='ml-3'>Add Category</p></div>
      </div>
    </>
  )
}

export default Category