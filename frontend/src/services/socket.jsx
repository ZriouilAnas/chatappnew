import { io } from 'socket.io-client';

let socket;

export const initSocket = (token) => {
  socket = io('http://localhost:5000', {
    auth: { token }
  });

  return socket;
};

export const getSocket = () => {
  if (!socket) {
    throw new Error('Socket non initialisé. Appeler initSocket d\'abord.');
  }
  return socket;
};

export const disconnectSocket = () => {
  if (socket) socket.disconnect();
};