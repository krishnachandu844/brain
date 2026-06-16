import { Routes, Route } from "react-router-dom";
import Signin from "./pages/signin";
import Signup from "./pages/signup";
import { Landing } from "./pages/Landing";
import Navbar from "./components/shared/Navbar";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import { useAuthStore } from "./store/useAuthStore";
import { useEffect } from "react";
import PublicRoute from "./components/PublicRoute";

function App() {
  const { getUser } = useAuthStore();

  useEffect(() => {
    getUser();
  }, [getUser]);

  return (
    <div className='min-h-dvh'>
      <Navbar />

      <Routes>
        <Route element={<PublicRoute />}>
          <Route path='/' element={<Landing />} />
          <Route path='/signin' element={<Signin />} />
          <Route path='/signup' element={<Signup />} />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route path='/dashboard' element={<Dashboard />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
