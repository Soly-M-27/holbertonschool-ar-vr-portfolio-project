import { useState, useEffect } from 'react';
import { projectAuth } from '../firebase/config';
import { useAuthContext } from './useAuthContext';

export const useLogout = () => { // if we use this hook in a component, 
                                 // then we're going to get all these states.
    const [ isCancelled, setIsCanceled ] = useState(false);
    const [ error, setError ] = useState(null);
    const [ isPending, setIsPending ] = useState(false);
    const { dispatch } = useAuthContext();

    /* create a log out function because we don't automatically 
    want to log the user out when they use this hook inside a component.
    We might want to use this hook in a component and then only log 
    the user out in that component when they click on a button. */
    const logout = async () => { // If we call this function, 
                                 // it's going to try and sign the user 
                                 // in, update the state, etcetera, while
                                 // also firing the cleanuo function right away. 
        setError(null)
        setIsPending(true)

        // sign the user out
        try { // try to sign user out
            await projectAuth.signOut();
            
            // dispatch logout action
            /* Now we don't need to pass in a payload here because we don't 
            need to set the user to be anything other than null.
            If they log out, the user becomes null, right? So the payload 
            we can just skip. */
            dispatch({ type: 'LOGOUT' }) // This is what will log the user out
            
            //update state by checking if isCanceled is true or not
            if (!isCancelled) {
                setIsPending(false);
                setError(null);
            }

        }
        catch(err) { //otherwise, set the error, log it out and set isPending as false
            if (!isCancelled) {
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
        return () => setIsCanceled(true) // Now whenever the component that's 
                                         // using this hook Unmounts if we 
                                         // navigate away, then it fires the cleanup
    }, [])

    return { logout, error, isPending }
}