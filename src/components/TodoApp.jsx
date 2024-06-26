import { useContext, useff } from "react";
import { todoContext } from "../App";
import donesound from "../assets/audio/done.wav";
import deletesound from "../assets/audio/delete.wav";

function playDone() {
  new Audio(donesound).play();
}

function playDelete() {
    new Audio(deletesound).play()
}

function TodoApp() {
  const { todos, setTodos, newTask, setNewTask, doneTasks, setDoneTasks } =
    useContext(todoContext);

  const handleChange = (e) => {
    setNewTask(e.target.value);
  };

  const addTask = (e) => {
    e.preventDefault();
    if (newTask.trim() !== "") {
      const TASK = {
        id: Date.now(),
        taskName: newTask,
        done: false,
      };
      setTodos([...todos, TASK]);
      setNewTask("");
    }
  };

  const deleteTask = (id) => {
    const updatedTasks = todos.filter((t) => t.id !== id);
    setTodos(updatedTasks);
  };

  const doneTodos = (id) => {
    const updatedTasks = todos.filter((d) => d.id !== id);
    const taskDonelist = todos.filter((d) => d.id === id);

    setDoneTasks([...doneTasks, taskDonelist[0]]);
    setTodos(updatedTasks);
  };

  const deleteFromDone = (id) => {
    const updatedTasks = doneTasks.filter((d) => d.id !== id);
    setDoneTasks(updatedTasks);
  };

  const undo = (id) => {
    const updatedTasks = doneTasks.filter((d) => d.id !== id);
    const taskUndoList = doneTasks.filter((d) => d.id === id);

    setTodos([...todos, taskUndoList[0]]);
    setDoneTasks(updatedTasks);
  };

  return (
    <div className="max-w-xl pb-10 bg-bgColorDiv m-auto mt-28 rounded-2xl pt-10 pl-12 pr-12 max-[600px]:mt-0 max-[600px]:rounded-none max-[600px]:px-5 ">
      <div>
        <form className="flex justify-between gap-5 items-center ">
          <input
            value={newTask}
            onChange={handleChange}
            className="w-full bg-transparent border-solid border-2 border-borderInputColor pt-1 pl-2 pr-2 pb-1 outline-none rounded-md  text-white"
            type="text"
            placeholder="Enter a task..."
          />
          <button
            onClick={(e) => {addTask(e); playDelete()}}
            className="text-white bg-borderInputColor pt-1 pl-2 pr-2 pb-1 rounded-lg"
          >
            add
          </button>
        </form>
        <h2 className="text-white mt-10">Tasks to do - {todos.length}</h2>
      </div>

      <div className=" mt-5 flex flex-col gap-y-2 ">
        {todos.map((t) => {
          return (
            <li
              key={t.id}
              className="text-borderInputColor flex list-none bg-taskBacColor pt-3 pb-4 pl-4 pr-4 rounded-xl  justify-between"
            >
              <span>{t.taskName}</span>
              <div className=" flex gap-5">
                <button
                  onClick={() => {
                    doneTodos(t.id);
                    playDone();
                  }}
                  className="text-green-500 hover:transform"
                >
                  done
                </button>
                <button
                  onClick={() => {deleteTask(t.id); playDelete()}}
                  className="text-red-400"
                >
                  delete
                </button>
              </div>
            </li>
          );
        })}
      </div>
      <div className=" mt-1 flex flex-col gap-y-2 ">
        <h2 className="text-white mt-5">Done - {doneTasks.length}</h2>
        {doneTasks.map((d) => {
          return (
            <li className="text-gray-500 flex list-none bg-taskBacColor pt-3 pb-4 pl-4 pr-4 rounded-xl  justify-between">
              <span>{d.taskName}</span>
              <div className=" flex gap-5">
                <button onClick={() =>{undo(d.id);playDone()} } className="text-blue-500">
                  undo
                </button>
                <button
                  onClick={() =>{deleteFromDone(d.id); playDelete()} }
                  className="text-red-400"
                >
                  delete
                </button>
              </div>
            </li>
          );
        })}
      </div>
    </div>
  );
}

export default TodoApp;
