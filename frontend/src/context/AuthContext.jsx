import {createContext , useState , useEffect} from 'react';
import jwt_decode from 'jwt-decode';
import { useNavigate } from 'react-router-dom'
import jwtDecode from 'jwt-decode';
import  Axios  from 'axios';

const AuthContext = createContext();

export default AuthContext;

// eslint-disable-next-line react/prop-types
export const AuthProvider =({children}) => {

    const [tasks, setTasks] = useState([]);
    const [errors, setErrors] = useState();
    const [authTokens , setAuthTokens] = useState(() => localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null)
    const [user , setUser] = useState(() => localStorage.getItem('authTokens') ? jwt_decode(localStorage.getItem('authTokens')) : null)
    const [loading , setLoading] = useState(false);

    let navigate = useNavigate();

    let loginUser = async (e) => {
        e.preventDefault()
        let response = await fetch('http://127.0.0.1:8000/api/token/', {
            method: 'POST',
            headers:{
                'Content-Type' : 'application/json'
            },      
            body:JSON.stringify({'username': e.target.username.value, 'password' : e.target.password.value })
        })
        let data = await response.json()
        
        if (response.status === 200) {
            setAuthTokens(data)
            setUser(jwt_decode(data.access))
            localStorage.setItem('authTokens', JSON.stringify(data))
            navigate('/')
        }else{
            alert('something went wrong!')
        }

    }

    let logoutUser = () => {
        setAuthTokens(null)
        setUser(null)
        localStorage.removeItem('authTokens')
        navigate('/login')
    }

    let updateToken = async () =>{
        console.log("Update Token updated");
        let response = await fetch('http://127.0.0.1:8000/api/token/refresh/', {
            method: 'POST',
            headers:{
                'Content-Type' : 'application/json'
            },      
            body:JSON.stringify({'refresh': authTokens.refresh})
        })
        let data = await response.json()
        
        if (response.status === 200){
            setAuthTokens(data)
            setUser(jwt_decode(data.access))
            localStorage.setItem('authTokens', JSON.stringify(data))
        }else{
            logoutUser();
        }
    }

    const registerUser = async (formData) => {
      try {
        console.log('Registration request data:', formData);
        const response = await fetch('http://127.0.0.1:8000/api/register/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
    
        const data = await response.json();
    
        if (data && response.ok) {
          // Registration successful
          // Perform any necessary actions, e.g., redirect the user to a success page or show a success message
          console.log('Registration successful!');
          navigate('/'); // You can redirect to a success page
        } else if (data && data.error) {
          // Registration failed due to client-side validation error or server error
          // You can handle the error, e.g., show an error message
          console.log('Registration failed due to error');
          console.log('Error response data:', data.error); // Log the full error response
          setErrors(data.error)    
          // Check if the response contains a detailed error message
        // if (data && data.error) {
        //   setErrors(data)
        // } else {
        //   setErrors(data)
        //   // alert('Registration failed. Something went wrong!');
        // }
        }
      } catch (error) {
        console.error('Error occurred during registration:', error);
        setErrors('Something went wrong!');
      }
    };

    // State management for TODO App
    const fetchTasks = async () => {
      console.log(`Bearer ${authTokens.access}`);
        try {
          const response = await Axios.get('http://127.0.0.1:8000/todo/task-list/' , {
            headers: {
              Authorization: `Bearer ${authTokens.access}`,
                // Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjkwNTU2Mjg3LCJpYXQiOjE2OTA1NTU5ODcsImp0aSI6ImQ0NzFiMzRmNzIwZjRjYzViOTIzNGE3YzVhZWQ3ZTQyIiwidXNlcl9pZCI6MSwidXNlcm5hbWUiOiJ6dWxxYXIifQ.pUPPTNxNanTB0qw0ZDOROQ2CrgDRkh5nT6-5oeWaCc8`,
            }
          });
          setTasks(response.data);
        } catch (error) {
          console.error('Error fetching tasks:', error);
        }
      };

      const createTask = async (title) => {
        try {
          const response = await Axios.post('http://127.0.0.1:8000/todo/task-create/', {
            title: title,
            completed: false,
          },
          {
            headers: {
              Authorization: `Bearer ${authTokens.access}`,
            }
          }
          )
          setTasks([...tasks, response.data]);
        } catch (error) {
          console.error('Error creating task:', error);
        }
      };

      const updateTask = async (id, updatedTask) => {
        try {
          await Axios.post(`http://127.0.0.1:8000/todo/task-update/${id}/`, 
          updatedTask,
          {
            headers: {
              Authorization: `Bearer ${authTokens.access}`,
            }
          });
          const updatedTasks = tasks.map((task) =>
            task.id === id ? { ...task, ...updatedTask } : task
          );
          setTasks(updatedTasks);
        } catch (error) {
          console.error('Error updating task:', error);
        }
      };

      const deleteTask = async (id) => {
        try {
          await Axios.delete(`http://127.0.0.1:8000/todo/task-delete/${id}/`);
          const updatedTasks = tasks.filter((task) => task.id !== id);
          setTasks(updatedTasks);
        } catch (error) {
          console.error('Error deleting task:', error);
        }
      };
    
    let contextData = {
        user : user,
        loginUser : loginUser,
        logoutUser : logoutUser,
        updateToken : updateToken,
        registerUser : registerUser,
        tasks : tasks,
        fetchTasks : fetchTasks,
        createTask : createTask,
        updateTask : updateTask,
        deleteTask : deleteTask,
        errors : errors,
    }

    useEffect(() => {

        if (authTokens) {
            setUser(jwtDecode(authTokens.access))
        }
        setLoading(false);

    }, [authTokens , loading])

    return(
        <AuthContext.Provider value={contextData}>
            {loading ?<div>Loading...</div> : children}
        </AuthContext.Provider>
    )
}