import { io, Socket } from 'socket.io-client';
import { WS_SERVER_URL } from '@/constants/ws';

class WebSocketService {
    public socket: Socket | null = null;

    connect(): void {
        this.socket = io(WS_SERVER_URL);
    }

    disconnect(): void {
        if (this.socket) {
            this.socket.disconnect();
        }
    }

    on(event: string, callback: (data: any) => void): void {
        if (this.socket) {
            this.socket.on(event, callback);
        }
    }

    emit(event: string, data: any): void {
        if (this.socket) {
            this.socket.emit(event, data);
        }
    }
}

const webSocketService = new WebSocketService();
export default webSocketService;
