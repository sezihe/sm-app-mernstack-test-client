import React, { useReducer } from 'react';
import GlobalContext from './GlobalContext';
import AppReducer from './AppReducer';

import axios from 'axios';

const backEndAPI = "http://localhost:3005/auth/signup";

const initialState = {};

const GlobalProvider = props => {
    const [state, dispatch] = useReducer(AppReducer, initialState);

    // Methods
    const signup = data => {
        console.log("data: ", data);
        // use axios to perform signup!
        axios.post(backEndAPI, data, {
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(res => {
            if(res.data.messageId === "REG_SUC") {
                dispatch({
                    type: 'SIGN_UP',
                    payload: res.data.userr,
                });
            }
            console.log("Success");
            // return res.data;
        }).catch(error => {
            console.log(error.response);
            dispatch({
                type: 'SIGN_UP_ERROR',
                payload: error.response.data,
            });
            console.log("Error");
        });
    }
    

    return (
        <GlobalContext.Provider value={{state, signup}}>
            { props.children }
        </GlobalContext.Provider>
    );
}

export default GlobalProvider;