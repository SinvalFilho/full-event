import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';

const RegisterForm: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    navigate('/');
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    if (!name || !email || !password) {
      setMessage('Please fill in all fields.');
      setLoading(false);
      return;
    }

    try {
      const response = await api.post('/register', { name, email, password });
      // Sucesso no registro
      if (response.status === 201) {
        setMessage('User registered successfully!');
        setName('');
        setEmail('');
        setPassword('');
        navigate('/login');
      }
    } catch (error: any) {
      const errorMessage = error.response?.data?.error || 'Error registering user. Please try again.';
      setMessage(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleRegister} className="flex flex-col space-y-4 max-w-md mx-auto p-4 bg-white shadow-lg rounded-lg">
      <div>
        <label className="block text-gray-700 text-sm font-medium mb-1">Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="border rounded w-full py-2 px-3 mt-1"
        />
      </div>
      <div>
        <label className="block text-gray-700 text-sm font-medium mb-1">Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="border rounded w-full py-2 px-3 mt-1"
        />
      </div>
      <div>
        <label className="block text-gray-700 text-sm font-medium mb-1">Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="border rounded w-full py-2 px-3 mt-1"
        />
      </div>
      <button
        type="submit"
        className={`bg-blue-500 text-white rounded py-2 px-4 mt-4 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
        disabled={loading}
      >
        {loading ? 'Registering...' : 'Register'}
      </button>
      {message && <p className={`mt-4 ${message.includes('Error') ? 'text-red-500' : 'text-green-500'}`}>{message}</p>}
    </form>
  );
};

export default RegisterForm;
