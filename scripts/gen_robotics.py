"""
Robotics and Computer Vision (ECEg5511) - All 7 Chapters
Authoritative References:
- John J. Craig: Introduction to Robotics: Mechanics and Control (4th Ed.)
- R. K. Mittal & I. J. Nagrath: Robotics and Control
- David A. Forsyth & Jean Ponce: Computer Vision: A Modern Approach
- Richard Szeliski: Computer Vision: Algorithms and Applications
- Mikell P. Groover: Industrial Robotics
- AASTU Syllabus ECEg5511
"""

def get_robotics_notes():
    return {
        "eceg5511-ch1": {
            "courseId": "eceg5511",
            "courseCode": "ECEg5511",
            "chapterNum": 1,
            "title": "Fundamentals of Robot & Human vs Robot Anatomy",
            "readTime": "11 min read",
            "cloRef": "CLO1: Identify actuators and sensors; compare biological and robotic systems",
            "authoritativeSources": "John J. Craig (Ch. 1); Groover (Ch. 1-2); Mittal & Nagrath (Ch. 1); AASTU Syllabus",
            "sections": [
                {
                    "id": "rob-1-1",
                    "heading": "1.1 Formal Definition of Industrial Robot & Spatial Degrees of Freedom (DOF)",
                    "content": """According to the International Organization for Standardization (**ISO 8373**), an **Industrial Robot** is an *actuated mechanism programmable in two or more axes with a degree of autonomy, moving within its environment, to perform intended tasks*.

### Spatial Degrees of Freedom (6-DOF) Requirement:
In 3D Euclidean space, a rigid body has **6 Degrees of Freedom (DOF)**:
1. **Positioning DOFs (3 Cartesian Translations):** Moving the wrist center to an arbitrary target coordinate $(X, Y, Z)$.
2. **Orientation DOFs (3 Tool Rotations):** Orienting the end-effector or tool flange with arbitrary angles:
   - **Roll ($\\psi$):** Rotation about the longitudinal tool approach axis ($Z$).
   - **Pitch ($\\theta$):** Rotation up/down about the transverse axis ($Y$).
   - **Yaw ($\\phi$):** Rotation left/right about the vertical axis ($X$).

> [!NOTE]
> A manipulator with fewer than 6-DOF is **under-actuated** and cannot achieve arbitrary orientation at every spatial coordinate (e.g., a 4-DOF SCARA robot can position in $(X,Y,Z)$ but only rotate about the vertical yaw axis). A manipulator with $> 6\\text{-DOF}$ is **kinematically redundant**, allowing it to avoid obstacles or singularities while maintaining a fixed tool pose."""
                },
                {
                    "id": "rob-1-2",
                    "heading": "1.2 Biomechanical Comparison: Human Anatomy vs Robotic Systems",
                    "content": """To design anthropomorphic and bio-inspired robots, engineers map human musculoskeletal and sensory systems into electro-mechanical equivalents:

| Biological Human Anatomy | Robotic Engineering Equivalent | Primary Engineering Function | Physical Constraints & Tradeoffs |
|---|---|---|---|
| **Skeletal Bones** | Rigid Structural Links (Aluminum, Carbon-fiber) | Provides rigid structural mechanical support and defines kinematics | High stiffness vs low mass (inertia minimization) |
| **Synovial Joints (Hinge, Ball)** | Kinematic Joints (Revolute $R$, Prismatic $P$) | Constrains relative motion between adjacent links | Friction, backlash, bearing wear, mechanical travel limits |
| **Skeletal Muscles (Agonist/Antagonist)** | Actuators (Brushless DC Motors, Hydraulics, Pneumatics) | Generates driving mechanical force or torque | Torque density, power-to-weight ratio, cooling |
| **Tendons & Ligaments** | Harmonic Drives, Timing Belts, Lead Screws | Transmits mechanical power from actuator to joint | Torsional compliance, backlash, belt stretch |
| **Afferent Nerves & Proprioceptors** | Internal Feedback Sensors (Optical Encoders, Resolvers) | Measures real-time joint angles ($\\theta$) and angular speeds ($\\dot{\\theta}$) | Quantization noise, resolution, thermal drift |
| **Eyes (Retina & Fovea)** | Machine Vision Sensors (Stereo CMOS cameras, LiDAR) | Captures 2D and 3D external spatial context | Frame rate, rolling shutter distortion, lighting sensitivity |
| **Skin (Mechanoreceptors)** | Tactile & Force/Torque Sensors (Piezoelectric, Strain gauges) | Measures contact force ($F_x, F_y, F_z$) and slippage | Dynamic range, sensor hysteresis, packaging fragility |
| **Central Nervous System (Brain)** | Embedded Real-Time Controller (ARM Cortex / DSP / FPGA) | Executes kinematics, trajectory interpolation, and PID control loops | Real-time determinism, compute latency, bus bandwidth |"""
                },
                {
                    "id": "rob-1-3",
                    "heading": "1.3 Joint Classifications & Manipulator Topologies",
                    "content": """### Basic Kinematic Joint Types:
1. **Revolute Joint ($R$):** Allows 1 rotational DOF between links about a single axis (Joint variable = angle $\\theta_i$).
2. **Prismatic Joint ($P$):** Allows 1 translational (sliding) DOF along a linear vector (Joint variable = extension distance $d_i$).
3. **Cylindrical ($C$ - 2 DOF), Spherical ($S$ - 3 DOF):** Usually decomposed into orthogonal $R$ and $P$ joints in industrial robotics.

---

### Five Major Industrial Robot Topologies:
- **1. Cartesian / Gantry ($PPP$):** Three linear axes. Workspace is a rectangular box. Extremely high payload and linear precision; large physical footprint.
- **2. Cylindrical ($RPP$):** One revolute base joint and two prismatic extension axes. Workspace is a cylindrical envelope.
- **3. Spherical / Polar ($RRP$):** Two rotary joints and one telescoping arm. Workspace is a spherical shell.
- **4. SCARA ($RRP$ - Selective Compliance Assembly Robot Arm):** Two parallel revolute joints in the horizontal plane and one vertical prismatic joint. Extremely stiff vertically (for inserting electronic components) but compliant laterally in the horizontal plane.
- **5. Articulated / Anthropomorphic ($RRR$):** Three revolute joints mimicking the human waist, shoulder, and elbow. Maximum dextrous mobility in a compact footprint; non-linear kinematics."""
                },
                {
                    "id": "rob-1-4",
                    "heading": "1.4 Workspace Geometry, Repeatability vs Accuracy ($ISO\\ 9283$)",
                    "content": """### Reachable vs Dextrous Workspace:
- **Reachable Workspace ($W_R$):** The total volume of 3D space that the end-effector tip can physically reach in at least one orientation.
- **Dextrous Workspace ($W_D$):** The subset volume within the reachable workspace where the end-effector can reach every point in **all possible arbitrary orientations**.
$$W_D \\subseteq W_R$$

### Accuracy vs Repeatability (ISO 9283 Definitions):
- **Accuracy:** The deviation between a commanded target coordinate in Cartesian space and the mean physical coordinate achieved by the robot:
  $$\\text{Accuracy} = \\| P_{commanded} - \\bar{P}_{actual} \\|$$
  Accuracy depends on kinematic manufacturing tolerances, link deflection, and thermal expansion.
- **Repeatability:** The measure of how closely the robot returns to the exact same physical position when executing identical commanded joint positions repeatedly:
  $$\\text{Repeatability} = 3\\sigma \\quad (\\text{spread of points around } \\bar{P})$$
> [!IMPORTANT]
> **Industrial Reality:** Commercial industrial robots are **far more repeatable than they are accurate**! An industrial robot may have an accuracy of $\\pm 1.5\\text{ mm}$, but an outstanding repeatability of $\\pm 0.02\\text{ mm}$."""
                },
                {
                    "id": "rob-1-5",
                    "heading": "1.5 End-Effectors & National Exit Exam Benchmarks",
                    "content": """### Industrial End-Effector Types:
1. **Mechanical Grippers:** Two-finger parallel jaw or three-finger angular grippers driven by pneumatic pistons or electric stepper motors.
2. **Vacuum / Suction Cups:** Uses Venturi effect vacuum ejectors to lift smooth, non-porous flat objects (glass sheets, metal panels).
3. **Magnetic Grippers:** Permanent magnets with mechanical release or electromagnets for handling ferromagnetic steel workpieces.
4. **Tool Flanges:** Spot-welding guns, arc-welding torches, paint-spraying nozzles, high-speed routing spindles."""
                }
            ]
        },
        "eceg5511-ch2": {
            "courseId": "eceg5511",
            "courseCode": "ECEg5511",
            "chapterNum": 2,
            "title": "Sensors and Machine Vision",
            "readTime": "12 min read",
            "cloRef": "CLO1: Identify sensors and actuators; examine machine vision hardware",
            "authoritativeSources": "Craig (Ch. 11); Mittal & Nagrath (Ch. 2); Forsyth & Ponce (Ch. 1-2); AASTU Syllabus",
            "sections": [
                {
                    "id": "rob-2-1",
                    "heading": "2.1 Internal Proprioceptive State Sensors (Encoders & Resolvers)",
                    "content": """Internal sensors measure the state of the robot itself (joint angle, velocity, motor current).

### 1. Incremental Optical Encoders:
Consists of a transparent glass disk patterned with radial opaque chrome lines, rotating between an LED light source and a photodiode detector.
- **Quadrature Tracks ($A$ and $B$):** Track $A$ and Track $B$ are physically shifted in phase by $90^\\circ$ electrical degrees.
  - Direction Detection: If $A$ leads $B$, the shaft rotates clockwise ($CW$). If $B$ leads $A$, the shaft rotates counter-clockwise ($CCW$).
  - **$4\\times$ Quadrature Decoding:** By counting both the rising and falling edges of both channels $A$ and $B$, the angular resolution is quadrupled:
    $$\\Delta \\theta = \\frac{360^\\circ}{4 \\times N_{lines}}$$
- **Index Pulse ($Z$ / Marker):** Fires exactly once per revolution to establish an absolute zero reference after homing.
- *Limitation:* Losing electrical power loses position; requires a homing cycle upon startup.

### 2. Absolute Optical Encoders:
Features concentric tracks encoded with **Gray Code** rather than standard binary.
> [!NOTE]
> **Why Gray Code is Mandatory:** In binary code, transitioning from $0111_2$ (7) to $1000_2$ (8) requires all 4 bits to switch simultaneously. If one photodetector switches slightly faster due to mechanical misalignment, transient intermediate erroneous states occur (e.g., $1111_2 = 15$). In **Gray Code**, exactly **one bit changes state** between any two consecutive values, eliminating bit transition glitches entirely."""
                },
                {
                    "id": "rob-2-2",
                    "heading": "2.2 External Tactile, Proximity & Force/Torque Wrist Transducers",
                    "content": """### Multi-Axis Wrist Force/Torque ($F/T$) Sensors:
Mounted between the robot's mounting flange and the end-effector tool.
- Consists of a monolithic metal flexure (Maltese cross structure) instrumented with semiconductor or metal foil **strain gauges** arranged in Wheatstone bridges.
- Resolves all 6 spatial components simultaneously:
  $$\\mathbf{F} = [F_x, F_y, F_z, M_x, M_y, M_z]^T$$
- Essential for compliant assembly tasks (inserting a peg into a hole without jamming) and force-controlled deburring or polishing.

### Proximity & Ranging Sensors:
- **Ultrasonic Sensors (Sonar):** Emits $40\\text{ kHz}$ acoustic pulses; measures Time-of-Flight (ToF):
  $$d = \\frac{v_{sound} \\cdot \\Delta t}{2} \\quad (v_{sound} \\approx 343\\text{ m/s})$$
  Susceptible to specular reflections and beam spread cone ($> 15^\\circ$).
- **Optical Infrared (IR) Time-of-Flight (ToF):** Measures the round-trip phase shift of amplitude-modulated NIR laser light ($c = 3 \\times 10^8\\text{ m/s}$). Provides millimeter precision at high sampling rates ($> 100\\text{ Hz}$)."""
                },
                {
                    "id": "rob-2-3",
                    "heading": "2.3 Machine Vision Sensors: CCD vs CMOS & Shutter Types",
                    "content": """| Sensor Feature | CCD (Charge-Coupled Device) | CMOS Active Pixel Sensor (APS) |
|---|---|---|
| **Architecture** | Charges shifted serially bucket-brigade style to a single output amplifier | Each pixel contains its own photodiode and readout transistors (3T / 4T) |
| **Noise & Dynamic Range** | Historically lower noise; higher dynamic range | Modern back-illuminated (BSI) CMOS rivals or exceeds CCD |
| **Power Consumption** | High ($> 2 - 5\\text{ W}$, requires multiple clock supply rails) | Very low ($< 200\\text{ mW}$, single supply) |
| **Readout Speed** | Limited by serial output amplifier bandwidth | Massive parallelism; high frame rates ($1000+\\text{ fps}$) |
| **Blooming & Smearing** | Over-saturated pixels bleed charge into entire columns | Blooming is confined strictly to the saturated pixel |

### Global Shutter vs Rolling Shutter:
- **Global Shutter:** All pixels in the entire array expose and capture light simultaneously. Essential for robotics and conveyor tracking to prevent motion blur and warping.
- **Rolling Shutter:** Exposes pixels row-by-row sequentially. Rapidly moving robot arms or rotating fan blades appear warped or distorted (the "jello effect")."""
                },
                {
                    "id": "rob-2-4",
                    "heading": "2.4 3D Depth Sensing Technologies & Stereo Triangulation",
                    "content": """### Stereo Vision Disparity Triangulation:
Stereo vision uses two calibrated cameras separated by baseline distance $B$ with parallel optical axes and identical focal length $f$:
$$\\text{Disparity } d = x_L - x_R$$
From similar triangles, depth $Z$ is inversely proportional to disparity:
$$Z = \\frac{f \\cdot B}{d}$$
$$\\Delta Z = -\\frac{Z^2}{f \\cdot B} \\cdot \\Delta d$$
> [!WARNING]
> Depth error $\\Delta Z$ increases quadratically with distance $Z^2$! Stereo vision is highly accurate at short ranges, but accuracy degrades significantly at large distances.

---

### 🧮 Worked Numerical Example:
**Problem:** A mobile robot navigating an AASTU campus hallway uses a stereo vision rig:
- Baseline distance between camera optical centers $B = 12\\text{ cm} = 0.12\\text{ m}$.
- Lens focal length $f = 6\\text{ mm} = 0.006\\text{ m}$.
- Sensor pixel pitch (width of 1 pixel) $p = 4.0\\ \\mu\\text{m} = 4.0 \\times 10^{-6}\\text{ m}$.
- An obstacle feature is detected at left pixel $x_L = 420\\text{ px}$ and right pixel $x_R = 360\\text{ px}$.
1. Calculate the disparity in pixels and in physical meters.
2. Determine the physical distance $Z$ to the obstacle in meters.
3. If subpixel matching has an error of $\\Delta d = 0.5\\text{ pixels}$, what is the depth measurement uncertainty $\\Delta Z$?

**Step-by-Step Solution:**
1. **Disparity:**
   $$d_{px} = 420 - 360 = 60\\text{ pixels}$$
   $$d = 60 \\times (4.0 \\times 10^{-6}\\text{ m}) = 2.4 \\times 10^{-4}\\text{ m} = 0.24\\text{ mm}$$

2. **Depth Distance $Z$:**
   $$Z = \\frac{f \\cdot B}{d} = \\frac{0.006 \\times 0.12}{2.4 \\times 10^{-4}} = \\frac{7.2 \\times 10^{-4}}{2.4 \\times 10^{-4}} = 3.00\\text{ meters}$$

3. **Depth Uncertainty $\\Delta Z$:**
   $$\\Delta d = 0.5 \\times 4.0 \\times 10^{-6}\\text{ m} = 2.0 \\times 10^{-6}\\text{ m}$$
   $$\\Delta Z = \\frac{Z^2}{f \\cdot B} \\cdot \\Delta d = \\frac{(3.0)^2}{0.006 \\times 0.12} \\times (2.0 \\times 10^{-6}) = \\frac{9.0}{7.2 \\times 10^{-4}} \\times 2.0 \\times 10^{-6} = 12,500 \\times 2.0 \\times 10^{-6} = 0.025\\text{ m} = 2.5\\text{ cm}$$"""
                },
                {
                    "id": "rob-2-5",
                    "heading": "2.5 Sensor Fusion & Extended Kalman Filter (EKF) Principles",
                    "content": """No single sensor is sufficient for autonomous robotic navigation. Optical encoders suffer from wheel slip; IMUs suffer from gyro bias integration drift; GPS is unavailable indoors; machine vision drops frames during illumination changes.

### Sensor Fusion via the Kalman Filter:
The **Kalman Filter (KF / EKF)** combines noisy measurements from multiple sensors into an optimal state estimate in two recursive phases:
1. **Prediction Step (Propagating state using odometry / kinematics):**
   $$\\hat{x}_k^- = f(\\hat{x}_{k-1}, u_{k-1})$$
   $$P_k^- = F P_{k-1} F^T + Q$$
2. **Correction / Update Step (Fusing observation from vision/LiDAR):**
   $$K_k = P_k^- H^T (H P_k^- H^T + R)^{-1}$$
   $$\\hat{x}_k = \\hat{x}_k^- + K_k (z_k - h(\\hat{x}_k^-))$$
   $$P_k = (I - K_k H) P_k^-$$
Where $K_k$ is the **Kalman Gain**. When measurement noise $R$ is small, $K_k \\to 1$ (the filter trusts the sensor); when process uncertainty $P_k^-$ is small, $K_k \\to 0$ (the filter trusts the kinematic model)."""
                }
            ]
        },
        "eceg5511-ch3": {
            "courseId": "eceg5511",
            "courseCode": "ECEg5511",
            "chapterNum": 3,
            "title": "Robot Kinematics (Forward, Inverse & DH Matrix)",
            "readTime": "14 min read",
            "cloRef": "CLO2: Examine kinematics and analyze DH transformation matrices",
            "authoritativeSources": "John J. Craig (Ch. 2-4); Mittal & Nagrath (Ch. 3); AASTU Syllabus",
            "sections": [
                {
                    "id": "rob-3-1",
                    "heading": "3.1 Homogeneous Transformations & $4 \\times 4$ Pose Representation",
                    "content": """In 3D kinematics, a coordinate frame attached to a rigid body is represented relative to a reference frame by a **$4 \\times 4$ Homogeneous Transformation Matrix ($T$)**:

$$T = \\begin{bmatrix} R_{3 \\times 3} & P_{3 \\times 1} \\\\ 0_{1 \\times 3} & 1 \\end{bmatrix} = \\begin{bmatrix} r_{11} & r_{12} & r_{13} & p_x \\\\ r_{21} & r_{22} & r_{23} & p_y \\\\ r_{31} & r_{32} & r_{33} & p_z \\\\ 0 & 0 & 0 & 1 \\end{bmatrix}$$

- $R_{3 \\times 3}$ is the orthogonal rotation matrix ($R^T = R^{-1}$, $\\det(R) = +1$).
- $P_{3 \\times 1} = [p_x, p_y, p_z]^T$ is the translation position vector.

### Elementary Rotation Matrices:
$$\\text{Rot}(z, \\theta) = \\begin{bmatrix} \\cos\\theta & -\\sin\\theta & 0 & 0 \\\\ \\sin\\theta & \\cos\\theta & 0 & 0 \\\\ 0 & 0 & 1 & 0 \\\\ 0 & 0 & 0 & 1 \\end{bmatrix}, \\quad \\text{Rot}(x, \\alpha) = \\begin{bmatrix} 1 & 0 & 0 & 0 \\\\ 0 & \\cos\\alpha & -\\sin\\alpha & 0 \\\\ 0 & \\sin\\alpha & \\cos\\alpha & 0 \\\\ 0 & 0 & 0 & 1 \\end{bmatrix}$$"""
                },
                {
                    "id": "rob-3-2",
                    "heading": "3.2 The Denavit-Hartenberg (DH) 4-Parameter Convention",
                    "content": """Jacques Denavit and Richard Hartenberg (1955) proved that the relative spatial transformation between any two consecutive links $i-1$ and $i$ can be completely described by **only 4 kinematic parameters** instead of 6:

1. **Link Length ($a_i$):** Distance from $\\hat{Z}_{i-1}$ to $\\hat{Z}_i$ measured along the common normal $\\hat{X}_i$.
2. **Link Twist ($\\alpha_i$):** Angle from $\\hat{Z}_{i-1}$ to $\\hat{Z}_i$ measured about the axis $\\hat{X}_i$ (using right-hand rule).
3. **Link Offset ($d_i$):** Distance from $\\hat{X}_{i-1}$ to $\\hat{X}_i$ measured along $\\hat{Z}_{i-1}$ (Variable for prismatic joint).
4. **Joint Angle ($\\theta_i$):** Angle from $\\hat{X}_{i-1}$ to $\\hat{X}_i$ measured about $\\hat{Z}_{i-1}$ (Variable for revolute joint).

---

### Rigorous DH Frame Assignment Rules (Step-by-Step):
1. **Assign Axis $\\hat{Z}_i$:** Align axis $\\hat{Z}_i$ along the motion axis of joint $i+1$ (axis of rotation for revolute, axis of translation for prismatic).
2. **Establish the Base Frame $\{0\}$:** Choose $\\hat{Z}_0$ along joint 1 axis. Origin $O_0$ and $\\hat{X}_0$ can be assigned arbitrarily.
3. **Assign Axis $\\hat{X}_i$:**
   - If $\\hat{Z}_{i-1}$ and $\\hat{Z}_i$ are **not coplanar (skew)**: Set $\\hat{X}_i$ along their unique common normal vector: $\\hat{X}_i = \\pm (\\hat{Z}_{i-1} \\times \\hat{Z}_i)$.
   - If $\\hat{Z}_{i-1}$ and $\\hat{Z}_i$ **intersect**: Set $\\hat{X}_i$ perpendicular to the plane formed by $\\hat{Z}_{i-1}$ and $\\hat{Z}_i$.
   - If $\\hat{Z}_{i-1}$ and $\\hat{Z}_i$ are **parallel**: Set $\\hat{X}_i$ along the common normal pointing from $\\hat{Z}_{i-1}$ to $\\hat{Z}_i$.
4. **Assign Axis $\\hat{Y}_i$:** Complete the right-handed Cartesian coordinate system: $\\hat{Y}_i = \\hat{Z}_i \\times \\hat{X}_i$."""
                },
                {
                    "id": "rob-3-3",
                    "heading": "3.3 The General DH Link Transformation Matrix",
                    "content": """The transformation from frame $\{i-1\}$ to frame $\{i\}$ is the product of four elementary screw transformations:

$$T_i^{i-1} = \\text{Rot}(z, \\theta_i) \\cdot \\text{Trans}(z, d_i) \\cdot \\text{Trans}(x, a_i) \\cdot \\text{Rot}(x, \\alpha_i)$$

Multiplying these matrices yields the standard **DH Link Transformation Matrix ($A_i$)**:

$$T_i^{i-1} = \\begin{bmatrix} \\cos\\theta_i & -\\sin\\theta_i\\cos\\alpha_i & \\sin\\theta_i\\sin\\alpha_i & a_i\\cos\\theta_i \\\\ \\sin\\theta_i & \\cos\\theta_i\\cos\\alpha_i & -\\cos\\theta_i\\sin\\alpha_i & a_i\\sin\\theta_i \\\\ 0 & \\sin\\alpha_i & \\cos\\alpha_i & d_i \\\\ 0 & 0 & 0 & 1 \\end{bmatrix}$$

For an $N$-DOF manipulator, the overall **Forward Kinematic Transformation** from base frame $\{0\}$ to end-effector tool frame $\{N\}$ is:
$$T_N^0 = T_1^0 \\cdot T_2^1 \\cdot T_3^2 \\dots T_N^{N-1}$$"""
                },
                {
                    "id": "rob-3-4",
                    "heading": "3.4 Step-by-Step Forward Kinematics Numerical Derivation (Planar 2-DOF RR Arm)",
                    "content": """### Kinematic Parameter Table for Planar 2-DOF Robot:
- Link 1 length: $a_1$, joint angle: $\\theta_1$
- Link 2 length: $a_2$, joint angle: $\\theta_2$

| Link $i$ | $a_i$ | $\\alpha_i$ | $d_i$ | $\\theta_i$ |
|---|---|---|---|---|
| **1** | $a_1$ | $0$ | $0$ | $\\theta_1^*$ |
| **2** | $a_2$ | $0$ | $0$ | $\\theta_2^*$ |

### Transformation Matrices:
$$T_1^0 = \\begin{bmatrix} c_1 & -s_1 & 0 & a_1 c_1 \\\\ s_1 & c_1 & 0 & a_1 s_1 \\\\ 0 & 0 & 1 & 0 \\\\ 0 & 0 & 0 & 1 \\end{bmatrix}, \\quad T_2^1 = \\begin{bmatrix} c_2 & -s_2 & 0 & a_2 c_2 \\\\ s_2 & c_2 & 0 & a_2 s_2 \\\\ 0 & 0 & 1 & 0 \\\\ 0 & 0 & 0 & 1 \\end{bmatrix}$$
(Where $c_1 = \\cos\\theta_1, s_1 = \\sin\\theta_1, c_{12} = \\cos(\\theta_1 + \\theta_2), s_{12} = \\sin(\\theta_1 + \\theta_2)$).

Multiplying $T_2^0 = T_1^0 \\cdot T_2^1$:
$$T_2^0 = \\begin{bmatrix} c_{12} & -s_{12} & 0 & a_1 c_1 + a_2 c_{12} \\\\ s_{12} & c_{12} & 0 & a_1 s_1 + a_2 s_{12} \\\\ 0 & 0 & 1 & 0 \\\\ 0 & 0 & 0 & 1 \\end{bmatrix}$$

Thus, the end-effector tip coordinates are:
$$x = a_1 \\cos\\theta_1 + a_2 \\cos(\\theta_1 + \\theta_2)$$
$$y = a_1 \\sin\\theta_1 + a_2 \\sin(\\theta_1 + \\theta_2)$$
$$z = 0, \\quad \\phi = \\theta_1 + \\theta_2$$"""
                },
                {
                    "id": "rob-3-5",
                    "heading": "3.5 Inverse Kinematics (IK): Geometric Method & Multiple Solutions",
                    "content": """**Inverse Kinematics (IK)** computes the joint variables $(\\theta_1, \\theta_2, \\dots)$ required to place the end-effector at a desired Cartesian pose $(x, y, z)$.
Unlike Forward Kinematics (which always has a unique solution), Inverse Kinematics is **non-linear, trigonometric, and has multiple solutions or no solution at all (if outside the workspace)**.

---

### Analytical Derivation for Planar 2-Link Arm:
Given target $(x, y)$:
$$x^2 + y^2 = (a_1 c_1 + a_2 c_{12})^2 + (a_1 s_1 + a_2 s_{12})^2 = a_1^2 + a_2^2 + 2 a_1 a_2 \\cos\\theta_2$$

Applying the **Law of Cosines**:
$$\\cos\\theta_2 = \\frac{x^2 + y^2 - a_1^2 - a_2^2}{2 a_1 a_2}$$

Using the numerically stable four-quadrant arctangent function `atan2`:
$$\\sin\\theta_2 = \\pm \\sqrt{1 - \\cos^2\\theta_2}$$
$$\\theta_2 = \\text{atan2}(\\sin\\theta_2, \\cos\\theta_2)$$
- The **$+$ sign** corresponds to the **Elbow-Down** configuration.
- The **$-$ sign** corresponds to the **Elbow-Up** configuration.

Once $\\theta_2$ is determined, $\\theta_1$ is calculated via:
$$\\theta_1 = \\text{atan2}(y, x) - \\text{atan2}(a_2 \\sin\\theta_2, a_1 + a_2 \\cos\\theta_2)$$

> [!IMPORTANT]
> **Pieper's Criterion for 6-DOF Manipulator Solvability:**
> Donald Pieper (1968) proved that a 6-DOF serial manipulator possesses a closed-form analytical inverse kinematic solution if and only if **three consecutive joint axes intersect at a single common point (such as a spherical wrist)** or **three consecutive axes are parallel**."""
                }
            ]
        },
        "eceg5511-ch4": {
            "courseId": "eceg5511",
            "courseCode": "ECEg5511",
            "chapterNum": 4,
            "title": "Robot Dynamics and Control",
            "readTime": "12 min read",
            "cloRef": "CLO2: Analyze dynamics, Jacobians, and controller design using MATLAB",
            "authoritativeSources": "John J. Craig (Ch. 5-7); Mittal & Nagrath (Ch. 5-7); AASTU Syllabus",
            "sections": [
                {
                    "id": "rob-4-1",
                    "heading": "4.1 Differential Kinematics & The Manipulator Jacobian Matrix",
                    "content": """The **Jacobian Matrix $J(\\theta)$** maps joint velocities $\\dot{\\theta}$ in joint space to the end-effector linear and angular velocities in Cartesian space:

$$\\mathbf{v} = \\begin{bmatrix} v \\\\ \\omega \\end{bmatrix} = J(\\theta) \\cdot \\dot{\\theta}$$

Where $\\mathbf{v} = [\\dot{x}, \\dot{y}, \\dot{z}, \\omega_x, \\omega_y, \\omega_z]^T$ is the $6 \\times 1$ Cartesian velocity vector.

For an $N$-joint manipulator, the Jacobian is a $6 \\times N$ matrix composed of columns $J_i = [J_{v,i}^T, J_{\\omega,i}^T]^T$:
- **For a Revolute Joint ($i$):**
  $$J_{v,i} = Z_{i-1} \\times (P_N - P_{i-1}), \\quad J_{\\omega,i} = Z_{i-1}$$
- **For a Prismatic Joint ($i$):**
  $$J_{v,i} = Z_{i-1}, \\quad J_{\\omega,i} = \\mathbf{0}$$"""
                },
                {
                    "id": "rob-4-2",
                    "heading": "4.2 Kinematic Singularities: Detection & Physical Consequences",
                    "content": """### Mathematical Definition:
A manipulator is in a **Kinematic Singularity** at joint configuration $\\theta$ if the Jacobian matrix loses rank:
$$\\det(J(\\theta)) = 0 \\quad (\\text{for a square } 6 \\times 6 \\text{ Jacobian})$$

### Physical Consequences of Singularities:
1. **Loss of Mobility:** The robot completely loses the ability to move in one or more Cartesian directions, regardless of joint speeds.
2. **Infinite Joint Velocities:** Inverting the velocity relationship $\\dot{\\theta} = J^{-1}(\\theta) \\mathbf{v}$ near a singularity causes commanded joint velocities $\\dot{\\theta} \\to \\infty$, tripping servo motor over-current protection.
3. **Unbounded Forces:** High Cartesian forces can be exerted on the mechanism with negligible motor torques.

### Singularity Types:
- **Boundary Singularities:** Occur when the arm is fully extended or folded back on itself at the outer limit of its workspace envelope.
- **Wrist Singularities:** Occur in spherical wrists when joint 4 and joint 6 axes become collinear ($\\theta_5 = 0$), causing infinite spinning commands."""
                },
                {
                    "id": "rob-4-3",
                    "heading": "4.3 Statics & Virtual Work Principle: Force-Torque Duality",
                    "content": """Using the **Principle of Virtual Work**, virtual work performed in Cartesian space must equal virtual work performed in joint space:
$$\\delta W = F^T \\delta x = \\tau^T \\delta \\theta$$
Since $\\delta x = J(\\theta) \\delta \\theta$:
$$F^T J(\\theta) \\delta \\theta = \\tau^T \\delta \\theta \\implies \\tau = J^T(\\theta) \\cdot F$$

Where:
- $F = [f_x, f_y, f_z, m_x, m_y, m_z]^T$ is the external force/moment exerted by the end-effector.
- $\\tau = [\\tau_1, \\tau_2, \\dots, \\tau_N]^T$ is the resulting static joint torques.
> [!NOTE]
> This elegant duality proves that the **Transpose of the Jacobian ($J^T$)** transforms Cartesian endpoint forces into joint actuator torques!"""
                },
                {
                    "id": "rob-4-4",
                    "heading": "4.4 Equations of Motion: Euler-Lagrange Dynamic Formulation",
                    "content": """To design high-speed trajectory controllers, we must account for mass, inertia, centrifugal forces, and gravity.

### The Lagrangian Function:
$$L(\\theta, \\dot{\\theta}) = K(\\theta, \\dot{\\theta}) - P(\\theta)$$
Where $K$ is total system kinetic energy and $P$ is total potential energy.

The **Euler-Lagrange Equation**:
$$\\frac{d}{dt} \\left( \\frac{\\partial L}{\\partial \\dot{\\theta}_i} \\right) - \\frac{\\partial L}{\\partial \\theta_i} = \\tau_i$$

### Standard Matrix Form of Manipulator Dynamics:
$$M(\\theta) \\ddot{\\theta} + C(\\theta, \\dot{\\theta}) \\dot{\\theta} + G(\\theta) = \\tau$$

Where:
- $M(\\theta)$ is the symmetric, positive-definite **Inertia Matrix** ($N \\times N$).
- $C(\\theta, \\dot{\\theta})\\dot{\\theta}$ is the $N \\times 1$ vector of **Coriolis and Centrifugal torques**.
- $G(\\theta)$ is the $N \\times 1$ vector of **Gravitational torques**.
- $\\tau$ is the actuator torque vector."""
                },
                {
                    "id": "rob-4-5",
                    "heading": "4.5 Robot Motion Control: Independent Joint PID vs Computed Torque Control",
                    "content": """### 1. Independent Joint PID Control:
Treats each joint as an independent SISO (Single-Input Single-Output) linear system, treating multi-body coupling as an unmodeled disturbance:
$$\\tau_i(t) = K_p e_i(t) + K_i \\int e_i(t) dt + K_d \\dot{e}_i(t)$$
Works adequately for slow industrial motions where gearbox gear ratios ($N > 100$) attenuate dynamic coupling by $1/N^2$.

### 2. Computed Torque Control (Feedback Linearization):
At high operational speeds, dynamic coupling cannot be ignored. Computed torque control cancels non-linear dynamics explicitly:
$$\\tau = M(\\theta) \\left( \\ddot{\\theta}_d + K_v (\\dot{\\theta}_d - \\dot{\\theta}) + K_p (\\theta_d - \\theta) \\right) + C(\\theta, \\dot{\\theta})\\dot{\\theta} + G(\\theta)$$
Substituting into the dynamic model yields a decoupled, linear error system:
$$\\ddot{e} + K_v \\dot{e} + K_p e = 0$$
Allowing critical damping ($\\zeta = 1$) across the entire workspace."""
                }
            ]
        },
        "eceg5511-ch5": {
            "courseId": "eceg5511",
            "courseCode": "ECEg5511",
            "chapterNum": 5,
            "title": "Introduction to Computer Vision & Image Representation",
            "readTime": "11 min read",
            "cloRef": "CLO1: Extract information inside image and video; understand spatial transformations",
            "authoritativeSources": "Forsyth & Ponce (Ch. 1-4); Szeliski (Ch. 2-3); Shapiro & Stockman; AASTU Syllabus",
            "sections": [
                {
                    "id": "rob-5-1",
                    "heading": "5.1 Digital Image Representation, Sampling & Quantization",
                    "content": """A continuous physical optical scene $f(x, y)$ is converted into a discrete digital image matrix $I[r, c]$ through spatial sampling and radiometric quantization:

$$I = \\begin{bmatrix} I[0,0] & I[0,1] & \\dots & I[0, W-1] \\\\ I[1,0] & I[1,1] & \\dots & I[1, W-1] \\\\ \\vdots & \\vdots & \\ddots & \\vdots \\\\ I[H-1,0] & I[H-1,1] & \\dots & I[H-1, W-1] \\end{bmatrix}$$

- **Sampling:** Discretizing continuous spatial coordinates into an array of $H \\times W$ pixels. According to the **Nyquist-Shannon Sampling Theorem**, the spatial sampling frequency must exceed twice the highest spatial frequency in the optical image ($f_s > 2 f_{max}$) to avoid spatial aliasing.
- **Quantization:** Discretizing continuous luminance amplitude into $L = 2^b$ integer levels. For standard 8-bit images ($b=8$), intensity ranges from $0$ (pure black) to $255$ (pure white).
- **RGB Color Space:** Formed by three stacked 2D arrays: $I \\in \\mathbb{R}^{H \\times W \\times 3}$ corresponding to Red, Green, and Blue channels.
- **Grayscale Conversion (ITU-R BT.601 standard):**
  $$Y = 0.299 R + 0.587 G + 0.114 B$$"""
                },
                {
                    "id": "rob-5-2",
                    "heading": "5.2 Pinhole Camera Model & Perspective Projection Geometry",
                    "content": """The **Pinhole Camera Model** models perspective projection from a 3D world coordinate $P_w = [X_w, Y_w, Z_w]^T$ onto a 2D image sensor plane $[u, v]^T$:

$$\\tilde{m} = \\begin{bmatrix} u \\\\ v \\\\ 1 \\end{bmatrix} = \\frac{1}{Z_c} K \\cdot [R \\mid t] \\cdot \\begin{bmatrix} X_w \\\\ Y_w \\\\ Z_w \\\\ 1 \\end{bmatrix}$$

### Camera Parameter Matrices:
1. **Intrinsic Parameter Matrix ($K$ - $3 \\times 3$):** Represents internal optical geometry:
   $$K = \\begin{bmatrix} f_x & s & c_x \\\\ 0 & f_y & c_y \\\\ 0 & 0 & 1 \\end{bmatrix}$$
   Where:
   - $f_x = f / p_x$, $f_y = f / p_y$: Focal length expressed in horizontal and vertical pixel units.
   - $(c_x, c_y)$: Principal point (intersection of the optical axis with the sensor plane).
   - $s$: Skew coefficient (typically $0$ for rectangular sensor grids).
2. **Extrinsic Parameter Matrix ($[R \\mid t]$ - $3 \\times 4$):** Represents the camera's physical 3D pose in the world coordinate frame (Rotation $R_{3 \\times 3}$ and Translation $t_{3 \\times 1}$)."""
                },
                {
                    "id": "rob-5-3",
                    "heading": "5.3 Point Operations & Histogram Equalization Derivation",
                    "content": """Point operations map an input intensity $r$ to an output intensity $s = T(r)$ independently for every pixel.

### Histogram Equalization:
Histogram equalization stretches the contrast of an image by transforming the intensity distribution so that the output image possesses a **uniform probability density function (PDF)**.

Given an image with $N$ pixels and discrete gray levels $r_k \\in [0, L-1]$:
1. Compute the probability of occurrence of intensity level $r_k$:
   $$p_r(r_k) = \\frac{n_k}{N}, \\quad k = 0, 1, \\dots, L-1$$
2. Compute the **Cumulative Distribution Function (CDF)**:
   $$s_k = T(r_k) = (L - 1) \\sum_{j=0}^k p_r(r_j) = \\frac{L-1}{N} \\sum_{j=0}^k n_j$$
3. Round $s_k$ to the nearest integer.
The resulting transformed image fully utilizes the dynamic range from $0$ to $255$ with maximized entropy."""
                },
                {
                    "id": "rob-5-4",
                    "heading": "5.4 Spatial Linear Filtering & 2D Convolution",
                    "content": """Spatial filtering processes an image by convolving it with an $m \\times n$ kernel (mask) $h$:

$$g(x, y) = I(x, y) * h(x, y) = \\sum_{s=-a}^a \\sum_{t=-b}^b h(s, t) \\cdot I(x - s, y - t)$$

### 1. Box / Mean Filter (Low-Pass Smoothing):
$$h_{box} = \\frac{1}{9} \\begin{bmatrix} 1 & 1 & 1 \\\\ 1 & 1 & 1 \\\\ 1 & 1 & 1 \\end{bmatrix}$$
Attenuates high-frequency sensor noise, but blurs sharp object edges.

### 2. 2D Gaussian Filter (Isotropic Smoothing):
$$G(x, y) = \\frac{1}{2\\pi \\sigma^2} e^{-\\frac{x^2 + y^2}{2\\sigma^2}}$$
> [!TIP]
> **Separability Property of Gaussian Kernels:**
> Because $e^{-\\frac{x^2+y^2}{2\\sigma^2}} = e^{-\\frac{x^2}{2\\sigma^2}} \\cdot e^{-\\frac{y^2}{2\\sigma^2}}$, a 2D $K \\times K$ Gaussian convolution can be decomposed into two sequential 1D convolutions (horizontal pass followed by vertical pass). This reduces computational complexity from **$O(K^2)$ down to $O(2K)$ operations per pixel**, an enormous speedup for real-time robotic vision!"""
                },
                {
                    "id": "rob-5-5",
                    "heading": "5.5 Median Non-Linear Filtering for Salt-and-Pepper Noise",
                    "content": """Linear filters fail miserably when corrupted by impulse ("salt-and-pepper") noise because averaging spreads corrupted black (0) or white (255) pixels into their neighbors.
- **Median Filter:** Ranks all pixel values in an $n \\times n$ neighborhood and replaces the central pixel with the **median value**.
- *Result:* Completely strips out impulse spikes while preserving sharp geometric edges."""
                }
            ]
        },
        "eceg5511-ch6": {
            "courseId": "eceg5511",
            "courseCode": "ECEg5511",
            "chapterNum": 6,
            "title": "Image and Video Analysis (Edge, Morphology, Tracking)",
            "readTime": "13 min read",
            "cloRef": "CLO2: Analyze computer vision algorithms; implement OpenCV edge and tracking pipelines",
            "authoritativeSources": "Forsyth & Ponce (Ch. 5-7); Szeliski (Ch. 4-5); AASTU Syllabus",
            "sections": [
                {
                    "id": "rob-6-1",
                    "heading": "6.1 Image Derivatives & Gradient Operators (Sobel, Prewitt)",
                    "content": """Edges correspond to sharp local discontinuities in image luminance. Mathematically, edges are located at the extrema of the first spatial derivative or zero-crossings of the second spatial derivative.

### The Spatial Gradient Vector:
$$\\nabla I = \\begin{bmatrix} G_x \\\\ G_y \\end{bmatrix} = \\begin{bmatrix} \\frac{\\partial I}{\\partial x} \\\\ \\frac{\\partial I}{\\partial y} \\end{bmatrix}$$
- **Gradient Magnitude:**
  $$|\\nabla I| = \\sqrt{G_x^2 + G_y^2} \\approx |G_x| + |G_y|$$
- **Gradient Orientation Angle:**
  $$\\theta = \\text{atan2}(G_y, G_x)$$

### The $3 \\times 3$ Sobel Operator:
Combines Gaussian smoothing in one direction with central differencing in the orthogonal direction:
$$S_x = \\begin{bmatrix} -1 & 0 & +1 \\\\ -2 & 0 & +2 \\\\ -1 & 0 & +1 \\end{bmatrix}, \\quad S_y = \\begin{bmatrix} -1 & -2 & -1 \\\\ 0 & 0 & 0 \\\\ +1 & +2 & +1 \\end{bmatrix}$$"""
                },
                {
                    "id": "rob-6-2",
                    "heading": "6.2 The Canny Edge Detector: Optimal 5-Stage Algorithm",
                    "content": """John F. Canny (1986) formulated three mathematical optimality criteria for edge detection:
1. **Low Error Rate:** Mark genuine edges without inventing spurious noise edges.
2. **Localization:** Minimize distance between detected edge pixels and true physical edges.
3. **Single Response:** Only one detector response per edge (no thick multiple responses).

---

### The 5-Step Canny Pipeline:
1. **Gaussian Smoothing:** Convolve image with Gaussian kernel ($G_\\sigma$) to suppress high-frequency noise.
2. **Gradient Calculation:** Compute magnitude $M(x,y)$ and direction $\\theta(x,y)$ using Sobel kernels.
3. **Non-Maximum Suppression (NMS):**
   - Round edge angle $\\theta(x,y)$ into one of 4 discrete sector directions: $0^\\circ$ (horizontal), $45^\\circ$ (diagonal), $90^\\circ$ (vertical), or $135^\\circ$.
   - Compare the current pixel's magnitude with its two immediate neighbors along the gradient orientation line.
   - If the current pixel is smaller than either neighbor, **suppress it (set to 0)**. This thins thick ridges into sharp **1-pixel-wide lines**.
4. **Double Thresholding:**
   - Establish two thresholds: High Threshold ($T_{high}$) and Low Threshold ($T_{low}$), typically $T_{low} \\approx 0.4 - 0.5 \\times T_{high}$.
   - If $M(x,y) \\ge T_{high}$: Pixel is declared a **Strong Edge**.
   - If $T_{low} \\le M(x,y) < T_{high}$: Pixel is declared a **Weak Edge**.
   - If $M(x,y) < T_{low}$: Pixel is suppressed (set to 0).
5. **Edge Tracking by Hysteresis:**
   - Weak edge pixels are preserved if and only if they are **connected to at least one strong edge pixel** through an 8-connected path. Disconnected weak pixels (likely noise) are discarded."""
                },
                {
                    "id": "rob-6-3",
                    "heading": "6.3 Mathematical Morphology on Binary Images",
                    "content": """Mathematical morphology probes geometric structures in binary images using a small set called a **Structuring Element ($B$)**:

1. **Dilation ($A \\oplus B$):**
   $$A \\oplus B = \\{ z \\mid (\\hat{B})_z \\cap A \\neq \\emptyset \\}$$
   Expands boundaries; fills small holes and bridges narrow gaps.
2. **Erosion ($A \\ominus B$):**
   $$A \\ominus B = \\{ z \\mid (B)_z \\subseteq A \\}$$
   Shrinks boundaries; eliminates small isolated foreground noise dots.
3. **Morphological Opening ($A \\circ B$):**
   $$A \\circ B = (A \\ominus B) \\oplus B$$
   Erosion followed by dilation. Smooths contours, eliminates small protrusions, and breaks thin isthmuses without altering overall object size.
4. **Morphological Closing ($A \\bullet B$):**
   $$A \\bullet B = (A \\oplus B) \\ominus B$$
   Dilation followed by erosion. Merges narrow breaks, fills long thin gulfs, and closes internal cavities."""
                },
                {
                    "id": "rob-6-4",
                    "heading": "6.4 Otsu's Global Thresholding & Image Segmentation",
                    "content": """Nobuyuki Otsu (1979) established the mathematically optimal non-parametric technique for automatic global binarization.
It selects the threshold $t^*$ that **maximizes the between-class variance ($\\sigma_B^2$)**, which is equivalent to minimizing the within-class variance:

$$\\sigma_B^2(t) = \\omega_0(t) \\cdot (\\mu_0(t) - \\mu_T)^2 + \\omega_1(t) \\cdot (\\mu_1(t) - \\mu_T)^2$$
Where:
- $\\omega_0(t) = \\sum_{i=0}^t p_i$ is the probability of background class.
- $\\omega_1(t) = \\sum_{i=t+1}^{L-1} p_i$ is the probability of foreground class.
- $\\mu_0(t)$ and $\\mu_1(t)$ are the mean intensity values of background and foreground.
- $\\mu_T$ is the global mean intensity of the entire image.
The algorithm evaluates $t \\in [0, 255]$ in a single linear pass over the histogram."""
                },
                {
                    "id": "rob-6-5",
                    "heading": "6.5 Video Motion Analysis: Optical Flow & Lucas-Kanade",
                    "content": """**Optical Flow** represents the 2D apparent velocity field $(u, v)$ of brightness patterns across consecutive video frames.

### Brightness Constancy Assumption:
A scene point maintains constant intensity over a differential time increment $dt$:
$$I(x + dx, y + dy, t + dt) = I(x, y, t)$$
Taking the first-order Taylor expansion:
$$\\frac{\\partial I}{\\partial x} \\frac{dx}{dt} + \\frac{\\partial I}{\\partial y} \\frac{dy}{dt} + \\frac{\\partial I}{\\partial t} = 0 \\implies I_x u + I_y v + I_t = 0$$

### The Aperture Problem:
This single equation contains two unknowns ($u$ and $v$) at each pixel. We can only measure velocity normal to an edge, not parallel to it!

### The Lucas-Kanade Solution:
Assumes that optical flow $(u, v)$ is constant within a small local spatial window $\\Omega$ (e.g., $5 \\times 5$ pixels = 25 equations):
$$\\begin{bmatrix} I_{x,1} & I_{y,1} \\\\ I_{x,2} & I_{y,2} \\\\ \\vdots & \\vdots \\\\ I_{x,n} & I_{y,n} \\end{bmatrix} \\begin{bmatrix} u \\\\ v \\end{bmatrix} = -\\begin{bmatrix} I_{t,1} \\\\ I_{t,2} \\\\ \\vdots \\\\ I_{t,n} \\end{bmatrix} \\implies A \\mathbf{v} = -b$$
Applying Ordinary Least Squares:
$$\\mathbf{v} = (A^T A)^{-1} A^T (-b)$$
Where the $2 \\times 2$ matrix $A^T A$ is:
$$A^T A = \\begin{bmatrix} \\sum I_x^2 & \\sum I_x I_y \\\\ \\sum I_x I_y & \\sum I_y^2 \\end{bmatrix}$$
> [!NOTE]
> For $(A^T A)$ to be invertible, both eigenvalues must be large. This occurs at **corners and textured patches**, proving why feature trackers track corners!"""
                }
            ]
        },
        "eceg5511-ch7": {
            "courseId": "eceg5511",
            "courseCode": "ECEg5511",
            "chapterNum": 7,
            "title": "Applications of Computer Vision (Viola-Jones, Surveillance)",
            "readTime": "12 min read",
            "cloRef": "CLO3: Design controller and implement computer vision for real-life applications",
            "authoritativeSources": "Paul Viola & Michael Jones (2001); Szeliski (Ch. 14); Forsyth & Ponce (Ch. 16-17)",
            "sections": [
                {
                    "id": "rob-7-1",
                    "heading": "7.1 Classical Object Detection Paradigms & Feature Descriptors",
                    "content": """Before end-to-end deep convolutional networks, real-time object detection relied on handcrafted local feature descriptors evaluated over multi-scale sliding windows:

1. **Haar-Like Features:** Rectangle features computing the difference between the sum of pixel intensities in adjacent white and black rectangular regions. Sensitive to vertical edges, horizontal lines, and diagonal junctions.
2. **HOG (Histogram of Oriented Gradients - Dalal & Triggs 2005):** Evaluates local gradient orientation distributions in small cells ($8 \\times 8$ pixels), normalized across overlapping $2 \\times 2$ blocks. Outstanding accuracy for pedestrian detection.
3. **SIFT (Scale-Invariant Feature Transform - David Lowe 1999):** Detects scale-space extrema across Difference-of-Gaussians (DoG) octaves. Invariant to image scaling, 3D rotation, and illumination changes."""
                },
                {
                    "id": "rob-7-2",
                    "heading": "7.2 The Viola-Jones Real-Time Face Detection Framework",
                    "content": """Paul Viola and Michael Jones (2001) achieved the world's first real-time ($> 15\\text{ fps}$) face detector by introducing three groundbreaking engineering innovations:

### 1. The Integral Image (Summed-Area Table):
Allows evaluating the sum of pixel intensities inside **any arbitrary rectangle in exactly 4 memory array accesses ($O(1)$ constant time)**, regardless of rectangle dimensions!
$$ii(x, y) = \\sum_{x' \\le x, y' \\le y} i(x', y')$$
Calculated in a single pass:
$$s(x, y) = s(x, y - 1) + i(x, y), \\quad ii(x, y) = ii(x - 1, y) + s(x, y)$$

To evaluate the sum of pixels inside rectangle $D = [x_1, y_1]$ to $[x_2, y_2]$:
$$\\text{Sum}(D) = ii(x_2, y_2) + ii(x_1 - 1, y_1 - 1) - ii(x_1 - 1, y_2) - ii(x_2, y_1 - 1)$$

### 2. AdaBoost Feature Selection:
A $24 \\times 24$ sub-window yields over $160,000$ potential Haar features. AdaBoost selects the top $\\approx 200$ most discriminative features and assigns optimal weights.

### 3. The Attentional Cascade:
Instead of evaluating all 200 features on every candidate window, weak classifiers are organized into a degenerate decision tree cascade:
- Early stages contain only 1 to 5 features. They reject over **$95\\%$ of non-face background windows** instantly.
- Complex candidate regions pass deeper into the cascade for rigorous verification. Average face evaluation time drops dramatically."""
                },
                {
                    "id": "rob-7-3",
                    "heading": "7.3 Feature Matching, RANSAC & Homography Estimation",
                    "content": """To align images taken from different camera viewpoints or track planar objects:

### Homography Matrix ($H$):
A projective mapping between two coplanar 2D planes:
$$\\begin{bmatrix} x' \\\\ y' \\\\ 1 \\end{bmatrix} \\sim \\begin{bmatrix} h_{11} & h_{12} & h_{13} \\\\ h_{21} & h_{22} & h_{23} \\\\ h_{31} & h_{32} & h_{33} \\end{bmatrix} \\begin{bmatrix} x \\\\ y \\\\ 1 \\end{bmatrix}$$
Has 8 degrees of freedom; requires a minimum of **4 point correspondences**.

### RANSAC (Random Sample Consensus - Fischler & Bolles 1981):
Feature matching produces numerous outliers (false correspondences). Standard least squares fits all points and fails catastrophically in the presence of outliers.
**RANSAC Algorithm:**
1. Randomly sample the minimum subset (4 point pairs for homography).
2. Fit model $H$ to the subset.
3. Count **inliers**: points whose projection error is within threshold $\\epsilon$:
   $$\\| p_i' - H p_i \\| < \\epsilon$$
4. Repeat for $K$ iterations. Keep the model with the largest inlier count.
5. Re-fit final model using all consensus inliers."""
                },
                {
                    "id": "rob-7-4",
                    "heading": "7.4 Industrial Automated Optical Inspection (AOI) & Surveillance",
                    "content": """### PCB Defect Inspection Pipeline:
1. **Fiducial Marker Alignment:** Locates circular copper alignment fiducials on PCB corners using template matching to compensate for mechanical conveyor rotation and drift.
2. **Golden Board Subtraction:** Compares golden CAD vector layer with captured inspection frame using structural similarity (SSIM).
3. **Defect Classification:** Classifies solder bridges, open traces, missing surface-mount (SMD) chips, and tombstoning resistors.

### Surveillance Video Background Subtraction:
Separates moving foreground objects (pedestrians, vehicles) from static scenes using **Gaussian Mixture Models (GMM / Stauffer-Grimson)**:
- Models each background pixel's color distribution as a mixture of $K = 3 - 5$ Gaussians to handle waving tree branches and rippling water."""
                },
                {
                    "id": "rob-7-5",
                    "heading": "7.5 Deep Learning in Vision: YOLO vs Two-Stage Detectors",
                    "content": """| Architecture Type | Examples | Operational Paradigm | Speed (FPS) | Primary Use Case |
|---|---|---|---|---|
| **Two-Stage Detectors** | R-CNN, Fast R-CNN, Faster R-CNN | 1. Region Proposal Network (RPN) proposes candidate boxes.<br>2. RoI pooling classifies proposals. | Slow ($5 - 15\\text{ fps}$) | Medical Imaging, High-Precision Inspection |
| **Single-Stage Detectors** | YOLO (You Only Look Once), SSD | Divides image into $S \\times S$ grid; predicts bounding boxes and class probabilities in a **single forward pass**! | Ultra-Fast ($60 - 150\\text{ fps}$) | Autonomous Robotics, Real-Time Drone Tracking |

> [!TIP]
> Modern YOLO versions (YOLOv8, YOLOv9, YOLOv10) replace classical sliding windows completely by employing CSPDarknet backbones, PANet feature pyramids, and Anchor-Free decoupled heads."""
                }
            ]
        }
    }
