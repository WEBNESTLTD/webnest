import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

function checkWebGLSupport() {
  if (typeof window === 'undefined') return true;
  try {
    const canvas = document.createElement('canvas');
    return Boolean(
      window.WebGLRenderingContext &&
        (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
    );
  } catch {
    return false;
  }
}

export default function Hero3DCanvas({ shouldReduceMotion = false }) {
  const mountRef = useRef(null);
  const [hasWebGL] = useState(checkWebGLSupport);

  useEffect(() => {
    if (!hasWebGL) return;

    const container = mountRef.current;
    if (!container) return;

    let width = container.clientWidth || window.innerWidth;
    let height = container.clientHeight || window.innerHeight;

    // 2. Scene, Camera & Renderer
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
    camera.position.set(0, 0, 7.2);

    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
      });
    } catch {
      setHasWebGL(false);
      return;
    }

    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;

    container.appendChild(renderer.domElement);

    // 3. Cinematic Studio Lighting (Warm Gold, Obsidian & Deep Burgundy)
    const ambientLight = new THREE.AmbientLight(0x2a221b, 1.2);
    scene.add(ambientLight);

    // Key Light: Champagne Gold
    const keyLight = new THREE.PointLight(0xcda46a, 4.5, 25);
    keyLight.position.set(4.5, 4.2, 5.0);
    scene.add(keyLight);

    // Rim Light: Deep Burgundy / Ruby
    const rimLight = new THREE.PointLight(0x8b2b3f, 4.8, 20);
    rimLight.position.set(-4.0, 3.5, -3.5);
    scene.add(rimLight);

    // Fill Light: Soft Warm Ivory
    const fillLight = new THREE.DirectionalLight(0xf5f0e8, 1.2);
    fillLight.position.set(-3.5, -2.5, 4.0);
    scene.add(fillLight);

    // Bronze Underlight
    const underLight = new THREE.PointLight(0x80603d, 2.5, 18);
    underLight.position.set(0, -4.5, 2.0);
    scene.add(underLight);

    // 4. Sculptural Composition Group
    const rootGroup = new THREE.Group();
    scene.add(rootGroup);

    // Geometry & Material Cache for clean disposal
    const disposables = [];

    const trackDisposable = (obj) => {
      disposables.push(obj);
      return obj;
    };

    // Shared Luxury Physical Materials
    const goldMaterial = trackDisposable(
      new THREE.MeshStandardMaterial({
        color: 0xcda46a,
        metalness: 0.94,
        roughness: 0.18,
      })
    );

    const bronzeMaterial = trackDisposable(
      new THREE.MeshStandardMaterial({
        color: 0x9e7647,
        metalness: 0.88,
        roughness: 0.25,
      })
    );

    const obsidianMaterial = trackDisposable(
      new THREE.MeshPhysicalMaterial({
        color: 0x0a0a0a,
        metalness: 0.85,
        roughness: 0.08,
        clearcoat: 1.0,
        clearcoatRoughness: 0.06,
      })
    );

    const burgundyMaterial = trackDisposable(
      new THREE.MeshPhysicalMaterial({
        color: 0x542b35,
        metalness: 0.65,
        roughness: 0.15,
        clearcoat: 0.8,
        clearcoatRoughness: 0.1,
      })
    );

    const chromeMaterial = trackDisposable(
      new THREE.MeshStandardMaterial({
        color: 0xededed,
        metalness: 0.98,
        roughness: 0.05,
      })
    );

    // A. Concentric Champagne-Gold Rings (Torus)
    const ring1Geo = trackDisposable(new THREE.TorusGeometry(2.35, 0.055, 32, 120));
    const ring1 = new THREE.Mesh(ring1Geo, goldMaterial);
    ring1.rotation.x = Math.PI / 3.2;
    ring1.rotation.y = Math.PI / 5.5;
    rootGroup.add(ring1);

    const ring2Geo = trackDisposable(new THREE.TorusGeometry(1.68, 0.045, 32, 100));
    const ring2 = new THREE.Mesh(ring2Geo, bronzeMaterial);
    ring2.rotation.x = -Math.PI / 4.0;
    ring2.rotation.y = Math.PI / 3.0;
    rootGroup.add(ring2);

    const ring3Geo = trackDisposable(new THREE.TorusGeometry(1.95, 0.035, 32, 100));
    const ring3 = new THREE.Mesh(ring3Geo, goldMaterial);
    ring3.rotation.z = Math.PI / 6.0;
    rootGroup.add(ring3);

    // B. Centerpiece Obsidian Monolith Sphere
    const centerSphereGeo = trackDisposable(new THREE.SphereGeometry(0.85, 64, 64));
    const centerSphere = new THREE.Mesh(centerSphereGeo, obsidianMaterial);
    centerSphere.position.set(0, 0, 0);
    rootGroup.add(centerSphere);

    // C. Orbiting Metallic & Velvet Spheres
    const sphereConfigs = [
      { geo: new THREE.SphereGeometry(0.42, 48, 48), mat: goldMaterial, pos: [1.75, 0.85, 0.6], speed: 1.1 },
      { geo: new THREE.SphereGeometry(0.32, 48, 48), mat: burgundyMaterial, pos: [-1.6, -0.95, 0.8], speed: 0.9 },
      { geo: new THREE.SphereGeometry(0.25, 48, 48), mat: chromeMaterial, pos: [0.65, -1.5, -0.5], speed: 1.3 },
      { geo: new THREE.SphereGeometry(0.2, 32, 32), mat: goldMaterial, pos: [-1.2, 1.4, -0.6], speed: 1.4 },
      { geo: new THREE.SphereGeometry(0.18, 32, 32), mat: obsidianMaterial, pos: [1.9, -0.6, 1.1], speed: 0.85 },
      { geo: new THREE.SphereGeometry(0.14, 32, 32), mat: bronzeMaterial, pos: [-0.4, 1.9, 0.4], speed: 1.2 },
    ];

    const sphereMeshes = sphereConfigs.map((cfg) => {
      trackDisposable(cfg.geo);
      const mesh = new THREE.Mesh(cfg.geo, cfg.mat);
      mesh.position.set(...cfg.pos);
      mesh.userData = { initialPos: [...cfg.pos], speed: cfg.speed };
      rootGroup.add(mesh);
      return mesh;
    });

    // D. Geometric Crystalline Facets (Floating Gem Prisms)
    const facet1Geo = trackDisposable(new THREE.IcosahedronGeometry(0.28, 0));
    const facet1 = new THREE.Mesh(facet1Geo, burgundyMaterial);
    facet1.position.set(1.2, -1.2, 1.0);
    rootGroup.add(facet1);

    const facet2Geo = trackDisposable(new THREE.OctahedronGeometry(0.22, 0));
    const facet2 = new THREE.Mesh(facet2Geo, goldMaterial);
    facet2.position.set(-1.4, 0.9, -0.8);
    rootGroup.add(facet2);

    // E. Floating Gold Dust Particles
    const particleCount = 75;
    const particlePositions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePositions[i] = (Math.random() - 0.5) * 8.5;
      particlePositions[i + 1] = (Math.random() - 0.5) * 6.5;
      particlePositions[i + 2] = (Math.random() - 0.5) * 6.0;
    }
    const particleGeo = trackDisposable(new THREE.BufferGeometry());
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));

    const particleMat = trackDisposable(
      new THREE.PointsMaterial({
        color: 0xcda46a,
        size: 0.045,
        transparent: true,
        opacity: 0.65,
      })
    );
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // 5. Pointer Parallax Mechanics
    const pointer = { targetX: 0, targetY: 0, currentX: 0, currentY: 0 };

    const handlePointerMove = (e) => {
      const clientX = e.clientX || (e.touches && e.touches[0]?.clientX) || 0;
      const clientY = e.clientY || (e.touches && e.touches[0]?.clientY) || 0;
      pointer.targetX = (clientX / window.innerWidth - 0.5) * 2;
      pointer.targetY = (clientY / window.innerHeight - 0.5) * 2;
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });

    // 6. Responsive Viewport Adaptation
    const handleResize = () => {
      if (!container) return;
      width = container.clientWidth || window.innerWidth;
      height = container.clientHeight || window.innerHeight;

      camera.aspect = width / height;

      // Adjust camera distance for mobile / desktop readability
      if (width < 768) {
        camera.position.z = 8.8;
        rootGroup.position.set(0, 0.4, 0);
        rootGroup.scale.set(0.78, 0.78, 0.78);
      } else if (width < 1200) {
        camera.position.z = 7.6;
        rootGroup.position.set(0.6, 0, 0);
        rootGroup.scale.set(0.92, 0.92, 0.92);
      } else {
        camera.position.z = 7.2;
        rootGroup.position.set(1.2, 0, 0);
        rootGroup.scale.set(1.05, 1.05, 1.05);
      }

      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    // 7. Animation Loop with Reduced-Motion Guard
    let animationFrameId;
    let clock = new THREE.Clock();

    const render = () => {
      const elapsedTime = clock.getElapsedTime();

      if (!shouldReduceMotion) {
        // Smooth pointer interpolation
        pointer.currentX += (pointer.targetX - pointer.currentX) * 0.045;
        pointer.currentY += (pointer.targetY - pointer.currentY) * 0.045;

        // Subtle camera/group tilt
        rootGroup.rotation.y = elapsedTime * 0.12 + pointer.currentX * 0.35;
        rootGroup.rotation.x = Math.sin(elapsedTime * 0.18) * 0.08 - pointer.currentY * 0.25;

        // Gentle floating oscillation
        rootGroup.position.y = (width < 768 ? 0.4 : 0) + Math.sin(elapsedTime * 0.8) * 0.12;

        // Ring precessions
        ring1.rotation.z = elapsedTime * 0.15;
        ring2.rotation.x = -Math.PI / 4.0 + Math.sin(elapsedTime * 0.25) * 0.2;
        ring3.rotation.y = Math.cos(elapsedTime * 0.2) * 0.25;

        // Floating gemstone facets
        facet1.rotation.x = elapsedTime * 0.4;
        facet1.rotation.y = elapsedTime * 0.5;
        facet2.rotation.y = -elapsedTime * 0.35;

        // Satellite spheres subtle orbital breathing
        sphereMeshes.forEach((mesh) => {
          const init = mesh.userData.initialPos;
          const spd = mesh.userData.speed;
          mesh.position.y = init[1] + Math.sin(elapsedTime * 1.2 * spd) * 0.15;
          mesh.position.x = init[0] + Math.cos(elapsedTime * 0.9 * spd) * 0.08;
        });

        // Ambient gold particles slow drift
        particles.rotation.y = elapsedTime * 0.03;
      }

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    // 8. Lifecycle Memory Cleanup & Disposal
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('resize', handleResize);

      disposables.forEach((item) => {
        if (item.dispose) item.dispose();
      });

      if (renderer) {
        renderer.dispose();
        if (renderer.domElement && renderer.domElement.parentNode) {
          renderer.domElement.parentNode.removeChild(renderer.domElement);
        }
      }
    };
  }, [shouldReduceMotion, hasWebGL]);

  if (!hasWebGL) {
    return (
      <div className="nova-hero-fallback-bg" role="img" aria-label="NOVA sculptural luxury ambient composition">
        <div className="nova-hero-fallback-rings" />
      </div>
    );
  }

  return (
    <div
      ref={mountRef}
      className="nova-3d-canvas-container is-loaded"
      aria-hidden="true"
    />
  );
}
