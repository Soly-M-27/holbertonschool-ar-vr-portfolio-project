import styles from './Login.module.css';
import { useState } from 'react';
import { useLogin } from '../../hooks/useLogin';


export default function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login, error, isPending } = useLogin();

    const handleSubmit = (e) => {
        console.log("Begin handleSubmit");
        e.preventDefault();
        const log = login(email, password);
        try {
            if(log) {
                console.log("After var check: ", email, password);
                console.log("Success LOGIN. Firebase response???");
            }
        }
        catch(err) {
            console.log("Caught err")
            console.log(err);
            console.log(err.message);
            throw new Error('Could not complete LOGIN');
        }
    }

    return (
        <form onSubmit={handleSubmit} className={styles['login-form']}>
            <h2>Login</h2>
            <label>
                <span>email:</span>
                <input type="email" onChange={(e) => setEmail(e.target.value)} value={email}/>
            </label>

            <label>
                <span>password:</span>
                <input type="password" onChange={(e) => setPassword(e.target.value)} value={password}/>
            </label>
            {!isPending && <button className='btn'>Login</button>}
            {isPending && <button className='btn' disabled>loading</button>}
            {error && <p>{error}</p>}
        </form>
    )
}