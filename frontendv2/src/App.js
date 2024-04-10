import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import { HomePage } from './pages/HomePage';
import { MainLayout } from './pages/MainLayout';
function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<MainLayout/>}>
          <Route index element={<HomePage/>}/>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
