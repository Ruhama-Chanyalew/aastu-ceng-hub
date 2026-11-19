/**
 * AASTU Robotics & Biomechanical Anatomy High-End Simulator
 * Features:
 * - High-DPI Retina Rendering
 * - Photorealistic Industrial Robot Manipulator (Metallic bevels, harmonic drives, LED rings, braided cabling)
 * - Anatomical Musculoskeletal Human Arm (Humerus, Radius, Ulna, Biceps/Triceps striations, neural pulses)
 * - Interactive Biomechanical Morph / Peeling Slider
 * - Analytical Inverse Kinematics (Elbow-up / Elbow-down)
 * - Interactive Workpiece Pick-and-Place Sandbox Challenge
 */

class RoboticsVisualizer {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    
    // Arm link lengths (in logical pixels)
    this.l1 = 155; // Upper arm / Link 1
    this.l2 = 135; // Forearm / Link 2
    this.l3 = 55;  // Hand / End-effector (Gripper)
    
    // Joint angles in radians
    this.theta1 = -Math.PI / 3.8; // Shoulder / Joint 1
    this.theta2 = Math.PI / 2.6;   // Elbow / Joint 2
    this.theta3 = -Math.PI / 5;    // Wrist / Joint 3
    
    // Gripper aperture (0 = closed, 1 = open)
    this.gripperOpen = 0.8;
    
    // View modes: 'split', 'human', 'robot', 'morph'
    this.viewMode = 'split'; 
    this.morphProgress = 0.5; // For morph wipe (0 = 100% human, 1 = 100% robot)
    
    this.showWorkEnvelope = true;
    this.showFrames = true;
    this.showNerves = true;
    this.showCables = true;
    this.isDraggingTarget = false;
    this.isDraggingMorph = false;
    
    // Interactive Pick-and-Place Workpiece Cube
    this.cube = {
      x: 160,
      y: 110,
      size: 26,
      isHeld: false,
      color: '#f59e0b'
    };

    // Trajectory History for path visualization
    this.pathHistory = [];
    this.maxPathPoints = 40;

    // Neural pulse animation timestamp
    this.animTime = 0;
    
    this.origin = { x: 140, y: 310 };

    this.setupHighDPICanvas();
    this.initEvents();
    this.startAnimationLoop();
  }

  setupHighDPICanvas() {
    const dpr = window.devicePixelRatio || 1;
    const rect = this.canvas.getBoundingClientRect();
    const displayWidth = rect.width || 560;
    const displayHeight = rect.height || 420;

    this.logicalWidth = displayWidth;
    this.logicalHeight = displayHeight;
    this.canvas.width = displayWidth * dpr;
    this.canvas.height = displayHeight * dpr;

    this.ctx.resetTransform();
    this.ctx.scale(dpr, dpr);
    this.origin = { x: displayWidth * 0.28, y: displayHeight * 0.76 };
  }

  setAngles(deg1, deg2, deg3) {
    this.theta1 = (deg1 * Math.PI) / 180;
    this.theta2 = (deg2 * Math.PI) / 180;
    this.theta3 = (deg3 * Math.PI) / 180;
    this.updateForwardKinematics();
    if (window.soundFx) window.soundFx.playServo();
  }

  setViewMode(mode) {
    this.viewMode = mode;
  }

  setMorphProgress(val) {
    this.morphProgress = Math.max(0, Math.min(1, val));
  }

  toggleWorkEnvelope(show) {
    this.showWorkEnvelope = show;
  }

  toggleFrames(show) {
    this.showFrames = show;
  }

  toggleNerves(show) {
    this.showNerves = show;
  }

  toggleCables(show) {
    this.showCables = show;
  }

  initEvents() {
    const handleMove = (e) => {
      const rect = this.canvas.getBoundingClientRect();
      const clientX = e.clientX || (e.touches && e.touches[0].clientX);
      const clientY = e.clientY || (e.touches && e.touches[0].clientY);
      if (clientX === undefined) return;
      
      const mouseX = clientX - rect.left;
      const mouseY = clientY - rect.top;
      
      if (this.isDraggingTarget) {
        const tx = mouseX - this.origin.x;
        const ty = mouseY - this.origin.y;
        this.solveInverseKinematics(tx, ty);
        if (window.soundFx) window.soundFx.playServo();
      }
    };

    this.canvas.addEventListener('mousedown', (e) => {
      this.isDraggingTarget = true;
      handleMove(e);
    });

    window.addEventListener('mouseup', () => {
      this.isDraggingTarget = false;
    });

    this.canvas.addEventListener('mousemove', handleMove);
    this.canvas.addEventListener('touchstart', (e) => {
      this.isDraggingTarget = true;
      handleMove(e);
    }, { passive: true });
    this.canvas.addEventListener('touchmove', handleMove, { passive: true });
    window.addEventListener('touchend', () => {
      this.isDraggingTarget = false;
    });

    window.addEventListener('resize', () => {
      this.setupHighDPICanvas();
    });
  }

  solveInverseKinematics(targetX, targetY) {
    const r = Math.sqrt(targetX * targetX + targetY * targetY);
    const maxReach = this.l1 + this.l2 + this.l3;
    const minReach = Math.abs(this.l1 - this.l2) + 10;

    let clampedX = targetX;
    let clampedY = targetY;
    if (r > maxReach - 2) {
      clampedX = (targetX / r) * (maxReach - 2);
      clampedY = (targetY / r) * (maxReach - 2);
    } else if (r < minReach) {
      clampedX = (targetX / r) * minReach;
      clampedY = (targetY / r) * minReach;
    }

    const wristAngle = Math.atan2(clampedY, clampedX);
    const wx = clampedX - this.l3 * Math.cos(wristAngle);
    const wy = clampedY - this.l3 * Math.sin(wristAngle);

    const D = (wx * wx + wy * wy - this.l1 * this.l1 - this.l2 * this.l2) / (2 * this.l1 * this.l2);
    const clampedD = Math.max(-1, Math.min(1, D));

    // Elbow-up analytical solution
    this.theta2 = -Math.acos(clampedD);
    this.theta1 = Math.atan2(wy, wx) - Math.atan2(this.l2 * Math.sin(this.theta2), this.l1 + this.l2 * Math.cos(this.theta2));
    this.theta3 = wristAngle - (this.theta1 + this.theta2);

    this.updateForwardKinematics();
    this.updateControlSliders();
  }

  updateControlSliders() {
    const s1 = document.getElementById('slider-theta1');
    const s2 = document.getElementById('slider-theta2');
    const s3 = document.getElementById('slider-theta3');
    const v1 = document.getElementById('val-theta1');
    const v2 = document.getElementById('val-theta2');
    const v3 = document.getElementById('val-theta3');

    const deg1 = Math.round((this.theta1 * 180) / Math.PI);
    const deg2 = Math.round((this.theta2 * 180) / Math.PI);
    const deg3 = Math.round((this.theta3 * 180) / Math.PI);

    if (s1 && v1) { s1.value = deg1; v1.textContent = `${deg1}°`; }
    if (s2 && v2) { s2.value = deg2; v2.textContent = `${deg2}°`; }
    if (s3 && v3) { s3.value = deg3; v3.textContent = `${deg3}°`; }
  }

  updateForwardKinematics() {
    const x0 = 0;
    const y0 = 0;

    const x1 = this.l1 * Math.cos(this.theta1);
    const y1 = this.l1 * Math.sin(this.theta1);

    const a12 = this.theta1 + this.theta2;
    const x2 = x1 + this.l2 * Math.cos(a12);
    const y2 = y1 + this.l2 * Math.sin(a12);

    const a123 = a12 + this.theta3;
    const x3 = x2 + this.l3 * Math.cos(a123);
    const y3 = y2 + this.l3 * Math.sin(a123);

    this.jointPositions = {
      base: { x: x0, y: y0 },
      elbow: { x: x1, y: y1 },
      wrist: { x: x2, y: y2 },
      endEffector: { x: x3, y: y3 },
      orientation: a123
    };

    // Add point to trajectory history
    this.pathHistory.push({ x: x3, y: y3 });
    if (this.pathHistory.length > this.maxPathPoints) {
      this.pathHistory.shift();
    }

    // Telemetry updates
    const posElem = document.getElementById('robot-telemetry-pos');
    const phiElem = document.getElementById('robot-telemetry-phi');
    if (posElem) posElem.textContent = `X: ${Math.round(x3)}, Y: ${Math.round(-y3)} mm`;
    if (phiElem) phiElem.textContent = `${Math.round((a123 * 180) / Math.PI)}°`;

    // Interactive pick and place detection
    const distToCube = Math.hypot(x3 - this.cube.x, y3 - this.cube.y);
    if (distToCube < 24 && !this.cube.isHeld && this.gripperOpen < 0.4) {
      this.cube.isHeld = true;
      if (window.soundFx) window.soundFx.playSuccess();
    } else if (this.cube.isHeld && this.gripperOpen >= 0.5) {
      this.cube.isHeld = false;
    }

    if (this.cube.isHeld) {
      this.cube.x = x3;
      this.cube.y = y3;
    }
  }

  startAnimationLoop() {
    const loop = (timestamp) => {
      this.animTime = timestamp * 0.001;
      this.render();
      requestAnimationFrame(loop);
    };
    requestAnimationFrame(loop);
  }

  render() {
    const ctx = this.ctx;
    const w = this.logicalWidth;
    const h = this.logicalHeight;

    ctx.clearRect(0, 0, w, h);

    // High-tech blueprint dark lab background
    this.drawBlueprintGrid(ctx, w, h);

    ctx.save();
    ctx.translate(this.origin.x, this.origin.y);

    if (this.showWorkEnvelope) {
      this.drawWorkEnvelope(ctx);
    }

    this.drawTrajectoryTrail(ctx);
    this.updateForwardKinematics();
    const jp = this.jointPositions;

    // Render based on active view mode
    if (this.viewMode === 'human') {
      this.drawHumanMusculoskeletalArm(ctx, jp);
    } else if (this.viewMode === 'robot') {
      this.drawIndustrialRobotArm(ctx, jp);
    } else if (this.viewMode === 'split') {
      // Split side-by-side comparison
      this.drawHumanMusculoskeletalArm(ctx, jp, -18);
      this.drawIndustrialRobotArm(ctx, jp, 18);
    } else if (this.viewMode === 'morph') {
      // Layered Morph: Human base, clipped Robot overlayer
      this.drawHumanMusculoskeletalArm(ctx, jp, 0);
      
      ctx.save();
      const wipeX = -150 + (w * this.morphProgress);
      ctx.beginPath();
      ctx.rect(wipeX - this.origin.x, -h, w, h * 2);
      ctx.clip();
      this.drawIndustrialRobotArm(ctx, jp, 0);
      
      // Draw neon morph border divider
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 3;
      ctx.setLineDash([6, 3]);
      ctx.beginPath();
      ctx.moveTo(wipeX - this.origin.x, -h);
      ctx.lineTo(wipeX - this.origin.x, h);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.restore();
    }

    // Draw Interactive Workpiece Cube
    this.drawWorkpiece(ctx);

    // Draw End-Effector Laser Target Reticle
    this.drawTargetReticle(ctx, jp.endEffector);

    if (this.showFrames) {
      this.drawDHCoordinateFrames(ctx, jp);
    }

    ctx.restore();
  }

  drawBlueprintGrid(ctx, w, h) {
    const isDark = document.documentElement.classList.contains('dark');
    
    // Background gradient
    const bgGrad = ctx.createRadialGradient(w / 2, h / 2, 50, w / 2, h / 2, w);
    if (isDark) {
      bgGrad.addColorStop(0, '#0f172a');
      bgGrad.addColorStop(1, '#020617');
    } else {
      bgGrad.addColorStop(0, '#ffffff');
      bgGrad.addColorStop(1, '#f1f5f9');
    }
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, w, h);

    // Subtle technical grid
    ctx.strokeStyle = isDark ? 'rgba(51, 65, 85, 0.4)' : 'rgba(226, 232, 240, 0.8)';
    ctx.lineWidth = 0.8;
    const step = 28;

    for (let x = 0; x < w; x += step) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, h);
      ctx.stroke();
    }
    for (let y = 0; y < h; y += step) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(w, y);
      ctx.stroke();
    }

    // Origin crosshair mark
    ctx.strokeStyle = isDark ? '#38bdf8' : '#2563eb';
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    ctx.arc(this.origin.x, this.origin.y, 4, 0, Math.PI * 2);
    ctx.stroke();
  }

  drawWorkEnvelope(ctx) {
    const maxR = this.l1 + this.l2 + this.l3;
    const minR = Math.max(0, this.l1 - this.l2);

    ctx.save();
    // Radial glowing gradient for reachable workspace
    const grad = ctx.createRadialGradient(0, 0, minR, 0, 0, maxR);
    grad.addColorStop(0, 'rgba(56, 189, 248, 0.02)');
    grad.addColorStop(0.8, 'rgba(56, 189, 248, 0.07)');
    grad.addColorStop(1, 'rgba(56, 189, 248, 0.15)');

    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(0, 0, maxR, 0, Math.PI * 2);
    ctx.arc(0, 0, minR, 0, Math.PI * 2, true);
    ctx.fill();

    // Outer boundary line with dashed pulse
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 1.5;
    ctx.setLineDash([5, 5]);
    ctx.beginPath();
    ctx.arc(0, 0, maxR, 0, Math.PI * 2);
    ctx.stroke();

    ctx.setLineDash([]);
    ctx.restore();
  }

  drawTrajectoryTrail(ctx) {
    if (this.pathHistory.length < 2) return;
    ctx.save();
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';

    for (let i = 0; i < this.pathHistory.length - 1; i++) {
      const alpha = (i / this.pathHistory.length) * 0.7;
      ctx.strokeStyle = `rgba(239, 68, 68, ${alpha})`;
      ctx.beginPath();
      ctx.moveTo(this.pathHistory[i].x, this.pathHistory[i].y);
      ctx.lineTo(this.pathHistory[i + 1].x, this.pathHistory[i + 1].y);
      ctx.stroke();
    }
    ctx.restore();
  }

  drawIndustrialRobotArm(ctx, jp, yOffset = 0) {
    ctx.save();
    ctx.translate(0, yOffset);

    // 1. Heavy Base Pedestal (Cast Iron with Chamfer & Status LEDs)
    const baseGrad = ctx.createLinearGradient(-35, 0, 35, 28);
    baseGrad.addColorStop(0, '#334155');
    baseGrad.addColorStop(0.5, '#475569');
    baseGrad.addColorStop(1, '#1e293b');

    ctx.fillStyle = baseGrad;
    ctx.beginPath();
    ctx.roundRect(-34, 0, 68, 26, 4);
    ctx.fill();

    ctx.fillStyle = '#64748b';
    ctx.beginPath();
    ctx.roundRect(-24, -12, 48, 14, 3);
    ctx.fill();

    // Base Status Indicator (Blinking green/blue LED)
    const ledAlpha = 0.7 + 0.3 * Math.sin(this.animTime * 4);
    ctx.fillStyle = `rgba(56, 189, 248, ${ledAlpha})`;
    ctx.shadowColor = '#38bdf8';
    ctx.shadowBlur = 8;
    ctx.beginPath();
    ctx.arc(0, 13, 3.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;

    // 2. Link 1 (Upper Arm - Industrial Aluminum Beam with Carbon fiber core)
    this.drawSegmentedLink(ctx, jp.base, jp.elbow, 26, '#0284c7', '#0369a1', '#0f172a');

    // 3. Link 2 (Forearm - Sleek Machined Truss)
    this.drawSegmentedLink(ctx, jp.elbow, jp.wrist, 20, '#0284c7', '#0284c7', '#1e293b');

    // 4. Flexible Braided Wire Harness Conduit (Connecting base -> elbow -> wrist)
    if (this.showCables) {
      ctx.strokeStyle = '#f59e0b';
      ctx.lineWidth = 3.5;
      ctx.lineCap = 'round';
      ctx.setLineDash([4, 2]);
      ctx.beginPath();
      ctx.moveTo(jp.base.x - 8, jp.base.y - 12);
      ctx.quadraticCurveTo(
        (jp.base.x + jp.elbow.x) / 2 - 16,
        (jp.base.y + jp.elbow.y) / 2 - 16,
        jp.elbow.x - 6,
        jp.elbow.y
      );
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(jp.elbow.x - 6, jp.elbow.y);
      ctx.quadraticCurveTo(
        (jp.elbow.x + jp.wrist.x) / 2 - 12,
        (jp.elbow.y + jp.wrist.y) / 2 - 12,
        jp.wrist.x - 5,
        jp.wrist.y
      );
      ctx.stroke();
      ctx.setLineDash([]);
    }

    // 5. Heavy-Duty Rotational Actuator Joints (Base, Elbow, Wrist)
    this.drawHarmonicJoint(ctx, jp.base.x, jp.base.y, 16, 'J1');
    this.drawHarmonicJoint(ctx, jp.elbow.x, jp.elbow.y, 13, 'J2');
    this.drawHarmonicJoint(ctx, jp.wrist.x, jp.wrist.y, 10, 'J3');

    // 6. Two-Jaw Parallel Industrial Gripper
    ctx.save();
    ctx.translate(jp.wrist.x, jp.wrist.y);
    ctx.rotate(jp.orientation);

    // Wrist mount flange
    ctx.fillStyle = '#475569';
    ctx.beginPath();
    ctx.roundRect(0, -9, 14, 18, 2);
    ctx.fill();

    // Pneumatic Gripper Body
    const gripGrad = ctx.createLinearGradient(14, -14, 30, 14);
    gripGrad.addColorStop(0, '#1e293b');
    gripGrad.addColorStop(1, '#334155');
    ctx.fillStyle = gripGrad;
    ctx.beginPath();
    ctx.roundRect(14, -13, 16, 26, 3);
    ctx.fill();

    // Gripper Jaws (Upper & Lower) with high-friction pads
    const spread = 8 * this.gripperOpen + 4;
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(30, -spread - 5, 24, 5); // Upper finger
    ctx.fillRect(30, spread, 24, 5);      // Lower finger

    // Orange polyurethane high-grip contact pads
    ctx.fillStyle = '#ea580c';
    ctx.fillRect(38, -spread, 16, 2);
    ctx.fillRect(38, spread - 2, 16, 2);

    ctx.restore();
    ctx.restore();
  }

  drawSegmentedLink(ctx, start, end, thickness, colorLight, colorDark, coreColor) {
    const angle = Math.atan2(end.y - start.y, end.x - start.x);
    const length = Math.hypot(end.x - start.x, end.y - start.y);

    ctx.save();
    ctx.translate(start.x, start.y);
    ctx.rotate(angle);

    // Outer structural shell
    const grad = ctx.createLinearGradient(0, -thickness / 2, 0, thickness / 2);
    grad.addColorStop(0, colorLight);
    grad.addColorStop(0.5, '#f8fafc');
    grad.addColorStop(1, colorDark);

    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.roundRect(8, -thickness / 2, length - 16, thickness, thickness / 3);
    ctx.fill();

    // Recessed Carbon-Fiber Inlay
    ctx.fillStyle = coreColor;
    ctx.beginPath();
    ctx.roundRect(16, -thickness / 4, length - 32, thickness / 2, 3);
    ctx.fill();

    // Mechanical Bevel & Bolts
    ctx.fillStyle = '#94a3b8';
    ctx.beginPath();
    ctx.arc(22, 0, 2.5, 0, Math.PI * 2);
    ctx.arc(length - 22, 0, 2.5, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
  }

  drawHarmonicJoint(ctx, x, y, radius, label) {
    ctx.save();
    // Outer flange disc
    const grad = ctx.createRadialGradient(x, y, 2, x, y, radius);
    grad.addColorStop(0, '#94a3b8');
    grad.addColorStop(0.7, '#334155');
    grad.addColorStop(1, '#0f172a');

    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Center pivot shaft
    ctx.fillStyle = '#0f172a';
    ctx.beginPath();
    ctx.arc(x, y, radius * 0.45, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#f8fafc';
    ctx.font = 'bold 8px monospace';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(label, x, y);

    ctx.restore();
  }

  drawHumanMusculoskeletalArm(ctx, jp, yOffset = 0) {
    ctx.save();
    ctx.translate(0, yOffset);

    // 1. Torso Clavicle & Pectoral Base
    ctx.fillStyle = 'rgba(217, 119, 6, 0.12)';
    ctx.beginPath();
    ctx.arc(jp.base.x - 35, jp.base.y + 12, 42, 0, Math.PI * 2);
    ctx.fill();

    // 2. Muscular Tissue Layers (Deltoid, Biceps Brachii, Triceps, Forearm)
    this.drawMuscularBody(ctx, jp.base, jp.elbow, 32, 'Biceps/Triceps');
    this.drawMuscularBody(ctx, jp.elbow, jp.wrist, 24, 'Brachioradialis');

    // 3. Anatomical Bone Framework (Humerus, Radius, Ulna)
    this.drawBone(ctx, jp.base, jp.elbow, 12, 'Humerus');
    this.drawForearmBones(ctx, jp.elbow, jp.wrist);

    // 4. Glowing Neural Nerve Impulses (Brachial Plexus -> Motor End Plates)
    if (this.showNerves) {
      this.drawPulsingNerves(ctx, jp);
    }

    // 5. Synovial Joint Capsules (Shoulder Ball & Socket, Elbow Hinge)
    ctx.fillStyle = '#b45309';
    ctx.beginPath();
    ctx.arc(jp.base.x, jp.base.y, 11, 0, Math.PI * 2);
    ctx.arc(jp.elbow.x, jp.elbow.y, 8, 0, Math.PI * 2);
    ctx.arc(jp.wrist.x, jp.wrist.y, 6, 0, Math.PI * 2);
    ctx.fill();

    // 6. Anatomical Hand with 5 Articulated Fingers
    this.drawHumanHand(ctx, jp.wrist, jp.orientation);

    ctx.restore();
  }

  drawMuscularBody(ctx, start, end, thickness, muscleName) {
    const angle = Math.atan2(end.y - start.y, end.x - start.x);
    const length = Math.hypot(end.x - start.x, end.y - start.y);

    ctx.save();
    ctx.translate(start.x, start.y);
    ctx.rotate(angle);

    // Translucent striated muscle envelope
    const grad = ctx.createLinearGradient(0, -thickness / 2, 0, thickness / 2);
    grad.addColorStop(0, 'rgba(220, 38, 38, 0.25)');
    grad.addColorStop(0.5, 'rgba(239, 68, 68, 0.45)');
    grad.addColorStop(1, 'rgba(185, 28, 28, 0.35)');

    ctx.fillStyle = grad;
    ctx.beginPath();
    // Fusiform belly shape of biological muscle
    ctx.moveTo(6, -6);
    ctx.quadraticCurveTo(length / 2, -thickness / 2, length - 6, -4);
    ctx.quadraticCurveTo(length / 2, thickness / 2, 6, 4);
    ctx.closePath();
    ctx.fill();

    // Striated muscle fiber texture lines
    ctx.strokeStyle = 'rgba(254, 202, 202, 0.3)';
    ctx.lineWidth = 1;
    for (let x = 14; x < length - 14; x += 10) {
      ctx.beginPath();
      ctx.moveTo(x, -thickness / 3.5);
      ctx.lineTo(x + 4, thickness / 3.5);
      ctx.stroke();
    }

    ctx.restore();
  }

  drawBone(ctx, start, end, width, label) {
    const angle = Math.atan2(end.y - start.y, end.x - start.x);
    const length = Math.hypot(end.x - start.x, end.y - start.y);

    ctx.save();
    ctx.translate(start.x, start.y);
    ctx.rotate(angle);

    // Bone shaft (Ivory / Cortical bone gradient)
    const boneGrad = ctx.createLinearGradient(0, -width / 2, 0, width / 2);
    boneGrad.addColorStop(0, '#fef3c7');
    boneGrad.addColorStop(0.5, '#ffffff');
    boneGrad.addColorStop(1, '#fde68a');

    ctx.fillStyle = boneGrad;
    ctx.beginPath();
    ctx.roundRect(8, -width / 2, length - 16, width, width / 2);
    ctx.fill();

    // Epiphysis (rounded bone ends)
    ctx.fillStyle = '#fef3c7';
    ctx.beginPath();
    ctx.arc(8, 0, width * 0.85, 0, Math.PI * 2);
    ctx.arc(length - 8, 0, width * 0.85, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
  }

  drawForearmBones(ctx, elbow, wrist) {
    const angle = Math.atan2(wrist.y - elbow.y, wrist.x - elbow.x);
    const length = Math.hypot(wrist.x - elbow.x, wrist.y - elbow.y);

    ctx.save();
    ctx.translate(elbow.x, elbow.y);
    ctx.rotate(angle);

    ctx.fillStyle = '#fef3c7';
    // Radius bone (lateral)
    ctx.beginPath();
    ctx.roundRect(6, -8, length - 12, 6, 3);
    ctx.fill();

    // Ulna bone (medial)
    ctx.beginPath();
    ctx.roundRect(6, 2, length - 12, 6, 3);
    ctx.fill();

    ctx.restore();
  }

  drawPulsingNerves(ctx, jp) {
    ctx.save();
    // Animated glowing electrical nerve impulses
    const pulseOffset = (this.animTime * 3) % 1;

    ctx.strokeStyle = '#facc15';
    ctx.lineWidth = 2;
    ctx.shadowColor = '#facc15';
    ctx.shadowBlur = 6;

    ctx.beginPath();
    ctx.moveTo(jp.base.x, jp.base.y);
    ctx.lineTo(jp.elbow.x, jp.elbow.y);
    ctx.lineTo(jp.wrist.x, jp.wrist.y);
    ctx.stroke();

    // Pulsing electrical packet
    const t = pulseOffset;
    let px, py;
    if (t < 0.5) {
      const u = t * 2;
      px = jp.base.x + (jp.elbow.x - jp.base.x) * u;
      py = jp.base.y + (jp.elbow.y - jp.base.y) * u;
    } else {
      const u = (t - 0.5) * 2;
      px = jp.elbow.x + (jp.wrist.x - jp.elbow.x) * u;
      py = jp.elbow.y + (jp.wrist.y - jp.elbow.y) * u;
    }

    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(px, py, 3.5, 0, Math.PI * 2);
    ctx.fill();

    ctx.shadowBlur = 0;
    ctx.restore();
  }

  drawHumanHand(ctx, wrist, orientation) {
    ctx.save();
    ctx.translate(wrist.x, wrist.y);
    ctx.rotate(orientation);

    // Carpal Palm Cluster
    ctx.fillStyle = '#f59e0b';
    ctx.beginPath();
    ctx.ellipse(14, 0, 11, 8, 0, 0, Math.PI * 2);
    ctx.fill();

    // 5 Articulated Fingers
    const fingerAngles = [-0.35, -0.16, 0.02, 0.18, 0.38];
    const fingerLengths = [18, 24, 27, 24, 16];

    fingerAngles.forEach((fAngle, idx) => {
      ctx.save();
      ctx.translate(18, (idx - 2) * 3.5);
      ctx.rotate(fAngle);

      // Phalanx segments
      ctx.strokeStyle = '#d97706';
      ctx.lineWidth = 3.2;
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(fingerLengths[idx], 0);
      ctx.stroke();

      // Tactile fingertip whorl
      ctx.fillStyle = '#f59e0b';
      ctx.beginPath();
      ctx.arc(fingerLengths[idx], 0, 2, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    });

    ctx.restore();
  }

  drawWorkpiece(ctx) {
    ctx.save();
    const c = this.cube;

    // Soft drop shadow
    ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
    ctx.beginPath();
    ctx.ellipse(c.x, c.y + c.size / 2 + 3, c.size / 2, 4, 0, 0, Math.PI * 2);
    ctx.fill();

    // Workpiece block
    const blockGrad = ctx.createLinearGradient(c.x - c.size / 2, c.y - c.size / 2, c.x + c.size / 2, c.y + c.size / 2);
    blockGrad.addColorStop(0, '#fbbf24');
    blockGrad.addColorStop(1, '#d97706');

    ctx.fillStyle = blockGrad;
    ctx.beginPath();
    ctx.roundRect(c.x - c.size / 2, c.y - c.size / 2, c.size, c.size, 4);
    ctx.fill();

    ctx.strokeStyle = '#78350f';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // Technical cross icon on workpiece
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    ctx.moveTo(c.x - 5, c.y);
    ctx.lineTo(c.x + 5, c.y);
    ctx.moveTo(c.x, c.y - 5);
    ctx.lineTo(c.x, c.y + 5);
    ctx.stroke();

    ctx.restore();
  }

  drawTargetReticle(ctx, ee) {
    ctx.save();
    // Glowing laser reticle
    ctx.strokeStyle = '#ef4444';
    ctx.lineWidth = 1.8;
    ctx.beginPath();
    ctx.arc(ee.x, ee.y, 9, 0, Math.PI * 2);
    ctx.stroke();

    // Laser cross lines
    ctx.beginPath();
    ctx.moveTo(ee.x - 14, ee.y);
    ctx.lineTo(ee.x + 14, ee.y);
    ctx.moveTo(ee.x, ee.y - 14);
    ctx.lineTo(ee.x, ee.y + 14);
    ctx.stroke();

    ctx.fillStyle = '#ef4444';
    ctx.beginPath();
    ctx.arc(ee.x, ee.y, 2.5, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
  }

  drawDHCoordinateFrames(ctx, jp) {
    this.drawSingleDHFrame(ctx, jp.base.x, jp.base.y, 0, "0");
    this.drawSingleDHFrame(ctx, jp.elbow.x, jp.elbow.y, this.theta1, "1");
    this.drawSingleDHFrame(ctx, jp.wrist.x, jp.wrist.y, this.theta1 + this.theta2, "2");
    this.drawSingleDHFrame(ctx, jp.endEffector.x, jp.endEffector.y, jp.orientation, "3");
  }

  drawSingleDHFrame(ctx, x, y, angle, label) {
    const len = 28;
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(angle);

    // X Axis (Red)
    ctx.strokeStyle = '#ef4444';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(len, 0);
    ctx.stroke();

    ctx.fillStyle = '#ef4444';
    ctx.beginPath();
    ctx.moveTo(len, -3);
    ctx.lineTo(len + 6, 0);
    ctx.lineTo(len, 3);
    ctx.fill();

    // Y Axis (Green)
    ctx.strokeStyle = '#10b981';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(0, -len);
    ctx.stroke();

    ctx.fillStyle = '#10b981';
    ctx.beginPath();
    ctx.moveTo(-3, -len);
    ctx.lineTo(0, -len - 6);
    ctx.lineTo(3, -len);
    ctx.fill();

    // Label tag
    ctx.fillStyle = '#ffffff';
    ctx.shadowColor = '#000000';
    ctx.shadowBlur = 4;
    ctx.font = 'bold 10px monospace';
    ctx.fillText(`{${label}}`, 7, 13);

    ctx.restore();
  }
}

window.RoboticsVisualizer = RoboticsVisualizer;
