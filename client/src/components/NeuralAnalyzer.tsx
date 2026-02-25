import React, { useState } from 'react';
import { Brain, Fingerprint, Zap, Layers, Cpu, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const NeuralAnalyzer = () => {
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [progress, setProgress] = useState(0);
    const [confidence, setConfidence] = useState(99.82);

    const startAnalysis = () => {
        setIsAnalyzing(true);
        setProgress(0);
        const interval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setIsAnalyzing(false);
                    return 100;
                }
                setConfidence(98 + Math.random() * 2);
                return prev + 1;
            });
        }, 50);
    };

    return (
        <div className="card" style={{ gridColumn: 'span 12', border: '1px solid var(--accent-purple)' }}>
            {isAnalyzing && <div className="scanning-line" style={{ background: 'var(--accent-purple)', boxShadow: '0 0 15px var(--accent-purple)' }}></div>}

            <div className="card-header">
                <h2 className="card-title" style={{ color: 'var(--accent-purple)' }}>
                    <Brain size={20} /> Neural Threat Intelligence Analyzer
                </h2>
                <div style={{ background: 'rgba(189, 0, 255, 0.1)', padding: '4px 12px', borderRadius: '20px', fontSize: '0.7rem', fontWeight: 700, color: 'var(--accent-purple)' }}>
                    MODEL: DEEP_SHIELD_V2.BIN
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '3rem' }}>
                <div>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1.5rem', lineHeight: 1.6 }}>
                        Our deep learning engine utilizes multi-layer perceptrons to analyze binary entropy and polymorphic code structures.
                        Real-time inference is running on the local edge.
                    </p>

                    <div className="neural-viz" style={{ height: '150px', background: 'rgba(0,0,0,0.2)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'space-around', position: 'relative' }}>
                        {[1, 2, 3, 4].map(layer => (
                            <div key={layer} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                {[1, 2, 3].map(node => (
                                    <motion.div
                                        key={node}
                                        animate={isAnalyzing ? { scale: [1, 1.2, 1], backgroundColor: ['#8b949e', '#bd00ff', '#8b949e'] } : {}}
                                        transition={{ duration: 0.5, repeat: Infinity, delay: layer * 0.1 + node * 0.1 }}
                                        style={{ width: '10px', height: '10px', background: 'var(--text-secondary)', borderRadius: '50%' }}
                                    />
                                ))}
                            </div>
                        ))}
                    </div>

                    <button
                        className="btn btn-purple"
                        style={{ marginTop: '1.5rem', width: '100%', borderColor: 'var(--accent-purple)', color: 'var(--accent-purple)' }}
                        onClick={startAnalysis}
                        disabled={isAnalyzing}
                    >
                        {isAnalyzing ? `PROCESSING FEATURES... ${progress}%` : 'TRIGGER DEEP NEURAL INFERENCE'}
                    </button>
                </div>

                <div style={{ background: 'rgba(255,255,255,0.02)', padding: '1.5rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
                    <h3 style={{ fontSize: '0.75rem', fontWeight: 800, letterSpacing: '1px', marginBottom: '1rem', opacity: 0.6 }}>MODEL CONFIDENCE</h3>
                    <div style={{ textAlign: 'center', margin: '1.5rem 0' }}>
                        <span style={{ fontSize: '2.5rem', fontWeight: 800 }}>{confidence.toFixed(2)}%</span>
                        <div className="progress-bar" style={{ height: '4px', marginTop: '10px' }}>
                            <div className="progress-fill" style={{ width: `${confidence}%`, background: 'var(--accent-purple)' }}></div>
                        </div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem' }}>
                            <span style={{ opacity: 0.5 }}>ANOMALY_DETECTION</span>
                            <span style={{ color: 'var(--accent-green)' }}>STABLE</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem' }}>
                            <span style={{ opacity: 0.5 }}>LATENCY_INFERENCE</span>
                            <span style={{ color: 'var(--accent-blue)' }}>12ms</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
