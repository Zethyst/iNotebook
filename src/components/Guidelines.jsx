import React from "react";

function Guidelines() {
  return (
    <div className="h-[85vh]">
      <img
        className="my-1 mx-auto "
        src="https://img.freepik.com/premium-vector/illustration-writer-writing-story_598748-544.jpg?w=740"
        alt="Illustration"
        style={{ width: "300px", height: "250px" }}
      />
      <div className=" flex gap-3 translate-x-28">
        <h1
          className="text-3xl font-bold"
          style={{ fontFamily: "'Source Sans', sans-serif" }}
        >
          Write down your ideas
        </h1>
        <i className="fa-solid fa-lightbulb scale-150 mt-[11px] text-amber-500"></i>
      </div>
      <div className=" translate-x-28 my-3 text-amber-500 font-semibold flex gap-6">
        <span>#Structured</span>
        <span>#Clarity</span>
        <span>#Concise</span>
      </div>
      <div className="translate-x-28 my-3 w-[420px] text-slate-400">
        <p>
          When writing notes, prioritize clarity. Ensure your thoughts are
          organized, use concise language, and focus on key points. Clear notes
          facilitate better understanding and effective recall, streamlining
          your learning or work process.
        </p>
      </div>
    </div>
  );
}

export default Guidelines;
