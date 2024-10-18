"use client";
import Image from 'next/image';
import eyeIcon from '../assets/eye.png'; 
import styles from "./login.module.css";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import "@fontsource/poppins"

const Login = () => {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleRememberMeChange = () => {
        setRememberMe(!rememberMe);
    };

    const handleSubmit = (event: { preventDefault: () => void; }) => {
        event.preventDefault(); 
        router.push('/dashboard'); 
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

                    <form className={styles.loginform} onSubmit={handleSubmit}> {/* Attach the handleSubmit */}
                        <input className={styles.username} type="text" placeholder='Username' />
                        <div className={styles.passwordContainer}>
                            <input
                                className={`${styles.password} ${styles.username}`}
                                type={showPassword ? 'text' : 'password'}
                                placeholder='Password'
                            />
                            <button
                                type="button"
                                className={styles.eyeButton}
                                onClick={togglePasswordVisibility}
                            >
                                <Image src={eyeIcon} alt="Toggle password visibility" width={24} height={24} />
                            </button>
                        </div>
                        <div className={styles.forgotPasswordContainer}>
                            <h1 className={styles.Forgotpassword}>Forgot password?</h1>
                        </div>

                        <button className={styles.submitbtn} type='submit'>Log in</button>

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
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;
