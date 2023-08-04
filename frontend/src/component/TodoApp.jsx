import { useContext, useEffect, useState } from "react";
import AuthContext from "../context/AuthContext";

const TodoApp = () => {
  const [buttonClicked, setButtonClicked] = useState(false);

  const { fetchTasks, tasks, user, createTask, updateTask, deleteTask } =
    useContext(AuthContext);

  useEffect(() => {
    if (user) {
      fetchTasks();
    }
    console.log("rendered");
    console.log(fetchTasks());
  }, []);

  const handleButtonClick = () => {
    setButtonClicked(true);
    // Here you can also update the Todo item to have a strike.
    // However, as the Todo items are managed through the `tasks` state,
    // you'll need to update the `completed` field of the respective Todo item in the `updateTask` function in AuthContext.jsx
  };

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          createTask(e.target.taskTitle.value);
          e.target.taskTitle.value = "";
        }}
        className="bg-white md:w-[60vw] w-[90vw] md:h-24 h-16 md:p-4 p-2 flex gap-2 shadow-lg shadow-indigo-500/50 "
      >
        <input
          type="text"
          name="taskTitle"
          placeholder="Username"
          className="input input-bordered w-[72%] md:h-16 h-11 text-black flex-[3_1_0] "
        />
        <button
          className=" btn btn-success md:h-16 h-6 w-[25%] text-3xl"
          type="submit"
        >
          +
        </button>
      </form>
      <br />
      <div className="h-[calc(100vh-200px)] w-[100vw] mt-2 overflow-y-auto overflow-x-hidden">
        {user && user ? (
          tasks.map((ele) => (
            <div key={ele.id} className=" h-24 w-[100vw] p-1">
              <form
                onSubmit={(e) => e.preventDefault()}
                className=" m-auto border h-16 w-[90vw] md:w-[70vw] md:text-2xl rounded p-3 font-serif relative overflow-hidden"
              >
                <div className="w-[50vw] text-black" key={ele.id}>
                  {ele.title}
                </div>
                <div className="text-xl w-22 absolute right-2 top-2">
                  <button
                    className={`fa-regular fa-circle-check border rounded-s-2xl p-2 md:text-2xl ${
                      buttonClicked ? "text-green-500 line-through" : ""
                    }`}
                    type="submit"
                    onClick={handleButtonClick}
                  ></button>
                  <button
                    className="fa-solid fa-pen-to-square border p-2 md:text-2xl"
                    type="submit"
                    onClick={() => {
                      // Prompt the user to enter the new title
                      const newTitle = prompt(
                        "Enter the updated title:",
                        ele.title
                      );
                      if (newTitle) {
                        // Only update if the user provides a new title
                        updateTask(ele.id, { title: newTitle });
                      }
                    }}
                  ></button>
                  <button
                    className="fa-solid fa-trash border rounded-e-2xl p-2 md:text-2xl"
                    type="submit"
                    onClick={() => deleteTask(ele.id)}
                  ></button>
                </div>
              </form>
            </div>
          ))
        ) : (
          <div>Add Todo</div>
        )}
      </div>
    </>
  );
};

export default TodoApp;
