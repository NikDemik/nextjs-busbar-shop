'use client';

import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

export default function FallingCubes() {
    const mountRef = useRef<HTMLDivElement | null>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const mount = mountRef.current;
        if (!mount) return;

        // Intersection Observer для отслеживания видимости
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsVisible(entry.isIntersecting);
            },
            {
                threshold: 0.1, // Сработает когда 10% компонента видно
            },
        );

        observer.observe(mount);

        return () => {
            observer.disconnect();
        };
    }, []);

    useEffect(() => {
        const mount = mountRef.current!;
        if (!mount || !isVisible) return;

        const scene = new THREE.Scene();
        scene.background = null; // Прозрачный фон

        const camera = new THREE.PerspectiveCamera(
            45,
            mount.clientWidth / mount.clientHeight,
            0.1,
            1000,
        );
        camera.position.set(0, 0, 12);
        camera.lookAt(0, 0, 0);

        const renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: true, // Включаем альфа-канал для прозрачности
            preserveDrawingBuffer: true, // Для лучшей поддержки прозрачности
        });

        // Гарантируем прозрачный фон
        renderer.setClearColor(0x000000, 0);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // Оптимизация качества

        renderer.setSize(mount.clientWidth, mount.clientHeight);
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        mount.appendChild(renderer.domElement);

        // Мягкий свет
        const ambient = new THREE.AmbientLight(0xffffff, 0.4);
        scene.add(ambient);

        const dirLight = new THREE.DirectionalLight(0xffffff, 1.2);
        dirLight.position.set(5, 10, 5);
        dirLight.castShadow = true;

        dirLight.shadow.mapSize.width = 2048;
        dirLight.shadow.mapSize.height = 2048;

        scene.add(dirLight);

        // Невидимый пол (для теней)
        const planeGeo = new THREE.PlaneGeometry(20, 20);
        const planeMat = new THREE.ShadowMaterial({
            opacity: 0.25, // тени видны, но пола нет
        });

        const plane = new THREE.Mesh(planeGeo, planeMat);
        plane.rotation.x = -Math.PI / 2;
        plane.position.y = -2;
        plane.receiveShadow = true;
        scene.add(plane);

        // ---- Материал "пластик" ----
        const material = new THREE.MeshPhysicalMaterial({
            color: '#00c951',
            roughness: 0.4,
            metalness: 0,
            clearcoat: 1,
            clearcoatRoughness: 0.1,
        });

        // ---- Кубики ----
        const cubeSize = 1.5;
        const cubes: THREE.Mesh[] = [];

        const geometry = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize);

        const positions: { x: number; y: number }[] = [];
        for (let x = -1; x <= 1; x++) {
            for (let y = -1; y <= 1; y++) {
                positions.push({ x, y });
            }
        }

        positions.forEach((pos, index) => {
            const cube = new THREE.Mesh(geometry, material);
            cube.castShadow = true;

            cube.position.set(pos.x * cubeSize, 6 + index * 0.3, pos.y * cubeSize);

            (cube as any).targetPos = new THREE.Vector3(pos.x * cubeSize, pos.y * cubeSize, 0);
            (cube as any).initialPos = cube.position.clone(); // Сохраняем начальную позицию

            cubes.push(cube);
            scene.add(cube);
        });

        // Анимация
        const clock = new THREE.Clock();
        let animationId: number;
        let animationStarted = false;

        function animate() {
            animationId = requestAnimationFrame(animate);
            const t = clock.getElapsedTime();

            if (!animationStarted) {
                // Сбрасываем позиции кубов при первом запуске
                cubes.forEach((cube, index) => {
                    const obj: any = cube;
                    cube.position.copy(obj.initialPos);
                });
                animationStarted = true;
            }

            cubes.forEach((cube, index) => {
                const obj: any = cube;

                const delay = index * 0.8;
                const progress = Math.min(1, Math.max(0, (t - delay) / 1.4));

                const start = new THREE.Vector3(obj.targetPos.x, 6, obj.targetPos.z);

                cube.position.lerpVectors(start, obj.targetPos, progress);
            });

            renderer.render(scene, camera);
        }

        // Запускаем анимацию только когда компонент видим
        if (isVisible) {
            clock.start(); // Перезапускаем таймер
            animate();
        }

        // Обработка изменения размера окна
        const handleResize = () => {
            camera.aspect = mount.clientWidth / mount.clientHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(mount.clientWidth, mount.clientHeight);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            if (animationId) {
                cancelAnimationFrame(animationId);
            }
            if (mount.contains(renderer.domElement)) {
                mount.removeChild(renderer.domElement);
            }
            renderer.dispose();
        };
    }, [isVisible]); // Зависимость от isVisible

    return (
        <div
            ref={mountRef}
            style={{
                width: '100%',
                maxWidth: '600px',
                height: '400px',
                margin: '0 auto',
                background: 'transparent', // Убедимся, что контейнер тоже прозрачный
            }}
        />
    );
}
