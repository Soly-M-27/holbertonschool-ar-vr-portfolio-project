
import { useState, useEffect } from 'react';
import { projectAuth } from '../firebase/config';
import { useAuthContext } from './useAuthContext';

export const useLogin = () => { // if we use this hook in a component, 
                                 // then we're going to get all these states.
    const [ isCancelled, setIsCanceled ] = useState(false);
    const [ error, setError ] = useState(null);
    const [ isPending, setIsPending ] = useState(false);
    const { dispatch } = useAuthContext();

    const login = async (email, password) => { // If we call this function, 
                                 // it's going to try and login the user, 
                                 // update the state, etcetera, while also
                                 // firing the cleanup function right away. 
        setError(null)
        setIsPending(true)

        // sign the user out
        try { // try to sign user in and get user via const var res
            console.log(email, password);
            const res = await projectAuth.signInWithEmailAndPassword(email, password);

            // dispatch login action
            dispatch({ type: 'LOGIN', payload: res.user }); // This is what will log the user 
                                                            // in at AuthContext.js file
            
            //update state by checking if isCanceled is true or not
            if (!isCancelled) {
                setIsPending(false);
                setError(null);
            }
        }
        catch(err) { //otherwise, set the error, log it out and set isPending as false
            if (!isCancelled) {
                console.log('Off err msg: ', err);
                console.log(err.message);
                setError(err.message);
                setIsPending(false);
            }
        }
    }

    // This is our clean up function 
    /* This will fire on every, or rather, the initial 
    component's render (Important: []  <-- This is what helps it 
                                           to render initially, once).  */
    useEffect(() => {
        return () => setIsCanceled(true); // Now whenever the component that's 
                                         // using this hook Unmounts if we 
                                         // navigate away, then it fires the cleanup
    }, [])

    return { login, error, isPending }
}