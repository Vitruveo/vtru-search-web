import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppState, ReduxDispatch } from './index';

export const createAppAsyncThunk = createAsyncThunk.withTypes<{
    state: AppState;
    dispatch: ReduxDispatch;
    rejectValue: string;
}>();
