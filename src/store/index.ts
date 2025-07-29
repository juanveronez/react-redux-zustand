import { configureStore, createSlice } from "@reduxjs/toolkit";

const todoSlice = createSlice({
  name: 'todo',
  initialState: ['Fazer café', 'Estudar Redux'],
  reducers: {
    add: (state, { payload }) => {
      state.push(payload.newTodo)
    },
  }
})

export const store = configureStore({
  reducer: {
    todo: todoSlice.reducer
  }
})

export const { add } = todoSlice.actions
