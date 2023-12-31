import React, { useContext} from 'react';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import TextSnippetRoundedIcon from '@mui/icons-material/TextSnippetRounded';
import FolderSharedRoundedIcon from '@mui/icons-material/FolderSharedRounded';
import SchoolRoundedIcon from '@mui/icons-material/SchoolRounded';
import categoryContext from '../context/categories/categoryContext';
import CategoryRoundedIcon from '@mui/icons-material/CategoryRounded';
import AdsClickIcon from '@mui/icons-material/AdsClick';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import { useDispatch } from "react-redux";
import { showMessage } from "../store/reducers/notificationSlice";

function Category(props) {

  // const ref=useRef(null);
  const dispatch = useDispatch();
  const category = useContext(categoryContext);
  const { selectedCategory, handleCategoryClick } = category;

  // const handleSideBarClick = ()=>{
  //   props.parentRef.current.classList.toggle("sidebar");
  //   // props.handleSideBarClick();
  // }

  const handleClick = ()=>{
    dispatch(showMessage({ message: "This feature is currently in development", messageType: 'warning' }));
  }

  return (
    <div className={`flex ${!props.isSidebarOpen? "sidebar": ""}`}  style={{transition: "all .7s ease"}}>
        <aside  className={`p-4  -translate-y-1  opacity-100 bg-[white] h-[100vh] md:h-[86vh] md:w-80  relative z-20`} style={{  transition: "transform 0.9s ease",boxShadow: "10px 20px 45px -1px rgba(0, 0, 0, 0.1), 0px 4px 6px -4px rgba(0, 0, 0, 0.1)" }}>
        <h3 className='uppercase text-slate-400 pb-3'>Categories</h3>
        <ul className=' space-y-2  text-slate-800 text-xs md:text-base' style={{fontFamily:"'Source Sans', sans-serif"}}>
          <li></li>
          <li className={`flex justify-start items-center gap-3 cursor-pointer rounded-2xl category p-2 px-3 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-600 hover:text-gray-800 ${selectedCategory === "All" ? 'bg-gray-200' : ''}`} onClick={() => handleCategoryClick("All")}><CategoryRoundedIcon /> <p className=' '>All</p></li>
          <li className={`flex justify-start items-center gap-3 cursor-pointer rounded-2xl category p-2 px-3 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-600 hover:text-gray-800 ${selectedCategory === "General" ? 'bg-gray-200' : ''}`} onClick={() => handleCategoryClick("General")}><TextSnippetRoundedIcon /> <p>General</p></li>
          <li className={`flex justify-start items-center gap-3 cursor-pointer rounded-2xl category p-2 px-3 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-600 hover:text-gray-800 ${selectedCategory === "Personal" ? 'bg-gray-200' : ''} `} onClick={() => handleCategoryClick("Personal")}><FolderSharedRoundedIcon /> <p>Personal</p></li>
          <li className={`flex justify-start items-center gap-3 cursor-pointer rounded-2xl category p-2 px-3 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-600 hover:text-gray-800 ${selectedCategory === "My Target" ? 'bg-gray-200' : ''} `} onClick={() => handleCategoryClick("My Target")}><AdsClickIcon  /> <p>My Target</p></li>
          <li className={`flex justify-start items-center gap-3 cursor-pointer rounded-2xl category p-2 px-3 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-600 hover:text-gray-800 ${selectedCategory === "Student" ? 'bg-gray-200' : ''} `} onClick={() => handleCategoryClick("Student")}><SchoolRoundedIcon /> <p>Student</p></li>
          <li className={`flex justify-start items-center gap-3 cursor-pointer rounded-2xl category p-2 px-3 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-600 hover:text-gray-800 ${selectedCategory === "Business" ? 'bg-gray-200' : ''} `} onClick={() => handleCategoryClick("Business")}><AttachMoneyIcon /> <p>Business</p></li>
          <li className={`flex justify-start items-center gap-3 cursor-pointer rounded-2xl category p-2 px-3 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-600 hover:text-gray-800 ${selectedCategory === "Quote" ? 'bg-gray-200' : ''} `} onClick={() => handleCategoryClick("Quote")}><FormatQuoteIcon /> <p>Quote</p></li>
        
        </ul>
        <div className='flex absolute bottom-8 cursor-pointer' onClick={handleClick} style={{fontFamily:"'Source Sans', sans-serif"}}><AddCircleRoundedIcon/> <p className='md:ml-3 ml-1 text-sm md:translate-y-0 translate-y-1 md:text-base select-none' >Add Category</p></div>
      </aside>

    </div>
  )
}

export default Category