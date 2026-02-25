const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Mock Data
let systemStatus = {
    secure: true,
    healthScore: 98,
    firewall: "Active",
    antivirus: "Running",
    lastScan: new Date().toISOString()
};

let threats = [
    {
        id: 1,
        name: "Trojan.Generic.Kryptik",
        level: "High",
        vector: "Email attachment",
        sourceIp: "185.234.12.45",
        timestamp: new Date(Date.now() - 3600000).toISOString(),
        files: ["C:\\Users\\Admin\\Downloads\\invoice.exe"],
        impact: "High - Credential Theft Potential"
    },
    {
        id: 2,
        name: "Worm.Win32.NetSky",
        level: "Critical",
        vector: "Network exploit",
        sourceIp: "192.168.1.105",
        timestamp: new Date(Date.now() - 86400000).toISOString(),
        files: ["C:\\Windows\\System32\\drivers\\netutil.sys"],
        impact: "Critical - Network Propagation"
    }
];

let logs = [
    { id: 101, action: "Scan Started", target: "Full System", timestamp: new Date(Date.now() - 5000000).toISOString() },
    { id: 102, action: "Threat Detected", target: "Trojan.Generic.Kryptik", timestamp: new Date(Date.now() - 3600000).toISOString() },
    { id: 103, action: "Quarantine", target: "Trojan.Generic.Kryptik", timestamp: new Date(Date.now() - 3000000).toISOString() }
];

// API Endpoints
app.get('/api/system-status', (req, res) => {
    res.json(systemStatus);
});

app.get('/api/threats', (req, res) => {
    res.json(threats);
});

app.get('/api/logs', (req, res) => {
    res.json(logs);
});

app.post('/api/scan', (req, res) => {
    // Simulate a scan start
    setTimeout(() => {
        logs.unshift({
            id: Date.now(),
            action: "Scan Completed",
            target: "Full System",
            timestamp: new Date().toISOString()
        });
    }, 5000);

    res.json({ message: "Scan initiated", status: "In Progress" });
});

app.post('/api/threats/:id/quarantine', (req, res) => {
    const { id } = req.params;
    logs.unshift({
        id: Date.now(),
        action: "Quarantine",
        target: `Threat ID: ${id}`,
        timestamp: new Date().toISOString()
    });
    res.json({ message: `Threat ${id} quarantined successfully` });
});

app.post('/api/threats/:id/remove', (req, res) => {
    const { id } = req.params;
    threats = threats.filter(t => t.id !== parseInt(id));
    logs.unshift({
        id: Date.now(),
        action: "Removal",
        target: `Threat ID: ${id}`,
        timestamp: new Date().toISOString()
    });
    res.json({ message: `Threat ${id} removed successfully` });
});
const path = require('path');

// Serve frontend if in production
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/dist')));

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../client/dist', 'index.html'));
    });
}

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
