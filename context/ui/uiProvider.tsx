import { FC, useReducer, ReactNode } from 'react';
import { UiContext, UiReducer } from './';

interface Props {
    children: ReactNode
}

export interface UiState {
    isMenuOpen: boolean;
}


const Ui_INITIAL_STATE: UiState = {
    isMenuOpen: false,
}


export const UiProvider:FC<Props> = ({ children }) => {

    const [state, dispatch] = useReducer( UiReducer , Ui_INITIAL_STATE );

    const toggleSideMenu = () => {
        dispatch({type: '[Ui] - ToggleMenu'})
    }

    return (
        <UiContext.Provider value={{
            ...state,

            toggleSideMenu,
        }}>
            { children }
        </UiContext.Provider>
    )
};