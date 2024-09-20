import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const isLoggedIn = Boolean(localStorage.getItem('token'));

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-blue-600 text-white shadow-md z-50">
      <div className="container mx-auto flex justify-between items-center p-4">
        <Link to="/" className="text-2xl font-bold" aria-label="Página inicial">EventoApp</Link>
        <div className="hidden md:flex space-x-6">
          <Link to="/" className="hover:bg-blue-700 py-2 px-4 rounded transition" aria-label="Ir para a página inicial">Home</Link>
          <Link to="/events" className="hover:bg-blue-700 py-2 px-4 rounded transition" aria-label="Ver eventos">Eventos</Link>
          {!isLoggedIn ? (
            <>
              <Link to="/login" className="hover:bg-blue-700 py-2 px-4 rounded transition" aria-label="Ir para a página de login">Login</Link>
              <Link to="/register" className="bg-green-500 hover:bg-green-600 py-2 px-4 rounded transition" aria-label="Ir para a página de registro">Registrar</Link>
            </>
          ) : (
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 py-2 px-4 rounded transition"
            >
              Logout
            </button>
          )}
        </div>
        <div className="md:hidden flex items-center">
          <button
            type="button"
            className="text-white focus:outline-none"
            aria-label="Abrir menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
        </div>
      </div>
      {/* Mobile menu */}
      <div className="md:hidden mt-4 bg-blue-600">
        <div className="space-y-2">
          <Link to="/" className="block py-2 px-4 text-white hover:bg-blue-700 rounded transition" aria-label="Ir para a página inicial">Home</Link>
          <Link to="/events" className="block py-2 px-4 text-white hover:bg-blue-700 rounded transition" aria-label="Ver eventos">Eventos</Link>
          {!isLoggedIn ? (
            <>
              <Link to="/login" className="block py-2 px-4 text-white hover:bg-blue-700 rounded transition" aria-label="Ir para a página de login">Login</Link>
              <Link to="/register" className="block py-2 px-4 bg-green-500 hover:bg-green-600 rounded transition" aria-label="Ir para a página de registro">Registrar</Link>
            </>
          ) : (
            <button
              onClick={handleLogout}
              className="block py-2 px-4 bg-red-500 hover:bg-red-600 rounded transition"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
