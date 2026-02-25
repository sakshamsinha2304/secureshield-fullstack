import React from 'react';
import { Share2, ArrowRight, ShieldCheck, Mail, HardDrive, Globe, Network } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const threatFrequency = [
    { day: 'Mon', count: 2 },
    { day: 'Tue', count: 5 },
    { day: 'Wed', count: 3 },
    { day: 'Thu', count: 8 },
    { day: 'Fri', count: 4 },
    { day: 'Sat', count: 12 },
    { day: 'Sun', count: 7 },
];

export const AttackVector = () => {
    return (
        <div className="card" style={{ gridColumn: 'span 8' }}>
            <div className="card-header">
                <h2 className="card-title">
                    <Share2 size={20} /> Attack Vector Analysis Panel
                </h2>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                <div>
                    <h3 style={{ fontSize: '0.9rem', marginBottom: '1.5rem', color: 'var(--text-secondary)' }}>ENTRY POINT IDENTIFICATION</h3>

                    <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem' }}>
                        <div style={{ textAlign: 'center' }}>
                            <div style={{ width: '40px', height: '40px', background: 'rgba(0, 242, 255, 0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 0.5rem' }}>
                                <Globe size={20} color="var(--accent-blue)" />
                            </div>
                            <p style={{ fontSize: '0.7rem' }}>External Network</p>
                        </div>
                        <ArrowRight size={20} color="var(--accent-blue)" style={{ opacity: 0.5 }} />
                        <div style={{ textAlign: 'center' }}>
                            <div style={{ width: '40px', height: '40px', background: 'rgba(255, 62, 62, 0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 0.5rem' }}>
                                <Mail size={20} color="var(--accent-red)" />
                            </div>
                            <p style={{ fontSize: '0.7rem' }}>Email Client</p>
                        </div>
                        <ArrowRight size={20} color="var(--accent-blue)" style={{ opacity: 0.5 }} />
                        <div style={{ textAlign: 'center' }}>
                            <div style={{ width: '40px', height: '40px', background: 'rgba(0, 255, 136, 0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 0.5rem' }}>
                                <HardDrive size={20} color="var(--accent-green)" />
                            </div>
                            <p style={{ fontSize: '0.7rem' }}>Local Disk</p>
                        </div>
                    </div>

                    <div style={{ marginTop: '2rem' }}>
                        <h3 style={{ fontSize: '0.9rem', marginBottom: '1rem', color: 'var(--text-secondary)' }}>THREAT TIMELINE</h3>
                        <div className="timeline" style={{ borderLeft: '2px solid var(--border-color)', paddingLeft: '1.5rem' }}>
                            <div style={{ position: 'relative', marginBottom: '1rem' }}>
                                <div style={{ position: 'absolute', left: '-1.9rem', top: '0.2rem', width: '10px', height: '10px', background: 'var(--accent-blue)', borderRadius: '50%' }}></div>
                                <p style={{ fontSize: '0.8rem', fontWeight: 600 }}>09:15 AMC - Connection Established</p>
                                <p style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>Inbound traffic from 185.x.x.x on Port 443</p>
                            </div>
                            <div style={{ position: 'relative' }}>
                                <div style={{ position: 'absolute', left: '-1.9rem', top: '0.2rem', width: '10px', height: '10px', background: 'var(--accent-red)', borderRadius: '50%' }}></div>
                                <p style={{ fontSize: '0.8rem', fontWeight: 600 }}>09:16 AM - Payload Execution</p>
                                <p style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>Unauthorized write access to Sys32 drivers</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div>
                    <h3 style={{ fontSize: '0.9rem', marginBottom: '1rem', color: 'var(--text-secondary)' }}>THREAT FREQUENCY (7 DAYS)</h3>
                    <div style={{ height: '200px' }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={threatFrequency}>
                                <defs>
                                    <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#00f2ff" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#00f2ff" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <XAxis dataKey="day" stroke="var(--text-secondary)" fontSize={10} tickLine={false} axisLine={false} />
                                <Tooltip
                                    contentStyle={{ background: 'var(--card-bg)', border: '1px solid var(--border-color)', borderRadius: '8px' }}
                                    itemStyle={{ color: 'var(--accent-blue)' }}
                                />
                                <Area type="monotone" dataKey="count" stroke="#00f2ff" fillOpacity={1} fill="url(#colorCount)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    );
};
