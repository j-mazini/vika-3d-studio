import React from 'react';

const Navbar = () => {
    return (
        <header>
            <nav className="navbar">
                <div className="nav-container">
                    <a href="#" className="logo-brand">
                        <div className="logo-icon">
                            <i className="fa-solid fa-cube"></i>
                        </div>
                        VIKA <span>3D</span>
                    </a>

                    <ul className="nav-links">
                        <li><a href="#materiais" className="nav-link"><i className="fa-solid fa-layer-group"></i> Materiais</a></li>
                        <li><a href="#calculadora" className="nav-link"><i className="fa-solid fa-calculator"></i> Calculadora</a></li>
                        <li><a href="#portfolio" className="nav-link"><i className="fa-solid fa-shapes"></i> Portfólio</a></li>
                        <li><a href="#esteira" className="nav-link"><i className="fa-solid fa-microchip"></i> Processo</a></li>
                    </ul>

                    <div>
                        <a href="#calculadora" className="btn-primary">
                            <i className="fa-brands fa-whatsapp"></i> Pedir Orçamento
                        </a>
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Navbar;
