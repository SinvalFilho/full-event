import React, { useEffect, useState } from 'react';
import api from '../services/api';

const AttendanceControl: React.FC<{ eventId: number }> = ({ eventId }) => {
  const [participants, setParticipants] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchParticipants = async () => {
      try {
        const response = await api.get(`/events/${eventId}/participants`);
        setParticipants(response.data);
      } catch (error) {
        console.error('Erro ao buscar participantes', error);
      } finally {
        setLoading(false);
      }
    };

    fetchParticipants();
  }, [eventId]);

  const togglePresence = async (participantId: number) => {
    try {
      await api.put(`/events/${eventId}/participants/${participantId}/presence`);
      setParticipants((prevParticipants) =>
        prevParticipants.map((participant) =>
          participant.id === participantId
            ? { ...participant, isPresent: !participant.isPresent }
            : participant
        )
      );
    } catch (error) {
      console.error('Erro ao atualizar presença', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="p-6 border-b border-gray-200 bg-gray-50">
          <h1 className="text-3xl font-semibold text-gray-800">Controle de Presença</h1>
        </div>
        <div className="p-6">
          {loading ? (
            <p className="text-center text-gray-500">Carregando participantes...</p>
          ) : (
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100 border-b">
                  <th className="py-3 px-4 text-left text-gray-600">Nome</th>
                  <th className="py-3 px-4 text-left text-gray-600">E-mail</th>
                  <th className="py-3 px-4 text-left text-gray-600">Presença</th>
                </tr>
              </thead>
              <tbody>
                {participants.map((participant) => (
                  <tr key={participant.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4 text-gray-700">{participant.name}</td>
                    <td className="py-3 px-4 text-gray-700">{participant.email}</td>
                    <td className="py-3 px-4 text-center">
                      <button
                        onClick={() => togglePresence(participant.id)}
                        className={`px-4 py-2 rounded-lg font-semibold ${
                          participant.isPresent
                            ? 'bg-green-500 text-white hover:bg-green-600'
                            : 'bg-red-500 text-white hover:bg-red-600'
                        }`}
                      >
                        {participant.isPresent ? 'Presente' : 'Ausente'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default AttendanceControl;
