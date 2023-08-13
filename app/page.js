"use client";
import { todoAction } from "@/redux/features/todo";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import Todo from "@/components/Todo";
import dynamic from "next/dynamic";
import { toast } from "react-toastify";

const page = () => {
  const [item, setItem] = useState("");
  const dispatch = useDispatch();

  const { todos } = useSelector((state) => {
    return state.todoReducer;
  });

  const changeHandler = (event) => {
    setItem(event.target.value);
  };

  const submitHandler = () => {
    if (item.length > 1) {
      dispatch(todoAction.add(item));
      toast.success("successfully added");
    } else {
      toast.error("length should be more than 0");
    }
    setItem("");
  };

  return (
    <div className="todo">
      <div className="add_parent">
        <input
          placeholder="add todo"
          value={item}
          onChange={changeHandler}
        ></input>
        <button onClick={submitHandler}>+</button>
      </div>
      <div className="task_parent">
        {todos
          ? todos.map((item, index) => {
              return <Todo key={index} item={item} index={index} />;
            })
          : null}
      </div>
    </div>
  );
};

export default dynamic(() => Promise.resolve(page), { ssr: false });
