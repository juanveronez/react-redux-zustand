import { Provider as ReduxProvider } from "react-redux";
import { TodoList } from "./components/TodoList";
import { store } from "./store";
import { AddTodo } from "./components/AddTodo";

export function App() {
  return (
    <ReduxProvider store={store}>
      <AddTodo />
      <TodoList />
    </ReduxProvider>
  )
}
