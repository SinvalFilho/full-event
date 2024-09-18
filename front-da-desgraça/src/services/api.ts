import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3333',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Adiciona o token de autenticação a cada requisição
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Trata erros globalmente
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      // O servidor respondeu com um status diferente de 2xx
      console.error('Erro na resposta:', error.response.data);
      if (error.response.status === 401) {
        // Redirecionar para a página de login ou tratar erro de autenticação
      }
    } else if (error.request) {
      // A requisição foi feita, mas sem resposta
      console.error('Erro na requisição:', error.request);
    } else {
      // Alguma coisa deu errado ao configurar a requisição
      console.error('Erro:', error.message);
    }
    return Promise.reject(error);
  }
);

export default api;
