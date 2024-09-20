import React, { useState } from 'react';
import api from '../services/api';

interface InviteParticipantsProps {
  eventId: number;
}

const InviteParticipants: React.FC<InviteParticipantsProps> = ({ eventId }) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');

  const handleInvite = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !name) {
      alert('Por favor, preencha todos os campos');
      return;
    }

    try {
      await api.post(`/events/${eventId}/invite`, { email, name });
      setMessage('Convite enviado com sucesso!');
      setEmail(''); // Limpar campo de e-mail
      setName('');  // Limpar campo de nome
    } catch (error) {
      console.error('Erro ao enviar convite', error);
      setMessage('Erro ao enviar convite');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg">
        <h1 className="text-3xl font-semibold mb-6 text-center text-gray-800">Enviar Convites</h1>
        <form onSubmit={handleInvite} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Nome do Participante</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Nome"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">E-mail do Participante</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="E-mail"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Enviar Convite
          </button>
          {message && <p className="mt-4 text-green-500 text-center">{message}</p>}
        </form>
      </div>
    </div>
  );
};

export default InviteParticipants;
