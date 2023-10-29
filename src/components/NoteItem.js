import React from 'react';

const NoteItem = (props) => {
    const { note } = props;

    return (
        <>
            <div className="relative mx-8 my-6 rounded-2xl flex flex-col justify-center items-center w-64 transition-all duration-500 ease-out hover:scale-105 bg-slate-200" style={{ height: "170px" }}>
                <span className="absolute -top-3 left-1/2 transform -translate-x-1/2  badge rounded-pill bg-danger">{note.tag}</span>
                <div className="flex flex-col my-2 w-48">
                    <p className="font-sans text-xl text-center leading-6 font-semibold paragraph-ellipsis">{note.title}</p>
                    <p className="font-sans text-stone-700 text-sm my-3 text-center w-54 h-8 paragraph-ellipsis-description">{note.description ? note.description : "No Description..."}</p>
                    {/* <p className='font-sans text-center text-xs my-1 w-48 h-5'><small style={{ color: 'grey' }}>Published At {d.toDateString()}, {d.toLocaleTimeString()}</small></p> */}
                </div>
                <a href="/" target='_blank' rel="noreferrer"><button className="bg-purple-700 hover:bg-purple-900 rounded-3xl font-semibold text-white h-8 w-48">Delete</button></a>
            </div>
        </>
    );
};

export default NoteItem;
