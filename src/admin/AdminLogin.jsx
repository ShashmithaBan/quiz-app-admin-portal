import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginStart, loginSuccess, loginFailure } from '../store/slice/authSlice';
import { auth, signInWithEmailAndPassword } from '../firebase';
import Input from '../components/Reusable/Input';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);

  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch(loginStart());
    if (!email || !password) {
      dispatch(loginFailure('Please fill all the fields'));
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      dispatch(loginFailure('Please enter a valid email address'));
      return;
    }

    if (password.length < 8) {
      dispatch(loginFailure('Password must be at least 8 characters long'));
      return;
    }

    if (!/[a-z]/.test(password)) {
      dispatch(loginFailure('Password must include at least one lowercase letter'));
      return;
    }

    if (!/[A-Z]/.test(password)) {
      dispatch(loginFailure('Password must include at least one uppercase letter'));
      return;
    }

    if (!/\d/.test(password)) {
      dispatch(loginFailure('Password must include at least one number'));
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      if (user) {
        dispatch(loginSuccess(user));
        navigate('/admin/dashboard');
      }
    } catch (err) {
      dispatch(loginFailure(err.message));
    }
  };

  return (
    <div className="flex justify-center items-center my-auto h-screen bg-gray-100">
      <div className="shadow-md shadow-secondary p-5 gap-8 flex flex-col text-center w-[30rem] rounded-lg bg-white">
        <h2 className="text-accent text-2xl font-bold font-mono">Admin Login</h2>
        <div>
          <form onSubmit={handleLogin} className="flex flex-col gap-[1rem]">
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"

            />
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"

            />
            <button
              type="submit"
              disabled={loading}
              className="p-3 bg-secondary text-white rounded-md hover:bg-accent"
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>
        </div>
        {error && <p className="text-red-500">{error}</p>}
      </div>
    </div>
  );
};

export default AdminLogin;