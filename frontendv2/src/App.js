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
import UserProfile from "./pages/user/UserProfile";
import Claims from "./pages/user/Claims";
import AuthGuard from "./guards/AuthGuard";
import Chats from "./pages/Chats";
import { ClaimsPage } from "./pages/Claims";
import ChatList from "./pages/chat/ChatList";
import ChatComponent from "./pages/chat/ChatComponent";
import CreateEvent from "./pages/event/CreateEvent";
import ListEvent from "./pages/event/ListEvent";
import { Events } from "./pages/Events";
import { Donations } from "./components/Donations";
import { MyDonations } from "./pages/MyDonations";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<MainLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/support" element={<ContactForm />} />
          <Route path="/about" element={<About />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/option" element={<Option />} />
          <Route path="/landingpage" element={<LandingPage/>} />
          <Route index element={<AuthGuard component={<HomePage />} />} />
          <Route path="/chats" element={<AuthGuard component={<Chats />} />} />
          <Route path="/claims" element={<AuthGuard component={<Claims />} />}/>
          <Route path="/donations" element={<AuthGuard component={<MyDonations />} />} />
          <Route path="/userprofile" element={<AuthGuard component={<UserProfile />} />} />
          <Route path="/events" element={<AuthGuard component={<Events />} />} />
          <Route path="/chat/:conversation_id" element={<AuthGuard component={<ChatComponent />} />} />
          <Route path="/createevent" element={<AuthGuard component={<CreateEvent />} />} />
          <Route path="/listevent" element={<AuthGuard component={<ListEvent />} />} />
          <Route path="/claimsv2" element={<AuthGuard component={<ClaimsPage />} />} />
          <Route path="/chatlist" element={<AuthGuard component={<ChatList />} />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
