const Footer = () => (
    <footer className="footer">
        <div className="footer-container">
            <a href="#" className="logo-brand">
                <div className="logo-icon">
                    <i className="fa-solid fa-cube"></i>
                </div>
                VIKA <span>3D STUDIO</span>
            </a>

            <div className="footer-socials">
                <a href="https://www.instagram.com/vikastudios3d" target="_blank" rel="noreferrer" className="social-link" title="Instagram">
                    <i className="fa-brands fa-instagram"></i>
                </a>
                <a href="https://wa.me/5511999999999" target="_blank" rel="noreferrer" className="social-link" title="WhatsApp">
                    <i className="fa-brands fa-whatsapp"></i>
                </a>
                <a href="mailto:contato@vikastudios3d.com" className="social-link" title="E-mail">
                    <i className="fa-solid fa-envelope"></i>
                </a>
            </div>
        </div>

        <div className="footer-bottom">
            <p>&copy; 2026 ViKa 3D Studio. Engenharia de Precisão &amp; Impressão 3D Avançada. Todos os direitos reservados.</p>
        </div>
    </footer>
);

export default Footer;
