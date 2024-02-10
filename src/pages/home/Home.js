import styles from './Home.module.css';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useState } from 'react';
import { Link } from 'react-router-dom'; 
import { Row, Col, Button, Result } from 'antd';
import { SmileOutlined } from '@ant-design/icons';

export default function Home() {
    console.log("I'm Home. In Profile.")

    const [Name, setName] = useState('');
    const [Socials, setSocials] = useState('');
    const [WorkEmail, setWorkEmail] = useState('');
    const [Location, setLocation] = useState('');
    const [NameProfession, setNameProfession] = useState('');
    const [NameBusiness, setNameBusiness] = useState('');
    const [PhoneNum, setPhoneNum] = useState('');
    const [refreshed, setRefreshed] = useState(false);

    const { authIsReady, user } = useAuthContext();

    const handleRefresh = () => {
        setRefreshed(true);
        window.location.reload();
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Handle Profile Info");
        //signup(email, password, displayName, thumbnail);
        console.log("New Info!");
    }

    console.log("User pic: ", user.photoURL);
    console.log("User displayName: ", user.displayName);

    if (!authIsReady) {
        return <div>Loading...</div>;
    }

    if (!user.photoURL) {
        return (
            <Row gutter={0} justify="center" align="middle" className={styles['fill-form']}>
                <Col span={24} xs={24} sm={24} md={24}>
                    <Result
                        icon={<SmileOutlined />}
                        title="Your AR-Rolodex Profile has been submitted. Please check your e-mail for official confirmation."
                        extra={<Button type="primary" onClick={handleRefresh}>Go to Profile</Button>}
                    />
                </Col>
            </Row>
        )
    }

    if (refreshed) {
        return <Link to="/home"/>;
    }

    return (
        <>
            {authIsReady && user.photoURL && (
                <Row gutter={0} justify="center" align="middle" className={styles['fill-form']}>
                    <Col span={24} xs={24} sm={24} md={24}>
                        <div className={styles.profile}>
                           <img className={styles.profilePicture} src={user.photoURL} alt="Pic"/> 
                           <h2>{user.displayName}'s Profile</h2>
                        </div>
                        <form
                            onSubmit={handleSubmit}>
                            <label>
                                <span>Name (First & Last):</span>
                                <input
                                    type="text"
                                    onChange={(e) => setName(e.target.value)}
                                    value={Name}
                                />
                            </label>
                            <label>
                                <span>Social medias:</span> 
                                <input
                                    type="text"
                                    onChange={(e) => setSocials(e.target.value)}
                                    value={Socials}
                                />
                            </label>
                            <label>
                                <span>Work email (e-mail related to Business Card Info):</span>
                                <input
                                    type="text"
                                    onChange={(e) => setWorkEmail(e.target.value)}
                                    value={WorkEmail}
                                />
                            </label>
                            <label>
                                <span>Location of business:</span>
                                <input
                                    required
                                    type="text"
                                    onChange={(e) => setLocation(e.target.value)}
                                    value={Location}
                                />
                            </label>
                            <label>
                                <span>Name of profession:</span> 
                                <input
                                    type="text"
                                    onChange={(e) => setNameProfession(e.target.value)}
                                    value={NameProfession}
                                />
                            </label>
                            <label>
                                <span>Name of business:</span> 
                                <input
                                    type="text"
                                    onChange={(e) => setNameBusiness(e.target.value)}
                                    value={NameBusiness}
                                />
                            </label>
                            <label>
                                <span>Phone or cell number (Optional):</span> 
                                <input
                                    type="text"
                                    onChange={(e) => setPhoneNum(e.target.value)}
                                    value={PhoneNum}
                                />
                            </label>
                        </form>
                    </Col>
                </Row>
            )}
        </>
                            /*<button className='btn'>Sign Up</button>
                            {error && <div className="error">{error}</div>}*/
    )
}