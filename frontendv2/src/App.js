import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { MainLayout } from "./pages/MainLayout";
import Login from "./pages/login-register/Login";
import Register from "./pages/login-register/Register";
import LandingPage from "./pages/LandingPage";
import ContactForm from "./pages/help/ContactForm";
import About from "./pages/help/About";
import FAQ from "./pages/help/FAQ";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/landingpage" element={<LandingPage />} />
          <Route path="/support" element={<ContactForm />} />
          <Route path="/about" element={<About />} />
          <Route path="/faq" element={<FAQ />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
