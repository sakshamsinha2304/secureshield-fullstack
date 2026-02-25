import React from 'react';
import { Terminal, List } from 'lucide-react';

const MOCK_LOGS = [
    { id: 1, time: "09:44:12", action: "SCAN_START", status: "INFO", msg: "Initiated manual full system scan." },
    { id: 2, time: "09:44:15", action: "FILE_SCAN", status: "OK", msg: "C:\\Windows\\System32\\ntoskrnl.exe - CLEAN" },
    { id: 3, time: "09:44:18", action: "FILE_SCAN", status: "OK", msg: "C:\\System\\Drivers\\disk.sys - CLEAN" },
    { id: 4, time: "09:45:01", action: "DETECTION", status: "WARN", msg: "Suspicious activity in memory block 0x4F2A." },
    { id: 5, time: "09:45:10", action: "DETECTION", status: "CRITICAL", msg: "Trojan.Generic.Kryptik identified in Downloads folder." },
    { id: 6, time: "09:45:12", action: "QUARANTINE", status: "ACTION", msg: "Threat 0x01 moved to isolated vault." },
    { id: 7, time: "09:46:00", action: "SCAN_STOP", status: "INFO", msg: "Scan completed in 108 seconds. 1 threat found." },
];

export const Logs = () => {
    return (
        <div className="card" style={{ gridColumn: 'span 4' }}>
            <div className="card-header">
                <h2 className="card-title">
                    <Terminal size={20} /> Detailed Logs Section
                </h2>
                <button className="btn" style={{ padding: '0.2rem 0.5rem', fontSize: '0.65rem' }}>EXPORT PDF</button>
            </div>

            <div className="logs-list">
                {MOCK_LOGS.map(log => (
                    <div key={log.id} className="log-entry">
                        <span className="log-time">[{log.time}]</span>
                        <span style={{ color: log.status === 'CRITICAL' ? 'var(--accent-red)' : 'var(--accent-blue)', opacity: 0.8, fontWeight: 700 }}>
                            {log.action}
                        </span>
                        <span className="log-msg">{log.msg}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};
