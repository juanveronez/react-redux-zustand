import { Provider as ReduxProvider } from "react-redux";
import { TodoList } from "./components/TodoList";
import { store } from "./store";

export function App() {
  return (
    <ReduxProvider store={store}>
      <TodoList />
    </ReduxProvider>
  )
}
