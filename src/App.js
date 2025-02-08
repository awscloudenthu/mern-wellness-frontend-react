import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes } from "react-router-dom"; 
import Home from "./Components/Home";
import About from "./Components/About";
import Contact from "./Components/Contact";
import WellnessTracker from "./Components/WellnessTracker";
import Layout from "./Components/Layout";
//import Signin from "./Components/Signin";

function App() {
  return (
    <BrowserRouter>
        <Layout />
        <Routes>
            <Route path="/" element={<Layout />} />
            <Route index element={<Home />} />
            <Route path="/" element={<Home></Home>}>Home</Route>
            <Route path="/WellnessTracker" element={<WellnessTracker/>}>Wellness</Route>
            <Route path="/about" element={<About/>}>About</Route>
            <Route path="/contact" element={<Contact/>}> </Route>
            {/* <Route path="/signin" element={<Signin/>}>Signin</Route> */}
        </Routes>
    </BrowserRouter>
  );
};

export default App;