import styles from './Navbar.module.css';
import { Link } from 'react-router-dom';
import { useLogout } from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext';

export default function Navbar() {

    const { logout } = useLogout();
    const { user } = useAuthContext();

    return (
        <nav className={styles.navbar}>
            <ul>
                <li className={styles.title}>AR-Rolodex</li>

                {!user && ( // When user is not logged in show:
                    <>
                        <li><Link to="/login">Login</Link></li>
                        <li><Link to="/signup">Signup</Link></li>
                    </>
                )}

                {user && ( // When user is logged in show:
                    <>
                        <li>hello, {user.displayName}</li>
                        <li>
                            <button className="btn" onClick={logout}>Logout</button>
                        </li>
                    </>
                )}

            </ul>
        </nav>
    )
}
