import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

const ThreeCanvas = () => {
    const containerRef = useRef(null);
    const sceneRef = useRef({});
    const [currentShape, setCurrentShape] = useState('torus');
    const [wireframeOnly, setWireframeOnly] = useState(false);
    const currentShapeRef = useRef('torus');
    const isWireframeRef = useRef(false);

    function createModelMesh(type, isWireframe, scene, meshGroup) {
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

            const wireMatCore = new THREE.LineBasicMaterial({
                color: 0x00ffff,
                transparent: true,
                opacity: 0.8,
                depthWrite: false,
                blending: THREE.AdditiveBlending
            });
            const wireLinesCore = new THREE.LineSegments(wireGeo, wireMatCore);
            meshGroup.add(wireLinesCore);

            const wireMatGlow = new THREE.LineBasicMaterial({
                color: 0x00ffff,
                transparent: true,
                opacity: 0.3,
                depthWrite: false,
                blending: THREE.AdditiveBlending
            });
            const wireLinesGlow = new THREE.LineSegments(wireGeo, wireMatGlow);
            wireLinesGlow.scale.set(1.02, 1.02, 1.02);
            meshGroup.add(wireLinesGlow);
        }
    }

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const width = container.clientWidth;
        const height = container.clientHeight;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
        camera.position.z = 4.8;

        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(width, height);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        container.appendChild(renderer.domElement);

        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        scene.add(ambientLight);
        const laserLight = new THREE.PointLight(0x00f0ff, 2.8, 40);
        laserLight.position.set(4, 4, 4);
        scene.add(laserLight);
        const backLight = new THREE.PointLight(0xffffff, 1.0, 30);
        backLight.position.set(-4, -4, -2);
        scene.add(backLight);

        const meshGroup = new THREE.Group();
        scene.add(meshGroup);

        sceneRef.current = { scene, camera, renderer, meshGroup };

        createModelMesh(currentShapeRef.current, isWireframeRef.current, scene, meshGroup);

        let mouseX = 0, mouseY = 0;
        const handleMouseMove = (e) => {
            mouseX = (e.clientX - window.innerWidth / 2) * 0.0006;
            mouseY = (e.clientY - window.innerHeight / 2) * 0.0006;
        };
        window.addEventListener('mousemove', handleMouseMove);

        let animId;
        const animate = () => {
            animId = requestAnimationFrame(animate);
            meshGroup.rotation.y += 0.006 + mouseX * 0.1;
            meshGroup.rotation.x += mouseY * 0.1;
            renderer.render(scene, camera);
        };
        animate();

        const handleResize = () => {
            const w = container.clientWidth;
            const h = container.clientHeight;
            camera.aspect = w / h;
            camera.updateProjectionMatrix();
            renderer.setSize(w, h);
        };
        window.addEventListener('resize', handleResize);

        return () => {
            cancelAnimationFrame(animId);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('resize', handleResize);
            renderer.dispose();
            if (container.contains(renderer.domElement)) {
                container.removeChild(renderer.domElement);
            }
        };
    }, []);

    const toggleShape = () => {
        const shapes = ['torus', 'icosa', 'knot'];
        const next = shapes[(shapes.indexOf(currentShapeRef.current) + 1) % shapes.length];
        currentShapeRef.current = next;
        setCurrentShape(next);
        const { scene, meshGroup } = sceneRef.current;
        if (meshGroup) createModelMesh(next, isWireframeRef.current, scene, meshGroup);
    };

    const toggleWireframe = () => {
        const next = !isWireframeRef.current;
        isWireframeRef.current = next;
        setWireframeOnly(next);
        const { scene, meshGroup } = sceneRef.current;
        if (meshGroup) createModelMesh(currentShapeRef.current, next, scene, meshGroup);
    };

    return (
        <div className="hero-canvas-container">
            <div ref={containerRef} id="hero-3d-canvas"></div>
            <div className="canvas-controls-overlay">
                <span><i className="fa-solid fa-cube"></i> Objeto 3D Interativo</span>
                <div className="canvas-btn-group">
                    <button onClick={toggleShape} className="canvas-btn" title="Alternar Geometria">
                        <i className="fa-solid fa-arrows-rotate"></i> Geometria
                    </button>
                    <button onClick={toggleWireframe} className="canvas-btn" title="Modo Wireframe">
                        <i className="fa-solid fa-border-none"></i> Wireframe
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ThreeCanvas;
