import { Socket } from 'socket.io-client';

export interface WebsocketSliceState {
    messages: string[];
}

export interface PreSignedURLPayload {
    preSignedURL: string;
    transactionId: string;
    path: string;
    origin: 'application' | 'profile';
    method: 'PUT' | 'DELETE';
}

export interface NotifyEnvelope {
    notification: {
        creatorId: string;
        fileName: string;
        messageType: string;
    };
}
