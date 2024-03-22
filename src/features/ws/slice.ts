// websocketSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { connectWebSocketThunk, loginWebSocketThunk } from './thunks';
import { WebsocketSliceState } from './types';

const initialState: WebsocketSliceState = {
    messages: [],
};

export const websocketSlice = createSlice({
    name: 'websocket',
    initialState,
    reducers: {
        websocketAddMessage: (state, action) => {
            if (!state.messages.includes(action.payload)) state.messages.push(action.payload);
        },
        websocketRemoveMessage: (state, action) => {
            state.messages = state.messages.filter((item) => item !== action.payload);
        },
        websocketClearMessages: (state) => {
            state.messages = [];
        },
    },
});

export const websocketActionsCreators = websocketSlice.actions;
export { connectWebSocketThunk, loginWebSocketThunk };
