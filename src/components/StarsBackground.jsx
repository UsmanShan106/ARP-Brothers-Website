import React, { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const StarField = () => {
    const pointsRef = useRef();
    const count = 1500; // Reduced from 2500 for better performance

    // Create random star positions and speeds
    const positions = useMemo(() => {
        const pos = new Float32Array(count * 3);
        const radius = 100;
        for (let i = 0; i < count; i++) {
            // Distribute stars in a large sphere instead of a box for more cinematic feel
            const theta = 2 * Math.PI * Math.random();
            const phi = Math.acos(2 * Math.random() - 1);
            const r = radius * Math.pow(Math.random(), 1 / 3);

            pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
            pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
            pos[i * 3 + 2] = r * Math.cos(phi);
        }
        return pos;
    }, [count]);

    useFrame((state, delta) => {
        if (!pointsRef.current) return;
        // Simple and efficient rotation instead of updating every point's position attribute
        pointsRef.current.rotation.y += delta * 0.05;
        pointsRef.current.rotation.x += delta * 0.02;
    });

    return (
        <points ref={pointsRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={positions.length / 3}
                    array={positions}
                    itemSize={3}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.1}
                color="#ffffff"
                transparent
                opacity={0.3}
                sizeAttenuation
                depthWrite={false}
            />
        </points>
    );
};

const getBackgroundDpr = () => {
    if (typeof window === 'undefined') return 1;
    const isMobile = window.innerWidth <= 768;
    // Keep starfield very cheap on mobile, slightly sharper on larger screens
    return isMobile ? 1 : 1.25;
};

const StarsBackground = () => {
    useEffect(() => {
        // #region agent log
        fetch('http://127.0.0.1:7714/ingest/4a86ba09-f794-4c19-a298-02356a5e2b9c', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Debug-Session-Id': '9e17ce',
            },
            body: JSON.stringify({
                sessionId: '9e17ce',
                runId: 'initial',
                hypothesisId: 'H4',
                location: 'StarsBackground.jsx:62',
                message: 'StarsBackground mounted, Canvas will render',
                data: {},
                timestamp: Date.now(),
            }),
        }).catch(() => { });
        // #endregion agent log
    }, []);

    return (
        <div
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: -1,
                pointerEvents: 'none',
                background: 'var(--bg-primary)',
                // Hardware acceleration hint
                transform: 'translateZ(0)',
                willChange: 'transform'
            }}
        >
            <Canvas
                camera={{ position: [0, 0, 10], fov: 60 }}
                gl={{
                    antialias: false, // Disabling antialias for performance (unnecessary for star dots)
                    alpha: true,
                    powerPreference: "high-performance" // Hint for GPU
                }}
                dpr={getBackgroundDpr()}
            >
                <StarField />
            </Canvas>
        </div>
    );
};

export default React.memo(StarsBackground);
