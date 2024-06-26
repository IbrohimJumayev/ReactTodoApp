import { useState, createContext } from "react";
import TodoApp from "./components/TodoApp";

export const  todoContext = createContext()


function App() {
   const [todos, setTodos] = useState([])
   const [newTask, setNewTask] = useState("")
   const [doneTasks, setDoneTasks] = useState([])

   return (
    <todoContext.Provider value={{todos,setTodos, newTask, setNewTask, doneTasks, setDoneTasks}} >
        <TodoApp />
    </todoContext.Provider>
   )
}

export default App;
