import React from "react"
import Header from "./components/WebsiteHeader"
import Admin from "./pages/admin"
import Home from "./pages/home";
import PatientInfo from "./pages/patient";
import ExamInfo from "./pages/exam";
import ExamInfoEdit from "./pages/examEdit";

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
                <Route path="/patient/:id" element={<PatientInfo />} />
                <Route path="/exam/:id" element={<ExamInfo />} />
                <Route path="/exam/:id/edit" element={<ExamInfoEdit />} />   {/*Added by Diana*/}
                <Route path="/admin/add-exam" element={<AddExam />} />
                <Route path="/admin/delete-exam" element={<DeleteExam />} />
                <Route path="/admin/update-exam" element={<UpdateExam />} />
            </Routes>
            


        </Router>
    )
}

export default App