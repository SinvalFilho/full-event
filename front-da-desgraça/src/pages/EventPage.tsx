import React from 'react';
import CreateEventForm from '../components/CreateEventForm';

const EventPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="container mx-auto max-w-4xl bg-white p-8 shadow-md rounded-lg">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Criar Evento</h1>
        <CreateEventForm />
      </div>
    </div>
  );
};

export default EventPage;
