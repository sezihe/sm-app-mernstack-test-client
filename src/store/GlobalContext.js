import { createContext } from 'react';

const initialState = [{
    name: '',
    email: '',
}];

const Context = createContext(initialState);

export default Context;