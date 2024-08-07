'use client';

import { WS_SERVER_URL } from '@/constants/ws';
import { io, Socket } from 'socket.io-client';

interface ISocket {
    io: Socket | null;
}

export const socket: ISocket = {
    io: null,
};

export const connectWebSocket = () => {
    socket.io = io(WS_SERVER_URL);
    socket.io.connect();
};

export const disconnectWebSocket = () => {
    if (socket.io) socket.io.disconnect();
    socket.io = null;
};

export const socketEmit = (event: string, data: any) => {
    if (socket.io) socket.io.emit(event, data);
};
