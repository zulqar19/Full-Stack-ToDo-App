import { BrowserRouter as Router, Route, Routes, } from "react-router-dom";
import  { AuthProvider } from "./context/AuthContext";
import "./App.css";
import Navbar from "./component/Navbar";
import Register from "./pages/Register";
import {PrivateRoute, PublicRoute} from "./utils/PrivateRoute";


function App() {
  return (
    <>
     <Router>
      <AuthProvider>
        <Navbar />
        <Routes>
          {/* HomePage is only accessible when the user is logged in */}
          <Route path="/" element={<PrivateRoute />} />
          {/* LoginPage is accessible when the user is not logged in */}
          <Route path="/login" element={<PublicRoute />} />
          <Route path="/register" Component={Register} />
        </Routes>
      </AuthProvider>
    </Router>
    </>
  );
}


export default App;
