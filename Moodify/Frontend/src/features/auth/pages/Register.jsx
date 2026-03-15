import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ImagePanel } from './Login';
import '../styles/login.scss';
import { useAuth } from '../hooks/useAuth';

const Register = () => {
    const {loading,handleRegister} = useAuth();
      const [email,setemail] = useState('');
      const [username,setusername] = useState('');
      const [password,setpassword] = useState('');
      const navigate = useNavigate();
   
      async function handleSubmit(e){
        e.preventDefault();
        await handleRegister({
          username,
          password,
          email
        })
        setemail('');
        setpassword('');
        setusername('');
        navigate('/');
      }
  return (
    <div className="login-page">
        
      {/* LEFT — exact same image slider from Login */}
      <ImagePanel />

      {/* RIGHT — register form */}
      <div className="form-panel">
        <div className="form-inner">

          <div className="brand">
            <div className="wave-icon">
              {[1, 2, 3, 4, 5].map(n => (
                <span key={n} style={{ '--i': n }} />
              ))}
            </div>
            <span className="brand-name">mood<em>ify</em></span>
          </div>

          <h1>Create account</h1>
          <p className="subtitle">Join and let your face choose the music</p>

          <form onSubmit={handleSubmit}>

            {/* Username */}
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <div className="input-wrap">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
                  <path strokeLinecap="round" strokeLinejoin="round"
                    d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                </svg>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={username}
                  onChange={function(e){
                    setusername(e.target.value);
                  }}
                  placeholder="yourname"
                  required
                />
              </div>
            </div>

            {/* Email */}
            <div className="form-group">
              <label htmlFor="reg-email">Email</label>
              <div className="input-wrap">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
                  <path strokeLinecap="round" strokeLinejoin="round"
                    d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25H4.5a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0L12 13.5 2.25 6.75m19.5 0A2.25 2.25 0 0019.5 4.5H4.5a2.25 2.25 0 00-2.25 2.25" />
                </svg>
                <input
                  type="email"
                  id="reg-email"
                  name="email"
                  value={email}
                  onChange={function(e){
                     setemail(e.target.value);
                  }}
                  placeholder="you@example.com"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div className="form-group">
              <label htmlFor="reg-password">Password</label>
              <div className="input-wrap">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
                  <path strokeLinecap="round" strokeLinejoin="round"
                    d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                </svg>
                <input
                  type="password"
                  id="reg-password"
                  name="password"
                  value={password}
                  onChange={function(e){
                    setpassword(e.target.value);
                  }}
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <button type="submit" className="btn-login">Create Account</button>
          </form>

          <div className="divider"><span>or</span></div>

          <p className="signup-prompt">
            Already have an account? <Link to="/login">Sign in</Link>
          </p>

        </div>
      </div>

    </div>
  );
};

export default Register;