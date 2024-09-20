import React, { useState, useEffect } from 'react';
import api from '../services/api';

interface Participant {
  id: number;
  name: string;
  email: string;
  presenceStatus: 'CONFIRMED' | 'PENDING' | 'ABSENT';
}

const Participants: React.FC<{ eventId: number }> = ({ eventId }) => {
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchParticipants = async () => {
      setLoading(true);
      try {
        const response = await api.get(`/events/${eventId}/participants`);
        setParticipants(response.data);
      } catch (err) {
        setError('Erro ao carregar participantes');
      } finally {
        setLoading(false);
      }
    };

    fetchParticipants();
  }, [eventId]);

  const addParticipant = async () => {
    if (!name || !email) {
      setError('Nome e e-mail são obrigatórios');
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const response = await api.post(`/events/${eventId}/participants`, { name, email });
      setParticipants((prev) => [...prev, response.data]);
      setName('');
      setEmail('');
    } catch (err) {
      setError('Erro ao adicionar participante');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Participantes</h2>
      {loading ? (
        <p>Carregando...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <ul className="mb-4">
          {participants.map((participant) => (
            <li key={participant.id} className="py-2 border-b">
              {participant.name} ({participant.email}) - Status: {participant.presenceStatus}
            </li>
          ))}
        </ul>
      )}
      <div className="mt-4">
        <h3 className="text-lg font-semibold mb-2">Adicionar Participante</h3>
        <input
          type="text"
          value={name}
          placeholder="Nome"
          onChange={(e) => setName(e.target.value)}
          className="border rounded p-2 mb-2 w-full"
        />
        <input
          type="email"
          value={email}
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          className="border rounded p-2 mb-2 w-full"
        />
        <button
          onClick={addParticipant}
          className="bg-blue-500 text-white rounded py-2 px-4"
          disabled={loading}
        >
          {loading ? 'Adicionando...' : 'Adicionar'}
        </button>
      </div>
    </div>
  );
};

export default Participants;
