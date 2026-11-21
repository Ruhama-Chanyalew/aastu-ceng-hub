"""
Software Engineering (ECEg5409) - All 5 Chapters
Authoritative References:
- Roger S. Pressman & Bruce R. Maxim: Software Engineering: A Practitioner's Approach (8th/9th Ed.)
- Ian Sommerville: Software Engineering (10th Ed.)
- Stephen R. Schach: Object-Oriented and Classical Software Engineering (7th Ed.)
- Official AASTU Course Content Outline ECEg5409 (media_1794817814162_64b7411d.pdf)
"""

def get_se_notes():
    return {
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
                    "content": """The **Software Crisis** (NATO Science Committee, Garmisch 1968) arose when software projects routinely exceeded budgets, slipped past delivery deadlines, caused catastrophic system failures, and proved impossible to maintain. **Software Engineering** emerged to apply disciplined, systematic, quantifiable engineering methodologies to software construction.

### Primary Software Life Cycle Models:
| Process Model | Operational Philosophy | Key Strengths | Fatal Vulnerabilities & Ideal Use Cases |
|---|---|---|---|
| **Classical Waterfall** | Strict linear sequential phases (Requirements $\\to$ Design $\\to$ Code $\\to$ Test $\\to$ Deploy). | Clean documentation; milestone clarity for fixed projects. | **Zero Tolerance for Requirement Changes:** Working software appears only at the very end; late integration failures. |
| **V-Model (Verification & Validation)** | Bends the waterfall upwards, pairing every development phase directly with a corresponding testing phase. | Explicit test planning upfront (Unit tests derived from detail design, Acceptance tests from requirements). | Still rigid and sequential. |
| **Prototyping Model** | Rapid mockups built iteratively to elicit ambiguous customer requirements. | Excellent customer feedback and requirement clarity. | Risk that prototype code is rushed into production without refactoring. |
| **Spiral Model (Barry Boehm 1988)** | Risk-driven cyclic process divided into four quadrants: Determine Objectives $\\to$ Risk Analysis $\\to$ Engineering $\\to$ Customer Evaluation. | Superb risk management for large, high-consequence, mission-critical systems. | Expensive; requires deep risk assessment expertise. |
| **Agile (Scrum / Kanban / XP)** | Adaptive, iterative development producing working software in short $1 - 4$ week **Sprints**. Embraces changing requirements. | Rapid time-to-market; continuous stakeholder feedback. | Vulnerable to scope creep; minimal formal documentation for enterprise audits. |"""
                },
                {
                    "id": "se-1-2",
                    "heading": "1.2 Software Scope Management & Work Breakdown Structure (WBS)",
                    "content": """### Software Scope Definition:
Defines the functional boundaries, deliverables, data inputs/outputs, performance constraints, and external system interfaces.
- **Feasibility Study (TELOS Framework):**
  - **T - Technical:** Do we possess the hardware, libraries, and engineering expertise?
  - **E - Economic:** Cost-benefit analysis; Return on Investment (ROI); Net Present Value (NPV).
  - **L - Legal:** Copyrights, licensing (GPL vs MIT), data privacy compliance (GDPR, Ethiopian data protection regulations).
  - **O - Operational:** Will end-users embrace the software in their operational workflow?
  - **S - Schedule:** Can the system be deployed before the market opportunity closes?

### The Work Breakdown Structure (WBS):
A hierarchical decomposition of the total project scope into manageable work packages. A work package must have a measurable completion milestone, a single assigned owner, and an estimated duration ($1 - 2$ person-weeks)."""
                },
                {
                    "id": "se-1-3",
                    "heading": "1.3 Software Estimation Techniques: Function Points & Boehm's COCOMO",
                    "content": """Software cost estimation determines the required effort (person-months) and development schedule.

### 1. Function Point Analysis (FPA - Allan Albrecht):
Measures software size from the user's perspective, independent of programming language:
$$\\text{Unadjusted Function Points (UFP)} = \\sum_{i=1}^5 w_i \\cdot C_i$$
Categorizes functionality into 5 components:
1. **External Inputs (EI):** User data entry, control screens.
2. **External Outputs (EO):** Reports, calculated summaries.
3. **External Inquiries (EQ):** Database search queries with immediate responses.
4. **Internal Logical Files (ILF):** User-identifiable logical data stored inside the system.
5. **External Interface Files (EIF):** Data shared across system boundaries.

$$\\text{Final FP} = \\text{UFP} \\times \\left( 0.65 + 0.01 \\times \\sum_{i=1}^{14} F_i \\right)$$
Where $\\sum F_i$ represents 14 General System Characteristics (GSCs) graded $0$ to $5$.

---

### 2. Boehm's COCOMO I (Constructive Cost Model):
Relates effort ($E$ in Person-Months) and development time ($T_{dev}$ in months) to thousands of delivered source lines of code (KLOC):

$$E = a \\cdot (\\text{KLOC})^b \\quad [\\text{Person-Months}]$$
$$T_{dev} = c \\cdot (E)^d \\quad [\\text{Months}]$$

| Project Mode | Description & Complexity | $a$ | $b$ | $c$ | $d$ |
|---|---|---|---|---|---|
| **Organic** | Small, experienced team working in familiar environment with flexible requirements ($< 50\\text{ KLOC}$). | $2.4$ | $1.05$ | $2.5$ | $0.38$ |
| **Semi-Detached** | Medium-sized team with mixed experience and moderate interface constraints ($50 - 300\\text{ KLOC}$). | $3.0$ | $1.12$ | $2.5$ | $0.35$ |
| **Embedded** | Tight hardware/software coupling; severe constraints; flight control, medical systems ($> 300\\text{ KLOC}$). | $3.6$ | $1.20$ | $2.5$ | $0.32$ |

---

### 🧮 Worked Numerical Problem:
**Problem:** An AASTU student team is estimating an embedded automotive telemetry controller.
- Code size is estimated at $40\\text{ KLOC}$.
- System is classified under **Embedded Mode** ($a = 3.6, b = 1.20, c = 2.5, d = 0.32$).
Calculate: (a) Total effort in Person-Months ($E$), (b) Development duration in months ($T_{dev}$), (c) Recommended team size.

**Solution:**
1. **Effort ($E$):**
   $$E = 3.6 \\times (40)^{1.20}$$
   Since $40^{1.20} \\approx 82.86$:
   $$E = 3.6 \\times 82.86 \\approx 298.3\\text{ Person-Months}$$

2. **Development Duration ($T_{dev}$):**
   $$T_{dev} = 2.5 \\times (298.3)^{0.32}$$
   Since $(298.3)^{0.32} \\approx 6.18$:
   $$T_{dev} = 2.5 \\times 6.18 \\approx 15.45\\text{ Months}$$

3. **Recommended Full-Time Team Size:**
   $$\\text{Staff Size} = \\frac{E}{T_{dev}} = \\frac{298.3}{15.45} \\approx 19.3 \\implies 19 - 20\\text{ engineers}$$"""
                },
                {
                    "id": "se-1-4",
                    "heading": "1.4 Software Project Scheduling & Critical Path Method (CPM / PERT)",
                    "content": """Software project scheduling decomposes project activities into dependency networks:

### Critical Path Method (CPM):
- **Activity Network Graph:** Nodes represent milestones; directed edges represent activities with durations $t$.
- **Early Start ($ES$):** Earliest time an activity can start (calculated via Forward Pass):
  $$ES_j = \\max_{i \\in Pred(j)} (ES_i + t_i)$$
- **Late Start ($LS$):** Latest time an activity can start without delaying project completion (calculated via Backward Pass):
  $$LF_i = \\min_{j \\in Succ(i)} (LS_j), \\quad LS_i = LF_i - t_i$$
- **Total Float / Slack Time ($S$):**
  $$S = LS - ES = LF - EF$$
- **The Critical Path:** The continuous sequence of activities from start to finish with **Zero Slack ($S = 0$)**. Any delay in a critical activity directly delays project delivery!"""
                },
                {
                    "id": "se-1-5",
                    "heading": "1.5 Software Risk Analysis & Mitigation Strategies",
                    "content": """### Risk Management Lifecycle:
1. **Risk Identification:** Brainstorming potential threats (Staff turnover, Unrealistic deadlines, Requirement volatility, Vendor tool obsolescence).
2. **Risk Projection / Assessment:** Quantifying Risk Exposure ($RE$):
   $$RE = P(\\text{Risk}) \\times \\text{Impact (\\$ or Days)}$$
3. **Risk Mitigation, Monitoring & Management (RMMM Plan):**
   - *Mitigation:* Proactive steps to reduce risk probability (e.g., cross-training developers to prevent bus-factor failure).
   - *Contingency:* Pre-planned recovery actions if the risk occurs."""
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
                    "content": """**Requirements Engineering (RE)** is the disciplined process of discovering, analyzing, documenting, and validating the services a software system must provide and the operational constraints under which it must function.

### Five Core Phases of RE:
1. **Inception & Elicitation:** Engaging stakeholders through interviews, focus groups, Joint Application Development (JAD) workshops, questionnaires, and observation to extract latent customer needs.
2. **Analysis & Negotiation:** Resolving conflicts between competing stakeholder requirements (e.g., marketing demands 50 new features; engineering has an 8-week delivery deadline).
3. **Specification:** Authoring the formal, unambiguous Software Requirements Specification (SRS) document.
4. **Validation:** Reviewing and inspecting the SRS with customers to verify that the requirements describe the intended system before coding commences.
5. **Requirements Management:** Controlling changing requirements through formal change request workflows and traceability matrices."""
                },
                {
                    "id": "se-2-2",
                    "heading": "2.2 Functional vs Non-Functional Requirements (The FURPS+ Framework)",
                    "content": """### 1. Functional Requirements:
Statements of explicit services the system must execute—how the system responds to specific inputs, calculations, and state transitions.
*Examples:* \"The system shall authenticate users via biometric fingerprint within 500 ms; The system shall calculate compound loan interest using Ethiopian Commercial Code regulations.\"

### 2. Non-Functional Requirements (NFRs / Quality Attributes):
Constraints imposed on the system services or development process.
Hewlett-Packard established the **FURPS+ Quality Model**:
- **F - Functionality:** Feature set, capabilities, security.
- **U - Usability:** Human factors, UI aesthetics, accessibility, user documentation, error messaging.
- **R - Reliability:** MTBF, Mean Time to Repair (MTTR), failure frequency, data integrity.
- **P - Performance:** Transaction throughput, response latency, memory footprint, CPU utilization.
- **S - Supportability:** Modularity, extensibility, testability, maintainability, internationalization.
- **+ (Constraints):** Design constraints (e.g., must run on Linux ARM64), implementation constraints (must be written in Rust), legal constraints."""
                },
                {
                    "id": "se-2-3",
                    "heading": "2.3 The IEEE 830 Standard for Software Requirements Specification (SRS)",
                    "content": """The **IEEE Std 830-1998** establishes the international benchmark structure for an SRS document:

```
1. Introduction
   1.1 Purpose
   1.2 Scope
   1.3 Definitions, Acronyms, and Abbreviations
   1.4 References
   1.5 Overview
2. Overall Description
   2.1 Product Perspective (System interfaces, user interfaces, hardware interfaces)
   2.2 Product Functions (High-level summary)
   2.3 User Characteristics
   2.4 General Constraints (Regulatory policies, hardware limitations)
   2.5 Assumptions and Dependencies
3. Specific Requirements
   3.1 External Interface Requirements
   3.2 Functional Requirements (Detailed behavioral descriptions)
   3.3 Performance Requirements
   3.4 Design Constraints
   3.5 Software System Quality Attributes (Security, maintainability, availability)
   3.6 Other Requirements (Database, internationalization)
```

---

### Characteristics of a Superior SRS:
- **Unambiguous:** Every requirement statement has only one possible interpretation.
- **Complete:** All significant requirements (including error responses and exception handling) are specified.
- **Consistent:** No requirement conflicts with another requirement.
- **Verifiable / Testable:** There exists a finite, cost-effective physical test to confirm compliance (avoid vague terms like \"user-friendly\" or \"blazing fast\").
- **Traceable:** Each requirement possesses a unique identifier (e.g., `REQ-AUTH-004`) allowing backward and forward tracking."""
                },
                {
                    "id": "se-2-4",
                    "heading": "2.4 Use Case Modeling & Behavioral Scenarios",
                    "content": """Ivar Jacobson (1992) introduced **Use Case Analysis** to model user interactions with a system:

### Key Components of a Use Case:
- **Actors:** Entities outside the system that interact with it (Users, external APIs, hardware clocks).
- **Primary Actor:** The actor who initiates the interaction to achieve a business goal.
- **Preconditions:** What must be true before the use case can execute.
- **Main Success Scenario (Happy Path):** The typical sequence of numbered interaction steps leading to goal fulfillment.
- **Extensions / Alternate Flows:** Handling validation failures, timeouts, and edge cases.
- **UML Relationships:**
  - `<<include>>`: Mandatory sub-routine shared across multiple use cases (e.g., *Checkout* `<<include>>` *Authenticate User*).
  - `<<extend>>`: Optional or conditional behavior triggered under specific conditions (e.g., *Book Flight* `<<extend>>` *Purchase Travel Insurance*)."""
                },
                {
                    "id": "se-2-5",
                    "heading": "2.5 Requirements Traceability Matrices (RTM)",
                    "content": """A **Requirements Traceability Matrix (RTM)** is a grid table that links each individual requirement identifier to its corresponding design components, source code modules, and test case verification suites:

$$\\text{User Need } \\longleftrightarrow \\text{SRS Req } \\longleftrightarrow \\text{Design Module } \\longleftrightarrow \\text{Code File } \\longleftrightarrow \\text{Test Case}$$

- **Forward Traceability:** Ensures that every agreed customer requirement is actually designed, coded, and tested (detects missing functionality).
- **Backward Traceability:** Ensures that no unauthorized code or \"gold-plating\" is added by developers without corresponding customer requirements."""
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
                    "content": """Software design transforms requirements into an architectural blueprint.

### Core Architectural Principles:
1. **Abstraction:** Isolating essential high-level behavioral patterns while suppressing low-level implementation details.
2. **Information Hiding (David Parnas 1972):**
   > *Each module should hide a critical design decision from all other modules.*
   Modules interact strictly through well-defined public interfaces. Internal data structures (e.g., switching from a linked list to a hash map) can be refactored with zero impact on client modules.
3. **Separation of Concerns (SoC):** Dividing a software application into distinct features that overlap in functionality as little as possible (e.g., separating business logic from database persistence and UI rendering)."""
                },
                {
                    "id": "se-3-2",
                    "heading": "3.2 Modular Decomposition Metrics: Coupling vs Cohesion",
                    "content": """The golden rule of modular design is: **MAXIMIZE COHESION, MINIMIZE COUPLING!**

### 1. Cohesion (Internal Strength of a Module):
The degree to which the internal elements of a module belong together. Ranked from worst to best:
- **Coincidental Cohesion (Worst):** Elements grouped randomly with zero relationship (`UtilityHelper.cs`).
- **Logical Cohesion:** Elements perform logically similar tasks (e.g., a function handling all mouse, keyboard, and network input via a giant switch statement).
- **Temporal Cohesion:** Elements executed at the same time (e.g., `initializeEverything()`).
- **Procedural Cohesion:** Elements executed in a mandatory sequence.
- **Communicational Cohesion:** Elements operate on the exact same input dataset.
- **Sequential Cohesion:** The output of one element serves as the input to the next element.
- **Functional Cohesion (Best):** The module performs **exactly one well-defined, atomic function** (e.g., `calculateSine()`, `verifyHash()`).

---

### 2. Coupling (Interdependence Between Modules):
The degree of direct connection between separate modules. Ranked from worst to best:
- **Content Coupling (Worst):** One module directly modifies or accesses the internal private memory/code of another module!
- **Common Coupling:** Multiple modules share read/write access to global variables.
- **Control Coupling:** One module passes a control flag (`bool doModeA`) dictating the internal logic flow of another module.
- **Stamp Coupling:** Modules pass composite data structures (e.g., passing a complete `CustomerRecord` object when the function only needs the `customerID`).
- **Data Coupling (Best):** Modules communicate strictly by passing minimal, primitive scalar parameters."""
                },
                {
                    "id": "se-3-3",
                    "heading": "3.3 Major Software Architectural Styles",
                    "content": """| Architectural Pattern | Structural Topology | Advantages | Vulnerabilities & Tradeoffs |
|---|---|---|---|
| **Layered (N-Tier)** | Organized in hierarchical horizontal layers (Presentation $\\to$ Application/Business $\\to$ Persistence $\\to$ Database). | Modular; layers can be modified or replaced independently. | Performance overhead from cascading requests through all intermediate layers. |
| **Client-Server** | Centralized server provides services to distributed thin or thick clients. | Centralized database management; easy security enforcement. | Server is a potential single point of failure and bottleneck. |
| **Pipe-and-Filter** | Data stream enters pipeline and is processed by sequential, independent filter components. | Reusable filters; easily parallelized. | Inefficient if filters must repeatedly convert data formats. *(UNIX bash pipes)* |
| **Event-Driven / Pub-Sub** | Decoupled publishers broadcast events to an asynchronous message broker (Kafka/RabbitMQ); subscribed consumers react. | Extremely high scalability, loose coupling, asynchronous responsiveness. | Difficult to debug; non-deterministic message arrival ordering. |
| **Model-View-Controller (MVC)** | Decouples data model ($M$), visual user interface ($V$), and user input handling ($C$). | Parallel front-end and back-end development; multiple views for identical data. | Added structural complexity for tiny applications. |
| **Microservices** | Application decomposed into an ecosystem of small, independently deployable services communicating over HTTP/gRPC. | Independent technology stacks; elastic horizontal scaling; fault isolation. | Distributed network latency, data consistency (CAP theorem), complex CI/CD orchestration. |"""
                },
                {
                    "id": "se-3-4",
                    "heading": "3.4 Object-Oriented Modeling with UML Structural Diagrams",
                    "content": """The **Unified Modeling Language (UML)** is the international standard notation for software blueprints.

### The UML Class Diagram:
Represents the static structural schema of classes, attributes, methods, and relationships:

```
┌──────────────────────────────────────┐
│             BankAccount              │
├──────────────────────────────────────┤
│ - accountNumber : String             │
│ - balance       : Double             │
├──────────────────────────────────────┤
│ + deposit(amount: Double) : Boolean  │
│ + withdraw(amount: Double): Boolean  │
└──────────────────────────────────────┘
```
- Visibility notation: `+` (public), `-` (private), `#` (protected), `~` (package).

### Class Relationships:
1. **Inheritance / Generalization (Solid line with hollow triangle):** An \"is-a\" relationship (`SavingsAccount` is-a `BankAccount`).
2. **Realization (Dashed line with hollow triangle):** A class implements an interface.
3. **Association (Solid line with open arrow):** A structural relationship where one class uses services of another.
4. **Aggregation (Solid line with hollow diamond):** A \"has-a\" whole-part relationship where the part can exist independently of the whole (`Department` has `Professors`).
5. **Composition (Solid line with filled black diamond):** A strong \"death-relationship\" whole-part lifecycle bond where the part **cannot exist without the whole** (`House` has `Rooms`)."""
                },
                {
                    "id": "se-3-5",
                    "heading": "3.5 UML Behavioral Diagrams: Sequence, State Machine & Activity",
                    "content": """1. **Sequence Diagrams:** Models dynamic interactions between objects arranged chronologically along vertical **Lifelines**:
   - Horizontal arrows represent messages: Solid arrow = Synchronous call; Open arrow = Asynchronous message; Dashed arrow = Return reply.
2. **State Machine Diagrams:** Models the discrete lifecycle states of an object reacting to external events:
   - Elements: Initial state (solid black circle), States (rounded rectangles), Transitions with triggers `event [guard] / action`, and Final state (bullseye).
3. **Activity Diagrams:** Models procedural logic, workflow algorithms, and concurrent parallel threads using fork and join bars."""
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
                    "content": """**CASE Tools** provide automated software engineering support across all software development lifecycle (SDLC) activities.

### Categorization:
1. **Upper CASE (Front-End Tools):** Supports early phases of development: planning, business process modeling, requirements analysis, and architectural UML modeling (e.g., Enterprise Architect, Draw.io).
2. **Lower CASE (Back-End Tools):** Supports downstream implementation activities: compilers, syntax-directed editors, automated code generators, debuggers, and test harness execution frameworks.
3. **Integrated CASE (I-CASE):** Comprehensive lifecycle environments that share a common centralized data repository, linking requirements, design diagrams, code files, and bug tickets seamlessly."""
                },
                {
                    "id": "se-4-2",
                    "heading": "4.2 Distributed Version Control Systems (Git Internals)",
                    "content": """### Centralized (SVN) vs Distributed (Git):
- **Centralized (CVS, SVN):** Single central server. If the server fails or network drops, developers cannot commit or review project history.
- **Distributed (Git):** Every developer clones the **entire repository history** locally. Blazing-fast local branching, commits, and cryptographic integrity.

### Git Internal Object Store (Content-Addressable Storage):
All files in Git are stored in `.git/objects/` indexed by their **SHA-1 (or SHA-256) hash**:
1. **Blob:** Stores raw file data bytes (without filename or permissions).
2. **Tree:** Represents a directory; maps filenames and permissions to Blob and sub-Tree hashes.
3. **Commit:** Contains a pointer to the root Tree, parent commit hash(es), author, committer, and commit message.
4. **Tag / Branch Reference:** A named text pointer pointing directly to a specific commit hash (`refs/heads/main`)."""
                },
                {
                    "id": "se-4-3",
                    "heading": "4.3 Continuous Integration & Continuous Delivery (CI/CD)",
                    "content": """### The CI/CD Pipeline Lifecycle:
Martin Fowler defined **Continuous Integration (CI)** as the practice where team members integrate their work into `main` frequently (multiple times daily), with each check-in verified by an automated build and test pipeline.

```
[Developer Git Push] 
        │
        ▼ 
[Automated Trigger (GitHub Actions / Jenkins)]
        │
        ▼ Step 1: Static Code Analysis & Linting (SonarQube, ESLint)
[Lint Passed]
        │
        ▼ Step 2: Automated Compilation & Build
[Build Artifact Created]
        │
        ▼ Step 3: Automated Unit & Integration Testing
[Tests 100% Passed]
        │
        ▼ Step 4: Container Packaging (Docker build & push to registry)
[Docker Image Stored]
        │
        ▼ Step 5: Continuous Deployment (CD to Kubernetes Staging / Production)
[Production Release Live]
```"""
                },
                {
                    "id": "se-4-4",
                    "heading": "4.4 Containerization (Docker) vs Virtual Machines",
                    "content": """| Metric | Type-2 Virtual Machine (VirtualBox, VMware) | Docker Container |
|---|---|---|
| **Architecture** | Hypervisor runs a **complete guest operating system** on top of the host. | Containers share the **Host OS Kernel**; isolated via Linux `namespaces` and `cgroups`. |
| **Startup Time** | Slow ($30 - 120\\text{ seconds}$) | Instantaneous (Sub-second) |
| **Memory Overhead** | Massive ($1 - 8\\text{ GB}$ per VM) | Negligible ($10 - 50\\text{ MB}$) |
| **Portability** | Bulky VM images ($> 20\\text{ GB}$) | Lightweight layered Docker images ($< 200\\text{ MB}$) |"""
                },
                {
                    "id": "se-4-5",
                    "heading": "4.5 Software Configuration Management (SCM) & Baselines",
                    "content": """A **Baseline** is a formally reviewed and agreed specification or product that serves as the basis for further development, and can only be changed through formal change control procedures.
- **Change Control Board (CCB):** A committee that evaluates the technical and financial impact of proposed engineering change requests (ECRs).
- **Branching Models:** **Git Flow** (Feature $\\to$ Develop $\\to$ Release $\\to$ Main) vs **Trunk-Based Development** (Small, short-lived feature branches merged into `main` within 24 hours using Feature Flags)."""
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
                    "content": """Barry Boehm formulated the classic distinction:
- **Verification:** *\"Are we building the product right?\"*
  Ensures that the software conforms to its technical design specifications (static analysis, code inspections, walkthroughs).
- **Validation:** *\"Are we building the right product?\"*
  Ensures that the software satisfies true customer operational needs in the real world (dynamic acceptance testing).

### The Defect Taxonomy:
1. **Error (Mistake):** A human conceptual or typographical action by a developer that leads to an incorrect result.
2. **Fault / Defect (Bug):** The manifestation of an error inside the software code or documentation.
3. **Failure:** The runtime behavioral breakdown where the software fails to perform its required function within specified limits."""
                },
                {
                    "id": "se-5-2",
                    "heading": "5.2 Black-Box (Functional) Testing Techniques",
                    "content": """Black-box testing derives test cases directly from functional requirements **without inspecting the internal source code**.

### 1. Equivalence Partitioning (EP):
Partitions the input domain of a program into equivalence classes such that all members of a class are treated identically:
- **Valid Equivalence Classes:** Legitimate inputs conforming to specification.
- **Invalid Equivalence Classes:** Boundary violations, negative numbers, invalid characters.
Selecting a single representative test case from each class is sufficient.

### 2. Boundary Value Analysis (BVA):
Historical software defects cluster overwhelmingly at boundary edges rather than in the center of input ranges.
For an integer input range $[A, B]$:
- Test the boundary values: $A, A+1, B-1, B$, alongside invalid neighbors $A-1$ and $B+1$."""
                },
                {
                    "id": "se-5-3",
                    "heading": "5.3 White-Box (Structural) Testing & McCabe's Cyclomatic Complexity",
                    "content": """White-box testing inspects internal control structures, branches, and execution paths.

### McCabe's Cyclomatic Complexity ($V(G)$):
Thomas McCabe (1976) introduced graph-theoretic complexity measuring the number of linearly independent paths through a program's Control Flow Graph (CFG):

$$V(G) = E - N + 2P$$
Where:
- $E$: Number of edges in the CFG.
- $N$: Number of nodes in the CFG.
- $P$: Number of connected components (typically $P=1$ for a single procedure).

Alternative formulas:
$$V(G) = \\text{Number of Predicate / Decision Nodes } (d) + 1$$
$$V(G) = \\text{Number of Enclosed Planar Regions } (R) \\text{ in CFG}$$

> [!IMPORTANT]
> **Upper Bound Rule:** If $V(G) \\le 10$, the module has low risk and is easily testable. If $V(G) > 20$, the module is complex and prone to errors. If $V(G) > 50$, the module is untestable and must be refactored!"""
                },
                {
                    "id": "se-5-4",
                    "heading": "5.4 Levels of Testing: Unit, Integration & System",
                    "content": """```
[Acceptance Testing]  ◄── Validates customer business requirements
        ▲
[System Testing]      ◄── Tests complete integrated software (Security, Load, Performance)
        ▲
[Integration Testing] ◄── Tests interfaces between interacting modules (Stubs & Drivers)
        ▲
[Unit Testing]        ◄── Tests individual functions, classes, and methods (JUnit / PyTest)
```

### Integration Strategies:
- **Big Bang:** Integrates all modules simultaneously and tests everything at once. Fatal debugging nightmare.
- **Top-Down Integration:** Starts from main control module down; uses **Stubs** (dummy subordinate modules returning hardcoded values).
- **Bottom-Up Integration:** Starts with primitive atomic worker modules; uses **Drivers** (test harness programs that call the modules with parameters)."""
                },
                {
                    "id": "se-5-5",
                    "heading": "5.5 Software Maintenance & The 4 Categories of Maintenance",
                    "content": """Over **$70\\%$ of total lifecycle software engineering expenditure** occurs *after* the system is deployed to production during the **Maintenance Phase**.

### The 4 Categories of Maintenance (Lientz & Swanson):
1. **Corrective Maintenance ($20\\%$):** Fixing residual defects, bugs, memory leaks, and logic faults discovered in production.
2. **Adaptive Maintenance ($25\\%$):** Modifying software to accommodate changing external environments (new OS releases, updated hardware, database upgrades, regulatory changes).
3. **Perfective Maintenance ($50\\%$ - Dominant Cost):** Enhancing existing features, optimizing performance, refactoring legacy code, and adding user-requested capabilities.
4. **Preventive Maintenance ($5\\%$):** Re-engineering software to eliminate technical debt and prevent future faults before they occur."""
                }
            ]
        }
    }
