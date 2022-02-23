import React from "react"
import Header from "./components/WebsiteHeader"
import Admin from "./pages/admin"
import Home from "./pages/home";
import Patient from "./pages/patient";
import Exam from "./pages/exam";

import AddExam from "./pages/addExam";
import DeleteExam from "./pages/deleteExam";
import UpdateExam from "./pages/updateExam";

import { BrowserRouter as Router, Switch, Route, Routes } from "react-router-dom";

function App() {
    return (
        <Router>


            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="/patient/:id" element={<Patient />} />
                <Route path="/exam/:id" element={<Exam />} />
                <Route path="/admin/add-exam" element={<AddExam />} />
                <Route path="/admin/delete-exam" element={<DeleteExam />} />
                <Route path="/admin/update-exam" element={<UpdateExam />} />
            </Routes>
            


        </Router>
    )
}

export default App