import { useState, useEffect } from 'react';
import { projectAuth, projectStorage } from '../firebase/config';
import { useAuthContext } from './useAuthContext';

export const useSignup = () => {
    const [ isCancelled, setIsCanceled ] = useState(false);
    const [error, setError] = useState(null);
    const [isPending, setIsPending] = useState(false);
    const { dispatch } = useAuthContext();

    const signup = async (email, password, displayName, thumbnail) => { //use this instead of promises
        setError(null);
        setIsPending(true)

        try {
            // signup user
            const res = await projectAuth.createUserWithEmailAndPassword(email, password);

            if (!res) {
                throw new Error('Could not complete Sign Up');
            }

            const uploadPath = `thumbnails/${res.user.uid}/${thumbnail.name}`;
            /* ref method basically accepts a path in here, 
            which will be a reference to where we want to
            upload the image. And then all we have to do is 
            use the put method which puts a file into that 
            place and then we pass in whatever file we want to 
            put there. With this we have stored the file object
            inside of the img variable */
            const img = await projectStorage.ref(uploadPath).put(thumbnail);
            const imgUrl = await img.ref.getDownloadURL(); // Get refference of that image in storage

            // add display name and profile picture to user
            await res.user.updateProfile({ displayName, photoURL: imgUrl });

            // dispatch LOGIN action passed in by the AuthContext method
            /* When it dispatches it will fire AuthReducer 
               from AuthContext.js file and update the state 
               with authReducer 0and then in AuthContextProvider */ 
            dispatch({type: 'LOGIN', payload: res.user}) 

            // update state with isCanceled boolean
            if (!isCancelled) {
                setIsPending(false);
                setError(null);
            }
        }
        catch (err) {
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

    return { signup, isPending, error }
}