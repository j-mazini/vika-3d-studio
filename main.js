// ViKa 3D Studio - High-Precision Interactive Engine

document.addEventListener('DOMContentLoaded', () => {
    initTitlePrinterEffect();
    initThreeJSStage();
    initMaterialSimulator();
    initInstantCalculator();
    initPortfolioFilters();
});

/* ==========================================================================
   1. TITLE PRINTING EFFECT (STRICT RESERVED BOUNDS - ZERO LAYOUT SHIFT)
   ========================================================================== */
function initTitlePrinterEffect() {
    const printTarget = document.getElementById('print-title-target');
    if (!printTarget) return;

    const phrases = [
        "REALIDADE FÍSICA 8K",
        "PROTÓTIPOS INDUSTRIAIS",
        "ENGENHARIA DE PRECISÃO",
        "PEÇAS SOB MEDIDA"
    ];

    let phraseIdx = 0;
    let charIdx = 0;
    let isDeleting = false;
    let typingSpeed = 70;

    function type() {
        const currentPhrase = phrases[phraseIdx];
        
        if (isDeleting) {
            charIdx--;
            typingSpeed = 35;
        } else {
            charIdx++;
            typingSpeed = 70 + Math.random() * 30;
        }

        printTarget.textContent = currentPhrase.substring(0, charIdx);

        if (!isDeleting && charIdx === currentPhrase.length) {
            typingSpeed = 2800; // Pause at end of phrase
            isDeleting = true;
        } else if (isDeleting && charIdx === 0) {
            isDeleting = false;
            phraseIdx = (phraseIdx + 1) % phrases.length;
            typingSpeed = 400;
        }

        setTimeout(type, typingSpeed);
    }

    type();
}

/* ==========================================================================
   2. THREE.JS LIGHTWEIGHT 3D STAGE & MESH VIEWER
   ========================================================================== */
let scene, camera, renderer, meshGroup, currentGeometryShape = 'torus';
let isWireframe = false;

function initThreeJSStage() {
    const container = document.getElementById('hero-3d-canvas');
    if (!container || typeof THREE === 'undefined') return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    scene = new THREE.Scene();
    
    camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 4.8;

    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Subtle Precision Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const laserLight = new THREE.PointLight(0x00f0ff, 2.8, 40);
    laserLight.position.set(4, 4, 4);
    scene.add(laserLight);

    const backLight = new THREE.PointLight(0xffffff, 1.0, 30);
    backLight.position.set(-4, -4, -2);
    scene.add(backLight);

    meshGroup = new THREE.Group();
    scene.add(meshGroup);

    createModelMesh('torus');

    // Smooth Mouse Interaction
    let mouseX = 0, mouseY = 0;

    window.addEventListener('mousemove', (e) => {
        const windowHalfX = window.innerWidth / 2;
        const windowHalfY = window.innerHeight / 2;
        mouseX = (e.clientX - windowHalfX) * 0.0006;
        mouseY = (e.clientY - windowHalfY) * 0.0006;
    });

    function animate() {
        requestAnimationFrame(animate);

        meshGroup.rotation.y += 0.006 + mouseX * 0.1;
        meshGroup.rotation.x += mouseY * 0.1;

        renderer.render(scene, camera);
    }
    animate();

    window.addEventListener('resize', () => {
        if (!container) return;
        const w = container.clientWidth;
        const h = container.clientHeight;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
    });

    const toggleMeshBtn = document.getElementById('btn-toggle-mesh');
    const toggleWireBtn = document.getElementById('btn-toggle-wireframe');

    if (toggleMeshBtn) {
        toggleMeshBtn.addEventListener('click', () => {
            currentGeometryShape = currentGeometryShape === 'torus' ? 'icosa' : (currentGeometryShape === 'icosa' ? 'knot' : 'torus');
            createModelMesh(currentGeometryShape);
        });
    }

    if (toggleWireBtn) {
        toggleWireBtn.addEventListener('click', () => {
            isWireframe = !isWireframe;
            createModelMesh(currentGeometryShape);
        });
    }
}

function createModelMesh(type) {
    while (meshGroup.children.length > 0) {
        meshGroup.remove(meshGroup.children[0]);
    }

    let geometry;
    if (type === 'torus') {
        geometry = new THREE.TorusKnotGeometry(1.0, 0.32, 128, 32);
    } else if (type === 'icosa') {
        geometry = new THREE.IcosahedronGeometry(1.4, 2);
    } else {
        geometry = new THREE.DodecahedronGeometry(1.3, 1);
    }

    const material = new THREE.MeshPhysicalMaterial({
        color: 0x0E1017,
        emissive: 0x040810,
        roughness: 0.2,
        metalness: 0.85,
        clearcoat: 0.8,
        wireframe: isWireframe
    });

    const mesh = new THREE.Mesh(geometry, material);
    meshGroup.add(mesh);

    if (!isWireframe) {
        const wireGeo = new THREE.WireframeGeometry(geometry);
        const wireMat = new THREE.LineBasicMaterial({ 
            color: 0x00ffff, 
            transparent: true, 
            opacity: 0.35,
            depthWrite: false
        });
        const wireLines = new THREE.LineSegments(wireGeo, wireMat);
        meshGroup.add(wireLines);
    }
}

/* ==========================================================================
   3. MATERIAL SIMULATOR DATA & LIGHTWEIGHT INTERACTIVITY
   ========================================================================== */
const materialsData = {
    'petg-cf': {
        name: 'PETG Fibra de Carbono',
        tech: 'Tecnologia FDM Industrial',
        badge: 'Grau Engenharia',
        desc: 'Polímero técnico de alta tenacidade reforçado com 15% de microfibras de carbono. Entrega rigidez extrema, tolerância dimensional perfeita e acabamento fosco técnico sem marcas visíveis de camadas.',
        stats: { resistencia: 95, detalhamento: 82, termica: 90, flexibilidade: 20 },
        tags: ['Resistência Mecânica', 'Peças de Engrenagem', 'Resistente a Impacto', 'Matte Carbon']
    },
    'sla-8k': {
        name: 'Resina SLA Ultra-Detail 8K',
        tech: 'Fotopolimerização UV (SLA/DLP)',
        badge: 'Micrométrico (0.02mm)',
        desc: 'Resina fotopolimérica líquida curada por feixe de luz UV com altíssima resolução. Superfície lisa similar a plásticos injetados industriais, ideal para miniaturas colecionáveis, action figures e matrizes de joias.',
        stats: { resistencia: 65, detalhamento: 99, termica: 55, flexibilidade: 10 },
        tags: ['Colecionáveis 8K', 'Superfície Lisa', 'Alta Precisão', 'Matrizes de Fundição']
    },
    'silk-gold': {
        name: 'PLA Silk Dourado Gradiente',
        tech: 'FDM Artístico & Design',
        badge: 'Acabamento Acetinado',
        desc: 'Termoplástico biodegradável enriquecido com elastômeros refletores de luz. Proporciona um brilho metálico acetinado espetacular, transformando vasos paramétricos, peças decorativas e troféus em obras de arte.',
        stats: { resistencia: 60, detalhamento: 88, termica: 45, flexibilidade: 35 },
        tags: ['Brilho Metálico', 'Design de Interiores', 'Arquitetura', 'Sem Necessidade de Pintura']
    },
    'tpu-flex': {
        name: 'TPU Flexível 95A',
        tech: 'Elastômero FDM',
        badge: 'Super Flexível',
        desc: 'Borracha termoplástica flexível capaz de esticar e deformar retornando à forma original sem fratura. Excelente para vedações industriais, solados, protetores contra queda e amortecedores.',
        stats: { resistencia: 90, detalhamento: 75, termica: 70, flexibilidade: 98 },
        tags: ['Absorção de Impacto', 'Resistente a Rasgo', 'Capas e Vedações', 'Elástico']
    },
    'asa-uv': {
        name: 'ASA Pro UV-Shield',
        tech: 'FDM Automotivo',
        badge: 'Resistente a Sol e Chuva',
        desc: 'Material de engenharia formulado para suportar intempéries extremas, raios ultravioleta e variação de temperatura sem amarelar ou perder rigidez. Escolha padrão para peças automotivas e marinhas.',
        stats: { resistencia: 92, detalhamento: 80, termica: 98, flexibilidade: 25 },
        tags: ['Uso Externo', 'Automotivo', 'Resistente a UV', 'Alta Estabilidade']
    }
};

function initMaterialSimulator() {
    const buttons = document.querySelectorAll('.material-card-btn');
    if (buttons.length === 0) return;

    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            buttons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const matKey = btn.getAttribute('data-mat');
            updateMaterialPanel(matKey);
        });
    });
}

function updateMaterialPanel(key) {
    const data = materialsData[key];
    if (!data) return;

    document.getElementById('mat-display-name').textContent = data.name;
    document.getElementById('mat-display-badge').textContent = data.badge;
    document.getElementById('mat-display-desc').textContent = data.desc;

    document.getElementById('bar-resistencia').style.width = data.stats.resistencia + '%';
    document.getElementById('val-resistencia').textContent = data.stats.resistencia + '%';

    document.getElementById('bar-detalhamento').style.width = data.stats.detalhamento + '%';
    document.getElementById('val-detalhamento').textContent = data.stats.detalhamento + '%';

    document.getElementById('bar-termica').style.width = data.stats.termica + '%';
    document.getElementById('val-termica').textContent = data.stats.termica + '%';

    document.getElementById('bar-flexibilidade').style.width = data.stats.flexibilidade + '%';
    document.getElementById('val-flexibilidade').textContent = data.stats.flexibilidade + '%';

    const tagsContainer = document.getElementById('mat-display-tags');
    tagsContainer.innerHTML = data.tags.map(t => `<span class="mat-tag">${t}</span>`).join('');
}

/* ==========================================================================
   4. LIGHTWEIGHT CALCULATOR LOGIC
   ========================================================================== */
let selectedPrecisionMultiplier = 1.0;

function initInstantCalculator() {
    const calcTech = document.getElementById('calc-tech');
    const calcSize = document.getElementById('calc-size');
    const calcInfill = document.getElementById('calc-infill');
    const precisionOpts = document.querySelectorAll('.precision-opt');

    if (!calcTech || !calcSize) return;

    calcTech.addEventListener('change', calculateEstimate);
    calcSize.addEventListener('input', (e) => {
        document.getElementById('val-size-display').textContent = e.target.value + ' cm';
        calculateEstimate();
    });
    calcInfill.addEventListener('input', (e) => {
        document.getElementById('val-infill-display').textContent = e.target.value + '%';
        calculateEstimate();
    });

    precisionOpts.forEach(opt => {
        opt.addEventListener('click', () => {
            precisionOpts.forEach(o => o.classList.remove('active'));
            opt.classList.add('active');
            selectedPrecisionMultiplier = parseFloat(opt.getAttribute('data-mult'));
            calculateEstimate();
        });
    });

    calculateEstimate();
}

function calculateEstimate() {
    const techVal = document.getElementById('calc-tech').value;
    const sizeVal = parseFloat(document.getElementById('calc-size').value);
    const infillVal = parseFloat(document.getElementById('calc-infill').value);

    let baseRate = 35;
    if (techVal.includes('Resina SLA')) baseRate = 55;
    if (techVal.includes('Carbono')) baseRate = 65;

    const volumeFactor = Math.pow(sizeVal / 10, 2.2);
    const infillFactor = 1 + (infillVal / 100) * 0.4;

    const estimatedPriceMin = Math.round(baseRate * volumeFactor * infillFactor * selectedPrecisionMultiplier);
    const estimatedPriceMax = Math.round(estimatedPriceMin * 1.35);

    const estimatedHours = Math.max(2, Math.round(sizeVal * 0.8 * selectedPrecisionMultiplier));

    document.getElementById('calc-price-display').textContent = `R$ ${estimatedPriceMin} - R$ ${estimatedPriceMax}`;
    document.getElementById('calc-time-display').textContent = `⚡ Produção estimada: ~${estimatedHours}h`;

    const waBtn = document.getElementById('calc-whatsapp-btn');
    if (waBtn) {
        const messageText = `Olá Vika 3D Studio! Fiz uma simulação de orçamento no site:%0A%0A` +
            `• Tecnologia: ${techVal}%0A` +
            `• Dimensão: ${sizeVal}cm%0A` +
            `• Preenchimento: ${infillVal}%0A` +
            `• Precisão: ${selectedPrecisionMultiplier === 1.5 ? 'Ultra (0.05mm)' : (selectedPrecisionMultiplier === 1.2 ? 'Padrão (0.12mm)' : 'Rápida (0.20mm)')}%0A` +
            `• Estimativa: R$ ${estimatedPriceMin} - R$ ${estimatedPriceMax}%0A%0AGostaria de enviar meu arquivo 3D para validação!`;

        waBtn.href = `https://wa.me/5511999999999?text=${messageText}`;
    }
}

/* ==========================================================================
   5. PORTFOLIO FILTERING
   ========================================================================== */
function initPortfolioFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const cards = document.querySelectorAll('.portfolio-card');

    if (filterBtns.length === 0) return;

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.getAttribute('data-filter');

            cards.forEach(card => {
                const category = card.getAttribute('data-category');
                if (filter === 'all' || category === filter) {
                    card.style.display = 'block';
                    card.style.opacity = '1';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}
