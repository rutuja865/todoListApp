import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  tasks: [],
  searchQuery: '',
  editingIndex: null,
};

const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    setTasks: (state, action) => {
      state.tasks = action.payload;
    },
    addTask: (state, action) => {
      if (state.editingIndex !== null) {
        state.tasks[state.editingIndex] = { ...action.payload };
        state.editingIndex = null;
      } else {
        state.tasks.unshift(action.payload);
      }
    },
    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter((task, index) => index !== action.payload);
    },
    toggleComplete: (state, action) => {
      const task = state.tasks[action.payload];
      task.completed = !task.completed;
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    setEditingIndex: (state, action) => {
      state.editingIndex = action.payload;
    },
  },
});

export const { setTasks, addTask, deleteTask, toggleComplete, setSearchQuery, setEditingIndex } = todoSlice.actions;

export default todoSlice.reducer;
