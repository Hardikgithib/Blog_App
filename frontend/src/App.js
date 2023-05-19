import logo from "./logo.svg";
import "./App.css";
import Login from "./components/Login";
import Register from "./components/Register";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
// import Dashboard from "./components/Dashboard";
import Addpatient from "./components/Addpatient";
import Header from "./components/Header";



import { isLoggedIn } from "./services/login";

function App() {
  function ProtectRoute({ children }) {
    const auth = isLoggedIn();
    return auth ? children : <Navigate to="/" />;
  }
  return (
    <div className="App container-fluid ">
      <Router>
        <Routes>
          <Route
            path="/Addpatient"
            element={
              <ProtectRoute>
                <Addpatient />
              </ProtectRoute>
            }
          />

         
          <Route path="/" element={
       
           <Login /> 
          } />
          <Route path="/register" element={
            
          <Register />
        } />
     
         
        </Routes>
      </Router>
    
    </div>
  );
}

export default App;
