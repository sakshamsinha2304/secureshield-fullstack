import React from 'react';
import { ShieldCheck, activity, Zap, Cpu, Wifi } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip } from 'recharts';

const data = [
    { name: 'Healthy', value: 98, color: '#00ff88' },
    { name: 'Risk', value: 2, color: 'rgba(255, 62, 62, 0.2)' },
];

const cpuData = Array.from({ length: 20 }, (_, i) => ({
    time: i,
    usage: 20 + Math.random() * 40
}));

export const SystemStatus = () => {
    return (
        <div className="card" style={{ gridColumn: 'span 4' }}>
            <div className="card-header">
                <h2 className="card-title">
                    <ShieldCheck size={20} /> System Safety Status
                </h2>
            </div>

            <div className="status-indicator">
                <div className="status-circle secure">
                    <div style={{ textAlign: 'center' }}>
                        <p style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--accent-green)' }}>98%</p>
                        <p style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>HEALTH SCORE</p>
                    </div>
                </div>
                <p className="status-text" style={{ color: 'var(--accent-green)' }}>🟢 SYSTEM SECURE</p>
            </div>

            <div style={{ marginTop: '2rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div style={{ background: 'rgba(255,255,255,0.03)', padding: '0.75rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)' }}>
                    <p style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '5px' }}>
                        <Zap size={12} color="var(--accent-yellow)" /> FIREWALL
                    </p>
                    <p style={{ fontWeight: 600, fontSize: '0.9rem' }}>STATUS: ACTIVE</p>
                </div>
                <div style={{ background: 'rgba(255,255,255,0.03)', padding: '0.75rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)' }}>
                    <p style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '5px' }}>
                        <Cpu size={12} color="var(--accent-blue)" /> ANTIVIRUS
                    </p>
                    <p style={{ fontWeight: 600, fontSize: '0.9rem' }}>ENGINE: RUNNING</p>
                </div>
            </div>

            <div style={{ marginTop: '1.5rem', height: '100px' }}>
                <p style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <activity size={12} /> CPU LOAD
                </p>
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={cpuData}>
                        <Line type="monotone" dataKey="usage" stroke="#00f2ff" strokeWidth={2} dot={false} />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};
