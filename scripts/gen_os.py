"""
Operating Systems (ECEg5401) - All 5 Chapters
Authoritative References:
- Abraham Silberschatz, Peter Baer Galvin, Greg Gagne: Operating System Concepts (10th Ed., "Dinosaur Book")
- Andrew S. Tanenbaum & Herbert Bos: Modern Operating Systems (4th Ed.)
- William Stallings: Operating Systems: Internals and Design Principles (9th Ed.)
- Official AASTU Lecture Notes ECEg5401 (media_1794817826151_0fdacca8.pdf)
"""

def get_os_notes():
    return {
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
                    "content": """An **Operating System (OS)** is system software that manages computer hardware and software resources and provides common services for computer programs. It operates at two primary architectural boundaries:

1. **The OS as an Extended Machine (Top-Down Abstraction):**
   Bare physical hardware (disk platters, PCIe registers, DRAM capacitors) is messy, complex, and hardware-dependent. The OS creates clean, elegant high-level logical abstractions:
   - Transforms raw, unformatted disk sectors into named, hierarchical **Files and Directories**.
   - Transforms raw memory chips into isolated, protected **Virtual Address Spaces**.
   - Transforms complex hardware timer interrupts and CPU registers into scheduled **Processes and Threads**.
2. **The OS as a Resource Allocator (Bottom-Up Management):**
   In modern multi-user, multi-tasking systems, conflicting requests for CPU time, memory space, network bandwidth, and I/O devices must be arbitrated with **fairness, efficiency, and zero starvation**."""
                },
                {
                    "id": "os-1-2",
                    "heading": "1.2 Historical Evolution of Operating Systems (5 Landmark Generations)",
                    "content": """| Generation | Era & Technology | Architectural Characteristics & Milestones | Limitations & Bottlenecks |
|---|---|---|---|
| **1st Gen** | 1945–1955: Vacuum Tubes, Plugboards | **Bare Machine:** No OS existed. A single programmer operated the computer directly using physical switches, punch cards, and machine code. | Tens of hours wasted on physical setup; zero concurrency. |
| **2nd Gen** | 1955–1965: Transistors, Batch Systems | **Batch Processing:** Introduced **GM-NAA I/O (1956)**. Jobs collected on punch cards were transferred to magnetic tape and executed sequentially by a resident monitor. | CPU sat completely idle during slow tape/card reader mechanical I/O operations. |
| **3rd Gen** | 1965–1980: Integrated Circuits (ICs) | **Multiprogramming & Timesharing:** Introduced **IBM System/360** and **UNIX (1969)**. Multiple jobs loaded concurrently into memory; CPU switches when current job waits for I/O. CTSS and MULTICS introduced interactive timesharing. | Complex memory fragmentation and concurrency bugs. |
| **4th Gen** | 1980–2000: VLSI, Personal Computers | **PC Revolution & GUIs:** **CP/M (Gary Kildall 1974)**, **MS-DOS (1981)**, **Apple Macintosh GUI (1984)**, **Windows (1985)**, **Linux (Linus Torvalds 1991)** open-source revolution. | Early desktop systems lacked hardware memory protection. |
| **5th Gen** | 2000s–Present: Mobile, Multi-Core, Cloud | **Mobile & Distributed Virtualization:** **Apple iOS (2007)**, **Android (2008)**, Type-1/Type-2 Hypervisors (KVM, VMware), Docker containers, Kubernetes distributed microservices. | Massive scale, hardware concurrency bugs, hypervisor escapes. |"""
                },
                {
                    "id": "os-1-3",
                    "heading": "1.3 Hardware CPU Protection: Dual-Mode Operation & System Call Traps",
                    "content": """To prevent rogue user applications from crashing the system, writing to arbitrary memory, or hijacking I/O devices, CPUs provide hardware-enforced protection rings:

### 1. Dual-Mode Operation:
The CPU hardware status register contains a dedicated **Mode Bit**:
- **User Mode (Mode Bit = 1):** The CPU executes user application code. A subset of instructions (**Privileged Instructions**) cannot be executed (e.g., modifying page table base registers, disabling hardware interrupts, sending raw commands to disk controllers).
- **Kernel / Supervisor Mode (Mode Bit = 0):** The CPU executes operating system kernel code with unrestricted access to all hardware instructions, memory spaces, and peripheral devices.

### 2. The Trap / System Call Transition Sequence:
When a user application requires privileged services (e.g., writing data to a file via `write()`):
1. **User Mode Execution:** Application places system call arguments in designated CPU registers or onto the user stack.
2. **Executing the Trap:** Application executes a software interrupt instruction (e.g., `syscall` in x86-64, `svc` in ARM).
3. **Hardware Mode Transition:** The CPU hardware automatically:
   - Changes the **Mode Bit from 1 to 0** (entering Kernel Mode).
   - Saves the current Program Counter ($PC$) and Processor Status Word ($PSW$) onto the Kernel Stack.
   - Indexes into the **Interrupt Vector Table (IVT)** to find the kernel's system call dispatch handler.
4. **Kernel Processing:** The kernel validates the requested pointers and system call number, executes the hardware I/O operation, and places the return value into a register.
5. **Return from Trap (`sysret` / `eret`):** CPU restores saved registers, restores the **Mode Bit to 1**, and resumes user execution."""
                },
                {
                    "id": "os-1-4",
                    "heading": "1.4 Operating System Architectural Structures & Kernel Models",
                    "content": """### Structural Paradigms Comparison:
| Kernel Structure | Architecture & Execution Space | Key Strengths | Critical Vulnerabilities & Real-World Examples |
|---|---|---|---|
| **Monolithic Kernel** | Entire OS (scheduler, virtual memory, file systems, all device drivers) executes in a single address space in **Ring 0 Kernel Mode**. | Maximum execution speed (intra-kernel calls are fast direct C function calls; zero IPC context-switch overhead). | **Catastrophic Fragility:** A single null-pointer dereference or memory corruption in any third-party device driver panics the entire kernel. *(Linux, FreeBSD, classic UNIX)* |
| **Microkernel** | Only bare essentials stay in Ring 0: basic thread scheduling, low-level IPC, and minimal interrupt dispatch. File systems, networking stacks, and device drivers run in **User Space (Ring 3)**. | Extreme reliability, modularity, and fault isolation: a crashed driver simply restarts without affecting the kernel. | Performance overhead from continuous context switching and message passing across user-kernel boundaries. *(Mach, QNX, MINIX, seL4)* |
| **Hybrid Kernel** | Combines microkernel modularity with monolithic speed: runs critical subsystems (e.g., graphics/GUI or networking) in kernel space for speed while keeping a modular architecture. | Practical compromise between raw performance and modularity. | Larger kernel surface area. *(Windows NT kernel, Apple macOS XNU kernel)* |

---

### 🔬 High-Yield Real-World Case Study: The July 2024 CrowdStrike Falcon Incident
On July 19, 2024, an invalid memory-address read in a kernel-mode sensor driver update (`csagent.sys`) running at **Ring 0** on 8.5 million Microsoft Windows enterprise machines caused the infamous blue screen of death (`SYSTEM_THREAD_EXCEPTION_NOT_HANDLED`).
Because Windows NT uses a monolithic/hybrid driver architecture where security sensors execute in Kernel Mode, the hardware Memory Management Unit (MMU) faulted with an unhandled exception, causing the entire operating system to crash immediately.
> [!NOTE]
> This disaster underscored the theoretical advantage of **Microkernel architectures** (like QNX or seL4), where a driver crash in Ring 3 would simply kill that user-space process without taking down the operating system!"""
                },
                {
                    "id": "os-1-5",
                    "heading": "1.5 System Bootstrapping Sequence: From Cold Power-On to User Login",
                    "content": """When the power switch is toggled on a computer motherboard:
1. **Power-On Reset:** Power supply stabilizes voltage rails; CPU reset pin released. Program Counter ($PC$) hardwired to fetch first instruction from non-volatile flash ROM at address `0xFFFFFFF0`.
2. **UEFI / BIOS Execution:** Executes **Power-On Self-Test (POST)** to verify DRAM size, PCIe devices, and keyboard/display connectivity.
3. **Bootloader Hand-off:** UEFI locates the EFI System Partition (ESP) or BIOS loads the Master Boot Record (MBR) from sector 0 of the boot disk. Control transfers to the **Stage 2 Bootloader (e.g., GRUB)**.
4. **Kernel Loading:** GRUB loads the compressed OS kernel image (`vmlinuz`) and initial RAM disk (`initrd`) into physical RAM, decompresses the kernel, and jumps to the kernel entry point.
5. **Kernel Initialization:** The kernel sets up page tables, enables virtual memory and hardware paging, initializes device drivers, and mounts the real root filesystem (`/`).
6. **Init Process Spawning:** Kernel spawns Process ID 1 (`/sbin/init` or `systemd`), which spawns background daemons and the user login manager (`gdm` / `login`)."""
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
                    "content": """A **Program** is a passive entity (an executable file stored on disk, e.g., `/usr/bin/python3`), whereas a **Process** is an active entity—a program in execution.

### Memory Layout of a Process in Virtual Memory:
```
High Memory (0xFFFFFFFF)
┌──────────────────────────────────────────────┐
│ Kernel Space (Privileged mapping)            │
├──────────────────────────────────────────────┤
│ User Stack (grows downwards ↓)               │
│ - Local function variables, return addresses │
├──────────────────────────────────────────────┤
│                  ↓↓↓                         │
│             (Unused Space)                   │
│                  ↑↑↑                         │
├──────────────────────────────────────────────┤
│ Heap (grows upwards ↑)                       │
│ - Dynamic memory allocated via malloc()      │
├──────────────────────────────────────────────┤
│ BSS Segment (Uninitialized global/static)    │
├──────────────────────────────────────────────┤
│ Data Segment (Initialized global/static)     │
├──────────────────────────────────────────────┤
│ Text Segment (Compiled read-only machine code)│
└──────────────────────────────────────────────┘
Low Memory (0x00000000)
```

### The Process Control Block (PCB / `task_struct`):
The kernel maintains a dedicated data structure for each active process containing:
1. **Process State:** New, Ready, Running, Waiting, Terminated.
2. **Process Identifier (PID):** Unique integer.
3. **Program Counter ($PC$):** Address of the next machine instruction.
4. **CPU Registers:** Accumulators, index registers, stack pointer ($SP$).
5. **CPU Scheduling Information:** Priority, scheduling queue pointers.
6. **Memory-Management Information:** Page table base pointer (CR3 register in x86).
7. **Accounting & I/O Status:** CPU time consumed, open file descriptor table."""
                },
                {
                    "id": "os-2-2",
                    "heading": "2.2 The 5-State Process Lifecycle & Context Switching",
                    "content": """### The 5 Process States:
1. **New:** Process is being created.
2. **Ready:** Process is loaded in memory waiting to be assigned to a CPU core by the scheduler.
3. **Running:** Instructions are currently being executed by the CPU.
4. **Waiting / Blocked:** Process is waiting for an external event (I/O completion, semaphore release).
5. **Terminated:** Process has finished execution; remains as a "zombie" until its parent collects its exit status via `wait()`.

### The Mechanics of a Context Switch:
A **Context Switch** is the procedure of saving the hardware CPU state of the currently running process and restoring the state of another ready process:
1. An interrupt occurs (timer tick or I/O completion).
2. The kernel saves the CPU registers, $PC$, and $SP$ of Process $P_0$ into its PCB.
3. Kernel changes $P_0$'s state from Running to Ready (or Waiting).
4. Kernel executes scheduling algorithm to select ready process $P_1$.
5. Kernel updates the CPU's memory management registers (flushing the Translation Lookaside Buffer, TLB).
6. Kernel restores registers and $PC$ from $P_1$'s PCB. Mode bit returns to 1.
> [!NOTE]
> **Context Switch Overhead:** During a context switch, the CPU performs zero useful user work. Typical context switch latency ranges from **$1 - 5\\ \\mu\\text{s}$**, heavily influenced by cache and TLB invalidation penalties."""
                },
                {
                    "id": "os-2-3",
                    "heading": "2.3 Threads vs Processes & Multithreading Models",
                    "content": """A **Thread** is the basic unit of CPU execution ("lightweight process").

### Key Differences:
- **Shared by All Threads of a Process:** Address space (Code segment, Data segment, Heap), open file descriptors, child processes.
- **Private to Each Individual Thread:** Thread ID, Program Counter ($PC$), CPU Register set, Private Stack (for local variables and function calls).

### Multithreading Models:
1. **Many-to-One Model:** Many user-level threads mapped to a single kernel thread. Fast user-space thread switching, but **if one thread makes a blocking system call, the entire process blocks**! Cannot utilize multiple CPU cores.
2. **One-to-One Model (Modern Linux / Windows / POSIX `pthreads`):** Each user thread maps directly to an independent kernel thread. Outstanding concurrency across multi-core CPUs; creating too many threads incurs kernel resource overhead.
3. **Many-to-Many Model (M:N / Go Goroutines):** Multiplexes $M$ user threads onto $N$ kernel threads ($M \\ge N$). Maximum flexibility with minimal kernel memory consumption."""
                },
                {
                    "id": "os-2-4",
                    "heading": "2.4 CPU Scheduling Algorithms Taxonomy & Performance Metrics",
                    "content": """### Core Scheduling Metrics:
- **CPU Utilization:** Percentage of time CPU is executing work (Target: $40\\% - 90\\%$).
- **Throughput:** Number of completed processes per unit time.
- **Turnaround Time ($TAT$):** Interval from job arrival to job termination:
  $$TAT = T_{finish} - T_{arrival}$$
- **Waiting Time ($W$):** Total time spent waiting in the ready queue:
  $$W = TAT - T_{burst}$$
- **Response Time ($R$):** Time from job submission until the very first CPU output response.

---

### Algorithm Taxonomy:
1. **First-Come, First-Served (FCFS - Non-preemptive):**
   - Simple FIFO queue.
   - **The Convoy Effect:** If a massive CPU-bound process arrives first, all short I/O-bound processes sit blocked behind it, cratering device utilization and average waiting time.
2. **Shortest Job First (SJF / SRTF - Provably Optimal):**
   - Schedules the process with the shortest next CPU burst.
   - **Provably Optimal:** Delivers the minimum possible average waiting time.
   - *Limitation:* Future CPU burst duration cannot be known in advance; must be estimated using exponential smoothing:
     $$\\tau_{n+1} = \\alpha t_n + (1 - \\alpha) \\tau_n$$
3. **Round Robin (RR - Preemptive):**
   - Each process is allocated a cyclic time slice called a **Time Quantum ($q$)**.
   - If $q$ is extremely large ($q \\to \\infty$), RR degenerates into **FCFS**.
   - If $q$ is extremely small ($q \\to 0$), context-switching overhead dominates CPU time. Standard rule of thumb: $q$ should be chosen such that **$80\\%$ of CPU bursts are shorter than $q$** (typically $10 - 50\\text{ ms}$).
4. **Multilevel Feedback Queue (MLFQ):**
   - The gold standard for modern general-purpose operating systems.
   - Multiple priority queues with differing time quanta.
   - I/O-bound interactive processes stay at high-priority levels; long CPU-bound compute jobs sink down to lower-priority levels with large time quanta. Employs **Aging** to prevent starvation."""
                },
                {
                    "id": "os-2-5",
                    "heading": "2.5 Comprehensive CPU Scheduling Numerical Problem & Gantt Chart",
                    "content": """### 🧮 Worked Numerical Problem:
**Scenario:** Four processes arrive in the ready queue as follows:

| Process | Arrival Time ($T_{arr}$) | Burst Time ($T_{burst}$) |
|---|---|---|
| **$P_1$** | $0\\text{ ms}$ | $8\\text{ ms}$ |
| **$P_2$** | $1\\text{ ms}$ | $4\\text{ ms}$ |
| **$P_3$** | $2\\text{ ms}$ | $9\\text{ ms}$ |
| **$P_4$** | $3\\text{ ms}$ | $5\\text{ ms}$ |

**Calculate and Compare:**
1. FCFS Scheduling
2. Shortest Remaining Time First (SRTF - Preemptive SJF)
3. Round Robin with Time Quantum $q = 4\\text{ ms}$
Determine the Gantt chart and **Average Waiting Time ($W_{avg}$)** for each.

---

### Step-by-Step Solution:

#### 1. FCFS (First-Come, First-Served):
- Order of execution: $P_1 \\to P_2 \\to P_3 \\to P_4$
- **Gantt Chart:**
  `[ P1: 0 - 8 ] [ P2: 8 - 12 ] [ P3: 12 - 21 ] [ P4: 21 - 26 ]`
- Finish Times: $P_1 = 8, P_2 = 12, P_3 = 21, P_4 = 26$
- Turnaround Time: $TAT = T_{fin} - T_{arr}$
  - $TAT(P_1) = 8 - 0 = 8$
  - $TAT(P_2) = 12 - 1 = 11$
  - $TAT(P_3) = 21 - 2 = 19$
  - $TAT(P_4) = 26 - 3 = 23$
- Waiting Time: $W = TAT - T_{burst}$
  - $W(P_1) = 8 - 8 = 0\\text{ ms}$
  - $W(P_2) = 11 - 4 = 7\\text{ ms}$
  - $W(P_3) = 19 - 9 = 10\\text{ ms}$
  - $W(P_4) = 23 - 5 = 18\\text{ ms}$
$$W_{avg, FCFS} = \\frac{0 + 7 + 10 + 18}{4} = \\frac{35}{4} = 8.75\\text{ ms}$$

#### 2. SRTF (Preemptive SJF):
- At $t=0$: $P_1$ starts (burst 8).
- At $t=1$: $P_2$ arrives with burst 4. $P_1$ remaining = 7. Since $4 < 7$, $P_1$ is **preempted**! $P_2$ runs.
- At $t=2$: $P_3$ arrives (burst 9). $P_2$ remaining = 3. $P_2$ continues.
- At $t=3$: $P_4$ arrives (burst 5). $P_2$ remaining = 2. $P_2$ continues.
- At $t=5$: $P_2$ finishes. Remaining: $P_1(7), P_3(9), P_4(5)$. Shortest is $P_4$ (runs from $5 - 10$).
- At $t=10$: $P_4$ finishes. Remaining: $P_1(7), P_3(9)$. Shortest is $P_1$ (runs from $10 - 17$).
- At $t=17$: $P_1$ finishes. Remaining: $P_3(9)$ (runs from $17 - 26$).
- **Gantt Chart:**
  `[ P1: 0 - 1 ] [ P2: 1 - 5 ] [ P4: 5 - 10 ] [ P1: 10 - 17 ] [ P3: 17 - 26 ]`
- Finish Times: $P_2 = 5, P_4 = 10, P_1 = 17, P_3 = 26$
- Waiting Times:
  - $W(P_2) = 5 - 1 - 4 = 0\\text{ ms}$
  - $W(P_4) = 10 - 3 - 5 = 2\\text{ ms}$
  - $W(P_1) = (1 - 0) + (10 - 1) = 0 + 9 = 9\\text{ ms}$ (waited from 1 to 10)
  - $W(P_3) = 17 - 2 = 15\\text{ ms}$
$$W_{avg, SRTF} = \\frac{9 + 0 + 15 + 2}{4} = \\frac{26}{4} = 6.50\\text{ ms}$$
**Notice:** SRTF achieves significantly lower waiting time ($6.50\\text{ ms}$ vs $8.75\\text{ ms}$)!"""
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
                    "content": """A **Race Condition** occurs when multiple concurrent processes or threads access and manipulate shared data, and the final outcome depends on the precise, non-deterministic order in which execution interleaves.

### The Critical Section Problem:
A code segment where shared variables or resources are accessed is designated as the **Critical Section (CS)**.
Any valid synchronization protocol must strictly satisfy three fundamental criteria:
1. **Mutual Exclusion:** If process $P_i$ is executing in its critical section, then no other processes can be executing in their critical sections.
2. **Progress:** If no process is executing in its critical section and there are some processes that wish to enter their critical sections, then only those processes not executing in their remainder sections can participate in deciding which will enter next, and this selection cannot be postponed indefinitely.
3. **Bounded Waiting:** There exists a bound on the number of times other processes are allowed to enter their critical sections after a process has made a request to enter and before that request is granted (prevents starvation)."""
                },
                {
                    "id": "os-3-2",
                    "heading": "3.2 Hardware Synchronization: TestAndSet & CompareAndSwap",
                    "content": """Software-only protocols (like Peterson's Algorithm) fail on modern multi-core processors due to out-of-order execution and store buffering unless strict memory barrier fences are used. Modern kernels rely on **atomic hardware read-modify-write CPU instructions**:

### 1. `TestAndSet` (TAS):
Atomically reads the memory value, sets it to `true`, and returns the original value in an indivisible bus cycle:
```c
boolean TestAndSet(boolean *target) {
    boolean rv = *target;
    *target = TRUE;
    return rv;
}
```
Implementation of Mutual Exclusion with TAS:
```c
while (TestAndSet(&lock)); // Busy wait spinlock
// --- CRITICAL SECTION ---
lock = FALSE;
// --- REMAINDER SECTION ---
```

### 2. `CompareAndSwap` (CAS):
Operates on three operands: a memory location `value`, expected old value `expected`, and new value `new_value`:
```c
int CompareAndSwap(int *value, int expected, int new_value) {
    int temp = *value;
    if (*value == expected)
        *value = new_value;
    return temp;
}
```
Forms the bedrock of all lock-free concurrent data structures and Java `AtomicInteger`."""
                },
                {
                    "id": "os-3-3",
                    "heading": "3.3 High-Level Synchronization: Semaphores & Classical Problems",
                    "content": """Edsger Dijkstra (1965) introduced the **Semaphore ($S$)**: an integer variable that, apart from initialization, is accessed only through two standard atomic operations: `wait()` (traditionally $P$) and `signal()` (traditionally $V$):

```c
wait(S) {
    S--;
    if (S < 0) {
        add this process to S.queue;
        block(); // Yield CPU without busy spinning!
    }
}

signal(S) {
    S++;
    if (S <= 0) {
        remove a process P from S.queue;
        wakeup(P);
    }
}
```

- **Counting Semaphore:** Integer value can range over an unrestricted domain (used for resource pool management).
- **Binary Semaphore (Mutex Lock):** Value ranges only between $0$ and $1$.

---

### Classical Concurrency Problems:
1. **The Bounded-Buffer (Producer-Consumer) Problem:**
   Uses three semaphores: `mutex = 1`, `empty = N`, `full = 0`.
   - Producer waits on `empty`, locks `mutex`, inserts item, unlocks `mutex`, signals `full`.
   - Consumer waits on `full`, locks `mutex`, removes item, unlocks `mutex`, signals `empty`.
2. **The Dining Philosophers Problem:**
   Five philosophers sitting around a circular table with 5 chopsticks. Each philosopher needs two chopsticks to eat. If all simultaneously pick up their left chopstick, **Deadlock ensues**! Solution: Asymmetric pickup (odd philosophers pick left first, even philosophers pick right first) or limiting diners to 4."""
                },
                {
                    "id": "os-3-4",
                    "heading": "3.4 Deadlock Characterization: Coffman's 4 Necessary Conditions",
                    "content": """A **Deadlock** is a state where every member of a set of processes is permanently blocked waiting for an event that can only be triggered by another process within the same set.

E. G. Coffman (1971) proved that a deadlock can arise **if and only if ALL FOUR of the following conditions hold simultaneously**:
1. **Mutual Exclusion:** At least one resource must be held in a non-shareable mode (only one process at a time).
2. **Hold and Wait:** A process must currently hold at least one resource while waiting to acquire additional resources currently held by other processes.
3. **No Preemption:** Resources cannot be forcibly preempted from a holding process; resources are released only voluntarily by the holding process upon completion.
4. **Circular Wait:** There must exist a closed chain of processes $\\{P_0, P_1, \\dots, P_n\\}$ such that $P_0$ is waiting for a resource held by $P_1$, $P_1$ is waiting for $P_2$, ..., and $P_n$ is waiting for $P_0$.

> [!IMPORTANT]
> If you break **EVEN ONE** of these four conditions, deadlocks become mathematically impossible! For example, assigning a strict global linear hierarchy to all resource IDs ($R_1 < R_2 < \\dots < R_m$) and requiring processes to request resources in strictly ascending numerical order completely eliminates **Circular Wait**."""
                },
                {
                    "id": "os-3-5",
                    "heading": "3.5 Deadlock Avoidance: Dijkstra's Banker's Algorithm",
                    "content": """The **Banker's Algorithm** is a deadlock avoidance algorithm for systems with multiple instances of each resource type. It ensures the system never enters an **Unsafe State**.

### Data Structures:
- $n$: Number of processes; $m$: Number of resource types.
- $\\text{Available}[m]$: Available vector of each resource type.
- $\\text{Max}[n][m]$: Maximum demand of each process.
- $\\text{Allocation}[n][m]$: Amount currently allocated to each process.
- $\\text{Need}[n][m] = \\text{Max}[n][m] - \\text{Allocation}[n][m]$.

### Safety Algorithm:
1. Let $\\text{Work} = \\text{Available}$, and $\\text{Finish}[i] = \\text{false}$ for all $i$.
2. Find an index $i$ such that:
   $\\text{Finish}[i] == \\text{false}$ and $\\text{Need}_i \\le \\text{Work}$.
   If no such $i$ exists, go to step 4.
3. $\\text{Work} = \\text{Work} + \\text{Allocation}_i$; $\\text{Finish}[i] = \\text{true}$. Go to step 2.
4. If $\\text{Finish}[i] == \\text{true}$ for all $i$, the system is in a **Safe State** with safe sequence $\\langle P_i, \\dots \\rangle$. Otherwise, the system is **Unsafe (risk of deadlock)**."""
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
                    "content": """Addresses in a program undergo transformation across compilation stages:
1. **Compile Time:** Generates absolute physical addresses (requires knowledge of load address).
2. **Load Time:** Compiler generates relocatable addresses; loader binds relative addresses to base offset.
3. **Execution / Run Time:** Binding delayed until runtime. Process can be moved around memory during execution. **Requires hardware MMU support**.

### Hardware Protection with Base and Limit Registers:
- **Base Register:** Holds the smallest physical memory address allocated to the process.
- **Limit Register:** Specifies the total size (range) of the process address space.
- Every generated logical address is validated by hardware:
  $$0 \\le \\text{Address} < \\text{Limit}$$
  If valid, Physical Address = $\\text{Base} + \\text{Address}$. If invalid, the CPU traps with a **Segmentation Fault**."""
                },
                {
                    "id": "os-4-2",
                    "heading": "4.2 Contiguous Memory Allocation & Fragmentation",
                    "content": """### Dynamic Storage-Allocation Strategies:
When a new process requests $N$ bytes of memory from a list of free holes:
1. **First-Fit:** Allocates the *first* hole that is large enough. Fast search ($O(1)$ to $O(k)$).
2. **Best-Fit:** Allocates the *smallest* hole that is large enough. Produces smallest leftover fragments, but creates numerous microscopic unusable holes.
3. **Worst-Fit:** Allocates the *largest* hole. Produces largest leftover fragments, but slowest search.

### External vs Internal Fragmentation:
- **External Fragmentation:** Total free memory is sufficient to satisfy a request, but storage is fragmented into scattered non-contiguous pieces.
- **Internal Fragmentation:** Memory allocated in fixed block chunks exceeds the actual size requested by the process. The unused memory internal to the block is wasted."""
                },
                {
                    "id": "os-4-3",
                    "heading": "4.3 Paging Architecture & Hardware Translation Lookaside Buffer (TLB)",
                    "content": """Paging eliminates external fragmentation by partitioning:
- **Physical Memory** into fixed-size blocks called **Frames**.
- **Logical / Virtual Memory** into contiguous blocks of the exact same size called **Pages** (typically $4\\text{ KB}$).

### Logical Address Translation:
A CPU logical address is split into:
$$\\text{Logical Address} = [\\text{Page Number } (p) \\mid \\text{Offset } (d)]$$
- Page number $p$ indexes into the **Page Table** to find the physical Frame Number $f$.
- Physical Address = $[f \\mid d]$.

### Translation Lookaside Buffer (TLB) & Effective Memory Access Time:
Because the page table resides in RAM, every memory reference requires **two physical memory accesses** (one for page table entry, one for actual data).
To solve this, the CPU contains an ultra-fast associative hardware cache called the **Translation Lookaside Buffer (TLB)**.

### Mathematical EMAT Derivation:
- $\\alpha$: TLB Hit Ratio ($0 \\le \\alpha \\le 1$).
- $t_{TLB}$: TLB lookup time (e.g., $1\\text{ ns}$).
- $t_{RAM}$: Main memory access time (e.g., $50\\text{ ns}$).

$$\\text{Effective Memory Access Time (EMAT)} = \\alpha \\cdot (t_{TLB} + t_{RAM}) + (1 - \\alpha) \\cdot (t_{TLB} + 2 \\cdot t_{RAM})$$

---

### 🧮 Worked Numerical Example:
**Scenario:** A system has a main memory access time $t_{RAM} = 80\\text{ ns}$ and a TLB search latency $t_{TLB} = 5\\text{ ns}$.
1. Calculate EMAT for a TLB hit ratio of $95\\%$ ($\\alpha = 0.95$).
2. Calculate EMAT if the hit ratio drops to $80\\%$ ($\\alpha = 0.80$).

**Step-by-Step Calculation:**
1. **At $95\\%$ Hit Ratio:**
   $$\\text{EMAT} = 0.95 \\times (5 + 80) + (1 - 0.95) \\times (5 + 2 \\times 80)$$
   $$\\text{EMAT} = 0.95 \\times 85 + 0.05 \\times 165 = 80.75 + 8.25 = 89.0\\text{ ns}$$
   Notice that access time increases by only $\\approx 11\\%$ over bare RAM!

2. **At $80\\%$ Hit Ratio:**
   $$\\text{EMAT} = 0.80 \\times 85 + 0.20 \\times 165 = 68.0 + 33.0 = 101.0\\text{ ns}$$"""
                },
                {
                    "id": "os-4-4",
                    "heading": "4.4 Virtual Memory, Demand Paging & Page Fault Handling",
                    "content": """**Virtual Memory** decouples logical memory as perceived by the programmer from physical memory, allowing the execution of processes whose address space exceeds total physical RAM.

### Pure Demand Paging:
Pages are loaded into physical memory **only when referenced during execution** (lazy swapper).
Each Page Table Entry (PTE) contains a **Valid-Invalid Bit**:
- `1` (Valid): Page is legal and currently present in physical RAM.
- `0` (Invalid): Page is either outside the process address space or currently residing on the secondary swap disk.

### The 6-Step Page Fault Hardware Routine:
1. CPU references memory location; MMU inspects PTE. Valid-invalid bit is `0`.
2. MMU triggers an internal hardware trap to the OS kernel: **Page Fault**.
3. Kernel examines internal PCB table to verify if the address is a genuine legal memory access.
4. Kernel finds a free frame in physical RAM (or invokes a Page Replacement algorithm if no free frame exists).
5. Kernel schedules disk I/O to read the desired page from swap space into the allocated physical frame.
6. When disk read finishes, kernel updates PTE (sets frame number and valid bit to `1`), restores saved process state, and **restarts the exact machine instruction that caused the fault**."""
                },
                {
                    "id": "os-4-5",
                    "heading": "4.5 Page Replacement Algorithms: FIFO, Optimal & LRU",
                    "content": """When a page fault occurs and all physical memory frames are occupied, the OS must choose a **victim page** to evict to disk.

### 1. FIFO (First-In, First-Out):
- Evicts the oldest page loaded in memory.
- **Bélády's Anomaly:** Counter-intuitively, for some reference strings, **increasing the number of allocated physical frames results in MORE page faults**!

### 2. Optimal Algorithm (OPT / MIN - Theoretical Benchmark):
- Evicts the page that will **not be used for the longest period in the future**.
- Delivers the lowest possible page fault rate, but physically impossible to implement in practice because the kernel cannot predict the future.

### 3. Least Recently Used (LRU - Practical Gold Standard):
- Evicts the page that has not been referenced for the longest period of time (approximating OPT by using the past as an indicator of the future).
- Belongs to the class of **Stack Algorithms** (provably immune to Bélády's Anomaly).
- Implementations: Hardware Counter (64-bit clock tick on each access) or Doubly-Linked Stack.
- Approximations: **Second-Chance (Clock) Algorithm** using a 1-bit reference flag."""
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
                    "content": """A **File** is a contiguous logical address space recorded on secondary storage.

### Directory Topologies:
1. **Single-Level Directory:** All files in same directory. Massive name collision issues.
2. **Two-Level Directory:** Master directory holds separate User File Directories (UFD).
3. **Tree-Structured Directory (Modern Standard):** Arbitrary subdirectories. Pathnames are either Absolute (`/home/user/test.c`) or Relative (`./test.c`).
4. **Acyclic-Graph Directory:** Allows directories to share subdirectories and files via **Hard Links** (multiple directory entries pointing to the identical inode) and **Symbolic / Soft Links** (pointer file containing pathname string)."""
                },
                {
                    "id": "os-5-2",
                    "heading": "5.2 UNIX/Linux Inode-Based File System Implementation",
                    "content": """In UNIX/Linux ext2/ext3/ext4 file systems, a file is identified by an **Index Node (Inode)**:

### Structure of a Classic UNIX Inode:
An Inode contains file metadata (owner UID, permissions, file size, timestamps) and an array of **15 block pointers**:
- **12 Direct Pointers:** Point directly to the first 12 data blocks of the file. Allows lightning-fast access for small files ($12 \\times 4\\text{ KB} = 48\\text{ KB}$).
- **1 Single Indirect Pointer:** Points to an index block containing 1024 pointers to data blocks ($1024 \\times 4\\text{ KB} = 4\\text{ MB}$).
- **1 Double Indirect Pointer:** Points to an index block of index blocks ($1024 \\times 1024 \\times 4\\text{ KB} = 4\\text{ GB}$).
- **1 Triple Indirect Pointer:** Points to a three-level index tree ($1024^3 \\times 4\\text{ KB} = 4\\text{ TB}$).

> [!NOTE]
> Filenames are **NOT stored in the Inode**! Directory files are simply tabular lists mapping strings (filenames) to Inode numbers."""
                },
                {
                    "id": "os-5-3",
                    "heading": "5.3 Disk Storage Allocation Methods",
                    "content": """| Allocation Method | Mechanics | Advantages | Disadvantages |
|---|---|---|---|
| **Contiguous Allocation** | File occupies a contiguous set of consecutive disk sectors. | Blazing sequential access; easy random access. | Severe **External Fragmentation**; file size cannot expand dynamically. |
| **Linked Allocation** | Each disk block contains a data payload and a pointer to the next block. | Zero external fragmentation; dynamic growth. | Extremely slow random access ($O(N)$ traversal); pointer overhead; a single lost pointer corrupts entire file. |
| **File Allocation Table (FAT)** | Pointers moved from data blocks into a central memory-resident table. | Fast directory search; simple. | Table can become large in RAM; still requires linked traversal. |
| **Indexed Allocation** | Each file has an index block (or Inode) containing all block pointers. | Fast direct random access; zero external fragmentation. | Index block overhead for tiny files. |"""
                },
                {
                    "id": "os-5-4",
                    "heading": "5.4 Mass-Storage Structure & Disk Access Latency Formulation",
                    "content": """### Magnetic Hard Disk Drive (HDD) Geometry:
- Rotating platters coated with magnetic material spinning at constant speed ($5400 - 15000\\text{ RPM}$).
- Data organized in concentric circular **Tracks** divided into $512$-byte or $4096$-byte **Sectors**.
- A vertical stack of identical tracks across all platters forms a **Cylinder**.

### Total Disk Access Latency:
$$T_{access} = T_{seek} + T_{rotational} + T_{transfer}$$

1. **Seek Time ($T_{seek}$):** Time required for the mechanical actuator arm to position read/write heads over the target cylinder ($3 - 10\\text{ ms}$). Dominates access time!
2. **Rotational Latency ($T_{rotational}$):** Average time waiting for the target sector to rotate underneath the head:
   $$T_{rotational} = \\frac{1}{2 \\times \\text{RPM}} \\times 60\\text{ seconds}$$
   For a $7200\\text{ RPM}$ disk: $T_{rot} = \\frac{60}{2 \\times 7200} = 4.17\\text{ ms}$.
3. **Transfer Time ($T_{transfer}$):** Time to stream data bytes off the platter:
   $$T_{transfer} = \\frac{b}{N \\times \\text{RPM}}$$"""
                },
                {
                    "id": "os-5-5",
                    "heading": "5.5 Disk Scheduling Algorithms: SSTF, SCAN & LOOK",
                    "content": """Disk scheduling reorders pending I/O track requests to minimize mechanical head movement (total head cylinders traversed).

### Algorithm Comparison:
1. **FCFS:** Serves requests strictly in arrival order. Fair, but wild mechanical swinging across platters.
2. **SSTF (Shortest Seek Time First):** Selects the pending request closest to current head position. Minimizes average response time, but suffers from **Starvation** of distant cylinders!
3. **SCAN (Elevator Algorithm):** Head moves in one direction across the disk, servicing all requests along the path until reaching the final cylinder, then reverses direction. Eliminates starvation.
4. **C-SCAN (Circular SCAN):** Head sweeps in one direction servicing requests; upon hitting the disk boundary, it snaps directly back to cylinder 0 without servicing requests on the return trip. Delivers a more uniform wait time distribution.
5. **LOOK / C-LOOK:** Like SCAN/C-SCAN, but the head reverses as soon as the last request in that direction is reached, without traveling all the way to the physical edge."""
                }
            ]
        }
    }
