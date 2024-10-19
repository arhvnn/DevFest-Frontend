"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Image from 'next/image';
import eyeIcon from '../assets/eye.png'; 
import styles from "./login.module.css";
import "@fontsource/poppins";

const Login = () => {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('authToken'); 
        if (token) {
            router.push('/dashboard');
        }
    }, []);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleRememberMeChange = () => {
        setRememberMe(!rememberMe);
    };

    const handleSubmit = async (event: { preventDefault: () => void; }) => {
        event.preventDefault(); 
    
        try {
            const response = await axios.post('http://localhost:3001/login', {
                username,
                password,
            });
    
            if (response.status === 200) {
                const token = response.data.token; 
                localStorage.setItem('authToken', token); 
                console.log('Login success'); 
                router.push('/dashboard'); 
            } else {
                console.log('Not success'); 
            }
        } catch (error) {
            setError('Invalid username or password');
            console.error('Login error:', error);
            console.log('Not success');
        }
    };
    

    return (
        <div className={styles.container}>
            <div className={styles.flexDiv}>
                <div className={styles.image}></div>
                <div className={styles.login}>
                    <div className={styles.texts}>
                        <h1 className={styles.title}>Admin Login</h1>
                        <h4 className={styles.subtitle}>Sign in to access the Network Management Dashboard</h4>
                    </div>

                    <form className={styles.loginform} onSubmit={handleSubmit}>
                        <input 
                            className={styles.username} 
                            type="text" 
                            placeholder='Username' 
                            value={username}
                            onChange={(e) => setUsername(e.target.value)} 
                            required 
                        />
                        <div className={styles.passwordContainer}>
                            <input
                                className={`${styles.password} ${styles.username}`}
                                type={showPassword ? 'text' : 'password'}
                                placeholder='Password'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)} 
                                required
                            />
                            <button
                                type="button"
                                className={styles.eyeButton}
                                onClick={togglePasswordVisibility}
                            >
                                <Image src={eyeIcon} alt="Toggle password visibility" width={24} height={24} />
                            </button>
                        </div>
                        {error && <div className={styles.error}>{error}</div>} 

                        <div className={styles.forgotPasswordContainer}>
                            <h1 className={styles.Forgotpassword}>Forgot password?</h1>
                        </div>

                        <div className={styles.rememberMeContainer}>
                            <label className={styles.checkboxLabel}>
                                <input 
                                    type="checkbox" 
                                    checked={rememberMe} 
                                    onChange={handleRememberMeChange} 
                                    className={styles.checkboxInput}
                                />
                                <span className={styles.customCheckbox}></span>
                                Remember Me
                            </label>
                        </div>

                        <button className={styles.submitbtn} type='submit'>Log in</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;
