import React from 'react';
import Layout from '@theme/Layout';
import styles from './login.module.css';

export default function Login(): React.ReactElement {
  return (
    <Layout
      title="Login"
      description="CoreGrid Login">
      <div className={styles.container}>
        <div className={styles.loginBox}>
          <div className={styles.header}>
            <h1 className={styles.title}>Welcome to CoreGrid</h1>
            <p className={styles.subtitle}>Sign in to your account</p>
          </div>

          <form className={styles.form}>
            <div className={styles.formGroup}>
              <label htmlFor="email" className={styles.label}>Email Address</label>
              <input
                type="email"
                id="email"
                className={styles.input}
                placeholder="your.email@example.com"
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="password" className={styles.label}>Password</label>
              <input
                type="password"
                id="password"
                className={styles.input}
                placeholder="Enter your password"
                required
              />
            </div>

            <div className={styles.rememberForgot}>
              <label className={styles.checkbox}>
                <input type="checkbox" />
                <span>Remember me</span>
              </label>
              <a href="#" className={styles.forgot}>Forgot password?</a>
            </div>

            <button type="submit" className={`cg-btn cg-btn--primary ${styles.submitBtn}`}>
              Sign In
            </button>
          </form>

          <div className={styles.footer}>
            <p>Don't have an account? <a href="/contact" className={styles.link}>Contact us</a></p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
