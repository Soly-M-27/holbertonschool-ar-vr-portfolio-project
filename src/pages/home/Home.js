import styles from './Home.module.css';
import { useAuthContext } from '../../hooks/useAuthContext';

export default function Home() {
    console.log("I'm Home. In Profile.")
    const { authIsReady } = useAuthContext();
    return (
        <>
            {authIsReady && (
                <div>
                    Home
                </div>
            )}
        </>
    )
}