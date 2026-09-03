import { useState, useEffect, useRef } from 'react';
import ThreeCanvas from './ThreeCanvas';

const phrases = [
    "REALIDADE FÍSICA 8K",
    "PROTÓTIPOS INDUSTRIAIS",
    "ENGENHARIA DE PRECISÃO",
    "PEÇAS SOB MEDIDA"
];

const Hero = () => {
    const [displayText, setDisplayText] = useState('');
    const stateRef = useRef({ phraseIdx: 0, charIdx: 0, isDeleting: false });

    useEffect(() => {
        let timeout;
        const type = () => {
            const { phraseIdx, charIdx, isDeleting } = stateRef.current;
            const currentPhrase = phrases[phraseIdx];
            let speed;

            if (isDeleting) {
                stateRef.current.charIdx = charIdx - 1;
                speed = 35;
            } else {
                stateRef.current.charIdx = charIdx + 1;
                speed = 70 + Math.random() * 30;
            }

            setDisplayText(currentPhrase.substring(0, stateRef.current.charIdx));

            if (!isDeleting && stateRef.current.charIdx === currentPhrase.length) {
                speed = 2800;
                stateRef.current.isDeleting = true;
            } else if (isDeleting && stateRef.current.charIdx === 0) {
                stateRef.current.isDeleting = false;
                stateRef.current.phraseIdx = (phraseIdx + 1) % phrases.length;
                speed = 400;
            }

            timeout = setTimeout(type, speed);
        };
        type();
        return () => clearTimeout(timeout);
    }, []);

    return (
        <section className="hero">
            <div className="hero-grid">
                <div className="hero-content">
                    <div className="hero-tag">
                        <i className="fa-solid fa-bolt"></i> Impressão 3D &amp; Engenharia Digital
                    </div>

                    <div className="printer-title-wrapper">
                        <h1 className="printed-title-static">TRANSFORMANDO IDEIAS EM</h1>
                        <div className="printed-line">
                            <span className="print-target">{displayText}</span>
                        </div>
                    </div>

                    <p className="hero-subtitle">
                        Manufatura aditiva de altíssima tolerância para protótipos industriais, peças técnicas sob medida e colecionáveis de alta definição em resina 8K.
                    </p>

                    <div className="hero-actions">
                        <a href="#calculadora" className="btn-primary">
                            <i className="fa-solid fa-sliders"></i> Simular Orçamento em Tempo Real
                        </a>
                        <a href="#materiais" className="btn-secondary">
                            <i className="fa-solid fa-atom"></i> Explorar Materiais 3D
                        </a>
                    </div>

                    <div className="hero-specs-bar">
                        <div className="spec-item">
                            <span className="spec-val">0.02 mm</span>
                            <span className="spec-lbl">Precisão Micrométrica SLA</span>
                        </div>
                        <div className="spec-item">
                            <span className="spec-val">15+ Polímeros</span>
                            <span className="spec-lbl">Carbono, TPU, ASA, Resinas</span>
                        </div>
                        <div className="spec-item">
                            <span className="spec-val">24 Horas</span>
                            <span className="spec-lbl">Prototipagem Expressa</span>
                        </div>
                    </div>
                </div>

                <ThreeCanvas />
            </div>
        </section>
    );
};

export default Hero;
