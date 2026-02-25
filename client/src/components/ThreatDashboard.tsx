import React from 'react';
import { AlertTriangle, ShieldAlert, Globe, FileWarning, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

const MOCK_THREATS = [
  {
    id: 1,
    name: "Trojan.Generic.Kryptik",
    level: "High",
    vector: "Email attachment",
    sourceIp: "185.234.12.45",
    timestamp: "2024-03-15 14:32:01",
    path: "C:\\Users\\Admin\\Downloads\\invoice.exe",
    impact: "Data Exfiltration Risk"
  },
  {
    id: 2,
    name: "Worm.Win32.NetSky",
    level: "Critical",
    vector: "Network exploit",
    sourceIp: "192.168.1.105",
    timestamp: "2024-03-15 09:15:44",
    path: "C:\\Windows\\System32\\drivers\\netutil.sys",
    impact: "Network Propagation"
  }
];

export const ThreatDashboard = () => {
  const [threats, setThreats] = React.useState(MOCK_THREATS);

  React.useEffect(() => {
    fetch('/api/threats')
      .then(res => res.json())
      .then(data => setThreats(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="card" style={{ gridColumn: 'span 12' }}>
      <div className="card-header">
        <h2 className="card-title">
          <ShieldAlert size={20} color="var(--accent-red)" /> AI-Classified Threat Detections
        </h2>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <span className="tag tag-red" style={{ background: 'rgba(255, 62, 62, 0.1)', color: 'var(--accent-red)' }}>{threats.length} ACTIVE THREATS</span>
          <span className="tag tag-blue" style={{ background: 'rgba(0, 242, 255, 0.1)', color: 'var(--accent-blue)' }}>MODEL: CNN-SHIELD-V4</span>
        </div>
      </div>

      <div style={{ overflowX: 'auto' }}>
        <table>
          <thead>
            <tr>
              <th>IDENTIFIED THREAT</th>
              <th style={{ width: '150px' }}>AI CONFIDENCE</th>
              <th>RISK SCORE</th>
              <th>NEURAL CLASSIFICATION</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {threats.map((threat: any, index: number) => (
              <motion.tr
                key={threat.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <td>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span style={{ fontWeight: 700, letterSpacing: '0.5px' }}>{threat.name}</span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontFamily: 'JetBrains Mono' }}>{threat.path}</span>
                  </div>
                </td>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div className="progress-bar" style={{ flex: 1, height: '4px', margin: 0 }}>
                      <div className="progress-fill" style={{ width: `${90 + index * 5}%`, background: threat.level === 'Critical' ? 'var(--accent-red)' : 'var(--accent-yellow)' }}></div>
                    </div>
                    <span style={{ fontSize: '0.8rem', fontWeight: 600 }}>{90 + index * 5}%</span>
                  </div>
                </td>
                <td>
                  <span style={{ color: threat.level === 'Critical' ? 'var(--accent-red)' : 'var(--accent-yellow)', fontWeight: 800 }}>
                    {threat.level === 'Critical' ? '0.94' : '0.82'}
                  </span>
                </td>
                <td>
                  <span className="severity high" style={{ fontSize: '0.65rem', padding: '2px 8px', borderRadius: '4px', background: 'rgba(255,255,255,0.05)', border: '1px solid currentColor' }}>
                    {threat.level === 'Critical' ? 'MALICIOUS_STATIC_HIT' : 'HEURISTIC_ANOMALY'}
                  </span>
                </td>
                <td>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button className="btn" style={{ padding: '0.4rem 0.8rem', fontSize: '0.7rem' }} onClick={() => fetch(`/api/threats/${threat.id}/quarantine`, { method: 'POST' })}>ISOLATE</button>
                    <button className="btn btn-danger" style={{ padding: '0.4rem 0.8rem', fontSize: '0.7rem' }} onClick={() => fetch(`/api/threats/${threat.id}/remove`, { method: 'POST' }).then(() => setThreats(threats.filter((t: any) => t.id !== threat.id)))}>PURGE</button>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      <div style={{ marginTop: '2rem', padding: '1rem', background: 'rgba(255, 62, 62, 0.05)', borderRadius: '8px', borderLeft: '3px solid var(--accent-red)' }}>
        <h3 style={{ fontSize: '0.9rem', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '5px' }}>
          <Zap size={16} color="var(--accent-red)" /> Risk Impact Summary
        </h3>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
          System vulnerability reached threshold 84%. Immediate action required for <strong>Worm.Win32.NetSky</strong>.
          Potential lateral movement detected on local network.
        </p>
      </div>
    </div >
  );
};
