"use client";
import Image from 'next/image';
import eyeIcon from '../../assets/eye.png'; 
import styles from "./login.module.css";
import { useState } from 'react';
import "@fontsource/poppins"; 

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
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

                    <form className={styles.loginform} action="">
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
                                <input type="checkbox" className={styles.checkboxInput} />
                                <span className={styles.customCheckbox}></span>
                                Remember me
                            </label>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;
