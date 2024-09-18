import React from 'react';
import { Link } from 'react-router-dom';
import { FaCalendarAlt, FaUserPlus, FaPlus } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';

const Home: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <main className="flex-grow container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Bem-vindo ao EventoApp</h1>
        <p className="mb-6 text-gray-600">
          Organize e gerencie seus eventos com facilidade. Use as funcionalidades abaixo para criar, editar e gerenciar eventos e participantes.
        </p>
        <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
          <Link
            to="/events"
            className="bg-blue-500 text-white py-3 px-6 rounded-lg flex items-center justify-center hover:bg-blue-600 transition duration-300"
          >
            <FaCalendarAlt className="mr-2 text-lg" />
            Ver Eventos
          </Link>
          {!isAuthenticated ? (
            <Link
              to="/register"
              className="bg-green-500 text-white py-3 px-6 rounded-lg flex items-center justify-center hover:bg-green-600 transition duration-300"
            >
              <FaUserPlus className="mr-2 text-lg" />
              Registrar
            </Link>
          ) : (
            <Link
              to="/create-event"
              className="bg-purple-500 text-white py-3 px-6 rounded-lg flex items-center justify-center hover:bg-purple-600 transition duration-300"
            >
              <FaPlus className="mr-2 text-lg" />
              Criar Evento
            </Link>
          )}
        </div>
      </main>
    </div>
  );
};

export default Home;
