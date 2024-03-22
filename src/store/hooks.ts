import { TypedUseSelectorHook, useDispatch as useAppDispatch, useSelector as useAppSelector } from 'react-redux';
import type { AppState, ReduxDispatch } from './index';

export const useDispatch = () => useAppDispatch<ReduxDispatch>();
export const useSelector: TypedUseSelectorHook<AppState> = useAppSelector;
