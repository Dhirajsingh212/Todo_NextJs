"use client";
import { createSlice } from "@reduxjs/toolkit";

const todoSlice = createSlice({
  name: "todo",
  initialState: {
    todos:
      typeof window !== "undefined"
        ? JSON.parse(localStorage.getItem("todo")) || []
        : [],
  },
  reducers: {
    add(state, action) {
      state.todos = [...state.todos, action.payload];
      setLocal(state.todos);
    },
    delete(state, action) {
      state.todos = state.todos.filter((_, index) => index != action.payload);
      setLocal(state.todos);
    },
    edit(state, action) {
      state.todos[action.payload.index] = action.payload.value;
      setLocal(state.todos);
    },
  },
});

export const todoAction = todoSlice.actions;
export const todoReducer = todoSlice.reducer;

const setLocal = (value) => {
  localStorage.setItem("todo", JSON.stringify(value));
};
