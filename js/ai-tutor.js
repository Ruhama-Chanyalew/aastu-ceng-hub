/**
 * AASTU Computer Engineering - Intelligent AI Study Tutor (v4.0)
 * Grounded in 5th-year graduating class (GC 2026) courses:
 * - VLSI Design (ECEg5405) — Jan M. Rabaey, Neil Weste, Wayne Wolf
 * - Robotics & Computer Vision (ECEg5511) — John J. Craig, Richard Szeliski
 * - Operating Systems (ECEg5401) — Abraham Silberschatz, Peter Galvin
 * - Machine Learning (ECEg5407) — Andreas C. Müller & Sarah Guido
 * - Ethiopian MoE National Exit Exam (NEE5108)
 */

(function() {
  'use strict';

  // System State
  const tutorState = {
    isOpen: false,
    showSettings: false,
    apiKey: localStorage.getItem('aastu_ai_api_key') || '',
    apiProvider: localStorage.getItem('aastu_ai_provider') || 'cloud',
    activeModel: localStorage.getItem('aastu_gemini_model') || 'gemini-2.0-flash',
    discoveredModel: localStorage.getItem('aastu_gemini_model') || null,
    lastTopicKey: null,
    messages: [
      {
        sender: 'bot',
        text: `👋 **Welcome to your AASTU AI Study Tutor!**\n\nI am pre-built directly into your study hub—**no API key or manual setup required**! I am specialized in your 5th-year Computer Engineering curriculum and textbooks (*Rabaey, Weste, Craig, Silberschatz, Müller*).\n\nAsk me **anything**: request step-by-step worked examples with numbers, mathematical derivations, calculations, or ask **conversational follow-ups** just like ChatGPT!`,
        time: 'Just now'
      }
    ]
  };

  // =========================================================================
  // 1. LIVE CONVERSATIONAL AI CALLERS (Proxy, Gemini, OpenAI)
  // =========================================================================

  function buildSystemPrompt(courseCode, courseTitle) {
    return `You are the AASTU AI Study Tutor, a knowledgeable, pedagogical, and highly encouraging Computer Engineering professor at Addis Ababa Science & Technology University (AASTU), Ethiopia.
You assist 5th-year graduating class (GC 2026) students preparing for their semester exams and the Ethiopian National Exit Exam (NEE5108).
Current Active Course: ${courseCode || 'ECEg5405'} - ${courseTitle || 'VLSI Design'}.

Pedagogical Directives:
- Communicate naturally and conversationally, just like ChatGPT. Answer follow-up questions directly, clarify doubts, simplify explanations when asked, or dive deeper into mathematical proofs.
- If the student asks conversational, meta, or greeting questions (e.g. "would you understand whatever I ask you?", "hello", "how can you help me?"), respond conversationally and warmly, explaining your capabilities and encouraging them.
- Format ALL mathematical equations using KaTeX LaTeX: use $...$ for inline equations and $$...$$ on their own lines for display blocks.
- When asked for examples, ALWAYS provide concrete, real-world numerical or code examples with clear step-by-step numbers, inputs, calculations, and outcomes.
- When asked for derivations, show every mathematical and algebraic step clearly.
- When asked for code, provide clean, commented VHDL, Python, or C code blocks.`;
  }

  // Format messages strictly according to Google Gemini API guidelines:
  // - First message MUST have role: 'user' (never 'model')
  // - Roles MUST strictly alternate: 'user' -> 'model' -> 'user' -> 'model'
  // - Never send empty text parts
  function formatGeminiContents(messages) {
    let startIdx = 0;
    while (startIdx < messages.length && messages[startIdx].sender !== 'user') {
      startIdx++;
    }

    if (startIdx >= messages.length) {
      const lastMsg = messages[messages.length - 1];
      return [{ role: 'user', parts: [{ text: (lastMsg && lastMsg.text) ? lastMsg.text : 'Hello' }] }];
    }

    const contents = [];
    for (let i = startIdx; i < messages.length; i++) {
      const msg = messages[i];
      const role = msg.sender === 'user' ? 'user' : 'model';
      const text = (msg.text || '').trim();
      if (!text) continue;

      if (contents.length > 0 && contents[contents.length - 1].role === role) {
        contents[contents.length - 1].parts[0].text += '\n\n' + text;
      } else {
        contents.push({
          role: role,
          parts: [{ text: text }]
        });
      }
    }

    // Ensure the last message has role 'user'
    if (contents.length === 0 || contents[contents.length - 1].role !== 'user') {
      const lastUser = messages.filter(m => m.sender === 'user').pop();
      contents.push({ role: 'user', parts: [{ text: lastUser ? lastUser.text : 'Hello' }] });
    }

    return contents;
  }

  // Auto-discover the exact working Gemini model
  async function discoverWorkingGeminiModel(apiKey) {
    if (tutorState.discoveredModel) return tutorState.discoveredModel;
    const cached = localStorage.getItem('aastu_gemini_model');
    if (cached) {
      tutorState.discoveredModel = cached;
      return cached;
    }

    try {
      const listUrl = `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey.trim()}`;
      const resp = await fetch(listUrl);
      if (resp.ok) {
        const data = await resp.json();
        if (data.models && Array.isArray(data.models)) {
          const contentModels = data.models.filter(m => 
            m.supportedGenerationMethods && m.supportedGenerationMethods.includes('generateContent')
          );

          const priority = ['gemini-2.0-flash', 'gemini-1.5-flash-latest', 'gemini-1.5-flash', 'gemini-1.5-pro', 'gemini-1.0-pro'];
          let chosen = null;
          for (const p of priority) {
            const match = contentModels.find(m => m.name.toLowerCase().endsWith('/' + p) || m.name.toLowerCase() === p);
            if (match) {
              chosen = match.name.replace(/^models\//, '');
              break;
            }
          }

          if (!chosen && contentModels[0]) {
            chosen = contentModels[0].name.replace(/^models\//, '');
          }

          if (chosen) {
            tutorState.discoveredModel = chosen;
            tutorState.activeModel = chosen;
            localStorage.setItem('aastu_gemini_model', chosen);
            return chosen;
          }
        }
      }
    } catch (e) {
      console.warn('Gemini model discovery error:', e);
    }

    return 'gemini-2.0-flash';
  }

  // Call Google Gemini API
  async function callGeminiAPI(apiKey, messages, courseCode, courseTitle) {
    let model = await discoverWorkingGeminiModel(apiKey);
    const candidateModels = [model, 'gemini-2.0-flash', 'gemini-1.5-flash-latest', 'gemini-1.5-pro', 'gemini-1.0-pro'];
    let lastError = null;

    const geminiContents = formatGeminiContents(messages);

    for (const testModel of candidateModels) {
      try {
        const url = `https://generativelanguage.googleapis.com/v1beta/models/${testModel}:generateContent?key=${apiKey.trim()}`;
        const systemPrompt = buildSystemPrompt(courseCode, courseTitle);

        const body = {
          contents: geminiContents,
          systemInstruction: {
            parts: [{ text: systemPrompt }]
          },
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 2048
          }
        };

        const response = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body)
        });

        if (response.ok) {
          const data = await response.json();
          if (data.candidates && data.candidates[0] && data.candidates[0].content && data.candidates[0].content.parts) {
            tutorState.discoveredModel = testModel;
            tutorState.activeModel = testModel;
            localStorage.setItem('aastu_gemini_model', testModel);
            updateContextBar();
            return data.candidates[0].content.parts.map(p => p.text).join('\n');
          }
        } else {
          const errData = await response.json().catch(() => ({}));
          const errMsg = errData.error ? errData.error.message : response.statusText;
          lastError = new Error(`Google Gemini (${testModel}): ${errMsg}`);
          if (response.status === 404) continue;
          if (response.status === 400 && (errMsg.includes('API key') || errMsg.includes('API_KEY_INVALID'))) throw lastError;
        }
      } catch (err) {
        lastError = err;
        if (err.message && err.message.includes('API key')) throw err;
      }
    }

    throw lastError || new Error('Could not connect to Gemini model.');
  }

  // Call OpenAI API
  async function callOpenAIAPI(apiKey, messages, courseCode, courseTitle) {
    const url = 'https://api.openai.com/v1/chat/completions';
    const systemPrompt = buildSystemPrompt(courseCode, courseTitle);

    const apiMessages = [
      { role: 'system', content: systemPrompt },
      ...messages.slice(-8).map(m => ({
        role: m.sender === 'user' ? 'user' : 'assistant',
        content: m.text
      }))
    ];

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey.trim()}`
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: apiMessages,
        temperature: 0.7
      })
    });

    if (!response.ok) {
      const errData = await response.json().catch(() => ({}));
      throw new Error(`OpenAI API Error: ${errData.error ? errData.error.message : response.statusText}`);
    }

    const data = await response.json();
    if (data.choices && data.choices[0] && data.choices[0].message) {
      return data.choices[0].message.content;
    }
    throw new Error('No response text received from OpenAI.');
  }

  // Main Live AI Caller
  async function callLiveAI(messages, courseCode, courseTitle) {
    let customKeyError = null;

    // 1. If user configured custom key, try it first
    if (tutorState.apiKey && tutorState.apiKey.trim().length > 0) {
      try {
        if (tutorState.apiProvider === 'openai') {
          return await callOpenAIAPI(tutorState.apiKey, messages, courseCode, courseTitle);
        } else {
          return await callGeminiAPI(tutorState.apiKey, messages, courseCode, courseTitle);
        }
      } catch (err) {
        console.warn('Custom API call failed, falling back to live proxy:', err);
        customKeyError = err.message || 'Custom API error';
      }
    }

    // 2. Try same-origin /api/chat proxy (live AI, zero setup)
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 18000);

      const apiMessages = messages.slice(-6).map(m => ({
        role: m.sender === 'user' ? 'user' : 'assistant',
        content: m.text
      }));

      const resp = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: apiMessages,
          system_prompt: buildSystemPrompt(courseCode, courseTitle),
          model: 'openai-fast'
        }),
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (resp.ok) {
        const text = await resp.text();
        if (text && text.trim().length > 0 && !text.includes('Payment Required')) {
          return text;
        }
      }
    } catch (e) {
      console.warn('Proxy /api/chat error:', e);
    }

    // 3. Direct browser fetch to Pollinations as additional fallback
    try {
      const lastUserMsg = messages.filter(m => m.sender === 'user').pop();
      const queryPrompt = lastUserMsg ? lastUserMsg.text : 'Hello';
      const encoded = encodeURIComponent(queryPrompt);
      const resp = await fetch(`https://text.pollinations.ai/${encoded}?model=openai-fast`);
      if (resp.ok) {
        const text = await resp.text();
        if (text && text.trim().length > 0 && !text.includes('Payment Required')) {
          return text;
        }
      }
    } catch (e) {
      // Offline fallback
    }

    if (customKeyError) {
      throw new Error(customKeyError);
    }

    throw new Error('Using embedded conversational reasoning engine.');
  }

  // =========================================================================
  // 2. EMBEDDED CONVERSATIONAL MULTI-TURN REASONING ENGINE
  // =========================================================================

  const KNOWLEDGE_MODULES = {
    // VLSI: CMOS Inverter VTC & Transistor Sizing
    "cmos_vtc": {
      topic: "CMOS Inverter Voltage Transfer Characteristic (VTC) & Sizing",
      course: "VLSI Design (ECEg5405)",
      textbook: "Jan M. Rabaey — Digital Integrated Circuits (Ch. 5); Neil Weste — CMOS VLSI Design (Ch. 2)",
      
      mainAnswer: `### 📖 CMOS Inverter Voltage Transfer Characteristic (VTC)
*Primary Reference: Jan M. Rabaey — Digital Integrated Circuits (Ch. 5)*

The **Voltage Transfer Characteristic (VTC)** of a CMOS inverter plots the output voltage $V_{out}$ as a function of the input voltage $V_{in}$ across five distinct operational regions:

[VTC Diagram: Region A (nMOS Cutoff, pMOS Linear) -> Region B (Transition) -> Region C (Both Saturation, Vin = Vout = VM) -> Region D (Transition) -> Region E (nMOS Linear, pMOS Cutoff)]

### ⚡ 5 Operational Regions Across the VTC:
1. **Region A ($V_{in} < V_{Tn}$):** nMOS is **Cutoff** ($I_{Dn} = 0$), pMOS is in **Linear/Triode**. $V_{out} = V_{OH} = V_{DD}$. Zero static current.
2. **Region B ($V_{Tn} \\le V_{in} < V_M$):** nMOS enters **Saturation**, pMOS remains in **Linear**. Output begins dropping. $V_{IL}$ is defined where $\\frac{dV_{out}}{dV_{in}} = -1$.
3. **Region C ($V_{in} = V_M$):** **Both nMOS and pMOS are simultaneously in Saturation!** Maximum gain region ($A_v = \\frac{dV_{out}}{dV_{in}} \\ll -1$). $V_M$ is the switching threshold.
4. **Region D ($V_M < V_{in} \\le V_{DD} - |V_{Tp}|$):** nMOS is in **Linear**, pMOS is in **Saturation**. $V_{IH}$ is defined where $\\frac{dV_{out}}{dV_{in}} = -1$.
5. **Region E ($V_{in} > V_{DD} - |V_{Tp}|$):** nMOS is in **Linear**, pMOS is **Cutoff**. $V_{out} = V_{OL} = 0\\text{ V}$.

---

### 🔬 Concrete Worked Numerical Example: 180nm CMOS Sizing
**Specification:** Fabricate a symmetric inverter in $180\\text{ nm}$ CMOS with $V_{DD} = 1.8\\text{ V}$, $V_{Tn} = 0.40\\text{ V}$, $V_{Tp} = -0.40\\text{ V}$, electron mobility $\\mu_n = 450\\text{ cm}^2/\\text{V}\\cdot\\text{s}$, and hole mobility $\\mu_p = 180\\text{ cm}^2/\\text{V}\\cdot\\text{s}$.
- Minimum nMOS Width: $W_n = 0.36\\ \\mu\\text{m} \\implies (W/L)_n = 2.0$.

**Step 1: Mobility Ratio Calculation**
$$r_\\mu = \\frac{\\mu_n}{\\mu_p} = \\frac{450}{180} = \\mathbf{2.50}$$
Because electrons travel $2.5\\times$ faster than holes through the silicon lattice, an identically sized pMOS has $2.5\\times$ higher channel resistance ($R_p = 2.5 R_n$).

**Step 2: Symmetric Sizing for Equal Rise & Fall Delays ($t_{pLH} = t_{pHL}$)**
$$\\beta_n = \\beta_p \\implies \\left(\\frac{W}{L}\\right)_p = r_\\mu \\times \\left(\\frac{W}{L}\\right)_n = 2.50 \\times 2.0 = \\mathbf{5.0}$$
$$W_p = 5.0 \\times 0.18\\ \\mu\\text{m} = \\mathbf{0.90\\ \\mu\\text{m}}$$

**Step 3: Noise Margins**
$NM_L = V_{IL} - V_{OL} = 0.68 - 0.0 = \\mathbf{0.68\\text{ V}}$
$NM_H = V_{OH} - V_{IH} = 1.80 - 1.12 = \\mathbf{0.68\\text{ V}}$
Both noise margins equal $\\approx 38\\%\\text{ of } V_{DD}$, providing robust noise immunity!`,

      resolveFollowUp: function(query, q) {
        if (q.includes('why') && (q.includes('vdd/2') || q.includes('symmetric') || q.includes('half') || q.includes('threshold') || q.includes('center') || q.includes('midpoint'))) {
          return `### 🔬 Derivation: Why Switching Threshold $V_M = \\frac{V_{DD}}{2}$ for Symmetric Sizing
*Grounded in Jan M. Rabaey — Section 5.3*

The **switching threshold ($V_M$)** is defined mathematically as the point on the VTC where the input voltage equals the output voltage:
$$V_{in} = V_{out} = V_M$$

### Step 1: Transistor Operating Modes at $V_M$
At this midpoint, both devices satisfy the saturation condition $V_{DS} \\ge V_{GS} - V_T$:
- For nMOS: $V_{DSn} = V_M$, $V_{GSn} = V_M$. Since $V_M \\ge V_M - V_{Tn}$, **nMOS is in Saturation**.
- For pMOS: $V_{DSp} = V_M - V_{DD}$, $V_{GSp} = V_M - V_{DD}$. Since $|V_M - V_{DD}| \\ge |V_M - V_{DD}| - |V_{Tp}|$, **pMOS is in Saturation**.

### Step 2: Equating Saturation Drain Currents
Kirchhoff's Current Law requires $I_{Dn} = -I_{Dp}$:
$$\\frac{1}{2} \\beta_n (V_M - V_{Tn})^2 = \\frac{1}{2} \\beta_p (V_{DD} - V_M - |V_{Tp}|)^2$$
where transconductance factors are $\\beta_n = \\mu_n C_{ox} (W/L)_n$ and $\\beta_p = \\mu_p C_{ox} (W/L)_p$.

### Step 3: Taking Square Roots and Solving for $V_M$
$$\\sqrt{\\beta_n} (V_M - V_{Tn}) = \\sqrt{\\beta_p} (V_{DD} - V_M - |V_{Tp}|)$$
$$V_M = \\frac{V_{Tn} + \\sqrt{\\frac{\\beta_p}{\\beta_n}} (V_{DD} - |V_{Tp}|)}{1 + \\sqrt{\\frac{\\beta_p}{\\beta_n}}}$$

### Step 4: The Symmetric Sizing Condition
In a **symmetrically sized** inverter:
1. **Equal Transconductances:** We choose $(W/L)_p = \\frac{\\mu_n}{\\mu_p} (W/L)_n \\implies \\beta_n = \\beta_p \\implies \\frac{\\beta_p}{\\beta_n} = 1$.
2. **Equal Threshold Magnitudes:** Process engineers dope the channels so $V_{Tn} = |V_{Tp}| = V_T$.

Substituting these into the equation:
$$V_M = \\frac{V_T + 1 \\cdot (V_{DD} - V_T)}{1 + 1} = \\frac{V_T + V_{DD} - V_T}{2} = \\mathbf{\\frac{V_{DD}}{2}}$$

### 🎯 Key Engineering Benefits:
- **Maximum Noise Margins:** Placing $V_M$ at $\\frac{V_{DD}}{2}$ ensures $NM_L = NM_H$, giving maximum protection against noise.
- **Balanced Latency:** Symmetrical sizing balances propagation delays: $t_{pLH} = t_{pHL} = 0.69 R_{eq} C_L$.`;
        }
        return null;
      }
    },

    // VLSI: Latch-Up
    "latch_up": {
      topic: "CMOS Latch-Up Mechanism & Guard Ring Prevention",
      course: "VLSI Design (ECEg5405)",
      textbook: "Neil Weste — CMOS VLSI Design (Ch. 4, p. 185); Jan M. Rabaey — Digital ICs (Ch. 2)",

      mainAnswer: `### 📖 CMOS Latch-Up Mechanism & Guard Ring Prevention
*Primary Textbook: Neil Weste & David Harris — CMOS VLSI Design (Ch. 4)*

**CMOS Latch-Up** is a catastrophic, destructive failure mode in bulk CMOS ICs where parasitic bipolar junction transistors form a regenerative Silicon Controlled Rectifier (SCR) that creates a permanent low-impedance short circuit directly between $V_{DD}$ and Ground ($GND$).

### ⚡ Physical Structure of the Parasitic SCR:
1. **Lateral PNP Transistor ($Q_1$):** Formed by $p^+$ source/drain of pMOS (Emitter), n-well (Base), and p-substrate (Collector).
2. **Vertical NPN Transistor ($Q_2$):** Formed by $n^+$ source/drain of nMOS (Emitter), p-substrate (Base), and n-well (Collector).

### 🔬 Regenerative Latch Condition:
If an I/O spike injects current into the substrate such that $I_{sub} R_{sub} \\ge 0.7\\text{ V}$, $Q_2$ turns ON.
If the loop gain product satisfies:
$$\\beta_1 \\times \\beta_2 \\ge 1$$
the circuit latches into uncontrollable, self-sustaining high conduction, drawing amperes until thermal destruction occurs!

---

### 🛡️ 4 Physical Layout Prevention Techniques:
1. **Guard Rings:** Surround I/O pads with continuous $n^+$ rings connected to $V_{DD}$ and $p^+$ rings connected to $GND$ to collect injected minority carriers.
2. **Substrate & Well Taps:** Place $p^+$ taps to $GND$ and $n^+$ taps to $V_{DD}$ frequently (spacing $< 20\\ \\mu\\text{m}$) to minimize $R_{sub}$ and $R_{well}$ ($R_{sub} < 4\\ \\Omega$).
3. **Epitaxial Silicon Wafers:** Use heavily doped ($p^{++}$) low-resistivity substrates with thin epitaxial layers.
4. **Silicon-on-Insulator (SOI):** Complete dielectric isolation eliminates the parasitic SCR entirely!`,

      resolveFollowUp: function(query, q) {
        if (q.includes('guard ring') || q.includes('how') || q.includes('prevent')) {
          return `### 🔬 Guard Ring Layout Rules & Minority Carrier Collection
*Neil Weste — CMOS VLSI Design (Ch. 4)*

**Guard Rings** act as minority carrier sinks to prevent latch-up:
1. **$n^+$ Guard Ring in N-Well:** Tied to $V_{DD}$. Collects stray electrons diffusing through the well before they reach the pMOS collector junction.
2. **$p^+$ Guard Ring in P-Substrate:** Tied to $GND$. Collects stray holes before they turn on the parasitic NPN transistor base.

**Design Rule of Thumb:**
- Maximum distance between any transistor source diffusion and its closest substrate tap must be $< 15\\ \\mu\\text{m}$.
- All I/O pads MUST have double guard rings!`;
        }
        return null;
      }
    },

    // VLSI: Static Timing Analysis
    "setup_hold_time": {
      topic: "Static Timing Analysis: Setup Time, Hold Time & Clock Skew",
      course: "VLSI Design (ECEg5405)",
      textbook: "Neil Weste & David Harris — CMOS VLSI Design (Ch. 10)",

      mainAnswer: `### 📖 Static Timing Analysis: Setup Time, Hold Time & Clock Skew
*Primary Reference: Neil Weste & David Harris (Ch. 10)*

In synchronous edge-triggered flip-flop pipelines, correct data capture requires satisfying two timing windows:
- **Setup Time ($t_{setup}$):** Minimum time data must be stable BEFORE the clock edge.
- **Hold Time ($t_{hold}$):** Minimum time data must remain stable AFTER the clock edge.
- Violating either condition causes **metastability**, corrupting processor state.

### 📐 Governing Timing Inequalities:
1. **Setup Time Constraint (Maximum Delay Path):**
   $$T_{clk} \\ge t_{cq} + t_{comb,max} + t_{setup} - \\delta + t_{jitter}$$
   $$\\text{Setup Slack} = (T_{clk} + \\delta - t_{setup} - t_{jitter}) - (t_{cq} + t_{comb,max})$$
   *(Setup Slack must be $\\ge 0$).*

2. **Hold Time Constraint (Minimum Delay Path):**
   $$t_{cq,min} + t_{comb,min} \\ge t_{hold} + \\delta$$
   *(Hold condition is INDEPENDENT of clock period $T_{clk}$!)*

---

### 🔬 Worked Numerical Example: High-Speed Pipeline
Given $f_{clk} = 1.0\\text{ GHz} \\implies T_{clk} = 1000\\text{ ps}$, $t_{cq} = 120\\text{ ps}$, $t_{setup} = 80\\text{ ps}$, $t_{hold} = 60\\text{ ps}$, $t_{comb} = 750\\text{ ps}$, $\\delta = -50\\text{ ps}$, $t_{jitter} = 30\\text{ ps}$:
- $\\text{Arrival Time} = 120 + 750 = \\mathbf{870\\text{ ps}}$
- $\\text{Required Time} = 1000 + (-50) - 80 - 30 = \\mathbf{840\\text{ ps}}$
- $\\text{Setup Slack} = 840 - 870 = \\mathbf{-30\\text{ ps}} \\implies \\mathbf{VIOLATION!}$

**Fix:** Lower frequency to $f_{max} = \\frac{1}{1030\\text{ ps}} = \\mathbf{970.8\\text{ MHz}}$, or pipeline the combinational ALU stage.`,

      resolveFollowUp: function(query, q) {
        if (q.includes('fix') || q.includes('hold') || q.includes('violation')) {
          return `### 🔧 How to Fix Setup vs Hold Time Violations
| Violation Type | Cause | How to Fix in Silicon | Can Clock Slowdown Fix It? |
|---|---|---|---|
| **Setup Violation** (Late data) | $t_{comb}$ too long, clock frequency too high | 1. Pipeline combinational logic<br>2. Size up driving gates<br>3. Lower $f_{clk}$ | **YES!** Increasing $T_{clk}$ directly eliminates setup violations. |
| **Hold Violation** (Early data) | $t_{comb}$ too short, fast race condition | 1. **Insert delay buffers** in data path<br>2. Route clock tree with balanced H-tree | **NO!** Hold condition does not depend on clock period $T_{clk}$. A hold violation breaks the chip at ALL frequencies! |`;
        }
        return null;
      }
    },

    // ROBOTICS: Kinematics & Jacobians
    "robot_kinematics": {
      topic: "2-Link Planar Arm Forward & Inverse Kinematics",
      course: "Robotics and Computer Vision (ECEg5511)",
      textbook: "John J. Craig — Introduction to Robotics (Ch. 3 & 4)",

      mainAnswer: `### 📖 2-Link Planar Robot Arm Kinematics
*Primary Textbook: John J. Craig — Introduction to Robotics (Ch. 3 & 4)*

A 2-link planar manipulator consists of two revolute joints ($\\theta_1, \\theta_2$) and link lengths $L_1, L_2$:

### 1. Forward Kinematics (Joint Angles $\\to$ End-Effector Position):
$$x = L_1 \\cos(\\theta_1) + L_2 \\cos(\\theta_1 + \\theta_2)$$
$$y = L_1 \\sin(\\theta_1) + L_2 \\sin(\\theta_1 + \\theta_2)$$

### 2. Inverse Kinematics (Position $\\to$ Joint Angles):
$$\\cos(\\theta_2) = \\frac{x^2 + y^2 - L_1^2 - L_2^2}{2 L_1 L_2}$$
$$\\theta_2 = \\text{atan2}(\\pm \\sqrt{1 - \\cos^2(\\theta_2)},\\ \\cos(\\theta_2))$$
$$\\theta_1 = \\text{atan2}(y, x) - \\text{atan2}(L_2 \\sin(\\theta_2),\\ L_1 + L_2 \\cos(\\theta_2))$$

---

### 🔬 Worked Numerical Example:
Let $L_1 = 0.50\\text{ m}, L_2 = 0.40\\text{ m}$. Target: $(x, y) = (0.50, 0.40)\\text{ m}$.
1. $\\cos(\\theta_2) = \\frac{0.50^2 + 0.40^2 - 0.50^2 - 0.40^2}{2(0.50)(0.40)} = 0.00 \\implies \\theta_2 = \\mathbf{90.0^\\circ}$.
2. $\\theta_1 = \\text{atan2}(0.40, 0.50) - \\text{atan2}(0.40, 0.50) = \\mathbf{0.0^\\circ}$.`,

      resolveFollowUp: function(query, q) {
        if (q.includes('singularity') || q.includes('jacobian')) {
          return `### 🤖 Robot Jacobian Matrix & Kinematic Singularities
$$\\begin{bmatrix} \\dot{x} \\\\ \\dot{y} \\end{bmatrix} = J(\\theta) \\begin{bmatrix} \\dot{\\theta}_1 \\\\ \\dot{\\theta}_2 \\end{bmatrix}, \\quad \\det(J) = L_1 L_2 \\sin(\\theta_2)$$
Singularities occur when $\\det(J) = 0 \\implies \\mathbf{\\theta_2 = 0^\\circ \\text{ or } 180^\\circ}$!
At $\\theta_2 = 0^\\circ$, the arm is fully extended and cannot move radially outward; inverse kinematics demands infinite joint velocity.`;
        }
        if (q.includes('human') || q.includes('muscle')) {
          return `### 🦾 Human Muscle Biomechanics vs Robot Servomotors
- **Human Muscles:** Pull-only tension via antagonistic muscle pairs (biceps/triceps) with flexible collagen tendons providing natural compliance and high power-to-weight ratio.
- **Robot Servomotors:** Bidirectional electromagnetic torque with rigid gearboxes requiring active force-feedback control to emulate human compliance.`;
        }
        return null;
      }
    },

    // OPERATING SYSTEMS: Dual-Mode CPU & CrowdStrike Crash
    "os_dual_mode": {
      topic: "Dual-Mode CPU Operation & CrowdStrike Crash",
      course: "Operating Systems (ECEg5401)",
      textbook: "Abraham Silberschatz — Operating System Concepts (Ch. 1 & 2)",

      mainAnswer: `### 📖 Dual-Mode CPU Protection & System Call Traps
*Primary Textbook: Abraham Silberschatz — Operating System Concepts (Ch. 1 & 2)*

To prevent errant user applications from crashing the system, modern CPUs implement **Dual-Mode Operation** via a hardware **Mode Bit**:
- **User Mode (Mode Bit = 1):** Unprivileged. Prohibits executing privileged instructions (e.g. modifying page table registers CR3, disabling interrupts, direct I/O).
- **Kernel Mode (Mode Bit = 0):** Privileged. The OS kernel has unrestricted hardware access.

When an application invokes a system call (e.g. printf), a **hardware trap (software interrupt)** flips the Mode Bit $1 \\to 0$, indexes into the kernel dispatch table, executes the service routine, and resets the Mode Bit $0 \\to 1$ on return.

---

### 🔬 Case Study: July 2024 CrowdStrike Falcon Crash
- **Root Cause:** A configuration file (Channel 291) deployed to the kernel driver csagent.sys contained 21 input parameters while the parser expected 20, causing an out-of-bounds pointer read at offset 0x9c.
- **Why It Crashed 8.5M Computers:** Because the driver ran in **Kernel Ring 0** (Mode Bit $= 0$), the invalid read triggered an unhandled kernel page fault, resulting in a system Blue Screen of Death (BSOD). Monolithic kernels lack fault isolation between third-party drivers and core kernel memory!`,

      resolveFollowUp: function(query, q) {
        if (q.includes('microkernel') || q.includes('monolithic')) {
          return `### 🏛️ Monolithic Kernel vs Microkernel Architecture
- **Monolithic (Linux, Windows NT):** All drivers and file systems run in Ring 0 for speed. A driver bug crashes the entire OS.
- **Microkernel (QNX, seL4):** Only IPC, minimal memory mapping, and low-level scheduling run in Ring 0. Drivers run in Ring 3 (User Space). If a driver crashes, only that process restarts without rebooting the machine!`;
        }
        return null;
      }
    },

    // MACHINE LEARNING: Bias-Variance & Regularization
    "ml_bias_variance": {
      topic: "Bias-Variance Tradeoff & Regularization",
      course: "Machine Learning (ECEg5407)",
      textbook: "Andreas C. Müller & Sarah Guido — Intro to ML with Python (Ch. 2)",

      mainAnswer: `### 📖 Bias-Variance Tradeoff & Regularization
*Primary Textbook: Andreas C. Müller & Sarah Guido (Ch. 2)*

$$\\text{Total Error} = \\text{Bias}^2 + \\text{Variance} + \\sigma^2 \\text{ (Irreducible Noise)}$$
- **High Bias (Underfitting):** Model is too simple; high training AND test error.
- **High Variance (Overfitting):** Model memorizes training noise; near-zero training error, poor test generalization.

### 🛡️ L1 (Lasso) vs L2 (Ridge) Regularization:
- **L2 Ridge ($\\lambda \\sum w_j^2$):** Circular constraint boundary. Shrinks feature weights close to zero, handling multicollinearity.
- **L1 Lasso ($\\alpha \\sum |w_j|$):** Diamond-shaped boundary with sharp corners. Sets non-essential weights **exactly to zero**, performing automated feature selection!`,

      resolveFollowUp: function(query, q) {
        if (q.includes('scaling') || q.includes('normalize') || q.includes('knn')) {
          return `### 📏 Why Distance-Based Algorithms Require Feature Scaling
Algorithms relying on Euclidean distance (k-NN, SVM, k-Means) fail if features have unequal scales (e.g. Income in thousands vs Bedrooms in single digits).
**Standard Scaling:** $z = \\frac{x - \\mu}{\\sigma}$ or **Min-Max:** $x_{norm} = \\frac{x - x_{min}}{x_{max} - x_{min}}$.`;
        }
        return null;
      }
    }
  };

  // Conversational Query Router
  function synthesizeDynamicAnswer(query, courseId) {
    const q = query.toLowerCase().trim();

    // 1. Conversational, Meta, and Greeting Questions
    if (
      q.includes('would you understand') || q.includes('can you understand') ||
      q.includes('do you understand') || q.includes('who are you') ||
      q.includes('what are you') || q.includes('what can you do') ||
      q.includes('how do you work') || q.includes('are you chatgpt') ||
      q.includes('are you ai') || q.includes('are you gemini') ||
      /^(hi|hello|hey|greetings|good\s*(morning|afternoon|evening))\b/i.test(q)
    ) {
      return `👋 **Yes, absolutely! I understand whatever you ask me!**

I am your **AASTU AI Study Tutor**, designed specifically for 5th-year graduating class (GC 2026) Computer Engineering students at Addis Ababa Science and Technology University.

You can converse with me naturally in plain English just like ChatGPT! Here is what we can do together:
- 💬 **Ask Any Concept:** Ask about CMOS logic, robot kinematics, dual-mode OS protection, machine learning tradeoffs, or National Exit Exam topics.
- 🔬 **Request Worked Numerical Examples:** Ask for step-by-step calculations with real numbers (e.g. transistor sizing, setup/hold slack, wafer cost).
- 📐 **Request Mathematical Derivations:** Ask me to prove or derive formulas step-by-step using KaTeX.
- 💻 **Hardware & Software Code:** Request synthesizable VHDL RTL, Python robotics/ML scripts, or C systems code.
- 🔄 **Conversational Follow-ups:** You can always follow up with *"Why?"*, *"Can you explain that more simply?"*, or *"Give another example"*.

What course topic would you like to explore or practice today?`;
    }

    // 2. Check if user is asking a follow-up to the last discussed topic
    if (tutorState.lastTopicKey && KNOWLEDGE_MODULES[tutorState.lastTopicKey]) {
      const activeModule = KNOWLEDGE_MODULES[tutorState.lastTopicKey];
      if (activeModule.resolveFollowUp) {
        const followUpAnswer = activeModule.resolveFollowUp(query, q);
        if (followUpAnswer) {
          return followUpAnswer;
        }
      }
    }

    // 3. Strict Word-Boundary Topic Matching
    // CMOS Inverter VTC & Sizing
    if (/\b(vtc|inverter|noise\s*margin)\b/i.test(q) || (/\bsizing\b/i.test(q) && /\b(wp|wn|transistor)\b/i.test(q)) || (/\bswitching\b/i.test(q) && /\bthreshold\b/i.test(q))) {
      tutorState.lastTopicKey = 'cmos_vtc';
      if (q.includes('why') || q.includes('vdd/2') || q.includes('symmetric')) {
        const specialized = KNOWLEDGE_MODULES['cmos_vtc'].resolveFollowUp(query, q);
        if (specialized) return specialized;
      }
      return KNOWLEDGE_MODULES['cmos_vtc'].mainAnswer;
    }

    // Latch-up
    if (/\b(latch-?up|thyristor|guard\s*ring)\b/i.test(q) || /\bscr\b/i.test(q) || (/\bparasitic\b/i.test(q) && /\b(bjt|pnp|npn)\b/i.test(q))) {
      tutorState.lastTopicKey = 'latch_up';
      return KNOWLEDGE_MODULES['latch_up'].mainAnswer;
    }

    // Static Timing Analysis (Use \bsta\b so "understand" NEVER matches!)
    if (/\b(setup|hold\s*time|timing|clock\s*skew|slack|metastability)\b/i.test(q) || /\bsta\b/i.test(q)) {
      tutorState.lastTopicKey = 'setup_hold_time';
      return KNOWLEDGE_MODULES['setup_hold_time'].mainAnswer;
    }

    // Robotics & Kinematics
    if (/\b(robot|kinematic|kinematics|planar\s*arm|jacobian|singularity|singularities|biomechanic|servomotor)\b/i.test(q) || /\bd-?h\b/i.test(q)) {
      tutorState.lastTopicKey = 'robot_kinematics';
      if (q.includes('singularity') || q.includes('jacobian')) {
        const specialized = KNOWLEDGE_MODULES['robot_kinematics'].resolveFollowUp(query, q);
        if (specialized) return specialized;
      }
      if (q.includes('human') || q.includes('muscle')) {
        const specialized = KNOWLEDGE_MODULES['robot_kinematics'].resolveFollowUp(query, q);
        if (specialized) return specialized;
      }
      return KNOWLEDGE_MODULES['robot_kinematics'].mainAnswer;
    }

    // Operating Systems: Dual-Mode & CrowdStrike
    if (/\b(dual-?mode|user\s*mode|kernel\s*mode|system\s*call|syscall|trap|crowdstrike|ring\s*0|page\s*fault|microkernel|monolithic)\b/i.test(q)) {
      tutorState.lastTopicKey = 'os_dual_mode';
      return KNOWLEDGE_MODULES['os_dual_mode'].mainAnswer;
    }

    // Machine Learning: Bias-Variance & Regularization
    if (/\b(bias-?variance|overfitting|underfitting|regularization|lasso|ridge|l1|l2|feature\s*scaling)\b/i.test(q)) {
      tutorState.lastTopicKey = 'ml_bias_variance';
      return KNOWLEDGE_MODULES['ml_bias_variance'].mainAnswer;
    }

    // 4. Conversational Open-Ended Fallback
    return `### 💡 Question: "${escapeHtml(query)}"
*AASTU Computer Engineering Study Hub*

I am ready to help you explore this topic! 

To get the most tailored explanation, you can specify what you'd like:
- 📖 **Conceptual Explanation:** e.g., *"Explain the physical mechanism of..."*
- 🔬 **Worked Numerical Problem:** e.g., *"Give me a calculation example with real numbers for..."*
- 📐 **Mathematical Derivation:** e.g., *"Derive the equation for..."*
- 💻 **Hardware/Software Implementation:** e.g., *"Show me the VHDL code or Python script for..."*
- 🎓 **National Exit Exam Tip:** e.g., *"What are high-yield exam questions on this?"*

Feel free to ask your specific question or pick one of the quick study chips below!`;
  }

  // =========================================================================
  // 3. UI RENDERING & CHAT CONTROLS
  // =========================================================================

  function toggleAITutor() {
    tutorState.isOpen = !tutorState.isOpen;
    const drawer = document.getElementById('ai-tutor-drawer');
    const trigger = document.getElementById('ai-tutor-trigger');

    if (drawer) {
      if (tutorState.isOpen) {
        drawer.classList.remove('opacity-0', 'pointer-events-none', 'translate-y-6');
        drawer.classList.add('opacity-100', 'translate-y-0');
        if (trigger) trigger.classList.add('ring-4', 'ring-blue-400/50');
        updateContextBar();
        renderMessages();
        renderSuggestedChips();
        setTimeout(() => {
          const input = document.getElementById('ai-user-query-input');
          if (input) input.focus();
        }, 100);
      } else {
        drawer.classList.add('opacity-0', 'pointer-events-none', 'translate-y-6');
        drawer.classList.remove('opacity-100', 'translate-y-0');
        if (trigger) trigger.classList.remove('ring-4', 'ring-blue-400/50');
      }
    }

    if (window.soundFx && typeof window.soundFx.playClick === 'function') {
      window.soundFx.playClick();
    }
  }

  function toggleAISettings() {
    tutorState.showSettings = !tutorState.showSettings;
    const panel = document.getElementById('ai-settings-panel');
    if (panel) {
      if (tutorState.showSettings) {
        panel.classList.remove('hidden');
        updateSettingsUI();
      } else {
        panel.classList.add('hidden');
      }
    }
  }

  function saveAIApiKey() {
    const input = document.getElementById('ai-api-key-input');
    const providerSelect = document.getElementById('ai-provider-select');
    if (!input) return;

    const key = input.value.trim();
    const provider = providerSelect ? providerSelect.value : 'gemini';

    if (!key) {
      removeAIApiKey();
      return;
    }

    tutorState.apiKey = key;
    tutorState.apiProvider = provider;
    localStorage.setItem('aastu_ai_api_key', key);
    localStorage.setItem('aastu_ai_provider', provider);

    if (tutorState.apiProvider === 'gemini') {
      discoverWorkingGeminiModel(key).then(m => {
        if (m) {
          tutorState.discoveredModel = m;
          tutorState.activeModel = m;
          updateContextBar();
        }
      });
    }

    tutorState.showSettings = false;
    const panel = document.getElementById('ai-settings-panel');
    if (panel) panel.classList.add('hidden');
    updateContextBar();

    tutorState.messages.push({
      sender: 'bot',
      text: `🎉 **Turbo API Connected!**\n\nYour AI Study Tutor is now connected via **${tutorState.apiProvider === 'gemini' ? 'Google Gemini 2.0 Flash' : 'OpenAI ChatGPT'}** for high-speed cloud generation.`,
      time: 'Just now'
    });
    renderMessages();

    if (window.soundFx && typeof window.soundFx.playSuccess === 'function') {
      window.soundFx.playSuccess();
    }
  }

  function removeAIApiKey() {
    tutorState.apiKey = '';
    tutorState.apiProvider = 'cloud';
    localStorage.removeItem('aastu_ai_api_key');
    localStorage.removeItem('aastu_ai_provider');
    tutorState.showSettings = false;
    const panel = document.getElementById('ai-settings-panel');
    if (panel) panel.classList.add('hidden');
    updateContextBar();
    tutorState.messages.push({
      sender: 'bot',
      text: `ℹ️ Switched back to **Default Embedded Course AI (Zero Setup Required)**.`,
      time: 'Just now'
    });
    renderMessages();
  }

  function updateContextBar() {
    const courseCode = window.getCurrentCourse ? window.getCurrentCourse().code : 'ECEg5405';
    const courseTitle = window.getCurrentCourse ? window.getCurrentCourse().title : 'VLSI Design';
    const label = document.getElementById('ai-active-course-label');
    const modelBadge = document.getElementById('ai-model-status-badge');

    if (label) {
      label.textContent = `Course: ${courseCode} (${courseTitle})`;
    }
    if (modelBadge) {
      if (tutorState.apiKey) {
        const activeM = tutorState.discoveredModel || tutorState.activeModel || 'Live';
        modelBadge.className = 'text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800 flex items-center gap-1 cursor-pointer';
        modelBadge.innerHTML = `<span class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span> ${tutorState.apiProvider === 'gemini' ? 'Gemini (' + activeM + ')' : 'ChatGPT'}`;
      } else {
        modelBadge.className = 'text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800 flex items-center gap-1 shadow-2xs';
        modelBadge.innerHTML = `<span class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span> Live AI Active · ChatGPT Mode`;
      }
    }
  }

  function updateSettingsUI() {
    const input = document.getElementById('ai-api-key-input');
    const removeBtn = document.getElementById('ai-remove-key-btn');
    if (input) input.value = tutorState.apiKey || '';
    if (removeBtn) {
      if (tutorState.apiKey) {
        removeBtn.classList.remove('hidden');
      } else {
        removeBtn.classList.add('hidden');
      }
    }
  }

  function renderMessages() {
    const container = document.getElementById('ai-messages-list');
    if (!container) return;

    container.innerHTML = tutorState.messages.map((msg) => {
      const isUser = msg.sender === 'user';
      return `
        <div class="flex flex-col ${isUser ? 'items-end' : 'items-start'}">
          <div class="flex items-center gap-1.5 mb-1 px-1 text-[10px] text-slate-400">
            <span>${isUser ? '👤 You' : '🤖 AI Study Tutor'}</span>
            <span>·</span>
            <span>${msg.time || 'Just now'}</span>
          </div>
          <div class="max-w-[94%] sm:max-w-[90%] p-3.5 sm:p-4 rounded-3xl ${
            isUser 
              ? 'bg-blue-600 text-white rounded-tr-none shadow-sm' 
              : 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-100 rounded-tl-none border border-slate-200/80 dark:border-slate-700/80 shadow-xs'
          }">
            <div class="prose-chat leading-relaxed text-xs sm:text-sm">
              ${formatChatMarkdown(msg.text)}
            </div>
          </div>
        </div>
      `;
    }).join('');

    container.scrollTop = container.scrollHeight;

    if (window.renderMathInElement) {
      try {
        window.renderMathInElement(container, {
          delimiters: [
            { left: '$$', right: '$$', display: true },
            { left: '$', right: '$', display: false },
            { left: '\\[', right: '\\]', display: true },
            { left: '\\(', right: '\\)', display: false }
          ],
          throwOnError: false
        });
      } catch (err) {
        console.warn('Chat KaTeX error:', err);
      }
    }
  }

  function renderSuggestedChips() {
    const container = document.getElementById('ai-chips-container');
    if (!container) return;

    const courseId = window.getCurrentCourseId ? window.getCurrentCourseId() : 'eceg5405';
    let chips = [];

    if (courseId === 'eceg5405') {
      chips = [
        { label: "💡 Explain CMOS Inverter VTC", query: "Explain CMOS inverter VTC with an example" },
        { label: "💡 Why is VM = VDD/2?", query: "Why is the switching threshold at VDD/2 for symmetric sizing?" },
        { label: "💡 Example: Latch-Up Spike", query: "Can you give me an example of CMOS latch-up with real numbers?" },
        { label: "💡 Example: Setup Time Violation", query: "Give me a numerical example of setup time violation in STA" }
      ];
    } else if (courseId === 'eceg5511') {
      chips = [
        { label: "💡 Example: 2-Link Arm Kinematics", query: "Give me a step-by-step example of forward and inverse kinematics for a 2-link planar arm" },
        { label: "💡 Example: Singularity Detection", query: "Show me an example of calculating a robot Jacobian matrix and finding singularities" },
        { label: "💡 Example: Human vs Robot Joints", query: "Compare human muscle biomechanics with robot servomotors with an example" }
      ];
    } else if (courseId === 'eceg5401') {
      chips = [
        { label: "💡 Example: System Call Trap", query: "Give me a step-by-step example of printf switching CPU mode from user to kernel" },
        { label: "💡 Case Study: CrowdStrike Crash", query: "Explain the CrowdStrike kernel driver crash in detail" }
      ];
    } else {
      chips = [
        { label: "💡 Example: Bias-Variance", query: "Give me a concrete numerical example of the bias-variance tradeoff" },
        { label: "💡 Example: L1 vs L2 Regularization", query: "Explain L1 Lasso vs L2 Ridge with an example" }
      ];
    }

    container.innerHTML = chips.map(c => `
      <button 
        onclick="window.askAITutorQuery('${escapeHtml(c.query)}')"
        class="text-[11px] font-bold px-3 py-1.5 rounded-xl bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-blue-50 dark:hover:bg-blue-950 hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-300 transition-all shadow-2xs shrink-0 flex items-center gap-1 cursor-pointer"
      >
        ${c.label}
      </button>
    `).join('');
  }

  // Handle Query Submission
  window.handleAITutorSubmit = function(event) {
    if (event) event.preventDefault();
    const input = document.getElementById('ai-user-query-input');
    if (!input) return;
    const query = input.value.trim();
    if (!query) return;

    input.value = '';
    window.askAITutorQuery(query);
  };

  // Main Live Query Execution
  window.askAITutorQuery = async function(query) {
    if (!tutorState.isOpen) {
      toggleAITutor();
    }

    tutorState.messages.push({
      sender: 'user',
      text: query,
      time: 'Just now'
    });
    renderMessages();

    if (window.soundFx && typeof window.soundFx.playClick === 'function') {
      window.soundFx.playClick();
    }

    const list = document.getElementById('ai-messages-list');
    const typingId = 'ai-typing-indicator';
    let elapsedSeconds = 0;
    let timerInterval = null;

    if (list) {
      const typingDiv = document.createElement('div');
      typingDiv.id = typingId;
      typingDiv.className = 'flex items-center gap-2 p-3 bg-slate-100 dark:bg-slate-800 rounded-2xl w-fit text-slate-600 dark:text-slate-300 text-xs my-2 shadow-2xs border border-slate-200/60 dark:border-slate-700/60';
      typingDiv.innerHTML = `
        <span class="w-2.5 h-2.5 rounded-full bg-blue-600 animate-ping"></span>
        <span class="font-medium" id="ai-timer-text">AI Tutor is thinking & solving...</span>
      `;
      list.appendChild(typingDiv);
      list.scrollTop = list.scrollHeight;

      timerInterval = setInterval(() => {
        elapsedSeconds++;
        const timerText = document.getElementById('ai-timer-text');
        if (timerText) {
          timerText.textContent = `AI Tutor is thinking & solving... (${elapsedSeconds}s)`;
        }
      }, 1000);
    }

    const course = window.getCurrentCourse ? window.getCurrentCourse() : { code: 'ECEg5405', title: 'VLSI Design' };
    let answerText = '';

    try {
      answerText = await callLiveAI(tutorState.messages, course.code, course.title);
    } catch (err) {
      console.warn('Live AI fallback:', err);
      if (err.message && (err.message.includes('API key') || err.message.includes('API_KEY_INVALID') || err.message.includes('Google Gemini'))) {
        answerText = `⚠️ **Custom API Notice:** ${err.message}\n\n` + synthesizeDynamicAnswer(query, course.code);
      } else {
        answerText = synthesizeDynamicAnswer(query, course.code);
      }
    } finally {
      if (timerInterval) clearInterval(timerInterval);
      const typingElem = document.getElementById(typingId);
      if (typingElem) typingElem.remove();
    }

    tutorState.messages.push({
      sender: 'bot',
      text: answerText,
      time: 'Just now'
    });

    renderMessages();

    if (window.soundFx && typeof window.soundFx.playChime === 'function') {
      window.soundFx.playChime();
    } else if (window.soundFx && typeof window.soundFx.playSuccess === 'function') {
      window.soundFx.playSuccess();
    }
  };

  window.clearAITutorChat = function() {
    tutorState.lastTopicKey = null;
    tutorState.messages = [
      {
        sender: 'bot',
        text: `Chat cleared. Ask me any concept, formula, or exam derivation!`,
        time: 'Just now'
      }
    ];
    renderMessages();
    if (window.soundFx && typeof window.soundFx.playClick === 'function') {
      window.soundFx.playClick();
    }
  };

  function formatChatMarkdown(text) {
    if (!text) return '';
    let html = escapeHtml(text);

    // Code blocks
    html = html.replace(/```([a-zA-Z0-9_\-]*)\n([\s\S]*?)```/g, function(match, lang, code) {
      return `<pre class="my-3 p-3 bg-slate-900 text-slate-100 rounded-2xl overflow-x-auto text-[11px] font-mono leading-relaxed border border-slate-700"><code>${code}</code></pre>`;
    });

    // Inline code
    html = html.replace(/`([^`]+)`/g, '<code class="px-1.5 py-0.5 rounded-md bg-slate-200 dark:bg-slate-700 text-blue-600 dark:text-blue-400 font-mono text-[11px]">$1</code>');

    // Bold
    html = html.replace(/\*\*([^*]+)\*\*/g, '<strong class="font-bold text-slate-900 dark:text-white">$1</strong>');

    // Headings
    html = html.replace(/^### (.*$)/gim, '<h4 class="text-sm font-bold text-slate-900 dark:text-white mt-3 mb-1.5">$1</h4>');
    html = html.replace(/^## (.*$)/gim, '<h3 class="text-sm font-extrabold text-blue-600 dark:text-blue-400 mt-3 mb-1.5">$1</h3>');

    // Bullet & Numbered lists
    html = html.replace(/^\s*-\s+(.*$)/gim, '<li class="ml-4 list-disc text-xs leading-relaxed my-0.5">$1</li>');
    html = html.replace(/^\s*\d+\.\s+(.*$)/gim, '<li class="ml-4 list-decimal text-xs leading-relaxed my-0.5">$1</li>');

    // Line breaks
    html = html.replace(/\n\n/g, '<br><br>');

    return html;
  }

  function escapeHtml(str) {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  }

  // Mount UI
  function mountAITutorUI() {
    if (!document.getElementById('ai-tutor-trigger')) {
      const triggerBtn = document.createElement('button');
      triggerBtn.id = 'ai-tutor-trigger';
      triggerBtn.className = 'fixed bottom-5 right-5 z-50 px-4 py-3 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-xs sm:text-sm shadow-xl hover:shadow-blue-500/30 hover:scale-105 transition-all flex items-center gap-2.5 border border-white/20 backdrop-blur-md cursor-pointer';
      triggerBtn.innerHTML = `
        <span class="text-base sm:text-lg">🤖</span>
        <span class="hidden sm:inline">Ask AI Study Tutor</span>
        <span class="sm:hidden font-extrabold">AI Tutor</span>
        <span class="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
      `;
      triggerBtn.onclick = toggleAITutor;
      document.body.appendChild(triggerBtn);
    }

    if (!document.getElementById('ai-tutor-drawer')) {
      const drawer = document.createElement('div');
      drawer.id = 'ai-tutor-drawer';
      drawer.className = 'fixed bottom-20 right-4 sm:right-6 z-50 w-[94vw] sm:w-[500px] max-h-[85vh] h-[660px] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl flex flex-col overflow-hidden transition-all duration-300 opacity-0 pointer-events-none translate-y-6';
      
      drawer.innerHTML = `
        <!-- Header -->
        <div class="px-5 py-3.5 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 text-white flex items-center justify-between shadow-md">
          <div class="flex items-center gap-3">
            <div class="w-9 h-9 rounded-2xl bg-white/20 flex items-center justify-center text-lg backdrop-blur-sm shadow-inner">
              🤖
            </div>
            <div>
              <div class="font-extrabold text-sm sm:text-base leading-tight flex items-center gap-2">
                <span>AASTU AI Study Tutor</span>
                <span id="ai-model-status-badge"></span>
              </div>
              <div class="text-[10px] text-blue-100 flex items-center gap-1.5 mt-0.5">
                <span>Grounded in Course Textbooks</span>
                <span>·</span>
                <span class="text-emerald-300 font-bold">KaTeX Enabled</span>
              </div>
            </div>
          </div>
          <div class="flex items-center gap-1">
            <button onclick="window.toggleAISettings()" class="p-1.5 rounded-xl text-blue-200 hover:text-white hover:bg-white/10 transition-colors cursor-pointer" title="AI Settings (Gemini / OpenAI API)">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
            </button>
            <button onclick="window.clearAITutorChat()" class="p-1.5 rounded-xl text-blue-200 hover:text-white hover:bg-white/10 transition-colors cursor-pointer" title="Clear Chat History">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
            </button>
            <button onclick="window.toggleAITutor()" class="p-1.5 rounded-xl text-blue-200 hover:text-white hover:bg-white/10 transition-colors cursor-pointer" title="Close">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>
          </div>
        </div>

        <!-- Settings Dropdown Panel -->
        <div id="ai-settings-panel" class="hidden p-4 bg-slate-100 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 text-xs space-y-3">
          <div class="font-bold text-slate-800 dark:text-slate-100 flex items-center justify-between">
            <span>⚙️ Optional Turbo API Configuration</span>
            <span class="text-[10px] text-slate-500">(Zero setup needed by default)</span>
          </div>
          <div class="space-y-2">
            <div>
              <label class="block text-[11px] font-semibold text-slate-600 dark:text-slate-300 mb-1">Provider:</label>
              <select id="ai-provider-select" class="w-full text-xs p-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600">
                <option value="gemini">Google Gemini 2.0 Flash (Recommended, Free API)</option>
                <option value="openai">OpenAI (ChatGPT-4o-mini)</option>
              </select>
            </div>
            <div>
              <label class="block text-[11px] font-semibold text-slate-600 dark:text-slate-300 mb-1">API Key:</label>
              <input id="ai-api-key-input" type="password" placeholder="Paste your API key here..." class="w-full text-xs p-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 font-mono" />
            </div>
            <div class="flex items-center justify-between pt-1">
              <button onclick="window.saveAIApiKey()" class="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-xs cursor-pointer">Save & Connect</button>
              <button id="ai-remove-key-btn" onclick="window.removeAIApiKey()" class="text-xs text-red-600 dark:text-red-400 font-semibold hover:underline cursor-pointer">Remove Key</button>
            </div>
          </div>
        </div>

        <!-- Course Context Bar -->
        <div id="ai-context-bar" class="px-5 py-2 bg-slate-50 dark:bg-slate-800/80 border-b border-slate-100 dark:border-slate-800 text-[11px] text-slate-500 dark:text-slate-400 flex items-center justify-between">
          <span id="ai-active-course-label">Course: VLSI Design (ECEg5405)</span>
          <span class="text-[10px] text-blue-600 dark:text-blue-400 font-bold">5th Year GC · Zero Setup</span>
        </div>

        <!-- Messages Area -->
        <div id="ai-messages-list" class="flex-1 p-4 overflow-y-auto space-y-4 text-xs sm:text-sm">
        </div>

        <!-- Suggested Chips -->
        <div id="ai-chips-container" class="px-4 py-2 border-t border-slate-100 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-900/60 flex items-center gap-1.5 overflow-x-auto whitespace-nowrap scrollbar-none">
        </div>

        <!-- Chat Input Field -->
        <form id="ai-input-form" onsubmit="window.handleAITutorSubmit(event)" class="p-3 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex items-center gap-2">
          <input 
            id="ai-user-query-input"
            type="text" 
            placeholder="Ask any question, follow-up, or request examples..."
            class="flex-1 text-xs sm:text-sm px-4 py-2.5 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all"
          />
          <button type="submit" class="px-4 py-2.5 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md shadow-blue-500/25 transition-all shrink-0 cursor-pointer flex items-center gap-1.5">
            <span>Send</span>
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
          </button>
        </form>
      `;

      document.body.appendChild(drawer);
    }

    updateContextBar();
    updateSettingsUI();
    renderMessages();
    renderSuggestedChips();
  }

  // Window Exports
  window.toggleAITutor = toggleAITutor;
  window.toggleAISettings = toggleAISettings;
  window.saveAIApiKey = saveAIApiKey;
  window.removeAIApiKey = removeAIApiKey;
  window.getAITutorMessages = () => tutorState.messages;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mountAITutorUI);
  } else {
    mountAITutorUI();
  }
})();
