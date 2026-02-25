import React, { useState } from 'react';
import { Shield, Lock, Bell, Settings, User, AlertCircle } from 'lucide-react';
import './styles/Main.css';
import { ScanModule } from './components/ScanModule';
import { ThreatDashboard } from './components/ThreatDashboard';
import { SystemStatus } from './components/SystemStatus';
import { Logs } from './components/Logs';
import { AttackVector } from './components/AttackVector';
import { NeuralAnalyzer } from './components/NeuralAnalyzer';
import { motion, AnimatePresence } from 'framer-motion';

function App() {
    const [activeTab, setActiveTab] = useState('dashboard');
    const [showNotification, setShowNotification] = useState(false);

    return (
        <div className="app-container">
            <header className="header">
                <div className="logo">
                    <Shield size={32} />
                    <span>SECURE<span style={{ color: 'var(--text-primary)' }}>SHIELD</span></span>
                </div>

                <nav style={{ display: 'flex', gap: '2rem' }}>
                    {['DASHBOARD', 'NETWORK', 'REPORTS', 'QUARANTINE'].map(tab => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab.toLowerCase())}
                            style={{
                                background: 'none',
                                border: 'none',
                                color: activeTab === tab.toLowerCase() ? 'var(--accent-blue)' : 'var(--text-secondary)',
                                fontWeight: 600,
                                fontSize: '0.9rem',
                                cursor: 'pointer',
                                letterSpacing: '1px',
                                position: 'relative'
                            }}
                        >
                            {tab}
                            {activeTab === tab.toLowerCase() && (
                                <motion.div
                                    layoutId="underline"
                                    style={{ position: 'absolute', bottom: '-27px', left: 0, right: 0, height: '2px', background: 'var(--accent-blue)' }}
                                />
                            )}
                        </button>
                    ))}
                </nav>

                <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                    <div style={{ position: 'relative', cursor: 'pointer' }} onClick={() => setShowNotification(!showNotification)}>
                        <Bell size={20} />
                        <div style={{ position: 'absolute', top: -5, right: -5, width: '10px', height: '10px', background: 'var(--accent-red)', borderRadius: '50%', border: '2px solid var(--bg-color)' }}></div>
                    </div>
                    <Settings size={20} style={{ cursor: 'pointer' }} />
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '0.4rem 0.8rem', background: 'rgba(255,255,255,0.05)', borderRadius: '20px', cursor: 'pointer' }}>
                        <User size={16} />
                        <span style={{ fontSize: '0.8rem', fontWeight: 600 }}>ADMIN</span>
                    </div>
                </div>
            </header>

            <main className="main-content">
                <div style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                    <div>
                        <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>Security Overview</h1>
                        <p style={{ color: 'var(--text-secondary)' }}>Advanced Malware Detection & Real-time System Protection Interface</p>
                    </div>
                    <div style={{ display: 'flex', gap: '1rem' }}>
                        <div style={{ textAlign: 'right' }}>
                            <p style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>NEURAL CONFIDENCE</p>
                            <p style={{ color: 'var(--accent-purple)', fontWeight: 800 }}>99.82% (SAFE)</p>
                        </div>
                        <div style={{ height: '40px', width: '1px', background: 'var(--border-color)' }}></div>
                        <div style={{ textAlign: 'right' }}>
                            <p style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>LAST FULL SCAN</p>
                            <p style={{ fontWeight: 700 }}>2 HOURS AGO</p>
                        </div>
                    </div>
                </div>

                <div className="dashboard-grid">
                    <NeuralAnalyzer />
                    <SystemStatus />
                    <ScanModule />
                    <Logs />
                    <ThreatDashboard />
                    <AttackVector />
                </div>
            </main>

            <AnimatePresence>
                {showNotification && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        style={{
                            position: 'fixed',
                            bottom: '2rem',
                            right: '2rem',
                            width: '320px',
                            padding: '1.5rem',
                            background: 'var(--card-bg)',
                            border: '1px solid var(--accent-red)',
                            borderRadius: '12px',
                            boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
                            zIndex: 1000,
                            backdropFilter: 'blur(20px)'
                        }}
                    >
                        <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                            <div style={{ background: 'rgba(255,62,62,0.1)', padding: '0.5rem', borderRadius: '8px' }}>
                                <AlertCircle size={20} color="var(--accent-red)" />
                            </div>
                            <div>
                                <h4 style={{ fontSize: '1rem', marginBottom: '0.25rem' }}>Security Alert</h4>
                                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                                    Suspicious network connection blocked from 185.234.12.45.
                                </p>
                                <div style={{ display: 'flex', gap: '0.5rem' }}>
                                    <button className="btn" style={{ padding: '0.3rem 0.6rem', fontSize: '0.75rem' }} onClick={() => setShowNotification(false)}>Dismiss</button>
                                    <button className="btn btn-primary" style={{ padding: '0.3rem 0.6rem', fontSize: '0.75rem' }}>View Details</button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <footer style={{ padding: '2rem', textAlign: 'center', borderTop: '1px solid var(--border-color)', marginTop: '4rem', color: 'var(--text-secondary)', fontSize: '0.8rem' }}>
                <p>&copy; 2026 SECURESHIELD - Advanced Malware Detection System. All rights reserved.</p>
                <p style={{ marginTop: '0.5rem', opacity: 0.5 }}>MIL-SPEC ENCRYPTION ENABLED | SHIELD-PRO VERSION 4.2.0</p>
            </footer>
        </div>
    );
}

export default App;
