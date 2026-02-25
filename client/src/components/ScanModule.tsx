import React, { useState, useEffect } from 'react';
import { Search, Shield, AlertCircle, CheckCircle2, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

export const ScanModule = () => {
    const [isScanning, setIsScanning] = useState(false);
    const [progress, setProgress] = useState(0);
    const [stats, setStats] = useState({
        files: 0,
        suspicious: 0,
        clean: 0,
        startTime: null as Date | null,
        endTime: null as Date | null
    });

    useEffect(() => {
        let interval: any;
        if (isScanning) {
            interval = setInterval(() => {
                setProgress(prev => {
                    if (prev >= 100) {
                        setIsScanning(false);
                        setStats(s => ({ ...s, endTime: new Date() }));
                        return 100;
                    }
                    const next = prev + Math.random() * 5;
                    setStats(s => ({
                        ...s,
                        files: s.files + Math.floor(Math.random() * 50),
                        clean: s.clean + Math.floor(Math.random() * 48),
                        suspicious: s.suspicious + (Math.random() > 0.95 ? 1 : 0)
                    }));
                    return next > 100 ? 100 : next;
                });
            }, 200);
        }
        return () => clearInterval(interval);
    }, [isScanning]);

    const startScan = () => {
        setIsScanning(true);
        setProgress(0);
        setStats({
            files: 0,
            suspicious: 0,
            clean: 0,
            startTime: new Date(),
            endTime: null
        });
    };

    return (
        <div className="card" style={{ gridColumn: 'span 4' }}>
            {isScanning && <div className="scanning-animation"></div>}
            <div className="card-header">
                <h2 className="card-title">
                    <Search size={20} /> Full System Scan
                </h2>
                {isScanning ? (
                    <span style={{ color: 'var(--accent-blue)', fontSize: '0.8rem' }}>SCANNING...</span>
                ) : (
                    <Shield size={20} color="var(--accent-green)" />
                )}
            </div>

            <div className="scan-stats">
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
                    <div>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>Total Files</p>
                        <p style={{ fontSize: '1.5rem', fontWeight: 700 }}>{stats.files.toLocaleString()}</p>
                    </div>
                    <div>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>Suspicious</p>
                        <p style={{ fontSize: '1.5rem', fontWeight: 700, color: stats.suspicious > 0 ? 'var(--accent-red)' : 'var(--text-primary)' }}>
                            {stats.suspicious}
                        </p>
                    </div>
                </div>

                <div className="progress-bar">
                    <motion.div
                        className="progress-fill"
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                    />
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
                    <span>{progress.toFixed(0)}% Completed</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Clock size={12} /> {stats.startTime ? stats.startTime.toLocaleTimeString() : '--:--'}
                    </span>
                </div>

                <button
                    className={`btn ${isScanning ? 'btn-danger' : 'btn-primary'}`}
                    style={{ width: '100%' }}
                    onClick={isScanning ? () => setIsScanning(false) : startScan}
                >
                    {isScanning ? 'STOP SCAN' : 'START FULL SYSTEM SCAN'}
                </button>
            </div>
        </div>
    );
};
