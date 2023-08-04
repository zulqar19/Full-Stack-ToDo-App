import { useState, useEffect, useContext } from 'react';
import Axios from 'axios';
import AuthContext from '../context/AuthContext';

const HomePage = () => {
  // State to store the list of tasks
  const [tasks, setTasks] = useState([]);

  // Function to fetch tasks from the backend API
  const fetchTasks = async () => {
    try {
      const response = await Axios.get('http://127.0.0.1:8000/todo/task-list/');
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  // Function to create a new task
  const createTask = async (title) => {
    try {
      const response = await Axios.post('http://127.0.0.1:8000/todo/task-create/', {
        title: title,
        completed: false,
      });
      setTasks([...tasks, response.data]);
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  // Function to update a task
  const updateTask = async (id, updatedTask) => {
    try {
      await Axios.post(`http://127.0.0.1:8000/todo/task-update/${id}/`, updatedTask);
      const updatedTasks = tasks.map((task) =>
        task.id === id ? { ...task, ...updatedTask } : task
      );
      setTasks(updatedTasks);
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  // Function to delete a task
  const deleteTask = async (id) => {
    try {
      await Axios.delete(`http://127.0.0.1:8000/todo/task-delete/${id}/`);
      const updatedTasks = tasks.filter((task) => task.id !== id);
      setTasks(updatedTasks);
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  // Fetch tasks when the component mounts
  useEffect(() => {
    fetchTasks();
  }, []);

  // Check if the user is logged in
  const { user } = useContext(AuthContext);

  // Render the TodoApp component
  return (
    <div>
      {/* Conditional rendering based on user login status */}
      {user ? (
        // Render the Todo application if the user is logged in
        <div>
          {/* Todo list */}
          <ul>
            {tasks.map((task) => (
              <li key={task.id}>
                {/* Task title */}
                {task.title}
                {/* Task completed status */}
                {task.completed ? ' - Completed' : ' - Not completed'}
                {/* Buttons to update and delete tasks */}
                <button onClick={() => updateTask(task.id, { completed: !task.completed })}>
                  Mark {task.completed ? 'Not Completed' : 'Completed'}
                </button>
                <button onClick={() => deleteTask(task.id)}>Delete</button>
              </li>
            ))}
          </ul>
          {/* Form to add a new task */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              createTask(e.target.taskTitle.value);
              e.target.taskTitle.value = '';
            }}
          >
            <input type="text" name="taskTitle" placeholder="Enter task title" required />
            <button type="submit">Add Task</button>
          </form>
        </div>
      ) : (
        // Render a message if the user is not logged in
        <div>Please log in to access the Todo application.</div>
      )}
    </div>
  );
};

export default HomePage;
