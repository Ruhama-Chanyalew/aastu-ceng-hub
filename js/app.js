/**
 * AASTU Computer Engineering GC Platform Controller (v3.0)
 * Upgrades:
 * - Clean, non-overlapping responsive layout (no sticky collisions)
 * - Refined, comfortable typography (Inter & Plus Jakarta Sans, soft slate colors, 1.7 line height)
 * - Robust line-based Markdown parser (proper lists, formula cards, tables)
 * - High-yield, concise lecture notes aligned with AASTU Course Guide Books
 * - Deep AI Study Tutor Chatbot integration grounded in textbooks
 * - 3D Flashcards with Active Recall & Mastered tracker
 * - 5-Part Exam Engine (MCQs, Descriptive, Derivations, Case Studies, Exit Exam benchmarks)
 */

document.addEventListener('DOMContentLoaded', () => {
  // Application State
  const state = {
    currentCourseId: 'eceg5405', // Default to VLSI Design
    currentChapterId: 'eceg5405-ch1',
    currentTab: 'notes', // 'notes', 'videos', 'exam', 'flashcards', 'visualizer', 'syllabus'
    theme: localStorage.getItem('aastu_theme') || 'light',
    userQuizAnswers: {},
    quizSubmitted: false,
    currentFlashcardIdx: 0,
    flashcardFlipped: false,
    masteredFlashcards: JSON.parse(localStorage.getItem('aastu_mastered_cards') || '{}'),
    userXP: parseInt(localStorage.getItem('aastu_user_xp') || '150', 10),
    userStreak: parseInt(localStorage.getItem('aastu_user_streak') || '3', 10),
    robotSimInstance: null
  };

  // Expose getters for AI Tutor
  window.getCurrentCourseId = () => state.currentCourseId;
  window.getCurrentCourse = () => AASTU_COURSES.find(c => c.id === state.currentCourseId);
  window.getCurrentChapterId = () => state.currentChapterId;

  // DOM Elements
  const courseListContainer = document.getElementById('course-nav-list');
  const mainContentArea = document.getElementById('main-content');
  const chapterNavContainer = document.getElementById('chapter-nav-list');
  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  const soundToggleBtn = document.getElementById('sound-toggle-btn');
  const searchInput = document.getElementById('global-search-input');
  const userXpBadge = document.getElementById('user-xp-counter');
  const courseHeaderTitle = document.getElementById('course-header-title');
  const courseHeaderCode = document.getElementById('course-header-code');
  const courseHeaderBadge = document.getElementById('course-header-badge');

  // Initialize UI State
  applyTheme(state.theme);
  updateSoundBtn();
  if (userXpBadge) userXpBadge.textContent = `${state.userXP} XP`;

  // Sound Toggle Listener
  if (soundToggleBtn) {
    soundToggleBtn.addEventListener('click', () => {
      if (window.soundFx) {
        const isMuted = window.soundFx.toggleMute();
        updateSoundBtn(isMuted);
      }
    });
  }

  function updateSoundBtn(isMuted) {
    if (!soundToggleBtn) return;
    const muted = isMuted !== undefined ? isMuted : (window.soundFx ? window.soundFx.muted : false);
    soundToggleBtn.innerHTML = muted ? '🔇' : '🔊';
    soundToggleBtn.title = muted ? 'Unmute Sound FX' : 'Mute Sound FX';
  }

  // Gamification: Add XP
  function addXP(points) {
    state.userXP += points;
    localStorage.setItem('aastu_user_xp', state.userXP);
    if (userXpBadge) {
      userXpBadge.textContent = `${state.userXP} XP`;
      userXpBadge.classList.add('scale-110', 'text-amber-500');
      setTimeout(() => userXpBadge.classList.remove('scale-110', 'text-amber-500'), 300);
    }
  }

  // Dark/Light Theme Handler
  function applyTheme(t) {
    state.theme = t;
    localStorage.setItem('aastu_theme', t);
    if (t === 'dark') {
      document.documentElement.classList.add('dark');
      if (themeToggleBtn) {
        themeToggleBtn.innerHTML = `
          <svg class="w-5 h-5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clip-rule="evenodd" />
          </svg>
        `;
      }
    } else {
      document.documentElement.classList.remove('dark');
      if (themeToggleBtn) {
        themeToggleBtn.innerHTML = `
          <svg class="w-5 h-5 text-slate-600" fill="currentColor" viewBox="0 0 20 20">
            <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
          </svg>
        `;
      }
    }
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      applyTheme(state.theme === 'dark' ? 'light' : 'dark');
      if (window.soundFx) window.soundFx.playClick();
      renderMainContent();
    });
  }

  // Render Course Sidebar Navigation
  function renderCourseList() {
    if (!courseListContainer) return;
    courseListContainer.innerHTML = AASTU_COURSES.map(c => {
      const active = c.id === state.currentCourseId;
      return `
        <button data-course-id="${c.id}" class="course-nav-item w-full text-left p-3 rounded-2xl transition-all flex items-start gap-3 ${active ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20 font-semibold ring-2 ring-blue-500/20' : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/80'}">
          <div class="mt-0.5 p-1.5 rounded-lg shrink-0 ${active ? 'bg-blue-700 text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300'}">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>
          </div>
          <div class="flex-1 min-w-0">
            <div class="flex items-center justify-between">
              <span class="font-extrabold text-[11px] tracking-wider uppercase opacity-95">${c.code}</span>
              <span class="text-[10px] px-1.5 py-0.5 rounded font-bold ${active ? 'bg-blue-500 text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-400'}">${c.creditHours} Cr</span>
            </div>
            <div class="font-semibold text-xs sm:text-sm leading-snug mt-1">${c.title}</div>
          </div>
        </button>
      `;
    }).join('');

    courseListContainer.querySelectorAll('.course-nav-item').forEach(btn => {
      btn.addEventListener('click', () => {
        const cid = btn.getAttribute('data-course-id');
        if (window.soundFx) window.soundFx.playClick();
        selectCourse(cid);
      });
    });
  }

  function selectCourse(cid) {
    state.currentCourseId = cid;
    const course = AASTU_COURSES.find(c => c.id === cid);
    if (!course) return;

    const defaultCh = course.chapters[0];
    state.currentChapterId = `${cid}-${defaultCh.id}`;
    state.currentTab = 'notes';
    state.quizSubmitted = false;
    state.userQuizAnswers = {};
    state.currentFlashcardIdx = 0;
    state.flashcardFlipped = false;

    renderCourseList();
    renderCourseHeader(course);
    renderChapterList(course);
    renderMainContent();
  }

  function renderCourseHeader(course) {
    if (courseHeaderTitle) courseHeaderTitle.textContent = course.title;
    if (courseHeaderCode) courseHeaderCode.textContent = course.code;
    if (courseHeaderBadge) courseHeaderBadge.textContent = `Year ${course.year}, Sem ${course.semester} · ${course.creditHours} Credit Hours`;
  }

  function renderChapterList(course) {
    if (!chapterNavContainer) return;
    chapterNavContainer.innerHTML = course.chapters.map(ch => {
      const chKey = `${course.id}-${ch.id}`;
      const active = chKey === state.currentChapterId;
      return `
        <button data-ch-key="${chKey}" class="ch-nav-item w-full text-left p-3 rounded-2xl text-xs font-medium transition-all flex items-start gap-2.5 ${active ? 'bg-blue-50 text-blue-700 dark:bg-blue-950/70 dark:text-blue-300 border-l-4 border-blue-600 shadow-xs font-semibold' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'}">
          <span class="px-2 py-0.5 rounded-md text-[10px] font-bold ${active ? 'bg-blue-600 text-white' : 'bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300'} shrink-0">Ch ${ch.num}</span>
          <span class="leading-snug text-slate-700 dark:text-slate-200 flex-1">${ch.title}</span>
          ${ch.hasSimulator ? `<span class="ml-1 text-[9px] bg-amber-500 text-white px-1.5 py-0.5 rounded font-black tracking-wide uppercase shrink-0">3D SIM</span>` : ''}
        </button>
      `;
    }).join('');

    chapterNavContainer.querySelectorAll('.ch-nav-item').forEach(btn => {
      btn.addEventListener('click', () => {
        state.currentChapterId = btn.getAttribute('data-ch-key');
        state.quizSubmitted = false;
        state.userQuizAnswers = {};
        state.currentFlashcardIdx = 0;
        state.flashcardFlipped = false;
        if (window.soundFx) window.soundFx.playClick();
        renderChapterList(course);
        renderMainContent();
      });
    });
  }

  window.switchTab = function(tabName) {
    state.currentTab = tabName;
    if (window.soundFx) window.soundFx.playClick();
    renderMainContent();
  };

  function renderMainContent() {
    const course = AASTU_COURSES.find(c => c.id === state.currentCourseId);
    if (!course) return;

    const note = AASTU_NOTES[state.currentChapterId];
    const exam = AASTU_EXAMS[state.currentChapterId];
    const currentChapterMeta = course.chapters.find(ch => `${course.id}-${ch.id}` === state.currentChapterId) || course.chapters[0];

    const hasSimulator = currentChapterMeta.hasSimulator || course.id === 'eceg5511';
    const videoCount = course.videoLessons ? course.videoLessons.length : 0;

    // Clean Tab Bar (No awkward sticky positioning that obscures content)
    let html = `
      <div class="border-b border-slate-200 dark:border-slate-800 pb-3 mb-6 flex flex-wrap items-center justify-between gap-3 bg-slate-50 dark:bg-slate-950 py-1">
        <div class="flex items-center gap-1.5 bg-slate-200/80 dark:bg-slate-800/90 p-1 rounded-2xl shadow-inner">
          
          <button onclick="switchTab('notes')" class="px-3.5 sm:px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${state.currentTab === 'notes' ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-xs' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'}">
            <span>📖</span>
            <span>Lecture Notes</span>
          </button>

          <button onclick="switchTab('videos')" class="px-3.5 sm:px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${state.currentTab === 'videos' ? 'bg-white dark:bg-slate-900 text-red-600 dark:text-red-400 shadow-xs' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'}">
            <span>🎬</span>
            <span>Video Hub</span>
            <span class="text-[10px] px-1.5 py-0.2 rounded-full ${state.currentTab === 'videos' ? 'bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300' : 'bg-slate-300 dark:bg-slate-700 text-slate-700 dark:text-slate-300'} font-black">${videoCount}</span>
          </button>

          <button onclick="switchTab('exam')" class="px-3.5 sm:px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${state.currentTab === 'exam' ? 'bg-white dark:bg-slate-900 text-emerald-600 dark:text-emerald-400 shadow-xs' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'}">
            <span>📝</span>
            <span>Exam & Quiz</span>
          </button>

          <button onclick="switchTab('flashcards')" class="px-3.5 sm:px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${state.currentTab === 'flashcards' ? 'bg-white dark:bg-slate-900 text-purple-600 dark:text-purple-400 shadow-xs' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'}">
            <span>⚡</span>
            <span>Flashcards</span>
          </button>

          ${hasSimulator ? `
            <button onclick="switchTab('visualizer')" class="px-3.5 sm:px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${state.currentTab === 'visualizer' ? 'bg-white dark:bg-slate-900 text-amber-600 dark:text-amber-400 shadow-xs' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'}">
              <span>🦾</span>
              <span>3D Biomechanics</span>
            </button>
          ` : ''}

          <button onclick="switchTab('syllabus')" class="px-3.5 sm:px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${state.currentTab === 'syllabus' ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-xs' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'}">
            <span>📋</span>
            <span>Books & CLOs</span>
          </button>

        </div>

        <div class="flex items-center gap-2">
          <button onclick="window.toggleAITutor()" class="text-xs font-bold px-3 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white flex items-center gap-1.5 shadow-xs hover:opacity-95 transition-all">
            <span>🤖</span>
            <span>Ask AI Tutor</span>
          </button>
          <button onclick="window.print()" class="text-xs font-semibold px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-1.5 shadow-xs">
            <svg class="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"></path></svg>
            Print
          </button>
        </div>
      </div>
    `;

    if (state.currentTab === 'notes') {
      html += renderNotesView(course, currentChapterMeta, note);
    } else if (state.currentTab === 'videos') {
      html += renderVideosView(course);
    } else if (state.currentTab === 'exam') {
      html += renderExamView(course, currentChapterMeta, exam);
    } else if (state.currentTab === 'flashcards') {
      html += renderFlashcardsView(course, currentChapterMeta, exam);
    } else if (state.currentTab === 'visualizer') {
      html += renderVisualizerView(course, currentChapterMeta);
    } else if (state.currentTab === 'syllabus') {
      html += renderSyllabusView(course);
    }

    mainContentArea.innerHTML = html;

    if (state.currentTab === 'visualizer') {
      setTimeout(() => initVisualizerEngine(), 50);
    }

    renderAllMath();
  }

  // Robust Mathematical KaTeX Rendering
  function renderAllMath() {
    if (window.renderMathInElement && mainContentArea) {
      try {
        renderMathInElement(mainContentArea, {
          delimiters: [
            { left: '$$', right: '$$', display: true },
            { left: '$', right: '$', display: false },
            { left: '\\[', right: '\\]', display: true },
            { left: '\\(', right: '\\)', display: false }
          ],
          throwOnError: false
        });
      } catch (err) {
        console.warn('KaTeX rendering error:', err);
      }
    } else if (!window.renderMathInElement) {
      setTimeout(renderAllMath, 150);
    }
  }

  function renderNotesView(course, chMeta, note) {
    if (!note) {
      return `
        <div class="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-3xl p-8 text-center max-w-2xl mx-auto my-12 shadow-sm">
          <div class="w-12 h-12 bg-amber-100 dark:bg-amber-900 text-amber-700 dark:text-amber-300 rounded-full flex items-center justify-center mx-auto mb-4 font-black text-xl">
            📚
          </div>
          <h3 class="text-base sm:text-lg font-bold text-slate-900 dark:text-white">Synthesizing Notes for ${course.code} · Chapter ${chMeta.num}</h3>
          <p class="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-2">
            Notes for this chapter are currently being finalized. Please select Chapter 1 or explore the Video Hub!
          </p>
          <div class="mt-6 flex justify-center gap-3">
            <button onclick="selectChapter('${course.id}-ch1')" class="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold">Go to Chapter 1 Notes</button>
            <button onclick="switchTab('videos')" class="px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold">Watch Video Lectures 🎬</button>
          </div>
        </div>
      `;
    }

    return `
      <article class="max-w-none space-y-6">
        <!-- Chapter Header Card -->
        <div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xs">
          <div class="flex flex-wrap items-center gap-2 mb-2.5">
            <span class="px-2.5 py-1 bg-blue-600 text-white text-[10px] font-bold rounded-lg uppercase tracking-wider">Chapter ${note.chapterNum}</span>
            <span class="text-xs text-slate-500 dark:text-slate-400 font-medium">⏱ ${note.readTime}</span>
            <span class="text-xs text-emerald-700 dark:text-emerald-300 font-bold bg-emerald-100 dark:bg-emerald-950/80 px-2.5 py-0.5 rounded-lg">${note.cloRef}</span>
          </div>
          <h1 class="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">${note.title}</h1>
          <div class="mt-3 text-xs text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/60 p-3 rounded-2xl border border-slate-100 dark:border-slate-800 flex items-center justify-between flex-wrap gap-2">
            <div>📖 <strong>Course References:</strong> ${note.authoritativeSources}</div>
            <button onclick="window.askAITutorQuery('Explain the core concepts of ${course.code} Chapter ${note.chapterNum}: ${note.title}')" class="text-blue-600 dark:text-blue-400 font-bold hover:underline flex items-center gap-1">
              <span>🤖</span> Ask AI to summarize this chapter
            </button>
          </div>
        </div>

        <!-- Sections -->
        ${note.sections.map(sec => `
          <section id="${sec.id}" class="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xs">
            <h2 class="text-lg sm:text-xl font-bold text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-3 mb-4 flex items-center gap-2.5">
              <span class="w-2 h-4 bg-blue-600 rounded-sm inline-block shrink-0"></span>
              ${sec.heading}
            </h2>
            <div class="text-slate-600 dark:text-slate-300 leading-relaxed text-xs sm:text-sm font-normal">
              ${formatMarkdown(sec.content)}
            </div>
          </section>
        `).join('')}

        <!-- Next Action Prompt -->
        <div class="bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 text-white rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-md mb-8">
          <div>
            <div class="text-xs font-bold uppercase tracking-wider text-blue-200">Active Recall Revision</div>
            <h4 class="text-lg sm:text-xl font-bold mt-1">Ready for the Chapter Assessment?</h4>
            <p class="text-xs text-blue-100 mt-1 max-w-xl">Test your memory with active recall flashcards, past exam numericals, and Exit Exam (NEE5108) benchmarks.</p>
          </div>
          <div class="flex gap-2.5 shrink-0">
            <button onclick="switchTab('flashcards')" class="px-4 py-2.5 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-xs font-bold transition-all shadow-xs">
              ⚡ Flashcards
            </button>
            <button onclick="switchTab('exam')" class="px-5 py-2.5 bg-white text-blue-700 hover:bg-blue-50 rounded-xl text-xs font-black transition-all shadow-xs">
              Take Exam (+50 XP) →
            </button>
          </div>
        </div>
      </article>
    `;
  }

  function renderVideosView(course) {
    if (!course.videoLessons || course.videoLessons.length === 0) {
      return `
        <div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-12 text-center max-w-xl mx-auto my-8">
          <div class="text-4xl mb-3">🎬</div>
          <h3 class="font-bold text-lg text-slate-900 dark:text-white">Curated Lessons Hub</h3>
          <p class="text-xs text-slate-500 mt-1">Curating YouTube video masterclasses for this course.</p>
        </div>
      `;
    }

    return `
      <div class="space-y-6">
        <div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xs">
          <div class="flex items-center gap-2 mb-2">
            <span class="px-3 py-1 bg-red-600 text-white text-[10px] font-bold rounded-lg uppercase tracking-wider">Video Hub</span>
            <span class="text-xs font-semibold text-slate-500">${course.videoLessons.length} High-Yield Lessons</span>
          </div>
          <h2 class="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">Visual Masterclass Lessons</h2>
          <p class="text-xs text-slate-500 mt-1">Carefully selected 3D animated explanations from world-renowned engineering educators (Branch Education, StatQuest, Stanford, 3Blue1Brown).</p>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          ${course.videoLessons.map(vid => `
            <div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden shadow-xs flex flex-col justify-between">
              <div>
                <div class="relative w-full aspect-video bg-black">
                  <iframe 
                    class="w-full h-full"
                    src="https://www.youtube.com/embed/${vid.youtubeId}" 
                    title="${vid.title}" 
                    frameborder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                    allowfullscreen>
                  </iframe>
                </div>
                <div class="p-6">
                  <div class="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-2">
                    <span class="font-bold text-red-600 dark:text-red-400">${vid.creator}</span>
                    <span>⏱ ${vid.duration}</span>
                  </div>
                  <h3 class="font-bold text-sm sm:text-base text-slate-900 dark:text-white mb-2 leading-snug">${vid.title}</h3>
                  <div class="text-xs text-slate-500 mb-4 font-semibold">📌 <strong>Core Topic:</strong> ${vid.topic}</div>
                  
                  <div class="bg-slate-50 dark:bg-slate-800/60 rounded-2xl p-4 border border-slate-100 dark:border-slate-800">
                    <div class="text-[11px] font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">Key Takeaways:</div>
                    <ul class="text-xs text-slate-600 dark:text-slate-400 space-y-1.5 list-disc pl-4">
                      ${vid.keyTakeaways.map(t => `<li>${t}</li>`).join('')}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  // Dedicated Active Recall Flashcards View
  function renderFlashcardsView(course, chMeta, exam) {
    if (!exam || (!exam.flashcards && !exam.mcqs)) {
      return `
        <div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-12 text-center max-w-xl mx-auto my-8">
          <div class="text-4xl mb-3">⚡</div>
          <h3 class="font-bold text-lg text-slate-900 dark:text-white">Flashcards for Chapter ${chMeta.num}</h3>
          <p class="text-xs text-slate-500 mt-1">Please select any VLSI, Robotics, OS, or Machine Learning chapter to practice flashcards!</p>
        </div>
      `;
    }

    const cards = exam.flashcards || exam.mcqs.map(q => ({
      concept: "Diagnostic Question",
      question: q.question,
      answer: q.options[q.correct],
      formula: "",
      keyTakeaway: q.rationale,
      examTrap: "Analyze distractors carefully."
    }));

    const card = cards[state.currentFlashcardIdx % cards.length];
    const isMastered = state.masteredFlashcards[`${state.currentChapterId}-${state.currentFlashcardIdx}`];

    return `
      <div class="max-w-2xl mx-auto space-y-5">
        
        <!-- Header -->
        <div class="text-center">
          <div class="inline-flex items-center gap-1.5 px-3 py-1 bg-purple-100 dark:bg-purple-950/80 text-purple-700 dark:text-purple-300 text-xs font-bold rounded-full mb-1.5">
            <span>⚡</span> Active Recall & Spaced Repetition
          </div>
          <h2 class="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">Chapter ${chMeta.num} Flashcards</h2>
          <p class="text-xs text-slate-500 mt-0.5">Tap the card or press Spacebar to flip between question and formula explanation.</p>
        </div>

        <!-- Progress Indicator -->
        <div class="flex items-center justify-between text-xs font-bold text-slate-500 px-2">
          <span>Card ${(state.currentFlashcardIdx % cards.length) + 1} of ${cards.length}</span>
          <div class="flex items-center gap-2">
            ${isMastered ? '<span class="text-emerald-600 dark:text-emerald-400 font-bold">✓ Mastered (+15 XP)</span>' : ''}
            <button onclick="toggleCardMastered('${state.currentChapterId}', ${state.currentFlashcardIdx % cards.length})" class="px-3 py-1 rounded-xl text-xs font-bold ${isMastered ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300' : 'bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300'} hover:opacity-80">
              ${isMastered ? '★ Mastered' : '☆ Mark as Mastered'}
            </button>
          </div>
        </div>

        <!-- 3D Flip Card -->
        <div class="perspective-1000 cursor-pointer select-none" onclick="toggleFlashcardFlip()">
          <div id="flashcard-card" class="relative w-full min-h-[320px] sm:min-h-[350px] rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-8 shadow-md flex flex-col justify-between transition-transform duration-500 transform-style-3d ${state.flashcardFlipped ? 'rotate-y-180 bg-gradient-to-br from-purple-50/50 via-white to-indigo-50/50 dark:from-slate-900 dark:via-slate-900 dark:to-purple-950/30' : ''}">
            
            ${!state.flashcardFlipped ? `
              <!-- FRONT OF CARD -->
              <div>
                <div class="flex items-center justify-between text-xs text-slate-400 font-mono mb-4">
                  <span class="px-2.5 py-1 rounded-lg bg-purple-100 dark:bg-purple-950/80 text-purple-700 dark:text-purple-300 font-bold text-[10px] uppercase">${card.concept || 'CONCEPT'}</span>
                  <span class="text-slate-400 font-bold text-[11px] uppercase tracking-wider">TAP TO REVEAL 🔄</span>
                </div>
                <h3 class="text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-relaxed mt-4">
                  ${card.question}
                </h3>
              </div>
              <div class="text-center text-xs font-bold text-purple-600 dark:text-purple-400 mt-6 flex items-center justify-center gap-1.5 py-2 rounded-xl bg-purple-50 dark:bg-purple-950/40">
                <span>🔄 Click Card to Reveal Answer, Formula & Pitfall</span>
              </div>
            ` : `
              <!-- BACK OF CARD -->
              <div class="rotate-y-180 space-y-3.5">
                <div class="flex items-center justify-between text-xs text-slate-400 font-mono mb-1">
                  <span class="text-emerald-600 dark:text-emerald-400 font-bold uppercase tracking-wider text-[11px]">✓ CORE ANSWER</span>
                  <span class="text-slate-400 text-[10px]">FLIP BACK 🔄</span>
                </div>
                <div class="text-xs sm:text-sm text-slate-700 dark:text-slate-300 font-normal leading-relaxed">
                  ${formatMarkdown(card.answer)}
                </div>

                ${card.formula ? `
                  <div class="formula-card my-2 py-2 px-3 text-center">
                    <span class="formula-tag">Essential Formula</span>
                    <div class="text-xs sm:text-sm overflow-x-auto">${card.formula}</div>
                  </div>
                ` : ''}

                ${card.keyTakeaway ? `
                  <div class="p-3 rounded-xl bg-blue-50/80 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900 text-xs text-slate-700 dark:text-slate-300">
                    <strong class="text-blue-700 dark:text-blue-300 block mb-0.5">💡 High-Yield Takeaway:</strong>
                    ${card.keyTakeaway}
                  </div>
                ` : ''}

                ${card.examTrap ? `
                  <div class="p-3 rounded-xl bg-amber-50/80 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900 text-xs text-amber-900 dark:text-amber-200">
                    <strong class="text-amber-700 dark:text-amber-400 block mb-0.5">⚠️ Common Exam Trap:</strong>
                    ${card.examTrap}
                  </div>
                ` : ''}
              </div>
            `}

          </div>
        </div>

        <!-- Navigation Controls -->
        <div class="flex items-center justify-between px-2">
          <button onclick="prevFlashcard(${cards.length})" class="px-5 py-2.5 rounded-2xl border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-bold transition-all">
            ← Previous
          </button>
          
          <button onclick="shuffleFlashcards(${cards.length})" class="px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-500 hover:text-slate-800 dark:hover:text-white flex items-center gap-1.5">
            <span>🔀</span> Shuffle Deck
          </button>

          <button onclick="nextFlashcard(${cards.length})" class="px-6 py-2.5 rounded-2xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold shadow-xs transition-all">
            Next Card →
          </button>
        </div>

      </div>
    `;
  }

  window.toggleFlashcardFlip = function() {
    state.flashcardFlipped = !state.flashcardFlipped;
    if (window.soundFx) window.soundFx.playClick();
    renderMainContent();
  };

  window.nextFlashcard = function(total) {
    state.currentFlashcardIdx = (state.currentFlashcardIdx + 1) % total;
    state.flashcardFlipped = false;
    addXP(5);
    if (window.soundFx) window.soundFx.playClick();
    renderMainContent();
  };

  window.prevFlashcard = function(total) {
    state.currentFlashcardIdx = (state.currentFlashcardIdx - 1 + total) % total;
    state.flashcardFlipped = false;
    if (window.soundFx) window.soundFx.playClick();
    renderMainContent();
  };

  window.shuffleFlashcards = function(total) {
    state.currentFlashcardIdx = Math.floor(Math.random() * total);
    state.flashcardFlipped = false;
    if (window.soundFx) window.soundFx.playClick();
    renderMainContent();
  };

  window.toggleCardMastered = function(chKey, idx) {
    const key = `${chKey}-${idx}`;
    if (state.masteredFlashcards[key]) {
      delete state.masteredFlashcards[key];
    } else {
      state.masteredFlashcards[key] = true;
      addXP(15);
      if (window.soundFx) window.soundFx.playChime();
    }
    localStorage.setItem('aastu_mastered_cards', JSON.stringify(state.masteredFlashcards));
    renderMainContent();
  };

  // 5-Part Exam Assessment View
  function renderExamView(course, chMeta, exam) {
    if (!exam) {
      return `
        <div class="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-3xl p-12 text-center max-w-xl mx-auto my-8">
          <div class="text-4xl mb-3">📝</div>
          <h3 class="font-bold text-lg text-slate-900 dark:text-white">Exam Questions for Chapter ${chMeta.num}</h3>
          <p class="text-xs text-slate-500 mt-1">Please select any VLSI, Robotics, OS, or Machine Learning chapter to take the exam!</p>
        </div>
      `;
    }

    let scoreDisplay = '';
    if (state.quizSubmitted) {
      let correctCount = 0;
      exam.mcqs.forEach((q, idx) => {
        if (state.userQuizAnswers[idx] === q.correct) correctCount++;
      });
      const pct = Math.round((correctCount / exam.mcqs.length) * 100);
      
      if (pct >= 80 && window.confetti) {
        window.confetti({ particleCount: 90, spread: 70, origin: { y: 0.6 } });
        if (window.soundFx) window.soundFx.playFanfare();
      }

      scoreDisplay = `
        <div class="bg-gradient-to-r from-emerald-600 via-teal-600 to-blue-600 text-white p-6 sm:p-8 rounded-3xl mb-6 shadow-md flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <div class="text-xs font-bold tracking-wider uppercase text-emerald-200">Assessment Score Report</div>
            <div class="text-2xl sm:text-3xl font-black mt-1">${correctCount} / ${exam.mcqs.length} (${pct}%)</div>
            <div class="text-xs text-emerald-100 mt-1.5 font-medium">
              ${pct >= 75 ? '🎉 Outstanding mastery! +50 XP added to your graduation profile.' : '📚 Good attempt! Review the detailed rationales below to fill knowledge gaps.'}
            </div>
          </div>
          <button onclick="resetQuiz()" class="px-5 py-2.5 bg-white text-emerald-800 hover:bg-emerald-50 rounded-2xl text-xs font-black shadow-xs transition-all whitespace-nowrap">
            Retake Assessment 🔄
          </button>
        </div>
      `;
    }

    return `
      <div class="space-y-6">
        <!-- Exam Header -->
        <div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xs">
          <div class="flex items-center gap-2 mb-2">
            <span class="px-2.5 py-1 bg-amber-500 text-white text-[10px] font-bold rounded-lg uppercase">Exam Assessment</span>
            <span class="text-xs font-semibold text-slate-500 dark:text-slate-400">${exam.courseCode} · Chapter ${exam.chapterNum}</span>
          </div>
          <h2 class="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">${exam.title}</h2>
          <p class="text-xs text-slate-500 mt-1">Structured 5-part assessment: Conceptual MCQs with rationales, University descriptive problems, Step-by-Step derivations, Real-World Case Studies, and National Exit Exam (NEE5108) benchmarks.</p>
        </div>

        ${scoreDisplay}

        <!-- Part A: Multiple Choice Questions -->
        <div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xs">
          <h3 class="text-base sm:text-lg font-bold text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-3 mb-5 flex items-center justify-between">
            <span>Part A: Conceptual Multiple-Choice Questions</span>
            <span class="text-xs font-bold text-slate-400">${exam.mcqs.length} Questions</span>
          </h3>

          <div class="space-y-5">
            ${exam.mcqs.map((q, qIdx) => {
              const selectedOpt = state.userQuizAnswers[qIdx];
              return `
                <div class="p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-900/60">
                  <div class="font-bold text-slate-900 dark:text-white text-xs sm:text-sm mb-3.5 leading-relaxed">
                    <span class="inline-block w-5 h-5 bg-blue-600 text-white text-[11px] font-black rounded-full text-center leading-5 mr-1.5">${qIdx + 1}</span>
                    ${q.question}
                  </div>
                  <div class="space-y-2">
                    ${q.options.map((opt, optIdx) => {
                      let optClass = 'border-slate-200 dark:border-slate-700/80 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300';
                      if (selectedOpt === optIdx) {
                        optClass = 'border-blue-600 bg-blue-50 dark:bg-blue-950/60 text-blue-900 dark:text-blue-100 font-bold ring-2 ring-blue-500/30';
                      }
                      if (state.quizSubmitted) {
                        if (optIdx === q.correct) {
                          optClass = 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-900 dark:text-emerald-100 font-bold ring-2 ring-emerald-500/30';
                        } else if (selectedOpt === optIdx && selectedOpt !== q.correct) {
                          optClass = 'border-red-500 bg-red-50 dark:bg-red-950/60 text-red-900 dark:text-red-100 line-through';
                        }
                      }
                      return `
                        <button onclick="handleOptionSelect(${qIdx}, ${optIdx})" ${state.quizSubmitted ? 'disabled' : ''} class="w-full text-left px-4 py-3 rounded-2xl border text-xs sm:text-sm transition-all flex items-center justify-between ${optClass}">
                          <span>${opt}</span>
                          ${state.quizSubmitted && optIdx === q.correct ? '<span class="text-emerald-600 dark:text-emerald-400 font-bold ml-2">✓ Correct</span>' : ''}
                          ${state.quizSubmitted && selectedOpt === optIdx && selectedOpt !== q.correct ? '<span class="text-red-600 dark:text-red-400 font-bold ml-2">✗ Your Choice</span>' : ''}
                        </button>
                      `;
                    }).join('')}
                  </div>

                  ${state.quizSubmitted ? `
                    <div class="mt-3.5 p-4 rounded-2xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900 text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                      <strong class="text-blue-700 dark:text-blue-300 block mb-1">💡 Detailed Engineering Rationale:</strong>
                      ${formatMarkdown(q.rationale)}
                    </div>
                  ` : ''}
                </div>
              `;
            }).join('')}
          </div>

          ${!state.quizSubmitted ? `
            <div class="mt-6 text-center">
              <button onclick="submitQuiz()" class="px-7 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl text-xs font-black transition-all shadow-md shadow-blue-500/25">
                Submit Answers & View Explanations (+50 XP)
              </button>
            </div>
          ` : ''}
        </div>

        <!-- Part B: University Short Answer Questions -->
        ${exam.universityQuestions ? `
          <div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xs">
            <h3 class="text-base sm:text-lg font-bold text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-3 mb-5">
              Part B: University Exam Questions & Model Solutions
            </h3>
            <div class="space-y-5">
              ${exam.universityQuestions.map((uq, uqIdx) => `
                <div class="border border-slate-200 dark:border-slate-800 rounded-2xl p-5">
                  <div class="flex items-center justify-between mb-2">
                    <span class="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">Question ${uqIdx + 1} (${uq.marks} Marks)</span>
                    <span class="text-[11px] px-2.5 py-0.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-bold">${uq.type}</span>
                  </div>
                  <h4 class="font-bold text-slate-900 dark:text-white text-xs sm:text-sm mb-3">${uq.question}</h4>
                  <details class="group mt-2">
                    <summary class="cursor-pointer text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline list-none flex items-center gap-1.5">
                      <span>Show Complete Model Solution</span>
                      <svg class="w-4 h-4 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
                    </summary>
                    <div class="mt-3 p-4 bg-slate-50 dark:bg-slate-800/60 rounded-2xl text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed border border-slate-200 dark:border-slate-700">
                      ${formatMarkdown(uq.solution)}
                    </div>
                  </details>
                </div>
              `).join('')}
            </div>
          </div>
        ` : ''}

        <!-- Part C: Step-by-Step Numerical Derivation -->
        ${exam.numericalProblem ? `
          <div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xs">
            <h3 class="text-base sm:text-lg font-bold text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-3 mb-5">
              Part C: Step-by-Step Quantitative Calculation & Derivation
            </h3>
            <div class="bg-blue-50/60 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900/60 rounded-2xl p-5 mb-5">
              <h4 class="font-bold text-slate-900 dark:text-white text-sm sm:text-base mb-1.5">${exam.numericalProblem.title}</h4>
              <p class="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">${exam.numericalProblem.statement}</p>
            </div>
            <div class="space-y-3.5">
              ${exam.numericalProblem.stepByStep.map(step => `
                <div class="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                  ${formatMarkdown(step)}
                </div>
              `).join('')}
            </div>
          </div>
        ` : ''}

        <!-- Part D: Real-World Case Study -->
        ${exam.caseStudy ? `
          <div class="bg-white dark:bg-slate-900 border border-purple-200 dark:border-purple-900/60 rounded-3xl p-6 sm:p-8 shadow-xs">
            <div class="flex items-center gap-2 mb-2">
              <span class="px-2.5 py-0.5 bg-purple-600 text-white text-[10px] font-bold rounded-lg uppercase tracking-wider">Part D: Case Study</span>
              <span class="text-xs font-bold text-purple-700 dark:text-purple-300">Industrial Scenario</span>
            </div>
            <h3 class="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-2">${exam.caseStudy.title}</h3>
            
            <div class="space-y-3 mt-3.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
              <div class="p-3.5 rounded-2xl bg-purple-50/50 dark:bg-purple-950/20 border border-purple-100 dark:border-purple-900/40">
                <strong class="text-purple-800 dark:text-purple-300 block mb-0.5">🏢 Engineering Context:</strong>
                ${exam.caseStudy.context}
              </div>
              <div class="p-3.5 rounded-2xl bg-amber-50/50 dark:bg-amber-950/20 border border-amber-100 dark:border-amber-900/40">
                <strong class="text-amber-800 dark:text-amber-300 block mb-0.5">⚠️ Problem & Bottleneck:</strong>
                ${exam.caseStudy.problem}
              </div>
              <div class="p-3.5 rounded-2xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/40">
                <strong class="text-emerald-800 dark:text-emerald-300 block mb-0.5">✅ Architectural Solution:</strong>
                ${exam.caseStudy.solution}
              </div>
              <div class="p-3.5 rounded-2xl bg-blue-50/50 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900/40">
                <strong class="text-blue-800 dark:text-blue-300 block mb-0.5">💡 Key Engineering Lesson:</strong>
                ${exam.caseStudy.lesson}
              </div>
            </div>
          </div>
        ` : ''}

        <!-- Part E: National Exit Exam (NEE) Benchmark -->
        ${exam.exitExamPrep ? `
          <div class="bg-gradient-to-br from-amber-500/10 to-orange-500/10 border border-amber-300 dark:border-amber-700/60 rounded-3xl p-6 sm:p-8">
            <div class="flex items-center gap-2 mb-2">
              <span class="px-2.5 py-0.5 bg-amber-600 text-white text-[10px] font-bold rounded-lg uppercase">Part E: Exit Exam Focus</span>
              <span class="text-xs font-bold text-amber-700 dark:text-amber-300">${exam.exitExamPrep.topic}</span>
            </div>
            <h4 class="text-sm sm:text-base font-bold text-slate-900 dark:text-white mb-2">${exam.exitExamPrep.question}</h4>
            <div class="mt-3 p-4 rounded-2xl bg-white dark:bg-slate-900 border border-amber-200 dark:border-amber-800 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              <strong class="text-amber-700 dark:text-amber-400 block mb-1">🎯 Solution & Evaluation Rubric:</strong>
              ${formatMarkdown(exam.exitExamPrep.answer)}
            </div>
          </div>
        ` : ''}
      </div>
    `;
  }

  function renderVisualizerView(course, chMeta) {
    return `
      <div class="space-y-6">
        <div class="bg-gradient-to-br from-blue-900 via-indigo-900 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-md">
          <div class="flex items-center gap-2 mb-2">
            <span class="px-2.5 py-0.5 bg-amber-500 text-slate-900 text-[10px] font-black rounded-lg uppercase">Interactive Canvas Simulator</span>
            <span class="text-xs text-blue-200 font-semibold">High-DPI Retina Engine</span>
          </div>
          <h2 class="text-xl sm:text-3xl font-bold tracking-tight">Human Biomechanics vs Robotic Manipulator</h2>
          <p class="text-xs sm:text-sm text-blue-100 max-w-2xl mt-1.5 leading-relaxed">
            Drag the Morph Reveal slider to compare human skeletal bones and agonist-antagonist muscle pairs directly against segmented industrial aluminum links and harmonic drive servomotors.
          </p>
        </div>

        <div class="grid grid-cols-1 xl:grid-cols-4 gap-6">
          <div class="xl:col-span-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 shadow-xs flex flex-col items-center">
            <div class="w-full flex items-center justify-between mb-3 px-2">
              <div class="flex items-center gap-2">
                <span class="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                <span class="text-xs font-bold text-slate-700 dark:text-slate-300">Live 60 FPS Kinematic Solver</span>
              </div>
              <div class="flex items-center gap-2">
                <button onclick="setSimMode('manual')" class="px-3 py-1.5 rounded-xl text-xs font-bold bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                  Manual Angles
                </button>
                <button onclick="setSimMode('pick_place')" class="px-3 py-1.5 rounded-xl text-xs font-bold bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
                  Pick & Place 📦
                </button>
              </div>
            </div>

            <div class="w-full relative rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 shadow-inner">
              <canvas id="robot-canvas" width="900" height="540" class="w-full h-auto block"></canvas>
            </div>

            <div class="w-full mt-5 bg-slate-50 dark:bg-slate-800/60 rounded-2xl p-4 border border-slate-200 dark:border-slate-700/80">
              <div class="flex items-center justify-between mb-1.5">
                <label class="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                  <span>🔬 Morph Reveal Slider:</span>
                  <span class="text-blue-600 dark:text-blue-400">Human Biology (Left) ⟷ Industrial Robot (Right)</span>
                </label>
                <span id="morph-value-display" class="text-xs font-mono font-bold text-slate-500">50%</span>
              </div>
              <input id="morph-slider" type="range" min="0" max="1" step="0.01" value="0.5" class="w-full accent-blue-600 cursor-pointer h-2 bg-slate-200 dark:bg-slate-700 rounded-lg" oninput="handleMorphChange(this.value)">
            </div>
          </div>

          <div class="xl:col-span-1 space-y-5">
            <div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 shadow-xs">
              <h3 class="font-bold text-xs text-slate-900 dark:text-white uppercase tracking-wider mb-3.5 border-b pb-2">
                Joint Controllers
              </h3>
              <div class="space-y-3.5">
                <div>
                  <div class="flex justify-between text-xs font-bold mb-1">
                    <span>Joint 1 (Shoulder / θ₁):</span>
                    <span id="theta1-val" class="font-mono text-blue-600">30°</span>
                  </div>
                  <input id="theta1-slider" type="range" min="-90" max="90" value="30" class="w-full accent-blue-600 cursor-pointer" oninput="handleAngleChange()">
                </div>
                <div>
                  <div class="flex justify-between text-xs font-bold mb-1">
                    <span>Joint 2 (Elbow / θ₂):</span>
                    <span id="theta2-val" class="font-mono text-indigo-600">-45°</span>
                  </div>
                  <input id="theta2-slider" type="range" min="-135" max="45" value="-45" class="w-full accent-indigo-600 cursor-pointer" oninput="handleAngleChange()">
                </div>
                <div>
                  <div class="flex justify-between text-xs font-bold mb-1">
                    <span>Joint 3 (Wrist / θ₃):</span>
                    <span id="theta3-val" class="font-mono text-purple-600">15°</span>
                  </div>
                  <input id="theta3-slider" type="range" min="-90" max="90" value="15" class="w-full accent-purple-600 cursor-pointer" oninput="handleAngleChange()">
                </div>
              </div>

              <div class="mt-5 pt-3.5 border-t border-slate-100 dark:border-slate-800 space-y-2.5">
                <label class="flex items-center gap-2 cursor-pointer text-xs font-medium">
                  <input type="checkbox" id="show-envelope-check" class="rounded accent-blue-600" onchange="toggleSimEnvelope(this.checked)">
                  <span>Show Reachable Workspace</span>
                </label>
                <label class="flex items-center gap-2 cursor-pointer text-xs font-medium">
                  <input type="checkbox" id="show-frames-check" checked class="rounded accent-blue-600" onchange="toggleSimFrames(this.checked)">
                  <span>Show Coordinate Frames</span>
                </label>
              </div>
            </div>

            <div class="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-slate-800 dark:to-blue-950/40 border border-blue-100 dark:border-slate-700 rounded-3xl p-5">
              <h4 class="font-bold text-xs uppercase tracking-wider text-blue-900 dark:text-blue-300 mb-2">Kinematic Telemetry</h4>
              <div class="space-y-2 text-xs font-mono">
                <div class="flex justify-between">
                  <span class="text-slate-500">End-Effector X:</span>
                  <span id="ee-x-val" class="font-bold text-slate-800 dark:text-slate-200">0.00 m</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-slate-500">End-Effector Y:</span>
                  <span id="ee-y-val" class="font-bold text-slate-800 dark:text-slate-200">0.00 m</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-slate-500">Gripper State:</span>
                  <span id="gripper-state-val" class="font-bold text-emerald-600">OPEN</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  function renderSyllabusView(course) {
    return `
      <div class="space-y-6">
        <div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xs">
          <div class="flex items-center gap-2 mb-2">
            <span class="px-2.5 py-0.5 bg-blue-600 text-white text-[10px] font-bold rounded-lg uppercase">${course.code}</span>
            <span class="text-xs font-semibold text-slate-500">AASTU Academic Curriculum</span>
          </div>
          <h2 class="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">${course.title} Syllabus & Textbooks</h2>
          <p class="text-xs text-slate-500 mt-1">Official Course Learning Outcomes (CLOs), prerequisite tree, and authoritative textbooks from the course guide book.</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-xs">
            <h3 class="font-bold text-sm sm:text-base text-slate-900 dark:text-white mb-4 flex items-center gap-2">
              <span>🎯</span> Course Learning Outcomes (CLOs)
            </h3>
            <ul class="space-y-2.5">
              ${course.clos.map(clo => `
                <li class="text-xs sm:text-sm text-slate-600 dark:text-slate-300 flex items-start gap-2.5 p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                  <span class="text-blue-600 dark:text-blue-400 font-bold shrink-0">✓</span>
                  <span>${clo}</span>
                </li>
              `).join('')}
            </ul>
          </div>

          <div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-xs">
            <h3 class="font-bold text-sm sm:text-base text-slate-900 dark:text-white mb-4 flex items-center gap-2">
              <span>📚</span> Authoritative Textbooks & References
            </h3>
            <div class="space-y-3.5">
              ${course.textbooks.map(tb => `
                <div class="p-3.5 rounded-2xl border border-slate-200 dark:border-slate-700/80 bg-slate-50/50 dark:bg-slate-800/40">
                  <h4 class="font-bold text-xs sm:text-sm text-slate-900 dark:text-white">${tb.title}</h4>
                  <div class="text-xs text-slate-500 mt-0.5">👤 <strong>Author(s):</strong> ${tb.author}</div>
                  <div class="text-[11px] text-slate-400 mt-0.5">🏛 <strong>Publisher:</strong> ${tb.publisher} (${tb.year})</div>
                </div>
              `).join('')}
            </div>
          </div>
        </div>
      </div>
    `;
  }

  function initVisualizerEngine() {
    const canvas = document.getElementById('robot-canvas');
    if (!canvas || !window.RetinaBiomechanicalSimulator) return;
    state.robotSimInstance = new window.RetinaBiomechanicalSimulator(canvas);
  }

  window.handleAngleChange = function() {
    if (!state.robotSimInstance) return;
    const t1 = parseFloat(document.getElementById('theta1-slider').value);
    const t2 = parseFloat(document.getElementById('theta2-slider').value);
    const t3 = parseFloat(document.getElementById('theta3-slider').value);
    document.getElementById('theta1-val').textContent = `${t1}°`;
    document.getElementById('theta2-val').textContent = `${t2}°`;
    document.getElementById('theta3-val').textContent = `${t3}°`;
    state.robotSimInstance.setJointAngles(t1, t2, t3);
  };

  window.handleMorphChange = function(val) {
    if (!state.robotSimInstance) return;
    document.getElementById('morph-value-display').textContent = `${Math.round(val * 100)}%`;
    state.robotSimInstance.setMorphFactor(parseFloat(val));
  };

  window.setSimMode = function(mode) {
    if (!state.robotSimInstance) return;
    state.robotSimInstance.setControlMode(mode);
  };

  window.toggleSimEnvelope = function(show) {
    if (state.robotSimInstance) state.robotSimInstance.toggleEnvelope(show);
  };

  window.toggleSimFrames = function(show) {
    if (state.robotSimInstance) state.robotSimInstance.toggleFrames(show);
  };

  window.handleOptionSelect = function(qIdx, optIdx) {
    state.userQuizAnswers[qIdx] = optIdx;
    if (window.soundFx) window.soundFx.playClick();
    renderMainContent();
  };

  window.submitQuiz = function() {
    state.quizSubmitted = true;
    addXP(50);
    renderMainContent();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  window.resetQuiz = function() {
    state.quizSubmitted = false;
    state.userQuizAnswers = {};
    if (window.soundFx) window.soundFx.playClick();
    renderMainContent();
  };

  window.selectChapter = function(chKey) {
    state.currentChapterId = chKey;
    state.currentTab = 'notes';
    state.currentFlashcardIdx = 0;
    state.flashcardFlipped = false;
    if (window.soundFx) window.soundFx.playClick();
    renderChapterList(AASTU_COURSES.find(c => c.id === state.currentCourseId));
    renderMainContent();
  };

  // Keyboard navigation for Flashcards (Left, Right, Space)
  document.addEventListener('keydown', (e) => {
    if (state.currentTab === 'flashcards' && !document.getElementById('ai-tutor-drawer')?.classList.contains('opacity-100')) {
      const exam = AASTU_EXAMS[state.currentChapterId];
      if (!exam) return;
      const total = (exam.flashcards || exam.mcqs).length;
      if (e.code === 'Space') {
        e.preventDefault();
        window.toggleFlashcardFlip();
      } else if (e.code === 'ArrowRight') {
        window.nextFlashcard(total);
      } else if (e.code === 'ArrowLeft') {
        window.prevFlashcard(total);
      }
    }
  });

  // Upgraded Line-Aware Markdown Parser
  function formatMarkdown(text) {
    if (!text) return '';

    const blocks = [];
    let inCode = false;
    let codeLang = '';
    let codeLines = [];

    const lines = text.trim().split('\n');
    let currentParagraph = [];
    let currentList = [];
    let listType = null;
    let currentTable = [];

    function flushParagraph() {
      if (currentParagraph.length > 0) {
        const pText = currentParagraph.join(' ').trim();
        if (pText) {
          if (pText.startsWith('$$') && pText.endsWith('$$')) {
            blocks.push(`
              <div class="formula-card my-4 text-center">
                <span class="formula-tag">Key Formula</span>
                <div class="text-xs sm:text-sm overflow-x-auto py-1">${pText}</div>
              </div>
            `);
          } else if (pText.startsWith('> [!NOTE]') || pText.startsWith('> [!TIP]') || pText.startsWith('> **') || pText.includes('### 🔬 Case Study:')) {
            const cleanP = pText.replace(/^>\s*(\[!.*?\])?\s*/gm, '');
            blocks.push(`
              <div class="callout callout-case-study my-4">
                <div class="font-bold text-[11px] uppercase tracking-wider text-purple-700 dark:text-purple-300 mb-1 flex items-center gap-1.5">
                  <span>🔬</span> High-Yield Concept / Case Study
                </div>
                <div class="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">${inlineFormat(cleanP)}</div>
              </div>
            `);
          } else {
            blocks.push(`<p class="my-3 leading-relaxed text-slate-600 dark:text-slate-300 text-xs sm:text-sm">${inlineFormat(pText)}</p>`);
          }
        }
        currentParagraph = [];
      }
    }

    function flushList() {
      if (currentList.length > 0) {
        if (listType === 'ul') {
          blocks.push(`<ul class="list-disc pl-5 space-y-1.5 my-3 text-slate-600 dark:text-slate-300 text-xs sm:text-sm">${currentList.map(li => `<li>${inlineFormat(li)}</li>`).join('')}</ul>`);
        } else if (listType === 'ol') {
          blocks.push(`<ol class="list-decimal pl-5 space-y-1.5 my-3 text-slate-600 dark:text-slate-300 text-xs sm:text-sm">${currentList.map(li => `<li>${inlineFormat(li)}</li>`).join('')}</ol>`);
        }
        currentList = [];
        listType = null;
      }
    }

    function flushTable() {
      if (currentTable.length >= 2) {
        const headers = currentTable[0].split('|').filter(c => c.trim()).map(c => inlineFormat(c.trim()));
        const rows = currentTable.slice(2).map(l => l.split('|').filter(c => c.trim()).map(c => inlineFormat(c.trim())));
        blocks.push(`
          <div class="overflow-x-auto my-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xs">
            <table class="min-w-full divide-y divide-slate-200 dark:divide-slate-800 text-xs sm:text-sm">
              <thead class="bg-slate-50 dark:bg-slate-800/80">
                <tr>
                  ${headers.map(h => `<th class="px-4 py-2.5 text-left font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider text-[11px]">${h}</th>`).join('')}
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-100 dark:divide-slate-800/60 bg-white dark:bg-slate-900">
                ${rows.map(r => `
                  <tr class="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                    ${r.map(c => `<td class="px-4 py-2.5 text-slate-600 dark:text-slate-300">${c}</td>`).join('')}
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        `);
      }
      currentTable = [];
    }

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const trimmed = line.trim();

      // Code blocks
      if (trimmed.startsWith('```')) {
        flushParagraph();
        flushList();
        flushTable();
        if (!inCode) {
          inCode = true;
          codeLang = trimmed.replace('```', '').trim() || 'VHDL';
          codeLines = [];
        } else {
          inCode = false;
          blocks.push(`
            <pre class="code-block my-4">
              <div class="code-lang">${codeLang.toUpperCase()} SPECIFICATION</div>
              <code>${escapeHtml(codeLines.join('\n'))}</code>
            </pre>
          `);
        }
        continue;
      }

      if (inCode) {
        codeLines.push(line);
        continue;
      }

      // Empty line -> flush
      if (!trimmed) {
        flushParagraph();
        flushList();
        flushTable();
        continue;
      }

      // Tables
      if (trimmed.includes('|') && (trimmed.startsWith('|') || trimmed.endsWith('|') || trimmed.includes('---'))) {
        flushParagraph();
        flushList();
        currentTable.push(trimmed);
        continue;
      } else if (currentTable.length > 0) {
        flushTable();
      }

      // Headings
      if (trimmed.startsWith('### ')) {
        flushParagraph();
        flushList();
        blocks.push(`<h3 class="text-sm sm:text-base font-bold text-slate-900 dark:text-slate-100 mt-5 mb-2">${inlineFormat(trimmed.replace('### ', ''))}</h3>`);
        continue;
      }
      if (trimmed.startsWith('## ')) {
        flushParagraph();
        flushList();
        blocks.push(`<h2 class="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100 mt-6 mb-2.5 border-b border-slate-100 dark:border-slate-800 pb-1.5">${inlineFormat(trimmed.replace('## ', ''))}</h2>`);
        continue;
      }

      // Display Math on separate line
      if (trimmed.startsWith('$$') && trimmed.endsWith('$$')) {
        flushParagraph();
        flushList();
        blocks.push(`
          <div class="formula-card my-3.5 text-center">
            <span class="formula-tag">Key Formula</span>
            <div class="text-xs sm:text-sm overflow-x-auto py-1">${trimmed}</div>
          </div>
        `);
        continue;
      }

      // Unordered list item (- or *)
      if (/^[-*]\s+/.test(trimmed)) {
        flushParagraph();
        if (listType !== 'ul') flushList();
        listType = 'ul';
        currentList.push(trimmed.replace(/^[-*]\s+/, ''));
        continue;
      }

      // Ordered list item (1. )
      if (/^\d+\.\s+/.test(trimmed)) {
        flushParagraph();
        if (listType !== 'ol') flushList();
        listType = 'ol';
        currentList.push(trimmed.replace(/^\d+\.\s+/, ''));
        continue;
      }

      // Regular paragraph text
      if (currentList.length > 0) {
        flushList();
      }
      currentParagraph.push(trimmed);
    }

    flushParagraph();
    flushList();
    flushTable();

    return blocks.join('');
  }

  function inlineFormat(str) {
    if (!str) return '';
    return str
      .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-slate-900 dark:text-slate-100">$1</strong>')
      .replace(/(?<!\*)\*(?!\*)(.*?)(?<!\*)\*(?!\*)/g, '<em class="italic">$1</em>')
      .replace(/`([^`]+)`/g, '<code class="inline-code">$1</code>');
  }

  function escapeHtml(str) {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  // Global search input
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const q = e.target.value.toLowerCase().trim();
      if (!q) return;
      for (const course of AASTU_COURSES) {
        if (course.title.toLowerCase().includes(q) || course.code.toLowerCase().includes(q)) {
          selectCourse(course.id);
          break;
        }
      }
    });
  }

  // Initial Load: Start directly on VLSI Design (ECEg5405) Chapter 1
  selectCourse(state.currentCourseId);
});
