import { useState } from 'react';

const materialsData = {
    'petg-cf': {
        name: 'PETG Fibra de Carbono',
        tech: 'Tecnologia FDM Industrial',
        badge: 'Grau Engenharia',
        icon: 'fa-gear',
        techLabel: 'FDM Industrial • 15% Carbon Fiber',
        desc: 'Polímero técnico de alta tenacidade reforçado com 15% de microfibras de carbono. Entrega rigidez extrema, tolerância dimensional perfeita e acabamento fosco técnico sem marcas visíveis de camadas.',
        stats: { resistencia: 95, detalhamento: 82, termica: 90, flexibilidade: 20 },
        tags: ['Resistência Mecânica', 'Peças de Engrenagem', 'Resistente a Impacto', 'Matte Carbon']
    },
    'sla-8k': {
        name: 'Resina SLA Ultra-Detail 8K',
        tech: 'Fotopolimerização UV (SLA/DLP)',
        badge: 'Micrométrico (0.02mm)',
        icon: 'fa-chess-knight',
        techLabel: 'SLA/DLP • Camada 0.02mm',
        desc: 'Resina fotopolimérica líquida curada por feixe de luz UV com altíssima resolução. Superfície lisa similar a plásticos injetados industriais, ideal para miniaturas colecionáveis, action figures e matrizes de joias.',
        stats: { resistencia: 65, detalhamento: 99, termica: 55, flexibilidade: 10 },
        tags: ['Colecionáveis 8K', 'Superfície Lisa', 'Alta Precisão', 'Matrizes de Fundição']
    },
    'silk-gold': {
        name: 'PLA Silk Dourado Gradiente',
        tech: 'FDM Artístico & Design',
        badge: 'Acabamento Acetinado',
        icon: 'fa-wand-magic-sparkles',
        techLabel: 'FDM Design • Brilho Acetinado',
        desc: 'Termoplástico biodegradável enriquecido com elastômeros refletores de luz. Proporciona um brilho metálico acetinado espetacular, transformando vasos paramétricos, peças decorativas e troféus em obras de arte.',
        stats: { resistencia: 60, detalhamento: 88, termica: 45, flexibilidade: 35 },
        tags: ['Brilho Metálico', 'Design de Interiores', 'Arquitetura', 'Sem Necessidade de Pintura']
    },
    'tpu-flex': {
        name: 'TPU Flexível 95A',
        tech: 'Elastômero FDM',
        badge: 'Super Flexível',
        icon: 'fa-shoe-prints',
        techLabel: 'Elastômero • Alta Memória',
        desc: 'Borracha termoplástica flexível capaz de esticar e deformar retornando à forma original sem fratura. Excelente para vedações industriais, solados, protetores contra queda e amortecedores.',
        stats: { resistencia: 90, detalhamento: 75, termica: 70, flexibilidade: 98 },
        tags: ['Absorção de Impacto', 'Resistente a Rasgo', 'Capas e Vedações', 'Elástico']
    },
    'asa-uv': {
        name: 'ASA Pro UV-Shield',
        tech: 'FDM Automotivo',
        badge: 'Resistente a Sol e Chuva',
        icon: 'fa-sun',
        techLabel: 'Grau Automotivo • Uso Externo',
        desc: 'Material de engenharia formulado para suportar intempéries extremas, raios ultravioleta e variação de temperatura sem amarelar ou perder rigidez. Escolha padrão para peças automotivas e marinhas.',
        stats: { resistencia: 92, detalhamento: 80, termica: 98, flexibilidade: 25 },
        tags: ['Uso Externo', 'Automotivo', 'Resistente a UV', 'Alta Estabilidade']
    }
};

const StatBar = ({ label, value }) => (
    <div className="stat-row">
        <div className="stat-meta">
            <span>{label}</span>
            <span className="calc-val-badge">{value}%</span>
        </div>
        <div className="stat-bar-bg">
            <div className="stat-bar-fill" style={{ width: `${value}%`, transition: 'width 0.4s ease' }}></div>
        </div>
    </div>
);

const MaterialSimulator = () => {
    const [activeMat, setActiveMat] = useState('petg-cf');
    const data = materialsData[activeMat];

    return (
        <section id="materiais" className="materials-section">
            <div className="section-header">
                <span className="section-tag">// LABORATÓRIO POLIMÉRICO</span>
                <h2 className="section-title">Simulador de Materiais 3D</h2>
                <p className="section-subtitle">Selecione o polímero ideal para as exigências mecânicas, estéticas e térmicas do seu projeto.</p>
            </div>

            <div className="materials-grid">
                <div className="material-selector-list">
                    {Object.entries(materialsData).map(([key, mat]) => (
                        <button
                            key={key}
                            className={`material-card-btn${activeMat === key ? ' active' : ''}`}
                            onClick={() => setActiveMat(key)}
                        >
                            <div className="mat-info">
                                <div className="mat-icon"><i className={`fa-solid ${mat.icon}`}></i></div>
                                <div>
                                    <div className="mat-name">{mat.name}</div>
                                    <div className="mat-tech">{mat.techLabel}</div>
                                </div>
                            </div>
                            <i className="fa-solid fa-chevron-right"></i>
                        </button>
                    ))}
                </div>

                <div className="material-preview-panel">
                    <div>
                        <div className="mat-preview-header">
                            <h3 className="mat-title-large">{data.name}</h3>
                            <span className="mat-badge-type">{data.badge}</span>
                        </div>
                        <p className="mat-desc">{data.desc}</p>
                    </div>

                    <div>
                        <div className="mat-stats-list">
                            <StatBar label="Resistência Mecânica & Impacto" value={data.stats.resistencia} />
                            <StatBar label="Precisão de Detalhes Superficiais" value={data.stats.detalhamento} />
                            <StatBar label="Resistência Térmica" value={data.stats.termica} />
                            <StatBar label="Flexibilidade & Deformação" value={data.stats.flexibilidade} />
                        </div>

                        <div className="mat-tags">
                            {data.tags.map(tag => (
                                <span key={tag} className="mat-tag">{tag}</span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default MaterialSimulator;
