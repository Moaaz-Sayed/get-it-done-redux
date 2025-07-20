import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import {
  showTodos as apiShowTodos,
  addTask as apiAddTask,
  editTask as apiEditTask,
  toggleComplete as apiToggleComplete,
  deleteTask as apiDeleteTask,
} from "../../services/apiTodos";
import toast from "react-hot-toast";

// Show Todos thunk

export const fetchTodos = createAsyncThunk(
  "todos/fetchTodos",
  async (_, thunkApi) => {
    const state = thunkApi.getState();
    const userId = state.auth.user?.id;
    if (!userId) return thunkApi.rejectWithValue("No user found");

    const res = await apiShowTodos(userId);
    if (!res.success) return thunkApi.rejectWithValue(res.error);

    return res.data;
  },
);

export const addTask = createAsyncThunk(
  "todos/addTask",
  async ({ title, user_id }, thunkApi) => {
    const res = await apiAddTask(user_id, title);
    if (!res.success) return thunkApi.rejectWithValue(res.error);
    return res.data;
  },
);

export const editTask = createAsyncThunk(
  "todos/editTask",
  async ({ id, newTitle }, thunkApi) => {
    const res = await apiEditTask(id, newTitle);
    if (!res.success) return thunkApi.rejectWithValue(res.error);
    return res.data;
  },
);

export const toggleComplete = createAsyncThunk(
  "todos/toggleComplete",
  async ({ id, currentState }, thunkApi) => {
    const res = await apiToggleComplete(id, currentState);
    if (!res.success) return thunkApi.rejectWithValue(res.error);
    return res.data[0];
  },
);

export const deleteTask = createAsyncThunk(
  "todos/deleteTask",
  async (id, thunkApi) => {
    const res = await apiDeleteTask(id);
    if (!res.success) return thunkApi.rejectWithValue(res.error);
    return id;
  },
);

const initialState = {
  todos: [],
  status: "idle",
  error: null,
};

const todosSlice = createSlice({
  name: "todos",
  initialState,
  extraReducers: (builder) => {
    builder

      // Show Tasks

      .addCase(fetchTodos.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.todos = action.payload;
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // Add Task

      .addCase(addTask.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(addTask.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.todos.unshift(action.payload);
        toast.success("Task added successfully!");
      })
      .addCase(addTask.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
        toast.error(`failed: ${action.payload || "Unknown error occurred"}`);
      })

      // Edit Task
      .addCase(editTask.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(editTask.fulfilled, (state, action) => {
        const updatedTodo = action.payload;
        const index = state.todos.findIndex(
          (todo) => todo.id === updatedTodo.id,
        );
        if (index !== -1) {
          state.todos[index] = updatedTodo;
        }
        state.status = "succeeded";
        toast.success("Task updated successfully!");
      })
      .addCase(editTask.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
        toast.error(
          `Update failed: ${action.payload || "Unknown error occurred"}`,
        );
      })

      // Complate Task
      .addCase(toggleComplete.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(toggleComplete.fulfilled, (state, action) => {
        const updatedTodo = action.payload;
        state.todos = state.todos.map((todo) =>
          todo.id === updatedTodo.id ? { ...todo, ...updatedTodo } : todo,
        );
        state.status = "succeeded";
        toast.success("Task status updated!");
      })
      .addCase(toggleComplete.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
        toast.error(`Failed to update status: ${action.payload}`);
      })

      //Delete Task

      .addCase(deleteTask.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.todos = state.todos.filter((todo) => todo.id !== action.payload);
        toast.success("Task deleted successfully!");
      })
      .addCase(deleteTask.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
        toast.error(
          `Failed to delete task: ${action.payload || "Unknown error"}`,
        );
      });
  },
});

export default todosSlice.reducer;
