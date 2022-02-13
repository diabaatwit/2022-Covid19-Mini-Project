import React from "react"
import Header from "./components/WebsiteHeader"
import Admin from "./pages/admin"
import Home from "./pages/home";
import { BrowserRouter as Router, Switch, Route, Routes } from "react-router-dom";

function App() {
    return (
        <Router>

            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/admin" element={<Admin />} />
            </Routes>
            


        </Router>
    )
}

export default App