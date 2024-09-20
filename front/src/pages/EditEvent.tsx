import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';

const EditEvent: React.FC = () => {
  const { eventId } = useParams<{ eventId: string }>();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    console.log('eventId:', eventId);
    if (eventId) {
      const fetchEvent = async () => {
        setLoading(true);
        try {
          const response = await api.get(`/events/${eventId}`);
          const event = response.data;
          
          const formattedDate = new Date(event.date).toISOString().slice(0, 16);

          setTitle(event.title);
          setDescription(event.description);
          setDate(formattedDate);
          setLocation(event.location);
        } catch (error) {
          console.error('Erro ao buscar evento', error);
          setMessage('Erro ao buscar evento');
        } finally {
          setLoading(false);
        }
      };

      fetchEvent();
    } else {
      console.error('ID do evento não fornecido.');
      setMessage('ID do evento não fornecido.');
    }
  }, [eventId]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !description || !date || !location) {
      setMessage('Por favor, preencha todos os campos');
      return;
    }

    setLoading(true);

    try {
      const formattedDate = new Date(date).toISOString();

      await api.put(`/events/${eventId}`, {
        title,
        description,
        date: formattedDate,
        location,
      });
      alert('Evento atualizado com sucesso!');
      navigate('/events');
    } catch (error) {
      console.error('Erro ao atualizar evento', error);
      setMessage('Houve um problema ao atualizar o evento');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-gray-100 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Editar Evento</h1>
      {loading && <p className="text-gray-500">Carregando...</p>}
      {message && <p className={`text-center ${message.includes('Erro') ? 'text-red-500' : 'text-green-500'}`}>{message}</p>}
      <form onSubmit={handleUpdate} className="space-y-4">
        <div>
          <label className="block mb-1">Título do Evento</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border rounded p-2"
            placeholder="Título"
          />
        </div>
        <div>
          <label className="block mb-1">Descrição</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border rounded p-2"
            placeholder="Descrição"
          />
        </div>
        <div>
          <label className="block mb-1">Data</label>
          <input
            type="datetime-local"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full border rounded p-2"
          />
        </div>
        <div>
          <label className="block mb-1">Local</label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full border rounded p-2"
            placeholder="Local do evento"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          disabled={loading}
        >
          {loading ? 'Atualizando...' : 'Atualizar Evento'}
        </button>
      </form>
    </div>
  );
};

export default EditEvent;
