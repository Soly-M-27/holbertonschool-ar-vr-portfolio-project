/*import { projectAuth, projectStorage, db } from '../firebase/config';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { useState } from 'react';
import { updateProfile } from 'firebase/auth';
import { useAuthContext } from './useAuthContext';
import { collection, setDoc, doc} from "firebase/firestore";

export const useProfileInfo = () => {
    const [error, setError] = useState(null);
    const { dispatch, user } = useAuthContext();

    const ProfileInfo = async (name, socials, workEmail, location, profession, businessName, phone_num) => { //use this instead of promises
        console.log("Profile Info function begins in useProfileInfo.js");
        setError(null);

        try {

            try {
                console.log("trying to create new collection for Firestore Database titled 'users'");
                await setDoc(doc(db, "users", res.user.uid), {
                    online: true,
                    displayName,
                    photoURL: imgUrl
                });
                console.log("Document written with ID: ", res.user.uid);

            } catch (e) {
                console.log("CAUGHT ERROR IN FIRESTORE ADD DOC");
                console.log("Error adding document: ", e);
                setError("Error adding document: ", e.message);
            }
        } catch (err) {
            console.log("CAUGHT ERROR IN SIGNUP");
            console.log(err);
            console.log(err.message);
            setError(err.message);
        }

    }

    return { error, signup }
}*/