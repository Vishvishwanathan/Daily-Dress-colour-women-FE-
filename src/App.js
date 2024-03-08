import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Home from "./components/Home";
import Header from "./components/Dashboard";
import ProtectedRoute from "./common/ProtectedRoute";
import Resetpassword from "./components/Resetpassword";
import Userdetail from "./components/Userdetail";
import Deleteuser from "./components/Deleteuser";
import Edituser from "./components/Edituser";
import Aboutapp from "./components/Aboutapp";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/dashboard"
            element={
              <>
                <ProtectedRoute>
                  <Header />
                </ProtectedRoute>
              </>
            }
          />
          <Route
            path="/userdetail"
            element={
              <>
                <ProtectedRoute>
                  <Userdetail />
                </ProtectedRoute>
              </>
            }
          />
          <Route path="/deleteaccount" element={<Deleteuser />} />
          <Route path="/changepassword" element={<Edituser />} />
          <Route path="/resetPassword" element={<Resetpassword />} />
          <Route path="/aboutapp" element={<Aboutapp />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;