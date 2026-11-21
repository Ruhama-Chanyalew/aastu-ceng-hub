/**
 * AASTU Computer Engineering (CENG) - Comprehensive Lecture Notes Data
 * Tailored for Addis Ababa Science and Technology University (AASTU)
 * Department of Electrical and Computer Engineering — Graduating Class (GC 2026)
 * Grounded in authoritative curriculum textbooks and Ethiopian National Exit Exam (NEE5108) benchmarks.
 */

const AASTU_NOTES = {
  "eceg5405-ch1": {
    "courseId": "eceg5405",
    "courseCode": "ECEg5405",
    "chapterNum": 1,
    "title": "Introduction to Integrated Circuits & Semiconductor Evolution",
    "readTime": "10 min read",
    "cloRef": "CLO1: Explain an IC, its production, importance, and evolution",
    "authoritativeSources": "Jan M. Rabaey (Ch. 1); Neil Weste (Ch. 1); Wayne Wolf (Ch. 1); AASTU Syllabus",
    "sections": [
      {
        "id": "vlsi-1-1",
        "heading": "1.1 The Monolithic Planar Breakthrough & Overcoming the Tyranny of Numbers",
        "content": "An **Integrated Circuit (IC)** is a microscopic electronic network of interconnected active semiconductor devices (principally MOSFET transistors and diodes) alongside passive components (resistors, capacitors), monolithically fabricated upon a single continuous slice of semiconductor crystal (predominantly single-crystal silicon).\n\n### The Historical Bottleneck: \"The Tyranny of Numbers\"\nPrior to 1958, electronic computers (such as ENIAC) were constructed using discrete vacuum tubes and discrete transistors hand-soldered onto printed circuit boards (PCBs). This architecture hit a hard physical wall:\n- **Interconnection Failure Epidemic:** A system with $100,000$ discrete components required hundreds of thousands of hand-soldered joints. Solder fatigue, cold joints, and mechanical vibrations caused Mean Time Between Failures (MTBF) to drop to mere hours.\n- **Parasitic Delays:** Long copper wire traces between discrete packages introduced severe parasitic inductance ($L_{wire}$) and capacitance ($C_{wire}$). These delays limited clock frequencies strictly below $10\\text{ MHz}$.\n- **Power Dissipation:** Bulky components required excessive driving currents, generating unsustainable thermal dissipation.\n\n### The Monolithic Planar Solution (1958–1959)\n- **Jack Kilby (Texas Instruments, 1958):** Fabricated the first hybrid microcircuit on Germanium, demonstrating that active and passive devices could exist on the same semiconductor. However, flying gold wire bonds still connected the components.\n- **Robert Noyce (Fairchild Semiconductor, 1959):** Invented the true **Monolithic Planar Process** using Silicon. By employing thermally grown Silicon Dioxide ($\\text{SiO}_2$) as an insulating mask and evaporating thin-film Aluminum interconnects directly over the silicon substrate, all transistors and connections were printed simultaneously without manual wiring."
      },
      {
        "id": "vlsi-1-2",
        "heading": "1.2 Foundational Advantages & Economic Scaling of Monolithic ICs",
        "content": "The global digital revolution is sustained because monolithic silicon integration delivers five primary engineering advantages:\n\n1. **Extreme Reliability:** Planar lithography replaces physical wire joints with solid-state metallic film. MTBF increased by more than $10^7\\times$ compared to discrete assemblies.\n2. **Exponentially Lower Cost per Function:** Through batch fabrication, billions of transistors are manufactured simultaneously across a 300 mm wafer. The marginal cost of an individual transistor has fallen below $< \\$0.000000001$.\n3. **Sub-Nanosecond Propagation Delay:** Transistor gate lengths and interconnect lengths are measured in nanometers. Wire delay scales with length:\n   $$t_{delay} \\approx 0.69 \\cdot R_{wire} C_{wire}$$\n   Shrinking interconnect length reduces signal transit time from nanoseconds to picoseconds.\n4. **Drastically Reduced Power Consumption:** Nanoscale gates present ultra-low gate capacitance $C_{ox}$. Dynamic switching power scales quadratically with supply voltage:\n   $$P_{dynamic} = \\alpha \\cdot C_L \\cdot V_{DD}^2 \\cdot f_{clk}$$\n5. **Microminiaturization:** Complete multi-core supercomputers with billions of logic gates fit into a thumbnail-sized silicon die ($< 120\\text{ mm}^2$)."
      },
      {
        "id": "vlsi-1-3",
        "heading": "1.3 Evolution of ICs, Moore's Law & Dennard Scaling Collapse",
        "content": "### Integration Eras (Complexity Scaling):\n| Era | Typical Gate Count | Typical Devices | Landmark Milestones |\n|---|---|---|---|\n| **SSI (Small-Scale)** | $1 - 10$ gates | Basic NAND / NOR, Flip-Flops | Apollo Guidance Computer (1966) |\n| **MSI (Medium-Scale)** | $10 - 100$ gates | Adders, Decoders, 4-bit ALUs | 7400-Series TTL Logic |\n| **LSI (Large-Scale)** | $100 - 10,000$ gates | 4-bit / 8-bit Microprocessors | Intel 4004 (1971), 8080 (1974) |\n| **VLSI (Very Large)** | $10^4 - 10^6$ gates | 16-bit / 32-bit CPUs, 1MB DRAM | Intel 80386, Motorola 68000 |\n| **ULSI / SoC (System-on-Chip)** | $> 10^7 - 10^{11}$ transistors | Multi-Core CPUs, GPUs, AI NPUs | Apple M3, Nvidia H100, AMD Ryzen |\n\n### Moore's Law (Gordon Moore, 1965 / 1975)\nMoore observed that the number of transistors on a microchip doubles approximately every **18 to 24 months** at the minimum component cost. This is an economic roadmap that drove global semiconductor innovation for over 50 years.\n\n### Dennard Scaling (Robert Dennard, 1974)\nDennard proved that as MOSFET dimensions shrink by scaling factor $\\kappa > 1$ ($L' = L/\\kappa$, $W' = W/\\kappa$, $t_{ox}' = t_{ox}/\\kappa$), if the supply voltage is scaled proportionally ($V_{DD}' = V_{DD}/\\kappa$):\n- Transistor delay decreases: $t' = t/\\kappa$ (Frequency increases by $\\kappa$).\n- Power dissipation per transistor drops: $P' = P / \\kappa^2$.\n- Transistor density increases: $N' = \\kappa^2 \\cdot N$.\n- **Crucial Result:** Total Chip Power Density remains constant:\n  $$\\text{Power Density} = \\frac{N' \\cdot P'}{A'} = \\frac{(\\kappa^2 N) \\cdot (P / \\kappa^2)}{A / \\kappa^2} = \\frac{N \\cdot P}{A}$$\n\n### The \"Power Wall\" & Collapse of Dennard Scaling (2005)\nAround 2005, feature sizes dropped below $90\\text{ nm}$. Supply voltage could not drop below $\\approx 0.7 - 0.8\\text{ V}$ because the subthreshold slope ($S = 60 - 90\\text{ mV/decade}$) and thermal voltage ($k_B T / q$) are physically invariant. Subthreshold leakage current ($I_{off}$) exploded exponentially:\n$$I_{sub} \\propto e^{\\frac{V_{GS} - V_{TH}}{m \\, v_t}}$$\nBecause $V_{DD}$ stalled while transistor count continued doubling, chip power density spiked dramatically toward nuclear reactor levels ($> 100\\text{ W/cm}^2$). This forced the industry to:\n1. Abandon single-core clock frequency scaling (stalling clock speeds at $\\approx 3 - 5\\text{ GHz}$).\n2. Adopt **Multi-Core Architectures** (parallel throughput over frequency).\n3. Transition from planar 2D MOSFETs to **3D FinFETs** and **Gate-All-Around (GAA) Nanosheets** for superior electrostatic channel control."
      },
      {
        "id": "vlsi-1-4",
        "heading": "1.4 Silicon Wafer Economics, Die Yield Models & Worked Numerical Example",
        "content": "In commercial VLSI manufacturing, profitability is governed by wafer cost, die area, defect density, and yield.\n\n### Mathematical Yield Formulation (Murphy's Model & Seeds' Model)\nDefects on a silicon wafer (dust particles, crystal dislocations) occur at random defect density $D$ (defects per $\\text{cm}^2$).\nFor a die with active area $A$:\n$$\\text{Dies Per Wafer (DPW)} \\approx \\frac{\\pi \\cdot (d_{wafer}/2)^2}{A} - \\frac{\\pi \\cdot d_{wafer}}{\\sqrt{2 \\cdot A}}$$\nThe second term accounts for unusable incomplete dies along the wafer perimeter.\n\nThe manufacturing yield $Y$ is given by Murphy's model:\n$$Y = \\left( \\frac{1 - e^{-A \\cdot D}}{A \\cdot D} \\right)^2$$\nAnd the final cost of an individual tested good die is:\n$$\\text{Cost}_{die} = \\frac{\\text{Cost}_{wafer}}{\\text{DPW} \\times Y} + \\text{Cost}_{testing} + \\text{Cost}_{packaging}$$\n\n---\n\n### 🧮 Worked Numerical Example:\n**Problem:** A commercial foundry manufactures an AI accelerator chip on a $300\\text{ mm}$ silicon wafer costing $\\$12,000$.\n- Die Area $A = 1.8\\text{ cm}^2$ ($180\\text{ mm}^2$).\n- Defect density $D = 0.35\\text{ defects/cm}^2$.\n- Packaging and test cost per good die = $\\$8.00$.\nCalculate: (a) Dies per wafer (DPW), (b) Die Yield $Y$, and (c) Final cost per good packaged chip.\n\n**Step-by-Step Solution:**\n1. **Calculate Dies Per Wafer (DPW):**\n   Wafer diameter $d = 30\\text{ cm}$, radius $r = 15\\text{ cm}$.\n   $$\\text{Wafer Area} = \\pi \\cdot (15)^2 = 706.86\\text{ cm}^2$$\n   $$\\text{Gross Dies} = \\frac{706.86}{1.8} \\approx 392.7$$\n   Perimeter loss correction:\n   $$\\text{Loss} = \\frac{\\pi \\cdot 30}{\\sqrt{2 \\cdot 1.8}} = \\frac{94.25}{\\sqrt{3.6}} = \\frac{94.25}{1.897} \\approx 49.7$$\n   $$\\text{DPW} = 392 - 50 = 342\\text{ dies}$$\n\n2. **Calculate Die Yield ($Y$):**\n   Product $A \\cdot D = 1.8 \\times 0.35 = 0.63$.\n   $$e^{-0.63} \\approx 0.5326$$\n   $$Y = \\left( \\frac{1 - 0.5326}{0.63} \\right)^2 = \\left( \\frac{0.4674}{0.63} \\right)^2 = (0.7419)^2 \\approx 0.5504 \\quad (55.04\\%)$$\n\n3. **Calculate Good Dies and Unit Cost:**\n   $$\\text{Good Dies per Wafer} = 342 \\times 0.5504 \\approx 188\\text{ good dies}$$\n   $$\\text{Unpackaged Die Cost} = \\frac{\\$12,000}{188} = \\$63.83$$\n   $$\\text{Final Packaged Chip Cost} = \\$63.83 + \\$8.00 = \\$71.83$$\n> [!NOTE]\n> Notice how doubling the die area quadruples the yield loss! In advanced 3nm nodes, chips larger than $300\\text{ mm}^2$ suffer yield drops below $30\\%$, which explains why modern vendors use multi-die **chiplet architectures** instead of massive monolithic dies."
      },
      {
        "id": "vlsi-1-5",
        "heading": "1.5 National Exit Exam (NEE5108) Key Benchmarks & Pitfalls",
        "content": "### High-Yield Exam Review & Common Traps:\n- **Trap 1: Moore's Law is NOT a Law of Physics.** It is an empirical business and economic observation formulated by Gordon Moore.\n- **Trap 2: Why did Dennard Scaling stop?** Many students mistakenly write \"because transistors could not get smaller.\" The correct answer is: **Subthreshold leakage current ($I_{sub}$) exploded because the thermal voltage ($k_B T / q$) and subthreshold swing could not scale, preventing further supply voltage ($V_{DD}$) reduction without unacceptable static power dissipation.**\n- **Trap 3: Die Yield Dependency:** Die yield depends inversely on the **square or exponential** of die area, not linearly. A chip with twice the area has far less than half the yield."
      }
    ]
  },
  "eceg5405-ch2": {
    "courseId": "eceg5405",
    "courseCode": "ECEg5405",
    "chapterNum": 2,
    "title": "VLSI Design Cycle, Methodologies & ASIC Design Styles",
    "readTime": "12 min read",
    "cloRef": "CLO2: Explain and analyze VLSI design cycles, ASIC styles, and architectures",
    "authoritativeSources": "M. J. S. Smith — Application-Specific Integrated Circuits; Wayne Wolf (Ch. 1-2); AASTU Syllabus",
    "sections": [
      {
        "id": "vlsi-2-1",
        "heading": "2.1 The Top-Down VLSI Design Flow",
        "content": "Modern microchips containing tens of billions of transistors cannot be designed manually at the transistor level. They follow a rigorous top-down hierarchical electronic design automation (EDA) cycle:\n\n```\n[System Specification] \n        │ (Architecture definition, power/timing budgets)\n        ▼\n[Architectural / Behavioral Design]\n        │ (High-level algorithmic modeling in C/Python/SystemC)\n        ▼\n[RTL Modeling (Register-Transfer Level)]\n        │ (Synthesizable VHDL / Verilog descriptions of registers and combinational logic)\n        ▼\n[Logic Synthesis & Optimization]\n        │ (Translation to Boolean logic; gate-level netlist technology mapping)\n        ▼\n[Physical Design (Place and Route)]\n        │ (Floorplanning → Placement → Clock Tree Synthesis (CTS) → Signal Routing)\n        ▼\n[Physical Verification & Sign-Off]\n        │ (DRC: Design Rule Check; LVS: Layout vs Schematic; Parasitic Extraction RC)\n        ▼\n[Static Timing Analysis (STA)]\n        │ (Validating setup and hold timing corners: WNS ≥ 0, TNS = 0)\n        ▼\n[Tapeout (GDSII / OASIS File Delivery)]\n        │ (Transmitting photomask geometric stream to semiconductor foundry)\n        ▼\n[Silicon Fabrication, Packaging & Post-Silicon Validation]\n```\n\n### Detailed Stage Breakdown:\n1. **Clock Tree Synthesis (CTS):** The step of inserting balanced buffer trees (H-tree, fishbone) to deliver clock pulses to hundreds of thousands of flip-flops simultaneously. Goal: Minimizing **Clock Skew** ($t_{skew} = t_{clk2} - t_{clk1} \\to 0$).\n2. **Design Rule Check (DRC):** Verifies that all drawn polygon geometries comply with minimum foundry manufacturing spacing and width tolerances.\n3. **Layout Versus Schematic (LVS):** Extracts transistor devices and wire connectivity from drawn layout polygons and executes a 1-to-1 graph isomorphism match against the synthesized gate netlist. If an extra bridge or open circuit exists, LVS fails."
      },
      {
        "id": "vlsi-2-2",
        "heading": "2.2 The Gajski-Kuhn Y-Chart Paradigm",
        "content": "The **Gajski-Kuhn Y-Chart** (1983) is the fundamental theoretical model used to describe VLSI design abstractions. It categorizes design activities across three intersecting radial axes representing design domains:\n\n1. **Behavioral Domain (What the system does):**\n   - Temporal and algorithmic descriptions.\n   - Hierarchy: Transfer Functions $\\to$ Algorithms $\\to$ State Machines / RTL $\\to$ Boolean Equations $\\to$ Differential Transfer Curves.\n2. **Structural Domain (How it is connected):**\n   - Hardware entities and interconnectivity.\n   - Hierarchy: Multi-Processor Systems $\\to$ Processors / Memories $\\to$ ALUs / Registers $\\to$ Logic Gates $\\to$ Transistors.\n3. **Physical / Geometric Domain (How it is laid out in silicon):**\n   - Physical layout on silicon.\n   - Hierarchy: Multi-Chip Modules / PCB $\\to$ Floorplan / Chips $\\to$ Standard Cell Rows $\\to$ Geometric Diffusion/Polysilicon Polygons.\n\n> [!NOTE]\n> VLSI synthesis is represented on the Y-Chart as moving from the **Behavioral domain to the Structural domain**, while Physical Design (Place & Route) represents moving from the **Structural domain to the Physical domain**."
      },
      {
        "id": "vlsi-2-3",
        "heading": "2.3 Comparative Taxonomy of ASIC Design Styles",
        "content": "An **Application-Specific Integrated Circuit (ASIC)** is an IC customized for a particular use rather than intended for general-purpose usage.\n\n| ASIC Design Style | Customization Level | Manufacturing Masks Required | NRE Cost (Non-Recurring Eng.) | Unit Production Cost | Silicon Efficiency & Max Freq | Turnaround Time |\n|---|---|---|---|---|---|---|\n| **Full-Custom ASIC** | Every single transistor, sizing, and wire layer hand-drawn | $100\\%$ of all mask layers (30-60+ masks) | Extremely High (Millions of $\\$) | Lowest at ultra-high volumes | Highest Performance & Density | $12 - 24$ Months |\n| **Standard-Cell ASIC** | Pre-characterized cell library (AND, OR, D-FF) placed in rows | $100\\%$ of all mask layers | High ($\\$500\\text{k} - \\$5\\text{M}$) | Very Low at medium/high volumes | High Performance & High Density | $6 - 12$ Months |\n| **Gate Array (Masked Gate Array - MGA)** | Pre-diffused arrays of uncommitted transistors on silicon | Only upper 2-4 metallization masks | Moderate | Moderate | Moderate (Sub-optimal transistor utilization) | $2 - 4$ Months |\n| **Field-Programmable Gate Array (FPGA)** | Configurable Logic Blocks (CLBs) configured via SRAM / Flash | Zero custom masks (standard off-the-shelf IC) | Zero NRE | High per chip | Lower Clock Speeds ($< 800\\text{ MHz}$); High Static Power | Minutes (Instant Bitstream upload) |"
      },
      {
        "id": "vlsi-2-4",
        "heading": "2.4 Economic Break-Even Volume Analysis: ASIC vs FPGA",
        "content": "Choosing between an FPGA and a Standard-Cell ASIC is fundamentally an economic optimization problem governed by **Non-Recurring Engineering (NRE) costs** and **volume unit costs**:\n\n$$\\text{Total Cost} = \\text{NRE} + (\\text{Volume} \\times \\text{Unit Cost})$$\n\nFor an FPGA:\n$$\\text{Total Cost}_{FPGA} = \\text{NRE}_{FPGA} + V \\cdot C_{unit, FPGA} \\approx 0 + V \\cdot C_{unit, FPGA}$$\nFor an ASIC:\n$$\\text{Total Cost}_{ASIC} = \\text{NRE}_{ASIC} + V \\cdot C_{unit, ASIC}$$\n\nSetting $\\text{Total Cost}_{FPGA} = \\text{Total Cost}_{ASIC}$ yields the **Economic Break-Even Production Volume ($V^*$)**:\n$$V^* = \\frac{\\text{NRE}_{ASIC} - \\text{NRE}_{FPGA}}{C_{unit, FPGA} - C_{unit, ASIC}}$$\n\n---\n\n### 🧮 Worked Numerical Problem:\n**Scenario:** An engineering startup in Addis Ababa is designing a 5G telecommunications baseband processor.\n- FPGA route: Zero mask NRE; FPGA unit cost = $\\$280$ per chip.\n- Standard-Cell ASIC route: Total NRE (mask set, EDA tool licenses, prototype runs) = $\\$1,800,000$; ASIC unit cost in high-volume production = $\\$20$ per chip.\n1. Determine the break-even volume $V^*$.\n2. If the company projects selling $15,000$ units, which option is cheaper and by how much?\n3. If market demand surges to $100,000$ units, what is the cost difference?\n\n**Step-by-Step Calculation:**\n1. **Break-Even Volume:**\n   $$V^* = \\frac{\\$1,800,000 - 0}{\\$280 - \\$20} = \\frac{1,800,000}{260} \\approx 6,923\\text{ units}$$\n   - For $V < 6,923$: The FPGA is more economical.\n   - For $V > 6,923$: The ASIC is dramatically more economical.\n\n2. **At $V = 15,000$ units:**\n   $$\\text{Cost}_{FPGA} = 15,000 \\times \\$280 = \\$4,200,000$$\n   $$\\text{Cost}_{ASIC} = \\$1,800,000 + (15,000 \\times \\$20) = \\$1,800,000 + \\$300,000 = \\$2,100,000$$\n   **Verdict:** The ASIC saves $\\$2,100,000$ (a $50\\%$ cost reduction!).\n\n3. **At $V = 100,000$ units:**\n   $$\\text{Cost}_{FPGA} = 100,000 \\times \\$280 = \\$28,000,000$$\n   $$\\text{Cost}_{ASIC} = \\$1,800,000 + (100,000 \\times \\$20) = \\$3,800,000$$\n   **Verdict:** The ASIC saves $\\$24,200,000$!"
      },
      {
        "id": "vlsi-2-5",
        "heading": "2.5 RISC vs CISC Architectural Silicon Tradeoffs",
        "content": "The architectural instruction set directly determines the silicon layout complexity, control unit area, and CPI (Cycles Per Instruction):\n\n| Feature | RISC (Reduced Instruction Set Computer) | CISC (Complex Instruction Set Computer) |\n|---|---|---|\n| **Instruction Length** | Fixed ($32$-bit or $16$-bit); simple decoding | Variable ($1 - 15$ bytes); complex decoding |\n| **Silicon Control Unit** | **Hardwired Control** (logic gates, fast, tiny area $\\approx 5 - 10\\%$ of die) | **Microprogrammed ROM** (large microcode memory, slow, $> 30\\%$ of die) |\n| **Pipeline Efficiency** | Single-cycle execution per stage; easy pipelining | Variable-cycle instructions cause pipeline bubbles/hazards |\n| **Register Set** | Large uniform register file ($32+$ general registers) | Small register file; memory-heavy operands |\n| **Silicon Die Allocation** | Excess die area dedicated to large L1/L2 caches and ALUs | Die area occupied by legacy decoders and microcode sequencers |\n| **Representative Families** | ARM, RISC-V, MIPS | Intel x86 (IA-32, AMD64) |"
      }
    ]
  },
  "eceg5405-ch3": {
    "courseId": "eceg5405",
    "courseCode": "ECEg5405",
    "chapterNum": 3,
    "title": "Design and Fabrication of VLSI Devices (CMOS Process Flow)",
    "readTime": "12 min read",
    "cloRef": "CLO3: Explain and analyze the design and fabrication of VLSI devices",
    "authoritativeSources": "Jan M. Rabaey (Ch. 2); Neil Weste (Ch. 3); Plummer — Silicon VLSI Technology; AASTU Guide Book",
    "sections": [
      {
        "id": "vlsi-3-1",
        "heading": "3.1 Semiconductor Substrate Preparation & Ingot Growth",
        "content": "Monolithic integrated circuits are built upon ultrapure electronic-grade silicon (EGS) substrates.\n\n### Czochralski (Cz) Crystal Ingot Growth:\n1. **Polysilicon Refining:** Quartzite gravel ($\\text{SiO}_2$) is reduced with carbon in an electric arc furnace to produce metallurgical-grade silicon (MGS, $\\approx 98\\%$ pure). Reacting with $\\text{HCl}$ produces trichlorosilane ($\\text{SiHCl}_3$), which is fractionally distilled and pyrolyzed to produce **Electronic-Grade Silicon (EGS)** with purity exceeding **$99.9999999\\%$ (9N purity)**.\n2. **Crystal Pulling:** Pure molten silicon is held in a quartz crucible at $1420^\\circ\\text{C}$ in an inert argon environment. A precisely oriented seed crystal (e.g., $\\langle 100 \\rangle$ crystal plane) is dipped into the melt and slowly withdrawn while counter-rotating.\n3. **Ingot Slicing & Polishing:** The resulting cylindrical boule (typically $300\\text{ mm}$ diameter, $2\\text{ meters}$ long) is trimmed, ground with an orientation flat or notch, and sliced into circular wafers of thickness $\\approx 775\\ \\mu\\text{m}$ using high-speed diamond wire saws. Chemical-Mechanical Polishing (CMP) polishes the top surface to atomic flatness (< 0.5 nm roughness)."
      },
      {
        "id": "vlsi-3-2",
        "heading": "3.2 The 8-Step Planar Batch Fabrication Cycle",
        "content": "The entire CMOS fabrication process is an iterative sequence of 8 core chemical and physical planar operations:\n\n```\n[1. Thermal Oxidation] ──> [2. Photoresist Application] ──> [3. Optical Lithography]\n          ▲                                                              │\n          │                                                              ▼\n[8. Chemical Mechanical Polish] <── [7. Metallization] <── [6. Etching] <── [5. Ion Implantation]\n```\n\n1. **Thermal Oxidation:** Growing an amorphous insulating layer of silicon dioxide ($\\text{SiO}_2$) at high temperatures ($900 - 1100^\\circ\\text{C}$) in a quartz furnace tube.\n   - *Dry Oxidation:* $\\text{Si} + \\text{O}_2 \\to \\text{SiO}_2$ (Slow growth, high dielectric quality, used for gate oxides).\n   - *Wet Oxidation:* $\\text{Si} + 2\\text{H}_2\\text{O} \\to \\text{SiO}_2 + 2\\text{H}_2$ (Fast growth, lower quality, used for thick field oxide isolation).\n2. **Photoresist Spin Coating:** Applying a liquid, light-sensitive organic polymer uniformly across the wafer surface at $3000 - 5000\\text{ RPM}$.\n3. **Photolithography (Exposure):** Ultraviolet light (DUV 193 nm or EUV 13.5 nm) is projected through a patterned optical quartz reticle (mask).\n   - *Positive Photoresist:* Exposed regions become soluble in aqueous developer and wash away. The unexposed pattern remains.\n   - *Negative Photoresist:* Exposed regions cross-link and become insoluble.\n4. **Etching:** Removing exposed $\\text{SiO}_2$ or polysilicon layers.\n   - *Wet Chemical Etching (HF acid):* Isotropic (etches equally in all directions, causing undercutting under masks).\n   - *Dry Plasma / Reactive-Ion Etching (RIE):* Highly **anisotropic** (directional vertical etching with zero lateral undercut, essential for nanoscale gate pitch).\n5. **Ion Implantation:** High-energy electrostatic accelerators propel dopant ions (Boron $B^+$ for p-type; Phosphorus $P^+$ or Arsenic $As^+$ for n-type) into silicon with kinetic energies of $10 - 200\\text{ keV}$. Concentration is determined by beam current; junction depth is determined by accelerator voltage.\n6. **Thermal Annealing:** Rapid Thermal Annealing (RTA) at $1000^\\circ\\text{C}$ for a few seconds repairs crystal lattice damage caused by ion bombardment and moves dopants into substitutionary lattice sites.\n7. **Chemical Vapor Deposition (CVD):** Depositing thin films of polysilicon gate material, silicon nitride, or dielectric insulators from gaseous precursors.\n8. **Physical Vapor Deposition (Metallization):** Sputtering or evaporating thin films of copper or aluminum for low-resistance multi-layer interconnects."
      },
      {
        "id": "vlsi-3-3",
        "heading": "3.3 Complete CMOS Inverter Process Flow (n-Well Process)",
        "content": "The standard n-well CMOS fabrication flow requires a minimum of 6 to 10 optical masks:\n\n1. **Substrate Selection:** Start with a moderately doped p-type silicon wafer.\n2. **Mask 1 — n-Well Formation:** Protect nMOS regions with photoresist; implant phosphorus ions to form deep n-wells for pMOS transistors. Drive-in diffusion creates a stable tub.\n3. **Mask 2 — Active Area Definition (LOCOS / STI):** Deposit Silicon Nitride ($\\text{Si}_3\\text{N}_4$), pattern it with Mask 2, and etch Shallow Trench Isolation (STI) filled with $\\text{SiO}_2$ to isolate adjacent transistor regions.\n4. **Thin Gate Oxidation:** Thermally grow a thin high-$\\kappa$ gate dielectric across the exposed active silicon channels.\n5. **Mask 3 — Polysilicon Gates:** Deposit chemical vapor polysilicon. Pattern and RIE etch the polysilicon lines defining the gates of both nMOS and pMOS transistors.\n6. **Mask 4 — n+ Source/Drain Implantation (Self-Aligned):** Mask pMOS regions with photoresist. Implant heavy Arsenic ($As^+$) or Phosphorus into the p-substrate to form nMOS source and drain junctions.\n   > [!IMPORTANT]\n   > **The Self-Aligned Gate Advantage:** The polysilicon gate itself blocks ions from entering the underlying channel. Therefore, the source and drain edges align automatically with the gate edge without requiring tight lithographic alignment tolerances!\n7. **Mask 5 — p+ Source/Drain Implantation:** Mask nMOS regions. Implant Boron ($B^+$) into the n-well to create pMOS source and drain junctions.\n8. **Interlayer Dielectric (ILD) & Mask 6 — Contact Cuts:** Deposit insulating $\\text{SiO}_2$. Pattern and etch vertical contact holes down to source/drain diffusions and polysilicon gates.\n9. **Mask 7 — Metal 1 Metallization:** Deposit Aluminum/Copper. Pattern and etch horizontal signal and power ($V_{DD}, GND$) interconnect rails."
      },
      {
        "id": "vlsi-3-4",
        "heading": "3.4 Scalable Geometric Design Rules (Mead-Conway $\\lambda$-Rules)",
        "content": "To ensure physical masks will print successfully without shorts or open circuits despite lithographic misalignment, process engineers specify geometric **Design Rules**.\nCarver Mead and Lynn Conway established dimensionless **$\\lambda$-rules**, where $\\lambda$ represents the maximum possible mask alignment error (typically $\\lambda = L_{min} / 2$).\n\n### Primary Mead-Conway Design Rules:\n1. **Polysilicon Rules:**\n   - Minimum Gate Width (Length $L$): $2\\lambda$.\n   - Minimum Polysilicon Spacing: $2\\lambda$.\n   - Gate Extension beyond active diffusion: **$2\\lambda$** (Prevents source-to-drain short-circuit around gate edges).\n2. **Diffusion (Active) Rules:**\n   - Minimum Active Width: $3\\lambda$.\n   - Minimum Active Spacing: $3\\lambda$.\n   - Diffusion Overhang beyond gate: **$2\\lambda$** (Ensures full source/drain contact formation).\n3. **Metal 1 Rules:**\n   - Minimum Metal 1 Width: $3\\lambda$.\n   - Minimum Metal 1 Spacing: $3\\lambda$.\n4. **Contact Cut Rules:**\n   - Exact Contact Size: $2\\lambda \\times 2\\lambda$.\n   - Minimum Metal Overlap of Contact: $1\\lambda$ on all sides.\n   - Spacing from contact to transistor gate edge: $2\\lambda$."
      },
      {
        "id": "vlsi-3-5",
        "heading": "3.5 The CMOS Latch-Up Parasitic Thyristor Phenomenon",
        "content": "### What is Latch-Up?\n**Latch-Up** is a catastrophic failure mode in bulk CMOS circuits where a low-impedance short-circuit path forms between the power supply ($V_{DD}$) and ground ($GND$), leading to massive current flow and thermal destruction of the silicon die.\n\n### Parasitic Bipolar Mechanism ($pnpn$ SCR):\nWithin an n-well CMOS structure, parasitic bipolar junction transistors (BJTs) are inherently created:\n- A vertical **pnp BJT** ($Q_1$): Formed by the p+ source of pMOS (Emitter), the n-well (Base), and the p-substrate (Collector).\n- A lateral **npn BJT** ($Q_2$): Formed by the n+ source of nMOS (Emitter), the p-substrate (Base), and the n-well (Collector).\n- Parasitic resistances: Substrate resistance $R_{sub}$ and well resistance $R_{well}$.\n\nThese two transistors form a cross-coupled **Silicon Controlled Rectifier (SCR)**:\n- The collector of $Q_1$ drives current into the base of $Q_2$.\n- The collector of $Q_2$ pulls base current from $Q_1$.\n- **Triggering Condition:** If current spikes (due to electrostatic discharge ESD, radiation, or supply voltage spikes) cause the voltage drop across $R_{sub}$ or $R_{well}$ to exceed the diode forward bias ($V_{BE} \\ge 0.7\\text{ V}$), regenerative positive feedback kicks in:\n  $$\\beta_1 \\cdot \\beta_2 \\ge 1$$\n  Once turned on, the SCR conducts massive currents directly from $V_{DD}$ to $GND$, which cannot be turned off without removing power entirely.\n\n### Engineering Prevention Techniques:\n1. **Guard Rings:** Enclosing all nMOS and pMOS transistors inside heavily doped diffusion rings ($p^+$ rings connected to $GND$, $n^+$ rings connected to $V_{DD}$) to collect minority carriers before they reach parasitic bases.\n2. **Abundant Substrate Taps:** Placing substrate and well contacts within $10 - 20\\ \\mu\\text{m}$ of every transistor source to dramatically reduce $R_{sub}$ and $R_{well}$.\n3. **Epitaxial Wafers:** Growing a lightly doped active layer on top of a heavily doped low-resistance bulk substrate ($p^+$ wafer) to shunt substrate currents safely."
      }
    ]
  },
  "eceg5405-ch4": {
    "courseId": "eceg5405",
    "courseCode": "ECEg5405",
    "chapterNum": 4,
    "title": "CMOS Logic, Stick Diagrams & Layout Rules",
    "readTime": "12 min read",
    "cloRef": "CLO4: Develop ICs using CMOS technology, stick diagrams, and sizing",
    "authoritativeSources": "Neil Weste & David Harris (Ch. 2-4); Jan M. Rabaey (Ch. 5-6); AASTU Guide Book",
    "sections": [
      {
        "id": "vlsi-4-1",
        "heading": "4.1 MOSFET Device Physics & Shockley Square-Law Equations",
        "content": "The metal-oxide-semiconductor field-effect transistor (MOSFET) operates as a four-terminal voltage-controlled switch (Drain $D$, Gate $G$, Source $S$, Body/Substrate $B$).\n\n### Operating Regions of an nMOS Transistor:\n1. **Cutoff Region ($V_{GS} < V_{TH}$):**\n   No inversion channel exists.\n   $$I_D \\approx 0$$\n2. **Linear / Triode Region ($V_{GS} \\ge V_{TH}$ and $V_{DS} < V_{GS} - V_{TH}$):**\n   Continuous inversion channel exists from source to drain. Transistor behaves as a voltage-controlled resistor:\n   $$I_D = \\mu_n C_{ox} \\frac{W}{L} \\left[ (V_{GS} - V_{TH}) V_{DS} - \\frac{V_{DS}^2}{2} \\right]$$\n3. **Saturation Region ($V_{GS} \\ge V_{TH}$ and $V_{DS} \\ge V_{GS} - V_{TH}$):**\n   The channel pinches off at the drain end. Drain current becomes independent of $V_{DS}$:\n   $$I_{D,sat} = \\frac{1}{2} \\mu_n C_{ox} \\frac{W}{L} (V_{GS} - V_{TH})^2 \\cdot (1 + \\lambda V_{DS})$$\n   Where:\n   - $k_n' = \\mu_n C_{ox} = \\frac{\\mu_n \\epsilon_{ox}}{t_{ox}}$ is the process transconductance parameter.\n   - $W/L$ is the transistor aspect ratio (width to length).\n   - $\\lambda$ is the channel length modulation parameter."
      },
      {
        "id": "vlsi-4-2",
        "heading": "4.2 The CMOS Inverter: Voltage Transfer Characteristics (VTC) & Noise Margins",
        "content": "The CMOS inverter consists of a complementary pair: a pMOS pull-up network (PUN) connected to $V_{DD}$ and an nMOS pull-down network (PDN) connected to $GND$.\n\n### Critical Voltage Points on the VTC:\n- **$V_{OH}$ (Output High Voltage):** The maximum output voltage when input is logic 0 ($V_{in} = 0$). For static CMOS, $V_{OH} = V_{DD}$.\n- **$V_{OL}$ (Output Low Voltage):** The minimum output voltage when input is logic 1 ($V_{in} = V_{DD}$). For static CMOS, $V_{OL} = 0\\text{ V}$.\n- **$V_{IL}$ (Input Low Voltage):** The input voltage on the VTC where the slope equals $-1$ ($\\frac{dV_{out}}{dV_{in}} = -1$) on the lower input curve. Any $V_{in} < V_{IL}$ is treated as a solid logic 0.\n- **$V_{IH}$ (Input High Voltage):** The input voltage where the slope equals $-1$ ($\\frac{dV_{out}}{dV_{in}} = -1$) on the upper input curve. Any $V_{in} > V_{IH}$ is treated as a solid logic 1.\n- **$V_M$ (Switching Threshold Voltage):** The point where $V_{in} = V_{out}$. Both nMOS and pMOS are in **saturation**. Equating currents:\n  $$\\frac{1}{2} k_n (V_M - V_{THn})^2 = \\frac{1}{2} k_p (V_{DD} - V_M - |V_{THp}|)^2$$\n  Solving for $V_M$:\n  $$V_M = \\frac{V_{THn} + \\sqrt{\\frac{k_p}{k_n}} (V_{DD} - |V_{THp}|)}{1 + \\sqrt{\\frac{k_p}{k_n}}}$$\n  To achieve a perfectly symmetric inverter where $V_M = V_{DD} / 2$ (assuming $V_{THn} = |V_{THp}|$):\n  $$k_n = k_p \\implies \\mu_n C_{ox} \\left(\\frac{W}{L}\\right)_n = \\mu_p C_{ox} \\left(\\frac{W}{L}\\right)_p$$\n\n### Noise Margins Formulation:\n$$\\text{Noise Margin High } (NM_H) = V_{OH} - V_{IH} = V_{DD} - V_{IH}$$\n$$\\text{Noise Margin Low } (NM_L) = V_{IL} - V_{OL} = V_{IL} - 0 = V_{IL}$$\nA robust gate requires large noise margins to prevent signal switching due to thermal or crosstalk noise."
      },
      {
        "id": "vlsi-4-3",
        "heading": "4.3 Transistor Sizing & Mobility Ratio Derivation ($W_p / W_n$)",
        "content": "In bulk silicon, electrons move in the conduction band while holes move in the valence band. Due to higher effective mass and lattice scattering:\n$$\\mu_n \\approx 500\\text{ cm}^2/(\\text{V}\\cdot\\text{s}), \\quad \\mu_p \\approx 200\\text{ cm}^2/(\\text{V}\\cdot\\text{s}) \\implies \\frac{\\mu_n}{\\mu_p} \\approx 2.5$$\n\nFor equal rise time ($t_r$) and fall time ($t_f$), the on-resistance of the pMOS pull-up must equal the on-resistance of the nMOS pull-down:\n$$R_{on,p} = R_{on,n} \\implies \\frac{1}{\\mu_p C_{ox} (W/L)_p (V_{DD} - |V_{THp}|)} = \\frac{1}{\\mu_n C_{ox} (W/L)_n (V_{DD} - V_{THn})}$$\nAssuming identical channel lengths $L_n = L_p = L_{min}$:\n$$\\left(\\frac{W_p}{W_n}\\right) = \\frac{\\mu_n}{\\mu_p} \\approx 2.5 \\quad (\\text{typically sized } 2:1 \\text{ to } 3:1)$$\n\n---\n\n### Series and Parallel Sizing Rules:\n- **nMOS in Series (e.g., 2-input NAND):** Resistances add ($2 \\times R_{on}$). To maintain identical pull-down delay to a unit inverter, the width must be doubled: $W_n = 2W$. For $N$ inputs in series: $W_n = N \\cdot W$.\n- **pMOS in Series (e.g., 2-input NOR):** Resistances add. Since pMOS already has $2.5\\times$ higher resistivity, $N$ pMOS in series become enormous: $W_p = N \\times 2.5W = 5W$ for a 2-input NOR.\n> [!TIP]\n> **Why NAND is Universally Preferred over NOR in CMOS:**\n> In a 2-input NAND, the two high-resistance pMOS transistors are in **parallel**, meaning each requires only $2.5W$. In a 2-input NOR, the pMOS transistors are in **series**, requiring $5W$ each. Therefore, NAND gates have significantly smaller silicon area and much lower parasitic input capacitance than NOR gates."
      },
      {
        "id": "vlsi-4-4",
        "heading": "4.4 Complex Static CMOS Gates, Euler Paths & Stick Diagrams",
        "content": "### Dual Graph Conduction Complement:\nTo implement an arbitrary Boolean function $Y = \\overline{f(A, B, C, ...)}$:\n1. **Pull-Down Network (PDN):** Synthesizes $f$ using nMOS transistors.\n   - AND ($A \\cdot B$) $\\implies$ Transistors in **series**.\n   - OR ($A + B$) $\\implies$ Transistors in **parallel**.\n2. **Pull-Up Network (PUN):** Synthesizes the dual conduction graph using pMOS transistors.\n   - Series in PDN becomes **parallel** in PUN.\n   - Parallel in PDN becomes **series** in PUN.\n\n---\n\n### Stick Diagrams & Color Encoding:\nStick diagrams represent the topological routing layout without exact dimensional widths:\n- **Green:** n-Diffusion ($n^+$ silicon)\n- **Yellow / Brown:** p-Diffusion ($p^+$ silicon)\n- **Red:** Polysilicon (Transistor gate occurs wherever Red crosses Green or Yellow)\n- **Blue:** Metal 1 interconnects\n- **Black X:** Contact cut\n\n### Finding the Euler Path for Compact Layout:\nTo lay out a static gate with an uninterrupted continuous diffusion strip (avoiding costly diffusion breaks that waste silicon area):\n1. Construct the connection graph for the PDN and PUN.\n2. Find an **Euler Path**: a path through the graph that visits every transistor gate (edge) **exactly once**.\n3. Use the exact same gate order sequence for both the nMOS diffusion strip and pMOS diffusion strip."
      },
      {
        "id": "vlsi-4-5",
        "heading": "4.5 Power Dissipation Components & Logical Effort Delay",
        "content": "### Total Power Dissipation in CMOS:\n$$P_{total} = P_{dynamic} + P_{short-circuit} + P_{static}$$\n\n1. **Dynamic Switching Power:**\n   $$P_{dynamic} = \\alpha \\cdot C_L \\cdot V_{DD}^2 \\cdot f_{clk}$$\n   Where $\\alpha$ is the switching activity factor ($0 \\le \\alpha \\le 1$), $C_L$ is the total load capacitance, and $f_{clk}$ is the operating frequency.\n2. **Short-Circuit Power:**\n   During the input voltage transition through $V_{IL} < V_{in} < V_{IH}$, both nMOS and pMOS are simultaneously turned on, creating a direct current path from $V_{DD}$ to $GND$:\n   $$P_{sc} = I_{peak} \\cdot t_{rise/fall} \\cdot V_{DD} \\cdot f_{clk}$$\n   Typically kept $< 10\\%$ of dynamic power through sharp input clock edges.\n3. **Static Leakage Power:**\n   $$P_{static} = I_{leakage} \\cdot V_{DD} = (I_{subthreshold} + I_{gate\\_oxide} + I_{junction}) \\cdot V_{DD}$$\n\n### Method of Logical Effort (Sutherland & Sproull):\nLogical effort models gate delay normalized to an ideal inverter:\n$$d = g \\cdot h + p$$\n- $g$ = **Logical Effort** (Complexity of gate topology; for inverter $g=1$; for 2-input NAND $g=4/3$; for 2-input NOR $g=5/3$).\n- $h$ = **Electrical Effort** (Fan-out ratio $h = C_{out} / C_{in}$).\n- $p$ = **Parasitic Delay** (Internal diffusion capacitance; for inverter $p=1$; for 2-input NAND $p=2$)."
      }
    ]
  },
  "eceg5405-ch5": {
    "courseId": "eceg5405",
    "courseCode": "ECEg5405",
    "chapterNum": 5,
    "title": "Application-Specific Integrated Circuits (ASICs) & FPGAs",
    "readTime": "11 min read",
    "cloRef": "CLO5: Apply knowledge of ASICs and FPGAs in circuit synthesis",
    "authoritativeSources": "M. J. S. Smith — ASICs (Ch. 4-6); Clive Maxfield — The Design Warrior's Guide to FPGAs",
    "sections": [
      {
        "id": "vlsi-5-1",
        "heading": "5.1 Evolution of Programmable Logic Devices (PLD to FPGA)",
        "content": "Before the advent of modern FPGAs, digital designers used simple programmable hardware:\n\n1. **PROM (Programmable Read-Only Memory):** Fixed AND array (address decoder) followed by a programmable OR array. Highly inefficient for complex sequential logic.\n2. **PLA (Programmable Logic Array):** Both the AND plane and the OR plane are **programmable**. Can implement any sum-of-products Boolean expression, but suffering high propagation delay through large distributed capacitive planes.\n3. **PAL (Programmable Array Logic):** Programmable AND plane followed by a **fixed OR plane**. Faster and cheaper than PLAs; landmarked by Monolithic Memories 16R8/22V10.\n4. **CPLD (Complex Programmable Logic Device):** Aggregates multiple PAL-like macrocells connected via a central programmable switch matrix. Features predictable, non-volatile timing delays (EEPROM/Flash).\n5. **FPGA (Field-Programmable Gate Array - Xilinx 1985):** Replaced distributed AND-OR arrays with an **island-style matrix of Configurable Logic Blocks (CLBs)**, programmable interconnect segments, and I/O blocks (IOBs)."
      },
      {
        "id": "vlsi-5-2",
        "heading": "5.2 Architecture of Modern SRAM-Based FPGAs",
        "content": "A modern FPGA consists of four primary on-chip silicon subsystems:\n\n### 1. Configurable Logic Blocks (CLBs) & Slices:\nEach CLB contains multiple slices. A slice consists of:\n- **$k$-Input Look-Up Tables (LUTs):** Modern FPGAs (Xilinx 7-Series, UltraScale) use **6-input LUTs** (6-LUT). A 6-LUT consists of $2^6 = 64$ bits of static SRAM memory feeding a $64:1$ multiplexer. It can implement **any arbitrary 6-input Boolean function** in identical constant delay ($t_{LUT} \\approx 0.2\\text{ ns}$).\n- **Flip-Flops / Latches:** Configurable as edge-triggered D-FFs or level-sensitive latches with programmable set/reset and clock enable pins.\n- **Dedicated Carry Chains:** Ultra-fast dedicated hardware carry-lookahead lines (CARRY4 / CARRY8) bypassing the slow general routing fabric for ripple adders and counters.\n\n### 2. Dedicated Hardware Blocks (Hard IP):\n- **DSP48 Slices:** Dedicated hard-macro blocks performing $25 \\times 18$-bit signed multiplication, 48-bit accumulation, and pre-addition in a single clock cycle at speeds up to $750\\text{ MHz}$.\n- **Block RAM (BRAM):** Synchronous dual-port memory blocks ($36\\text{ Kbit}$ each) configurable as FIFO buffers, ROMs, or cache memories.\n- **Clock Management Tiles (CMT / PLL / MMCM):** Generating low-jitter clock frequencies, multiplying/dividing clocks, and eliminating phase delay."
      },
      {
        "id": "vlsi-5-3",
        "heading": "5.3 Programmable Interconnect & Switch Matrices",
        "content": "In modern FPGAs, more than **$70\\%$ of total silicon die area and signal delay** is consumed by the interconnect network rather than logic gates.\n\n### Island-Style Interconnect Architecture:\n- CLBs are situated like \"islands\" surrounded by a \"sea\" of horizontal and vertical routing channels.\n- **Connection Blocks (C-Blocks):** Connect the inputs and outputs of a CLB to the adjacent routing tracks.\n- **Switch Boxes / Switch Matrices (S-Blocks):** Occur at the intersection of horizontal and vertical channels. They use programmable pass-transistors or transmission gates to connect track segments (Wilton, Universal, or Disjoint switch patterns)."
      },
      {
        "id": "vlsi-5-4",
        "heading": "5.4 The Complete FPGA CAD Toolchain",
        "content": "The FPGA automated compilation pipeline maps high-level RTL code down to SRAM configuration bitstreams:\n\n```\n[VHDL / Verilog RTL] \n        │\n        ▼ Logic Synthesis (RTL → Generic Boolean logic optimization)\n[Generic Gate Netlist]\n        │\n        ▼ Technology Mapping (Partitioning gates into k-input LUTs and Flip-Flops)\n[LUT-Level Netlist]\n        │\n        ▼ Packing (Clustering related LUTs and FFs into physical CLB Slices)\n[Packed Slices]\n        │\n        ▼ Placement (Simulated Annealing: assigning slices to physical grid coordinates (X, Y))\n[Placed Floorplan]\n        │\n        ▼ Routing (PathFinder negotiated congestion routing: assigning wire segments)\n[Fully Routed Design]\n        │\n        ▼ Bitstream Generation (Translating all SRAM bits into a .bit / .bin binary file)\n[SRAM Bitstream Configuration]\n```"
      },
      {
        "id": "vlsi-5-5",
        "heading": "5.5 FPGA vs Standard-Cell ASIC Decision Matrix & Exit Exam Review",
        "content": "### Comprehensive Comparison:\n| Metric | Modern 16nm/7nm FPGA | Standard-Cell ASIC (TSMC 7nm) |\n|---|---|---|\n| **Development Cost** | $\\$10\\text{k} - \\$100\\text{k}$ (Board + Tools) | $\\$2\\text{M} - \\$20\\text{M}+$ (NRE Masks + Licenses) |\n| **Time-to-Market** | 1 to 4 Weeks | 9 to 18 Months |\n| **Reconfigurability** | $100\\%$ reprogrammable in field | Hardware is permanent once taped out |\n| **Max Clock Frequency** | $400 - 800\\text{ MHz}$ | $2.5 - 5.0\\text{ GHz}$ |\n| **Power Consumption** | High (static SRAM overhead) | Extremely Low (custom optimized) |\n| **Volume Cost Breakeven** | Economical for $< 10,000$ units | Economical for $> 100,000$ units |"
      }
    ]
  },
  "eceg5405-ch6": {
    "courseId": "eceg5405",
    "courseCode": "ECEg5405",
    "chapterNum": 6,
    "title": "Logic Synthesis, VHDL RTL Design & Static Timing Analysis",
    "readTime": "13 min read",
    "cloRef": "CLO6: Use VHDL to model hardware, synthesize logic, and analyze timing",
    "authoritativeSources": "Volnei A. Pedroni — Circuit Design and Simulation with VHDL; Neil Weste (Ch. 8, 10)",
    "sections": [
      {
        "id": "vlsi-6-1",
        "heading": "6.1 VHDL Architecture, Entity & Data Types",
        "content": "**VHDL (VHSIC Hardware Description Language)** is an IEEE-standard hardware modeling language (IEEE 1076) used to describe digital circuits concurrently.\n\n### Structural Components of a VHDL Design:\n1. **Library & Use Clauses:**\n   ```vhdl\n   library IEEE;\n   use IEEE.STD_LOGIC_1164.ALL;\n   use IEEE.NUMERIC_STD.ALL;\n   ```\n2. **Entity Declaration:** Specifies the external hardware interface (I/O pins):\n   ```vhdl\n   entity FullAdder is\n       Port ( A    : in  STD_LOGIC;\n              B    : in  STD_LOGIC;\n              Cin  : in  STD_LOGIC;\n              Sum  : out STD_LOGIC;\n              Cout : out STD_LOGIC );\n   end entity FullAdder;\n   ```\n3. **Architecture Body:** Specifies the internal behavior, dataflow, or structure:\n   ```vhdl\n   architecture Dataflow of FullAdder is\n   begin\n       Sum  <= A xor B xor Cin;\n       Cout <= (A and B) or (Cin and (A xor B));\n   end architecture Dataflow;\n   ```\n\n### Standard Logic 9-Value System (`IEEE 1164`):\nUnlike standard programming booleans (`true`/`false`), physical hardware wires require multi-valued logic:\n- `'U'`: Uninitialized\n- `'X'`: Forcing Unknown (e.g., contention where two gates drive line simultaneously)\n- `'0'`: Forcing 0 (driven by nMOS to $GND$)\n- `'1'`: Forcing 1 (driven by pMOS to $V_{DD}$)\n- `'Z'`: High Impedance (tri-state buffer disconnected)\n- `'W'`: Weak Unknown; `'L'`: Weak 0; `'H'`: Weak 1; `'-'`: Don't Care."
      },
      {
        "id": "vlsi-6-2",
        "heading": "6.2 Sequential Logic, Processes & The Unintentional Latch Trap",
        "content": "### Synchronous Register (D Flip-Flop with Asynchronous Reset):\n```vhdl\nprocess(clk, reset)\nbegin\n    if reset = '1' then\n        q <= '0';\n    elsif rising_edge(clk) then\n        q <= d;\n    end if;\nend process;\n```\n\n### ⚠️ The Dangerous Unintentional Latch Trap:\nIn synthesizable VHDL, if a `process` models combinational logic, every possible branch of execution must assign a value to every output signal!\nIf an `if` statement or `case` statement omits an `else` or `when others` branch:\n```vhdl\n-- BAD CODE: INFERS AN UNWANTED TRANSPARENT LATCH!\nprocess(sel, a)\nbegin\n    if sel = '1' then\n        y <= a;\n    end if; -- Missing else! Synthesis infers a latch to hold the previous value!\nend process;\n```\n> [!CAUTION]\n> **Why Unintentional Latches are Fatal in VLSI:**\n> Transparent latches are level-sensitive, highly sensitive to clock glitches, and cannot be easily tested by Static Timing Analysis (STA). Always provide complete `else` branches or specify default output assignments at the beginning of the combinational process."
      },
      {
        "id": "vlsi-6-3",
        "heading": "6.3 Synthesizable Finite State Machines (FSMs): Moore vs Mealy",
        "content": "### Structural Taxonomy of FSMs:\n1. **Moore Machine:** The outputs depend **only on the current state**:\n   $$\\text{Output}(t) = \\lambda(\\text{Current\\_State}(t))$$\n   - *Advantages:* Outputs are glitch-free and synchronized with clock edges.\n   - *Disadvantages:* Requires one additional cycle of latency to respond to input changes.\n2. **Mealy Machine:** The outputs depend on **both the current state AND the current inputs**:\n   $$\\text{Output}(t) = \\lambda(\\text{Current\\_State}(t), \\text{Inputs}(t))$$\n   - *Advantages:* Can respond immediately to input changes in the same clock cycle; often requires fewer states.\n   - *Disadvantages:* Combinational feedthrough from inputs to outputs can cause dangerous glitches and timing loop hazards across module boundaries.\n\n### The Standard Two-Process FSM Pattern:\n```vhdl\ntype state_type is (IDLE, READ_DATA, PROCESS_DATA, DONE);\nsignal current_state, next_state : state_type;\n\n-- Process 1: Synchronous State Register\nprocess(clk, rst)\nbegin\n    if rst = '1' then\n        current_state <= IDLE;\n    elsif rising_edge(clk) then\n        current_state <= next_state;\n    end if;\nend process;\n\n-- Process 2: Pure Combinational Next-State and Output Logic\nprocess(current_state, start_btn)\nbegin\n    next_state <= current_state; -- Default prevent latches\n    case current_state is\n        when IDLE =>\n            if start_btn = '1' then next_state <= READ_DATA; end if;\n        when READ_DATA =>\n            next_state <= PROCESS_DATA;\n        when PROCESS_DATA =>\n            next_state <= DONE;\n        when DONE =>\n            next_state <= IDLE;\n    end case;\nend process;\n```"
      },
      {
        "id": "vlsi-6-4",
        "heading": "6.4 Static Timing Analysis (STA): Setup Time, Hold Time & Max Frequency",
        "content": "In synchronous edge-triggered pipelines, timing constraints ensure reliable data capture without metastability.\n\n### 1. Setup Time ($t_{setup}$):\nThe minimum duration that the data input $D$ must be completely stable **BEFORE** the active clock edge arrives.\nViolation occurs if the combinational path is too slow:\n$$t_{clk} \\ge t_{cq} + t_{comb,max} + t_{setup} - t_{skew}$$\nWhere:\n- $t_{cq}$: Clock-to-Q propagation delay of the source flip-flop.\n- $t_{comb,max}$: Maximum propagation delay of combinational logic between flip-flops.\n- $t_{skew} = t_{clk,dest} - t_{clk,src}$: Clock skew between launch and capture flip-flops.\n\nThe **Maximum Clock Frequency ($f_{max}$)** is:\n$$f_{max} = \\frac{1}{T_{clk,min}} = \\frac{1}{t_{cq} + t_{comb,max} + t_{setup} - t_{skew}}$$\n\n### 2. Hold Time ($t_{hold}$):\nThe minimum duration that the data input $D$ must remain stable **AFTER** the active clock edge arrives.\nViolation occurs if the combinational path is too fast (fast race condition):\n$$t_{cq} + t_{comb,min} \\ge t_{hold} + t_{skew}$$\n> [!IMPORTANT]\n> **Critical Exam Rule on Hold Violations:**\n> **Hold time violations CANNOT be fixed by slowing down the clock!** Notice that clock period $T_{clk}$ does not appear anywhere in the hold equation. If a hold violation exists, the circuit will fail at any clock speed. The only remedy is inserting delay buffers into the fast combinational data path."
      },
      {
        "id": "vlsi-6-5",
        "heading": "6.5 Comprehensive Static Timing Worked Numerical Problem",
        "content": "### 🧮 Worked Numerical Example:\n**Problem:** A high-speed digital pipeline in an AASTU VLSI laboratory project has the following characterization parameters:\n- Flip-Flop Clock-to-Q delay: $t_{cq} = 1.2\\text{ ns}$\n- Flip-Flop Setup time: $t_{setup} = 0.8\\text{ ns}$\n- Flip-Flop Hold time: $t_{hold} = 0.5\\text{ ns}$\n- Combinational logic path delay: $t_{comb} \\in [1.0\\text{ ns}, 4.5\\text{ ns}]$\n- Clock skew tolerance: $t_{skew} = 0.3\\text{ ns}$\n\n**Calculate:**\n1. Check if a hold time violation exists. What is the hold slack?\n2. Calculate the minimum allowable clock period $T_{min}$ and the maximum operating frequency $f_{max}$.\n3. What is the setup slack if the circuit is clocked at $100\\text{ MHz}$ ($T_{clk} = 10\\text{ ns}$)?\n\n**Step-by-Step Solution:**\n1. **Hold Time Check:**\n   $$\\text{Arrival Time}_{hold} = t_{cq} + t_{comb,min} = 1.2\\text{ ns} + 1.0\\text{ ns} = 2.2\\text{ ns}$$\n   $$\\text{Required Time}_{hold} = t_{hold} + t_{skew} = 0.5\\text{ ns} + 0.3\\text{ ns} = 0.8\\text{ ns}$$\n   $$\\text{Hold Slack} = \\text{Arrival} - \\text{Required} = 2.2\\text{ ns} - 0.8\\text{ ns} = +1.4\\text{ ns}$$\n   Since Hold Slack is positive ($+1.4\\text{ ns} > 0$), there is **NO hold time violation**.\n\n2. **Minimum Clock Period and Maximum Frequency:**\n   $$T_{min} = t_{cq} + t_{comb,max} + t_{setup} - t_{skew}$$\n   $$T_{min} = 1.2\\text{ ns} + 4.5\\text{ ns} + 0.8\\text{ ns} - 0.3\\text{ ns} = 6.2\\text{ ns}$$\n   $$f_{max} = \\frac{1}{6.2 \\times 10^{-9}\\text{ s}} \\approx 161.29\\text{ MHz}$$\n\n3. **Setup Slack at $100\\text{ MHz}$ ($T_{clk} = 10\\text{ ns}$):**\n   $$\\text{Required Arrival Time} = T_{clk} - t_{setup} + t_{skew} = 10\\text{ ns} - 0.8\\text{ ns} + 0.3\\text{ ns} = 9.5\\text{ ns}$$\n   $$\\text{Actual Arrival Time} = t_{cq} + t_{comb,max} = 1.2\\text{ ns} + 4.5\\text{ ns} = 5.7\\text{ ns}$$\n   $$\\text{Setup Slack} = 9.5\\text{ ns} - 5.7\\text{ ns} = +3.8\\text{ ns}$$\n   The pipeline operates reliably with a comfortable timing safety margin of $3.8\\text{ ns}$."
      }
    ]
  },
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
        "content": "According to the International Organization for Standardization (**ISO 8373**), an **Industrial Robot** is an *actuated mechanism programmable in two or more axes with a degree of autonomy, moving within its environment, to perform intended tasks*.\n\n### Spatial Degrees of Freedom (6-DOF) Requirement:\nIn 3D Euclidean space, a rigid body has **6 Degrees of Freedom (DOF)**:\n1. **Positioning DOFs (3 Cartesian Translations):** Moving the wrist center to an arbitrary target coordinate $(X, Y, Z)$.\n2. **Orientation DOFs (3 Tool Rotations):** Orienting the end-effector or tool flange with arbitrary angles:\n   - **Roll ($\\psi$):** Rotation about the longitudinal tool approach axis ($Z$).\n   - **Pitch ($\\theta$):** Rotation up/down about the transverse axis ($Y$).\n   - **Yaw ($\\phi$):** Rotation left/right about the vertical axis ($X$).\n\n> [!NOTE]\n> A manipulator with fewer than 6-DOF is **under-actuated** and cannot achieve arbitrary orientation at every spatial coordinate (e.g., a 4-DOF SCARA robot can position in $(X,Y,Z)$ but only rotate about the vertical yaw axis). A manipulator with $> 6\\text{-DOF}$ is **kinematically redundant**, allowing it to avoid obstacles or singularities while maintaining a fixed tool pose."
      },
      {
        "id": "rob-1-2",
        "heading": "1.2 Biomechanical Comparison: Human Anatomy vs Robotic Systems",
        "content": "To design anthropomorphic and bio-inspired robots, engineers map human musculoskeletal and sensory systems into electro-mechanical equivalents:\n\n| Biological Human Anatomy | Robotic Engineering Equivalent | Primary Engineering Function | Physical Constraints & Tradeoffs |\n|---|---|---|---|\n| **Skeletal Bones** | Rigid Structural Links (Aluminum, Carbon-fiber) | Provides rigid structural mechanical support and defines kinematics | High stiffness vs low mass (inertia minimization) |\n| **Synovial Joints (Hinge, Ball)** | Kinematic Joints (Revolute $R$, Prismatic $P$) | Constrains relative motion between adjacent links | Friction, backlash, bearing wear, mechanical travel limits |\n| **Skeletal Muscles (Agonist/Antagonist)** | Actuators (Brushless DC Motors, Hydraulics, Pneumatics) | Generates driving mechanical force or torque | Torque density, power-to-weight ratio, cooling |\n| **Tendons & Ligaments** | Harmonic Drives, Timing Belts, Lead Screws | Transmits mechanical power from actuator to joint | Torsional compliance, backlash, belt stretch |\n| **Afferent Nerves & Proprioceptors** | Internal Feedback Sensors (Optical Encoders, Resolvers) | Measures real-time joint angles ($\\theta$) and angular speeds ($\\dot{\\theta}$) | Quantization noise, resolution, thermal drift |\n| **Eyes (Retina & Fovea)** | Machine Vision Sensors (Stereo CMOS cameras, LiDAR) | Captures 2D and 3D external spatial context | Frame rate, rolling shutter distortion, lighting sensitivity |\n| **Skin (Mechanoreceptors)** | Tactile & Force/Torque Sensors (Piezoelectric, Strain gauges) | Measures contact force ($F_x, F_y, F_z$) and slippage | Dynamic range, sensor hysteresis, packaging fragility |\n| **Central Nervous System (Brain)** | Embedded Real-Time Controller (ARM Cortex / DSP / FPGA) | Executes kinematics, trajectory interpolation, and PID control loops | Real-time determinism, compute latency, bus bandwidth |"
      },
      {
        "id": "rob-1-3",
        "heading": "1.3 Joint Classifications & Manipulator Topologies",
        "content": "### Basic Kinematic Joint Types:\n1. **Revolute Joint ($R$):** Allows 1 rotational DOF between links about a single axis (Joint variable = angle $\\theta_i$).\n2. **Prismatic Joint ($P$):** Allows 1 translational (sliding) DOF along a linear vector (Joint variable = extension distance $d_i$).\n3. **Cylindrical ($C$ - 2 DOF), Spherical ($S$ - 3 DOF):** Usually decomposed into orthogonal $R$ and $P$ joints in industrial robotics.\n\n---\n\n### Five Major Industrial Robot Topologies:\n- **1. Cartesian / Gantry ($PPP$):** Three linear axes. Workspace is a rectangular box. Extremely high payload and linear precision; large physical footprint.\n- **2. Cylindrical ($RPP$):** One revolute base joint and two prismatic extension axes. Workspace is a cylindrical envelope.\n- **3. Spherical / Polar ($RRP$):** Two rotary joints and one telescoping arm. Workspace is a spherical shell.\n- **4. SCARA ($RRP$ - Selective Compliance Assembly Robot Arm):** Two parallel revolute joints in the horizontal plane and one vertical prismatic joint. Extremely stiff vertically (for inserting electronic components) but compliant laterally in the horizontal plane.\n- **5. Articulated / Anthropomorphic ($RRR$):** Three revolute joints mimicking the human waist, shoulder, and elbow. Maximum dextrous mobility in a compact footprint; non-linear kinematics."
      },
      {
        "id": "rob-1-4",
        "heading": "1.4 Workspace Geometry, Repeatability vs Accuracy ($ISO\\ 9283$)",
        "content": "### Reachable vs Dextrous Workspace:\n- **Reachable Workspace ($W_R$):** The total volume of 3D space that the end-effector tip can physically reach in at least one orientation.\n- **Dextrous Workspace ($W_D$):** The subset volume within the reachable workspace where the end-effector can reach every point in **all possible arbitrary orientations**.\n$$W_D \\subseteq W_R$$\n\n### Accuracy vs Repeatability (ISO 9283 Definitions):\n- **Accuracy:** The deviation between a commanded target coordinate in Cartesian space and the mean physical coordinate achieved by the robot:\n  $$\\text{Accuracy} = \\| P_{commanded} - \\bar{P}_{actual} \\|$$\n  Accuracy depends on kinematic manufacturing tolerances, link deflection, and thermal expansion.\n- **Repeatability:** The measure of how closely the robot returns to the exact same physical position when executing identical commanded joint positions repeatedly:\n  $$\\text{Repeatability} = 3\\sigma \\quad (\\text{spread of points around } \\bar{P})$$\n> [!IMPORTANT]\n> **Industrial Reality:** Commercial industrial robots are **far more repeatable than they are accurate**! An industrial robot may have an accuracy of $\\pm 1.5\\text{ mm}$, but an outstanding repeatability of $\\pm 0.02\\text{ mm}$."
      },
      {
        "id": "rob-1-5",
        "heading": "1.5 End-Effectors & National Exit Exam Benchmarks",
        "content": "### Industrial End-Effector Types:\n1. **Mechanical Grippers:** Two-finger parallel jaw or three-finger angular grippers driven by pneumatic pistons or electric stepper motors.\n2. **Vacuum / Suction Cups:** Uses Venturi effect vacuum ejectors to lift smooth, non-porous flat objects (glass sheets, metal panels).\n3. **Magnetic Grippers:** Permanent magnets with mechanical release or electromagnets for handling ferromagnetic steel workpieces.\n4. **Tool Flanges:** Spot-welding guns, arc-welding torches, paint-spraying nozzles, high-speed routing spindles."
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
        "content": "Internal sensors measure the state of the robot itself (joint angle, velocity, motor current).\n\n### 1. Incremental Optical Encoders:\nConsists of a transparent glass disk patterned with radial opaque chrome lines, rotating between an LED light source and a photodiode detector.\n- **Quadrature Tracks ($A$ and $B$):** Track $A$ and Track $B$ are physically shifted in phase by $90^\\circ$ electrical degrees.\n  - Direction Detection: If $A$ leads $B$, the shaft rotates clockwise ($CW$). If $B$ leads $A$, the shaft rotates counter-clockwise ($CCW$).\n  - **$4\\times$ Quadrature Decoding:** By counting both the rising and falling edges of both channels $A$ and $B$, the angular resolution is quadrupled:\n    $$\\Delta \\theta = \\frac{360^\\circ}{4 \\times N_{lines}}$$\n- **Index Pulse ($Z$ / Marker):** Fires exactly once per revolution to establish an absolute zero reference after homing.\n- *Limitation:* Losing electrical power loses position; requires a homing cycle upon startup.\n\n### 2. Absolute Optical Encoders:\nFeatures concentric tracks encoded with **Gray Code** rather than standard binary.\n> [!NOTE]\n> **Why Gray Code is Mandatory:** In binary code, transitioning from $0111_2$ (7) to $1000_2$ (8) requires all 4 bits to switch simultaneously. If one photodetector switches slightly faster due to mechanical misalignment, transient intermediate erroneous states occur (e.g., $1111_2 = 15$). In **Gray Code**, exactly **one bit changes state** between any two consecutive values, eliminating bit transition glitches entirely."
      },
      {
        "id": "rob-2-2",
        "heading": "2.2 External Tactile, Proximity & Force/Torque Wrist Transducers",
        "content": "### Multi-Axis Wrist Force/Torque ($F/T$) Sensors:\nMounted between the robot's mounting flange and the end-effector tool.\n- Consists of a monolithic metal flexure (Maltese cross structure) instrumented with semiconductor or metal foil **strain gauges** arranged in Wheatstone bridges.\n- Resolves all 6 spatial components simultaneously:\n  $$\\mathbf{F} = [F_x, F_y, F_z, M_x, M_y, M_z]^T$$\n- Essential for compliant assembly tasks (inserting a peg into a hole without jamming) and force-controlled deburring or polishing.\n\n### Proximity & Ranging Sensors:\n- **Ultrasonic Sensors (Sonar):** Emits $40\\text{ kHz}$ acoustic pulses; measures Time-of-Flight (ToF):\n  $$d = \\frac{v_{sound} \\cdot \\Delta t}{2} \\quad (v_{sound} \\approx 343\\text{ m/s})$$\n  Susceptible to specular reflections and beam spread cone ($> 15^\\circ$).\n- **Optical Infrared (IR) Time-of-Flight (ToF):** Measures the round-trip phase shift of amplitude-modulated NIR laser light ($c = 3 \\times 10^8\\text{ m/s}$). Provides millimeter precision at high sampling rates ($> 100\\text{ Hz}$)."
      },
      {
        "id": "rob-2-3",
        "heading": "2.3 Machine Vision Sensors: CCD vs CMOS & Shutter Types",
        "content": "| Sensor Feature | CCD (Charge-Coupled Device) | CMOS Active Pixel Sensor (APS) |\n|---|---|---|\n| **Architecture** | Charges shifted serially bucket-brigade style to a single output amplifier | Each pixel contains its own photodiode and readout transistors (3T / 4T) |\n| **Noise & Dynamic Range** | Historically lower noise; higher dynamic range | Modern back-illuminated (BSI) CMOS rivals or exceeds CCD |\n| **Power Consumption** | High ($> 2 - 5\\text{ W}$, requires multiple clock supply rails) | Very low ($< 200\\text{ mW}$, single supply) |\n| **Readout Speed** | Limited by serial output amplifier bandwidth | Massive parallelism; high frame rates ($1000+\\text{ fps}$) |\n| **Blooming & Smearing** | Over-saturated pixels bleed charge into entire columns | Blooming is confined strictly to the saturated pixel |\n\n### Global Shutter vs Rolling Shutter:\n- **Global Shutter:** All pixels in the entire array expose and capture light simultaneously. Essential for robotics and conveyor tracking to prevent motion blur and warping.\n- **Rolling Shutter:** Exposes pixels row-by-row sequentially. Rapidly moving robot arms or rotating fan blades appear warped or distorted (the \"jello effect\")."
      },
      {
        "id": "rob-2-4",
        "heading": "2.4 3D Depth Sensing Technologies & Stereo Triangulation",
        "content": "### Stereo Vision Disparity Triangulation:\nStereo vision uses two calibrated cameras separated by baseline distance $B$ with parallel optical axes and identical focal length $f$:\n$$\\text{Disparity } d = x_L - x_R$$\nFrom similar triangles, depth $Z$ is inversely proportional to disparity:\n$$Z = \\frac{f \\cdot B}{d}$$\n$$\\Delta Z = -\\frac{Z^2}{f \\cdot B} \\cdot \\Delta d$$\n> [!WARNING]\n> Depth error $\\Delta Z$ increases quadratically with distance $Z^2$! Stereo vision is highly accurate at short ranges, but accuracy degrades significantly at large distances.\n\n---\n\n### 🧮 Worked Numerical Example:\n**Problem:** A mobile robot navigating an AASTU campus hallway uses a stereo vision rig:\n- Baseline distance between camera optical centers $B = 12\\text{ cm} = 0.12\\text{ m}$.\n- Lens focal length $f = 6\\text{ mm} = 0.006\\text{ m}$.\n- Sensor pixel pitch (width of 1 pixel) $p = 4.0\\ \\mu\\text{m} = 4.0 \\times 10^{-6}\\text{ m}$.\n- An obstacle feature is detected at left pixel $x_L = 420\\text{ px}$ and right pixel $x_R = 360\\text{ px}$.\n1. Calculate the disparity in pixels and in physical meters.\n2. Determine the physical distance $Z$ to the obstacle in meters.\n3. If subpixel matching has an error of $\\Delta d = 0.5\\text{ pixels}$, what is the depth measurement uncertainty $\\Delta Z$?\n\n**Step-by-Step Solution:**\n1. **Disparity:**\n   $$d_{px} = 420 - 360 = 60\\text{ pixels}$$\n   $$d = 60 \\times (4.0 \\times 10^{-6}\\text{ m}) = 2.4 \\times 10^{-4}\\text{ m} = 0.24\\text{ mm}$$\n\n2. **Depth Distance $Z$:**\n   $$Z = \\frac{f \\cdot B}{d} = \\frac{0.006 \\times 0.12}{2.4 \\times 10^{-4}} = \\frac{7.2 \\times 10^{-4}}{2.4 \\times 10^{-4}} = 3.00\\text{ meters}$$\n\n3. **Depth Uncertainty $\\Delta Z$:**\n   $$\\Delta d = 0.5 \\times 4.0 \\times 10^{-6}\\text{ m} = 2.0 \\times 10^{-6}\\text{ m}$$\n   $$\\Delta Z = \\frac{Z^2}{f \\cdot B} \\cdot \\Delta d = \\frac{(3.0)^2}{0.006 \\times 0.12} \\times (2.0 \\times 10^{-6}) = \\frac{9.0}{7.2 \\times 10^{-4}} \\times 2.0 \\times 10^{-6} = 12,500 \\times 2.0 \\times 10^{-6} = 0.025\\text{ m} = 2.5\\text{ cm}$$"
      },
      {
        "id": "rob-2-5",
        "heading": "2.5 Sensor Fusion & Extended Kalman Filter (EKF) Principles",
        "content": "No single sensor is sufficient for autonomous robotic navigation. Optical encoders suffer from wheel slip; IMUs suffer from gyro bias integration drift; GPS is unavailable indoors; machine vision drops frames during illumination changes.\n\n### Sensor Fusion via the Kalman Filter:\nThe **Kalman Filter (KF / EKF)** combines noisy measurements from multiple sensors into an optimal state estimate in two recursive phases:\n1. **Prediction Step (Propagating state using odometry / kinematics):**\n   $$\\hat{x}_k^- = f(\\hat{x}_{k-1}, u_{k-1})$$\n   $$P_k^- = F P_{k-1} F^T + Q$$\n2. **Correction / Update Step (Fusing observation from vision/LiDAR):**\n   $$K_k = P_k^- H^T (H P_k^- H^T + R)^{-1}$$\n   $$\\hat{x}_k = \\hat{x}_k^- + K_k (z_k - h(\\hat{x}_k^-))$$\n   $$P_k = (I - K_k H) P_k^-$$\nWhere $K_k$ is the **Kalman Gain**. When measurement noise $R$ is small, $K_k \\to 1$ (the filter trusts the sensor); when process uncertainty $P_k^-$ is small, $K_k \\to 0$ (the filter trusts the kinematic model)."
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
        "content": "In 3D kinematics, a coordinate frame attached to a rigid body is represented relative to a reference frame by a **$4 \\times 4$ Homogeneous Transformation Matrix ($T$)**:\n\n$$T = \\begin{bmatrix} R_{3 \\times 3} & P_{3 \\times 1} \\\\ 0_{1 \\times 3} & 1 \\end{bmatrix} = \\begin{bmatrix} r_{11} & r_{12} & r_{13} & p_x \\\\ r_{21} & r_{22} & r_{23} & p_y \\\\ r_{31} & r_{32} & r_{33} & p_z \\\\ 0 & 0 & 0 & 1 \\end{bmatrix}$$\n\n- $R_{3 \\times 3}$ is the orthogonal rotation matrix ($R^T = R^{-1}$, $\\det(R) = +1$).\n- $P_{3 \\times 1} = [p_x, p_y, p_z]^T$ is the translation position vector.\n\n### Elementary Rotation Matrices:\n$$\\text{Rot}(z, \\theta) = \\begin{bmatrix} \\cos\\theta & -\\sin\\theta & 0 & 0 \\\\ \\sin\\theta & \\cos\\theta & 0 & 0 \\\\ 0 & 0 & 1 & 0 \\\\ 0 & 0 & 0 & 1 \\end{bmatrix}, \\quad \\text{Rot}(x, \\alpha) = \\begin{bmatrix} 1 & 0 & 0 & 0 \\\\ 0 & \\cos\\alpha & -\\sin\\alpha & 0 \\\\ 0 & \\sin\\alpha & \\cos\\alpha & 0 \\\\ 0 & 0 & 0 & 1 \\end{bmatrix}$$"
      },
      {
        "id": "rob-3-2",
        "heading": "3.2 The Denavit-Hartenberg (DH) 4-Parameter Convention",
        "content": "Jacques Denavit and Richard Hartenberg (1955) proved that the relative spatial transformation between any two consecutive links $i-1$ and $i$ can be completely described by **only 4 kinematic parameters** instead of 6:\n\n1. **Link Length ($a_i$):** Distance from $\\hat{Z}_{i-1}$ to $\\hat{Z}_i$ measured along the common normal $\\hat{X}_i$.\n2. **Link Twist ($\\alpha_i$):** Angle from $\\hat{Z}_{i-1}$ to $\\hat{Z}_i$ measured about the axis $\\hat{X}_i$ (using right-hand rule).\n3. **Link Offset ($d_i$):** Distance from $\\hat{X}_{i-1}$ to $\\hat{X}_i$ measured along $\\hat{Z}_{i-1}$ (Variable for prismatic joint).\n4. **Joint Angle ($\\theta_i$):** Angle from $\\hat{X}_{i-1}$ to $\\hat{X}_i$ measured about $\\hat{Z}_{i-1}$ (Variable for revolute joint).\n\n---\n\n### Rigorous DH Frame Assignment Rules (Step-by-Step):\n1. **Assign Axis $\\hat{Z}_i$:** Align axis $\\hat{Z}_i$ along the motion axis of joint $i+1$ (axis of rotation for revolute, axis of translation for prismatic).\n2. **Establish the Base Frame $\\{0\\}$:** Choose $\\hat{Z}_0$ along joint 1 axis. Origin $O_0$ and $\\hat{X}_0$ can be assigned arbitrarily.\n3. **Assign Axis $\\hat{X}_i$:**\n   - If $\\hat{Z}_{i-1}$ and $\\hat{Z}_i$ are **not coplanar (skew)**: Set $\\hat{X}_i$ along their unique common normal vector: $\\hat{X}_i = \\pm (\\hat{Z}_{i-1} \\times \\hat{Z}_i)$.\n   - If $\\hat{Z}_{i-1}$ and $\\hat{Z}_i$ **intersect**: Set $\\hat{X}_i$ perpendicular to the plane formed by $\\hat{Z}_{i-1}$ and $\\hat{Z}_i$.\n   - If $\\hat{Z}_{i-1}$ and $\\hat{Z}_i$ are **parallel**: Set $\\hat{X}_i$ along the common normal pointing from $\\hat{Z}_{i-1}$ to $\\hat{Z}_i$.\n4. **Assign Axis $\\hat{Y}_i$:** Complete the right-handed Cartesian coordinate system: $\\hat{Y}_i = \\hat{Z}_i \\times \\hat{X}_i$."
      },
      {
        "id": "rob-3-3",
        "heading": "3.3 The General DH Link Transformation Matrix",
        "content": "The transformation from frame $\\{i-1\\}$ to frame $\\{i\\}$ is the product of four elementary screw transformations:\n\n$$T_i^{i-1} = \\text{Rot}(z, \\theta_i) \\cdot \\text{Trans}(z, d_i) \\cdot \\text{Trans}(x, a_i) \\cdot \\text{Rot}(x, \\alpha_i)$$\n\nMultiplying these matrices yields the standard **DH Link Transformation Matrix ($A_i$)**:\n\n$$T_i^{i-1} = \\begin{bmatrix} \\cos\\theta_i & -\\sin\\theta_i\\cos\\alpha_i & \\sin\\theta_i\\sin\\alpha_i & a_i\\cos\\theta_i \\\\ \\sin\\theta_i & \\cos\\theta_i\\cos\\alpha_i & -\\cos\\theta_i\\sin\\alpha_i & a_i\\sin\\theta_i \\\\ 0 & \\sin\\alpha_i & \\cos\\alpha_i & d_i \\\\ 0 & 0 & 0 & 1 \\end{bmatrix}$$\n\nFor an $N$-DOF manipulator, the overall **Forward Kinematic Transformation** from base frame $\\{0\\}$ to end-effector tool frame $\\{N\\}$ is:\n$$T_N^0 = T_1^0 \\cdot T_2^1 \\cdot T_3^2 \\dots T_N^{N-1}$$"
      },
      {
        "id": "rob-3-4",
        "heading": "3.4 Step-by-Step Forward Kinematics Numerical Derivation (Planar 2-DOF RR Arm)",
        "content": "### Kinematic Parameter Table for Planar 2-DOF Robot:\n- Link 1 length: $a_1$, joint angle: $\\theta_1$\n- Link 2 length: $a_2$, joint angle: $\\theta_2$\n\n| Link $i$ | $a_i$ | $\\alpha_i$ | $d_i$ | $\\theta_i$ |\n|---|---|---|---|---|\n| **1** | $a_1$ | $0$ | $0$ | $\\theta_1^*$ |\n| **2** | $a_2$ | $0$ | $0$ | $\\theta_2^*$ |\n\n### Transformation Matrices:\n$$T_1^0 = \\begin{bmatrix} c_1 & -s_1 & 0 & a_1 c_1 \\\\ s_1 & c_1 & 0 & a_1 s_1 \\\\ 0 & 0 & 1 & 0 \\\\ 0 & 0 & 0 & 1 \\end{bmatrix}, \\quad T_2^1 = \\begin{bmatrix} c_2 & -s_2 & 0 & a_2 c_2 \\\\ s_2 & c_2 & 0 & a_2 s_2 \\\\ 0 & 0 & 1 & 0 \\\\ 0 & 0 & 0 & 1 \\end{bmatrix}$$\n(Where $c_1 = \\cos\\theta_1, s_1 = \\sin\\theta_1, c_{12} = \\cos(\\theta_1 + \\theta_2), s_{12} = \\sin(\\theta_1 + \\theta_2)$).\n\nMultiplying $T_2^0 = T_1^0 \\cdot T_2^1$:\n$$T_2^0 = \\begin{bmatrix} c_{12} & -s_{12} & 0 & a_1 c_1 + a_2 c_{12} \\\\ s_{12} & c_{12} & 0 & a_1 s_1 + a_2 s_{12} \\\\ 0 & 0 & 1 & 0 \\\\ 0 & 0 & 0 & 1 \\end{bmatrix}$$\n\nThus, the end-effector tip coordinates are:\n$$x = a_1 \\cos\\theta_1 + a_2 \\cos(\\theta_1 + \\theta_2)$$\n$$y = a_1 \\sin\\theta_1 + a_2 \\sin(\\theta_1 + \\theta_2)$$\n$$z = 0, \\quad \\phi = \\theta_1 + \\theta_2$$"
      },
      {
        "id": "rob-3-5",
        "heading": "3.5 Inverse Kinematics (IK): Geometric Method & Multiple Solutions",
        "content": "**Inverse Kinematics (IK)** computes the joint variables $(\\theta_1, \\theta_2, \\dots)$ required to place the end-effector at a desired Cartesian pose $(x, y, z)$.\nUnlike Forward Kinematics (which always has a unique solution), Inverse Kinematics is **non-linear, trigonometric, and has multiple solutions or no solution at all (if outside the workspace)**.\n\n---\n\n### Analytical Derivation for Planar 2-Link Arm:\nGiven target $(x, y)$:\n$$x^2 + y^2 = (a_1 c_1 + a_2 c_{12})^2 + (a_1 s_1 + a_2 s_{12})^2 = a_1^2 + a_2^2 + 2 a_1 a_2 \\cos\\theta_2$$\n\nApplying the **Law of Cosines**:\n$$\\cos\\theta_2 = \\frac{x^2 + y^2 - a_1^2 - a_2^2}{2 a_1 a_2}$$\n\nUsing the numerically stable four-quadrant arctangent function `atan2`:\n$$\\sin\\theta_2 = \\pm \\sqrt{1 - \\cos^2\\theta_2}$$\n$$\\theta_2 = \\text{atan2}(\\sin\\theta_2, \\cos\\theta_2)$$\n- The **$+$ sign** corresponds to the **Elbow-Down** configuration.\n- The **$-$ sign** corresponds to the **Elbow-Up** configuration.\n\nOnce $\\theta_2$ is determined, $\\theta_1$ is calculated via:\n$$\\theta_1 = \\text{atan2}(y, x) - \\text{atan2}(a_2 \\sin\\theta_2, a_1 + a_2 \\cos\\theta_2)$$\n\n> [!IMPORTANT]\n> **Pieper's Criterion for 6-DOF Manipulator Solvability:**\n> Donald Pieper (1968) proved that a 6-DOF serial manipulator possesses a closed-form analytical inverse kinematic solution if and only if **three consecutive joint axes intersect at a single common point (such as a spherical wrist)** or **three consecutive axes are parallel**."
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
        "content": "The **Jacobian Matrix $J(\\theta)$** maps joint velocities $\\dot{\\theta}$ in joint space to the end-effector linear and angular velocities in Cartesian space:\n\n$$\\mathbf{v} = \\begin{bmatrix} v \\\\ \\omega \\end{bmatrix} = J(\\theta) \\cdot \\dot{\\theta}$$\n\nWhere $\\mathbf{v} = [\\dot{x}, \\dot{y}, \\dot{z}, \\omega_x, \\omega_y, \\omega_z]^T$ is the $6 \\times 1$ Cartesian velocity vector.\n\nFor an $N$-joint manipulator, the Jacobian is a $6 \\times N$ matrix composed of columns $J_i = [J_{v,i}^T, J_{\\omega,i}^T]^T$:\n- **For a Revolute Joint ($i$):**\n  $$J_{v,i} = Z_{i-1} \\times (P_N - P_{i-1}), \\quad J_{\\omega,i} = Z_{i-1}$$\n- **For a Prismatic Joint ($i$):**\n  $$J_{v,i} = Z_{i-1}, \\quad J_{\\omega,i} = \\mathbf{0}$$"
      },
      {
        "id": "rob-4-2",
        "heading": "4.2 Kinematic Singularities: Detection & Physical Consequences",
        "content": "### Mathematical Definition:\nA manipulator is in a **Kinematic Singularity** at joint configuration $\\theta$ if the Jacobian matrix loses rank:\n$$\\det(J(\\theta)) = 0 \\quad (\\text{for a square } 6 \\times 6 \\text{ Jacobian})$$\n\n### Physical Consequences of Singularities:\n1. **Loss of Mobility:** The robot completely loses the ability to move in one or more Cartesian directions, regardless of joint speeds.\n2. **Infinite Joint Velocities:** Inverting the velocity relationship $\\dot{\\theta} = J^{-1}(\\theta) \\mathbf{v}$ near a singularity causes commanded joint velocities $\\dot{\\theta} \\to \\infty$, tripping servo motor over-current protection.\n3. **Unbounded Forces:** High Cartesian forces can be exerted on the mechanism with negligible motor torques.\n\n### Singularity Types:\n- **Boundary Singularities:** Occur when the arm is fully extended or folded back on itself at the outer limit of its workspace envelope.\n- **Wrist Singularities:** Occur in spherical wrists when joint 4 and joint 6 axes become collinear ($\\theta_5 = 0$), causing infinite spinning commands."
      },
      {
        "id": "rob-4-3",
        "heading": "4.3 Statics & Virtual Work Principle: Force-Torque Duality",
        "content": "Using the **Principle of Virtual Work**, virtual work performed in Cartesian space must equal virtual work performed in joint space:\n$$\\delta W = F^T \\delta x = \\tau^T \\delta \\theta$$\nSince $\\delta x = J(\\theta) \\delta \\theta$:\n$$F^T J(\\theta) \\delta \\theta = \\tau^T \\delta \\theta \\implies \\tau = J^T(\\theta) \\cdot F$$\n\nWhere:\n- $F = [f_x, f_y, f_z, m_x, m_y, m_z]^T$ is the external force/moment exerted by the end-effector.\n- $\\tau = [\\tau_1, \\tau_2, \\dots, \\tau_N]^T$ is the resulting static joint torques.\n> [!NOTE]\n> This elegant duality proves that the **Transpose of the Jacobian ($J^T$)** transforms Cartesian endpoint forces into joint actuator torques!"
      },
      {
        "id": "rob-4-4",
        "heading": "4.4 Equations of Motion: Euler-Lagrange Dynamic Formulation",
        "content": "To design high-speed trajectory controllers, we must account for mass, inertia, centrifugal forces, and gravity.\n\n### The Lagrangian Function:\n$$L(\\theta, \\dot{\\theta}) = K(\\theta, \\dot{\\theta}) - P(\\theta)$$\nWhere $K$ is total system kinetic energy and $P$ is total potential energy.\n\nThe **Euler-Lagrange Equation**:\n$$\\frac{d}{dt} \\left( \\frac{\\partial L}{\\partial \\dot{\\theta}_i} \\right) - \\frac{\\partial L}{\\partial \\theta_i} = \\tau_i$$\n\n### Standard Matrix Form of Manipulator Dynamics:\n$$M(\\theta) \\ddot{\\theta} + C(\\theta, \\dot{\\theta}) \\dot{\\theta} + G(\\theta) = \\tau$$\n\nWhere:\n- $M(\\theta)$ is the symmetric, positive-definite **Inertia Matrix** ($N \\times N$).\n- $C(\\theta, \\dot{\\theta})\\dot{\\theta}$ is the $N \\times 1$ vector of **Coriolis and Centrifugal torques**.\n- $G(\\theta)$ is the $N \\times 1$ vector of **Gravitational torques**.\n- $\\tau$ is the actuator torque vector."
      },
      {
        "id": "rob-4-5",
        "heading": "4.5 Robot Motion Control: Independent Joint PID vs Computed Torque Control",
        "content": "### 1. Independent Joint PID Control:\nTreats each joint as an independent SISO (Single-Input Single-Output) linear system, treating multi-body coupling as an unmodeled disturbance:\n$$\\tau_i(t) = K_p e_i(t) + K_i \\int e_i(t) dt + K_d \\dot{e}_i(t)$$\nWorks adequately for slow industrial motions where gearbox gear ratios ($N > 100$) attenuate dynamic coupling by $1/N^2$.\n\n### 2. Computed Torque Control (Feedback Linearization):\nAt high operational speeds, dynamic coupling cannot be ignored. Computed torque control cancels non-linear dynamics explicitly:\n$$\\tau = M(\\theta) \\left( \\ddot{\\theta}_d + K_v (\\dot{\\theta}_d - \\dot{\\theta}) + K_p (\\theta_d - \\theta) \\right) + C(\\theta, \\dot{\\theta})\\dot{\\theta} + G(\\theta)$$\nSubstituting into the dynamic model yields a decoupled, linear error system:\n$$\\ddot{e} + K_v \\dot{e} + K_p e = 0$$\nAllowing critical damping ($\\zeta = 1$) across the entire workspace."
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
        "content": "A continuous physical optical scene $f(x, y)$ is converted into a discrete digital image matrix $I[r, c]$ through spatial sampling and radiometric quantization:\n\n$$I = \\begin{bmatrix} I[0,0] & I[0,1] & \\dots & I[0, W-1] \\\\ I[1,0] & I[1,1] & \\dots & I[1, W-1] \\\\ \\vdots & \\vdots & \\ddots & \\vdots \\\\ I[H-1,0] & I[H-1,1] & \\dots & I[H-1, W-1] \\end{bmatrix}$$\n\n- **Sampling:** Discretizing continuous spatial coordinates into an array of $H \\times W$ pixels. According to the **Nyquist-Shannon Sampling Theorem**, the spatial sampling frequency must exceed twice the highest spatial frequency in the optical image ($f_s > 2 f_{max}$) to avoid spatial aliasing.\n- **Quantization:** Discretizing continuous luminance amplitude into $L = 2^b$ integer levels. For standard 8-bit images ($b=8$), intensity ranges from $0$ (pure black) to $255$ (pure white).\n- **RGB Color Space:** Formed by three stacked 2D arrays: $I \\in \\mathbb{R}^{H \\times W \\times 3}$ corresponding to Red, Green, and Blue channels.\n- **Grayscale Conversion (ITU-R BT.601 standard):**\n  $$Y = 0.299 R + 0.587 G + 0.114 B$$"
      },
      {
        "id": "rob-5-2",
        "heading": "5.2 Pinhole Camera Model & Perspective Projection Geometry",
        "content": "The **Pinhole Camera Model** models perspective projection from a 3D world coordinate $P_w = [X_w, Y_w, Z_w]^T$ onto a 2D image sensor plane $[u, v]^T$:\n\n$$\\tilde{m} = \\begin{bmatrix} u \\\\ v \\\\ 1 \\end{bmatrix} = \\frac{1}{Z_c} K \\cdot [R \\mid t] \\cdot \\begin{bmatrix} X_w \\\\ Y_w \\\\ Z_w \\\\ 1 \\end{bmatrix}$$\n\n### Camera Parameter Matrices:\n1. **Intrinsic Parameter Matrix ($K$ - $3 \\times 3$):** Represents internal optical geometry:\n   $$K = \\begin{bmatrix} f_x & s & c_x \\\\ 0 & f_y & c_y \\\\ 0 & 0 & 1 \\end{bmatrix}$$\n   Where:\n   - $f_x = f / p_x$, $f_y = f / p_y$: Focal length expressed in horizontal and vertical pixel units.\n   - $(c_x, c_y)$: Principal point (intersection of the optical axis with the sensor plane).\n   - $s$: Skew coefficient (typically $0$ for rectangular sensor grids).\n2. **Extrinsic Parameter Matrix ($[R \\mid t]$ - $3 \\times 4$):** Represents the camera's physical 3D pose in the world coordinate frame (Rotation $R_{3 \\times 3}$ and Translation $t_{3 \\times 1}$)."
      },
      {
        "id": "rob-5-3",
        "heading": "5.3 Point Operations & Histogram Equalization Derivation",
        "content": "Point operations map an input intensity $r$ to an output intensity $s = T(r)$ independently for every pixel.\n\n### Histogram Equalization:\nHistogram equalization stretches the contrast of an image by transforming the intensity distribution so that the output image possesses a **uniform probability density function (PDF)**.\n\nGiven an image with $N$ pixels and discrete gray levels $r_k \\in [0, L-1]$:\n1. Compute the probability of occurrence of intensity level $r_k$:\n   $$p_r(r_k) = \\frac{n_k}{N}, \\quad k = 0, 1, \\dots, L-1$$\n2. Compute the **Cumulative Distribution Function (CDF)**:\n   $$s_k = T(r_k) = (L - 1) \\sum_{j=0}^k p_r(r_j) = \\frac{L-1}{N} \\sum_{j=0}^k n_j$$\n3. Round $s_k$ to the nearest integer.\nThe resulting transformed image fully utilizes the dynamic range from $0$ to $255$ with maximized entropy."
      },
      {
        "id": "rob-5-4",
        "heading": "5.4 Spatial Linear Filtering & 2D Convolution",
        "content": "Spatial filtering processes an image by convolving it with an $m \\times n$ kernel (mask) $h$:\n\n$$g(x, y) = I(x, y) * h(x, y) = \\sum_{s=-a}^a \\sum_{t=-b}^b h(s, t) \\cdot I(x - s, y - t)$$\n\n### 1. Box / Mean Filter (Low-Pass Smoothing):\n$$h_{box} = \\frac{1}{9} \\begin{bmatrix} 1 & 1 & 1 \\\\ 1 & 1 & 1 \\\\ 1 & 1 & 1 \\end{bmatrix}$$\nAttenuates high-frequency sensor noise, but blurs sharp object edges.\n\n### 2. 2D Gaussian Filter (Isotropic Smoothing):\n$$G(x, y) = \\frac{1}{2\\pi \\sigma^2} e^{-\\frac{x^2 + y^2}{2\\sigma^2}}$$\n> [!TIP]\n> **Separability Property of Gaussian Kernels:**\n> Because $e^{-\\frac{x^2+y^2}{2\\sigma^2}} = e^{-\\frac{x^2}{2\\sigma^2}} \\cdot e^{-\\frac{y^2}{2\\sigma^2}}$, a 2D $K \\times K$ Gaussian convolution can be decomposed into two sequential 1D convolutions (horizontal pass followed by vertical pass). This reduces computational complexity from **$O(K^2)$ down to $O(2K)$ operations per pixel**, an enormous speedup for real-time robotic vision!"
      },
      {
        "id": "rob-5-5",
        "heading": "5.5 Median Non-Linear Filtering for Salt-and-Pepper Noise",
        "content": "Linear filters fail miserably when corrupted by impulse (\"salt-and-pepper\") noise because averaging spreads corrupted black (0) or white (255) pixels into their neighbors.\n- **Median Filter:** Ranks all pixel values in an $n \\times n$ neighborhood and replaces the central pixel with the **median value**.\n- *Result:* Completely strips out impulse spikes while preserving sharp geometric edges."
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
        "content": "Edges correspond to sharp local discontinuities in image luminance. Mathematically, edges are located at the extrema of the first spatial derivative or zero-crossings of the second spatial derivative.\n\n### The Spatial Gradient Vector:\n$$\\nabla I = \\begin{bmatrix} G_x \\\\ G_y \\end{bmatrix} = \\begin{bmatrix} \\frac{\\partial I}{\\partial x} \\\\ \\frac{\\partial I}{\\partial y} \\end{bmatrix}$$\n- **Gradient Magnitude:**\n  $$|\\nabla I| = \\sqrt{G_x^2 + G_y^2} \\approx |G_x| + |G_y|$$\n- **Gradient Orientation Angle:**\n  $$\\theta = \\text{atan2}(G_y, G_x)$$\n\n### The $3 \\times 3$ Sobel Operator:\nCombines Gaussian smoothing in one direction with central differencing in the orthogonal direction:\n$$S_x = \\begin{bmatrix} -1 & 0 & +1 \\\\ -2 & 0 & +2 \\\\ -1 & 0 & +1 \\end{bmatrix}, \\quad S_y = \\begin{bmatrix} -1 & -2 & -1 \\\\ 0 & 0 & 0 \\\\ +1 & +2 & +1 \\end{bmatrix}$$"
      },
      {
        "id": "rob-6-2",
        "heading": "6.2 The Canny Edge Detector: Optimal 5-Stage Algorithm",
        "content": "John F. Canny (1986) formulated three mathematical optimality criteria for edge detection:\n1. **Low Error Rate:** Mark genuine edges without inventing spurious noise edges.\n2. **Localization:** Minimize distance between detected edge pixels and true physical edges.\n3. **Single Response:** Only one detector response per edge (no thick multiple responses).\n\n---\n\n### The 5-Step Canny Pipeline:\n1. **Gaussian Smoothing:** Convolve image with Gaussian kernel ($G_\\sigma$) to suppress high-frequency noise.\n2. **Gradient Calculation:** Compute magnitude $M(x,y)$ and direction $\\theta(x,y)$ using Sobel kernels.\n3. **Non-Maximum Suppression (NMS):**\n   - Round edge angle $\\theta(x,y)$ into one of 4 discrete sector directions: $0^\\circ$ (horizontal), $45^\\circ$ (diagonal), $90^\\circ$ (vertical), or $135^\\circ$.\n   - Compare the current pixel's magnitude with its two immediate neighbors along the gradient orientation line.\n   - If the current pixel is smaller than either neighbor, **suppress it (set to 0)**. This thins thick ridges into sharp **1-pixel-wide lines**.\n4. **Double Thresholding:**\n   - Establish two thresholds: High Threshold ($T_{high}$) and Low Threshold ($T_{low}$), typically $T_{low} \\approx 0.4 - 0.5 \\times T_{high}$.\n   - If $M(x,y) \\ge T_{high}$: Pixel is declared a **Strong Edge**.\n   - If $T_{low} \\le M(x,y) < T_{high}$: Pixel is declared a **Weak Edge**.\n   - If $M(x,y) < T_{low}$: Pixel is suppressed (set to 0).\n5. **Edge Tracking by Hysteresis:**\n   - Weak edge pixels are preserved if and only if they are **connected to at least one strong edge pixel** through an 8-connected path. Disconnected weak pixels (likely noise) are discarded."
      },
      {
        "id": "rob-6-3",
        "heading": "6.3 Mathematical Morphology on Binary Images",
        "content": "Mathematical morphology probes geometric structures in binary images using a small set called a **Structuring Element ($B$)**:\n\n1. **Dilation ($A \\oplus B$):**\n   $$A \\oplus B = \\{ z \\mid (\\hat{B})_z \\cap A \\neq \\emptyset \\}$$\n   Expands boundaries; fills small holes and bridges narrow gaps.\n2. **Erosion ($A \\ominus B$):**\n   $$A \\ominus B = \\{ z \\mid (B)_z \\subseteq A \\}$$\n   Shrinks boundaries; eliminates small isolated foreground noise dots.\n3. **Morphological Opening ($A \\circ B$):**\n   $$A \\circ B = (A \\ominus B) \\oplus B$$\n   Erosion followed by dilation. Smooths contours, eliminates small protrusions, and breaks thin isthmuses without altering overall object size.\n4. **Morphological Closing ($A \\bullet B$):**\n   $$A \\bullet B = (A \\oplus B) \\ominus B$$\n   Dilation followed by erosion. Merges narrow breaks, fills long thin gulfs, and closes internal cavities."
      },
      {
        "id": "rob-6-4",
        "heading": "6.4 Otsu's Global Thresholding & Image Segmentation",
        "content": "Nobuyuki Otsu (1979) established the mathematically optimal non-parametric technique for automatic global binarization.\nIt selects the threshold $t^*$ that **maximizes the between-class variance ($\\sigma_B^2$)**, which is equivalent to minimizing the within-class variance:\n\n$$\\sigma_B^2(t) = \\omega_0(t) \\cdot (\\mu_0(t) - \\mu_T)^2 + \\omega_1(t) \\cdot (\\mu_1(t) - \\mu_T)^2$$\nWhere:\n- $\\omega_0(t) = \\sum_{i=0}^t p_i$ is the probability of background class.\n- $\\omega_1(t) = \\sum_{i=t+1}^{L-1} p_i$ is the probability of foreground class.\n- $\\mu_0(t)$ and $\\mu_1(t)$ are the mean intensity values of background and foreground.\n- $\\mu_T$ is the global mean intensity of the entire image.\nThe algorithm evaluates $t \\in [0, 255]$ in a single linear pass over the histogram."
      },
      {
        "id": "rob-6-5",
        "heading": "6.5 Video Motion Analysis: Optical Flow & Lucas-Kanade",
        "content": "**Optical Flow** represents the 2D apparent velocity field $(u, v)$ of brightness patterns across consecutive video frames.\n\n### Brightness Constancy Assumption:\nA scene point maintains constant intensity over a differential time increment $dt$:\n$$I(x + dx, y + dy, t + dt) = I(x, y, t)$$\nTaking the first-order Taylor expansion:\n$$\\frac{\\partial I}{\\partial x} \\frac{dx}{dt} + \\frac{\\partial I}{\\partial y} \\frac{dy}{dt} + \\frac{\\partial I}{\\partial t} = 0 \\implies I_x u + I_y v + I_t = 0$$\n\n### The Aperture Problem:\nThis single equation contains two unknowns ($u$ and $v$) at each pixel. We can only measure velocity normal to an edge, not parallel to it!\n\n### The Lucas-Kanade Solution:\nAssumes that optical flow $(u, v)$ is constant within a small local spatial window $\\Omega$ (e.g., $5 \\times 5$ pixels = 25 equations):\n$$\\begin{bmatrix} I_{x,1} & I_{y,1} \\\\ I_{x,2} & I_{y,2} \\\\ \\vdots & \\vdots \\\\ I_{x,n} & I_{y,n} \\end{bmatrix} \\begin{bmatrix} u \\\\ v \\end{bmatrix} = -\\begin{bmatrix} I_{t,1} \\\\ I_{t,2} \\\\ \\vdots \\\\ I_{t,n} \\end{bmatrix} \\implies A \\mathbf{v} = -b$$\nApplying Ordinary Least Squares:\n$$\\mathbf{v} = (A^T A)^{-1} A^T (-b)$$\nWhere the $2 \\times 2$ matrix $A^T A$ is:\n$$A^T A = \\begin{bmatrix} \\sum I_x^2 & \\sum I_x I_y \\\\ \\sum I_x I_y & \\sum I_y^2 \\end{bmatrix}$$\n> [!NOTE]\n> For $(A^T A)$ to be invertible, both eigenvalues must be large. This occurs at **corners and textured patches**, proving why feature trackers track corners!"
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
        "content": "Before end-to-end deep convolutional networks, real-time object detection relied on handcrafted local feature descriptors evaluated over multi-scale sliding windows:\n\n1. **Haar-Like Features:** Rectangle features computing the difference between the sum of pixel intensities in adjacent white and black rectangular regions. Sensitive to vertical edges, horizontal lines, and diagonal junctions.\n2. **HOG (Histogram of Oriented Gradients - Dalal & Triggs 2005):** Evaluates local gradient orientation distributions in small cells ($8 \\times 8$ pixels), normalized across overlapping $2 \\times 2$ blocks. Outstanding accuracy for pedestrian detection.\n3. **SIFT (Scale-Invariant Feature Transform - David Lowe 1999):** Detects scale-space extrema across Difference-of-Gaussians (DoG) octaves. Invariant to image scaling, 3D rotation, and illumination changes."
      },
      {
        "id": "rob-7-2",
        "heading": "7.2 The Viola-Jones Real-Time Face Detection Framework",
        "content": "Paul Viola and Michael Jones (2001) achieved the world's first real-time ($> 15\\text{ fps}$) face detector by introducing three groundbreaking engineering innovations:\n\n### 1. The Integral Image (Summed-Area Table):\nAllows evaluating the sum of pixel intensities inside **any arbitrary rectangle in exactly 4 memory array accesses ($O(1)$ constant time)**, regardless of rectangle dimensions!\n$$ii(x, y) = \\sum_{x' \\le x, y' \\le y} i(x', y')$$\nCalculated in a single pass:\n$$s(x, y) = s(x, y - 1) + i(x, y), \\quad ii(x, y) = ii(x - 1, y) + s(x, y)$$\n\nTo evaluate the sum of pixels inside rectangle $D = [x_1, y_1]$ to $[x_2, y_2]$:\n$$\\text{Sum}(D) = ii(x_2, y_2) + ii(x_1 - 1, y_1 - 1) - ii(x_1 - 1, y_2) - ii(x_2, y_1 - 1)$$\n\n### 2. AdaBoost Feature Selection:\nA $24 \\times 24$ sub-window yields over $160,000$ potential Haar features. AdaBoost selects the top $\\approx 200$ most discriminative features and assigns optimal weights.\n\n### 3. The Attentional Cascade:\nInstead of evaluating all 200 features on every candidate window, weak classifiers are organized into a degenerate decision tree cascade:\n- Early stages contain only 1 to 5 features. They reject over **$95\\%$ of non-face background windows** instantly.\n- Complex candidate regions pass deeper into the cascade for rigorous verification. Average face evaluation time drops dramatically."
      },
      {
        "id": "rob-7-3",
        "heading": "7.3 Feature Matching, RANSAC & Homography Estimation",
        "content": "To align images taken from different camera viewpoints or track planar objects:\n\n### Homography Matrix ($H$):\nA projective mapping between two coplanar 2D planes:\n$$\\begin{bmatrix} x' \\\\ y' \\\\ 1 \\end{bmatrix} \\sim \\begin{bmatrix} h_{11} & h_{12} & h_{13} \\\\ h_{21} & h_{22} & h_{23} \\\\ h_{31} & h_{32} & h_{33} \\end{bmatrix} \\begin{bmatrix} x \\\\ y \\\\ 1 \\end{bmatrix}$$\nHas 8 degrees of freedom; requires a minimum of **4 point correspondences**.\n\n### RANSAC (Random Sample Consensus - Fischler & Bolles 1981):\nFeature matching produces numerous outliers (false correspondences). Standard least squares fits all points and fails catastrophically in the presence of outliers.\n**RANSAC Algorithm:**\n1. Randomly sample the minimum subset (4 point pairs for homography).\n2. Fit model $H$ to the subset.\n3. Count **inliers**: points whose projection error is within threshold $\\epsilon$:\n   $$\\| p_i' - H p_i \\| < \\epsilon$$\n4. Repeat for $K$ iterations. Keep the model with the largest inlier count.\n5. Re-fit final model using all consensus inliers."
      },
      {
        "id": "rob-7-4",
        "heading": "7.4 Industrial Automated Optical Inspection (AOI) & Surveillance",
        "content": "### PCB Defect Inspection Pipeline:\n1. **Fiducial Marker Alignment:** Locates circular copper alignment fiducials on PCB corners using template matching to compensate for mechanical conveyor rotation and drift.\n2. **Golden Board Subtraction:** Compares golden CAD vector layer with captured inspection frame using structural similarity (SSIM).\n3. **Defect Classification:** Classifies solder bridges, open traces, missing surface-mount (SMD) chips, and tombstoning resistors.\n\n### Surveillance Video Background Subtraction:\nSeparates moving foreground objects (pedestrians, vehicles) from static scenes using **Gaussian Mixture Models (GMM / Stauffer-Grimson)**:\n- Models each background pixel's color distribution as a mixture of $K = 3 - 5$ Gaussians to handle waving tree branches and rippling water."
      },
      {
        "id": "rob-7-5",
        "heading": "7.5 Deep Learning in Vision: YOLO vs Two-Stage Detectors",
        "content": "| Architecture Type | Examples | Operational Paradigm | Speed (FPS) | Primary Use Case |\n|---|---|---|---|---|\n| **Two-Stage Detectors** | R-CNN, Fast R-CNN, Faster R-CNN | 1. Region Proposal Network (RPN) proposes candidate boxes.<br>2. RoI pooling classifies proposals. | Slow ($5 - 15\\text{ fps}$) | Medical Imaging, High-Precision Inspection |\n| **Single-Stage Detectors** | YOLO (You Only Look Once), SSD | Divides image into $S \\times S$ grid; predicts bounding boxes and class probabilities in a **single forward pass**! | Ultra-Fast ($60 - 150\\text{ fps}$) | Autonomous Robotics, Real-Time Drone Tracking |\n\n> [!TIP]\n> Modern YOLO versions (YOLOv8, YOLOv9, YOLOv10) replace classical sliding windows completely by employing CSPDarknet backbones, PANet feature pyramids, and Anchor-Free decoupled heads."
      }
    ]
  },
  "eceg5401-ch1": {
    "courseId": "eceg5401",
    "courseCode": "ECEg5401",
    "chapterNum": 1,
    "title": "Overview of Operating Systems, Services & Structures",
    "readTime": "12 min read",
    "cloRef": "CLO1: Explain OS roles, hardware protection, and architectural structures",
    "authoritativeSources": "Silberschatz (Ch. 1-2); Tanenbaum (Ch. 1); AASTU Official Lecture Notes Ch. 1",
    "sections": [
      {
        "id": "os-1-1",
        "heading": "1.1 The Fundamental Dual Role of an Operating System",
        "content": "An **Operating System (OS)** is system software that manages computer hardware and software resources and provides common services for computer programs. It operates at two primary architectural boundaries:\n\n1. **The OS as an Extended Machine (Top-Down Abstraction):**\n   Bare physical hardware (disk platters, PCIe registers, DRAM capacitors) is messy, complex, and hardware-dependent. The OS creates clean, elegant high-level logical abstractions:\n   - Transforms raw, unformatted disk sectors into named, hierarchical **Files and Directories**.\n   - Transforms raw memory chips into isolated, protected **Virtual Address Spaces**.\n   - Transforms complex hardware timer interrupts and CPU registers into scheduled **Processes and Threads**.\n2. **The OS as a Resource Allocator (Bottom-Up Management):**\n   In modern multi-user, multi-tasking systems, conflicting requests for CPU time, memory space, network bandwidth, and I/O devices must be arbitrated with **fairness, efficiency, and zero starvation**."
      },
      {
        "id": "os-1-2",
        "heading": "1.2 Historical Evolution of Operating Systems (5 Landmark Generations)",
        "content": "| Generation | Era & Technology | Architectural Characteristics & Milestones | Limitations & Bottlenecks |\n|---|---|---|---|\n| **1st Gen** | 1945–1955: Vacuum Tubes, Plugboards | **Bare Machine:** No OS existed. A single programmer operated the computer directly using physical switches, punch cards, and machine code. | Tens of hours wasted on physical setup; zero concurrency. |\n| **2nd Gen** | 1955–1965: Transistors, Batch Systems | **Batch Processing:** Introduced **GM-NAA I/O (1956)**. Jobs collected on punch cards were transferred to magnetic tape and executed sequentially by a resident monitor. | CPU sat completely idle during slow tape/card reader mechanical I/O operations. |\n| **3rd Gen** | 1965–1980: Integrated Circuits (ICs) | **Multiprogramming & Timesharing:** Introduced **IBM System/360** and **UNIX (1969)**. Multiple jobs loaded concurrently into memory; CPU switches when current job waits for I/O. CTSS and MULTICS introduced interactive timesharing. | Complex memory fragmentation and concurrency bugs. |\n| **4th Gen** | 1980–2000: VLSI, Personal Computers | **PC Revolution & GUIs:** **CP/M (Gary Kildall 1974)**, **MS-DOS (1981)**, **Apple Macintosh GUI (1984)**, **Windows (1985)**, **Linux (Linus Torvalds 1991)** open-source revolution. | Early desktop systems lacked hardware memory protection. |\n| **5th Gen** | 2000s–Present: Mobile, Multi-Core, Cloud | **Mobile & Distributed Virtualization:** **Apple iOS (2007)**, **Android (2008)**, Type-1/Type-2 Hypervisors (KVM, VMware), Docker containers, Kubernetes distributed microservices. | Massive scale, hardware concurrency bugs, hypervisor escapes. |"
      },
      {
        "id": "os-1-3",
        "heading": "1.3 Hardware CPU Protection: Dual-Mode Operation & System Call Traps",
        "content": "To prevent rogue user applications from crashing the system, writing to arbitrary memory, or hijacking I/O devices, CPUs provide hardware-enforced protection rings:\n\n### 1. Dual-Mode Operation:\nThe CPU hardware status register contains a dedicated **Mode Bit**:\n- **User Mode (Mode Bit = 1):** The CPU executes user application code. A subset of instructions (**Privileged Instructions**) cannot be executed (e.g., modifying page table base registers, disabling hardware interrupts, sending raw commands to disk controllers).\n- **Kernel / Supervisor Mode (Mode Bit = 0):** The CPU executes operating system kernel code with unrestricted access to all hardware instructions, memory spaces, and peripheral devices.\n\n### 2. The Trap / System Call Transition Sequence:\nWhen a user application requires privileged services (e.g., writing data to a file via `write()`):\n1. **User Mode Execution:** Application places system call arguments in designated CPU registers or onto the user stack.\n2. **Executing the Trap:** Application executes a software interrupt instruction (e.g., `syscall` in x86-64, `svc` in ARM).\n3. **Hardware Mode Transition:** The CPU hardware automatically:\n   - Changes the **Mode Bit from 1 to 0** (entering Kernel Mode).\n   - Saves the current Program Counter ($PC$) and Processor Status Word ($PSW$) onto the Kernel Stack.\n   - Indexes into the **Interrupt Vector Table (IVT)** to find the kernel's system call dispatch handler.\n4. **Kernel Processing:** The kernel validates the requested pointers and system call number, executes the hardware I/O operation, and places the return value into a register.\n5. **Return from Trap (`sysret` / `eret`):** CPU restores saved registers, restores the **Mode Bit to 1**, and resumes user execution."
      },
      {
        "id": "os-1-4",
        "heading": "1.4 Operating System Architectural Structures & Kernel Models",
        "content": "### Structural Paradigms Comparison:\n| Kernel Structure | Architecture & Execution Space | Key Strengths | Critical Vulnerabilities & Real-World Examples |\n|---|---|---|---|\n| **Monolithic Kernel** | Entire OS (scheduler, virtual memory, file systems, all device drivers) executes in a single address space in **Ring 0 Kernel Mode**. | Maximum execution speed (intra-kernel calls are fast direct C function calls; zero IPC context-switch overhead). | **Catastrophic Fragility:** A single null-pointer dereference or memory corruption in any third-party device driver panics the entire kernel. *(Linux, FreeBSD, classic UNIX)* |\n| **Microkernel** | Only bare essentials stay in Ring 0: basic thread scheduling, low-level IPC, and minimal interrupt dispatch. File systems, networking stacks, and device drivers run in **User Space (Ring 3)**. | Extreme reliability, modularity, and fault isolation: a crashed driver simply restarts without affecting the kernel. | Performance overhead from continuous context switching and message passing across user-kernel boundaries. *(Mach, QNX, MINIX, seL4)* |\n| **Hybrid Kernel** | Combines microkernel modularity with monolithic speed: runs critical subsystems (e.g., graphics/GUI or networking) in kernel space for speed while keeping a modular architecture. | Practical compromise between raw performance and modularity. | Larger kernel surface area. *(Windows NT kernel, Apple macOS XNU kernel)* |\n\n---\n\n### 🔬 High-Yield Real-World Case Study: The July 2024 CrowdStrike Falcon Incident\nOn July 19, 2024, an invalid memory-address read in a kernel-mode sensor driver update (`csagent.sys`) running at **Ring 0** on 8.5 million Microsoft Windows enterprise machines caused the infamous blue screen of death (`SYSTEM_THREAD_EXCEPTION_NOT_HANDLED`).\nBecause Windows NT uses a monolithic/hybrid driver architecture where security sensors execute in Kernel Mode, the hardware Memory Management Unit (MMU) faulted with an unhandled exception, causing the entire operating system to crash immediately.\n> [!NOTE]\n> This disaster underscored the theoretical advantage of **Microkernel architectures** (like QNX or seL4), where a driver crash in Ring 3 would simply kill that user-space process without taking down the operating system!"
      },
      {
        "id": "os-1-5",
        "heading": "1.5 System Bootstrapping Sequence: From Cold Power-On to User Login",
        "content": "When the power switch is toggled on a computer motherboard:\n1. **Power-On Reset:** Power supply stabilizes voltage rails; CPU reset pin released. Program Counter ($PC$) hardwired to fetch first instruction from non-volatile flash ROM at address `0xFFFFFFF0`.\n2. **UEFI / BIOS Execution:** Executes **Power-On Self-Test (POST)** to verify DRAM size, PCIe devices, and keyboard/display connectivity.\n3. **Bootloader Hand-off:** UEFI locates the EFI System Partition (ESP) or BIOS loads the Master Boot Record (MBR) from sector 0 of the boot disk. Control transfers to the **Stage 2 Bootloader (e.g., GRUB)**.\n4. **Kernel Loading:** GRUB loads the compressed OS kernel image (`vmlinuz`) and initial RAM disk (`initrd`) into physical RAM, decompresses the kernel, and jumps to the kernel entry point.\n5. **Kernel Initialization:** The kernel sets up page tables, enables virtual memory and hardware paging, initializes device drivers, and mounts the real root filesystem (`/`).\n6. **Init Process Spawning:** Kernel spawns Process ID 1 (`/sbin/init` or `systemd`), which spawns background daemons and the user login manager (`gdm` / `login`)."
      }
    ]
  },
  "eceg5401-ch2": {
    "courseId": "eceg5401",
    "courseCode": "ECEg5401",
    "chapterNum": 2,
    "title": "Process Management, Threads & CPU Scheduling",
    "readTime": "14 min read",
    "cloRef": "CLO2: Analyze process states, thread models, and calculate CPU scheduling algorithms",
    "authoritativeSources": "Silberschatz (Ch. 3-5); Tanenbaum (Ch. 2); Stallings (Ch. 3-4); AASTU Syllabus",
    "sections": [
      {
        "id": "os-2-1",
        "heading": "2.1 Process Concept, Memory Layout & The Process Control Block (PCB)",
        "content": "A **Program** is a passive entity (an executable file stored on disk, e.g., `/usr/bin/python3`), whereas a **Process** is an active entity—a program in execution.\n\n### Memory Layout of a Process in Virtual Memory:\n```\nHigh Memory (0xFFFFFFFF)\n┌──────────────────────────────────────────────┐\n│ Kernel Space (Privileged mapping)            │\n├──────────────────────────────────────────────┤\n│ User Stack (grows downwards ↓)               │\n│ - Local function variables, return addresses │\n├──────────────────────────────────────────────┤\n│                  ↓↓↓                         │\n│             (Unused Space)                   │\n│                  ↑↑↑                         │\n├──────────────────────────────────────────────┤\n│ Heap (grows upwards ↑)                       │\n│ - Dynamic memory allocated via malloc()      │\n├──────────────────────────────────────────────┤\n│ BSS Segment (Uninitialized global/static)    │\n├──────────────────────────────────────────────┤\n│ Data Segment (Initialized global/static)     │\n├──────────────────────────────────────────────┤\n│ Text Segment (Compiled read-only machine code)│\n└──────────────────────────────────────────────┘\nLow Memory (0x00000000)\n```\n\n### The Process Control Block (PCB / `task_struct`):\nThe kernel maintains a dedicated data structure for each active process containing:\n1. **Process State:** New, Ready, Running, Waiting, Terminated.\n2. **Process Identifier (PID):** Unique integer.\n3. **Program Counter ($PC$):** Address of the next machine instruction.\n4. **CPU Registers:** Accumulators, index registers, stack pointer ($SP$).\n5. **CPU Scheduling Information:** Priority, scheduling queue pointers.\n6. **Memory-Management Information:** Page table base pointer (CR3 register in x86).\n7. **Accounting & I/O Status:** CPU time consumed, open file descriptor table."
      },
      {
        "id": "os-2-2",
        "heading": "2.2 The 5-State Process Lifecycle & Context Switching",
        "content": "### The 5 Process States:\n1. **New:** Process is being created.\n2. **Ready:** Process is loaded in memory waiting to be assigned to a CPU core by the scheduler.\n3. **Running:** Instructions are currently being executed by the CPU.\n4. **Waiting / Blocked:** Process is waiting for an external event (I/O completion, semaphore release).\n5. **Terminated:** Process has finished execution; remains as a \"zombie\" until its parent collects its exit status via `wait()`.\n\n### The Mechanics of a Context Switch:\nA **Context Switch** is the procedure of saving the hardware CPU state of the currently running process and restoring the state of another ready process:\n1. An interrupt occurs (timer tick or I/O completion).\n2. The kernel saves the CPU registers, $PC$, and $SP$ of Process $P_0$ into its PCB.\n3. Kernel changes $P_0$'s state from Running to Ready (or Waiting).\n4. Kernel executes scheduling algorithm to select ready process $P_1$.\n5. Kernel updates the CPU's memory management registers (flushing the Translation Lookaside Buffer, TLB).\n6. Kernel restores registers and $PC$ from $P_1$'s PCB. Mode bit returns to 1.\n> [!NOTE]\n> **Context Switch Overhead:** During a context switch, the CPU performs zero useful user work. Typical context switch latency ranges from **$1 - 5\\ \\mu\\text{s}$**, heavily influenced by cache and TLB invalidation penalties."
      },
      {
        "id": "os-2-3",
        "heading": "2.3 Threads vs Processes & Multithreading Models",
        "content": "A **Thread** is the basic unit of CPU execution (\"lightweight process\").\n\n### Key Differences:\n- **Shared by All Threads of a Process:** Address space (Code segment, Data segment, Heap), open file descriptors, child processes.\n- **Private to Each Individual Thread:** Thread ID, Program Counter ($PC$), CPU Register set, Private Stack (for local variables and function calls).\n\n### Multithreading Models:\n1. **Many-to-One Model:** Many user-level threads mapped to a single kernel thread. Fast user-space thread switching, but **if one thread makes a blocking system call, the entire process blocks**! Cannot utilize multiple CPU cores.\n2. **One-to-One Model (Modern Linux / Windows / POSIX `pthreads`):** Each user thread maps directly to an independent kernel thread. Outstanding concurrency across multi-core CPUs; creating too many threads incurs kernel resource overhead.\n3. **Many-to-Many Model (M:N / Go Goroutines):** Multiplexes $M$ user threads onto $N$ kernel threads ($M \\ge N$). Maximum flexibility with minimal kernel memory consumption."
      },
      {
        "id": "os-2-4",
        "heading": "2.4 CPU Scheduling Algorithms Taxonomy & Performance Metrics",
        "content": "### Core Scheduling Metrics:\n- **CPU Utilization:** Percentage of time CPU is executing work (Target: $40\\% - 90\\%$).\n- **Throughput:** Number of completed processes per unit time.\n- **Turnaround Time ($TAT$):** Interval from job arrival to job termination:\n  $$TAT = T_{finish} - T_{arrival}$$\n- **Waiting Time ($W$):** Total time spent waiting in the ready queue:\n  $$W = TAT - T_{burst}$$\n- **Response Time ($R$):** Time from job submission until the very first CPU output response.\n\n---\n\n### Algorithm Taxonomy:\n1. **First-Come, First-Served (FCFS - Non-preemptive):**\n   - Simple FIFO queue.\n   - **The Convoy Effect:** If a massive CPU-bound process arrives first, all short I/O-bound processes sit blocked behind it, cratering device utilization and average waiting time.\n2. **Shortest Job First (SJF / SRTF - Provably Optimal):**\n   - Schedules the process with the shortest next CPU burst.\n   - **Provably Optimal:** Delivers the minimum possible average waiting time.\n   - *Limitation:* Future CPU burst duration cannot be known in advance; must be estimated using exponential smoothing:\n     $$\\tau_{n+1} = \\alpha t_n + (1 - \\alpha) \\tau_n$$\n3. **Round Robin (RR - Preemptive):**\n   - Each process is allocated a cyclic time slice called a **Time Quantum ($q$)**.\n   - If $q$ is extremely large ($q \\to \\infty$), RR degenerates into **FCFS**.\n   - If $q$ is extremely small ($q \\to 0$), context-switching overhead dominates CPU time. Standard rule of thumb: $q$ should be chosen such that **$80\\%$ of CPU bursts are shorter than $q$** (typically $10 - 50\\text{ ms}$).\n4. **Multilevel Feedback Queue (MLFQ):**\n   - The gold standard for modern general-purpose operating systems.\n   - Multiple priority queues with differing time quanta.\n   - I/O-bound interactive processes stay at high-priority levels; long CPU-bound compute jobs sink down to lower-priority levels with large time quanta. Employs **Aging** to prevent starvation."
      },
      {
        "id": "os-2-5",
        "heading": "2.5 Comprehensive CPU Scheduling Numerical Problem & Gantt Chart",
        "content": "### 🧮 Worked Numerical Problem:\n**Scenario:** Four processes arrive in the ready queue as follows:\n\n| Process | Arrival Time ($T_{arr}$) | Burst Time ($T_{burst}$) |\n|---|---|---|\n| **$P_1$** | $0\\text{ ms}$ | $8\\text{ ms}$ |\n| **$P_2$** | $1\\text{ ms}$ | $4\\text{ ms}$ |\n| **$P_3$** | $2\\text{ ms}$ | $9\\text{ ms}$ |\n| **$P_4$** | $3\\text{ ms}$ | $5\\text{ ms}$ |\n\n**Calculate and Compare:**\n1. FCFS Scheduling\n2. Shortest Remaining Time First (SRTF - Preemptive SJF)\n3. Round Robin with Time Quantum $q = 4\\text{ ms}$\nDetermine the Gantt chart and **Average Waiting Time ($W_{avg}$)** for each.\n\n---\n\n### Step-by-Step Solution:\n\n#### 1. FCFS (First-Come, First-Served):\n- Order of execution: $P_1 \\to P_2 \\to P_3 \\to P_4$\n- **Gantt Chart:**\n  `[ P1: 0 - 8 ] [ P2: 8 - 12 ] [ P3: 12 - 21 ] [ P4: 21 - 26 ]`\n- Finish Times: $P_1 = 8, P_2 = 12, P_3 = 21, P_4 = 26$\n- Turnaround Time: $TAT = T_{fin} - T_{arr}$\n  - $TAT(P_1) = 8 - 0 = 8$\n  - $TAT(P_2) = 12 - 1 = 11$\n  - $TAT(P_3) = 21 - 2 = 19$\n  - $TAT(P_4) = 26 - 3 = 23$\n- Waiting Time: $W = TAT - T_{burst}$\n  - $W(P_1) = 8 - 8 = 0\\text{ ms}$\n  - $W(P_2) = 11 - 4 = 7\\text{ ms}$\n  - $W(P_3) = 19 - 9 = 10\\text{ ms}$\n  - $W(P_4) = 23 - 5 = 18\\text{ ms}$\n$$W_{avg, FCFS} = \\frac{0 + 7 + 10 + 18}{4} = \\frac{35}{4} = 8.75\\text{ ms}$$\n\n#### 2. SRTF (Preemptive SJF):\n- At $t=0$: $P_1$ starts (burst 8).\n- At $t=1$: $P_2$ arrives with burst 4. $P_1$ remaining = 7. Since $4 < 7$, $P_1$ is **preempted**! $P_2$ runs.\n- At $t=2$: $P_3$ arrives (burst 9). $P_2$ remaining = 3. $P_2$ continues.\n- At $t=3$: $P_4$ arrives (burst 5). $P_2$ remaining = 2. $P_2$ continues.\n- At $t=5$: $P_2$ finishes. Remaining: $P_1(7), P_3(9), P_4(5)$. Shortest is $P_4$ (runs from $5 - 10$).\n- At $t=10$: $P_4$ finishes. Remaining: $P_1(7), P_3(9)$. Shortest is $P_1$ (runs from $10 - 17$).\n- At $t=17$: $P_1$ finishes. Remaining: $P_3(9)$ (runs from $17 - 26$).\n- **Gantt Chart:**\n  `[ P1: 0 - 1 ] [ P2: 1 - 5 ] [ P4: 5 - 10 ] [ P1: 10 - 17 ] [ P3: 17 - 26 ]`\n- Finish Times: $P_2 = 5, P_4 = 10, P_1 = 17, P_3 = 26$\n- Waiting Times:\n  - $W(P_2) = 5 - 1 - 4 = 0\\text{ ms}$\n  - $W(P_4) = 10 - 3 - 5 = 2\\text{ ms}$\n  - $W(P_1) = (1 - 0) + (10 - 1) = 0 + 9 = 9\\text{ ms}$ (waited from 1 to 10)\n  - $W(P_3) = 17 - 2 = 15\\text{ ms}$\n$$W_{avg, SRTF} = \\frac{9 + 0 + 15 + 2}{4} = \\frac{26}{4} = 6.50\\text{ ms}$$\n**Notice:** SRTF achieves significantly lower waiting time ($6.50\\text{ ms}$ vs $8.75\\text{ ms}$)!"
      }
    ]
  },
  "eceg5401-ch3": {
    "courseId": "eceg5401",
    "courseCode": "ECEg5401",
    "chapterNum": 3,
    "title": "Process Synchronization, Critical Section & Deadlocks",
    "readTime": "14 min read",
    "cloRef": "CLO3: Solve synchronization race conditions, semaphores, and deadlocks",
    "authoritativeSources": "Silberschatz (Ch. 6-8); Tanenbaum (Ch. 2); Stallings (Ch. 5-6); AASTU Syllabus",
    "sections": [
      {
        "id": "os-3-1",
        "heading": "3.1 The Race Condition & The Critical Section Problem",
        "content": "A **Race Condition** occurs when multiple concurrent processes or threads access and manipulate shared data, and the final outcome depends on the precise, non-deterministic order in which execution interleaves.\n\n### The Critical Section Problem:\nA code segment where shared variables or resources are accessed is designated as the **Critical Section (CS)**.\nAny valid synchronization protocol must strictly satisfy three fundamental criteria:\n1. **Mutual Exclusion:** If process $P_i$ is executing in its critical section, then no other processes can be executing in their critical sections.\n2. **Progress:** If no process is executing in its critical section and there are some processes that wish to enter their critical sections, then only those processes not executing in their remainder sections can participate in deciding which will enter next, and this selection cannot be postponed indefinitely.\n3. **Bounded Waiting:** There exists a bound on the number of times other processes are allowed to enter their critical sections after a process has made a request to enter and before that request is granted (prevents starvation)."
      },
      {
        "id": "os-3-2",
        "heading": "3.2 Hardware Synchronization: TestAndSet & CompareAndSwap",
        "content": "Software-only protocols (like Peterson's Algorithm) fail on modern multi-core processors due to out-of-order execution and store buffering unless strict memory barrier fences are used. Modern kernels rely on **atomic hardware read-modify-write CPU instructions**:\n\n### 1. `TestAndSet` (TAS):\nAtomically reads the memory value, sets it to `true`, and returns the original value in an indivisible bus cycle:\n```c\nboolean TestAndSet(boolean *target) {\n    boolean rv = *target;\n    *target = TRUE;\n    return rv;\n}\n```\nImplementation of Mutual Exclusion with TAS:\n```c\nwhile (TestAndSet(&lock)); // Busy wait spinlock\n// --- CRITICAL SECTION ---\nlock = FALSE;\n// --- REMAINDER SECTION ---\n```\n\n### 2. `CompareAndSwap` (CAS):\nOperates on three operands: a memory location `value`, expected old value `expected`, and new value `new_value`:\n```c\nint CompareAndSwap(int *value, int expected, int new_value) {\n    int temp = *value;\n    if (*value == expected)\n        *value = new_value;\n    return temp;\n}\n```\nForms the bedrock of all lock-free concurrent data structures and Java `AtomicInteger`."
      },
      {
        "id": "os-3-3",
        "heading": "3.3 High-Level Synchronization: Semaphores & Classical Problems",
        "content": "Edsger Dijkstra (1965) introduced the **Semaphore ($S$)**: an integer variable that, apart from initialization, is accessed only through two standard atomic operations: `wait()` (traditionally $P$) and `signal()` (traditionally $V$):\n\n```c\nwait(S) {\n    S--;\n    if (S < 0) {\n        add this process to S.queue;\n        block(); // Yield CPU without busy spinning!\n    }\n}\n\nsignal(S) {\n    S++;\n    if (S <= 0) {\n        remove a process P from S.queue;\n        wakeup(P);\n    }\n}\n```\n\n- **Counting Semaphore:** Integer value can range over an unrestricted domain (used for resource pool management).\n- **Binary Semaphore (Mutex Lock):** Value ranges only between $0$ and $1$.\n\n---\n\n### Classical Concurrency Problems:\n1. **The Bounded-Buffer (Producer-Consumer) Problem:**\n   Uses three semaphores: `mutex = 1`, `empty = N`, `full = 0`.\n   - Producer waits on `empty`, locks `mutex`, inserts item, unlocks `mutex`, signals `full`.\n   - Consumer waits on `full`, locks `mutex`, removes item, unlocks `mutex`, signals `empty`.\n2. **The Dining Philosophers Problem:**\n   Five philosophers sitting around a circular table with 5 chopsticks. Each philosopher needs two chopsticks to eat. If all simultaneously pick up their left chopstick, **Deadlock ensues**! Solution: Asymmetric pickup (odd philosophers pick left first, even philosophers pick right first) or limiting diners to 4."
      },
      {
        "id": "os-3-4",
        "heading": "3.4 Deadlock Characterization: Coffman's 4 Necessary Conditions",
        "content": "A **Deadlock** is a state where every member of a set of processes is permanently blocked waiting for an event that can only be triggered by another process within the same set.\n\nE. G. Coffman (1971) proved that a deadlock can arise **if and only if ALL FOUR of the following conditions hold simultaneously**:\n1. **Mutual Exclusion:** At least one resource must be held in a non-shareable mode (only one process at a time).\n2. **Hold and Wait:** A process must currently hold at least one resource while waiting to acquire additional resources currently held by other processes.\n3. **No Preemption:** Resources cannot be forcibly preempted from a holding process; resources are released only voluntarily by the holding process upon completion.\n4. **Circular Wait:** There must exist a closed chain of processes $\\{P_0, P_1, \\dots, P_n\\}$ such that $P_0$ is waiting for a resource held by $P_1$, $P_1$ is waiting for $P_2$, ..., and $P_n$ is waiting for $P_0$.\n\n> [!IMPORTANT]\n> If you break **EVEN ONE** of these four conditions, deadlocks become mathematically impossible! For example, assigning a strict global linear hierarchy to all resource IDs ($R_1 < R_2 < \\dots < R_m$) and requiring processes to request resources in strictly ascending numerical order completely eliminates **Circular Wait**."
      },
      {
        "id": "os-3-5",
        "heading": "3.5 Deadlock Avoidance: Dijkstra's Banker's Algorithm",
        "content": "The **Banker's Algorithm** is a deadlock avoidance algorithm for systems with multiple instances of each resource type. It ensures the system never enters an **Unsafe State**.\n\n### Data Structures:\n- $n$: Number of processes; $m$: Number of resource types.\n- $\\text{Available}[m]$: Available vector of each resource type.\n- $\\text{Max}[n][m]$: Maximum demand of each process.\n- $\\text{Allocation}[n][m]$: Amount currently allocated to each process.\n- $\\text{Need}[n][m] = \\text{Max}[n][m] - \\text{Allocation}[n][m]$.\n\n### Safety Algorithm:\n1. Let $\\text{Work} = \\text{Available}$, and $\\text{Finish}[i] = \\text{false}$ for all $i$.\n2. Find an index $i$ such that:\n   $\\text{Finish}[i] == \\text{false}$ and $\\text{Need}_i \\le \\text{Work}$.\n   If no such $i$ exists, go to step 4.\n3. $\\text{Work} = \\text{Work} + \\text{Allocation}_i$; $\\text{Finish}[i] = \\text{true}$. Go to step 2.\n4. If $\\text{Finish}[i] == \\text{true}$ for all $i$, the system is in a **Safe State** with safe sequence $\\langle P_i, \\dots \\rangle$. Otherwise, the system is **Unsafe (risk of deadlock)**."
      }
    ]
  },
  "eceg5401-ch4": {
    "courseId": "eceg5401",
    "courseCode": "ECEg5401",
    "chapterNum": 4,
    "title": "Main Memory, Paging, Segmentation & Virtual Memory",
    "readTime": "14 min read",
    "cloRef": "CLO4: Analyze virtual memory paging, address translation, and page replacement",
    "authoritativeSources": "Silberschatz (Ch. 9-10); Tanenbaum (Ch. 3); Stallings (Ch. 7-8); AASTU Syllabus",
    "sections": [
      {
        "id": "os-4-1",
        "heading": "4.1 Address Binding, Relocation & Hardware Protection",
        "content": "Addresses in a program undergo transformation across compilation stages:\n1. **Compile Time:** Generates absolute physical addresses (requires knowledge of load address).\n2. **Load Time:** Compiler generates relocatable addresses; loader binds relative addresses to base offset.\n3. **Execution / Run Time:** Binding delayed until runtime. Process can be moved around memory during execution. **Requires hardware MMU support**.\n\n### Hardware Protection with Base and Limit Registers:\n- **Base Register:** Holds the smallest physical memory address allocated to the process.\n- **Limit Register:** Specifies the total size (range) of the process address space.\n- Every generated logical address is validated by hardware:\n  $$0 \\le \\text{Address} < \\text{Limit}$$\n  If valid, Physical Address = $\\text{Base} + \\text{Address}$. If invalid, the CPU traps with a **Segmentation Fault**."
      },
      {
        "id": "os-4-2",
        "heading": "4.2 Contiguous Memory Allocation & Fragmentation",
        "content": "### Dynamic Storage-Allocation Strategies:\nWhen a new process requests $N$ bytes of memory from a list of free holes:\n1. **First-Fit:** Allocates the *first* hole that is large enough. Fast search ($O(1)$ to $O(k)$).\n2. **Best-Fit:** Allocates the *smallest* hole that is large enough. Produces smallest leftover fragments, but creates numerous microscopic unusable holes.\n3. **Worst-Fit:** Allocates the *largest* hole. Produces largest leftover fragments, but slowest search.\n\n### External vs Internal Fragmentation:\n- **External Fragmentation:** Total free memory is sufficient to satisfy a request, but storage is fragmented into scattered non-contiguous pieces.\n- **Internal Fragmentation:** Memory allocated in fixed block chunks exceeds the actual size requested by the process. The unused memory internal to the block is wasted."
      },
      {
        "id": "os-4-3",
        "heading": "4.3 Paging Architecture & Hardware Translation Lookaside Buffer (TLB)",
        "content": "Paging eliminates external fragmentation by partitioning:\n- **Physical Memory** into fixed-size blocks called **Frames**.\n- **Logical / Virtual Memory** into contiguous blocks of the exact same size called **Pages** (typically $4\\text{ KB}$).\n\n### Logical Address Translation:\nA CPU logical address is split into:\n$$\\text{Logical Address} = [\\text{Page Number } (p) \\mid \\text{Offset } (d)]$$\n- Page number $p$ indexes into the **Page Table** to find the physical Frame Number $f$.\n- Physical Address = $[f \\mid d]$.\n\n### Translation Lookaside Buffer (TLB) & Effective Memory Access Time:\nBecause the page table resides in RAM, every memory reference requires **two physical memory accesses** (one for page table entry, one for actual data).\nTo solve this, the CPU contains an ultra-fast associative hardware cache called the **Translation Lookaside Buffer (TLB)**.\n\n### Mathematical EMAT Derivation:\n- $\\alpha$: TLB Hit Ratio ($0 \\le \\alpha \\le 1$).\n- $t_{TLB}$: TLB lookup time (e.g., $1\\text{ ns}$).\n- $t_{RAM}$: Main memory access time (e.g., $50\\text{ ns}$).\n\n$$\\text{Effective Memory Access Time (EMAT)} = \\alpha \\cdot (t_{TLB} + t_{RAM}) + (1 - \\alpha) \\cdot (t_{TLB} + 2 \\cdot t_{RAM})$$\n\n---\n\n### 🧮 Worked Numerical Example:\n**Scenario:** A system has a main memory access time $t_{RAM} = 80\\text{ ns}$ and a TLB search latency $t_{TLB} = 5\\text{ ns}$.\n1. Calculate EMAT for a TLB hit ratio of $95\\%$ ($\\alpha = 0.95$).\n2. Calculate EMAT if the hit ratio drops to $80\\%$ ($\\alpha = 0.80$).\n\n**Step-by-Step Calculation:**\n1. **At $95\\%$ Hit Ratio:**\n   $$\\text{EMAT} = 0.95 \\times (5 + 80) + (1 - 0.95) \\times (5 + 2 \\times 80)$$\n   $$\\text{EMAT} = 0.95 \\times 85 + 0.05 \\times 165 = 80.75 + 8.25 = 89.0\\text{ ns}$$\n   Notice that access time increases by only $\\approx 11\\%$ over bare RAM!\n\n2. **At $80\\%$ Hit Ratio:**\n   $$\\text{EMAT} = 0.80 \\times 85 + 0.20 \\times 165 = 68.0 + 33.0 = 101.0\\text{ ns}$$"
      },
      {
        "id": "os-4-4",
        "heading": "4.4 Virtual Memory, Demand Paging & Page Fault Handling",
        "content": "**Virtual Memory** decouples logical memory as perceived by the programmer from physical memory, allowing the execution of processes whose address space exceeds total physical RAM.\n\n### Pure Demand Paging:\nPages are loaded into physical memory **only when referenced during execution** (lazy swapper).\nEach Page Table Entry (PTE) contains a **Valid-Invalid Bit**:\n- `1` (Valid): Page is legal and currently present in physical RAM.\n- `0` (Invalid): Page is either outside the process address space or currently residing on the secondary swap disk.\n\n### The 6-Step Page Fault Hardware Routine:\n1. CPU references memory location; MMU inspects PTE. Valid-invalid bit is `0`.\n2. MMU triggers an internal hardware trap to the OS kernel: **Page Fault**.\n3. Kernel examines internal PCB table to verify if the address is a genuine legal memory access.\n4. Kernel finds a free frame in physical RAM (or invokes a Page Replacement algorithm if no free frame exists).\n5. Kernel schedules disk I/O to read the desired page from swap space into the allocated physical frame.\n6. When disk read finishes, kernel updates PTE (sets frame number and valid bit to `1`), restores saved process state, and **restarts the exact machine instruction that caused the fault**."
      },
      {
        "id": "os-4-5",
        "heading": "4.5 Page Replacement Algorithms: FIFO, Optimal & LRU",
        "content": "When a page fault occurs and all physical memory frames are occupied, the OS must choose a **victim page** to evict to disk.\n\n### 1. FIFO (First-In, First-Out):\n- Evicts the oldest page loaded in memory.\n- **Bélády's Anomaly:** Counter-intuitively, for some reference strings, **increasing the number of allocated physical frames results in MORE page faults**!\n\n### 2. Optimal Algorithm (OPT / MIN - Theoretical Benchmark):\n- Evicts the page that will **not be used for the longest period in the future**.\n- Delivers the lowest possible page fault rate, but physically impossible to implement in practice because the kernel cannot predict the future.\n\n### 3. Least Recently Used (LRU - Practical Gold Standard):\n- Evicts the page that has not been referenced for the longest period of time (approximating OPT by using the past as an indicator of the future).\n- Belongs to the class of **Stack Algorithms** (provably immune to Bélády's Anomaly).\n- Implementations: Hardware Counter (64-bit clock tick on each access) or Doubly-Linked Stack.\n- Approximations: **Second-Chance (Clock) Algorithm** using a 1-bit reference flag."
      }
    ]
  },
  "eceg5401-ch5": {
    "courseId": "eceg5401",
    "courseCode": "ECEg5401",
    "chapterNum": 5,
    "title": "File-System Interface, Implementation & Mass Storage",
    "readTime": "12 min read",
    "cloRef": "CLO5: Analyze file-system structures, inodes, and disk scheduling algorithms",
    "authoritativeSources": "Silberschatz (Ch. 11-13); Tanenbaum (Ch. 4-5); AASTU Syllabus",
    "sections": [
      {
        "id": "os-5-1",
        "heading": "5.1 File System Abstractions & Directory Structures",
        "content": "A **File** is a contiguous logical address space recorded on secondary storage.\n\n### Directory Topologies:\n1. **Single-Level Directory:** All files in same directory. Massive name collision issues.\n2. **Two-Level Directory:** Master directory holds separate User File Directories (UFD).\n3. **Tree-Structured Directory (Modern Standard):** Arbitrary subdirectories. Pathnames are either Absolute (`/home/user/test.c`) or Relative (`./test.c`).\n4. **Acyclic-Graph Directory:** Allows directories to share subdirectories and files via **Hard Links** (multiple directory entries pointing to the identical inode) and **Symbolic / Soft Links** (pointer file containing pathname string)."
      },
      {
        "id": "os-5-2",
        "heading": "5.2 UNIX/Linux Inode-Based File System Implementation",
        "content": "In UNIX/Linux ext2/ext3/ext4 file systems, a file is identified by an **Index Node (Inode)**:\n\n### Structure of a Classic UNIX Inode:\nAn Inode contains file metadata (owner UID, permissions, file size, timestamps) and an array of **15 block pointers**:\n- **12 Direct Pointers:** Point directly to the first 12 data blocks of the file. Allows lightning-fast access for small files ($12 \\times 4\\text{ KB} = 48\\text{ KB}$).\n- **1 Single Indirect Pointer:** Points to an index block containing 1024 pointers to data blocks ($1024 \\times 4\\text{ KB} = 4\\text{ MB}$).\n- **1 Double Indirect Pointer:** Points to an index block of index blocks ($1024 \\times 1024 \\times 4\\text{ KB} = 4\\text{ GB}$).\n- **1 Triple Indirect Pointer:** Points to a three-level index tree ($1024^3 \\times 4\\text{ KB} = 4\\text{ TB}$).\n\n> [!NOTE]\n> Filenames are **NOT stored in the Inode**! Directory files are simply tabular lists mapping strings (filenames) to Inode numbers."
      },
      {
        "id": "os-5-3",
        "heading": "5.3 Disk Storage Allocation Methods",
        "content": "| Allocation Method | Mechanics | Advantages | Disadvantages |\n|---|---|---|---|\n| **Contiguous Allocation** | File occupies a contiguous set of consecutive disk sectors. | Blazing sequential access; easy random access. | Severe **External Fragmentation**; file size cannot expand dynamically. |\n| **Linked Allocation** | Each disk block contains a data payload and a pointer to the next block. | Zero external fragmentation; dynamic growth. | Extremely slow random access ($O(N)$ traversal); pointer overhead; a single lost pointer corrupts entire file. |\n| **File Allocation Table (FAT)** | Pointers moved from data blocks into a central memory-resident table. | Fast directory search; simple. | Table can become large in RAM; still requires linked traversal. |\n| **Indexed Allocation** | Each file has an index block (or Inode) containing all block pointers. | Fast direct random access; zero external fragmentation. | Index block overhead for tiny files. |"
      },
      {
        "id": "os-5-4",
        "heading": "5.4 Mass-Storage Structure & Disk Access Latency Formulation",
        "content": "### Magnetic Hard Disk Drive (HDD) Geometry:\n- Rotating platters coated with magnetic material spinning at constant speed ($5400 - 15000\\text{ RPM}$).\n- Data organized in concentric circular **Tracks** divided into $512$-byte or $4096$-byte **Sectors**.\n- A vertical stack of identical tracks across all platters forms a **Cylinder**.\n\n### Total Disk Access Latency:\n$$T_{access} = T_{seek} + T_{rotational} + T_{transfer}$$\n\n1. **Seek Time ($T_{seek}$):** Time required for the mechanical actuator arm to position read/write heads over the target cylinder ($3 - 10\\text{ ms}$). Dominates access time!\n2. **Rotational Latency ($T_{rotational}$):** Average time waiting for the target sector to rotate underneath the head:\n   $$T_{rotational} = \\frac{1}{2 \\times \\text{RPM}} \\times 60\\text{ seconds}$$\n   For a $7200\\text{ RPM}$ disk: $T_{rot} = \\frac{60}{2 \\times 7200} = 4.17\\text{ ms}$.\n3. **Transfer Time ($T_{transfer}$):** Time to stream data bytes off the platter:\n   $$T_{transfer} = \\frac{b}{N \\times \\text{RPM}}$$"
      },
      {
        "id": "os-5-5",
        "heading": "5.5 Disk Scheduling Algorithms: SSTF, SCAN & LOOK",
        "content": "Disk scheduling reorders pending I/O track requests to minimize mechanical head movement (total head cylinders traversed).\n\n### Algorithm Comparison:\n1. **FCFS:** Serves requests strictly in arrival order. Fair, but wild mechanical swinging across platters.\n2. **SSTF (Shortest Seek Time First):** Selects the pending request closest to current head position. Minimizes average response time, but suffers from **Starvation** of distant cylinders!\n3. **SCAN (Elevator Algorithm):** Head moves in one direction across the disk, servicing all requests along the path until reaching the final cylinder, then reverses direction. Eliminates starvation.\n4. **C-SCAN (Circular SCAN):** Head sweeps in one direction servicing requests; upon hitting the disk boundary, it snaps directly back to cylinder 0 without servicing requests on the return trip. Delivers a more uniform wait time distribution.\n5. **LOOK / C-LOOK:** Like SCAN/C-SCAN, but the head reverses as soon as the last request in that direction is reached, without traveling all the way to the physical edge."
      }
    ]
  },
  "eceg5407-ch1": {
    "courseId": "eceg5407",
    "courseCode": "ECEg5407",
    "chapterNum": 1,
    "title": "Introduction to Machine Learning & Core Python Stack",
    "readTime": "11 min read",
    "cloRef": "CLO1: Define machine learning paradigms and utilize NumPy, Pandas, Scikit-Learn",
    "authoritativeSources": "Müller & Guido (Ch. 1); Bishop (Ch. 1); AASTU Slide Deck Ch. 1",
    "sections": [
      {
        "id": "ml-1-1",
        "heading": "1.1 Machine Learning Definition & The Paradigm Shift",
        "content": "Arthur Samuel (1959) defined **Machine Learning** as the *\"field of study that gives computers the ability to learn without being explicitly programmed.\"*\n\nTom Mitchell (1997) provided the operational engineering definition:\n> *A computer program is said to learn from experience $E$ with respect to some class of tasks $T$ and performance measure $P$, if its performance at tasks in $T$, as measured by $P$, improves with experience $E$.*\n\n### The Paradigm Shift: Classical Programming vs Machine Learning\n- **Classical Software Engineering:**\n  $$\\text{Rules (Algorithm)} + \\text{Data} \\longrightarrow \\text{Answers}$$\n  A human software engineer writes explicit `if-else` rules. Fails for perception tasks (e.g., distinguishing a cat from a dog in a $1000 \\times 1000$ pixel grid).\n- **Machine Learning Paradigm:**\n  $$\\text{Data} + \\text{Answers (Labels)} \\longrightarrow \\text{Rules (Learned Model Parameters } \\theta)$$\n  The algorithm automatically extracts statistical patterns and decision boundaries from historical training examples."
      },
      {
        "id": "ml-1-2",
        "heading": "1.2 Taxonomy of Machine Learning Paradigms",
        "content": "Machine learning problems are categorized into three broad paradigms based on supervision signal:\n\n| Paradigm | Nature of Training Data | Objective / Loss Function | Canonical Real-World Applications |\n|---|---|---|---|\n| **Supervised Learning** | Input features $X$ paired with ground-truth targets $y$: $\\mathcal{D} = \\{(x_i, y_i)\\}_{i=1}^N$ | Minimize prediction error: $\\min_\\theta \\sum \\mathcal{L}(f(x_i; \\theta), y_i)$ | **Classification:** Spam filtering, medical tumor diagnosis.<br>**Regression:** Stock price forecasting, housing appraisal. |\n| **Unsupervised Learning** | Unlabeled data points $X$ only: $\\mathcal{D} = \\{x_i\\}_{i=1}^N$ | Discover latent structure, probability density, or low-dimensional manifolds | **Clustering:** Customer market segmentation.<br>**Dimensionality Reduction:** PCA compression, gene expression visualization. |\n| **Reinforcement Learning** | No static dataset; an **Agent** interacts with a dynamic **Environment** | Maximize cumulative discounted future reward: $\\max_\\pi \\mathbb{E}\\left[\\sum_{t=0}^\\infty \\gamma^t R_t\\right]$ | Autonomous driving, robotic manipulation, AlphaGo, LLM RLHF fine-tuning. |"
      },
      {
        "id": "ml-1-3",
        "heading": "1.3 Mathematical Data Representation: Feature Matrices & Target Vectors",
        "content": "In Scikit-Learn and tabular machine learning:\n\n### 1. The Feature Matrix ($X$):\nRepresented as a 2-dimensional NumPy array or Pandas DataFrame of shape $(n_{samples}, n_{features})$:\n$$X = \\begin{bmatrix} x_{11} & x_{12} & \\dots & x_{1d} \\\\ x_{21} & x_{22} & \\dots & x_{2d} \\\\ \\vdots & \\vdots & \\ddots & \\vdots \\\\ x_{n1} & x_{n2} & \\dots & x_{nd} \\end{bmatrix} \\in \\mathbb{R}^{n \\times d}$$\n- Each **row** represents an individual sample/instance (e.g., a patient, an email).\n- Each **column** represents a quantitative feature/attribute (e.g., age, blood pressure, cholesterol).\n\n### 2. The Target Vector ($y$):\nA 1-dimensional array of length $n_{samples}$:\n$$y = [y_1, y_2, \\dots, y_n]^T \\in \\mathbb{R}^n$$\n- Continuous real values ($y_i \\in \\mathbb{R}$) for **Regression**.\n- Discrete categorical integers ($y_i \\in \\{0, 1, \\dots, K-1\\}$) for **Classification**."
      },
      {
        "id": "ml-1-4",
        "heading": "1.4 The Scientific Python Machine Learning Ecosystem",
        "content": "The Python machine learning stack is built on four core libraries:\n\n1. **NumPy (Numerical Python):** Provides the foundational $N$-dimensional array (`ndarray`) with C-speed vectorized contiguous memory operations and linear algebra routines (`np.linalg`).\n2. **Pandas:** High-performance tabular data structures (`DataFrame`, `Series`) providing SQL-like filtering, handling missing data (`NaN`), and merging datasets.\n3. **Scikit-Learn (`sklearn`):** The standard machine learning library designed with a uniform, object-oriented API:\n   - `Estimator.fit(X, y)`: Trains the model on historical training data.\n   - `Estimator.predict(X_new)`: Generates predictions on unseen test samples.\n   - `Transformer.transform(X)`: Applies data preprocessing (scaling, imputation).\n4. **Matplotlib & Seaborn:** Publication-quality scientific data visualization (scatter plots, heatmaps, decision boundaries)."
      },
      {
        "id": "ml-1-5",
        "heading": "1.5 Data Splitting & The Golden Rule of Machine Learning",
        "content": "### Train / Validation / Test Splitting:\nEvaluating a machine learning model on the exact same data used to train it is a fatal methodological error (equivalent to giving students exam questions before the test).\n- **Training Set ($60 - 80\\%$):** Used by the optimizer to adjust internal parameters $\\theta$.\n- **Validation Set ($10 - 20\\%$):** Used to tune hyper-parameters (e.g., $k$ in $k$-NN, regularization $\\lambda$) and perform early stopping.\n- **Test Set ($10 - 20\\%$):** Held out completely in a \"vault\" until final sign-off to provide an unbiased estimate of real-world generalization performance.\n\n> [!CAUTION]\n> **The Cardinal Rule Against Data Leakage:**\n> Any data transformation (e.g., calculating mean $\\mu$ and standard deviation $\\sigma$ for feature scaling) must be computed **ONLY from the training set** and then applied to the test set! Never scale before splitting!"
      }
    ]
  },
  "eceg5407-ch2": {
    "courseId": "eceg5407",
    "courseCode": "ECEg5407",
    "chapterNum": 2,
    "title": "Supervised Learning: Foundations, Bias-Variance & 6 Core Models",
    "readTime": "15 min read",
    "cloRef": "CLO2: Implement and evaluate supervised learning classification and regression algorithms",
    "authoritativeSources": "Müller & Guido (Ch. 2); Bishop (Ch. 3-4); Géron (Ch. 4-5); AASTU Slide Deck Ch. 2",
    "sections": [
      {
        "id": "ml-2-1",
        "heading": "2.1 The Bias-Variance Tradeoff & Generalization Error Decomposition",
        "content": "The fundamental challenge in supervised learning is balancing model complexity:\n\n### Mathematical Decomposition of Expected Test Error:\nFor true data generating process $y = f(x) + \\epsilon$, where $\\mathbb{E}[\\epsilon] = 0$ and $\\text{Var}(\\epsilon) = \\sigma^2$:\n$$\\mathbb{E}\\left[(y - \\hat{f}(x))^2\\right] = \\underbrace{\\left(\\text{Bias}[\\hat{f}(x)]\\right)^2}_{\\text{Underfitting}} + \\underbrace{\\text{Var}[\\hat{f}(x)]}_{\\text{Overfitting}} + \\underbrace{\\sigma^2}_{\\text{Irreducible Noise}}$$\n\n1. **Bias (Underfitting):** Error introduced by approximating a complex real-world phenomenon with an overly simplistic model (e.g., fitting a straight line to quadratic data). High training error, high test error.\n2. **Variance (Overfitting):** Sensitivity of the model to small fluctuations in the training dataset. The model memorizes training noise rather than the underlying pattern. Low training error, massive test error.\n3. **Irreducible Error ($\\sigma^2$):** Noise inherent in the physical measurement process."
      },
      {
        "id": "ml-2-2",
        "heading": "2.2 $k$-Nearest Neighbors ($k$-NN) Classification & Regression",
        "content": "$k$-NN is a **non-parametric, instance-based (lazy learning)** algorithm. It constructs no explicit model during training; it simply stores the entire dataset.\n\n### Algorithm Steps:\nTo predict target for query sample $x_q$:\n1. Calculate Euclidean distance $d(x_q, x_i)$ to all training points:\n   $$d(x_q, x_i) = \\sqrt{\\sum_{j=1}^d (x_{q,j} - x_{i,j})^2}$$\n2. Select the $k$ closest training points $\\mathcal{N}_k(x_q)$.\n3. **Classification:** Take the majority vote:\n   $$\\hat{y} = \\arg\\max_c \\sum_{i \\in \\mathcal{N}_k} \\mathbb{I}(y_i = c)$$\n4. **Regression:** Compute the local arithmetic average:\n   $$\\hat{y} = \\frac{1}{k} \\sum_{i \\in \\mathcal{N}_k} y_i$$\n\n> [!NOTE]\n> - Small $k$ (e.g., $k=1$): Extremely complex, jagged decision boundaries $\\implies$ **High Variance (Overfitting)**.\n> - Large $k$ (e.g., $k=100$): Overly smooth, rigid boundaries $\\implies$ **High Bias (Underfitting)**."
      },
      {
        "id": "ml-2-3",
        "heading": "2.3 Linear Regression, OLS Normal Equations & Regularization (L1 vs L2)",
        "content": "Linear regression models output as a linear combination of input features:\n$$\\hat{y} = w_0 + w_1 x_1 + w_2 x_2 + \\dots + w_d x_d = X w$$\n\n### 1. Ordinary Least Squares (OLS) Closed-Form Solution:\nMinimizes Residual Sum of Squares (RSS):\n$$\\mathcal{L}_{OLS}(w) = \\|y - Xw\\|^2 \\implies \\nabla_w \\mathcal{L} = -2X^T (y - Xw) = 0$$\nYielding the **Normal Equation**:\n$$w^* = (X^T X)^{-1} X^T y$$\n\n---\n\n### Regularization Techniques to Prevent Overfitting:\n1. **Ridge Regression (L2 Regularization):**\n   Adds squared penalty on weight magnitudes:\n   $$\\mathcal{L}_{Ridge}(w) = \\|y - Xw\\|^2 + \\alpha \\sum_{j=1}^d w_j^2 = \\|y - Xw\\|^2 + \\alpha \\|w\\|_2^2$$\n   Closed-form: $w_{Ridge} = (X^T X + \\alpha I)^{-1} X^T y$. Shrinks weights smoothly toward zero, mitigating collinearity.\n2. **Lasso Regression (L1 Regularization):**\n   Adds absolute value penalty:\n   $$\\mathcal{L}_{Lasso}(w) = \\|y - Xw\\|^2 + \\alpha \\sum_{j=1}^d |w_j|$$\n   > [!IMPORTANT]\n   > Because the L1 constraint region is a diamond with sharp vertices, Lasso drives non-essential weights **identically to ZERO**! Lasso functions as an automatic **feature selection algorithm**."
      },
      {
        "id": "ml-2-4",
        "heading": "2.4 Logistic Regression & Binary Cross-Entropy Loss",
        "content": "Despite its name, Logistic Regression is a **probabilistic binary classification algorithm**.\n\n### The Logistic / Sigmoid Function:\nMaps any real value $z \\in (-\\infty, +\\infty)$ into a calibrated probability $p \\in (0, 1)$:\n$$\\sigma(z) = \\frac{1}{1 + e^{-z}}$$\nWhere $z = w^T x + b$.\n\n### Binary Cross-Entropy Loss (Log Loss):\nBecause Mean Squared Error (MSE) produces a non-convex loss surface with numerous local minima when combined with the sigmoid function, Logistic Regression utilizes the convex **Negative Log-Likelihood**:\n$$\\mathcal{L}_{BCE}(w) = -\\frac{1}{n} \\sum_{i=1}^n \\left[ y_i \\ln(\\hat{p}_i) + (1 - y_i) \\ln(1 - \\hat{p}_i) \\right]$$\nOptimized using Gradient Descent:\n$$w := w - \\eta \\cdot \\frac{1}{n} X^T (\\sigma(Xw) - y)$$"
      },
      {
        "id": "ml-2-5",
        "heading": "2.5 Decision Trees & Support Vector Machines (SVM)",
        "content": "### 1. Decision Trees:\nHierarchical binary split models. At each node, the feature and split threshold are chosen to maximize **Information Gain** (minimizing node impurity):\n- **Gini Impurity (CART algorithm default):**\n  $$G = 1 - \\sum_{k=1}^K p_k^2$$\n- **Shannon Entropy (ID3 / C4.5):**\n  $$H = -\\sum_{k=1}^K p_k \\log_2(p_k)$$\n\n### 2. Support Vector Machines (SVM):\nFinds the unique hyperplane $w^T x + b = 0$ that separates classes while **maximizing the geometric margin** $\\frac{2}{\\|w\\|}$:\n$$\\min_{w, b} \\frac{1}{2} \\|w\\|^2 \\quad \\text{subject to } y_i(w^T x_i + b) \\ge 1, \\ \\forall i$$\n- **Support Vectors:** The critical training instances lying directly on the margin boundaries. All other data points can be deleted without altering the decision surface!\n- **The Kernel Trick:** Maps linearly non-separable input vectors into an infinite-dimensional feature space using Mercer kernels without computing the explicit mapping:\n  $$K(x, x') = e^{-\\gamma \\|x - x'\\|^2} \\quad (\\text{Radial Basis Function / RBF Kernel})$$"
      }
    ]
  },
  "eceg5407-ch3": {
    "courseId": "eceg5407",
    "courseCode": "ECEg5407",
    "chapterNum": 3,
    "title": "Unsupervised Learning, Preprocessing & Dimensionality Reduction",
    "readTime": "12 min read",
    "cloRef": "CLO3: Implement clustering, preprocessing, and PCA dimensionality reduction",
    "authoritativeSources": "Müller & Guido (Ch. 3); Bishop (Ch. 9, 12); Géron (Ch. 8-9); AASTU Syllabus",
    "sections": [
      {
        "id": "ml-3-1",
        "heading": "3.1 Feature Preprocessing & Scaling Techniques",
        "content": "Distance-based algorithms ($k$-NN, SVM, $k$-Means, PCA, Gradient Descent) are heavily distorted if features have mismatched numerical ranges (e.g., Age in $[20, 60]$ vs Annual Income in $[20,000, 200,000]$).\n\n### Common Scalers in Scikit-Learn:\n1. **StandardScaler (Z-Score Standardization):**\n   Transforms features to have zero mean and unit variance:\n   $$z = \\frac{x - \\mu}{\\sigma}$$\n2. **MinMaxScaler:**\n   Rescales features into a bounded interval $[0, 1]$:\n   $$x_{scaled} = \\frac{x - x_{min}}{x_{max} - x_{min}}$$\n   Highly sensitive to extreme outliers.\n3. **RobustScaler:**\n   Uses median and Interquartile Range (IQR = $Q_3 - Q_1$), making it immune to extreme anomalies:\n   $$x_{robust} = \\frac{x - Q_2}{Q_3 - Q_1}$$"
      },
      {
        "id": "ml-3-2",
        "heading": "3.2 $k$-Means Clustering & The Elbow Method",
        "content": "$k$-Means partitions $n$ unlabeled observations into $k$ distinct, non-overlapping clusters.\n\n### Mathematical Objective (Inertia / WCSS):\nMinimizes the Within-Cluster Sum of Squares (WCSS):\n$$\\mathcal{J} = \\sum_{j=1}^k \\sum_{x_i \\in S_j} \\|x_i - \\mu_j\\|^2$$\nWhere $\\mu_j$ is the centroid (mean) of cluster $S_j$.\n\n### Lloyd's Expectation-Maximization Iteration:\n1. Initialize $k$ cluster centroids randomly (or via **$k$-Means++**, which spaces initial centroids far apart proportionally to squared distance).\n2. **Assignment Step (E-step):** Assign each sample to its nearest centroid.\n3. **Update Step (M-step):** Recompute each centroid as the arithmetic mean of all samples assigned to that cluster.\n4. Repeat until centroids stop shifting.\n\n### Determining Optimal $k$:\n- **The Elbow Method:** Plot WCSS versus $k$. Select the bend (\"elbow\") where rate of inertia decrease levels off.\n- **Silhouette Coefficient ($s$):** Measures cohesion vs separation:\n  $$s(i) = \\frac{b(i) - a(i)}{\\max(a(i), b(i))} \\in [-1, +1]$$\n  Values close to $+1$ indicate well-clustered points."
      },
      {
        "id": "ml-3-3",
        "heading": "3.3 Hierarchical Clustering & DBSCAN Density Clustering",
        "content": "### 1. Agglomerative Hierarchical Clustering:\nBottom-up clustering: Starts with each sample as an individual cluster; iteratively merges the closest pair of clusters until one master cluster remains.\nVisualized via a **Dendrogram** (tree diagram where vertical branch height indicates distance between merged clusters).\n- **Linkage Criteria:** Ward's linkage (minimizes variance growth), Complete linkage (max pairwise distance), Average linkage.\n\n### 2. DBSCAN (Density-Based Spatial Clustering of Applications with Noise):\nGroups points that are packed closely together, marking points that lie alone in low-density regions as **outlier noise**.\n- Parameters: $\\epsilon$ (neighborhood radius) and `min_samples`.\n- Categorizes points into:\n  - **Core Points:** Have $\\ge \\text{min\\_samples}$ points within radius $\\epsilon$.\n  - **Border Points:** Within $\\epsilon$ of a core point, but fewer than `min_samples` neighbors.\n  - **Noise Points:** Neither core nor border points.\n- *Advantage:* Discovers clusters of arbitrary non-convex geometric shapes; does not require specifying $k$ in advance!"
      },
      {
        "id": "ml-3-4",
        "heading": "3.4 Principal Component Analysis (PCA) Derivation",
        "content": "**Principal Component Analysis (PCA)** is an orthogonal linear transformation that projects high-dimensional data into a lower-dimensional subspace while preserving maximum variance.\n\n### Mathematical Derivation via Covariance Eigen-Decomposition:\n1. Zero-center the feature matrix: $X_{centered} = X - \\bar{X}$.\n2. Compute the sample covariance matrix ($d \\times d$):\n   $$\\Sigma = \\frac{1}{n - 1} X_{centered}^T X_{centered}$$\n3. Perform Eigenvalue Decomposition on $\\Sigma$:\n   $$\\Sigma v_i = \\lambda_i v_i$$\n   Where $v_i$ are orthogonal eigenvectors (Principal Components) and $\\lambda_i$ are eigenvalues representing the variance explained along that axis.\n4. Sort eigenvalues in descending order: $\\lambda_1 \\ge \\lambda_2 \\ge \\dots \\ge \\lambda_d$.\n5. Construct projection matrix $W_k = [v_1, v_2, \\dots, v_k]$ ($d \\times k$).\n6. Project data:\n   $$X_{reduced} = X_{centered} \\cdot W_k \\in \\mathbb{R}^{n \\times k}$$\n\n### Explained Variance Ratio:\n$$\\text{EVR}_j = \\frac{\\lambda_j}{\\sum_{i=1}^d \\lambda_i}$$"
      },
      {
        "id": "ml-3-5",
        "heading": "3.5 Non-Linear Dimensionality Reduction: t-SNE for Visualization",
        "content": "While PCA finds linear projections, **t-SNE (t-Distributed Stochastic Neighbor Embedding)** captures non-linear manifold topologies:\n- Converts Euclidean distances between data points into conditional probabilities representing similarities.\n- Uses Student-t distribution in the low-dimensional space to solve the \"crowding problem\".\n- Outstanding for creating 2D visualization scatter plots of complex high-dimensional datasets (e.g., MNIST digit clusters)."
      }
    ]
  },
  "eceg5407-ch4": {
    "courseId": "eceg5407",
    "courseCode": "ECEg5407",
    "chapterNum": 4,
    "title": "Model Evaluation, Cross-Validation & Hyperparameter Tuning",
    "readTime": "12 min read",
    "cloRef": "CLO4: Evaluate ML models using cross-validation, confusion matrices, and ROC-AUC",
    "authoritativeSources": "Müller & Guido (Ch. 5); Géron (Ch. 2-3); AASTU Syllabus",
    "sections": [
      {
        "id": "ml-4-1",
        "heading": "4.1 Cross-Validation Protocols ($k$-Fold & Stratified)",
        "content": "A single train-test split can yield misleading performance estimates due to lucky or unlucky data partitioning.\n\n### $k$-Fold Cross-Validation:\n1. Partition dataset randomly into $k$ equal-sized folds (typically $k = 5$ or $k = 10$).\n2. Train on $k-1$ folds; evaluate on the remaining held-out fold.\n3. Repeat $k$ times such that every fold serves as the validation test set exactly once.\n4. Final performance is the mean and standard deviation:\n   $$\\bar{P} = \\frac{1}{k} \\sum_{i=1}^k P_i \\pm \\sigma_P$$\n\n### Stratified $k$-Fold Cross-Validation:\nFor imbalanced classification datasets (e.g., $95\\%$ benign, $5\\%$ malignant cancer), standard random splitting can create folds with zero minority samples.\n**Stratified $k$-Fold** guarantees that every fold contains the exact same percentage proportion of each target class as the complete dataset."
      },
      {
        "id": "ml-4-2",
        "heading": "4.2 Classification Metrics: The Confusion Matrix, Precision & Recall",
        "content": "Accuracy ($\\frac{\\text{Correct}}{\\text{Total}}$) is completely misleading on skewed datasets (e.g., a model that always predicts \"no fraud\" achieves $99.9\\%$ accuracy on a fraud detection dataset).\n\n### The Confusion Matrix:\n| | Predicted Negative (0) | Predicted Positive (1) |\n|---|---|---|\n| **Actual Negative (0)** | **True Negative (TN)** | **False Positive (FP)** (Type I Error) |\n| **Actual Positive (1)** | **False Negative (FN)** (Type II Error) | **True Positive (TP)** |\n\n### Mathematical Metrics:\n1. **Precision:** Out of all positive predictions, how many were genuinely positive?\n   $$\\text{Precision} = \\frac{TP}{TP + FP}$$\n   Crucial when False Positives are expensive (e.g., spam filter deleting critical emails).\n2. **Recall / Sensitivity:** Out of all actual positive cases, how many did the model find?\n   $$\\text{Recall} = \\frac{TP}{TP + FN}$$\n   Crucial when False Negatives are fatal (e.g., cancer diagnosis, bridge crack detection).\n3. **$F_1$-Score:** Harmonic mean of Precision and Recall:\n   $$F_1 = 2 \\cdot \\frac{\\text{Precision} \\cdot \\text{Recall}}{\\text{Precision} + \\text{Recall}} = \\frac{2TP}{2TP + FP + FN}$$"
      },
      {
        "id": "ml-4-3",
        "heading": "4.3 ROC Curves, Precision-Recall Curves & Area Under Curve (AUC)",
        "content": "Binary classifiers generate a continuous confidence score $\\hat{p} \\in [0, 1]$. Classifying as positive requires selecting a **Decision Threshold** (default = $0.5$).\n\n### The Receiver Operating Characteristic (ROC) Curve:\nPlots **True Positive Rate (Recall)** versus **False Positive Rate (FPR)** across all possible classification thresholds from $0.0$ to $1.0$:\n$$\\text{TPR} = \\frac{TP}{TP + FN}, \\quad \\text{FPR} = \\frac{FP}{FP + TN}$$\n- **Random Guessing:** Diagonal line from $(0,0)$ to $(1,1)$ with $\\text{AUC} = 0.50$.\n- **Perfect Classifier:** Steps straight up to $(0,1)$ and right to $(1,1)$ with $\\text{AUC} = 1.00$."
      },
      {
        "id": "ml-4-4",
        "heading": "4.4 Regression Performance Metrics: MAE, MSE, RMSE & $R^2$",
        "content": "| Metric | Mathematical Formula | Physical Interpretation |\n|---|---|---|\n| **Mean Absolute Error (MAE)** | $\\frac{1}{n} \\sum_{i=1}^n \\|y_i - \\hat{y}_i\\|$ | Average magnitude of errors in original physical units; robust to outliers. |\n| **Mean Squared Error (MSE)** | $\\frac{1}{n} \\sum_{i=1}^n (y_i - \\hat{y}_i)^2$ | Heavily penalizes large outlier errors due to squaring. |\n| **Root Mean Squared Error (RMSE)** | $\\sqrt{\\frac{1}{n} \\sum_{i=1}^n (y_i - \\hat{y}_i)^2}$ | Standard deviation of residuals; in original units. |\n| **Coefficient of Determination ($R^2$)** | $1 - \\frac{\\sum (y_i - \\hat{y}_i)^2}{\\sum (y_i - \\bar{y})^2}$ | Fraction of target variance explained by model ($R^2 \\le 1.0$). Baseline mean model has $R^2 = 0$. |"
      },
      {
        "id": "ml-4-5",
        "heading": "4.5 Hyperparameter Tuning: GridSearchCV vs RandomizedSearchCV",
        "content": "- **Parameters:** Learned automatically from data during training (weights $w$, bias $b$).\n- **Hyperparameters:** Configured manually before training ($k$ in $k$-NN, tree depth, learning rate $\\eta$, regularization $\\alpha$).\n\n### Tuning Strategies:\n1. **GridSearchCV:** Exhaustively evaluates all Cartesian combinations of candidate values across $k$-fold cross-validation. Computationally expensive ($O(\\prod |V_i|)$).\n2. **RandomizedSearchCV:** Samples a fixed budget of random hyperparameter combinations from specified statistical distributions. Significantly faster and frequently finds superior optima in high-dimensional spaces."
      }
    ]
  },
  "eceg5407-ch5": {
    "courseId": "eceg5407",
    "courseCode": "ECEg5407",
    "chapterNum": 5,
    "title": "Deep Learning Fundamentals & Neural Networks",
    "readTime": "14 min read",
    "cloRef": "CLO5: Analyze artificial neural networks, backpropagation, and deep architectures",
    "authoritativeSources": "Ian Goodfellow, Yoshua Bengio, Aaron Courville: Deep Learning (MIT Press); Bishop (Ch. 5)",
    "sections": [
      {
        "id": "ml-5-1",
        "heading": "5.1 The Biological Neuron & The Artificial Perceptron",
        "content": "Frank Rosenblatt (1958) created the **Perceptron**, the foundational building block of artificial neural networks:\n\n### Mathematical Model of a Neuron:\nInputs $x_1, x_2, \\dots, x_d$ are multiplied by synaptic weights $w_j$, summed with bias $b$, and passed through non-linear activation function $f$:\n$$z = \\sum_{j=1}^d w_j x_j + b = w^T x + b$$\n$$a = f(z)$$\n\n### The XOR Inseparability Crisis (Minsky & Papert 1969):\nA single-layer perceptron can only learn **linearly separable decision boundaries**. Marvin Minsky proved that a single perceptron cannot learn the simple Exclusive-OR (XOR) logic gate, stalling neural network research for a decade until the discovery of Multi-Layer Perceptrons trained via Backpropagation."
      },
      {
        "id": "ml-5-2",
        "heading": "5.2 Activation Functions Taxonomy & Vanishing Gradients",
        "content": "Without non-linear activation functions, a neural network with 100 stacked layers is mathematically identical to a single linear regression model ($W_2(W_1 x) = W_{combined} x$).\n\n| Activation Function | Formula | Output Range | Key Advantages & Fatal Vulnerabilities |\n|---|---|---|---|\n| **Sigmoid** | $\\sigma(z) = \\frac{1}{1 + e^{-z}}$ | $(0, 1)$ | Smooth probabilistic interpretation. **Fatal: Vanishing Gradient Problem** (derivative saturates to 0 for $|z| > 4$, killing gradient flow). |\n| **Tanh** | $\\tanh(z) = \\frac{e^z - e^{-z}}{e^z + e^{-z}}$ | $(-1, +1)$ | Zero-centered outputs (speeds up gradient convergence). Still suffers from gradient saturation. |\n| **ReLU (Rectified Linear)** | $\\max(0, z)$ | $[0, +\\infty)$ | **Modern Standard:** Constant derivative of 1 for $z > 0$, completely eliminating vanishing gradients! Blazing fast compute. Suffers from \"Dying ReLU\" if neurons get stuck below 0. |\n| **Leaky ReLU** | $\\max(\\alpha z, z)$ | $(-\\infty, +\\infty)$ | Introduces small slope ($\\alpha = 0.01$) for $z < 0$, preventing dead neurons. |\n| **Softmax** | $\\frac{e^{z_i}}{\\sum_j e^{z_j}}$ | $(0, 1); \\sum = 1$ | Exclusively used in the output layer for multi-class classification. |"
      },
      {
        "id": "ml-5-3",
        "heading": "5.3 Multi-Layer Perceptrons & The Backpropagation Algorithm",
        "content": "**Backpropagation** (Rumelhart, Hinton, Williams 1986) computes the exact partial derivatives of the scalar loss $\\mathcal{L}$ with respect to every weight in the network by applying the **Multivariate Chain Rule of Calculus** backwards:\n\n### Forward Pass:\n$$z^{[l]} = W^{[l]} a^{[l-1]} + b^{[l]}, \\quad a^{[l]} = f(z^{[l]})$$\n\n### Backward Pass (Propagating Errors):\nFor output layer $L$:\n$$\\delta^{[L]} = \\frac{\\partial \\mathcal{L}}{\\partial z^{[L]}} = \\nabla_a \\mathcal{L} \\odot f'(z^{[L]})$$\nFor hidden layers $l = L-1, \\dots, 1$:\n$$\\delta^{[l]} = \\left( (W^{[l+1]})^T \\delta^{[l+1]} \\right) \\odot f'(z^{[l]})$$\nThe gradient with respect to layer weights is the outer product:\n$$\\frac{\\partial \\mathcal{L}}{\\partial W^{[l]}} = \\delta^{[l]} (a^{[l-1]})^T, \\quad \\frac{\\partial \\mathcal{L}}{\\partial b^{[l]}} = \\delta^{[l]}$$"
      },
      {
        "id": "ml-5-4",
        "heading": "5.4 Deep Optimization Algorithms (SGD, Momentum, Adam)",
        "content": "1. **Stochastic Gradient Descent (SGD):**\n   Updates weights on small mini-batches of data:\n   $$\\theta := \\theta - \\eta \\nabla_\\theta \\mathcal{L}(\\theta)$$\n   Can oscillate violently across narrow ravines.\n2. **Momentum Optimization:**\n   Accelerates SGD in the direction of persistent gradients by accumulating velocity vector $v$:\n   $$v := \\beta v + \\eta \\nabla_\\theta \\mathcal{L}, \\quad \\theta := \\theta - v$$\n3. **Adam (Adaptive Moment Estimation - Kingma & Ba 2014):**\n   Combines Momentum (first moment $m_t$) and RMSProp (uncentered second moment $v_t$) with bias correction:\n   $$m_t = \\beta_1 m_{t-1} + (1 - \\beta_1) g_t, \\quad v_t = \\beta_2 v_{t-1} + (1 - \\beta_2) g_t^2$$\n   $$\\hat{m}_t = \\frac{m_t}{1 - \\beta_1^t}, \\quad \\hat{v}_t = \\frac{v_t}{1 - \\beta_2^t}$$\n   $$\\theta := \\theta - \\frac{\\eta}{\\sqrt{\\hat{v}_t} + \\epsilon} \\hat{m}_t$$\n   The de facto standard optimizer across modern deep learning."
      },
      {
        "id": "ml-5-5",
        "heading": "5.5 Deep Regularization: Dropout & Batch Normalization",
        "content": "- **Dropout (Srivastava & Hinton 2014):** During each training pass, randomly deactivates each neuron with probability $p$ (typically $p=0.5$). Prevents complex co-adaptations of neurons, acting as an ensemble of $2^N$ sub-networks.\n- **Batch Normalization (Ioffe & Szegedy 2015):** Normalizes layer inputs across the mini-batch to zero mean and unit variance before the activation function:\n  $$\\hat{x} = \\frac{x - \\mu_B}{\\sqrt{\\sigma_B^2 + \\epsilon}}, \\quad y = \\gamma \\hat{x} + \\beta$$\n  Drastically mitigates internal covariate shift, allowing $10\\times$ higher learning rates."
      }
    ]
  },
  "eceg5409-ch1": {
    "courseId": "eceg5409",
    "courseCode": "ECEg5409",
    "chapterNum": 1,
    "title": "Software Processes, Project Planning & Estimation",
    "readTime": "13 min read",
    "cloRef": "CLO1, CLO2, CLO3: Software scope, estimation techniques, risk analysis, and scheduling",
    "authoritativeSources": "Pressman (Ch. 2-5, 26-27); Sommerville (Ch. 2, 22-23); Schach (Ch. 1-3, 9); AASTU Syllabus",
    "sections": [
      {
        "id": "se-1-1",
        "heading": "1.1 The Software Crisis & Software Process Models",
        "content": "The **Software Crisis** (NATO Science Committee, Garmisch 1968) arose when software projects routinely exceeded budgets, slipped past delivery deadlines, caused catastrophic system failures, and proved impossible to maintain. **Software Engineering** emerged to apply disciplined, systematic, quantifiable engineering methodologies to software construction.\n\n### Primary Software Life Cycle Models:\n| Process Model | Operational Philosophy | Key Strengths | Fatal Vulnerabilities & Ideal Use Cases |\n|---|---|---|---|\n| **Classical Waterfall** | Strict linear sequential phases (Requirements $\\to$ Design $\\to$ Code $\\to$ Test $\\to$ Deploy). | Clean documentation; milestone clarity for fixed projects. | **Zero Tolerance for Requirement Changes:** Working software appears only at the very end; late integration failures. |\n| **V-Model (Verification & Validation)** | Bends the waterfall upwards, pairing every development phase directly with a corresponding testing phase. | Explicit test planning upfront (Unit tests derived from detail design, Acceptance tests from requirements). | Still rigid and sequential. |\n| **Prototyping Model** | Rapid mockups built iteratively to elicit ambiguous customer requirements. | Excellent customer feedback and requirement clarity. | Risk that prototype code is rushed into production without refactoring. |\n| **Spiral Model (Barry Boehm 1988)** | Risk-driven cyclic process divided into four quadrants: Determine Objectives $\\to$ Risk Analysis $\\to$ Engineering $\\to$ Customer Evaluation. | Superb risk management for large, high-consequence, mission-critical systems. | Expensive; requires deep risk assessment expertise. |\n| **Agile (Scrum / Kanban / XP)** | Adaptive, iterative development producing working software in short $1 - 4$ week **Sprints**. Embraces changing requirements. | Rapid time-to-market; continuous stakeholder feedback. | Vulnerable to scope creep; minimal formal documentation for enterprise audits. |"
      },
      {
        "id": "se-1-2",
        "heading": "1.2 Software Scope Management & Work Breakdown Structure (WBS)",
        "content": "### Software Scope Definition:\nDefines the functional boundaries, deliverables, data inputs/outputs, performance constraints, and external system interfaces.\n- **Feasibility Study (TELOS Framework):**\n  - **T - Technical:** Do we possess the hardware, libraries, and engineering expertise?\n  - **E - Economic:** Cost-benefit analysis; Return on Investment (ROI); Net Present Value (NPV).\n  - **L - Legal:** Copyrights, licensing (GPL vs MIT), data privacy compliance (GDPR, Ethiopian data protection regulations).\n  - **O - Operational:** Will end-users embrace the software in their operational workflow?\n  - **S - Schedule:** Can the system be deployed before the market opportunity closes?\n\n### The Work Breakdown Structure (WBS):\nA hierarchical decomposition of the total project scope into manageable work packages. A work package must have a measurable completion milestone, a single assigned owner, and an estimated duration ($1 - 2$ person-weeks)."
      },
      {
        "id": "se-1-3",
        "heading": "1.3 Software Estimation Techniques: Function Points & Boehm's COCOMO",
        "content": "Software cost estimation determines the required effort (person-months) and development schedule.\n\n### 1. Function Point Analysis (FPA - Allan Albrecht):\nMeasures software size from the user's perspective, independent of programming language:\n$$\\text{Unadjusted Function Points (UFP)} = \\sum_{i=1}^5 w_i \\cdot C_i$$\nCategorizes functionality into 5 components:\n1. **External Inputs (EI):** User data entry, control screens.\n2. **External Outputs (EO):** Reports, calculated summaries.\n3. **External Inquiries (EQ):** Database search queries with immediate responses.\n4. **Internal Logical Files (ILF):** User-identifiable logical data stored inside the system.\n5. **External Interface Files (EIF):** Data shared across system boundaries.\n\n$$\\text{Final FP} = \\text{UFP} \\times \\left( 0.65 + 0.01 \\times \\sum_{i=1}^{14} F_i \\right)$$\nWhere $\\sum F_i$ represents 14 General System Characteristics (GSCs) graded $0$ to $5$.\n\n---\n\n### 2. Boehm's COCOMO I (Constructive Cost Model):\nRelates effort ($E$ in Person-Months) and development time ($T_{dev}$ in months) to thousands of delivered source lines of code (KLOC):\n\n$$E = a \\cdot (\\text{KLOC})^b \\quad [\\text{Person-Months}]$$\n$$T_{dev} = c \\cdot (E)^d \\quad [\\text{Months}]$$\n\n| Project Mode | Description & Complexity | $a$ | $b$ | $c$ | $d$ |\n|---|---|---|---|---|---|\n| **Organic** | Small, experienced team working in familiar environment with flexible requirements ($< 50\\text{ KLOC}$). | $2.4$ | $1.05$ | $2.5$ | $0.38$ |\n| **Semi-Detached** | Medium-sized team with mixed experience and moderate interface constraints ($50 - 300\\text{ KLOC}$). | $3.0$ | $1.12$ | $2.5$ | $0.35$ |\n| **Embedded** | Tight hardware/software coupling; severe constraints; flight control, medical systems ($> 300\\text{ KLOC}$). | $3.6$ | $1.20$ | $2.5$ | $0.32$ |\n\n---\n\n### 🧮 Worked Numerical Problem:\n**Problem:** An AASTU student team is estimating an embedded automotive telemetry controller.\n- Code size is estimated at $40\\text{ KLOC}$.\n- System is classified under **Embedded Mode** ($a = 3.6, b = 1.20, c = 2.5, d = 0.32$).\nCalculate: (a) Total effort in Person-Months ($E$), (b) Development duration in months ($T_{dev}$), (c) Recommended team size.\n\n**Solution:**\n1. **Effort ($E$):**\n   $$E = 3.6 \\times (40)^{1.20}$$\n   Since $40^{1.20} \\approx 82.86$:\n   $$E = 3.6 \\times 82.86 \\approx 298.3\\text{ Person-Months}$$\n\n2. **Development Duration ($T_{dev}$):**\n   $$T_{dev} = 2.5 \\times (298.3)^{0.32}$$\n   Since $(298.3)^{0.32} \\approx 6.18$:\n   $$T_{dev} = 2.5 \\times 6.18 \\approx 15.45\\text{ Months}$$\n\n3. **Recommended Full-Time Team Size:**\n   $$\\text{Staff Size} = \\frac{E}{T_{dev}} = \\frac{298.3}{15.45} \\approx 19.3 \\implies 19 - 20\\text{ engineers}$$"
      },
      {
        "id": "se-1-4",
        "heading": "1.4 Software Project Scheduling & Critical Path Method (CPM / PERT)",
        "content": "Software project scheduling decomposes project activities into dependency networks:\n\n### Critical Path Method (CPM):\n- **Activity Network Graph:** Nodes represent milestones; directed edges represent activities with durations $t$.\n- **Early Start ($ES$):** Earliest time an activity can start (calculated via Forward Pass):\n  $$ES_j = \\max_{i \\in Pred(j)} (ES_i + t_i)$$\n- **Late Start ($LS$):** Latest time an activity can start without delaying project completion (calculated via Backward Pass):\n  $$LF_i = \\min_{j \\in Succ(i)} (LS_j), \\quad LS_i = LF_i - t_i$$\n- **Total Float / Slack Time ($S$):**\n  $$S = LS - ES = LF - EF$$\n- **The Critical Path:** The continuous sequence of activities from start to finish with **Zero Slack ($S = 0$)**. Any delay in a critical activity directly delays project delivery!"
      },
      {
        "id": "se-1-5",
        "heading": "1.5 Software Risk Analysis & Mitigation Strategies",
        "content": "### Risk Management Lifecycle:\n1. **Risk Identification:** Brainstorming potential threats (Staff turnover, Unrealistic deadlines, Requirement volatility, Vendor tool obsolescence).\n2. **Risk Projection / Assessment:** Quantifying Risk Exposure ($RE$):\n   $$RE = P(\\text{Risk}) \\times \\text{Impact (\\$ or Days)}$$\n3. **Risk Mitigation, Monitoring & Management (RMMM Plan):**\n   - *Mitigation:* Proactive steps to reduce risk probability (e.g., cross-training developers to prevent bus-factor failure).\n   - *Contingency:* Pre-planned recovery actions if the risk occurs."
      }
    ]
  },
  "eceg5409-ch2": {
    "courseId": "eceg5409",
    "courseCode": "ECEg5409",
    "chapterNum": 2,
    "title": "Software Requirements Engineering & Specification (SRS)",
    "readTime": "12 min read",
    "cloRef": "CLO1, CLO4: Requirements elicitation, IEEE 830 specification, and validation",
    "authoritativeSources": "Pressman (Ch. 6-7); Sommerville (Ch. 4); IEEE Std 830-1998 / ISO/IEC/IEEE 29148; AASTU Syllabus",
    "sections": [
      {
        "id": "se-2-1",
        "heading": "2.1 The Requirements Engineering Lifecycle",
        "content": "**Requirements Engineering (RE)** is the disciplined process of discovering, analyzing, documenting, and validating the services a software system must provide and the operational constraints under which it must function.\n\n### Five Core Phases of RE:\n1. **Inception & Elicitation:** Engaging stakeholders through interviews, focus groups, Joint Application Development (JAD) workshops, questionnaires, and observation to extract latent customer needs.\n2. **Analysis & Negotiation:** Resolving conflicts between competing stakeholder requirements (e.g., marketing demands 50 new features; engineering has an 8-week delivery deadline).\n3. **Specification:** Authoring the formal, unambiguous Software Requirements Specification (SRS) document.\n4. **Validation:** Reviewing and inspecting the SRS with customers to verify that the requirements describe the intended system before coding commences.\n5. **Requirements Management:** Controlling changing requirements through formal change request workflows and traceability matrices."
      },
      {
        "id": "se-2-2",
        "heading": "2.2 Functional vs Non-Functional Requirements (The FURPS+ Framework)",
        "content": "### 1. Functional Requirements:\nStatements of explicit services the system must execute—how the system responds to specific inputs, calculations, and state transitions.\n*Examples:* \"The system shall authenticate users via biometric fingerprint within 500 ms; The system shall calculate compound loan interest using Ethiopian Commercial Code regulations.\"\n\n### 2. Non-Functional Requirements (NFRs / Quality Attributes):\nConstraints imposed on the system services or development process.\nHewlett-Packard established the **FURPS+ Quality Model**:\n- **F - Functionality:** Feature set, capabilities, security.\n- **U - Usability:** Human factors, UI aesthetics, accessibility, user documentation, error messaging.\n- **R - Reliability:** MTBF, Mean Time to Repair (MTTR), failure frequency, data integrity.\n- **P - Performance:** Transaction throughput, response latency, memory footprint, CPU utilization.\n- **S - Supportability:** Modularity, extensibility, testability, maintainability, internationalization.\n- **+ (Constraints):** Design constraints (e.g., must run on Linux ARM64), implementation constraints (must be written in Rust), legal constraints."
      },
      {
        "id": "se-2-3",
        "heading": "2.3 The IEEE 830 Standard for Software Requirements Specification (SRS)",
        "content": "The **IEEE Std 830-1998** establishes the international benchmark structure for an SRS document:\n\n```\n1. Introduction\n   1.1 Purpose\n   1.2 Scope\n   1.3 Definitions, Acronyms, and Abbreviations\n   1.4 References\n   1.5 Overview\n2. Overall Description\n   2.1 Product Perspective (System interfaces, user interfaces, hardware interfaces)\n   2.2 Product Functions (High-level summary)\n   2.3 User Characteristics\n   2.4 General Constraints (Regulatory policies, hardware limitations)\n   2.5 Assumptions and Dependencies\n3. Specific Requirements\n   3.1 External Interface Requirements\n   3.2 Functional Requirements (Detailed behavioral descriptions)\n   3.3 Performance Requirements\n   3.4 Design Constraints\n   3.5 Software System Quality Attributes (Security, maintainability, availability)\n   3.6 Other Requirements (Database, internationalization)\n```\n\n---\n\n### Characteristics of a Superior SRS:\n- **Unambiguous:** Every requirement statement has only one possible interpretation.\n- **Complete:** All significant requirements (including error responses and exception handling) are specified.\n- **Consistent:** No requirement conflicts with another requirement.\n- **Verifiable / Testable:** There exists a finite, cost-effective physical test to confirm compliance (avoid vague terms like \"user-friendly\" or \"blazing fast\").\n- **Traceable:** Each requirement possesses a unique identifier (e.g., `REQ-AUTH-004`) allowing backward and forward tracking."
      },
      {
        "id": "se-2-4",
        "heading": "2.4 Use Case Modeling & Behavioral Scenarios",
        "content": "Ivar Jacobson (1992) introduced **Use Case Analysis** to model user interactions with a system:\n\n### Key Components of a Use Case:\n- **Actors:** Entities outside the system that interact with it (Users, external APIs, hardware clocks).\n- **Primary Actor:** The actor who initiates the interaction to achieve a business goal.\n- **Preconditions:** What must be true before the use case can execute.\n- **Main Success Scenario (Happy Path):** The typical sequence of numbered interaction steps leading to goal fulfillment.\n- **Extensions / Alternate Flows:** Handling validation failures, timeouts, and edge cases.\n- **UML Relationships:**\n  - `<<include>>`: Mandatory sub-routine shared across multiple use cases (e.g., *Checkout* `<<include>>` *Authenticate User*).\n  - `<<extend>>`: Optional or conditional behavior triggered under specific conditions (e.g., *Book Flight* `<<extend>>` *Purchase Travel Insurance*)."
      },
      {
        "id": "se-2-5",
        "heading": "2.5 Requirements Traceability Matrices (RTM)",
        "content": "A **Requirements Traceability Matrix (RTM)** is a grid table that links each individual requirement identifier to its corresponding design components, source code modules, and test case verification suites:\n\n$$\\text{User Need } \\longleftrightarrow \\text{SRS Req } \\longleftrightarrow \\text{Design Module } \\longleftrightarrow \\text{Code File } \\longleftrightarrow \\text{Test Case}$$\n\n- **Forward Traceability:** Ensures that every agreed customer requirement is actually designed, coded, and tested (detects missing functionality).\n- **Backward Traceability:** Ensures that no unauthorized code or \"gold-plating\" is added by developers without corresponding customer requirements."
      }
    ]
  },
  "eceg5409-ch3": {
    "courseId": "eceg5409",
    "courseCode": "ECEg5409",
    "chapterNum": 3,
    "title": "Architectural Design, Modular Decomposition & UML Modeling",
    "readTime": "13 min read",
    "cloRef": "CLO5: Architectural styles, modular decomposition, and UML structural/behavioral modeling",
    "authoritativeSources": "Pressman (Ch. 8-10); Sommerville (Ch. 6); Schach (Ch. 7-8); Booch, Rumbaugh, Jacobson (UML Guide)",
    "sections": [
      {
        "id": "se-3-1",
        "heading": "3.1 Fundamental Design Principles: Abstraction & Information Hiding",
        "content": "Software design transforms requirements into an architectural blueprint.\n\n### Core Architectural Principles:\n1. **Abstraction:** Isolating essential high-level behavioral patterns while suppressing low-level implementation details.\n2. **Information Hiding (David Parnas 1972):**\n   > *Each module should hide a critical design decision from all other modules.*\n   Modules interact strictly through well-defined public interfaces. Internal data structures (e.g., switching from a linked list to a hash map) can be refactored with zero impact on client modules.\n3. **Separation of Concerns (SoC):** Dividing a software application into distinct features that overlap in functionality as little as possible (e.g., separating business logic from database persistence and UI rendering)."
      },
      {
        "id": "se-3-2",
        "heading": "3.2 Modular Decomposition Metrics: Coupling vs Cohesion",
        "content": "The golden rule of modular design is: **MAXIMIZE COHESION, MINIMIZE COUPLING!**\n\n### 1. Cohesion (Internal Strength of a Module):\nThe degree to which the internal elements of a module belong together. Ranked from worst to best:\n- **Coincidental Cohesion (Worst):** Elements grouped randomly with zero relationship (`UtilityHelper.cs`).\n- **Logical Cohesion:** Elements perform logically similar tasks (e.g., a function handling all mouse, keyboard, and network input via a giant switch statement).\n- **Temporal Cohesion:** Elements executed at the same time (e.g., `initializeEverything()`).\n- **Procedural Cohesion:** Elements executed in a mandatory sequence.\n- **Communicational Cohesion:** Elements operate on the exact same input dataset.\n- **Sequential Cohesion:** The output of one element serves as the input to the next element.\n- **Functional Cohesion (Best):** The module performs **exactly one well-defined, atomic function** (e.g., `calculateSine()`, `verifyHash()`).\n\n---\n\n### 2. Coupling (Interdependence Between Modules):\nThe degree of direct connection between separate modules. Ranked from worst to best:\n- **Content Coupling (Worst):** One module directly modifies or accesses the internal private memory/code of another module!\n- **Common Coupling:** Multiple modules share read/write access to global variables.\n- **Control Coupling:** One module passes a control flag (`bool doModeA`) dictating the internal logic flow of another module.\n- **Stamp Coupling:** Modules pass composite data structures (e.g., passing a complete `CustomerRecord` object when the function only needs the `customerID`).\n- **Data Coupling (Best):** Modules communicate strictly by passing minimal, primitive scalar parameters."
      },
      {
        "id": "se-3-3",
        "heading": "3.3 Major Software Architectural Styles",
        "content": "| Architectural Pattern | Structural Topology | Advantages | Vulnerabilities & Tradeoffs |\n|---|---|---|---|\n| **Layered (N-Tier)** | Organized in hierarchical horizontal layers (Presentation $\\to$ Application/Business $\\to$ Persistence $\\to$ Database). | Modular; layers can be modified or replaced independently. | Performance overhead from cascading requests through all intermediate layers. |\n| **Client-Server** | Centralized server provides services to distributed thin or thick clients. | Centralized database management; easy security enforcement. | Server is a potential single point of failure and bottleneck. |\n| **Pipe-and-Filter** | Data stream enters pipeline and is processed by sequential, independent filter components. | Reusable filters; easily parallelized. | Inefficient if filters must repeatedly convert data formats. *(UNIX bash pipes)* |\n| **Event-Driven / Pub-Sub** | Decoupled publishers broadcast events to an asynchronous message broker (Kafka/RabbitMQ); subscribed consumers react. | Extremely high scalability, loose coupling, asynchronous responsiveness. | Difficult to debug; non-deterministic message arrival ordering. |\n| **Model-View-Controller (MVC)** | Decouples data model ($M$), visual user interface ($V$), and user input handling ($C$). | Parallel front-end and back-end development; multiple views for identical data. | Added structural complexity for tiny applications. |\n| **Microservices** | Application decomposed into an ecosystem of small, independently deployable services communicating over HTTP/gRPC. | Independent technology stacks; elastic horizontal scaling; fault isolation. | Distributed network latency, data consistency (CAP theorem), complex CI/CD orchestration. |"
      },
      {
        "id": "se-3-4",
        "heading": "3.4 Object-Oriented Modeling with UML Structural Diagrams",
        "content": "The **Unified Modeling Language (UML)** is the international standard notation for software blueprints.\n\n### The UML Class Diagram:\nRepresents the static structural schema of classes, attributes, methods, and relationships:\n\n```\n┌──────────────────────────────────────┐\n│             BankAccount              │\n├──────────────────────────────────────┤\n│ - accountNumber : String             │\n│ - balance       : Double             │\n├──────────────────────────────────────┤\n│ + deposit(amount: Double) : Boolean  │\n│ + withdraw(amount: Double): Boolean  │\n└──────────────────────────────────────┘\n```\n- Visibility notation: `+` (public), `-` (private), `#` (protected), `~` (package).\n\n### Class Relationships:\n1. **Inheritance / Generalization (Solid line with hollow triangle):** An \"is-a\" relationship (`SavingsAccount` is-a `BankAccount`).\n2. **Realization (Dashed line with hollow triangle):** A class implements an interface.\n3. **Association (Solid line with open arrow):** A structural relationship where one class uses services of another.\n4. **Aggregation (Solid line with hollow diamond):** A \"has-a\" whole-part relationship where the part can exist independently of the whole (`Department` has `Professors`).\n5. **Composition (Solid line with filled black diamond):** A strong \"death-relationship\" whole-part lifecycle bond where the part **cannot exist without the whole** (`House` has `Rooms`)."
      },
      {
        "id": "se-3-5",
        "heading": "3.5 UML Behavioral Diagrams: Sequence, State Machine & Activity",
        "content": "1. **Sequence Diagrams:** Models dynamic interactions between objects arranged chronologically along vertical **Lifelines**:\n   - Horizontal arrows represent messages: Solid arrow = Synchronous call; Open arrow = Asynchronous message; Dashed arrow = Return reply.\n2. **State Machine Diagrams:** Models the discrete lifecycle states of an object reacting to external events:\n   - Elements: Initial state (solid black circle), States (rounded rectangles), Transitions with triggers `event [guard] / action`, and Final state (bullseye).\n3. **Activity Diagrams:** Models procedural logic, workflow algorithms, and concurrent parallel threads using fork and join bars."
      }
    ]
  },
  "eceg5409-ch4": {
    "courseId": "eceg5409",
    "courseCode": "ECEg5409",
    "chapterNum": 4,
    "title": "CASE Tools, CI/CD & Development Environments",
    "readTime": "11 min read",
    "cloRef": "CLO6: Utilize modern CASE tools, Git version control, and CI/CD automation",
    "authoritativeSources": "Sommerville (Ch. 25); Pressman (Ch. 30); Humble & Farley — Continuous Delivery; AASTU Syllabus",
    "sections": [
      {
        "id": "se-4-1",
        "heading": "4.1 Computer-Aided Software Engineering (CASE) Taxonomy",
        "content": "**CASE Tools** provide automated software engineering support across all software development lifecycle (SDLC) activities.\n\n### Categorization:\n1. **Upper CASE (Front-End Tools):** Supports early phases of development: planning, business process modeling, requirements analysis, and architectural UML modeling (e.g., Enterprise Architect, Draw.io).\n2. **Lower CASE (Back-End Tools):** Supports downstream implementation activities: compilers, syntax-directed editors, automated code generators, debuggers, and test harness execution frameworks.\n3. **Integrated CASE (I-CASE):** Comprehensive lifecycle environments that share a common centralized data repository, linking requirements, design diagrams, code files, and bug tickets seamlessly."
      },
      {
        "id": "se-4-2",
        "heading": "4.2 Distributed Version Control Systems (Git Internals)",
        "content": "### Centralized (SVN) vs Distributed (Git):\n- **Centralized (CVS, SVN):** Single central server. If the server fails or network drops, developers cannot commit or review project history.\n- **Distributed (Git):** Every developer clones the **entire repository history** locally. Blazing-fast local branching, commits, and cryptographic integrity.\n\n### Git Internal Object Store (Content-Addressable Storage):\nAll files in Git are stored in `.git/objects/` indexed by their **SHA-1 (or SHA-256) hash**:\n1. **Blob:** Stores raw file data bytes (without filename or permissions).\n2. **Tree:** Represents a directory; maps filenames and permissions to Blob and sub-Tree hashes.\n3. **Commit:** Contains a pointer to the root Tree, parent commit hash(es), author, committer, and commit message.\n4. **Tag / Branch Reference:** A named text pointer pointing directly to a specific commit hash (`refs/heads/main`)."
      },
      {
        "id": "se-4-3",
        "heading": "4.3 Continuous Integration & Continuous Delivery (CI/CD)",
        "content": "### The CI/CD Pipeline Lifecycle:\nMartin Fowler defined **Continuous Integration (CI)** as the practice where team members integrate their work into `main` frequently (multiple times daily), with each check-in verified by an automated build and test pipeline.\n\n```\n[Developer Git Push] \n        │\n        ▼ \n[Automated Trigger (GitHub Actions / Jenkins)]\n        │\n        ▼ Step 1: Static Code Analysis & Linting (SonarQube, ESLint)\n[Lint Passed]\n        │\n        ▼ Step 2: Automated Compilation & Build\n[Build Artifact Created]\n        │\n        ▼ Step 3: Automated Unit & Integration Testing\n[Tests 100% Passed]\n        │\n        ▼ Step 4: Container Packaging (Docker build & push to registry)\n[Docker Image Stored]\n        │\n        ▼ Step 5: Continuous Deployment (CD to Kubernetes Staging / Production)\n[Production Release Live]\n```"
      },
      {
        "id": "se-4-4",
        "heading": "4.4 Containerization (Docker) vs Virtual Machines",
        "content": "| Metric | Type-2 Virtual Machine (VirtualBox, VMware) | Docker Container |\n|---|---|---|\n| **Architecture** | Hypervisor runs a **complete guest operating system** on top of the host. | Containers share the **Host OS Kernel**; isolated via Linux `namespaces` and `cgroups`. |\n| **Startup Time** | Slow ($30 - 120\\text{ seconds}$) | Instantaneous (Sub-second) |\n| **Memory Overhead** | Massive ($1 - 8\\text{ GB}$ per VM) | Negligible ($10 - 50\\text{ MB}$) |\n| **Portability** | Bulky VM images ($> 20\\text{ GB}$) | Lightweight layered Docker images ($< 200\\text{ MB}$) |"
      },
      {
        "id": "se-4-5",
        "heading": "4.5 Software Configuration Management (SCM) & Baselines",
        "content": "A **Baseline** is a formally reviewed and agreed specification or product that serves as the basis for further development, and can only be changed through formal change control procedures.\n- **Change Control Board (CCB):** A committee that evaluates the technical and financial impact of proposed engineering change requests (ECRs).\n- **Branching Models:** **Git Flow** (Feature $\\to$ Develop $\\to$ Release $\\to$ Main) vs **Trunk-Based Development** (Small, short-lived feature branches merged into `main` within 24 hours using Feature Flags)."
      }
    ]
  },
  "eceg5409-ch5": {
    "courseId": "eceg5409",
    "courseCode": "ECEg5409",
    "chapterNum": 5,
    "title": "Software Testing (Unit, Integration, Black/White Box) & Maintenance",
    "readTime": "14 min read",
    "cloRef": "CLO5: White-box testing, cyclomatic complexity, black-box testing, and maintenance",
    "authoritativeSources": "Pressman (Ch. 17-20); Sommerville (Ch. 8-9); Myers — The Art of Software Testing; AASTU Syllabus",
    "sections": [
      {
        "id": "se-5-1",
        "heading": "5.1 Testing Fundamentals: Verification vs Validation & Defect Taxonomy",
        "content": "Barry Boehm formulated the classic distinction:\n- **Verification:** *\"Are we building the product right?\"*\n  Ensures that the software conforms to its technical design specifications (static analysis, code inspections, walkthroughs).\n- **Validation:** *\"Are we building the right product?\"*\n  Ensures that the software satisfies true customer operational needs in the real world (dynamic acceptance testing).\n\n### The Defect Taxonomy:\n1. **Error (Mistake):** A human conceptual or typographical action by a developer that leads to an incorrect result.\n2. **Fault / Defect (Bug):** The manifestation of an error inside the software code or documentation.\n3. **Failure:** The runtime behavioral breakdown where the software fails to perform its required function within specified limits."
      },
      {
        "id": "se-5-2",
        "heading": "5.2 Black-Box (Functional) Testing Techniques",
        "content": "Black-box testing derives test cases directly from functional requirements **without inspecting the internal source code**.\n\n### 1. Equivalence Partitioning (EP):\nPartitions the input domain of a program into equivalence classes such that all members of a class are treated identically:\n- **Valid Equivalence Classes:** Legitimate inputs conforming to specification.\n- **Invalid Equivalence Classes:** Boundary violations, negative numbers, invalid characters.\nSelecting a single representative test case from each class is sufficient.\n\n### 2. Boundary Value Analysis (BVA):\nHistorical software defects cluster overwhelmingly at boundary edges rather than in the center of input ranges.\nFor an integer input range $[A, B]$:\n- Test the boundary values: $A, A+1, B-1, B$, alongside invalid neighbors $A-1$ and $B+1$."
      },
      {
        "id": "se-5-3",
        "heading": "5.3 White-Box (Structural) Testing & McCabe's Cyclomatic Complexity",
        "content": "White-box testing inspects internal control structures, branches, and execution paths.\n\n### McCabe's Cyclomatic Complexity ($V(G)$):\nThomas McCabe (1976) introduced graph-theoretic complexity measuring the number of linearly independent paths through a program's Control Flow Graph (CFG):\n\n$$V(G) = E - N + 2P$$\nWhere:\n- $E$: Number of edges in the CFG.\n- $N$: Number of nodes in the CFG.\n- $P$: Number of connected components (typically $P=1$ for a single procedure).\n\nAlternative formulas:\n$$V(G) = \\text{Number of Predicate / Decision Nodes } (d) + 1$$\n$$V(G) = \\text{Number of Enclosed Planar Regions } (R) \\text{ in CFG}$$\n\n> [!IMPORTANT]\n> **Upper Bound Rule:** If $V(G) \\le 10$, the module has low risk and is easily testable. If $V(G) > 20$, the module is complex and prone to errors. If $V(G) > 50$, the module is untestable and must be refactored!"
      },
      {
        "id": "se-5-4",
        "heading": "5.4 Levels of Testing: Unit, Integration & System",
        "content": "```\n[Acceptance Testing]  ◄── Validates customer business requirements\n        ▲\n[System Testing]      ◄── Tests complete integrated software (Security, Load, Performance)\n        ▲\n[Integration Testing] ◄── Tests interfaces between interacting modules (Stubs & Drivers)\n        ▲\n[Unit Testing]        ◄── Tests individual functions, classes, and methods (JUnit / PyTest)\n```\n\n### Integration Strategies:\n- **Big Bang:** Integrates all modules simultaneously and tests everything at once. Fatal debugging nightmare.\n- **Top-Down Integration:** Starts from main control module down; uses **Stubs** (dummy subordinate modules returning hardcoded values).\n- **Bottom-Up Integration:** Starts with primitive atomic worker modules; uses **Drivers** (test harness programs that call the modules with parameters)."
      },
      {
        "id": "se-5-5",
        "heading": "5.5 Software Maintenance & The 4 Categories of Maintenance",
        "content": "Over **$70\\%$ of total lifecycle software engineering expenditure** occurs *after* the system is deployed to production during the **Maintenance Phase**.\n\n### The 4 Categories of Maintenance (Lientz & Swanson):\n1. **Corrective Maintenance ($20\\%$):** Fixing residual defects, bugs, memory leaks, and logic faults discovered in production.\n2. **Adaptive Maintenance ($25\\%$):** Modifying software to accommodate changing external environments (new OS releases, updated hardware, database upgrades, regulatory changes).\n3. **Perfective Maintenance ($50\\%$ - Dominant Cost):** Enhancing existing features, optimizing performance, refactoring legacy code, and adding user-requested capabilities.\n4. **Preventive Maintenance ($5\\%$):** Re-engineering software to eliminate technical debt and prevent future faults before they occur."
      }
    ]
  },
  "eceg5403-ch1": {
    "courseId": "eceg5403",
    "courseCode": "ECEg5403",
    "chapterNum": 1,
    "title": "Embedded System Architectures & Processor Cores",
    "readTime": "12 min read",
    "cloRef": "CLO1: Analyze embedded processor architectures, ARM Cortex-M, and memory mapping",
    "authoritativeSources": "Valvano (Ch. 1-2); Marilyn Wolf (Ch. 1-3); Joseph Yiu (Ch. 1-4); AASTU Syllabus",
    "sections": [
      {
        "id": "emb-1-1",
        "heading": "1.1 Embedded System Definition & Physical Constraints",
        "content": "An **Embedded System** is an engineering system designed to perform a dedicated, specific function, often with real-time computing constraints, tightly coupled as part of a larger mechanical or electrical system.\n\n### The Five Stringent Embedded Engineering Constraints:\n1. **Real-Time Determinism:** Correctness depends not only on the logical result of computation, but also on the **exact wall-clock time at which the result is delivered**. Missing a deadline is a system failure.\n2. **Minimal Power Dissipation:** Many systems operate continuously for $5 - 10$ years on a single coin-cell lithium battery ($< 20\\ \\mu\\text{A}$ sleep currents).\n3. **Severe Memory Footprint:** Microcontrollers operate with kilobyte-scale memory ($16\\text{ KB} - 256\\text{ KB}$ SRAM; $64\\text{ KB} - 1\\text{ MB}$ Flash). Memory leaks and heap fragmentation are intolerable.\n4. **Harsh Environmental Robustness:** Must withstand wide industrial temperature extremes ($-40^\\circ\\text{C}$ to $+125^\\circ\\text{C}$), high-voltage electromagnetic interference (EMI), and physical vibration.\n5. **Ultra-Low Unit Production Cost:** In consumer electronics and IoT, saving $\\$0.05$ on a microcontroller translates to hundreds of thousands of dollars in profit at scale."
      },
      {
        "id": "emb-1-2",
        "heading": "1.2 Von Neumann vs Harvard Architectural Topologies",
        "content": "| Feature | Princeton / Von Neumann Architecture | Harvard Architecture (Modified Harvard) |\n|---|---|---|\n| **Bus Topology** | Single unified bus for both Program Instructions and Data operands. | **Physically Separate Buses** for Instructions (I-Code) and Data (D-Code). |\n| **Pipelining Efficiency** | **The Von Neumann Bottleneck:** CPU cannot read an instruction and read/write data in RAM simultaneously. | Instruction fetch and data read/write occur **concurrently in the same clock cycle**. |\n| **Silicon Complexity** | Simple bus arbitration; lower pin count. | More internal routing traces and bus multiplexers. |\n| **Security** | Self-modifying code allowed; susceptible to buffer-overflow code injection attacks. | Code space is physically isolated from Data space; execution from data RAM can be blocked by MPU. |\n| **Representative CPUs** | Classic 8051, Intel x86 | **ARM Cortex-M**, PIC microcontrollers, modern DSPs |"
      },
      {
        "id": "emb-1-3",
        "heading": "1.3 The ARM Cortex-M Processor Core & Register Bank",
        "content": "The **ARM Cortex-M family** is the global industry standard 32-bit RISC microcontroller core (Cortex-M0, M3, M4 with hardware FPU, M7).\n\n### Programmer's Register Model:\nThe Cortex-M core provides sixteen 32-bit registers ($R0$ to $R15$):\n- **$R0 - R7$ (Low Registers):** General-purpose; accessible by all 16-bit Thumb instructions.\n- **$R8 - R12$ (High Registers):** General-purpose; accessible by 32-bit Thumb-2 instructions.\n- **$R13$ (Stack Pointer - SP):** Banked into two physically separate stack pointers:\n  - **MSP (Main Stack Pointer):** Used by OS kernel and hardware Interrupt Service Routines (ISRs).\n  - **PSP (Process Stack Pointer):** Used by individual application tasks in an RTOS to protect the kernel stack from task stack overflows!\n- **$R14$ (Link Register - LR):** Stores the return address for subroutines and exception returns (`EXC_RETURN`).\n- **$R15$ (Program Counter - PC):** Contains the memory address of the current executing instruction.\n- **xPSR (Program Status Register):** Holds condition flags (Negative $N$, Zero $Z$, Carry $C$, Overflow $V$) and current interrupt vector number."
      },
      {
        "id": "emb-1-4",
        "heading": "1.4 Reset Sequence & Vector Table Execution",
        "content": "When the reset line of an ARM Cortex-M microcontroller is de-asserted:\n\n1. **Hardware Vector Table Fetch:** The CPU hardware automatically fetches the first two 32-bit words from memory starting at address `0x00000000`:\n   - **Address `0x00000000`:** Contains the **Initial Main Stack Pointer (MSP) Value** (points to the top of SRAM, e.g., `0x20008000`).\n   - **Address `0x00000004`:** Contains the **Reset Handler Function Address** (entry point of startup code).\n2. **PC Loading:** CPU loads the MSP with word 0, loads the $PC$ with word 1 (with LSB set to 1 indicating Thumb execution), and branches to the `Reset_Handler`.\n3. **C-Runtime Initialization:** Startup code:\n   - Copies initialized global variables from Flash ROM to SRAM (`.data` section).\n   - Zeroes out uninitialized memory in SRAM (`.bss` section).\n   - Calls the `main()` function."
      },
      {
        "id": "emb-1-5",
        "heading": "1.5 Memory-Mapped I/O (MMIO) vs Port-Mapped I/O",
        "content": "- **Port-Mapped I/O (PMI / Isolated I/O):** Special CPU instructions (`IN`, `OUT` in x86) and a separate control bus access peripheral hardware.\n- **Memory-Mapped I/O (MMIO - Modern ARM Standard):** Peripheral device control registers (GPIO, UART, Timers) are mapped directly into the **unified 4 GB physical memory address space**:\n  - `0x00000000 - 0x1FFFFFFF`: Code / Flash ROM ($512\\text{ MB}$)\n  - `0x20000000 - 0x3FFFFFFF`: SRAM Data ($512\\text{ MB}$)\n  - `0x40000000 - 0x5FFFFFFF`: On-Chip Peripherals ($512\\text{ MB}$)\n  - Standard C pointers access hardware registers directly:\n    ```c\n    #define GPIOA_ODR (*((volatile uint32_t *) 0x40020014))\n    GPIOA_ODR |= (1 << 5); // Toggle LED on pin PA5\n    ```\n  > [!NOTE]\n  > The `volatile` keyword in C is **mandatory** for MMIO registers! It tells the optimizing compiler that the register value can change outside program control (by hardware), preventing the compiler from caching it in a CPU register."
      }
    ]
  },
  "eceg5403-ch2": {
    "courseId": "eceg5403",
    "courseCode": "ECEg5403",
    "chapterNum": 2,
    "title": "Memory Architectures, Timers & Hardware Interrupts",
    "readTime": "13 min read",
    "cloRef": "CLO2: Program GPIO, hardware timers, PWM duty cycles, and configure NVIC interrupts",
    "authoritativeSources": "Valvano (Ch. 3, 5-6); Joseph Yiu (Ch. 7-8); Marilyn Wolf (Ch. 4); AASTU Syllabus",
    "sections": [
      {
        "id": "emb-2-1",
        "heading": "2.1 General Purpose Input/Output (GPIO) Circuitry & Registers",
        "content": "A GPIO pin is an interface pin configurable as a digital input or digital output.\n\n### Internal GPIO Output Stages:\n1. **Push-Pull Configuration:** Uses both a high-side pMOS and low-side nMOS transistor. Drives the pin actively high to $V_{DD}$ (logic 1) and actively low to $GND$ (logic 0). Fast switching; used for high-speed digital buses, LEDs, and SPI.\n2. **Open-Drain Configuration:** Low-side nMOS is connected, but high-side pMOS is omitted. The pin can pull down to $GND$ actively, but cannot pull high. An external **Pull-Up Resistor** pulls the line to $V_{DD}$ when floating. Essential for **wired-AND buses ($I^2C$)** and level shifting.\n\n### Core GPIO Registers (e.g., STM32 / ARM):\n- **MODER:** Configures pin mode: Input (`00`), General Purpose Output (`01`), Alternate Function (`10`), Analog (`11`).\n- **OTYPER:** Selects Output Push-Pull (`0`) vs Open-Drain (`1`).\n- **OSPEEDR:** Selects output slew rate (Low, Medium, High, Very-High).\n- **PUPDR:** Enables internal Pull-Up (`01`) or Pull-Down (`10`) resistors.\n- **IDR (Input Data Register):** Read-only register reflecting real-time voltage on physical pin.\n- **ODR (Output Data Register):** Read/write register setting output pin states.\n- **BSRR (Bit Set/Reset Register):** Allows atomic, thread-safe bit manipulation in a single clock cycle without requiring read-modify-write sequences!"
      },
      {
        "id": "emb-2-2",
        "heading": "2.2 Hardware Timers, Prescalers & Auto-Reload Registers",
        "content": "Microcontroller hardware timers are autonomous counters driven by the peripheral bus clock ($f_{clk}$).\n\n### Mathematical Frequency Formulation:\n$$\\text{Timer Overflow Frequency } f_{timer} = \\frac{f_{clk}}{(\\text{PSC} + 1) \\times (\\text{ARR} + 1)}$$\n$$\\text{Timer Period } T = \\frac{1}{f_{timer}} = \\frac{(\\text{PSC} + 1) \\times (\\text{ARR} + 1)}{f_{clk}}$$\n\nWhere:\n- $f_{clk}$: Master peripheral clock frequency (e.g., $84\\text{ MHz}$).\n- $\\text{PSC}$: 16-bit **Prescaler Register** (divides input clock by $1$ to $65,536$).\n- $\\text{ARR}$: **Auto-Reload Register** (determines counter period before rolling over to 0).\n- $\\text{CNT}$: 16-bit / 32-bit **Current Counter Register** incremented on each clock pulse."
      },
      {
        "id": "emb-2-3",
        "heading": "2.3 Pulse Width Modulation (PWM) Generation",
        "content": "**Pulse Width Modulation (PWM)** encodes an analog voltage by varying the duty cycle of a fixed-frequency digital square wave.\n\n### Duty Cycle Formulation:\nThe timer counter (`CNT`) counts upwards from $0$ to `ARR`. A **Capture/Compare Register (`CCR`)** sets the switching threshold:\n$$\\text{Duty Cycle } D = \\frac{\\text{CCR}}{\\text{ARR}} \\times 100\\%$$\n$$\\text{Average Output Voltage } V_{avg} = D \\times V_{DD} = \\frac{\\text{CCR}}{\\text{ARR}} \\times V_{DD}$$\n\n---\n\n### 🧮 Worked Numerical Problem:\n**Problem:** An AASTU student is generating a PWM signal to control an electric wheelchair DC motor speed:\n- System peripheral clock $f_{clk} = 48\\text{ MHz}$.\n- Desired PWM frequency $f_{PWM} = 20\\text{ kHz}$ (above human audible hearing range).\n- Supply voltage $V_{DD} = 3.3\\text{ V}$.\n1. If the prescaler is set to $\\text{PSC} = 0$, calculate the required Auto-Reload value `ARR`.\n2. What value should be loaded into `CCR` to output an average DC voltage of $1.65\\text{ V}$ ($50\\%$ duty cycle)?\n3. What is the time resolution of the PWM duty cycle?\n\n**Step-by-Step Solution:**\n1. **Calculate `ARR`:**\n   $$f_{PWM} = \\frac{f_{clk}}{(\\text{PSC} + 1) \\times (\\text{ARR} + 1)} \\implies 20,000 = \\frac{48,000,000}{(0 + 1) \\times (\\text{ARR} + 1)}$$\n   $$\\text{ARR} + 1 = \\frac{48,000,000}{20,000} = 2400 \\implies \\text{ARR} = 2399$$\n\n2. **Calculate `CCR` for $50\\%$ Duty Cycle:**\n   $$\\text{CCR} = 0.50 \\times \\text{ARR} = 0.50 \\times 2400 = 1200$$\n\n3. **Time Resolution:**\n   $$\\Delta t = \\frac{1}{f_{clk}} = \\frac{1}{48 \\times 10^6\\text{ Hz}} = 20.83\\text{ nanoseconds}$$"
      },
      {
        "id": "emb-2-4",
        "heading": "2.4 Interrupt Architectures & The Nested Vectored Interrupt Controller (NVIC)",
        "content": "Polling wastes valuable CPU cycles in infinite loops. Interrupts allow external hardware events to asynchronously notify the CPU immediately.\n\n### The ARM Cortex-M Nested Vectored Interrupt Controller (NVIC):\n- **Vectored Interrupts:** When an interrupt fires, hardware reads the ISR function address directly from the **Vector Table in SRAM/Flash**, jumping to the handler in **under 12 clock cycles** without software branching!\n- **Nested Priority:** Higher priority interrupts preempt lower priority ISRs.\n- **Priority Grouping:** Splits priority bits into:\n  - *Preemption Priority:* Determines if an interrupt can preempt an already running ISR.\n  - *Subpriority:* Determines which interrupt executes first if two arrive simultaneously.\n- **Hardware Context Saving:** The NVIC hardware automatically pushes $R0-R3, R12, LR, PC,$ and $xPSR$ onto the stack in 12 cycles.\n- **Tail-Chaining Optimization:** If an interrupt is pending when an ISR finishes, the NVIC skips unstacking and restacking registers, transitioning to the next ISR in **only 6 clock cycles**!"
      },
      {
        "id": "emb-2-5",
        "heading": "2.5 Interrupt Latency & Critical Sections in Bare-Metal Systems",
        "content": "### Interrupt Latency:\nThe elapsed time from the physical arrival of an interrupt voltage edge until the first instruction of the ISR executes:\n$$T_{latency} = T_{synchronization} + T_{context\\_stacking} + T_{fetch\\_vector}$$\n\n> [!CAUTION]\n> **Race Conditions in ISR Data Sharing:**\n> When sharing variables between an ISR and background `main()` code, the variable **must be declared `volatile`**, and multi-byte read/write operations in `main()` must be wrapped in critical sections (disabling interrupts via `__disable_irq()` and `__enable_irq()`) to prevent partial data reads!"
      }
    ]
  },
  "eceg5403-ch3": {
    "courseId": "eceg5403",
    "courseCode": "ECEg5403",
    "chapterNum": 3,
    "title": "Serial Communication Protocols (UART, SPI, I2C, CAN)",
    "readTime": "14 min read",
    "cloRef": "CLO3: Interface embedded microcontrollers using UART, SPI, I2C, and CAN buses",
    "authoritativeSources": "Valvano (Ch. 7-8); Marilyn Wolf (Ch. 4-5); Bosch CAN Specification; AASTU Syllabus",
    "sections": [
      {
        "id": "emb-3-1",
        "heading": "3.1 Serial vs Parallel Communication Fundamentals",
        "content": "In modern electronics, high-speed serial buses have universally replaced wide parallel buses:\n- **Parallel Buses (8, 16, 32 lines):** Suffer from severe **Clock Skew** (signals traveling on adjacent PCB traces arrive at slightly different times) and **Crosstalk** (capacitive/inductive electromagnetic coupling between parallel traces).\n- **Serial Buses:** Transmits data bit-by-bit sequentially over 1 to 4 wires. Eliminates inter-line skew, minimizes microcontroller pin counts, and allows high clock frequencies ($> 100\\text{ MHz}$)."
      },
      {
        "id": "emb-3-2",
        "heading": "3.2 Universal Asynchronous Receiver-Transmitter (UART)",
        "content": "UART is an **asynchronous, point-to-point, full-duplex protocol** requiring only two wires ($TX$ and $RX$).\nBecause there is no shared clock wire, both transmitter and receiver must be pre-configured to the identical **Baud Rate** (e.g., $9600, 115200\\text{ bps}$).\n\n### UART Data Packet Frame Anatomy:\n```\nIdle (High) ──┐      ┌───┬───┬───┬───┬───┬───┬───┬───┐  ┌────────┐  ┌────────────┐\n              └──────┴───┴───┴───┴───┴───┴───┴───┴───┴──┴────────┴──┴────────────┴── Idle (High)\n              START   D0  D1  D2  D3  D4  D5  D6  D7   PARITY       STOP BIT(S)\n              (1 bit)       Data (5-9 bits, LSB first) (Optional)   (1-2 bits)\n```\n\n1. **Idle State:** Line held at logic HIGH ($V_{DD}$).\n2. **Start Bit:** Line pulled LOW for 1 bit-time. Triggers the receiver's internal baud rate counter.\n3. **Data Bits:** 5 to 9 bits (typically 8 bits), transmitted **Least Significant Bit (LSB) first**.\n4. **Parity Bit (Optional):** Even or odd parity for single-bit error detection.\n5. **Stop Bit:** Line held HIGH for 1 or 2 bit-times to delineate byte boundaries.\n\n### $16\\times$ Over-Sampling Clock Recovery:\nThe receiver samples the incoming RX line at **$16\\times$ the nominal baud rate**. Upon detecting the falling edge of the Start bit, it counts 8 clock ticks to sample right at the stable center of the pulse ($50\\%$ mark), eliminating jitter."
      },
      {
        "id": "emb-3-3",
        "heading": "3.3 Serial Peripheral Interface (SPI)",
        "content": "SPI (Motorola) is a **synchronous, master-slave, full-duplex, 4-wire serial bus**:\n\n### The 4 SPI Bus Signals:\n1. **SCLK (Serial Clock):** Generated exclusively by the Master.\n2. **MOSI (Master Out Slave In):** Data sent from Master to Slave.\n3. **MISO (Master In Slave Out):** Data sent from Slave to Master.\n4. **$\\overline{\\text{SS}}$ / CS (Slave Select / Chip Select):** Active-low line pulled low by Master to select a specific slave.\n\n### Shift Register Exchange Mechanism:\nThe Master internal 8-bit shift register and Slave internal 8-bit shift register form a continuous **circular ring counter**: on every clock pulse, the Master shifts out one bit on MOSI while shifting in one bit from MISO!\n\n### SPI Clock Polarity & Phase Modes:\nConfigured by two registers bits:\n- **CPOL (Clock Polarity):** Sets idle state of clock line (`0` = Idle Low, `1` = Idle High).\n- **CPHA (Clock Phase):** Sets sampling edge (`0` = Sample on 1st edge, `1` = Sample on 2nd edge).\n\n| Mode | CPOL | CPHA | Clock Idle State | Data Sample Edge | Data Shift Edge |\n|---|---|---|---|---|---|\n| **Mode 0** | 0 | 0 | Low | Rising (1st) | Falling (2nd) |\n| **Mode 1** | 0 | 1 | Low | Falling (2nd) | Rising (1st) |\n| **Mode 2** | 1 | 0 | High | Falling (1st) | Rising (2nd) |\n| **Mode 3** | 1 | 1 | High | Rising (2nd) | Falling (1st) |"
      },
      {
        "id": "emb-3-4",
        "heading": "3.4 Inter-Integrated Circuit ($I^2C$) Bus Architecture",
        "content": "$I^2C$ (Philips / NXP) is a **synchronous, multi-master, half-duplex, 2-wire serial bus**:\n- **SDA (Serial Data Line)**\n- **SCL (Serial Clock Line)**\nBoth lines use **Open-Drain drivers with external Pull-Up Resistors ($1.8\\text{ k}\\Omega - 4.7\\text{ k}\\Omega$)**.\n\n### Bit Transfer Protocol:\n1. **Data Validity Rule:** While SCL is HIGH, the SDA line **must remain stable**! SDA is only allowed to transition when SCL is LOW.\n2. **START Condition:** SDA transitions from **HIGH to LOW while SCL is HIGH**.\n3. **STOP Condition:** SDA transitions from **LOW to HIGH while SCL is HIGH**.\n4. **Addressing Byte (8 bits):** Master sends 7-bit Slave Address followed by bit 8 (Read $= 1$, Write $= 0$).\n5. **Acknowledge (ACK / NACK):** On the 9th clock pulse, the transmitter releases SDA; the receiver pulls SDA LOW (**ACK**) to confirm byte receipt.\n\n### Multi-Master Clock Synchronization & Bitwise Arbitration:\nIf two masters transmit simultaneously, wired-AND arbitration applies: if Master 1 outputs `1` (releases SDA) but Master 2 outputs `0` (pulls SDA low), Master 1 detects the mismatch ($0 \\neq 1$), immediately **concedes arbitration**, and switches to slave mode without corrupting Master 2's packet!"
      },
      {
        "id": "emb-3-5",
        "heading": "3.5 Controller Area Network (CAN Bus) & Comprehensive Comparison",
        "content": "Developed by Robert Bosch (1986) for automotive environments.\n- **Differential Signaling:** Uses twisted-pair wires ($CAN_H$ and $CAN_L$) terminated with $120\\ \\Omega$ resistors. High Common-Mode Noise Rejection (CMRR).\n- **Recessive (`1`) vs Dominant (`0`):** Dominant bits overwrite recessive bits.\n- **Message-Based Addressing:** Packets carry an **11-bit or 29-bit Identifier (ID)** denoting message priority (e.g., Anti-lock braking system $= 0x001$). Lowest numerical ID wins arbitration non-destructively!\n\n---\n\n### Master Protocol Comparison Matrix:\n| Protocol | Wire Count | Max Distance | Typical Speed | Topology | Duplex | Synchronization |\n|---|---|---|---|---|---|---|\n| **UART** | 2 | $< 15\\text{ m}$ (RS-232) | $115.2\\text{ kbps} - 1\\text{ Mbps}$ | Point-to-Point (1 to 1) | Full | Asynchronous (Baud rate) |\n| **SPI** | $3 + N$ slaves | $< 30\\text{ cm}$ (Board level) | $10 - 80\\text{ Mbps}$ | Single/Multi-Master Multi-Slave | Full | Synchronous (Shared clock) |\n| **$I^2C$** | 2 | $< 3\\text{ m}$ | $100\\text{ k}, 400\\text{ k}, 3.4\\text{ Mbps}$ | Multi-Master Multi-Slave (127 devices) | Half | Synchronous (Open-drain) |\n| **CAN Bus** | 2 (Differential) | Up to $1\\text{ km}$ ($40\\text{ m}$ @ 1M) | $1\\text{ Mbps}$ (CAN-FD: $8\\text{ Mbps}$) | Multi-Master Broadcast Bus | Half | Asynchronous Bit-Stuffing |"
      }
    ]
  },
  "eceg5403-ch4": {
    "courseId": "eceg5403",
    "courseCode": "ECEg5403",
    "chapterNum": 4,
    "title": "Real-Time Operating Systems (RTOS) for Microcontrollers",
    "readTime": "13 min read",
    "cloRef": "CLO4: Real-time task scheduling, FreeRTOS programming, and priority inversion",
    "authoritativeSources": "Valvano (Ch. 12); Richard Barry — Mastering the FreeRTOS Real Time Kernel; Jane Liu — Real-Time Systems",
    "sections": [
      {
        "id": "emb-4-1",
        "heading": "4.1 Super-Loop (Bare-Metal) vs RTOS Architecture",
        "content": "### Bare-Metal Super-Loop (Foreground/Background):\n```c\nwhile(1) {\n    readSensors();\n    processControlAlgorithm();\n    updateActuators();\n}\n```\n- *Advantages:* Minimal RAM footprint; simple.\n- *Fatal Vulnerabilities:* **Non-deterministic response latency**. If `processControlAlgorithm()` takes $40\\text{ ms}$, responding to a sensor button press is delayed by $40\\text{ ms}$. Adding new features degrades the timing of all existing features.\n\n### The RTOS Solution:\nAn RTOS provides **preemptive, priority-based multitasking**. A software **Scheduler** driven by a periodic hardware timer interrupt (SysTick, typically $1\\text{ kHz} = 1\\text{ ms}$) preempts low-priority background processing instantly whenever a high-priority real-time task needs to execute."
      },
      {
        "id": "emb-4-2",
        "heading": "4.2 Hard Real-Time vs Soft Real-Time Classification",
        "content": "- **Hard Real-Time Systems:** Missing a single timing deadline results in **catastrophic, total system failure or loss of human life** (e.g., Automotive airbag deployment within $15\\text{ ms}$, pacemaker cardiac pacing, fly-by-wire flight control).\n- **Firm Real-Time Systems:** Missing a deadline renders the generated result worthless, but causes no physical destruction (e.g., Financial algorithmic trading, video streaming frame decode).\n- **Soft Real-Time Systems:** Meeting deadlines is desirable; missing a deadline degrades Quality of Service (QoS), but the system continues operating normally (e.g., Microwave oven keypad response, web page loading)."
      },
      {
        "id": "emb-4-3",
        "heading": "4.3 FreeRTOS Kernel Architecture & Task Lifecycle",
        "content": "**FreeRTOS** is the market-leading open-source real-time operating system for microcontrollers.\n\n### Task Control Block (TCB):\nEach task is an independent thread of execution with its own private stack allocated from the heap (`pvPortMalloc`).\nThe TCB contains:\n- Current top-of-stack pointer (`pxTopOfStack`).\n- Task Priority (Integer from `0` to `configMAX_PRIORITIES - 1`).\n- Task State list item.\n\n### The 4 FreeRTOS Task States:\n1. **Running:** Task currently executing on the CPU core.\n2. **Ready:** Task ready to execute, waiting for CPU assignment.\n3. **Blocked:** Task waiting for a temporal delay (`vTaskDelay`) or an external synchronization event (Queue message, Semaphore). Consumes **zero CPU time**.\n4. **Suspended:** Explicitly halted via `vTaskSuspend()`.\n\n### Creating a Task in FreeRTOS:\n```c\nvoid vTelemetryTask(void *pvParameters) {\n    TickType_t xLastWakeTime = xTaskGetTickCount();\n    const TickType_t xFrequency = pdMS_TO_TICKS(50); // Periodic 50ms (20Hz)\n    \n    for(;;) {\n        readSensors();\n        transmitRadioPacket();\n        vTaskDelayUntil(&xLastWakeTime, xFrequency); // Jitter-free periodic sleep\n    }\n}\n```"
      },
      {
        "id": "emb-4-4",
        "heading": "4.4 Real-Time Scheduling Algorithms: RMS vs EDF",
        "content": "### 1. Rate Monotonic Scheduling (RMS - Liu & Layland 1973):\n- **Static Priority Rule:** Assigns static priority strictly proportional to execution frequency: **The shorter the period ($T$), the HIGHER the priority!**\n- **Schedulability Bound:** For $n$ independent periodic tasks with execution times $C_i$ and periods $T_i$, the task set is guaranteed to be schedulable if total CPU utilization satisfies:\n  $$U = \\sum_{i=1}^n \\frac{C_i}{T_i} \\le n \\cdot (2^{1/n} - 1)$$\n  For $n=1$: $U \\le 100\\%$; For $n=2$: $U \\le 82.8\\%$; For $n \\to \\infty$: $U \\le \\ln(2) \\approx 69.3\\%$.\n\n### 2. Earliest Deadline First (EDF):\n- **Dynamic Priority Rule:** The task with the closest absolute deadline is assigned highest priority dynamically at runtime.\n- **Optimality:** Schedulability bound is a full **$100\\%$ CPU Utilization ($U \\le 1.0$)**! Incurs higher scheduler runtime computational overhead than RMS."
      },
      {
        "id": "emb-4-5",
        "heading": "4.5 The Priority Inversion Crisis & Priority Inheritance Protocols",
        "content": "### What is Priority Inversion?\nA critical bug where a **High-Priority Task ($T_H$) is indirectly blocked by a Low-Priority Task ($T_L$) for an unbounded duration**, caused by a Medium-Priority Task ($T_M$) preempting $T_L$!\n\n### The Canonical Mars Pathfinder Scenario (July 1997):\n1. Low-priority meteorological task ($T_L$) acquires a shared mutex to record weather data into an information bus.\n2. High-priority attitude control task ($T_H$) wakes up; attempts to acquire the mutex; blocks because $T_L$ holds it.\n3. Medium-priority communications task ($T_M$) wakes up. Since $T_M$ has higher priority than $T_L$, **$T_M$ preempts $T_L$**!\n4. $T_M$ runs for a long time. Meanwhile, $T_L$ cannot finish to release the mutex, so **$T_H$ is starved of CPU time by the medium-priority task $T_M$**!\n5. The watchdog timer detects that $T_H$ has missed its deadline and forces a total system reboot!\n\n### Engineering Solutions:\n1. **Priority Inheritance Protocol (PIP):** When $T_H$ blocks on a mutex held by $T_L$, the RTOS kernel temporarily **elevates the priority of $T_L$ to match $T_H$**! Medium-priority tasks ($T_M$) can no longer preempt $T_L$. As soon as $T_L$ releases the mutex, its priority drops back to normal, and $T_H$ preempts immediately.\n2. **Priority Ceiling Protocol (PCP):** Each mutex is assigned a static ceiling priority equal to the highest priority of any task that could ever lock it."
      }
    ]
  },
  "eceg5403-ch5": {
    "courseId": "eceg5403",
    "courseCode": "ECEg5403",
    "chapterNum": 5,
    "title": "Sensors, Actuator Interfacing & Low-Power Embedded Design",
    "readTime": "12 min read",
    "cloRef": "CLO5: Interface ADCs, actuators, H-bridges, and implement low-power sleep modes",
    "authoritativeSources": "Valvano (Ch. 9, 11); Marilyn Wolf (Ch. 6-7); Horowtiz & Hill — The Art of Electronics; AASTU Syllabus",
    "sections": [
      {
        "id": "emb-5-1",
        "heading": "5.1 Analog-to-Digital Conversion (ADC) Architecture",
        "content": "An **Analog-to-Digital Converter (ADC)** converts a continuous physical analog voltage $V_{in} \\in [0, V_{ref}]$ into an $N$-bit discrete integer:\n\n$$D_{out} = \\left\\lfloor \\frac{V_{in}}{V_{ref}} \\times (2^N - 1) \\right\\rfloor \\implies V_{in} = \\frac{D_{out}}{2^N - 1} \\times V_{ref}$$\n\n### Core ADC Metrics:\n1. **Resolution ($N$ bits):** Determines the minimum detectable voltage change (1 Least Significant Bit - LSB):\n   $$1\\text{ LSB} = \\frac{V_{ref}}{2^N}$$\n   For a 12-bit ADC with $V_{ref} = 3.3\\text{ V}$: $1\\text{ LSB} = \\frac{3.3}{4096} \\approx 0.806\\text{ mV}$.\n2. **Quantization Error:** Inherent rounding error:\n   $$E_Q = \\pm \\frac{1}{2}\\text{ LSB}$$\n3. **Sampling Rate ($f_s$):** Must satisfy the **Nyquist-Shannon Criterion**: $f_s > 2 f_{max}$. An analog **Anti-Aliasing Low-Pass Filter** must precede the ADC to strip frequencies above $f_s / 2$.\n\n### Successive Approximation Register (SAR) ADC:\nThe dominant architecture in modern microcontrollers. Uses a binary search algorithm (testing MSB down to LSB using an internal DAC and comparator) to resolve an $N$-bit conversion in **exactly $N$ clock cycles**."
      },
      {
        "id": "emb-5-2",
        "heading": "5.2 Sensor Signal Conditioning & Operational Amplifiers",
        "content": "Raw sensor signals are often weak (microvolts), high-impedance, or noisy.\n\n### Key Op-Amp Conditioning Circuits:\n1. **Voltage Follower (Buffer):** Infinite input impedance, zero output impedance; prevents loading high-impedance resistive sensors (potentiometers, pH probes).\n2. **Non-Inverting Amplifier:**\n   $$V_{out} = \\left(1 + \\frac{R_f}{R_{in}}\\right) V_{in}$$\n3. **Instrumentation Amplifier (3-Op-Amp Topology):** High Common-Mode Rejection Ratio (CMRR $> 100\\text{ dB}$); used to amplify differential millivolt outputs from **Wheatstone bridge strain gauges and thermocouples** while stripping 50/60 Hz mains electromagnetic hum."
      },
      {
        "id": "emb-5-3",
        "heading": "5.3 Actuator Driving: Flyback Protection & H-Bridge Motor Control",
        "content": "A microcontroller GPIO pin can only source or sink tiny currents ($< 20\\text{ mA}$). Driving high-power inductive loads (DC motors, solenoids, relays) requires discrete driver transistors.\n\n### ⚠️ The Inductive Kickback & Flyback Diode:\nAn inductor stores energy in its magnetic field ($E = \\frac{1}{2} L I^2$). When a driving transistor suddenly switches OFF, the collapsing magnetic field induces a massive negative reverse voltage spike:\n$$V = -L \\frac{dI}{dt}$$\nThis transient spike can easily reach hundreds of volts, destroying the transistor instantly!\n> [!IMPORTANT]\n> **Flyback (Freewheeling) Diode Rule:** Always place a fast Schottky diode **in reverse-parallel across the inductive load**. When the transistor turns off, the inductive current safely circulates through the diode until dissipated.\n\n---\n\n### The H-Bridge for Bi-Directional Motor Control:\nConsists of four switches ($Q_1, Q_2, Q_3, Q_4$):\n- Forward: Turn on $Q_1$ and $Q_4$ (current flows left-to-right).\n- Reverse: Turn on $Q_3$ and $Q_2$ (current flows right-to-left).\n- **Shoot-Through Hazard:** If $Q_1$ and $Q_2$ are turned on at the same instant, a direct short circuit connects $V_{supply}$ to $GND$, instantly vaporizing the transistors! Hardware motor controllers enforce a mandatory **Dead-Time** delay during transitions."
      },
      {
        "id": "emb-5-4",
        "heading": "5.4 Low-Power Embedded System Design & Sleep Modes",
        "content": "In battery-operated IoT sensor nodes, total energy consumed is:\n$$E = P_{active} \\cdot t_{active} + P_{sleep} \\cdot t_{sleep}$$\n\n### Microcontroller Power Modes (ARM Cortex-M):\n1. **Run Mode ($10 - 50\\text{ mA}$):** CPU and all peripheral clocks active.\n2. **Sleep Mode ($2 - 5\\text{ mA}$):** CPU core halted (via `WFI` - Wait For Interrupt instruction); peripheral clocks (DMA, Timers, ADC) continue running. Awakens upon any interrupt.\n3. **Stop / Deep-Sleep Mode ($10 - 50\\ \\mu\\text{A}$):** Main PLL and high-speed oscillators stopped; 1.2V core regulator in low-power mode; SRAM contents preserved. Awakens via external pin interrupt or RTC alarm.\n4. **Standby / Hibernate Mode ($0.5 - 2\\ \\mu\\text{A}$):** 1.2V core regulator completely turned off; SRAM contents lost. Only the Real-Time Clock (RTC) and backup registers remain powered. Awakens via reset sequence."
      },
      {
        "id": "emb-5-5",
        "heading": "5.5 Embedded System Reliability: Watchdog Timers & Brown-Out Detection",
        "content": "Industrial and aerospace embedded systems must operate autonomously without human intervention to cycle power.\n\n### 1. Watchdog Timer (WDT / IWDG):\nAn autonomous hardware countdown timer driven by an independent internal low-speed RC oscillator ($32\\text{ kHz}$), completely decoupled from the main crystal clock:\n- Background code must periodically **\"kick\" or \"feed\" the watchdog** (reload the counter) within a specified time window ($t_{watchdog}$).\n- If a firmware crash, infinite loop, or deadlocked mutex halts the program, the watchdog timer reaches zero and **forces an automatic hardware reset of the microcontroller**!\n\n### 2. Brown-Out Reset (BOR):\nMonitors the supply voltage rail ($V_{DD}$). If the supply voltage sags below the minimum operating threshold (e.g., during high motor inrush currents), the BOR circuit clamps the CPU into reset, preventing random memory corruption and erratic program counter execution."
      }
    ]
  }
};
