import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './components/Login';
import RegisterPage from './components/Register';
import HomePage from './components/Home';

function App() {
  // Example state for logged-in email (you can replace this with your actual logic)
  const [loggedIn_email, setLoggedInEmail] = useState<string>('user@example.com');

  return (
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<HomePage loggedIn_email={loggedIn_email} />} />
            <Route path="/login" element={<LoginPaged />} />
            <Route path="/register" element={<RegisterPage />} />
          </Routes>
        </div>
      </Router>
  );
}

export default App;
