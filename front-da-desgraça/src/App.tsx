import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import CreateEvent from './pages/CreateEvent';
import EventList from './pages/EventList';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import PublicRoute from './components/PublicRoute';
import { AuthProvider } from './context/AuthContext';
import EditEvent from './pages/EditEvent';
import NotFound from './pages/NotFound';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <NavBar />
          <main className="flex-grow pt-16"> {/* Ajuste o padding-top para dar espaço à NavBar */}
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/register" element={<PublicRoute element={<RegisterPage />} restricted />} />
              <Route path="/login" element={<PublicRoute element={<LoginPage />} restricted />} />
              <Route path="/create-event" element={<ProtectedRoute><CreateEvent /></ProtectedRoute>} />
              <Route path="/edit-event/:eventId" element={<ProtectedRoute><EditEvent /></ProtectedRoute>} />
              <Route path="/events" element={<EventList />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
