import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

interface Event {
  id: number;
  title: string;
  description: string;
  date: string;
  location: string;
  status: string;
  imageUrl: string;
}

const EventList: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await api.get('/events');
        setEvents(response.data);
      } catch (error) {
        console.error('Erro ao buscar eventos', error);
        setError('Erro ao buscar eventos. Tente novamente.');
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const handleDelete = async (eventId: number) => {
    if (window.confirm('Tem certeza que deseja excluir este evento?')) {
      try {
        await api.delete(`/events/${eventId}`);
        setEvents(events.filter((event) => event.id !== eventId));
      } catch (error) {
        console.error('Erro ao excluir evento', error);
        setError('Erro ao excluir evento. Tente novamente.');
      }
    }
  };

  const handleEdit = (eventId: number) => {
    navigate(`/edit-event/${eventId}`);
  };

  if (loading) return <p className="text-center">Carregando eventos...</p>;

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4">Meus Eventos</h1>
      {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
      {events.length === 0 ? (
        <p className="text-center">Nenhum evento encontrado.</p>
      ) : (
        <ul className="space-y-4">
          {events.map((event) => (
            <li key={event.id} className="bg-white shadow-md rounded p-4 flex items-center space-x-4">
              <img
                src={event.imageUrl}
                alt={event.title}
                className="w-24 h-24 object-cover rounded"
              />
              <div className="flex-1">
                <h2 className="text-xl font-semibold">{event.title}</h2>
                <p className="text-sm text-gray-600">{event.description}</p>
                <p className="text-sm text-gray-600">Data: {new Date(event.date).toLocaleString()}</p>
                <p className="text-sm text-gray-600">Local: {event.location}</p>
                <p className="text-sm text-gray-600">Status: {event.status}</p>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEdit(event.id)}
                  className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(event.id)}
                  className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
                >
                  Excluir
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default EventList;
