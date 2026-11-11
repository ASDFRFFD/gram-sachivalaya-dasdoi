/**
 * Gram Sachivalaya Dasdoi - Immersive 3D Digital Experience
 * Master WebGL & Interaction Engine
 * Built with Three.js, GSAP ScrollTrigger, Lenis Smooth Scroll & Web Audio API
 */

(function () {
    'use strict';

    // Ensure page always starts at top on refresh
    if ('scrollRestoration' in history) {
        history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);

    // ====================================================
    // 1. MECHANICAL SOUND ENGINE (Web Audio API Synthesizer)
    // ====================================================
    let audioCtx = null;
    let isMechAudioActive = true;
    let hasUserInteracted = false;

    function getAudioContext() {
        if (!audioCtx) {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            if (AudioContext) {
                audioCtx = new AudioContext();
            }
        }
        if (audioCtx && audioCtx.state === 'suspended') {
            audioCtx.resume();
        }
        return audioCtx;
    }

    // Audio enabled only after first user interaction (click, touch, scroll)
    function unlockAudio() {
        if (!hasUserInteracted) {
            hasUserInteracted = true;
            getAudioContext();
        }
    }
    window.addEventListener('click', unlockAudio, { passive: true });
    window.addEventListener('touchstart', unlockAudio, { passive: true });
    window.addEventListener('wheel', unlockAudio, { passive: true });
    window.addEventListener('keydown', unlockAudio, { passive: true });

    // Realistic Digital Keystroke Synthesizer (Micro-transient sci-fi cyber click)
    function playKeystrokeSound() {
        if (!isMechAudioActive || !hasUserInteracted) return;
        try {
            const ctx = getAudioContext();
            if (!ctx || ctx.state !== 'running') return;
            const now = ctx.currentTime;

            const osc = ctx.createOscillator();
            const gain = ctx.createGain();

            // Subtle randomized pitch jitter (tactile, non-fatiguing)
            const baseFreq = 1800 + (Math.random() - 0.5) * 350;
            osc.type = 'sine';
            osc.frequency.setValueAtTime(baseFreq, now);
            osc.frequency.exponentialRampToValueAtTime(320, now + 0.016);

            gain.gain.setValueAtTime(0.024, now);
            gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.018);

            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.onended = () => { try { osc.disconnect(); gain.disconnect(); } catch (e) {} };
            osc.start(now);
            osc.stop(now + 0.02);
        } catch (e) {}
    }

    // Final Confirmation Beep (Dual-tone sci-fi telemetry lock)
    function playConfirmationBeep() {
        if (!isMechAudioActive || !hasUserInteracted) return;
        try {
            const ctx = getAudioContext();
            if (!ctx || ctx.state !== 'running') return;
            const now = ctx.currentTime;

            const osc = ctx.createOscillator();
            const gain = ctx.createGain();

            osc.type = 'sine';
            osc.frequency.setValueAtTime(880, now);
            osc.frequency.setValueAtTime(1320, now + 0.04);
            osc.frequency.setValueAtTime(1760, now + 0.08);

            gain.gain.setValueAtTime(0.035, now);
            gain.gain.setValueAtTime(0.04, now + 0.08);
            gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.22);

            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.onended = () => { try { osc.disconnect(); gain.disconnect(); } catch (e) {} };
            osc.start(now);
            osc.stop(now + 0.24);
        } catch (e) {}
    }

    // Mechanical Tactile Switch Click (Buttons, Pills, Hotspots)
    function playTactileSwitch() {
        if (!isMechAudioActive) return;
        try {
            const ctx = getAudioContext();
            if (!ctx) return;
            const now = ctx.currentTime;

            // Sharp mechanical snap transient
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();

            osc.type = 'triangle';
            osc.frequency.setValueAtTime(1400, now);
            osc.frequency.exponentialRampToValueAtTime(160, now + 0.04);

            gain.gain.setValueAtTime(0.08, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.045);

            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.onended = () => { try { osc.disconnect(); gain.disconnect(); } catch (e) {} };
            osc.start(now);
            osc.stop(now + 0.05);

            // Secondary micro-click mechanical bounce
            setTimeout(() => {
                if (!audioCtx) return;
                const osc2 = audioCtx.createOscillator();
                const gain2 = audioCtx.createGain();
                const t2 = audioCtx.currentTime;

                osc2.type = 'sine';
                osc2.frequency.setValueAtTime(3400, t2);
                osc2.frequency.exponentialRampToValueAtTime(500, t2 + 0.02);

                gain2.gain.setValueAtTime(0.04, t2);
                gain2.gain.exponentialRampToValueAtTime(0.0001, t2 + 0.025);

                osc2.connect(gain2);
                gain2.connect(audioCtx.destination);
                osc2.start(t2);
                osc2.stop(t2 + 0.03);
            }, 22);
        } catch (e) {
            // Audio context not allowed or suspended
        }
    }

    // Camera Aperture Shutter / Room Transit Sound
    function playMechanicalShutter() {
        if (!isMechAudioActive) return;
        try {
            const ctx = getAudioContext();
            if (!ctx) return;
            const now = ctx.currentTime;

            // Servo motor glide hum
            const servo = ctx.createOscillator();
            const servoGain = ctx.createGain();

            servo.type = 'sawtooth';
            servo.frequency.setValueAtTime(240, now);
            servo.frequency.exponentialRampToValueAtTime(580, now + 0.1);
            servo.frequency.exponentialRampToValueAtTime(120, now + 0.22);

            servoGain.gain.setValueAtTime(0.03, now);
            servoGain.gain.linearRampToValueAtTime(0.05, now + 0.06);
            servoGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.24);

            const filter = ctx.createBiquadFilter();
            filter.type = 'lowpass';
            filter.frequency.value = 850;

            servo.connect(filter);
            filter.connect(servoGain);
            servoGain.connect(ctx.destination);
            servo.start(now);
            servo.stop(now + 0.25);

            // Shutter blade click
            setTimeout(() => {
                playTactileSwitch();
            }, 75);
        } catch (e) {}
    }

    // Audio Toggle Button Setup
    const audioToggleBtn = document.getElementById('audio-toggle-btn');
    if (audioToggleBtn) {
        audioToggleBtn.addEventListener('click', () => {
            isMechAudioActive = !isMechAudioActive;
            playTactileSwitch();

            if (isMechAudioActive) {
                audioToggleBtn.classList.add('active');
                audioToggleBtn.querySelector('.audio-label').textContent = 'FX: ON';
            } else {
                audioToggleBtn.classList.remove('active');
                audioToggleBtn.querySelector('.audio-label').textContent = 'FX: OFF';
            }
        });
    }

    // ====================================================
    // 2. LENIS SMOOTH SCROLL INITIALIZATION
    // ====================================================
    let lenis = null;
    if (typeof Lenis !== 'undefined') {
        lenis = new Lenis({
            duration: 1.1,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: 'vertical',
            gestureOrientation: 'vertical',
            smoothWheel: true,
            wheelMultiplier: 1.0,
            touchMultiplier: 1.5
        });
        // Note: Driven exclusively by GSAP ticker at ScrollTrigger setup to prevent dual-RAF stutter
    }

    // Helper: Scroll to target scene index (0..4)
    window.navToSection = function (idx) {
        playTactileSwitch();
        const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
        // Calibrated with intro spacer & 5 architectural scene stops
        const targetPercents = [0.16, 0.36, 0.56, 0.76, 0.97];
        const targetScroll = totalHeight * (targetPercents[idx] || 0);

        if (lenis) {
            lenis.scrollTo(targetScroll, { duration: 1.6 });
        } else {
            window.scrollTo({ top: targetScroll, behavior: 'smooth' });
        }
    };

    // ====================================================
    // 3. THREE.JS 3D ARCHITECTURAL WEBGL WORLD
    // ====================================================
    const canvas = document.getElementById('webgl-canvas');
    if (!canvas || typeof THREE === 'undefined') {
        console.warn('Three.js or Canvas not available');
        return;
    }

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x040609);
    scene.fog = new THREE.FogExp2(0x040609, 0.0038);

    const camera = new THREE.PerspectiveCamera(52, window.innerWidth / window.innerHeight, 0.1, 1200);
    camera.position.set(0, 0, 85);

    const renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        antialias: false,
        alpha: false,
        powerPreference: 'high-performance',
        precision: 'mediump'
    });
    const maxDPR = window.innerWidth <= 768 ? 1.0 : Math.min(window.devicePixelRatio, 1.25);
    renderer.setPixelRatio(maxDPR);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.toneMapping = THREE.NoToneMapping;

    // Texture Loader
    const textureLoader = new THREE.TextureLoader();

    // 5 Architectural Room Planes (Optimized 1x1 quad billboards with MeshBasicMaterial)
    const roomConfigs = [
        {
            id: 'exterior',
            src: 'assets/images/exterior.jpg',
            w: 120, h: 72,
            pos: [0, 0, 0],
            rotY: 0
        },
        {
            id: 'corridor',
            src: 'assets/images/corridor.jpg',
            w: 110, h: 68,
            pos: [0, 0, -120],
            rotY: 0
        },
        {
            id: 'computer_desk',
            src: 'assets/images/computer_desk.jpg',
            w: 110, h: 68,
            pos: [-35, 0, -240],
            rotY: 0.08
        },
        {
            id: 'meeting_hall',
            src: 'assets/images/meeting_hall.jpg',
            w: 115, h: 70,
            pos: [0, 0, -360],
            rotY: 0
        },
        {
            id: 'sahayak_office',
            src: 'assets/images/sahayak_office.jpg',
            w: 110, h: 68,
            pos: [35, 0, -480],
            rotY: -0.08
        }
    ];

    const roomMeshes = [];

    roomConfigs.forEach((cfg) => {
        const texture = textureLoader.load(cfg.src);
        texture.generateMipmaps = true;
        texture.minFilter = THREE.LinearMipmapLinearFilter;

        const geometry = new THREE.PlaneGeometry(cfg.w, cfg.h, 1, 1);
        const material = new THREE.MeshBasicMaterial({
            map: texture,
            side: THREE.FrontSide
        });

        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.set(cfg.pos[0], cfg.pos[1], cfg.pos[2]);
        mesh.rotation.y = cfg.rotY;
        scene.add(mesh);
        roomMeshes.push(mesh);
    });

    // 3D Ambient Dust Particles (Lightweight GPU-animated motes)
    const particleCount = 120;
    const particleGeometry = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
        particlePositions[i * 3 + 0] = (Math.random() - 0.5) * 160;
        particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 80;
        particlePositions[i * 3 + 2] = 50 - Math.random() * 560;
    }

    particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));

    const particleMaterial = new THREE.PointsMaterial({
        color: 0xf59e0b,
        size: 0.65,
        transparent: true,
        opacity: 0.22,
        blending: THREE.AdditiveBlending
    });

    const particleSystem = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particleSystem);

    // ====================================================
    // 4. 3D SPATIAL HOTSPOTS (Interactive Beacons)
    // ====================================================
    const hotspotsContainer = document.getElementById('spatial-hotspots-container');

    const spatialHotspots = [
        // Scene 0: Exterior
        {
            id: 'hs-board',
            sceneIdx: 0,
            pos: new THREE.Vector3(-28, -6, 2),
            title: 'आधिकारिक शिलालेख',
            sub: 'उद्घाटन एवं प्रशासनिक पट्टिका',
            drawer: 'drawer-board'
        },
        {
            id: 'hs-entrance',
            sceneIdx: 0,
            pos: new THREE.Vector3(0, -10, 2),
            title: 'मुख्य प्रवेश द्वार',
            sub: 'सचिवालय के अंदर चलें',
            action: () => window.navToSection(1)
        },
        {
            id: 'hs-services-ext',
            sceneIdx: 0,
            pos: new THREE.Vector3(26, 8, 2),
            title: 'पंचायती राज पटल',
            sub: 'नागरिक सुविधाएं एवं प्रपत्र',
            drawer: 'drawer-services'
        },

        // Scene 1: Corridor
        {
            id: 'hs-c-sahayak',
            sceneIdx: 1,
            pos: new THREE.Vector3(-26, -4, -118),
            title: 'पंचायत सहायक कक्ष',
            sub: 'जन सेवा केंद्र (CSC डेस्क)',
            action: () => window.navToSection(2)
        },
        {
            id: 'hs-c-sabhagar',
            sceneIdx: 1,
            pos: new THREE.Vector3(0, -2, -118),
            title: 'मुख्य सभागार',
            sub: 'ग्राम सभा बैठक कक्ष',
            action: () => window.navToSection(3)
        },
        {
            id: 'hs-c-pradhan',
            sceneIdx: 1,
            pos: new THREE.Vector3(26, -4, -118),
            title: 'प्रधान व सचिव कक्ष',
            sub: 'प्रशासनिक प्रकोष्ठ',
            action: () => window.navToSection(4)
        },

        // Scene 2: Computer Desk (Sahayak)
        {
            id: 'hs-csc',
            sceneIdx: 2,
            pos: new THREE.Vector3(-45, -5, -238),
            title: 'पंचायत सहायक कक्ष',
            sub: 'जन सेवा केंद्र (ई-डिस्ट्रिक्ट)',
            drawer: 'drawer-services'
        },
        {
            id: 'hs-kyc',
            sceneIdx: 2,
            pos: new THREE.Vector3(-26, -8, -238),
            title: 'बायोमेट्रिक ई-केवाईसी',
            sub: 'राशन कार्ड व पीएम किसान',
            drawer: 'drawer-services'
        },
        {
            id: 'hs-phone-sahayak',
            sceneIdx: 2,
            pos: new THREE.Vector3(-35, 12, -238),
            title: 'श्री वैभव यादव (DEO)',
            sub: '📞 9005225378',
            action: () => { window.location.href = 'tel:9005225378'; }
        },

        // Scene 3: Meeting Hall (Sabhagar)
        {
            id: 'hs-assembly',
            sceneIdx: 3,
            pos: new THREE.Vector3(0, -4, -358),
            title: 'ग्राम सभा बैठक मंच',
            sub: 'विकास योजनाओं की समीक्षा',
            drawer: 'drawer-projects'
        },
        {
            id: 'hs-projects',
            sceneIdx: 3,
            pos: new THREE.Vector3(26, 6, -358),
            title: 'कार्य प्रगति बोर्ड',
            sub: 'अमृत सरोवर व सीसी मार्ग',
            drawer: 'drawer-projects'
        },

        // Scene 4: Pradhan & Sachiv Executive Office
        {
            id: 'hs-pradhan',
            sceneIdx: 4,
            pos: new THREE.Vector3(24, -2, -478),
            title: 'श्री राजकुमार यादव',
            sub: 'ग्राम प्रधान प्रकोष्ठ',
            drawer: 'drawer-board'
        },
        {
            id: 'hs-sachiv',
            sceneIdx: 4,
            pos: new THREE.Vector3(44, -2, -478),
            title: 'श्री संजीव कुमार',
            sub: 'ग्राम पंचायत सचिव (VDO)',
            drawer: 'drawer-board'
        },
        {
            id: 'hs-grievance',
            sceneIdx: 4,
            pos: new THREE.Vector3(34, 10, -478),
            title: 'ऑनलाइन जनसुनवाई पेटी',
            sub: 'अपनी समस्या दर्ज करें',
            drawer: 'drawer-grievance'
        }
    ];

    // Build DOM elements for spatial hotspots
    spatialHotspots.forEach((hs) => {
        const el = document.createElement('div');
        el.className = 'spatial-hotspot';
        el.id = hs.id;
        el.innerHTML = `
            <div class="hotspot-beacon-ring">
                <div class="hotspot-beacon-dot"></div>
            </div>
            <div class="hotspot-tooltip">
                <span class="tooltip-title">${hs.title}</span>
                <span class="tooltip-sub">${hs.sub}</span>
            </div>
        `;

        el.addEventListener('click', (e) => {
            e.stopPropagation();
            playTactileSwitch();
            if (hs.drawer) {
                openDrawer(hs.drawer);
            } else if (hs.action) {
                hs.action();
            }
        });

        hotspotsContainer.appendChild(el);
        hs.domElement = el;
    });

    // ====================================================
    // 5. CAMERA TRAJECTORY & SCROLLTRIGGER SCRUBBING
    // ====================================================
    const introViewport = document.getElementById('intro-viewport');
    const hudLocationName = document.getElementById('hud-location-name');
    const hudScrubberProgress = document.getElementById('hud-scrubber-progress');
    const stepPills = document.querySelectorAll('.step-pill');
    const bpBeacon = document.getElementById('bp-beacon');

    const blueprintRooms = {
        0: null,
        1: document.getElementById('bp-corridor'),
        2: document.getElementById('bp-sahayak'),
        3: document.getElementById('bp-sabhagar'),
        4: document.getElementById('bp-pradhan')
    };

    const roomMeta = [
        { name: '01 / 05 — भवन प्रांगण एवं शिलालेख', cx: 100, cy: 118 },
        { name: '02 / 05 — सचिवालय केंद्रीय गलियारा', cx: 100, cy: 78 },
        { name: '03 / 05 — पंचायत सहायक कक्ष (जन सेवा केंद्र)', cx: 46, cy: 44 },
        { name: '04 / 05 — मुख्य सभाकक्ष एवं सभागार', cx: 100, cy: 37 },
        { name: '05 / 05 — ग्राम प्रधान एवं सचिव कार्यालय', cx: 154, cy: 44 }
    ];

    // Camera trajectory spline points (x, y, z, lookAtX, lookAtY, lookAtZ)
    const cameraPath = [
        // 0.00: Welcome Screen (distant cinematic view of exterior)
        { t: 0.00, cam: [0, 0, 85], look: [0, 0, 0] },
        // 0.06: Begin camera zoom towards building entrance
        { t: 0.06, cam: [0, -0.8, 76], look: [0, 0, 0] },
        // 0.16: Section 01 (Revealed Exterior Facade & Inscription Board)
        { t: 0.16, cam: [0, -1.8, 58], look: [0, 0, 0] },
        // 0.26: Moving into the entrance doorway
        { t: 0.26, cam: [0, -3.0, 10], look: [0, -2, -50] },
        // 0.36: Section 02 (Inside Main Corridor)
        { t: 0.36, cam: [0, 0, -60], look: [0, 0, -120] },
        // 0.46: Gliding through corridor towards rooms
        { t: 0.46, cam: [0, -1, -110], look: [-15, 0, -180] },
        // 0.56: Section 03 (Turn left into Panchayat Sahayak Desk)
        { t: 0.56, cam: [-35, 0, -185], look: [-35, 0, -240] },
        // 0.66: Moving across towards Sabhagar
        { t: 0.66, cam: [-15, 0, -280], look: [0, 0, -360] },
        // 0.76: Section 04 (Centered in Main Meeting Hall)
        { t: 0.76, cam: [0, 0, -305], look: [0, 0, -360] },
        // 0.86: Turning towards Pradhan Chamber
        { t: 0.86, cam: [18, 0, -390], look: [35, 0, -480] },
        // 1.00: Section 05 (Inside Executive Chamber)
        { t: 1.00, cam: [35, 0, -425], look: [35, 0, -480] }
    ];

    // Interpolate camera path by scroll progress (0..1)
    function getCameraState(progress) {
        progress = Math.max(0, Math.min(1, progress));

        // Find surrounding keyframes
        let p0 = cameraPath[0];
        let p1 = cameraPath[cameraPath.length - 1];

        for (let i = 0; i < cameraPath.length - 1; i++) {
            if (progress >= cameraPath[i].t && progress <= cameraPath[i + 1].t) {
                p0 = cameraPath[i];
                p1 = cameraPath[i + 1];
                break;
            }
        }

        const range = p1.t - p0.t;
        const localT = range === 0 ? 0 : (progress - p0.t) / range;
        // Smooth Hermite blend
        const ease = localT * localT * (3 - 2 * localT);

        const camX = p0.cam[0] + (p1.cam[0] - p0.cam[0]) * ease;
        const camY = p0.cam[1] + (p1.cam[1] - p0.cam[1]) * ease;
        const camZ = p0.cam[2] + (p1.cam[2] - p0.cam[2]) * ease;

        const lookX = p0.look[0] + (p1.look[0] - p0.look[0]) * ease;
        const lookY = p0.look[1] + (p1.look[1] - p0.look[1]) * ease;
        const lookZ = p0.look[2] + (p1.look[2] - p0.look[2]) * ease;

        return { camX, camY, camZ, lookX, lookY, lookZ };
    }

    let activeSceneIdx = 0;
    let globalScrollProgress = 0;

    // Mouse parallax tracking
    let mouseX = 0;
    let mouseY = 0;
    let targetTiltX = 0;
    let targetTiltY = 0;

    window.addEventListener('mousemove', (e) => {
        mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
        mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    });

    // Setup GSAP + ScrollTrigger
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);

        if (lenis) {
            lenis.on('scroll', ScrollTrigger.update);
            gsap.ticker.add((time) => {
                lenis.raf(time * 1000);
            });
            gsap.ticker.lagSmoothing(0);
        }

        // ====================================================
        // CINEMATIC SCI-FI TERMINAL TYPING ENGINE
        // Reveal Hindi text one grapheme at a time using Intl.Segmenter
        // ====================================================
        const terminalHud = document.getElementById('terminal-hud');
        const termHistory = document.getElementById('term-history');
        const termBadge = document.getElementById('term-badge');
        const termHeadline = document.getElementById('term-headline');
        const termCursor = document.getElementById('term-cursor');
        const termSubline = document.getElementById('term-subline');
        const termTelemetry = document.getElementById('term-telemetry');
        const termActions = document.getElementById('term-actions');
        const termLiveTime = document.getElementById('term-live-time');

        // Update real-time coordinates clock
        function updateLiveClock() {
            if (!termLiveTime) return;
            const now = new Date();
            const timeStr = now.toLocaleTimeString('en-US', { hour12: false });
            termLiveTime.textContent = `26.87°N 80.79°E // ${timeStr}`;
        }
        setInterval(updateLiveClock, 1000);
        updateLiveClock();

        // Hindi Grapheme Segmenter (Preserves Devanagari ligatures, conjuncts & matras)
        const hindiSegmenter = (typeof Intl !== 'undefined' && Intl.Segmenter)
            ? new Intl.Segmenter('hi', { granularity: 'grapheme' })
            : null;

        function getGraphemes(text) {
            if (!text) return [];
            if (hindiSegmenter) {
                return Array.from(hindiSegmenter.segment(text), s => s.segment);
            }
            return Array.from(text);
        }

        const TERMINAL_DATA = [
            {
                badge: "SEC.01 // REVEAL",
                headline: "सामुदायिक मिलन केन्द्र एवं ग्राम पंचायत भवन दसदोई",
                subline: "विकास खण्ड काकोरी (जनपद लखनऊ) का आधिकारिक डिजिटल 3D वास्तु अनुभव।",
                telemetry: [
                    "स्थापना: पारदर्शी पंचायती राज एवं ग्रामीण ई-गवर्नेंस संकुल",
                    "भौगोलिक संरेखण: 26.87° N, 80.79° E • पिनकोड 226101"
                ],
                actions: [
                    { text: "भवन के अंदर चलें", arrow: "→", highlight: true, fn: () => window.navToSection(1) },
                    { text: "शिलालेख विवरण", arrow: "↗", fn: () => openDrawer('drawer-board') }
                ]
            },
            {
                badge: "SEC.02 // CONCOURSE",
                headline: "सचिवालय केंद्रीय गलियारा • कक्षीय पारगमन अक्ष",
                subline: "द्वार पार करते ही — बायीं ओर पंचायत सहायक कक्ष (जन सेवा केंद्र), सम्मुख सभागार, दायीं ओर प्रधान कक्ष।",
                telemetry: [
                    "पथ संरेखण: मुख्य प्रवेश द्वार ➜ सभागार अक्ष",
                    "कक्षीय पहुंच: 3 विशिष्ट प्रशासनिक प्रकोष्ठ सक्रिय"
                ],
                actions: [
                    { text: "03 // पंचायत सहायक कक्ष (जन सेवा केंद्र)", arrow: "→", fn: () => window.navToSection(2) },
                    { text: "04 // मुख्य सभाकक्ष एवं सभागार", arrow: "→", fn: () => window.navToSection(3) },
                    { text: "05 // ग्राम प्रधान एवं सचिव कक्ष", arrow: "→", fn: () => window.navToSection(4) }
                ]
            },
            {
                badge: "SEC.03 // SAHAYAK & JANSEWA",
                headline: "पंचायत सहायक कक्ष • जन सेवा केंद्र (CSC)",
                subline: "प्रभारी: श्री वैभव यादव (पंचायत सहायक / DEO) • ई-डिस्ट्रिक्ट जन सेवा केंद्र • संपर्क: 9005225378",
                telemetry: [
                    "01 // आय, जाति व निवास प्रमाण पत्र (डिजिटल 7 दिवस)",
                    "02 // राशन कार्ड बायोमेट्रिक ई-केवाईसी (निःशुल्क सत्यापन)",
                    "03 // परिवार रजिस्टर अधिकृत नकल प्रतिलिपि (शुल्क ₹10)",
                    "04 // वृद्धा, विधवा एवं दिव्यांग पेंशन योजना सहायता"
                ],
                actions: [
                    { text: "जन सेवा केंद्र सेवाएं विस्तार से देखें", arrow: "↗", highlight: true, fn: () => openDrawer('drawer-services') },
                    { text: "📞 9005225378 कॉल करें", arrow: "→", fn: () => { window.location.href = 'tel:9005225378'; } }
                ]
            },
            {
                badge: "SEC.04 // PUBLIC ASSEMBLY",
                headline: "मुख्य सभाकक्ष एवं सभागार • खुली संसद",
                subline: "ग्राम सभा खुली बैठक, बजट आवंटन एवं विकास कार्यों की आधिकारिक समीक्षा स्थली।",
                telemetry: [
                    "प्रगति [01]: अमृत सरोवर कायाकल्प — ₹8,50,000 [पूर्ण]",
                    "प्रगति [02]: मुख्य बस्ती सीसी मार्ग — 350m [80% पूर्ण]",
                    "प्रगति [03]: जल जीवन मिशन (हर घर जल) — 100% [क्रियान्वित]"
                ],
                actions: [
                    { text: "विकास कार्य टाइमलाइन", arrow: "📊", highlight: true, fn: () => openDrawer('drawer-projects') },
                    { text: "सूचना पट्ट विवरण", arrow: "📌", fn: () => openDrawer('drawer-board') }
                ]
            },
            {
                badge: "SEC.05 // GOVERNANCE",
                headline: "ग्राम प्रधान एवं सचिव कार्यालय • जनसुनवाई प्रकोष्ठ",
                subline: "ग्रामवासियों की समस्याओं की जनसुनवाई, शासकीय अनुमोदन एवं नीतिगत निर्णयों का प्रकोष्ठ।",
                telemetry: [
                    "ग्राम प्रधान: श्री राजकुमार यादव (जनसुनवाई: 10:00 AM - 1:00 PM)",
                    "ग्राम पंचायत सचिव: श्री संजीव कुमार (उपस्थिति: मंगलवार व शुक्रवार)",
                    "ई-गवर्नेंस प्रणाली: ऑनलाइन जनसुनवाई पेटी 24x7 सक्रिय"
                ],
                actions: [
                    { text: "✍️ ऑनलाइन जनसुनवाई पेटी में शिकायत दर्ज करें", arrow: "↗", highlight: true, fn: () => openDrawer('drawer-grievance') },
                    { text: "अधिकारी डायरेक्टरी", arrow: "↗", fn: () => openDrawer('drawer-board') }
                ]
            }
        ];

        let currentTerminalIdx = -1;
        let activeTypingToken = 0;

        function renderTerminalSection(idx) {
            if (idx === currentTerminalIdx || !TERMINAL_DATA[idx]) return;

            const prevIdx = currentTerminalIdx;
            currentTerminalIdx = idx;
            const currentData = TERMINAL_DATA[idx];
            const token = ++activeTypingToken;

            const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

            // Archive previous section to history buffer (dimmed line)
            if (prevIdx >= 0 && TERMINAL_DATA[prevIdx] && termHistory) {
                const arch = document.createElement('div');
                arch.className = 'terminal-archived-line';
                arch.innerHTML = `
                    <span class="arch-check">✓</span>
                    <span class="arch-badge">${TERMINAL_DATA[prevIdx].badge}</span>
                    <span class="arch-text">${TERMINAL_DATA[prevIdx].headline}</span>
                `;
                termHistory.appendChild(arch);
                while (termHistory.children.length > 2) {
                    termHistory.removeChild(termHistory.firstChild);
                }
            }

            // Reset active stage elements
            if (termBadge) termBadge.textContent = currentData.badge;
            if (termHeadline) termHeadline.innerHTML = '';
            if (termSubline) termSubline.innerHTML = '';
            if (termTelemetry) termTelemetry.innerHTML = '';
            if (termActions) {
                termActions.innerHTML = '';
                termActions.classList.remove('revealed');
            }

            // Instant render for reduced motion
            if (isReduced) {
                if (termHeadline) termHeadline.textContent = currentData.headline;
                if (termSubline) termSubline.textContent = currentData.subline;
                if (termTelemetry) {
                    currentData.telemetry.forEach(line => {
                        const li = document.createElement('li');
                        li.className = 'revealed';
                        li.innerHTML = `<span class="term-telemetry-bullet">></span><span>${line}</span>`;
                        termTelemetry.appendChild(li);
                    });
                }
                if (termActions) {
                    renderActions(currentData.actions);
                    termActions.classList.add('revealed');
                }
                return;
            }

            // Grapheme-by-Grapheme Typing Sequence
            const headlineGraphemes = getGraphemes(currentData.headline);
            const sublineGraphemes = getGraphemes(currentData.subline);

            let hIdx = 0;
            function typeHeadline() {
                if (token !== activeTypingToken) return;

                if (hIdx < headlineGraphemes.length) {
                    const charSpan = document.createElement('span');
                    charSpan.className = 'term-char just-typed';
                    charSpan.textContent = headlineGraphemes[hIdx];
                    termHeadline.appendChild(charSpan);

                    setTimeout(() => {
                        charSpan.classList.remove('just-typed');
                    }, 140);

                    playKeystrokeSound();
                    hIdx++;
                    setTimeout(typeHeadline, 24 + Math.random() * 16);
                } else {
                    // Headline complete -> start subline
                    setTimeout(typeSubline, 120);
                }
            }

            let sIdx = 0;
            function typeSubline() {
                if (token !== activeTypingToken) return;

                if (sIdx < sublineGraphemes.length) {
                    const charSpan = document.createElement('span');
                    charSpan.className = 'term-char';
                    charSpan.textContent = sublineGraphemes[sIdx];
                    termSubline.appendChild(charSpan);

                    playKeystrokeSound();
                    sIdx++;
                    setTimeout(typeSubline, 18 + Math.random() * 14);
                } else {
                    // Subline complete -> stream telemetry lines
                    revealTelemetry(0);
                }
            }

            function revealTelemetry(tIdx) {
                if (token !== activeTypingToken) return;

                if (tIdx < currentData.telemetry.length) {
                    const li = document.createElement('li');
                    li.innerHTML = `<span class="term-telemetry-bullet">></span><span>${currentData.telemetry[tIdx]}</span>`;
                    termTelemetry.appendChild(li);

                    requestAnimationFrame(() => {
                        li.classList.add('revealed');
                    });

                    playKeystrokeSound();
                    setTimeout(() => revealTelemetry(tIdx + 1), 90);
                } else {
                    // Telemetry complete -> play final confirmation beep & reveal action links!
                    playConfirmationBeep();
                    renderActions(currentData.actions);
                    if (termActions) {
                        termActions.classList.add('revealed');
                    }
                }
            }

            function renderActions(actionsList) {
                if (!termActions || !actionsList) return;
                termActions.innerHTML = '';
                actionsList.forEach(act => {
                    const btn = document.createElement('button');
                    btn.className = `term-action-btn ${act.highlight ? 'highlight' : ''}`;
                    btn.innerHTML = `<span>${act.text}</span><span class="btn-arrow">${act.arrow}</span>`;
                    btn.addEventListener('click', (e) => {
                        e.stopPropagation();
                        playTactileSwitch();
                        if (act.fn) act.fn();
                    });
                    termActions.appendChild(btn);
                });
            }

            typeHeadline();
        }

        // Master ScrollTrigger Choreography
        ScrollTrigger.create({
            trigger: '#story-track',
            start: 'top top',
            end: 'bottom bottom',
            scrub: 0.6,
            onUpdate: (self) => {
                const progress = self.progress; // 0.0 to 1.0
                globalScrollProgress = progress;

                // Update bottom scrubber meter
                if (hudScrubberProgress) {
                    hudScrubberProgress.style.width = `${progress * 100}%`;
                }

                // Intro Viewport & Terminal HUD State
                if (introViewport && terminalHud) {
                    if (progress > 0.04) {
                        introViewport.classList.add('dismissed');
                        terminalHud.classList.add('active');
                        if (currentTerminalIdx === -1) {
                            renderTerminalSection(0);
                        }
                    } else {
                        introViewport.classList.remove('dismissed');
                        terminalHud.classList.remove('active');
                        currentTerminalIdx = -1;
                        if (termHistory) termHistory.innerHTML = '';
                    }
                }

                // Determine active scene index (0..4)
                let currentScene = 0;
                if (progress < 0.26) currentScene = 0;
                else if (progress < 0.46) currentScene = 1;
                else if (progress < 0.66) currentScene = 2;
                else if (progress < 0.86) currentScene = 3;
                else currentScene = 4;

                if (currentScene !== activeSceneIdx) {
                    activeSceneIdx = currentScene;
                    playMechanicalShutter();
                    updateSceneUI(currentScene);
                    if (progress > 0.04) {
                        renderTerminalSection(currentScene);
                    }
                }
            }
        });
    }

    // Update Header Stepper, Bottom Badges and Blueprint Map
    function updateSceneUI(idx) {
        // Update Stepper Pills
        stepPills.forEach((pill, i) => {
            if (i === idx) {
                pill.classList.add('active');
                if (window.innerWidth <= 768 && pill.scrollIntoView) {
                    pill.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
                }
            } else {
                pill.classList.remove('active');
            }
        });

        // Update Location Name
        if (hudLocationName && roomMeta[idx]) {
            hudLocationName.textContent = roomMeta[idx].name;
        }

        // Update Blueprint Active Room and Beacon
        Object.keys(blueprintRooms).forEach((key) => {
            const roomEl = blueprintRooms[key];
            if (roomEl) {
                if (parseInt(key) === idx) {
                    roomEl.classList.add('active');
                } else {
                    roomEl.classList.remove('active');
                }
            }
        });

        if (bpBeacon && roomMeta[idx]) {
            bpBeacon.setAttribute('cx', roomMeta[idx].cx);
            bpBeacon.setAttribute('cy', roomMeta[idx].cy);
        }
    }

    // Enter Button Trigger from Welcome Screen
    const introEnterTrigger = document.getElementById('intro-enter-trigger');
    if (introEnterTrigger) {
        introEnterTrigger.addEventListener('click', () => {
            unlockAudio();
            playTactileSwitch();
            window.navToSection(0);
        });
    }

    // Stepper Pills Click Triggers
    stepPills.forEach((pill) => {
        pill.addEventListener('click', () => {
            const sec = parseInt(pill.getAttribute('data-sec'), 10);
            window.navToSection(sec);
        });
    });

    // ====================================================
    // 6. RENDER LOOP (Three.js + Hotspot Projection)
    // ====================================================
    const tempVec = new THREE.Vector3();

    function renderLoop() {
        requestAnimationFrame(renderLoop);

        // 1. Interpolate camera position and target from scroll progress
        const targetState = getCameraState(globalScrollProgress);

        // Gentle mouse parallax damping
        targetTiltX += (mouseY * 2.5 - targetTiltX) * 0.05;
        targetTiltY += (mouseX * 4.0 - targetTiltY) * 0.05;

        camera.position.x = targetState.camX + targetTiltY * 0.6;
        camera.position.y = targetState.camY - targetTiltX * 0.4;
        camera.position.z = targetState.camZ;

        camera.lookAt(
            targetState.lookX + targetTiltY * 0.8,
            targetState.lookY - targetTiltX * 0.5,
            targetState.lookZ
        );

        // 2. Animate dust particles on GPU (zero vertex buffer re-uploads)
        particleSystem.rotation.y += 0.0003;

        // 3. Project 3D Hotspots to 2D Screen Space (Hardware-accelerated translate3d)
        const halfWidth = window.innerWidth / 2;
        const halfHeight = window.innerHeight / 2;

        spatialHotspots.forEach((hs) => {
            if (!hs.domElement) return;

            // Only show hotspots belonging to active scene or neighboring room
            const distZ = Math.abs(camera.position.z - hs.pos.z);
            const isRelevant = Math.abs(hs.sceneIdx - activeSceneIdx) <= 1 && distZ < 130 && distZ > 8;

            if (!isRelevant) {
                if (hs.domElement.style.opacity !== '0') {
                    hs.domElement.style.opacity = '0';
                    hs.domElement.style.pointerEvents = 'none';
                }
                return;
            }

            tempVec.copy(hs.pos);
            tempVec.project(camera);

            // If behind camera
            if (tempVec.z > 1) {
                if (hs.domElement.style.opacity !== '0') {
                    hs.domElement.style.opacity = '0';
                    hs.domElement.style.pointerEvents = 'none';
                }
                return;
            }

            const screenX = tempVec.x * halfWidth + halfWidth;
            const screenY = -tempVec.y * halfHeight + halfHeight;

            hs.domElement.style.transform = `translate3d(${screenX}px, ${screenY}px, 0) translate(-50%, -50%)`;
            if (hs.domElement.style.opacity !== '1') {
                hs.domElement.style.opacity = '1';
                hs.domElement.style.pointerEvents = 'auto';
            }
        });

        // 4. Render WebGL Scene
        renderer.render(scene, camera);
    }

    renderLoop();

    // Resize Handler with capped pixel ratio for buttery 60 FPS
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
        const maxDPR = window.innerWidth <= 768 ? 1.0 : Math.min(window.devicePixelRatio, 1.25);
        renderer.setPixelRatio(maxDPR);
    });

    // ====================================================
    // 7. ARCHITECTURAL SLIDE-OUT DRAWERS LOGIC
    // ====================================================
    window.openDrawer = function (drawerId) {
        playTactileSwitch();
        const drawer = document.getElementById(drawerId);
        if (drawer) {
            drawer.classList.add('active');
            document.body.style.overflow = 'hidden'; // Lock background scroll when drawer is open
        }
    };

    window.closeDrawer = function (drawerId) {
        playTactileSwitch();
        const drawer = document.getElementById(drawerId);
        if (drawer) {
            drawer.classList.remove('active');
            document.body.style.overflow = '';
        }
    };

    // Close on backdrop click
    document.querySelectorAll('.arch-drawer-backdrop').forEach((backdrop) => {
        backdrop.addEventListener('click', (e) => {
            if (e.target === backdrop) {
                playTactileSwitch();
                backdrop.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    });

    // Close on ESC key
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            document.querySelectorAll('.arch-drawer-backdrop.active').forEach((drawer) => {
                drawer.classList.remove('active');
            });
            document.body.style.overflow = '';
        }
    });

    // Attach click sound to all buttons & links
    document.querySelectorAll('button, .card-cta-btn, .bp-room').forEach((el) => {
        el.addEventListener('click', () => {
            playTactileSwitch();
        });
    });

    // ====================================================
    // 8. ONLINE GRIEVANCE FORM & TOKEN GENERATOR
    // ====================================================
    const grievanceForm = document.getElementById('grievance-form');
    const grievanceSuccessBox = document.getElementById('grievance-success-box');
    const outTokenNum = document.getElementById('out-token-num');

    if (grievanceForm) {
        grievanceForm.addEventListener('submit', (e) => {
            e.preventDefault();
            playTactileSwitch();

            const name = document.getElementById('g-name').value;
            const phone = document.getElementById('g-phone').value;
            const mohalla = document.getElementById('g-mohalla').value;
            const category = document.getElementById('g-category').value;
            const desc = document.getElementById('g-desc').value;

            // Generate unique civic token
            const randomNum = Math.floor(1000 + Math.random() * 9000);
            const token = `DSD-2026-${randomNum}`;

            // Save to localStorage
            const newRecord = {
                token: token,
                name: name,
                phone: phone,
                mohalla: mohalla,
                category: category,
                desc: desc,
                date: new Date().toLocaleDateString('hi-IN'),
                status: 'दर्ज (समीक्षाधीन)'
            };

            const existingRecords = JSON.parse(localStorage.getItem('dasdoi_grievances') || '[]');
            existingRecords.unshift(newRecord);
            localStorage.setItem('dasdoi_grievances', JSON.stringify(existingRecords));

            // Show success
            if (outTokenNum) outTokenNum.textContent = token;
            grievanceForm.style.display = 'none';
            if (grievanceSuccessBox) grievanceSuccessBox.style.display = 'block';
        });
    }

    window.resetGrievanceForm = function () {
        playTactileSwitch();
        if (grievanceForm) {
            grievanceForm.reset();
            grievanceForm.style.display = 'block';
        }
        if (grievanceSuccessBox) {
            grievanceSuccessBox.style.display = 'none';
        }
    };

})();
