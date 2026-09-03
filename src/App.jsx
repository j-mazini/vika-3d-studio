import './index.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import MaterialSimulator from './components/MaterialSimulator';
import Calculator from './components/Calculator';
import Portfolio from './components/Portfolio';
import Workflow from './components/Workflow';
import Footer from './components/Footer';

function App() {
    return (
        <>
            <div className="cyber-grid-bg"></div>
            <Navbar />
            <main>
                <Hero />
                <MaterialSimulator />
                <Calculator />
                <Portfolio />
                <Workflow />
            </main>
            <Footer />
        </>
    );
}

export default App;
