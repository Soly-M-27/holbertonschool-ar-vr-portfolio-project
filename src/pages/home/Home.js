import React, { useState } from 'react';
import styles from './Home.module.css';
import { useAuthContext } from '../../hooks/useAuthContext';

export default function Home() {
    const [formData, setFormData] = useState({
        profilePicture: null,
        businessName: '',
        profession: '',
        socialMedias: {facebook: '', twitter: '', linkedIn: '', instagram: ''},
        workPhone: '',
        personalPhone: '',
        email: '',
        name: {firstName: '', lastName: ''},
        birthday: '',
        location: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSocialMediaChange = (platform, value) => {
        setFormData(prevState => ({
            ...prevState,
            socialMedias: {
                ...prevState.socialMedias,
                [platform]: value
            }
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
        // Here you would typically send this data to your server
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <i className={`fas fa-chevron-left ${styles.icon}`}></i>
                <span>Profile</span>
                <i className={`fas fa-ellipsis-h ${styles.icon}`}></i>
            </div>

            <div className={styles.profileSection}>
                <div className={styles.avatarContainer}>
                    <img src="path-to-avatar.jpg" alt="Profile Avatar" className={styles.avatar}/>
                    {/* Replace with the star icon as needed */}
                </div>
                <h1 className={styles.name}>Muhammad Wildan Wari</h1>
                <p className={styles.detail}>Teknik Komputer - Universitas Negeri Malang</p>
                <button className={styles.postArticlesButton}>POST ARTICLES</button>
            </div>

            <div className={styles.infoSection}>
                {/* Add the rest of the user info here */}
            </div>
        </div>
    );
}