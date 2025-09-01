import logo from './logo.svg';
import './App.css';
import AutoComplete from './Components/AutoComplete';
import ProgressBar from './Components/ProgressBar';
import Pagination from './Components/Pagination';
import { AuthProvider } from "./AuthContext";
import ProtectedRoute from "./ProtectedRoute";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Home from "./Home";
// import AdminDashboard from "./AdminDashboard";
// import Login from "./Login";
function App() {

  // const bars = [5,10,30,50,70,90,98,100];
  return (
    // <div className="App">
    //   { <AutoComplete /> }
    //   { {bars.map((item)=>(
    //     <ProgressBar progress={item} />
    //   ))} }
    //   {<Pagination />}
    // </div>
    <AuthProvider>
      <Router>
        <Routes>
          {/* <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} /> */}

          <Route
            path="/admin"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                {/* <AdminDashboard /> */}
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
