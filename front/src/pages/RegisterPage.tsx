import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';

const RegisterPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth(); // Usa o contexto de autenticação

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/events'); // Redireciona para a página de eventos se já estiver autenticado
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password) {
      setMessage('Por favor, preencha todos os campos.');
      return;
    }

    setLoading(true);
    try {
      await api.post('/register', { name, email, password });
      setMessage('Registro realizado com sucesso! Redirecionando para login...');
      setTimeout(() => {
        navigate('/login'); // Redirecionar após registro
      }, 2000); // Aguarda 2 segundos antes de redirecionar
    } catch (error: any) {
      setMessage('Erro ao registrar. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg">
        <h1 className="text-3xl font-semibold mb-6 text-center text-gray-800">Registrar</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Nome</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Nome completo"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">E-mail</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="E-mail"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Senha</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Senha"
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-lg text-white ${loading ? 'bg-green-400' : 'bg-green-600'} hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500`}
          >
            {loading ? 'Carregando...' : 'Registrar'}
          </button>
          {message && <p className={`mt-4 text-center ${message.includes('Erro') ? 'text-red-500' : 'text-green-500'}`}>{message}</p>}
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
