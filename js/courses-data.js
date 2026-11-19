/**
 * AASTU Computer Engineering (CENG) - Graduating Class (GC) Course Data
 * Tailored for Addis Ababa Science and Technology University (AASTU)
 * Department of Electrical and Computer Engineering
 */

const AASTU_COURSES = [
  {
    id: "eceg5511",
    code: "ECEg5511",
    title: "Robotics and Computer Vision",
    creditHours: 4,
    year: 5,
    semester: 1,
    prerequisites: "Introduction to Control Systems (ECEg4105), Engineering Mechanics II (Dynamics) (MEng2104)",
    instructors: "AASTU Robotics & AI Faculty",
    clos: [
      "CLO1: Identify different actuators and sensors to build a robot and extract information inside image and video.",
      "CLO2: Examine kinematics, dynamics of robots and analyze computer vision algorithms using MATLAB, Maple and OpenCV.",
      "CLO3: Design a controller, construct, assemble robot and implement computer vision for real-life applications.",
      "CLO4: Work collaboratively on a team to successfully complete a design project."
    ],
    textbooks: [
      { title: "Introduction to Robotics: Mechanics and Control (4th Ed.)", author: "John J. Craig", year: "2017", publisher: "Pearson / Addison-Wesley" },
      { title: "Robotics and Control", author: "R. K. Mittal & I. J. Nagrath", year: "2003", publisher: "Tata McGraw-Hill" },
      { title: "Computer Vision: A Modern Approach", author: "David A. Forsyth & Jean Ponce", year: "2012", publisher: "Prentice Hall" },
      { title: "Computer Vision", author: "Linda G. Shapiro & George C. Stockman", year: "2001", publisher: "Prentice Hall" },
      { title: "Industrial Robotics: Technology, Programming, and Applications", author: "Mikell P. Groover et al.", year: "2012", publisher: "McGraw-Hill" }
    ],
    videoLessons: [
      {
        id: "vid-rob-1",
        title: "Denavit-Hartenberg (DH) Parameters Made Visual & Simple",
        creator: "Stanford University / Angela Sodemann",
        youtubeId: "rA9tm0gTln8",
        duration: "18:42",
        topic: "Kinematics & Coordinate Frames",
        keyTakeaways: [
          "Understanding the 4 essential parameters: Link length (a), Link twist (alpha), Link offset (d), and Joint angle (theta).",
          "How to assign Z-axes along joint motion vectors without common coordinate errors.",
          "Constructing the homogeneous transformation matrix A_i step-by-step."
        ]
      },
      {
        id: "vid-rob-2",
        title: "Inverse Kinematics: The Math Behind Robot Motion",
        creator: "Freya Holmér (Interactive Math & Visuals)",
        youtubeId: "INft1aL6gJ0",
        duration: "24:15",
        topic: "Inverse Kinematics & Analytical Geometry",
        keyTakeaways: [
          "Geometric vs Algebraic IK approaches for planar 2-link and 3-link arms.",
          "Why inverse kinematics produces multiple solutions (Elbow-Up vs Elbow-Down).",
          "How singularity points cause infinite joint velocity commands in physical servos."
        ]
      },
      {
        id: "vid-rob-3",
        title: "How Image Kernels & Convolutions Work in Computer Vision",
        creator: "Computerphile (Dr. Mike Pound)",
        youtubeId: "C_zFhWdM4ic",
        duration: "14:10",
        topic: "Image Analysis & Edge Detection",
        keyTakeaways: [
          "Convolution matrices: Sobel, Prewitt, and Laplacian edge extractors.",
          "How gradient magnitude sqrt(Gx^2 + Gy^2) detects object boundaries in grayscale frames.",
          "Noise reduction using Gaussian blur before edge extraction."
        ]
      },
      {
        id: "vid-rob-4",
        title: "Boston Dynamics Atlas: Inside Biomechanical Actuation",
        creator: "IEEE Spectrum / Boston Dynamics",
        youtubeId: "fn3KWM1kuAw",
        duration: "11:35",
        topic: "Comparative Anatomy & Hydraulics",
        keyTakeaways: [
          "How compact hydraulic manifolds deliver human-grade power-to-weight ratios.",
          "Sensor fusion: 3D LiDAR + IMU balance loops running at 500 Hz.",
          "Biomimetic compliance: Absorbing landing shocks like biological leg tendons."
        ]
      }
    ],
    chapters: [
      { id: "ch1", num: 1, title: "Fundamentals of Robot & Human vs Robot Anatomy", hasSimulator: true },
      { id: "ch2", num: 2, title: "Sensors and Machine Vision", hasSimulator: false },
      { id: "ch3", num: 3, title: "Robot Kinematics (Forward, Inverse & DH Matrix)", hasSimulator: true },
      { id: "ch4", num: 4, title: "Robot Dynamics and Control", hasSimulator: false },
      { id: "ch5", num: 5, title: "Introduction to Computer Vision & Image Representation", hasSimulator: false },
      { id: "ch6", num: 6, title: "Image and Video Analysis (Edge, Morphology, Tracking)", hasSimulator: false },
      { id: "ch7", num: 7, title: "Applications of Computer Vision (Viola-Jones, Surveillance)", hasSimulator: false }
    ]
  },
  {
    id: "eceg5401",
    code: "ECEg5401",
    title: "Operating Systems",
    creditHours: 3,
    year: 5,
    semester: 1,
    prerequisites: "Computer Architecture and Organization (ECEg4103), Data Structures and Algorithms (ECEg4404)",
    instructors: "AASTU Systems Faculty",
    clos: [
      "CLO1: Analyze OS architecture, dual-mode operations, system calls, and kernel organization.",
      "CLO2: Understand process scheduling, threads, concurrency, deadlocks, and synchronization.",
      "CLO3: Design and evaluate memory management, virtual memory, paging, and replacement algorithms.",
      "CLO4: Analyze file systems, mass storage structures, and protection mechanisms."
    ],
    textbooks: [
      { title: "Operating System Concepts (10th Ed.)", author: "Abraham Silberschatz, Peter Baer Galvin, Greg Gagne", year: "2018", publisher: "Wiley" },
      { title: "Modern Operating Systems (4th Ed.)", author: "Andrew S. Tanenbaum & Herbert Bos", year: "2014", publisher: "Pearson" },
      { title: "Operating Systems: Internals and Design Principles", author: "William Stallings", year: "2017", publisher: "Pearson" }
    ],
    videoLessons: [
      {
        id: "vid-os-1",
        title: "Operating Systems: Crash Course Computer Science #18",
        creator: "Crash Course (Carrie Anne Philbin)",
        youtubeId: "26QPDBe-NB8",
        duration: "12:35",
        topic: "OS History, Multi-tasking & Memory Protection",
        keyTakeaways: [
          "From early batch plugboards to interactive multi-tasking operating systems.",
          "Why memory protection prevents one crashed program from crashing the computer.",
          "How the OS coordinates peripherals and scheduling queues."
        ]
      },
      {
        id: "vid-os-2",
        title: "System Calls, User Mode & Kernel Mode Explained",
        creator: "Computerphile / Dr. Steve Bagley",
        youtubeId: "kL_7i_8q6Qk",
        duration: "10:18",
        topic: "Dual-Mode Hardware & Traps",
        keyTakeaways: [
          "The hardware Mode Bit in CPU flags (0 = Kernel, 1 = User).",
          "How software interrupts (`int 0x80` or `syscall`) trigger supervisor mode.",
          "The security boundary: Why user programs can never directly touch I/O buses."
        ]
      },
      {
        id: "vid-os-3",
        title: "Microkernel vs Monolithic Kernel Architecture",
        creator: "Neso Academy",
        youtubeId: "Qp3n_pQd1iM",
        duration: "13:40",
        topic: "Kernel Architectures & IPC",
        keyTakeaways: [
          "The classic Tanenbaum-Torvalds debate on operating system design.",
          "Fault isolation: Why microkernel driver crashes do not produce kernel panics.",
          "Message-passing IPC overhead vs Monolithic direct C function speed."
        ]
      }
    ],
    chapters: [
      { id: "ch1", num: 1, title: "Overview of Operating Systems, Services & Structures", hasSimulator: false },
      { id: "ch2", num: 2, title: "Process Management, Threads & CPU Scheduling", hasSimulator: false },
      { id: "ch3", num: 3, title: "Process Synchronization, Critical Section & Deadlocks", hasSimulator: false },
      { id: "ch4", num: 4, title: "Main Memory, Paging, Segmentation & Virtual Memory", hasSimulator: false },
      { id: "ch5", num: 5, title: "File-System Interface, Implementation & Mass Storage", hasSimulator: false }
    ]
  },
  {
    id: "eceg5407",
    code: "ECEg5407",
    title: "Introduction to Machine Learning",
    creditHours: 3,
    year: 5,
    semester: 1,
    prerequisites: "Object Oriented Programming (ECEg3109), Data Structures and Algorithm (ECEg4404)",
    instructors: "Berta Delango, Bayable Teshome (AASTU ECE)",
    clos: [
      "CLO1: Synthesize concepts of supervised and unsupervised learning algorithms.",
      "CLO2: Evaluate and select appropriate models for regression and classification tasks.",
      "CLO3: Implement end-to-end ML pipelines with Python and scikit-learn.",
      "CLO4: Apply dimensionality reduction, clustering, and neural networks to engineering problems."
    ],
    textbooks: [
      { title: "Introduction to Machine Learning with Python", author: "Andreas C. Müller & Sarah Guido", year: "2016", publisher: "O'Reilly Media" },
      { title: "Pattern Recognition and Machine Learning", author: "Christopher M. Bishop", year: "2006", publisher: "Springer" },
      { title: "Hands-On Machine Learning with Scikit-Learn, Keras, and TensorFlow", author: "Aurélien Géron", year: "2022", publisher: "O'Reilly Media" },
      { title: "Artificial Intelligence: A Modern Approach (4th Ed.)", author: "Stuart Russell & Peter Norvig", year: "2020", publisher: "Pearson" }
    ],
    videoLessons: [
      {
        id: "vid-ml-1",
        title: "Machine Learning Fundamentals: Bias and Variance",
        creator: "StatQuest with Josh Starmer",
        youtubeId: "EuBBz3bI-aA",
        duration: "06:35",
        topic: "Overfitting, Underfitting & Generalization",
        keyTakeaways: [
          "High Bias = Underfitting (model is too simple to capture true signals).",
          "High Variance = Overfitting (model fits training noise too closely).",
          "How to find the 'Sweet Spot' with cross-validation."
        ]
      },
      {
        id: "vid-ml-2",
        title: "Support Vector Machines (SVM) & The Kernel Trick Explained Visually",
        creator: "StatQuest with Josh Starmer",
        youtubeId: "efR1C6CvhmE",
        duration: "15:20",
        topic: "SVM Hyperplanes & RBF Kernels",
        keyTakeaways: [
          "Maximum margin classification and support vectors.",
          "The mathematical Kernel Trick: Infinite dimensions with zero coordinate explosion.",
          "Tuning C (slack penalty) and Gamma (influence radius)."
        ]
      },
      {
        id: "vid-ml-3",
        title: "Decision Trees and Random Forests Step-by-Step",
        creator: "StatQuest with Josh Starmer",
        youtubeId: "7xTGNNLPyMI",
        duration: "17:40",
        topic: "Tree Partitioning & Ensembles",
        keyTakeaways: [
          "How Gini Impurity and Entropy pick the best feature split.",
          "Pre-pruning vs Post-pruning to stop tree overfitting.",
          "Bagging and random feature subspaces in Random Forests."
        ]
      },
      {
        id: "vid-ml-4",
        title: "Neural Networks: What are they and how do they learn?",
        creator: "3Blue1Brown (Grant Sanderson)",
        youtubeId: "aircAruvnKk",
        duration: "19:12",
        topic: "Multi-Layer Perceptrons & Activations",
        keyTakeaways: [
          "Layered structure: Input pixels -> Hidden features -> Output probabilities.",
          "Why non-linear activation functions (ReLU, Sigmoid) are essential.",
          "The intuition of Gradient Descent moving downhill on the cost surface."
        ]
      }
    ],
    chapters: [
      { id: "ch1", num: 1, title: "Introduction to Machine Learning & Core Python Stack", hasSimulator: false },
      { id: "ch2", num: 2, title: "Supervised Learning: Foundations, Bias-Variance & 6 Core Models", hasSimulator: false },
      { id: "ch3", num: 3, title: "Unsupervised Learning, Preprocessing & Dimensionality Reduction", hasSimulator: false },
      { id: "ch4", num: 4, title: "Model Evaluation, Cross-Validation & Hyperparameter Tuning", hasSimulator: false },
      { id: "ch5", num: 5, title: "Deep Learning Fundamentals & Neural Networks", hasSimulator: false }
    ]
  },
  {
    id: "eceg5405",
    code: "ECEg5405",
    title: "VLSI Design",
    creditHours: 3,
    year: 5,
    semester: 1,
    prerequisites: "Computer Architecture and Organization (ECEg4103)",
    instructors: "Asaminew Gizaw (asamnew.gizaw@aastu.edu.et)",
    clos: [
      "CLO1: Explain an IC and its production.",
      "CLO2: Explain and analyze VLSI design cycles.",
      "CLO3: Explain and analyze the design and fabrication of VLSI devices.",
      "CLO4: Develop ICs using CMOS technology.",
      "CLO5: Apply knowledge of ASICs in production of gates, multiplexers, and counters.",
      "CLO6: Use VHDL programming to program hardware."
    ],
    textbooks: [
      { title: "Digital Integrated Circuits: A Design Perspective (2nd Ed.)", author: "Jan M. Rabaey, Anantha Chandrakasan, Borivoje Nikolic", year: "2003", publisher: "Prentice Hall" },
      { title: "CMOS VLSI Design: A Circuits and Systems Perspective (4th Ed.)", author: "Neil H. E. Weste & David Money Harris", year: "2010", publisher: "Addison-Wesley" },
      { title: "Modern VLSI Design – System-on-Chip Design", author: "Wayne Wolf", year: "2002", publisher: "Prentice Hall" },
      { title: "Application-Specific Integrated Circuits", author: "Michael John Sebastian Smith", year: "1997", publisher: "Addison-Wesley" }
    ],
    videoLessons: [
      {
        id: "vid-vlsi-1",
        title: "How Microchips Are Made: 3D Animated Photolithography & Etching",
        creator: "Branch Education",
        youtubeId: "q6fP504pj8I",
        duration: "21:30",
        topic: "Semiconductor Fabrication & EUV Lithography",
        keyTakeaways: [
          "Silicon ingot slicing, wafer polishing, and oxidation layers.",
          "Extreme Ultraviolet (EUV) light printing billions of nanoscale transistors.",
          "Ion implantation, chemical vapor deposition, and copper metallization interconnects."
        ]
      },
      {
        id: "vid-vlsi-2",
        title: "How Transistors Work in CMOS Microprocessors",
        creator: "Branch Education",
        youtubeId: "IcrBqCFLHIY",
        duration: "13:25",
        topic: "nMOS, pMOS & Push-Pull Logic Gates",
        keyTakeaways: [
          "MOSFET field effect: Gate voltage controlling conduction channel between Source & Drain.",
          "Why CMOS draws static power near zero: pMOS pull-up network vs nMOS pull-down network.",
          "Transistor sizing (W/L) to equalize electron vs hole mobility speeds."
        ]
      }
    ],
    chapters: [
      { id: "ch1", num: 1, title: "Introduction to Integrated Circuits & Evolution", hasSimulator: false },
      { id: "ch2", num: 2, title: "VLSI Design Cycle & ASIC Design Styles", hasSimulator: false },
      { id: "ch3", num: 3, title: "Design and Fabrication of VLSI Devices (CMOS Process Flow)", hasSimulator: false },
      { id: "ch4", num: 4, title: "CMOS Logic, Stick Diagrams & Layout Rules", hasSimulator: false },
      { id: "ch5", num: 5, title: "Application-Specific Integrated Circuits (ASICs) & FPGAs", hasSimulator: false },
      { id: "ch6", num: 6, title: "Logic Synthesis, VHDL RTL Design & Simulation", hasSimulator: false }
    ]
  },
  {
    id: "eceg5409",
    code: "ECEg5409",
    title: "Software Engineering",
    creditHours: 3,
    year: 5,
    semester: 1,
    prerequisites: "Object Oriented Programming (ECEg3109)",
    instructors: "AASTU Software Engineering Faculty",
    clos: [
      "CLO1: Explain general concepts and principles of software engineering.",
      "CLO2: Identify and apply SDLC process models (Agile, Scrum, Waterfall).",
      "CLO3: Justify how to manage software projects and risk estimation.",
      "CLO4: Design and develop software systems in an engineering team.",
      "CLO5: Apply object-oriented analysis, architectural design, and UML.",
      "CLO6: Apply CASE tools, testing methodologies, and maintenance procedures."
    ],
    textbooks: [
      { title: "Software Engineering (10th Ed.)", author: "Ian Sommerville", year: "2016", publisher: "Pearson" },
      { title: "Software Engineering: A Practitioner's Approach (8th Ed.)", author: "Roger S. Pressman & Bruce R. Maxim", year: "2015", publisher: "McGraw-Hill" },
      { title: "The Unified Modeling Language Reference Manual", author: "James Rumbaugh, Ivar Jacobson, Grady Booch", year: "2005", publisher: "Addison-Wesley" }
    ],
    videoLessons: [
      {
        id: "vid-se-1",
        title: "Agile vs Waterfall vs Scrum in Modern Software Engineering",
        creator: "Fireship",
        youtubeId: "p-K_zF7g_x4",
        duration: "11:15",
        topic: "SDLC Process Models & Sprints",
        keyTakeaways: [
          "Iterative sprint planning, user stories, and daily standups.",
          "When Waterfall is still required (aerospace, medical, safety-critical systems).",
          "Continuous Integration / Continuous Deployment (CI/CD) pipelines."
        ]
      }
    ],
    chapters: [
      { id: "ch1", num: 1, title: "Software Processes, Project Planning & Estimation", hasSimulator: false },
      { id: "ch2", num: 2, title: "Software Requirements Engineering & Specification (SRS)", hasSimulator: false },
      { id: "ch3", num: 3, title: "Architectural Design, Modular Decomposition & UML Modeling", hasSimulator: false },
      { id: "ch4", num: 4, title: "CASE Tools, CI/CD & Development Environments", hasSimulator: false },
      { id: "ch5", num: 5, title: "Software Testing (Unit, Integration, Black/White Box) & Maintenance", hasSimulator: false }
    ]
  },
  {
    id: "eceg5403",
    code: "ECEg5403",
    title: "Embedded Systems",
    creditHours: 4,
    year: 5,
    semester: 1,
    prerequisites: "Microprocessors and Interfacing (ECEg4102)",
    instructors: "AASTU Embedded Systems & Hardware Lab",
    clos: [
      "CLO1: Analyze modern microcontroller architectures (ARM Cortex-M, Harvard vs Von Neumann).",
      "CLO2: Implement interrupt handling, low-power modes, and memory-mapped peripheral drivers.",
      "CLO3: Interface industry serial communication protocols (UART, SPI, I2C, CAN).",
      "CLO4: Design Real-Time Embedded Systems using RTOS scheduling and inter-task communication."
    ],
    textbooks: [
      { title: "Embedded Systems: Architecture, Programming and Design (3rd Ed.)", author: "Raj Kamal", year: "2015", publisher: "McGraw-Hill" },
      { title: "Computers as Components: Principles of Embedded Computing System Design", author: "Wayne Wolf", year: "2016", publisher: "Morgan Kaufmann" },
      { title: "Embedded Systems: Real-Time Interfacing to Arm Cortex-M", author: "Jonathan W. Valvano", year: "2017", publisher: "CreateSpace" }
    ],
    videoLessons: [
      {
        id: "vid-emb-1",
        title: "How Microcontrollers Work (ARM Cortex-M Architecture & Registers)",
        creator: "Ben Eater",
        youtubeId: "n0_6pT3N20M",
        duration: "16:45",
        topic: "Microcontroller Architecture & Memory Mapping",
        keyTakeaways: [
          "Flash ROM vs SRAM vs Memory-Mapped Peripheral Registers.",
          "How NVIC handles hardware interrupts with microsecond latency.",
          "Clock trees, GPIO configurations, and PWM timers."
        ]
      }
    ],
    chapters: [
      { id: "ch1", num: 1, title: "Embedded System Architectures & Processor Cores", hasSimulator: false },
      { id: "ch2", num: 2, title: "Memory Architectures, Timers & Hardware Interrupts", hasSimulator: false },
      { id: "ch3", num: 3, title: "Serial Communication Protocols (UART, SPI, I2C, CAN)", hasSimulator: false },
      { id: "ch4", num: 4, title: "Real-Time Operating Systems (RTOS) for Microcontrollers", hasSimulator: false },
      { id: "ch5", num: 5, title: "Sensors, Actuator Interfacing & Low-Power Embedded Design", hasSimulator: false }
    ]
  }
];
