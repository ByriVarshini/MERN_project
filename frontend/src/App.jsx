import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Transactions from "./pages/Transactions";
import AddTransaction from "./pages/AddTransaction";
import EditTransaction from "./pages/EditTransaction";
import Summary from "./pages/Summary";

function App() {
  return (
    <Router>
      <div>
        {/* Navbar */}
        <nav className="navbar">
          <div className="logo">💰 FinTrack</div>
          <div className="links">
            <Link to="/">Home</Link>
            <Link to="/transactions">Transactions</Link>
            <Link to="/add">Add</Link>
            <Link to="/summary">Summary</Link>
          </div>
        </nav>

        <div className="container">
          <Routes>
            <Route path="/" element={<h2>Welcome to FinTrack</h2>} />
            <Route path="/transactions" element={<Transactions />} />
            <Route path="/add" element={<AddTransaction />} />
            <Route path="/edit/:id" element={<EditTransaction />} />
            <Route path="/summary" element={<Summary />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
