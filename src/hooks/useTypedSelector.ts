import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { GlobalStateType } from '../@types/GlobalStateType';

export const useTypedSelector: TypedUseSelectorHook<GlobalStateType> = useSelector;
