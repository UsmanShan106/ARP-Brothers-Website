import React, { useRef, useMemo, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Smooth ease-out for the morph animation
const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

const Globe = ({ opacity = 1, autoRotateSpeed = 0.2 }) => {
    const mainRef = useRef();
    const dotsRef = useRef();
    const linesRef = useRef();
    const dotsGeomRef = useRef();
    const linesGeomRef = useRef();

    // Morph progress: 0 = flat net, 1 = full globe
    const morphProgress = useRef(0);

    // Mouse tracking (kept for subtle interactive feel)
    const mouse = useRef({ x: 0, y: 0 });
    useEffect(() => {
        const onMove = (e) => {
            mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
            mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
        };
        window.addEventListener('mousemove', onMove, { passive: true });
        return () => window.removeEventListener('mousemove', onMove);
    }, []);

    // ── Geometry ─────────────────────────────────────────────────────
    const { flatDotPos, targetDotPos, flatLinePos, targetLinePos } = useMemo(() => {
        const points = [];
        const count = 120;
        const radius = 2.4;

        for (let i = 0; i < count; i++) {
            const phi = Math.acos(-1 + (2 * i) / count);
            const theta = Math.sqrt(count * Math.PI) * phi;
            points.push(new THREE.Vector3(
                radius * Math.cos(theta) * Math.sin(phi),
                radius * Math.sin(theta) * Math.sin(phi),
                radius * Math.cos(phi)
            ));
        }

        // Build connection pairs (same threshold as before)
        const pairs = [];
        for (let i = 0; i < points.length; i++) {
            for (let j = i + 1; j < points.length; j++) {
                if (points[i].distanceTo(points[j]) < 1.2) {
                    pairs.push(i, j);
                }
            }
        }

        // Flat positions: keep X/Y, collapse Z → 0 (net on a plane)
        const flatDotPos = new Float32Array(points.flatMap(p => [p.x, p.y, 0]));
        const targetDotPos = new Float32Array(points.flatMap(p => [p.x, p.y, p.z]));

        const flatLinePos = new Float32Array(pairs.length * 6);
        const targetLinePos = new Float32Array(pairs.length * 6);
        pairs.forEach((idx, k) => {
            // pairs is [i0, j0, i1, j1, …] - two indices per pair
            if (k % 2 === 0) {
                const i = pairs[k], j = pairs[k + 1];
                const base = (k / 2) * 6;
                // flat
                flatLinePos[base] = points[i].x; flatLinePos[base + 1] = points[i].y; flatLinePos[base + 2] = 0;
                flatLinePos[base + 3] = points[j].x; flatLinePos[base + 4] = points[j].y; flatLinePos[base + 5] = 0;
                // target
                targetLinePos[base] = points[i].x; targetLinePos[base + 1] = points[i].y; targetLinePos[base + 2] = points[i].z;
                targetLinePos[base + 3] = points[j].x; targetLinePos[base + 4] = points[j].y; targetLinePos[base + 5] = points[j].z;
            }
        });

        return { flatDotPos, targetDotPos, flatLinePos, targetLinePos };
    }, []);

    // ── Animation loop ────────────────────────────────────────────────
    const rotationVelocity = useRef({ x: 0, y: 0 });

    useFrame((state, delta) => {
        if (!mainRef.current) return;

        // Clamp delta to prevent huge jumps if the tab was inactive
        const dt = Math.min(delta, 0.1);
        const time = state.clock.getElapsedTime();

        // ── 1. Flat → Globe morph ────────────────────────────────────
        const MORPH_DURATION = 2.4; // Slightly slower for more "luxury" feel
        if (morphProgress.current < 1) {
            morphProgress.current = Math.min(morphProgress.current + dt / MORPH_DURATION, 1);
            const t = easeOutCubic(morphProgress.current);

            // Optimized update: only update if needed. Morph is a one-time thing.
            const dotArr = dotsGeomRef.current.attributes.position.array;
            const lineArr = linesGeomRef.current.attributes.position.array;

            for (let i = 0; i < dotArr.length; i += 3) {
                dotArr[i + 2] = targetDotPos[i + 2] * t;
            }
            dotsGeomRef.current.attributes.position.needsUpdate = true;

            for (let i = 0; i < lineArr.length; i += 3) {
                lineArr[i + 2] = targetLinePos[i + 2] * t;
            }
            linesGeomRef.current.attributes.position.needsUpdate = true;
        }

        // ── 2. Super Smooth Rotation ─────────────────────────────────
        // We use inertial damping for the mouse and a consistent base rotation
        const targetRotX = mouse.current.y * 0.35;
        const targetRotY = mouse.current.x * 0.35;

        // Use MathUtils.damp for frame-rate independent smoothing
        // 4 is the damping factor; higher = snappier, lower = smoother/slower
        rotationVelocity.current.x = THREE.MathUtils.damp(rotationVelocity.current.x, targetRotX, 4, dt);
        rotationVelocity.current.y = THREE.MathUtils.damp(rotationVelocity.current.y, targetRotY, 4, dt);

        // Continuous steady rotation (Time-based to avoid any frame-rate related judder)
        const baseAutoRotation = time * autoRotateSpeed;

        // Apply final rotations
        // X: Slow oscillation + mouse influence
        mainRef.current.rotation.x = THREE.MathUtils.damp(
            mainRef.current.rotation.x,
            Math.sin(time * 0.3) * 0.2 + rotationVelocity.current.x,
            2,
            dt
        );

        // Y: Constant spin + mouse influence
        mainRef.current.rotation.y = baseAutoRotation + rotationVelocity.current.y;

        // Z: Subtle drifting
        mainRef.current.rotation.z = THREE.MathUtils.damp(
            mainRef.current.rotation.z,
            Math.cos(time * 0.2) * 0.1,
            1,
            dt
        );

        // ── 3. Organic Twinkle ───────────────────────────────────────
        if (dotsRef.current) {
            // Using a compound sine wave for less predictable, more organic look
            const pulse = 0.8 + Math.sin(time * 2.0) * 0.15 + Math.sin(time * 0.5) * 0.05;
            dotsRef.current.material.opacity = pulse * opacity;
        }

        // ── 4. Subtle Scaling "Breathing" ────────────────────────────
        const scale = 1 + Math.sin(time * 0.4) * 0.015;
        mainRef.current.scale.setScalar(scale);
    });

    return (
        <group ref={mainRef}>
            {/* Dots */}
            <points ref={dotsRef}>
                <bufferGeometry ref={dotsGeomRef}>
                    <bufferAttribute
                        attach="attributes-position"
                        count={flatDotPos.length / 3}
                        array={flatDotPos}
                        itemSize={3}
                    />
                </bufferGeometry>
                <pointsMaterial
                    size={0.06}
                    color="#DC2626"
                    transparent
                    opacity={0.8 * opacity}
                    sizeAttenuation
                    depthWrite={false}
                    blending={THREE.AdditiveBlending}
                />
            </points>

            {/* Connection lines */}
            <lineSegments ref={linesRef}>
                <bufferGeometry ref={linesGeomRef}>
                    <bufferAttribute
                        attach="attributes-position"
                        count={flatLinePos.length / 3}
                        array={flatLinePos}
                        itemSize={3}
                    />
                </bufferGeometry>
                <lineBasicMaterial
                    color="#DC2626"
                    transparent
                    opacity={0.18 * opacity}
                    linewidth={1}
                    depthWrite={false}
                    blending={THREE.AdditiveBlending}
                />
            </lineSegments>

            {/* Ambient sphere glow */}
            <mesh>
                <sphereGeometry args={[2.3, 24, 24]} />
                <meshBasicMaterial color="#DC2626" transparent opacity={0.03 * opacity} depthWrite={false} blending={THREE.AdditiveBlending} />
            </mesh>
        </group>
    );
};

export default React.memo(Globe);