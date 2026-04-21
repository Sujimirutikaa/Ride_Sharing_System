import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Car, User, Search, PlusCircle, MapPin, Users, Calendar, ArrowRight, CheckCircle2, XCircle, LogOut, History, Phone, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const API_BASE_URL = 'http://127.0.0.1:8000';

const api = axios.create({
  baseURL: API_BASE_URL,
});

const AuthForm = ({ authForm, setAuthForm, handleAuth, view }) => (
  <div className="glass card" style={{ maxWidth: '400px', margin: '4rem auto' }}>
    <h2 style={{ marginBottom: '1.5rem', textAlign: 'center' }}>
      {authForm.isRegister ? 'Create Account' : 'Login'} as {view === 'user' ? 'User' : 'Driver'}
    </h2>
    <form onSubmit={handleAuth} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <input 
        className="input" 
        required 
        placeholder="Full Name" 
        value={authForm.name}
        onChange={(e) => setAuthForm(prev => ({...prev, name: e.target.value}))}
      />
      <input 
        className="input" 
        required 
        placeholder="Phone Number" 
        value={authForm.phone}
        onChange={(e) => setAuthForm(prev => ({...prev, phone: e.target.value}))}
      />
      <button className="btn btn-primary" type="submit">
          {authForm.isRegister ? 'Register' : 'Login'}
      </button>
      <p style={{ textAlign: 'center', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
          {authForm.isRegister ? 'Already have an account?' : "Don't have an account?"}
          <button 
              type="button"
              style={{ background: 'none', border: 'none', color: 'var(--primary)', cursor: 'pointer', marginLeft: '0.5rem' }}
              onClick={() => setAuthForm(prev => ({...prev, isRegister: !prev.isRegister}))}
          >
              {authForm.isRegister ? 'Login here' : 'Register here'}
          </button>
      </p>
    </form>
  </div>
);

function App() {
  const [view, setView] = useState('user'); // 'user' or 'driver'
  const [auth, setAuth] = useState(() => {
    const saved = localStorage.getItem('rideflow_auth');
    try {
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [rides, setRides] = useState([]);
  const [userBookings, setUserBookings] = useState([]);
  const [driverRides, setDriverRides] = useState([]);
  const [searchParams, setSearchParams] = useState({ pickup: '', destination: '' });
  const [newRide, setNewRide] = useState({ pickup_location: '', destination: '', total_seats: 4 });
  const [authForm, setAuthForm] = useState({ name: '', phone: '', isRegister: false });
  const [message, setMessage] = useState(null);

  useEffect(() => {
    localStorage.setItem('rideflow_auth', JSON.stringify(auth));
    if (auth) {
      if (auth.type === 'user') fetchUserHistory();
      if (auth.type === 'driver') fetchDriverRides();
    }
  }, [auth]);

  useEffect(() => {
    fetchRides();
  }, [searchParams]);

  const fetchRides = async () => {
    try {
      const res = await api.get('/rides/', { params: searchParams });
      setRides(res.data);
    } catch (err) {
      console.error('Error fetching rides', err);
    }
  };

  const fetchUserHistory = async () => {
    if (!auth || auth.type !== 'user') return;
    try {
      const res = await api.get('/bookings/', { params: { user_id: auth.id } });
      setUserBookings(res.data);
    } catch (err) {
      console.error('Error fetching history', err);
    }
  };

  const fetchDriverRides = async () => {
    if (!auth || auth.type !== 'driver') return;
    try {
      const res = await api.get('/rides/', { params: { driver_id: auth.id } });
      setDriverRides(res.data);
    } catch (err) {
      console.error('Error fetching driver rides', err);
    }
  };

  const handleAuth = async (e) => {
    e.preventDefault();
    const endpoint = view === 'user' 
        ? (authForm.isRegister ? '/users/register' : '/users/login')
        : (authForm.isRegister ? '/drivers/' : '/drivers/login');

    try {
        const res = await api.post(endpoint, { 
          name: authForm.name, 
          phone: authForm.phone, 
          phone_number: authForm.phone 
        });
        
        setAuth({ ...res.data, type: view });
        showMsg(`Logged in as ${res.data.name}!`);
        setAuthForm({ name: '', phone: '', isRegister: false });
    } catch (err) {
        const detail = err.response?.data?.detail || 'Authentication failed';
        showMsg(detail, 'error');
    }
  };

  const logout = () => {
    setAuth(null);
    localStorage.removeItem('rideflow_auth');
    showMsg('Logged out successfully');
  };

  const offerRide = async (e) => {
    e.preventDefault();
    if (!auth || auth.type !== 'driver') return;
    try {
      await api.post('/rides/', {
        ...newRide,
        driver_name: auth.name,
        driver_id: auth.id
      });
      fetchDriverRides();
      fetchRides();
      showMsg('Ride offered successfully!');
      setNewRide({ pickup_location: '', destination: '', total_seats: 4 });
    } catch (err) {
      showMsg('Error offering ride', 'error');
    }
  };

  const bookRide = async (rideId) => {
    if (!auth || auth.type !== 'user') return showMsg('Please login as user to book', 'error');
    try {
      await api.post(`/rides/${rideId}/book`, { 
        user_name: auth.name,
        user_id: auth.id 
      });
      fetchRides();
      fetchUserHistory();
      showMsg('Ride booked successfully!');
    } catch (err) {
      const detail = err.response?.data?.detail || 'Error booking ride';
      showMsg(detail, 'error');
    }
  };

  const showMsg = (text, type = 'success') => {
    setMessage({ text, type });
    setTimeout(() => setMessage(null), 3000);
  };

  return (
    <div className="app-container">
      <nav className="glass flex justify-between items-center p-4 mb-8" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', padding: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Car size={32} color="var(--primary)" />
          <h1 style={{ fontSize: '1.5rem' }}>RideFlow</h1>
        </div>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          {!auth && (
            <>
              <button className={`btn ${view === 'user' ? 'btn-primary' : 'btn-outline'}`} onClick={() => setView('user')}>User Mode</button>
              <button className={`btn ${view === 'driver' ? 'btn-primary' : 'btn-outline'}`} onClick={() => setView('driver')}>Driver Mode</button>
            </>
          )}
          {auth && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                Logged in as <b>{auth.name}</b> ({auth.type})
              </span>
              <button className="btn btn-outline" onClick={logout} style={{ padding: '0.5rem 1rem' }}>
                <LogOut size={16} /> Logout
              </button>
            </div>
          )}
        </div>
      </nav>

      <AnimatePresence mode="wait">
        {message && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
            className="glass"
            style={{ position: 'fixed', top: '2rem', left: '50%', transform: 'translateX(-50%)', zIndex: 1000, padding: '1rem 2rem', borderLeft: `4px solid ${message.type === 'error' ? 'var(--error)' : 'var(--success)'}`, background: 'var(--bg)' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              {message.type === 'error' ? <XCircle color="var(--error)" /> : <CheckCircle2 color="var(--success)" />}
              {message.text}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main>
        {!auth ? (
          <AuthForm 
            authForm={authForm} 
            setAuthForm={setAuthForm} 
            handleAuth={handleAuth} 
            view={view} 
          />
        ) : (
          auth.type === 'driver' ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '2rem' }}>
                <div className="glass card" style={{ height: 'fit-content' }}>
                  <h2 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <PlusCircle size={24} /> Offer a Ride
                  </h2>
                  <form onSubmit={offerRide} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                    <div>
                      <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>Pickup</label>
                      <input className="input" required value={newRide.pickup_location} onChange={(e) => setNewRide({...newRide, pickup_location: e.target.value})} />
                    </div>
                    <div>
                      <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>Destination</label>
                      <input className="input" required value={newRide.destination} onChange={(e) => setNewRide({...newRide, destination: e.target.value})} />
                    </div>
                    <div>
                      <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>Total Seats</label>
                      <input type="number" className="input" min="1" max="8" value={newRide.total_seats} onChange={(e) => setNewRide({...newRide, total_seats: parseInt(e.target.value)})} />
                    </div>
                    <button className="btn btn-primary" type="submit">Publish Ride</button>
                  </form>
                </div>
                <div>
                  <h2 style={{ marginBottom: '1.5rem' }}>Manage Your Rides</h2>
                  <div className="grid">
                    {driverRides.map(ride => (
                      <div key={ride.id} className="glass card">
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                          <span className="badge badge-muted">Ride #{ride.id}</span>
                          <span className="badge badge-success">{ride.available_seats} / {ride.total_seats} Left</span>
                        </div>
                        <div style={{ marginBottom: '1rem' }}>
                          <p style={{ fontWeight: 600 }}>{ride.pickup_location} → {ride.destination}</p>
                        </div>
                        <div style={{ borderTop: '1px solid var(--border)', paddingTop: '1rem' }}>
                          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>BOOKED BY:</p>
                          {ride.bookings.length === 0 ? (
                            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>No bookings yet</p>
                          ) : (
                            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                              {ride.bookings.map(b => (
                                <li key={b.id} style={{ display: 'flex', flexDirection: 'column', fontSize: '0.9rem', padding: '0.5rem', background: 'rgba(255,255,255,0.03)', borderRadius: '0.3rem' }}>
                                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <User size={14} /> <b>{b.user_name}</b>
                                  </div>
                                  {b.user_phone && (
                                    <div style={{ fontSize: '0.8rem', color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: '0.3rem', marginTop: '0.2rem' }}>
                                      <Phone size={12} /> {b.user_phone}
                                    </div>
                                  )}
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <div style={{ display: 'flex', gap: '2rem' }}>
                <div style={{ flex: 2 }}>
                  <div className="glass" style={{ padding: '1.5rem', marginBottom: '2rem' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr auto', gap: '1rem', alignItems: 'flex-end' }}>
                      <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>Pickup</label>
                        <div style={{ position: 'relative' }}>
                          <MapPin size={18} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                          <input className="input" style={{ paddingLeft: '2.5rem' }} value={searchParams.pickup} onChange={(e) => setSearchParams({...searchParams, pickup: e.target.value})} />
                        </div>
                      </div>
                      <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>Destination</label>
                        <div style={{ position: 'relative' }}>
                          <MapPin size={18} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                          <input className="input" style={{ paddingLeft: '2.5rem' }} value={searchParams.destination} onChange={(e) => setSearchParams({...searchParams, destination: e.target.value})} />
                        </div>
                      </div>
                      <button className="btn btn-primary" onClick={fetchRides}><Search size={18}/> Search</button>
                    </div>
                  </div>
                  <div className="grid">
                    {rides.map(ride => (
                      <div key={ride.id} className="glass card">
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                          <span className="badge badge-muted">Ride #{ride.id}</span>
                          <span className={`badge ${ride.available_seats > 0 ? 'badge-success' : 'badge-muted'}`}>{ride.available_seats} / {ride.total_seats} Left</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                          <p style={{ fontWeight: 600 }}>{ride.pickup_location} → {ride.destination}</p>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <span style={{ fontSize: '0.9rem' }}>Driver: {ride.driver_name}</span>
                            {ride.driver_phone && (
                              <span style={{ fontSize: '0.8rem', color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                                <Phone size={12} /> {ride.driver_phone}
                              </span>
                            )}
                          </div>
                          <button className="btn btn-primary" disabled={ride.available_seats === 0} onClick={() => bookRide(ride.id)}>Book</button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div style={{ flex: 1 }}>
                  <div className="glass card">
                    <h2 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <History size={24} /> My History
                    </h2>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                      {userBookings.length === 0 ? (
                        <p style={{ color: 'var(--text-muted)' }}>No bookings yet.</p>
                      ) : (
                        userBookings.map(b => (
                          <div key={b.id} style={{ padding: '1rem', background: 'rgba(255,255,255,0.05)', borderRadius: '0.5rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                              <div>
                                <p style={{ fontSize: '0.9rem', fontWeight: 600 }}>Ride #{b.ride_id}</p>
                                <span className="badge badge-success" style={{ fontSize: '0.7rem' }}>CONFIRMED</span>
                              </div>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )
        )}
      </main>
    </div>
  );
}

export default App;
