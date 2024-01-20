import { createContext, useReducer } from "react";
import { projectAuth } from "../firebase/config";
import { useEffect } from "react";

export const AuthContext = createContext();

export const authReducer = (state, action) => { // function to update and return the state
    switch (action.type) {
        case 'LOGIN':
            return { ...state, user: action.payload } 
        
        case 'LOGOUT':
            return { ...state, user: null }

        case 'AUTH_IS_READY':
            return { ...state, user: action.payload, authIsReady: true }

        default:
            return state
    }
}


export const AuthContextProvider = ({ children }) => {

    const [state, dispatch] = useReducer(authReducer, {
        user: null, //initial state of the user
        authIsReady: false // This is what tells how now we know whether there's a user logged in or logged out for sure.
    })

    /* Update state change with Firebase
       When function fires checks if user is 
       null or if there are any users at all */
    useEffect(() => {
        const unsub = projectAuth.onAuthStateChanged((user) => { // Fires every time some kind of authentication state change occurs and dispatches AUTH_IS_READY
            dispatch({ type: 'AUTH_IS_READY', payload: user }) 
            unsub()
        })

    }, []) 
    console.log('AuthContext state:', state);


    return (
        <AuthContext.Provider value={{ ...state, dispatch }}>
            { children }
        </AuthContext.Provider>
    )
}