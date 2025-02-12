import React, { useState } from 'react';
import { signUp } from './AuthService';
import { Link } from 'react-router-dom';  // Import Link here

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSignUp = (e) => {
    e.preventDefault();
    signUp(email, password, (err, result) => {
      if (err) {
        setMessage(`Sign-up failed: ${err.message}`);
      } else {
        setMessage('Sign-up successful! Please check your email to confirm your account.');
      }
    });
  };

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ marginTop: '20px' }}>

      <div className="card p-4" style={{ maxWidth: '400px', width: '100%' }}>
        <h2 className="text-center mb-4">Sign Up</h2>
        <form onSubmit={handleSignUp}>
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
          <button type="submit" className="btn btn-primary w-100 mb-3">Sign Up</button>
        </form>
        {message && <p className="text-center text-danger">{message}</p>}
        <div className="text-center">
          <p>Already have an account? <Link to="/signin" className="link-primary">Sign In</Link></p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;