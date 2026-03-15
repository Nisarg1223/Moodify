import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/login.scss';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

export const slides = [
  {
    url: 'https://i.pinimg.com/1200x/b7/dc/c5/b7dcc55ec2bf6ffd67a76e541785446e.jpg',
    mood: 'Wear Your Mood',
    sub: 'Music that feels like you',
  },
  {
    url: 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=1200&q=90',
    mood: 'Strum the Feeling',
    sub: 'Every chord tells a story',
  },
  {
    url: 'https://images.unsplash.com/photo-1461360370896-922624d12aa1?w=1200&q=90',
    mood: 'Spin the Vibe',
    sub: 'Your mood on repeat',
  },
  {
    url: 'https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=1200&q=90',
    mood: 'Play Your Soul',
    sub: 'Let your expression lead',
  },
  {
    url: 'https://images.unsplash.com/photo-1619983081563-430f63602796?w=1200&q=90',
    mood: 'Rewind & Feel',
    sub: 'Nostalgia in every note',
  },
];

// Extracted so Register can reuse the exact same panel
export const ImagePanel = () => {
  const [current, setCurrent] = useState(0);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setFading(true);
      setTimeout(() => {
        setCurrent(prev => (prev + 1) % slides.length);
        setFading(false);
      }, 600);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const goTo = (i) => {
    if (i === current) return;
    setFading(true);
    setTimeout(() => { setCurrent(i); setFading(false); }, 600);
  };

  return (
    <div className={`image-panel ${fading ? 'fading' : ''}`}>
      <img
        className="slide-img"
        src={slides[current].url}
        alt={slides[current].mood}
      />
      <div className="slide-overlay" />
      <div className="slide-text">
        <span className="slide-tag">moodify</span>
        <h2>{slides[current].mood}</h2>
        <p>{slides[current].sub}</p>
      </div>
      <div className="dots">
        {slides.map((_, i) => (
          <button
            key={i}
            className={`dot ${i === current ? 'active' : ''}`}
            onClick={() => goTo(i)}
          />
        ))}
      </div>
    </div>
  );
};

const Login = () => {
    const {loading,handleLogin} = useAuth();
    const [email,setemail] = useState('');
    const [password,setpassword] = useState('');
    const navigate = useNavigate()
    async function handlesubmit(e){
        e.preventDefault();
        await handleLogin({email,password});
        setemail('');
        setpassword('');
        navigate('/');

    }
  return (
    <div className="login-page">

      {/* LEFT — image slider */}
      <ImagePanel />

      {/* RIGHT — form */}
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

          <h1>Welcome back</h1>
          <p className="subtitle">Sign in and let your face choose the music</p>

          <form onSubmit={handlesubmit}>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <div className="input-wrap">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
                  <path strokeLinecap="round" strokeLinejoin="round"
                    d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25H4.5a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0L12 13.5 2.25 6.75m19.5 0A2.25 2.25 0 0019.5 4.5H4.5a2.25 2.25 0 00-2.25 2.25" />
                </svg>
                <input type="text" value={email}  
                 onChange={function(e){
                    setemail(e.target.value);
                 }}
                id="email" name="email" placeholder="you@example.com" required />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <div className="input-wrap">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
                  <path strokeLinecap="round" strokeLinejoin="round"
                    d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                </svg>
                <input type="password" value={password} onChange={function(e){
                    setpassword(e.target.value);
                }} id="password" name="password" placeholder="••••••••" required />
              </div>
            </div>

            <a href="#" className="forgot">Forgot password?</a>
            <button type="submit" className="btn-login">Sign In</button>
          </form>

          <div className="divider"><span>or</span></div>

          <p className="signup-prompt">
            New here? <Link to="/register">Create an account</Link>
          </p>

        </div>
      </div>

    </div>
  );
};

export default Login;