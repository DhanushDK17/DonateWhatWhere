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
import Option from "./pages/login-register/Option";
import ChatTest from "./pages/chat/ChatTest";
import UserProfile from "./pages/user/UserProfile";
import Claims from "./pages/user/Claims";
import AuthGuard from "./guards/AuthGuard";
import { Chats } from "./pages/Chats";
import { ClaimsPage } from "./pages/Claims";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<MainLayout />}>
          <Route index element={<AuthGuard component={<HomePage />}/>} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/landingpage" element={<AuthGuard component={<LandingPage />}/>} />
          <Route path="/chats" element={<AuthGuard component={<Chats />}/>} />
          <Route path="/claims" element={<AuthGuard component={<Claims />}/>} />
          <Route path="/support" element={<ContactForm />} />
          <Route path="/about" element={<About />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/option" element={<Option />} />
          <Route path="/chattest" element={<ChatTest />} />
          <Route path="/userprofile" element={<UserProfile />} />
          <Route path="/claims" element={<Claims />} />
          <Route path="/claimsv2" element={<ClaimsPage />} />

        </Route>
      </Routes>
    </Router>
  );
}

export default App;
