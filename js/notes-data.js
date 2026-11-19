/**
 * AASTU Computer Engineering - Concise, High-Yield Lecture Notes Data
 * Grounded directly in Course Guide Book outlines and authoritative textbooks
 * Optimized for fast, readable exam preparation
 */

const AASTU_NOTES = {
  "eceg5405-ch1": {
    "courseId": "eceg5405",
    "chapterNum": 1,
    "title": "Introduction to Integrated Circuits & Semiconductor Evolution",
    "readTime": "6 min read",
    "cloRef": "CLO1: Explain an IC, its production, importance, and evolution",
    "authoritativeSources": "Jan M. Rabaey (Ch. 1); Neil Weste (Ch. 1); Wayne Wolf (Ch. 1); AASTU Syllabus",
    "sections": [
      {
        "id": "vlsi-1-1",
        "heading": "1.1 What is an Integrated Circuit (IC)?",
        "content": "An **Integrated Circuit (IC)** is a microscopic electronic network of interconnected active semiconductor devices (MOSFETs, diodes) and passive components (resistors, capacitors), monolithically fabricated on a single continuous silicon crystal.\n\n### The Monolithic Planar Breakthrough:\nPrior to 1958, computers were built using discrete transistors hand-soldered onto printed circuit boards (PCBs), facing the **\"Tyranny of Numbers\"**:\n- **Solder Joint Failures:** Tens of thousands of manual solder joints became the primary point of catastrophic electrical breakdown.\n- **Parasitic Delays:** Long copper PCB wire traces introduced massive parasitic inductance and capacitance, capping clock frequencies below 10 MHz.\n- **Planar Invention:** **Robert Noyce (Fairchild, 1959)** and **Jack Kilby (TI, 1958)** solved this by fabricating all transistors and thin-film aluminum interconnects simultaneously in a single planar chemical batch process, eliminating manual wiring."
      },
      {
        "id": "vlsi-1-2",
        "heading": "1.2 Foundational Advantages & Importance of ICs",
        "content": "Modern digital computing and communication exist because monolithic ICs deliver five foundational engineering benefits:\n\n1. **Extreme Reliability:** Monolithic lithography eliminates physical solder joints. Mean Time Between Failures (MTBF) improved by over $10^6\\times$.\n2. **Exponentially Lower Cost:** Hundreds of identical dies are printed concurrently on a single 300 mm silicon wafer. Cost per transistor dropped below $< \\$0.000000001$.\n3. **Sub-Nanosecond Switching Speeds:** Nanoscale interconnects reduce wire delays drastically:\n   $$t_{delay} \\approx 0.69 \\cdot R_{wire} C_{wire}$$\n4. **Minimal Power Consumption:** Nanoscale transistor gates require tiny charges to switch:\n   $$P_{dynamic} = \\alpha \\cdot C_L \\cdot V_{DD}^2 \\cdot f_{clk}$$\n5. **Ultra-Compact Form Factor:** Billions of transistors occupy a thumbnail-sized die ($< 100\\text{ mm}^2$)."
      },
      {
        "id": "vlsi-1-3",
        "heading": "1.3 Evolution of ICs & Moore's Law",
        "content": "### Levels of IC Integration:\n- **SSI (Small-Scale Integration, early 1960s):** $1 - 10$ logic gates (basic NAND/NOR).\n- **MSI (Medium-Scale Integration, late 1960s):** $10 - 100$ gates (adders, decoders, multiplexers).\n- **LSI (Large-Scale Integration, 1970s):** $100 - 10,000$ gates (first 4-bit/8-bit microprocessors like Intel 4004).\n- **VLSI (Very Large-Scale Integration, 1980s-1990s):** $10,000 - 1,000,000$ gates (32-bit CPUs, memory chips).\n- **ULSI / SoC (Ultra Large-Scale Integration, 2000s-Present):** $> 1,000,000,000$ transistors (Apple A-series, modern GPUs, AI accelerators).\n\n### Moore's Law vs Dennard Scaling:\n- **Moore's Law (1965):** Transistor density doubles approximately every **18 to 24 months** at minimum component cost.\n- **Dennard Scaling (1974-2005):** Stated that as MOSFET dimensions shrink by factor $\\kappa$, power density remains constant ($1\\text{ W/cm}^2$) if $V_{DD}$ scales down with dimensions.\n- **The Power Wall (2005):** Dennard scaling collapsed because $V_{DD}$ could not drop below $\\approx 0.8\\text{ V}$ without causing massive sub-threshold leakage currents. This ended single-core clock scaling and forced the transition to **multicore architectures** and **3D FinFET/GAA transistors**."
      },
      {
        "id": "vlsi-1-4",
        "heading": "1.4 Applications, Yield & Real-World Economics",
        "content": "### Wafer Manufacturing Yield:\nWafer yield drops exponentially with die area $A$ due to random defect particles $D$:\n$$Y = \\left(\\frac{1 - e^{-A \\cdot D}}{A \\cdot D}\\right)^2 \\quad \\implies \\quad \\text{Cost}_{die} = \\frac{\\text{Cost}_{wafer}}{\\text{Dies per wafer} \\times Y}$$\n\n### \ud83d\udd2c Real-World Case Study: Apple A17 / M3 on TSMC 3nm (N3B)\n- **Die Size:** $103.8\\text{ mm}^2$ packing **19 billion transistors**.\n- **Manufacturing Reality:** Required over 25 Extreme Ultraviolet (EUV) multi-patterning mask layers. Early wafer cost exceeded $\\$20,000$, proving that wafer yield ($Y$) is the primary commercial bottleneck at leading-edge nodes."
      }
    ]
  },
  "eceg5405-ch2": {
    "courseId": "eceg5405",
    "chapterNum": 2,
    "title": "VLSI Design Cycle, Methodologies & ASIC Styles",
    "readTime": "6 min read",
    "cloRef": "CLO2: Explain and analyze VLSI design cycles, ASIC styles, and architectures",
    "authoritativeSources": "M. J. S. Smith \u2014 Application-Specific Integrated Circuits; Wayne Wolf (Ch. 1-2); AASTU Syllabus",
    "sections": [
      {
        "id": "vlsi-2-1",
        "heading": "2.1 Top-Down VLSI Design Cycle",
        "content": "Modern VLSI chips follow an automated top-down hierarchical design flow:\n\n1. **System Specification:** Defining speed, power budget, I/O protocols, and functionality.\n2. **Architectural Design:** Partitioning hardware into CPU cores, ALUs, caches, and buses.\n3. **Behavioral / RTL Design:** Describing logic flow using VHDL or Verilog.\n4. **Logic Synthesis:** Translating RTL code into a technology-mapped gate-level netlist.\n5. **Physical Design (Place & Route):**\n   - **Floorplanning:** Placing major blocks and I/O pads.\n   - **Placement:** Arranging standard cells in horizontal rows.\n   - **Clock Tree Synthesis (CTS):** Balancing clock buffers to eliminate clock skew ($t_{skew} \\to 0$).\n   - **Routing:** Wiring signal traces in multi-layer copper.\n6. **Physical Verification:**\n   - **DRC (Design Rule Check):** Validates geometric manufacturing spacing rules.\n   - **LVS (Layout vs Schematic):** Confirms that drawn layout polygons match the electrical netlist 100%.\n7. **Tapeout:** Generating GDSII mask stream files for fabrication."
      },
      {
        "id": "vlsi-2-2",
        "heading": "2.2 The Gajski-Kuhn Y-Chart",
        "content": "The **Gajski-Kuhn Y-Chart** visualizes the VLSI design space along three structural axes:\n\n- **Behavioral Domain (What it does):** Algorithms $\\to$ VHDL/Verilog $\\to$ Boolean equations.\n- **Structural Domain (How it is built):** Subsystems $\\to$ ALUs/Registers $\\to$ Gate Netlist $\\to$ Transistors.\n- **Physical / Geometric Domain (How it is patterned):** Chip Floorplan $\\to$ Standard Cell Rows $\\to$ GDSII Polygons.\n\nSynthesis tools move **clockwise** around the Y-chart, translating abstract behavioral descriptions into physical mask geometries."
      },
      {
        "id": "vlsi-2-3",
        "heading": "2.3 Comparison of ASIC Implementation Styles",
        "content": "| ASIC Style | NRE Cost | Unit Cost | Time-to-Market | Best Use Case |\n|---|---|---|---|---|\n| **Full-Custom** | Highest (\\$10M+) | Lowest for high volume | Slowest (12-18 mos) | High-performance CPUs, GPUs, DRAM |\n| **Standard-Cell** | High (\\$1M-\\$5M) | Very Low | Moderate (6-9 mos) | Smartphone SoCs, Automotive ICs |\n| **Gate Array (Sea-of-Gates)** | Medium (\\$200k) | Moderate | Fast (2-4 weeks) | Legacy fast-turnaround chips |\n| **FPGA** | Zero | Highest per unit | Instant (minutes) | Prototyping, Low-volume aerospace |\n\n- **Non-Recurring Engineering (NRE) Break-Even Volume:**\n  $$V^* = \\frac{\\text{NRE}_{ASIC} - \\text{NRE}_{FPGA}}{\\text{UnitCost}_{FPGA} - \\text{UnitCost}_{ASIC}}$$\n  Above volume $V^*$, Standard-Cell ASICs are much cheaper; below $V^*$, FPGAs are economical."
      },
      {
        "id": "vlsi-2-4",
        "heading": "2.4 RISC vs CISC Microarchitectures in Silicon",
        "content": "- **CISC (Complex Instruction Set Computer - x86):** Emphasizes hardware complexity. Uses variable-length instructions, microcode ROMs, and complex multi-cycle addressing modes, consuming large silicon area for decode logic.\n- **RISC (Reduced Instruction Set Computer - ARM, RISC-V):** Emphasizes software/compiler optimization. Uses uniform 32-bit fixed-length instructions, single-cycle execution, and load/store memory architecture.\n- **Silicon Impact:** RISC frees up over **$60\\%$ of the CPU die area** for larger L1/L2 caches and extra processing cores, delivering superior energy efficiency for mobile devices."
      }
    ]
  },
  "eceg5405-ch3": {
    "courseId": "eceg5405",
    "chapterNum": 3,
    "title": "Design and Fabrication of VLSI Devices (CMOS Process Flow)",
    "readTime": "7 min read",
    "cloRef": "CLO3: Explain and analyze the design and fabrication of VLSI devices",
    "authoritativeSources": "Jan M. Rabaey (Ch. 2); Neil Weste (Ch. 3); AASTU Syllabus",
    "sections": [
      {
        "id": "vlsi-3-1",
        "heading": "3.1 Semiconductor Materials: Silicon vs GaAs",
        "content": "- **Silicon (Si):** Dominates 98% of VLSI due to its native oxide: **Silicon Dioxide ($\\text{SiO}_2$)**. $\\text{SiO}_2$ forms a high-quality insulating barrier ($E_g \\approx 9\\text{ eV}$), serves as an impenetrable diffusion mask, and forms a remarkably stable silicon-oxide interface. Silicon is mechanically robust, thermally conductive, and inexpensive.\n- **Gallium Arsenide (GaAs):** Possesses $5\\times$ higher electron mobility, making it useful for RF/microwave power amplifiers, but lacks a stable native oxide and is brittle, limiting it to niche analog applications."
      },
      {
        "id": "vlsi-3-2",
        "heading": "3.2 Transistor Fundamentals: TTL vs MOS",
        "content": "- **TTL (Transistor-Transistor Logic - BJT):** Current-controlled device. High drive capability, but draws continuous static base current ($I_B$), leading to unacceptable power dissipation when integrating millions of gates.\n- **MOSFET (Metal-Oxide-Semiconductor Field-Effect Transistor):** Voltage-controlled device. Gate oxide draws virtually zero static DC input current.\n- **Complementary MOS (CMOS):** Pairs an nMOS pull-down transistor with a pMOS pull-up transistor. Draws **near-zero static power** because one device is always fully OFF in the steady state."
      },
      {
        "id": "vlsi-3-3",
        "heading": "3.3 The 8-Step CMOS Fabrication Process Flow",
        "content": "1. **Wafer Slicing:** Single-crystal silicon ingot sliced into $300\\text{ mm}$ p-type wafers.\n2. **Thermal Oxidation:** Growing $SiO_2$ pad dielectric at $1000^\\circ\\text{C}$.\n3. **Photolithography:** Spin-coating photoresist, mask UV exposure, developing pattern.\n4. **N-Well Formation:** Ion-implanting Phosphorus ($P^+$) to create n-well cavities for pMOS.\n5. **Shallow Trench Isolation (STI):** Etching dielectric trenches to prevent inter-device leakage.\n6. **Polysilicon Gate Patterning (Self-Aligned):** Polysilicon is etched first; it blocks dopants during source/drain implantation, guaranteeing zero channel overlap ($C_{overlap} \\approx 0$).\n7. **Source/Drain Doping:** Arsenic ($As^+$) for nMOS $n^+$ regions; Boron ($BF_2^+$) for pMOS $p^+$.\n8. **Metallization & CMP:** Multi-layer Copper deposition and chemical mechanical planarization."
      },
      {
        "id": "vlsi-3-4",
        "heading": "3.4 CMOS Latch-Up & Mead-Conway Design Rules",
        "content": "### CMOS Latch-Up Phenomenon:\nParasitic lateral PNP and vertical NPN bipolar transistors in the bulk silicon form a cross-coupled **Silicon-Controlled Rectifier (SCR)**. If triggered by noise spikes, positive feedback creates a short circuit between $V_{DD}$ and Ground, burning the chip.\n- **Prevention Rules:** Guard rings around I/O pads and frequent substrate/well taps ($R_{sub}, R_{well} \\to 0$).\n\n### Mead-Conway Scalable $\\lambda$-Based Rules:\nAll geometric layout dimensions scale as multiples of parameter $\\lambda$ (where channel length $L_{min} = 2\\lambda$):\n- **Polysilicon Width:** $2\\lambda$, Spacing: $2\\lambda$\n- **Diffusion Width:** $2\\lambda$, Spacing: $3\\lambda$\n- **Metal-1 Width:** $3\\lambda$, Spacing: $3\\lambda$\n- **Contact Cut:** $2\\lambda \\times 2\\lambda$, Poly Overhang past Diffusion: $2\\lambda$"
      }
    ]
  },
  "eceg5405-ch4": {
    "courseId": "eceg5405",
    "chapterNum": 4,
    "title": "CMOS Logic Circuits, Stick Diagrams & Layout Rules",
    "readTime": "7 min read",
    "cloRef": "CLO4: Develop ICs using CMOS technology; synthesize inverters, NAND, NOR, and complex gates",
    "authoritativeSources": "Neil Weste (Ch. 2); Jan M. Rabaey (Ch. 5-6); AASTU Syllabus",
    "sections": [
      {
        "id": "vlsi-4-1",
        "heading": "4.1 Static CMOS Inverter Basics & Sizing",
        "content": "The static CMOS inverter is the building block of all digital VLSI.\n\n### Operating States:\n- **Input $A = 0\\text{ V}$ (Logic '0'):** nMOS is OFF ($V_{GS} = 0 < V_{tn}$); pMOS is ON ($V_{GS} = -V_{DD} < V_{tp}$). Output $Y$ is pulled cleanly to **$V_{DD}$ (Strong '1')**.\n- **Input $A = V_{DD}$ (Logic '1'):** nMOS is ON; pMOS is OFF. Output $Y$ is pulled cleanly to **$0\\text{ V}$ / Ground (Strong '0')**.\n\n### Transistor Aspect Ratio Sizing ($W_p / W_n$):\nBecause electron mobility ($\\mu_n \\approx 500\\text{ cm}^2/\\text{V}\\cdot\\text{s}$) is $\\approx 2.5\\times$ higher than hole mobility ($\\mu_p \\approx 200\\text{ cm}^2/\\text{V}\\cdot\\text{s}$), matching on-resistances ($R_p = R_n$) requires:\n$$\\left(\\frac{W}{L}\\right)_p \\approx 2.0 \\text{ to } 2.5 \\times \\left(\\frac{W}{L}\\right)_n$$\nThis equalizes rise time and fall time ($t_{r} \\approx t_{f}$) and centers the switching threshold at $V_{inv} = V_{DD}/2$."
      },
      {
        "id": "vlsi-4-2",
        "heading": "4.2 Push-Pull Logic & Complementary Gates",
        "content": "Static CMOS uses two dual networks:\n1. **Pull-Up Network (PUN):** pMOS transistors connecting $V_{DD}$ to Output.\n2. **Pull-Down Network (PDN):** nMOS transistors connecting Output to Ground.\n\n### Dual Duality (De Morgan):\n- **AND logic in PDN (series nMOS) $\\iff$ Parallel pMOS in PUN.**\n- **OR logic in PDN (parallel nMOS) $\\iff$ Series pMOS in PUN.**\n\n### Why NAND Gates Outperform NOR Gates:\n- **2-Input NAND ($Y = \\overline{A \\cdot B}$):** nMOS in series, pMOS in parallel. Because nMOS has high mobility, two series nMOS can be sized moderately ($W_n = 2$).\n- **2-Input NOR ($Y = \\overline{A + B}$):** pMOS in series, nMOS in parallel. Slower hole mobility requires two series pMOS to be sized $W_p = 4$ to $5$, inflating gate area and input capacitance. NAND is universally preferred."
      },
      {
        "id": "vlsi-4-3",
        "heading": "4.3 Stick Diagrams & The Euler Path Method",
        "content": "A **Stick Diagram** is a topological layout layout layer map:\n- **Red:** Polysilicon gate\n- **Green:** n-Diffusion\n- **Yellow:** p-Diffusion\n- **Blue:** Metal-1 interconnect\n- **Black X:** Contact cut\n\n### The Euler Path Layout Optimization:\nTo minimize parasitic capacitance, transistors should share a continuous diffusion strip without isolation breaks.\n- **Rule:** A continuous layout is possible if and only if both the PUN and PDN graphs contain an identical **Euler Path** (a traversal sequence visiting every transistor gate exactly once).\n- For $Y = \\overline{(A + B) \\cdot C}$, sequence **A - B - C** visits all transistors without breaking diffusion."
      },
      {
        "id": "vlsi-4-4",
        "heading": "4.4 CMOS Delay & Power Formulations",
        "content": "### Propagation Delay ($t_{pd}$):\n$$t_{pd} = \\frac{t_{pHL} + t_{pLH}}{2} \\approx 0.69 \\cdot R_{eq} \\cdot C_L$$\n\n### Power Dissipation Components:\n1. **Dynamic Switching Power (Dominant):**\n   $$P_{dynamic} = \\alpha \\cdot C_L \\cdot V_{DD}^2 \\cdot f_{clk}$$\n2. **Short-Circuit Power:** Direct rail-to-rail current during switching transitions ($< 10\\%$ of total).\n3. **Static Subthreshold Leakage Power:** Weak inversion leakage current when gates are OFF ($P_{leak} = I_{sub} \\cdot V_{DD}$)."
      }
    ]
  },
  "eceg5405-ch5": {
    "courseId": "eceg5405",
    "chapterNum": 5,
    "title": "Application-Specific Integrated Circuits (ASICs) & FPGAs",
    "readTime": "6 min read",
    "cloRef": "CLO5: Apply knowledge of ASICs in production of gates, multiplexers, and counters",
    "authoritativeSources": "M. J. S. Smith \u2014 Application-Specific Integrated Circuits; Wayne Wolf (Ch. 6); AASTU Syllabus",
    "sections": [
      {
        "id": "vlsi-5-1",
        "heading": "5.1 ASIC Taxonomy & Architectures",
        "content": "An **ASIC** is an IC customized for a specific application rather than general-purpose computing:\n\n- **Full-Custom ASIC:** Every polygon manually drafted. Maximum performance, lowest unit cost at scale, but massive NRE.\n- **Semi-Custom Standard-Cell:** Pre-verified library cells placed in automated rows. The industry standard for microprocessors and mobile SoCs.\n- **Semi-Custom Gate Array (Sea-of-Gates):** Pre-diffused base wafers; only metal routing masks are customized.\n- **Programmable ASICs (PLDs & FPGAs):** Off-the-shelf reconfigurable logic."
      },
      {
        "id": "vlsi-5-2",
        "heading": "5.2 Modern FPGA Architecture: CLBs, LUTs & Routing",
        "content": "FPGAs do not build gates with transistors; they evaluate logic using **Look-Up Tables (LUTs)**:\n\n- **Look-Up Table (LUT):** A $K$-input LUT consists of $2^K$ SRAM configuration bits and a $2^K$-to-1 multiplexer. A modern **6-LUT** evaluates any 6-variable Boolean function in constant time ($\\approx 0.4\\text{ ns}$).\n- **Configurable Logic Block (CLB):** Combines multiple LUTs, configurable D Flip-Flops, and dedicated **Fast Carry Chains (CARRY8)** for high-speed arithmetic adders.\n- **Island-Style Routing Fabric:** CLBs sit like islands surrounded by horizontal and vertical routing channels joined by programmable **Switch Boxes (S-Boxes)** and **Connection Boxes (C-Boxes)**."
      },
      {
        "id": "vlsi-5-3",
        "heading": "5.3 Hard Macros & Configuration Technologies",
        "content": "### Dedicated Hard Silicon Blocks in FPGAs:\n1. **Block RAM (BRAM):** Dedicated 36Kb true dual-port SRAM blocks for high-speed packet buffering and FIFOs.\n2. **DSP48 Slices:** Hardware multipliers ($27 \\times 18$) and accumulators for single-cycle Multiply-Accumulate (MAC) DSP calculations.\n\n### Programming Technologies:\n- **SRAM-Based (Xilinx, Altera):** Reprogrammable an infinite number of times; volatile (reloads bitstream on boot); susceptible to cosmic ray Single Event Upsets (SEUs).\n- **Anti-fuse-Based (Microsemi):** One-Time Programmable (OTP); permanently melted conductive links; immune to radiation, making it mandatory for satellites and space missions."
      }
    ]
  },
  "eceg5405-ch6": {
    "courseId": "eceg5405",
    "chapterNum": 6,
    "title": "Logic Synthesis, VHDL RTL Design & Simulation",
    "readTime": "7 min read",
    "cloRef": "CLO6: Use VHDL programming to program hardwares, simulate, and synthesize circuits",
    "authoritativeSources": "J. Smith \u2014 HDL Chip Design; Peter J. Ashenden \u2014 The Designer's Guide to VHDL; AASTU Syllabus",
    "sections": [
      {
        "id": "vlsi-6-1",
        "heading": "6.1 Logic Synthesis & VHDL Architecture",
        "content": "**Logic Synthesis** automates the translation of Register Transfer Level (RTL) code into an optimized gate-level netlist mapped onto foundry standard cells.\n\n### Structure of a VHDL Module:\n1. **Entity Declaration (Hardware Pins / Interface):**\n```vhdl\nlibrary IEEE;\nuse IEEE.STD_LOGIC_1164.ALL;\n\nentity mux2to1 is\n    Port ( a, b, sel : in  STD_LOGIC;\n           y         : out STD_LOGIC );\nend mux2to1;\n```\n2. **Architecture Body (Internal Circuit Implementation):**\n```vhdl\narchitecture Dataflow of mux2to1 is\nbegin\n    y <= a when sel = '0' else b;\nend Dataflow;\n```"
      },
      {
        "id": "vlsi-6-2",
        "heading": "6.2 Signals vs Variables & Latch Prevention",
        "content": "- **Signals (`<=`):** Model physical hardware wires. Assignments update after a delta simulation delay (or on clock edge).\n- **Variables (`:=`):** Local algorithmic scratchpads inside processes. Update instantaneously with zero delta delay.\n\n### \u26a0\ufe0f Unintentional Latch Avoidance:\nIn combinational processes, if an `if` statement lacks an `else` branch or a `case` lacks `when others =>`, the synthesizer infers a **transparent latch** to hold the previous value.\n- **Rule:** Always assign default outputs at the top of combinational processes."
      },
      {
        "id": "vlsi-6-3",
        "heading": "6.3 Synthesizable Sequential Counters & FSMs",
        "content": "### Positive-Edge-Triggered 4-Bit Counter with Asynchronous Reset:\n```vhdl\nprocess(clk, rst)\nbegin\n    if rst = '1' then\n        count <= (others => '0');\n    elsif rising_edge(clk) then\n        count <= count + 1;\n    end if;\nend process;\n```\n\n### Moore vs Mealy Finite State Machines (FSMs):\n- **Moore Machine:** Outputs depend **strictly on current state registers** ($Y = f(S)$). Glitch-free and synchronous.\n- **Mealy Machine:** Outputs depend on **current state AND current primary inputs** ($Y = g(S, X)$). Reacts one cycle faster, but input glitches can propagate directly to the output."
      },
      {
        "id": "vlsi-6-4",
        "heading": "6.4 Static Timing Analysis (STA)",
        "content": "STA verifies setup and hold constraints across all paths without simulation vectors:\n\n1. **Setup Time Constraint (Max Path Delay):**\n   $$t_{cq} + t_{comb,max} \\le T_{clk} + t_{skew} - t_{setup} \\implies f_{max} = \\frac{1}{T_{min}}$$\n   *Setup violations are fixed by slowing down the clock ($T_{clk} \\uparrow$) or pipelining.*\n2. **Hold Time Constraint (Min Path Delay):**\n   $$t_{cq} + t_{comb,min} \\ge t_{hold} + t_{skew}$$\n   *Notice that clock period $T_{clk}$ does NOT appear in the hold equation! Hold violations CANNOT be fixed by slowing the clock. They must be resolved by adding delay buffers in layout.*"
      }
    ]
  },
  "eceg5511-ch1": {
    "courseCode": "ECEg5511",
    "chapterNum": 1,
    "title": "Fundamentals of Robot & Human vs Robot Anatomy",
    "readTime": "6 min read",
    "cloRef": "CLO1: Fundamentals of robotics and comparative human anatomy",
    "authoritativeSources": "John J. Craig \u2014 Introduction to Robotics (Ch. 1-2); AASTU Course Outline",
    "sections": [
      {
        "id": "rob-1-1",
        "heading": "1.1 Definition & Spatial Degrees of Freedom (DOF)",
        "content": "An industrial robot is a reprogrammable, multifunctional manipulator designed to move materials, parts, tools, or specialized devices through variable programmed motions.\n\n### Spatial Degrees of Freedom (6-DOF):\nTo achieve arbitrary 3D position AND arbitrary orientation in Euclidean space, an end-effector strictly requires **6 independent Degrees of Freedom**:\n- **3 Positional DOF:** Major axes moving the wrist center in Cartesian coordinates ($X, Y, Z$).\n- **3 Rotational DOF:** Minor wrist axes orienting the tool flange (Roll, Pitch, Yaw)."
      },
      {
        "id": "rob-1-2",
        "heading": "1.2 Biomechanical Comparison: Human vs Robot Anatomy",
        "content": "| Biological Human Anatomy | Industrial Robotic Equivalent | Functional Analogy |\n|---|---|---|\n| **Skeletal Bones** | Metallic / Carbon-Fiber Links | Rigid structural support |\n| **Synovial Joints (Hinge, Ball)** | Revolute (R) & Prismatic (P) Joints | Relative motion between links |\n| **Agonist-Antagonist Muscle Pairs** | Bidirectional Electric Servomotors | Active mechanical torque generation |\n| **Proprioceptors (Muscle Spindles)** | Optical Rotary Encoders | Internal joint position/velocity sensing |\n| **Eyes & Skin (Exteroceptors)** | RGB-D Cameras, LiDAR, Tactile Arrays | External environmental perception |\n| **Central Nervous System (Brain)** | Embedded Microcontroller / Motion CPU | Trajectory planning & PID servo loop |\n\n*Key Biomechanical Difference:* Biological muscle fibers can only contract (pull); thus joints require opposing antagonistic pairs (biceps to flex, triceps to extend). An electric servomotor reverses current polarity to generate bidirectional torque in a single actuator."
      }
    ]
  },
  "eceg5511-ch3": {
    "courseCode": "ECEg5511",
    "chapterNum": 3,
    "title": "Manipulator Kinematics: DH Parameters & Transformations",
    "readTime": "6 min read",
    "cloRef": "CLO3: Derive forward and inverse kinematic transformations",
    "authoritativeSources": "John J. Craig (Ch. 3-4); AASTU Syllabus",
    "sections": [
      {
        "id": "rob-3-1",
        "heading": "3.1 Forward vs Inverse Kinematics",
        "content": "- **Forward Kinematics (FK):** Given joint angles $\\mathbf{q} = [\\theta_1, \\theta_2, \\dots, \\theta_n]^T$, compute Cartesian pose $\\mathbf{x} = [x, y, z, \\phi, \\theta, \\psi]^T$. Always has a unique, deterministic solution.\n- **Inverse Kinematics (IK):** Given target Cartesian pose $\\mathbf{x}$, solve for joint angles $\\mathbf{q}$. Nonlinear, with multiple solutions or zero solutions outside the workspace."
      },
      {
        "id": "rob-3-2",
        "heading": "3.2 Denavit-Hartenberg (DH) 4-Parameter Convention",
        "content": "Every spatial link transformation is represented by 4 geometric parameters:\n1. **Link Length ($a_i$):** Distance along $x_i$ from $z_{i-1}$ to $z_i$.\n2. **Link Twist ($\\alpha_i$):** Angle about $x_i$ from $z_{i-1}$ to $z_i$.\n3. **Link Offset ($d_i$):** Distance along $z_{i-1}$ from $x_{i-1}$ to $x_i$ (variable in Prismatic joints).\n4. **Joint Angle ($\\theta_i$):** Angle about $z_{i-1}$ from $x_{i-1}$ to $x_i$ (variable in Revolute joints).\n\n$$T_i^{i-1} = \\begin{bmatrix} \\cos\\theta_i & -\\sin\\theta_i \\cos\\alpha_i & \\sin\\theta_i \\sin\\alpha_i & a_i \\cos\\theta_i \\\\ \\sin\\theta_i & \\cos\\theta_i \\cos\\alpha_i & -\\cos\\theta_i \\sin\\alpha_i & a_i \\sin\\theta_i \\\\ 0 & \\sin\\alpha_i & \\cos\\alpha_i & d_i \\\\ 0 & 0 & 0 & 1 \\end{bmatrix}$$"
      }
    ]
  },
  "eceg5401-ch1": {
    "courseCode": "ECEg5401",
    "chapterNum": 1,
    "title": "Overview of Operating Systems, Services & Kernel Architecture",
    "readTime": "5 min read",
    "cloRef": "CLO1: Operating system architecture and kernel services",
    "authoritativeSources": "Abraham Silberschatz \u2014 Operating System Concepts (Ch. 1-2); AASTU Syllabus",
    "sections": [
      {
        "id": "os-1-1",
        "heading": "1.1 Dual-Mode Operation & Hardware Protection",
        "content": "The OS protects system integrity using a CPU hardware **Mode Bit**:\n- **Kernel Mode (Ring 0 / Supervisor):** Mode bit = 0. All CPU instructions allowed (I/O, page table modifications, timer resets).\n- **User Mode (Ring 3):** Mode bit = 1. Used by user applications. Privileged instructions trigger a hardware general protection fault.\n\n### System Call Trap Mechanism:\nWhen a user application requests OS services (e.g., `read()`):\n1. Executes a software trap (`syscall` or `int 0x80`).\n2. CPU saves register state, sets Mode Bit to 0, and jumps strictly to the kernel Interrupt Descriptor Table (IDT).\n3. The kernel executes the service and returns to User Mode."
      },
      {
        "id": "os-1-2",
        "heading": "1.2 Monolithic Kernel vs Microkernel",
        "content": "- **Monolithic Kernel (Linux, Windows):** All core services (file systems, networking, device drivers) run inside kernel space. High speed via direct function calls, but a single driver crash can panic the entire system.\n- **Microkernel (Mach, QNX, seL4):** Only memory primitives, thread scheduling, and IPC run in kernel mode; drivers run as user-space servers. If a driver crashes, it restarts without taking down the OS."
      }
    ]
  },
  "eceg5407-ch1": {
    "courseCode": "ECEg5407",
    "chapterNum": 1,
    "title": "Introduction to Machine Learning & Paradigm Shift",
    "readTime": "5 min read",
    "cloRef": "CLO1: Foundations of machine learning",
    "authoritativeSources": "Andreas M\u00fcller & Sarah Guido (Ch. 1); ECEg5407 Slides (Berta Delango & Bayable Teshome)",
    "sections": [
      {
        "id": "ml-1-1",
        "heading": "1.1 Traditional Programming vs Machine Learning",
        "content": "- **Traditional Programming:** Engineers manually craft deterministic rules:\n  $$\\text{Data} + \\text{Rules} \\longrightarrow \\text{Answers}$$\n- **Machine Learning:** Statistical algorithms infer the underlying mapping function from historical examples:\n  $$\\text{Data} + \\text{Answers} \\longrightarrow \\text{Rules}$$\n\n### The Three Learning Paradigms:\n1. **Supervised Learning:** Training data consists of input features $\\mathbf{x}$ paired with ground-truth targets $y$ (Classification & Regression).\n2. **Unsupervised Learning:** Discovering hidden structure, clusters, or patterns in unlabeled data $\\mathbf{x}$ (k-Means, PCA).\n3. **Reinforcement Learning:** An autonomous agent learns via trial and error through environmental reward signals."
      }
    ]
  },
  "eceg5407-ch2": {
    "courseCode": "ECEg5407",
    "chapterNum": 2,
    "title": "Supervised Learning: Foundations, Bias-Variance & 6 Core Models",
    "readTime": "6 min read",
    "cloRef": "CLO2: Supervised learning algorithms and generalization",
    "authoritativeSources": "Andreas M\u00fcller & Sarah Guido (Ch. 2); ECEg5407 Slides",
    "sections": [
      {
        "id": "ml-2-1",
        "heading": "2.1 The Bias-Variance Tradeoff",
        "content": "$$\\text{Expected Generalization Error} = \\text{Bias}^2 + \\text{Variance} + \\sigma_{\\epsilon}^2$$\n\n- **High Bias (Underfitting):** Model is overly simplistic and misses true relationships. Both training and test errors are high.\n- **High Variance (Overfitting):** Model is overly complex and memorizes random training noise. Training error is zero, but test error explodes.\n- **Regularization:** Penalizing model complexity:\n  - **Ridge ($L_2$):** Adds $\\lambda \\sum w_j^2$, shrinking weights smoothly.\n  - **Lasso ($L_1$):** Adds $\\lambda \\sum |w_j|$, driving irrelevant weights to exactly zero (automatic feature selection)."
      }
    ]
  }
};
