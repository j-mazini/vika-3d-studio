import { useState, useMemo } from 'react';

const techOptions = [
    { value: 'FDM - PLA Premium', label: 'FDM - PLA Premium (Peças Gerais & Mockups)' },
    { value: 'FDM - PETG Fibra de Carbono', label: 'FDM - PETG Fibra de Carbono (Engenharia)' },
    { value: 'Resina SLA - Ultra Detail 8K', label: 'Resina SLA - Ultra Detail 8K (Figures & Joias)' },
    { value: 'FDM - TPU Flexível', label: 'FDM - TPU Flexível (Borracha / Vedações)' },
];

const precisionOpts = [
    { label: 'Rápida', desc: '0.20mm', mult: 0.8 },
    { label: 'Padrão', desc: '0.12mm', mult: 1.0 },
    { label: 'Ultra 8K', desc: '0.05mm', mult: 1.5 },
];

const Calculator = () => {
    const [tech, setTech] = useState(techOptions[0].value);
    const [size, setSize] = useState(12);
    const [infill, setInfill] = useState(30);
    const [precisionMult, setPrecisionMult] = useState(1.0);

    const estimate = useMemo(() => {
        let baseRate = 35;
        if (tech.includes('Resina SLA')) baseRate = 55;
        if (tech.includes('Carbono')) baseRate = 65;

        const volumeFactor = Math.pow(size / 10, 2.2);
        const infillFactor = 1 + (infill / 100) * 0.4;

        const priceMin = Math.round(baseRate * volumeFactor * infillFactor * precisionMult);
        const priceMax = Math.round(priceMin * 1.35);
        const hours = Math.max(2, Math.round(size * 0.8 * precisionMult));

        const precLabel = precisionMult === 1.5 ? 'Ultra (0.05mm)' : (precisionMult === 1.2 ? 'Padrão (0.12mm)' : 'Rápida (0.20mm)');
        const message =
            `Olá Vika 3D Studio! Fiz uma simulação de orçamento no site:%0A%0A` +
            `• Tecnologia: ${tech}%0A` +
            `• Dimensão: ${size}cm%0A` +
            `• Preenchimento: ${infill}%25%0A` +
            `• Precisão: ${precLabel}%0A` +
            `• Estimativa: R$ ${priceMin} - R$ ${priceMax}%0A%0AGostaria de enviar meu arquivo 3D para validação!`;

        return { priceMin, priceMax, hours, waLink: `https://wa.me/5511999999999?text=${message}` };
    }, [tech, size, infill, precisionMult]);

    return (
        <section id="calculadora" className="calculator-section">
            <div className="section-header">
                <span className="section-tag">// ESTIMADOR EM TEMPO REAL</span>
                <h2 className="section-title">Calculadora de Orçamento</h2>
                <p className="section-subtitle">Ajuste as variáveis do seu modelo e obtenha uma estimativa prévia instantânea antes de enviar seus arquivos CAD/STL.</p>
            </div>

            <div className="calc-container">
                <div className="calc-inputs">
                    <div className="calc-group">
                        <label className="calc-label" htmlFor="calc-tech">
                            <span>Tecnologia &amp; Material</span>
                        </label>
                        <select id="calc-tech" className="calc-select" value={tech} onChange={e => setTech(e.target.value)}>
                            {techOptions.map(opt => (
                                <option key={opt.value} value={opt.value}>{opt.label}</option>
                            ))}
                        </select>
                    </div>

                    <div className="calc-group">
                        <label className="calc-label" htmlFor="calc-size">
                            <span>Dimensão Aproximada (Maior Eixo)</span>
                            <span className="calc-val-badge">{size} cm</span>
                        </label>
                        <input id="calc-size" type="range" min="3" max="45" value={size} className="calc-range" onChange={e => setSize(Number(e.target.value))} />
                    </div>

                    <div className="calc-group">
                        <label className="calc-label" htmlFor="calc-infill">
                            <span>Preenchimento Interno (Infill)</span>
                            <span className="calc-val-badge">{infill}%</span>
                        </label>
                        <input id="calc-infill" type="range" min="15" max="100" value={infill} step="5" className="calc-range" onChange={e => setInfill(Number(e.target.value))} />
                    </div>

                    <div className="calc-group">
                        <label className="calc-label"><span>Nível de Precisão das Camadas</span></label>
                        <div className="precision-grid">
                            {precisionOpts.map(opt => (
                                <div
                                    key={opt.mult}
                                    className={`precision-opt${precisionMult === opt.mult ? ' active' : ''}`}
                                    data-mult={opt.mult}
                                    onClick={() => setPrecisionMult(opt.mult)}
                                >
                                    <span className="prec-title">{opt.label}</span>
                                    <span className="prec-desc">{opt.desc}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="calc-summary-panel">
                    <div>
                        <div className="summary-title"><i className="fa-solid fa-chart-line"></i> Estimativa do Projeto</div>

                        <div className="estimate-price-box">
                            <span className="est-lbl">Investimento Estimado</span>
                            <div className="est-amount">R$ {estimate.priceMin} - R$ {estimate.priceMax}</div>
                            <div className="est-time">⚡ Produção estimada: ~{estimate.hours}h</div>
                        </div>

                        <div className="summary-details-list">
                            <div className="summary-row">
                                <span>Verificação Físico-Digital</span>
                                <span style={{ color: 'var(--accent-emerald)' }}>Incluída Grátis</span>
                            </div>
                            <div className="summary-row">
                                <span>Suporte &amp; Pós-Cura</span>
                                <span>Sem Costuras</span>
                            </div>
                            <div className="summary-row">
                                <span>Garantia de Ajuste</span>
                                <span>100% Garantida</span>
                            </div>
                        </div>
                    </div>

                    <a href={estimate.waLink} target="_blank" rel="noreferrer" className="btn-primary" style={{ justifyContent: 'center', width: '100%' }}>
                        <i className="fa-brands fa-whatsapp"></i> Enviar Projeto no WhatsApp
                    </a>
                </div>
            </div>
        </section>
    );
};

export default Calculator;
