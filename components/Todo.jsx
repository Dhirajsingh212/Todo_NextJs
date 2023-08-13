"use client";

import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { MdOutlineDone } from "react-icons/md";
import { useRef } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { todoAction } from "@/redux/features/todo";
import dynamic from "next/dynamic";
import { toast } from "react-toastify";

const Todo = ({ item, index }) => {
  const myref = useRef(null);
  const [flag, setFlag] = useState(true);

  const dispatch = useDispatch();

  let date = new Date().toLocaleDateString();

  return (
    <div className="task">
      <h3>{date}</h3>
      <h2 ref={myref}>{item}</h2>
      <button
        onClick={() => {
          dispatch(todoAction.delete(index));
          toast.success("successfully deleted");
        }}
      >
        <AiFillDelete />
      </button>
      <button
        onClick={() => {
          myref.current.contentEditable = flag;
          setFlag(!flag);
          console.log(myref.current.innerText);
          if (!flag) {
            dispatch(
              todoAction.edit({
                index,
                value: myref.current.innerText,
              })
            );
          }
        }}
      >
        {flag ? <AiFillEdit /> : <MdOutlineDone />}
      </button>
    </div>
  );
};

export default dynamic(() => Promise.resolve(Todo), { ssr: false });
