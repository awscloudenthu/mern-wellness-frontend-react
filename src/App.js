import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes, Navigate, useLocation } from "react-router-dom";
import { UserProvider } from "./Components/UserContext";
import Home from "./Components/Home";
import About from "./Components/About";
import Stack from "./Components/Stack";
import Contact from "./Components/Contact";
import WellnessTracker from "./Components/WellnessTracker";
import Layout from "./Components/Layout";
import SignIn from "./Components/SignIn";
import SignUp from "./Components/SignUp";
import SignOut from "./Components/SignOut";
import { getCurrentUser } from './Components/AuthService';

const PrivateRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // To track session loading
  const location = useLocation();

  useEffect(() => {
    const currentUser = getCurrentUser();
    if (currentUser) {
      currentUser.getSession((err, session) => {
        if (!err) {
          const idToken = session.getIdToken();
          const currentTime = Math.floor(Date.now() / 1000);
          const isSessionValid = currentTime < idToken.payload.exp;

          setIsAuthenticated(isSessionValid);
          console.log("hey, session is isSessionValid ", isSessionValid);
        }
        setIsLoading(false); // Set loading to false after session check
      });
    } else {
      setIsLoading(false); // Set loading to false if no currentUser
    }
  }, []);


  if (isLoading) {
    return <div>Loading...</div>; // Show loading state while checking session
  }

  return isAuthenticated ? children : <Navigate to="/signin" state={{ from: location }} replace />;
};

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/about" element={<About />} />
            {/* Wrap WellnessTracker with PrivateRoute */}
            <Route path="/WellnessTracker" element={
              <PrivateRoute>
                <WellnessTracker />
              </PrivateRoute>
            } />
            <Route path="/stack" element={<Stack />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/signout" element={<SignOut />} /> {/* Sign-out route */}
          </Route>
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;