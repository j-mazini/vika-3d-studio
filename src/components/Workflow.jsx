const steps = [
    { num: '01', icon: 'fa-cube', title: 'Análise CAD & Slicing', desc: 'Inspeção de malha 3D, correção de normais e otimização da orientação de fatiamento para garantir máxima resistência estrutural.' },
    { num: '02', icon: 'fa-flask', title: 'Calibração Polimérica', desc: 'Ajuste de temperatura do bocal, mesa térmica e compensação de encolhimento para o polímero específico selecionado.' },
    { num: '03', icon: 'fa-print', title: 'Impressão Submilimétrica', desc: 'Deposição ou polimerização UV em ambientes com temperatura e umidade controladas para fusão homogênea.' },
    { num: '04', icon: 'fa-sparkles', title: 'Pós-Processamento & Cura', desc: 'Remoção de suportes de precisão, lavagem ultrassônica em IPA, tratamento térmico/UV e polimento curatorial final.' },
];

const Workflow = () => (
    <section id="esteira" className="workflow-section">
        <div className="section-header">
            <span className="section-tag">// FLUXO DE MANUFATURA ADITIVA</span>
            <h2 className="section-title">Do Modelo 3D ao Objeto Físico</h2>
            <p className="section-subtitle">Conheça as etapas rigorosas de curadoria técnica aplicadas a cada peça impressa.</p>
        </div>

        <div className="timeline-grid">
            {steps.map(step => (
                <div key={step.num} className="timeline-step">
                    <span className="step-num">{step.num}</span>
                    <div className="step-icon-box">
                        <i className={`fa-solid ${step.icon}`}></i>
                    </div>
                    <h3 className="step-title">{step.title}</h3>
                    <p className="step-desc">{step.desc}</p>
                </div>
            ))}
        </div>
    </section>
);

export default Workflow;
