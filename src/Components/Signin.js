import React, { useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { signIn } from './AuthService';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  const handleSignIn = (e) => {
    e.preventDefault();
    signIn(email, password, (err, session) => {
      if (err) {
        setMessage(`Sign-in failed: ${err.message}`);
      } else {
        setMessage('Sign-in successful!');
        navigate(from, { replace: true });
      }
    });
  };

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ marginTop: '20px' }}>
      <div className="card p-4" style={{ maxWidth: '400px', width: '100%' }}>
        <h2 className="text-center mb-4">Sign In</h2>
        <form onSubmit={handleSignIn}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email:</label>
            <input
              type="email"
              id="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password:</label>
            <input
              type="password"
              id="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100 mb-3">Sign In</button>
        </form>
        {message && <p className="text-center text-danger">{message}</p>}
        <div className="text-center">
          <p>Don't have an account? <Link to="/signup" className="link-primary">Sign Up</Link></p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;