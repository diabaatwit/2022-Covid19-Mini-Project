import React from "react"
import Header from "./components/WebsiteHeader"
import Admin from "./pages/admin"
import Home from "./pages/home";
import PatientInfo from "./pages/patient";
import ExamInfo from "./pages/exam";
import ExamInfoEdit from "./pages/examEdit";

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
            </Routes>
            


        </Router>
    )
}

export default App