import React, { useState, useEffect } from 'react';
import api from '../services/api';

const EventForm: React.FC<{ eventId?: number }> = ({ eventId }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');

  useEffect(() => {
    if (eventId) {
      const fetchEvent = async () => {
        try {
          const response = await api.get(`/events/${eventId}`);
          const event = response.data;
          setTitle(event.title);
          setDescription(event.description);
          setDate(event.date);
          setLocation(event.location);
        } catch (error) {
          console.error('Erro ao buscar evento', error);
        }
      };

      fetchEvent();
    }
  }, [eventId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (eventId) {
        await api.put(`/events/${eventId}`, { title, description, date, location });
      } else {
        await api.post('/events', { title, description, date, location });
      }
      // Clear form after submission
      setTitle('');
      setDescription('');
      setDate('');
      setLocation('');
    } catch (error) {
      console.error('Erro ao salvar evento', error);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4">{eventId ? 'Editar Evento' : 'Criar Novo Evento'}</h1>
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded p-6 space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Título</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border rounded p-2"
            placeholder="Título do Evento"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Descrição</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border rounded p-2"
            placeholder="Descrição do Evento"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Data</label>
          <input
            type="datetime-local"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full border rounded p-2"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Local</label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full border rounded p-2"
            placeholder="Local do Evento"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          {eventId ? 'Atualizar Evento' : 'Criar Evento'}
        </button>
      </form>
    </div>
  );
};

export default EventForm;
