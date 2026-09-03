import { useState } from 'react';

const portfolioItems = [
    {
        id: 1,
        category: 'industrial',
        img: '/portfolio_industrial.png',
        alt: 'Engrenagem Industrial PETG Carbono',
        tag: 'FDM Industrial',
        title: 'Conjunto de Engrenagens PETG-CF',
        spec: '15% Carbon Fiber • Infill 80% • Resolução 0.12mm'
    },
    {
        id: 2,
        category: 'figure',
        img: '/portfolio_figure.png',
        alt: 'Action Figure Resina SLA 8K',
        tag: 'Resina SLA 8K',
        title: 'Estátua Guerrier Cyberpunk',
        spec: 'Resina SLA Ultra-Detail • Camada 0.02mm'
    },
    {
        id: 3,
        category: 'design',
        img: '/portfolio_design.png',
        alt: 'Vaso Paramétrico PLA Silk Gold',
        tag: 'Artístico & Design',
        title: 'Vaso Escultórico Paramétrico',
        spec: 'PLA Silk Gold Gradiente • Acabamento Acetinado'
    },
    {
        id: 4,
        category: 'custom',
        img: '/portfolio_custom.png',
        alt: 'Admissão Automotiva ASA Pro',
        tag: 'Automotivo',
        title: 'Coletor de Admissão ASA UV Pro',
        spec: 'Resistente a 100°C • Estabilidade Térmica'
    }
];

const filters = [
    { label: 'Todos os Projetos', value: 'all' },
    { label: 'Industrial & Engenharia', value: 'industrial' },
    { label: 'Colecionáveis SLA 8K', value: 'figure' },
    { label: 'Design & Arquitetura', value: 'design' },
    { label: 'Componentes Especiais', value: 'custom' },
];

const Portfolio = () => {
    const [activeFilter, setActiveFilter] = useState('all');

    const visible = portfolioItems.filter(
        item => activeFilter === 'all' || item.category === activeFilter
    );

    return (
        <section id="portfolio" className="portfolio-section">
            <div className="section-header">
                <span className="section-tag">// GALERIA DE PROJETOS RECENTES</span>
                <h2 className="section-title">Portfólio de Alta Definição</h2>
                <p className="section-subtitle">Exemplos reais de impressões desenvolvidas no estúdio com máxima fidelidade e acabamento técnico.</p>
            </div>

            <div className="portfolio-filters">
                {filters.map(f => (
                    <button
                        key={f.value}
                        className={`filter-btn${activeFilter === f.value ? ' active' : ''}`}
                        onClick={() => setActiveFilter(f.value)}
                    >
                        {f.label}
                    </button>
                ))}
            </div>

            <div className="portfolio-grid">
                {visible.map(item => (
                    <div key={item.id} className="portfolio-card">
                        <div className="card-img-wrapper">
                            <img src={item.img} alt={item.alt} loading="lazy" />
                            <div className="card-overlay">
                                <span className="card-tag">{item.tag}</span>
                                <h3 className="card-title">{item.title}</h3>
                                <span className="card-meta-spec">{item.spec}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Portfolio;
