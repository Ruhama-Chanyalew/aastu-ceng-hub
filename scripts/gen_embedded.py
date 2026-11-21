"""
Embedded Systems (ECEg5403) - All 5 Chapters
Authoritative References:
- Jonathan W. Valvano: Embedded Systems: Real-Time Interfacing to ARM Cortex-M Microcontrollers
- Marilyn Wolf: Computers as Components: Principles of Embedded Computing System Design (4th Ed.)
- Joseph Yiu: The Definitive Guide to ARM Cortex-M3 and Cortex-M4 Processors
- Raj Kamal: Embedded Systems: Architecture, Programming and Design
- AASTU Syllabus ECEg5403
"""

def get_embedded_notes():
    return {
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
                    "content": """An **Embedded System** is an engineering system designed to perform a dedicated, specific function, often with real-time computing constraints, tightly coupled as part of a larger mechanical or electrical system.

### The Five Stringent Embedded Engineering Constraints:
1. **Real-Time Determinism:** Correctness depends not only on the logical result of computation, but also on the **exact wall-clock time at which the result is delivered**. Missing a deadline is a system failure.
2. **Minimal Power Dissipation:** Many systems operate continuously for $5 - 10$ years on a single coin-cell lithium battery ($< 20\\ \\mu\\text{A}$ sleep currents).
3. **Severe Memory Footprint:** Microcontrollers operate with kilobyte-scale memory ($16\\text{ KB} - 256\\text{ KB}$ SRAM; $64\\text{ KB} - 1\\text{ MB}$ Flash). Memory leaks and heap fragmentation are intolerable.
4. **Harsh Environmental Robustness:** Must withstand wide industrial temperature extremes ($-40^\\circ\\text{C}$ to $+125^\\circ\\text{C}$), high-voltage electromagnetic interference (EMI), and physical vibration.
5. **Ultra-Low Unit Production Cost:** In consumer electronics and IoT, saving $\\$0.05$ on a microcontroller translates to hundreds of thousands of dollars in profit at scale."""
                },
                {
                    "id": "emb-1-2",
                    "heading": "1.2 Von Neumann vs Harvard Architectural Topologies",
                    "content": """| Feature | Princeton / Von Neumann Architecture | Harvard Architecture (Modified Harvard) |
|---|---|---|
| **Bus Topology** | Single unified bus for both Program Instructions and Data operands. | **Physically Separate Buses** for Instructions (I-Code) and Data (D-Code). |
| **Pipelining Efficiency** | **The Von Neumann Bottleneck:** CPU cannot read an instruction and read/write data in RAM simultaneously. | Instruction fetch and data read/write occur **concurrently in the same clock cycle**. |
| **Silicon Complexity** | Simple bus arbitration; lower pin count. | More internal routing traces and bus multiplexers. |
| **Security** | Self-modifying code allowed; susceptible to buffer-overflow code injection attacks. | Code space is physically isolated from Data space; execution from data RAM can be blocked by MPU. |
| **Representative CPUs** | Classic 8051, Intel x86 | **ARM Cortex-M**, PIC microcontrollers, modern DSPs |"""
                },
                {
                    "id": "emb-1-3",
                    "heading": "1.3 The ARM Cortex-M Processor Core & Register Bank",
                    "content": """The **ARM Cortex-M family** is the global industry standard 32-bit RISC microcontroller core (Cortex-M0, M3, M4 with hardware FPU, M7).

### Programmer's Register Model:
The Cortex-M core provides sixteen 32-bit registers ($R0$ to $R15$):
- **$R0 - R7$ (Low Registers):** General-purpose; accessible by all 16-bit Thumb instructions.
- **$R8 - R12$ (High Registers):** General-purpose; accessible by 32-bit Thumb-2 instructions.
- **$R13$ (Stack Pointer - SP):** Banked into two physically separate stack pointers:
  - **MSP (Main Stack Pointer):** Used by OS kernel and hardware Interrupt Service Routines (ISRs).
  - **PSP (Process Stack Pointer):** Used by individual application tasks in an RTOS to protect the kernel stack from task stack overflows!
- **$R14$ (Link Register - LR):** Stores the return address for subroutines and exception returns (`EXC_RETURN`).
- **$R15$ (Program Counter - PC):** Contains the memory address of the current executing instruction.
- **xPSR (Program Status Register):** Holds condition flags (Negative $N$, Zero $Z$, Carry $C$, Overflow $V$) and current interrupt vector number."""
                },
                {
                    "id": "emb-1-4",
                    "heading": "1.4 Reset Sequence & Vector Table Execution",
                    "content": """When the reset line of an ARM Cortex-M microcontroller is de-asserted:

1. **Hardware Vector Table Fetch:** The CPU hardware automatically fetches the first two 32-bit words from memory starting at address `0x00000000`:
   - **Address `0x00000000`:** Contains the **Initial Main Stack Pointer (MSP) Value** (points to the top of SRAM, e.g., `0x20008000`).
   - **Address `0x00000004`:** Contains the **Reset Handler Function Address** (entry point of startup code).
2. **PC Loading:** CPU loads the MSP with word 0, loads the $PC$ with word 1 (with LSB set to 1 indicating Thumb execution), and branches to the `Reset_Handler`.
3. **C-Runtime Initialization:** Startup code:
   - Copies initialized global variables from Flash ROM to SRAM (`.data` section).
   - Zeroes out uninitialized memory in SRAM (`.bss` section).
   - Calls the `main()` function."""
                },
                {
                    "id": "emb-1-5",
                    "heading": "1.5 Memory-Mapped I/O (MMIO) vs Port-Mapped I/O",
                    "content": """- **Port-Mapped I/O (PMI / Isolated I/O):** Special CPU instructions (`IN`, `OUT` in x86) and a separate control bus access peripheral hardware.
- **Memory-Mapped I/O (MMIO - Modern ARM Standard):** Peripheral device control registers (GPIO, UART, Timers) are mapped directly into the **unified 4 GB physical memory address space**:
  - `0x00000000 - 0x1FFFFFFF`: Code / Flash ROM ($512\\text{ MB}$)
  - `0x20000000 - 0x3FFFFFFF`: SRAM Data ($512\\text{ MB}$)
  - `0x40000000 - 0x5FFFFFFF`: On-Chip Peripherals ($512\\text{ MB}$)
  - Standard C pointers access hardware registers directly:
    ```c
    #define GPIOA_ODR (*((volatile uint32_t *) 0x40020014))
    GPIOA_ODR |= (1 << 5); // Toggle LED on pin PA5
    ```
  > [!NOTE]
  > The `volatile` keyword in C is **mandatory** for MMIO registers! It tells the optimizing compiler that the register value can change outside program control (by hardware), preventing the compiler from caching it in a CPU register."""
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
                    "content": """A GPIO pin is an interface pin configurable as a digital input or digital output.

### Internal GPIO Output Stages:
1. **Push-Pull Configuration:** Uses both a high-side pMOS and low-side nMOS transistor. Drives the pin actively high to $V_{DD}$ (logic 1) and actively low to $GND$ (logic 0). Fast switching; used for high-speed digital buses, LEDs, and SPI.
2. **Open-Drain Configuration:** Low-side nMOS is connected, but high-side pMOS is omitted. The pin can pull down to $GND$ actively, but cannot pull high. An external **Pull-Up Resistor** pulls the line to $V_{DD}$ when floating. Essential for **wired-AND buses ($I^2C$)** and level shifting.

### Core GPIO Registers (e.g., STM32 / ARM):
- **MODER:** Configures pin mode: Input (`00`), General Purpose Output (`01`), Alternate Function (`10`), Analog (`11`).
- **OTYPER:** Selects Output Push-Pull (`0`) vs Open-Drain (`1`).
- **OSPEEDR:** Selects output slew rate (Low, Medium, High, Very-High).
- **PUPDR:** Enables internal Pull-Up (`01`) or Pull-Down (`10`) resistors.
- **IDR (Input Data Register):** Read-only register reflecting real-time voltage on physical pin.
- **ODR (Output Data Register):** Read/write register setting output pin states.
- **BSRR (Bit Set/Reset Register):** Allows atomic, thread-safe bit manipulation in a single clock cycle without requiring read-modify-write sequences!"""
                },
                {
                    "id": "emb-2-2",
                    "heading": "2.2 Hardware Timers, Prescalers & Auto-Reload Registers",
                    "content": """Microcontroller hardware timers are autonomous counters driven by the peripheral bus clock ($f_{clk}$).

### Mathematical Frequency Formulation:
$$\\text{Timer Overflow Frequency } f_{timer} = \\frac{f_{clk}}{(\\text{PSC} + 1) \\times (\\text{ARR} + 1)}$$
$$\\text{Timer Period } T = \\frac{1}{f_{timer}} = \\frac{(\\text{PSC} + 1) \\times (\\text{ARR} + 1)}{f_{clk}}$$

Where:
- $f_{clk}$: Master peripheral clock frequency (e.g., $84\\text{ MHz}$).
- $\\text{PSC}$: 16-bit **Prescaler Register** (divides input clock by $1$ to $65,536$).
- $\\text{ARR}$: **Auto-Reload Register** (determines counter period before rolling over to 0).
- $\\text{CNT}$: 16-bit / 32-bit **Current Counter Register** incremented on each clock pulse."""
                },
                {
                    "id": "emb-2-3",
                    "heading": "2.3 Pulse Width Modulation (PWM) Generation",
                    "content": """**Pulse Width Modulation (PWM)** encodes an analog voltage by varying the duty cycle of a fixed-frequency digital square wave.

### Duty Cycle Formulation:
The timer counter (`CNT`) counts upwards from $0$ to `ARR`. A **Capture/Compare Register (`CCR`)** sets the switching threshold:
$$\\text{Duty Cycle } D = \\frac{\\text{CCR}}{\\text{ARR}} \\times 100\\%$$
$$\\text{Average Output Voltage } V_{avg} = D \\times V_{DD} = \\frac{\\text{CCR}}{\\text{ARR}} \\times V_{DD}$$

---

### 🧮 Worked Numerical Problem:
**Problem:** An AASTU student is generating a PWM signal to control an electric wheelchair DC motor speed:
- System peripheral clock $f_{clk} = 48\\text{ MHz}$.
- Desired PWM frequency $f_{PWM} = 20\\text{ kHz}$ (above human audible hearing range).
- Supply voltage $V_{DD} = 3.3\\text{ V}$.
1. If the prescaler is set to $\\text{PSC} = 0$, calculate the required Auto-Reload value `ARR`.
2. What value should be loaded into `CCR` to output an average DC voltage of $1.65\\text{ V}$ ($50\\%$ duty cycle)?
3. What is the time resolution of the PWM duty cycle?

**Step-by-Step Solution:**
1. **Calculate `ARR`:**
   $$f_{PWM} = \\frac{f_{clk}}{(\\text{PSC} + 1) \\times (\\text{ARR} + 1)} \\implies 20,000 = \\frac{48,000,000}{(0 + 1) \\times (\\text{ARR} + 1)}$$
   $$\\text{ARR} + 1 = \\frac{48,000,000}{20,000} = 2400 \\implies \\text{ARR} = 2399$$

2. **Calculate `CCR` for $50\\%$ Duty Cycle:**
   $$\\text{CCR} = 0.50 \\times \\text{ARR} = 0.50 \\times 2400 = 1200$$

3. **Time Resolution:**
   $$\\Delta t = \\frac{1}{f_{clk}} = \\frac{1}{48 \\times 10^6\\text{ Hz}} = 20.83\\text{ nanoseconds}$$"""
                },
                {
                    "id": "emb-2-4",
                    "heading": "2.4 Interrupt Architectures & The Nested Vectored Interrupt Controller (NVIC)",
                    "content": """Polling wastes valuable CPU cycles in infinite loops. Interrupts allow external hardware events to asynchronously notify the CPU immediately.

### The ARM Cortex-M Nested Vectored Interrupt Controller (NVIC):
- **Vectored Interrupts:** When an interrupt fires, hardware reads the ISR function address directly from the **Vector Table in SRAM/Flash**, jumping to the handler in **under 12 clock cycles** without software branching!
- **Nested Priority:** Higher priority interrupts preempt lower priority ISRs.
- **Priority Grouping:** Splits priority bits into:
  - *Preemption Priority:* Determines if an interrupt can preempt an already running ISR.
  - *Subpriority:* Determines which interrupt executes first if two arrive simultaneously.
- **Hardware Context Saving:** The NVIC hardware automatically pushes $R0-R3, R12, LR, PC,$ and $xPSR$ onto the stack in 12 cycles.
- **Tail-Chaining Optimization:** If an interrupt is pending when an ISR finishes, the NVIC skips unstacking and restacking registers, transitioning to the next ISR in **only 6 clock cycles**!"""
                },
                {
                    "id": "emb-2-5",
                    "heading": "2.5 Interrupt Latency & Critical Sections in Bare-Metal Systems",
                    "content": """### Interrupt Latency:
The elapsed time from the physical arrival of an interrupt voltage edge until the first instruction of the ISR executes:
$$T_{latency} = T_{synchronization} + T_{context\\_stacking} + T_{fetch\\_vector}$$

> [!CAUTION]
> **Race Conditions in ISR Data Sharing:**
> When sharing variables between an ISR and background `main()` code, the variable **must be declared `volatile`**, and multi-byte read/write operations in `main()` must be wrapped in critical sections (disabling interrupts via `__disable_irq()` and `__enable_irq()`) to prevent partial data reads!"""
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
                    "content": """In modern electronics, high-speed serial buses have universally replaced wide parallel buses:
- **Parallel Buses (8, 16, 32 lines):** Suffer from severe **Clock Skew** (signals traveling on adjacent PCB traces arrive at slightly different times) and **Crosstalk** (capacitive/inductive electromagnetic coupling between parallel traces).
- **Serial Buses:** Transmits data bit-by-bit sequentially over 1 to 4 wires. Eliminates inter-line skew, minimizes microcontroller pin counts, and allows high clock frequencies ($> 100\\text{ MHz}$)."""
                },
                {
                    "id": "emb-3-2",
                    "heading": "3.2 Universal Asynchronous Receiver-Transmitter (UART)",
                    "content": """UART is an **asynchronous, point-to-point, full-duplex protocol** requiring only two wires ($TX$ and $RX$).
Because there is no shared clock wire, both transmitter and receiver must be pre-configured to the identical **Baud Rate** (e.g., $9600, 115200\\text{ bps}$).

### UART Data Packet Frame Anatomy:
```
Idle (High) ──┐      ┌───┬───┬───┬───┬───┬───┬───┬───┐  ┌────────┐  ┌────────────┐
              └──────┴───┴───┴───┴───┴───┴───┴───┴───┴──┴────────┴──┴────────────┴── Idle (High)
              START   D0  D1  D2  D3  D4  D5  D6  D7   PARITY       STOP BIT(S)
              (1 bit)       Data (5-9 bits, LSB first) (Optional)   (1-2 bits)
```

1. **Idle State:** Line held at logic HIGH ($V_{DD}$).
2. **Start Bit:** Line pulled LOW for 1 bit-time. Triggers the receiver's internal baud rate counter.
3. **Data Bits:** 5 to 9 bits (typically 8 bits), transmitted **Least Significant Bit (LSB) first**.
4. **Parity Bit (Optional):** Even or odd parity for single-bit error detection.
5. **Stop Bit:** Line held HIGH for 1 or 2 bit-times to delineate byte boundaries.

### $16\\times$ Over-Sampling Clock Recovery:
The receiver samples the incoming RX line at **$16\\times$ the nominal baud rate**. Upon detecting the falling edge of the Start bit, it counts 8 clock ticks to sample right at the stable center of the pulse ($50\\%$ mark), eliminating jitter."""
                },
                {
                    "id": "emb-3-3",
                    "heading": "3.3 Serial Peripheral Interface (SPI)",
                    "content": """SPI (Motorola) is a **synchronous, master-slave, full-duplex, 4-wire serial bus**:

### The 4 SPI Bus Signals:
1. **SCLK (Serial Clock):** Generated exclusively by the Master.
2. **MOSI (Master Out Slave In):** Data sent from Master to Slave.
3. **MISO (Master In Slave Out):** Data sent from Slave to Master.
4. **$\\overline{\\text{SS}}$ / CS (Slave Select / Chip Select):** Active-low line pulled low by Master to select a specific slave.

### Shift Register Exchange Mechanism:
The Master internal 8-bit shift register and Slave internal 8-bit shift register form a continuous **circular ring counter**: on every clock pulse, the Master shifts out one bit on MOSI while shifting in one bit from MISO!

### SPI Clock Polarity & Phase Modes:
Configured by two registers bits:
- **CPOL (Clock Polarity):** Sets idle state of clock line (`0` = Idle Low, `1` = Idle High).
- **CPHA (Clock Phase):** Sets sampling edge (`0` = Sample on 1st edge, `1` = Sample on 2nd edge).

| Mode | CPOL | CPHA | Clock Idle State | Data Sample Edge | Data Shift Edge |
|---|---|---|---|---|---|
| **Mode 0** | 0 | 0 | Low | Rising (1st) | Falling (2nd) |
| **Mode 1** | 0 | 1 | Low | Falling (2nd) | Rising (1st) |
| **Mode 2** | 1 | 0 | High | Falling (1st) | Rising (2nd) |
| **Mode 3** | 1 | 1 | High | Rising (2nd) | Falling (1st) |"""
                },
                {
                    "id": "emb-3-4",
                    "heading": "3.4 Inter-Integrated Circuit ($I^2C$) Bus Architecture",
                    "content": """$I^2C$ (Philips / NXP) is a **synchronous, multi-master, half-duplex, 2-wire serial bus**:
- **SDA (Serial Data Line)**
- **SCL (Serial Clock Line)**
Both lines use **Open-Drain drivers with external Pull-Up Resistors ($1.8\\text{ k}\\Omega - 4.7\\text{ k}\\Omega$)**.

### Bit Transfer Protocol:
1. **Data Validity Rule:** While SCL is HIGH, the SDA line **must remain stable**! SDA is only allowed to transition when SCL is LOW.
2. **START Condition:** SDA transitions from **HIGH to LOW while SCL is HIGH**.
3. **STOP Condition:** SDA transitions from **LOW to HIGH while SCL is HIGH**.
4. **Addressing Byte (8 bits):** Master sends 7-bit Slave Address followed by bit 8 (Read $= 1$, Write $= 0$).
5. **Acknowledge (ACK / NACK):** On the 9th clock pulse, the transmitter releases SDA; the receiver pulls SDA LOW (**ACK**) to confirm byte receipt.

### Multi-Master Clock Synchronization & Bitwise Arbitration:
If two masters transmit simultaneously, wired-AND arbitration applies: if Master 1 outputs `1` (releases SDA) but Master 2 outputs `0` (pulls SDA low), Master 1 detects the mismatch ($0 \\neq 1$), immediately **concedes arbitration**, and switches to slave mode without corrupting Master 2's packet!"""
                },
                {
                    "id": "emb-3-5",
                    "heading": "3.5 Controller Area Network (CAN Bus) & Comprehensive Comparison",
                    "content": """Developed by Robert Bosch (1986) for automotive environments.
- **Differential Signaling:** Uses twisted-pair wires ($CAN_H$ and $CAN_L$) terminated with $120\\ \\Omega$ resistors. High Common-Mode Noise Rejection (CMRR).
- **Recessive (`1`) vs Dominant (`0`):** Dominant bits overwrite recessive bits.
- **Message-Based Addressing:** Packets carry an **11-bit or 29-bit Identifier (ID)** denoting message priority (e.g., Anti-lock braking system $= 0x001$). Lowest numerical ID wins arbitration non-destructively!

---

### Master Protocol Comparison Matrix:
| Protocol | Wire Count | Max Distance | Typical Speed | Topology | Duplex | Synchronization |
|---|---|---|---|---|---|---|
| **UART** | 2 | $< 15\\text{ m}$ (RS-232) | $115.2\\text{ kbps} - 1\\text{ Mbps}$ | Point-to-Point (1 to 1) | Full | Asynchronous (Baud rate) |
| **SPI** | $3 + N$ slaves | $< 30\\text{ cm}$ (Board level) | $10 - 80\\text{ Mbps}$ | Single/Multi-Master Multi-Slave | Full | Synchronous (Shared clock) |
| **$I^2C$** | 2 | $< 3\\text{ m}$ | $100\\text{ k}, 400\\text{ k}, 3.4\\text{ Mbps}$ | Multi-Master Multi-Slave (127 devices) | Half | Synchronous (Open-drain) |
| **CAN Bus** | 2 (Differential) | Up to $1\\text{ km}$ ($40\\text{ m}$ @ 1M) | $1\\text{ Mbps}$ (CAN-FD: $8\\text{ Mbps}$) | Multi-Master Broadcast Bus | Half | Asynchronous Bit-Stuffing |"""
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
                    "content": """### Bare-Metal Super-Loop (Foreground/Background):
```c
while(1) {
    readSensors();
    processControlAlgorithm();
    updateActuators();
}
```
- *Advantages:* Minimal RAM footprint; simple.
- *Fatal Vulnerabilities:* **Non-deterministic response latency**. If `processControlAlgorithm()` takes $40\\text{ ms}$, responding to a sensor button press is delayed by $40\\text{ ms}$. Adding new features degrades the timing of all existing features.

### The RTOS Solution:
An RTOS provides **preemptive, priority-based multitasking**. A software **Scheduler** driven by a periodic hardware timer interrupt (SysTick, typically $1\\text{ kHz} = 1\\text{ ms}$) preempts low-priority background processing instantly whenever a high-priority real-time task needs to execute."""
                },
                {
                    "id": "emb-4-2",
                    "heading": "4.2 Hard Real-Time vs Soft Real-Time Classification",
                    "content": """- **Hard Real-Time Systems:** Missing a single timing deadline results in **catastrophic, total system failure or loss of human life** (e.g., Automotive airbag deployment within $15\\text{ ms}$, pacemaker cardiac pacing, fly-by-wire flight control).
- **Firm Real-Time Systems:** Missing a deadline renders the generated result worthless, but causes no physical destruction (e.g., Financial algorithmic trading, video streaming frame decode).
- **Soft Real-Time Systems:** Meeting deadlines is desirable; missing a deadline degrades Quality of Service (QoS), but the system continues operating normally (e.g., Microwave oven keypad response, web page loading)."""
                },
                {
                    "id": "emb-4-3",
                    "heading": "4.3 FreeRTOS Kernel Architecture & Task Lifecycle",
                    "content": """**FreeRTOS** is the market-leading open-source real-time operating system for microcontrollers.

### Task Control Block (TCB):
Each task is an independent thread of execution with its own private stack allocated from the heap (`pvPortMalloc`).
The TCB contains:
- Current top-of-stack pointer (`pxTopOfStack`).
- Task Priority (Integer from `0` to `configMAX_PRIORITIES - 1`).
- Task State list item.

### The 4 FreeRTOS Task States:
1. **Running:** Task currently executing on the CPU core.
2. **Ready:** Task ready to execute, waiting for CPU assignment.
3. **Blocked:** Task waiting for a temporal delay (`vTaskDelay`) or an external synchronization event (Queue message, Semaphore). Consumes **zero CPU time**.
4. **Suspended:** Explicitly halted via `vTaskSuspend()`.

### Creating a Task in FreeRTOS:
```c
void vTelemetryTask(void *pvParameters) {
    TickType_t xLastWakeTime = xTaskGetTickCount();
    const TickType_t xFrequency = pdMS_TO_TICKS(50); // Periodic 50ms (20Hz)
    
    for(;;) {
        readSensors();
        transmitRadioPacket();
        vTaskDelayUntil(&xLastWakeTime, xFrequency); // Jitter-free periodic sleep
    }
}
```"""
                },
                {
                    "id": "emb-4-4",
                    "heading": "4.4 Real-Time Scheduling Algorithms: RMS vs EDF",
                    "content": """### 1. Rate Monotonic Scheduling (RMS - Liu & Layland 1973):
- **Static Priority Rule:** Assigns static priority strictly proportional to execution frequency: **The shorter the period ($T$), the HIGHER the priority!**
- **Schedulability Bound:** For $n$ independent periodic tasks with execution times $C_i$ and periods $T_i$, the task set is guaranteed to be schedulable if total CPU utilization satisfies:
  $$U = \\sum_{i=1}^n \\frac{C_i}{T_i} \\le n \\cdot (2^{1/n} - 1)$$
  For $n=1$: $U \\le 100\\%$; For $n=2$: $U \\le 82.8\\%$; For $n \\to \\infty$: $U \\le \\ln(2) \\approx 69.3\\%$.

### 2. Earliest Deadline First (EDF):
- **Dynamic Priority Rule:** The task with the closest absolute deadline is assigned highest priority dynamically at runtime.
- **Optimality:** Schedulability bound is a full **$100\\%$ CPU Utilization ($U \\le 1.0$)**! Incurs higher scheduler runtime computational overhead than RMS."""
                },
                {
                    "id": "emb-4-5",
                    "heading": "4.5 The Priority Inversion Crisis & Priority Inheritance Protocols",
                    "content": """### What is Priority Inversion?
A critical bug where a **High-Priority Task ($T_H$) is indirectly blocked by a Low-Priority Task ($T_L$) for an unbounded duration**, caused by a Medium-Priority Task ($T_M$) preempting $T_L$!

### The Canonical Mars Pathfinder Scenario (July 1997):
1. Low-priority meteorological task ($T_L$) acquires a shared mutex to record weather data into an information bus.
2. High-priority attitude control task ($T_H$) wakes up; attempts to acquire the mutex; blocks because $T_L$ holds it.
3. Medium-priority communications task ($T_M$) wakes up. Since $T_M$ has higher priority than $T_L$, **$T_M$ preempts $T_L$**!
4. $T_M$ runs for a long time. Meanwhile, $T_L$ cannot finish to release the mutex, so **$T_H$ is starved of CPU time by the medium-priority task $T_M$**!
5. The watchdog timer detects that $T_H$ has missed its deadline and forces a total system reboot!

### Engineering Solutions:
1. **Priority Inheritance Protocol (PIP):** When $T_H$ blocks on a mutex held by $T_L$, the RTOS kernel temporarily **elevates the priority of $T_L$ to match $T_H$**! Medium-priority tasks ($T_M$) can no longer preempt $T_L$. As soon as $T_L$ releases the mutex, its priority drops back to normal, and $T_H$ preempts immediately.
2. **Priority Ceiling Protocol (PCP):** Each mutex is assigned a static ceiling priority equal to the highest priority of any task that could ever lock it."""
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
                    "content": """An **Analog-to-Digital Converter (ADC)** converts a continuous physical analog voltage $V_{in} \\in [0, V_{ref}]$ into an $N$-bit discrete integer:

$$D_{out} = \\left\\lfloor \\frac{V_{in}}{V_{ref}} \\times (2^N - 1) \\right\\rfloor \\implies V_{in} = \\frac{D_{out}}{2^N - 1} \\times V_{ref}$$

### Core ADC Metrics:
1. **Resolution ($N$ bits):** Determines the minimum detectable voltage change (1 Least Significant Bit - LSB):
   $$1\\text{ LSB} = \\frac{V_{ref}}{2^N}$$
   For a 12-bit ADC with $V_{ref} = 3.3\\text{ V}$: $1\\text{ LSB} = \\frac{3.3}{4096} \\approx 0.806\\text{ mV}$.
2. **Quantization Error:** Inherent rounding error:
   $$E_Q = \\pm \\frac{1}{2}\\text{ LSB}$$
3. **Sampling Rate ($f_s$):** Must satisfy the **Nyquist-Shannon Criterion**: $f_s > 2 f_{max}$. An analog **Anti-Aliasing Low-Pass Filter** must precede the ADC to strip frequencies above $f_s / 2$.

### Successive Approximation Register (SAR) ADC:
The dominant architecture in modern microcontrollers. Uses a binary search algorithm (testing MSB down to LSB using an internal DAC and comparator) to resolve an $N$-bit conversion in **exactly $N$ clock cycles**."""
                },
                {
                    "id": "emb-5-2",
                    "heading": "5.2 Sensor Signal Conditioning & Operational Amplifiers",
                    "content": """Raw sensor signals are often weak (microvolts), high-impedance, or noisy.

### Key Op-Amp Conditioning Circuits:
1. **Voltage Follower (Buffer):** Infinite input impedance, zero output impedance; prevents loading high-impedance resistive sensors (potentiometers, pH probes).
2. **Non-Inverting Amplifier:**
   $$V_{out} = \\left(1 + \\frac{R_f}{R_{in}}\\right) V_{in}$$
3. **Instrumentation Amplifier (3-Op-Amp Topology):** High Common-Mode Rejection Ratio (CMRR $> 100\\text{ dB}$); used to amplify differential millivolt outputs from **Wheatstone bridge strain gauges and thermocouples** while stripping 50/60 Hz mains electromagnetic hum."""
                },
                {
                    "id": "emb-5-3",
                    "heading": "5.3 Actuator Driving: Flyback Protection & H-Bridge Motor Control",
                    "content": """A microcontroller GPIO pin can only source or sink tiny currents ($< 20\\text{ mA}$). Driving high-power inductive loads (DC motors, solenoids, relays) requires discrete driver transistors.

### ⚠️ The Inductive Kickback & Flyback Diode:
An inductor stores energy in its magnetic field ($E = \\frac{1}{2} L I^2$). When a driving transistor suddenly switches OFF, the collapsing magnetic field induces a massive negative reverse voltage spike:
$$V = -L \\frac{dI}{dt}$$
This transient spike can easily reach hundreds of volts, destroying the transistor instantly!
> [!IMPORTANT]
> **Flyback (Freewheeling) Diode Rule:** Always place a fast Schottky diode **in reverse-parallel across the inductive load**. When the transistor turns off, the inductive current safely circulates through the diode until dissipated.

---

### The H-Bridge for Bi-Directional Motor Control:
Consists of four switches ($Q_1, Q_2, Q_3, Q_4$):
- Forward: Turn on $Q_1$ and $Q_4$ (current flows left-to-right).
- Reverse: Turn on $Q_3$ and $Q_2$ (current flows right-to-left).
- **Shoot-Through Hazard:** If $Q_1$ and $Q_2$ are turned on at the same instant, a direct short circuit connects $V_{supply}$ to $GND$, instantly vaporizing the transistors! Hardware motor controllers enforce a mandatory **Dead-Time** delay during transitions."""
                },
                {
                    "id": "emb-5-4",
                    "heading": "5.4 Low-Power Embedded System Design & Sleep Modes",
                    "content": """In battery-operated IoT sensor nodes, total energy consumed is:
$$E = P_{active} \\cdot t_{active} + P_{sleep} \\cdot t_{sleep}$$

### Microcontroller Power Modes (ARM Cortex-M):
1. **Run Mode ($10 - 50\\text{ mA}$):** CPU and all peripheral clocks active.
2. **Sleep Mode ($2 - 5\\text{ mA}$):** CPU core halted (via `WFI` - Wait For Interrupt instruction); peripheral clocks (DMA, Timers, ADC) continue running. Awakens upon any interrupt.
3. **Stop / Deep-Sleep Mode ($10 - 50\\ \\mu\\text{A}$):** Main PLL and high-speed oscillators stopped; 1.2V core regulator in low-power mode; SRAM contents preserved. Awakens via external pin interrupt or RTC alarm.
4. **Standby / Hibernate Mode ($0.5 - 2\\ \\mu\\text{A}$):** 1.2V core regulator completely turned off; SRAM contents lost. Only the Real-Time Clock (RTC) and backup registers remain powered. Awakens via reset sequence."""
                },
                {
                    "id": "emb-5-5",
                    "heading": "5.5 Embedded System Reliability: Watchdog Timers & Brown-Out Detection",
                    "content": """Industrial and aerospace embedded systems must operate autonomously without human intervention to cycle power.

### 1. Watchdog Timer (WDT / IWDG):
An autonomous hardware countdown timer driven by an independent internal low-speed RC oscillator ($32\\text{ kHz}$), completely decoupled from the main crystal clock:
- Background code must periodically **\"kick\" or \"feed\" the watchdog** (reload the counter) within a specified time window ($t_{watchdog}$).
- If a firmware crash, infinite loop, or deadlocked mutex halts the program, the watchdog timer reaches zero and **forces an automatic hardware reset of the microcontroller**!

### 2. Brown-Out Reset (BOR):
Monitors the supply voltage rail ($V_{DD}$). If the supply voltage sags below the minimum operating threshold (e.g., during high motor inrush currents), the BOR circuit clamps the CPU into reset, preventing random memory corruption and erratic program counter execution."""
                }
            ]
        }
    }
