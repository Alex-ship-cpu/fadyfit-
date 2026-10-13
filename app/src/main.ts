// FadyFit Apex — Main Controller & Application Orchestrator (Tri-Lingual & High-Performance)
// Optimized for iPhone 17 Pro Max Athletic Display

import './style.css';
import { store } from './data/store';
import { renderDashboard } from './screens/dashboard';
import { renderTraining, setActiveDayId } from './screens/training';
import { renderNutrition } from './screens/nutrition';
import { renderNeuroMental } from './screens/neuroMental';
import { renderAnalytics } from './screens/analytics';
import { ApexNeuroEngine } from './ai/neuroEngine';
import { audioHaptics } from './utils/audioHaptics';
import { i18n, type Language } from './i18n/translations';
import { DataExporter } from './utils/exportData';

type TabKey = 'dashboard' | 'training' | 'nutrition' | 'neuroMental' | 'analytics';

let currentTab: TabKey = 'dashboard';
let timerInterval: number | null = null;
let timerSecondsRemaining = 0;
let timerTotalSeconds = 0;

function initApp() {
  const appEl = document.getElementById('app');
  if (!appEl) return;

  const t = i18n.t();
  const currentLang = i18n.getLang();

  appEl.innerHTML = `
    <!-- Top Header Bar with Language Switcher -->
    <header class="app-header">
      <div class="flex items-center justify-between">
        <div>
          <span class="text-overline" style="color: var(--primary-light);">Elite Athletic Engine</span>
          <h1 id="header-title">${t.navOverview}</h1>
        </div>
        <div style="display: flex; flex-direction: column; align-items: flex-end; gap: 4px;">
          <!-- Tri-Lingual Switcher -->
          <div style="display: flex; background: var(--bg); border: 1px solid var(--border); border-radius: var(--radius-full); padding: 2px;">
            <button class="lang-btn ${currentLang === 'da' ? 'active' : ''}" data-lang="da" style="border: none; background: none; font-size: 11px; font-weight: 700; padding: 2px 7px; border-radius: 999px; cursor: pointer;">DA</button>
            <button class="lang-btn ${currentLang === 'it' ? 'active' : ''}" data-lang="it" style="border: none; background: none; font-size: 11px; font-weight: 700; padding: 2px 7px; border-radius: 999px; cursor: pointer;">IT</button>
            <button class="lang-btn ${currentLang === 'en' ? 'active' : ''}" data-lang="en" style="border: none; background: none; font-size: 11px; font-weight: 700; padding: 2px 7px; border-radius: 999px; cursor: pointer;">EN</button>
          </div>
          <div class="text-caption text-muted" id="header-date">13 Octobre 2026</div>
        </div>
      </div>
    </header>

    <!-- Main Screen Content Scroll Container -->
    <main id="screen-container" class="screen-content"></main>

    <!-- Bottom Tab Navigation -->
    <nav class="tab-bar">
      <button class="tab-item active" data-tab="dashboard">
        <svg viewBox="0 0 24 24"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
        <span class="tab-label">${t.navOverview}</span>
      </button>

      <button class="tab-item" data-tab="training">
        <svg viewBox="0 0 24 24"><path d="M6 4v16M18 4v16M2 8h4M18 8h4M2 16h4M18 16h4"/></svg>
        <span class="tab-label">${t.navWorkouts}</span>
      </button>

      <button class="tab-item" data-tab="nutrition">
        <svg viewBox="0 0 24 24"><path d="M18 8h1a4 4 0 0 1 0 8h-1"/><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/><line x1="6" y1="1" x2="6" y2="4"/><line x1="10" y1="1" x2="10" y2="4"/><line x1="14" y1="1" x2="14" y2="4"/></svg>
        <span class="tab-label">${t.navNutrition}</span>
      </button>

      <button class="tab-item" data-tab="neuroMental">
        <svg viewBox="0 0 24 24"><path d="M12 2a9 9 0 0 0-9 9c0 3.6 2.1 6.7 5.2 8.1v1.9c0 .6.4 1 1 1h5.6c.6 0 1-.4 1-1v-1.9c3.1-1.4 5.2-4.5 5.2-8.1a9 9 0 0 0-9-9z"/><path d="M9 18h6"/><path d="M10 22h4"/></svg>
        <span class="tab-label">${t.navPsyche}</span>
      </button>

      <button class="tab-item" data-tab="analytics">
        <svg viewBox="0 0 24 24"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>
        <span class="tab-label">${t.navAnalytics}</span>
      </button>
    </nav>

    <!-- Modals Host -->
    <div id="modal-container"></div>
  `;

  setupTabListeners();
  setupLanguageSwitcher();
  renderCurrentScreen();

  // Reactive store subscription
  store.subscribe(() => {
    renderCurrentScreen();
  });

  // Reactive i18n subscription
  i18n.subscribe(() => {
    updateLanguageUI();
    renderCurrentScreen();
  });
}

function setupLanguageSwitcher() {
  const langBtns = document.querySelectorAll<HTMLButtonElement>('.lang-btn');
  langBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const l = btn.getAttribute('data-lang') as Language;
      if (l) {
        i18n.setLang(l);
        audioHaptics.playTick();
      }
    });
  });
}

function updateLanguageUI() {
  const t = i18n.t();
  const currentLang = i18n.getLang();

  // Update lang buttons
  document.querySelectorAll<HTMLButtonElement>('.lang-btn').forEach(b => {
    const isActive = b.getAttribute('data-lang') === currentLang;
    b.classList.toggle('active', isActive);
    b.style.background = isActive ? 'var(--primary)' : 'none';
    b.style.color = isActive ? 'white' : 'var(--text-secondary)';
  });

  // Update tab labels
  const tabLabels = document.querySelectorAll('.tab-label');
  if (tabLabels[0]) tabLabels[0].textContent = t.navOverview;
  if (tabLabels[1]) tabLabels[1].textContent = t.navWorkouts;
  if (tabLabels[2]) tabLabels[2].textContent = t.navNutrition;
  if (tabLabels[3]) tabLabels[3].textContent = t.navPsyche;
  if (tabLabels[4]) tabLabels[4].textContent = t.navAnalytics;

  updateHeaderTitle(currentTab);
}

function setupTabListeners() {
  const tabs = document.querySelectorAll<HTMLButtonElement>('.tab-item');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.getAttribute('data-tab') as TabKey;
      if (!target || target === currentTab) return;

      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      currentTab = target;
      updateHeaderTitle(target);
      renderCurrentScreen();
      audioHaptics.playTick();
    });
  });
}

function updateHeaderTitle(tab: TabKey) {
  const titleEl = document.getElementById('header-title');
  if (!titleEl) return;
  const t = i18n.t();

  switch (tab) {
    case 'dashboard':
      titleEl.innerText = t.navOverview;
      break;
    case 'training':
      titleEl.innerText = t.navWorkouts;
      break;
    case 'nutrition':
      titleEl.innerText = t.navNutrition;
      break;
    case 'neuroMental':
      titleEl.innerText = t.navPsyche;
      break;
    case 'analytics':
      titleEl.innerText = t.navAnalytics;
      break;
  }
}

function renderCurrentScreen() {
  const container = document.getElementById('screen-container');
  if (!container) return;

  switch (currentTab) {
    case 'dashboard':
      container.innerHTML = renderDashboard();
      attachDashboardEvents();
      break;
    case 'training':
      container.innerHTML = renderTraining();
      attachTrainingEvents();
      break;
    case 'nutrition':
      container.innerHTML = renderNutrition();
      attachNutritionEvents();
      break;
    case 'neuroMental':
      container.innerHTML = renderNeuroMental();
      attachNeuroMentalEvents();
      break;
    case 'analytics':
      container.innerHTML = renderAnalytics();
      attachAnalyticsEvents();
      break;
  }
}

// 1. Dashboard Events
function attachDashboardEvents() {
  const btnWeight = document.getElementById('btn-quick-log-weight');
  if (btnWeight) {
    btnWeight.addEventListener('click', () => {
      openWeightModal();
    });
  }

  const btnJumpWorkout = document.getElementById('btn-jump-workout');
  if (btnJumpWorkout) {
    btnJumpWorkout.addEventListener('click', () => {
      currentTab = 'training';
      document.querySelectorAll('.tab-item').forEach(t => {
        t.classList.toggle('active', t.getAttribute('data-tab') === 'training');
      });
      updateHeaderTitle('training');
      renderCurrentScreen();
    });
  }
}

// 2. Training Events (Sets & Rest Timer)
function attachTrainingEvents() {
  const dayPills = document.querySelectorAll<HTMLButtonElement>('.day-pill');
  dayPills.forEach(pill => {
    pill.addEventListener('click', () => {
      const day = pill.getAttribute('data-day');
      if (day) {
        setActiveDayId(day);
        renderCurrentScreen();
        audioHaptics.playTick();
      }
    });
  });

  const setChecks = document.querySelectorAll<HTMLButtonElement>('.set-check');
  setChecks.forEach(btn => {
    btn.addEventListener('click', () => {
      const exId = btn.getAttribute('data-ex');
      const exName = btn.getAttribute('data-ex-name') || 'Mouvement';
      const setIdx = parseInt(btn.getAttribute('data-set') || '0', 10);
      const restSec = parseInt(btn.getAttribute('data-rest') || '90', 10);

      const row = btn.closest('.set-row');
      const weightInput = row?.querySelector<HTMLInputElement>('input[data-field="weight"]');
      const repsInput = row?.querySelector<HTMLInputElement>('input[data-field="reps"]');

      const weightKg = parseFloat(weightInput?.value || '0');
      const reps = parseInt(repsInput?.value || '0', 10);

      if (weightKg <= 0 || reps <= 0) {
        alert('Remplis le poids et les répétitions d\'abord.');
        return;
      }

      const today = new Date().toISOString().substring(0, 10);

      store.logSet({
        id: `${today}_${exId}_${setIdx}`,
        date: today,
        exerciseId: exId || '',
        setIndex: setIdx,
        weightKg,
        reps,
        completed: true
      });

      audioHaptics.playChime(true);
      openRestTimer(exName, restSec);
    });
  });
}

// 3. Nutrition Events
function attachNutritionEvents() {
  const suppChecks = document.querySelectorAll<HTMLButtonElement>('.supp-check');
  suppChecks.forEach(btn => {
    btn.addEventListener('click', () => {
      const suppId = btn.getAttribute('data-supp-id');
      if (!suppId) return;

      const today = new Date().toISOString().substring(0, 10);
      const isTaken = store.toggleSupplement(today, suppId);
      audioHaptics.playChime(isTaken);
      renderCurrentScreen();
    });
  });
}

// 4. Neuro-Mental Events (ACT Defusion Lab)
function attachNeuroMentalEvents() {
  const btnDefuse = document.getElementById('btn-defuse-thought');
  const inputEl = document.getElementById('input-mental-thought') as HTMLTextAreaElement;
  const resultBox = document.getElementById('defusion-result-container');

  if (btnDefuse && inputEl && resultBox) {
    btnDefuse.addEventListener('click', () => {
      const text = inputEl.value.trim();
      if (!text) {
        alert('Kteb l-fikra li katfkr fiha d-daba.');
        return;
      }

      const defusion = ApexNeuroEngine.defuseIntrusiveThought(text);
      store.addMentalEntry(text, 'ACT_Defusion');

      resultBox.style.display = 'block';
      resultBox.innerHTML = `
        <div class="card card-padded" style="background: #FAF5FF; border-color: #D8B4FE;">
          <div class="flex items-center gap-sm">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#7E22CE" stroke-width="2"><path d="M12 2a9 9 0 0 0-9 9c0 3.6 2.1 6.7 5.2 8.1v1.9c0 .6.4 1 1 1h5.6c.6 0 1-.4 1-1v-1.9c3.1-1.4 5.2-4.5 5.2-8.1a9 9 0 0 0-9-9z"/></svg>
            <strong style="color: #6B21A8; font-size: 14px;">Diagnostic AI: ${defusion.clinicalInsight}</strong>
          </div>

          <div style="background: white; border-radius: var(--radius-sm); padding: 12px; margin-top: 10px; border: 1px solid #E9D5FF;">
            <div style="font-weight: 700; font-size: 13px; color: #7E22CE; margin-bottom: 4px;">
              🧠 Tahlil ACT (Acceptance & Commitment) :
            </div>
            <p style="font-size: 14px; color: #1E293B; line-height: 1.5;">
              ${defusion.actDefusionExerciseDarija}
            </p>
          </div>

          <div style="margin-top: 10px; font-size: 12px; color: #6B21A8; font-weight: 600;">
            🧘 Action Somatique : ${defusion.somaticGuideline}
          </div>
        </div>
      `;

      inputEl.value = '';
      audioHaptics.playChime(true);
    });
  }
}

// 5. Analytics Events (Export JSON / CSV)
function attachAnalyticsEvents() {
  document.getElementById('btn-export-json')?.addEventListener('click', () => {
    DataExporter.exportJSON();
    audioHaptics.playChime(true);
  });

  document.getElementById('btn-export-csv')?.addEventListener('click', () => {
    DataExporter.exportCSV();
    audioHaptics.playChime(true);
  });
}

// Rest Timer Overlay Logic
function openRestTimer(exerciseName: string, durationSeconds: number) {
  const modalContainer = document.getElementById('modal-container');
  if (!modalContainer) return;

  const t = i18n.t();
  timerSecondsRemaining = durationSeconds;
  timerTotalSeconds = durationSeconds;

  modalContainer.innerHTML = `
    <div class="timer-overlay" id="timer-modal">
      <div style="text-align: center; color: white;">
        <span class="text-overline" style="opacity: 0.8; letter-spacing: 2px;">${t.restTitle}</span>
        <h2 style="font-size: 22px; font-weight: 700; margin-top: 4px;">${exerciseName}</h2>
      </div>

      <div class="timer-ring">
        <svg viewBox="0 0 220 220">
          <circle class="ring-bg" cx="110" cy="110" r="95"></circle>
          <circle id="timer-svg-circle" class="ring-progress" cx="110" cy="110" r="95" stroke-dasharray="597" stroke-dashoffset="0"></circle>
        </svg>
        <div class="timer-time">
          <span class="time-value" id="timer-display">${formatTime(timerSecondsRemaining)}</span>
          <span class="time-label">${t.atpRecovery}</span>
        </div>
      </div>

      <div class="timer-actions">
        <button class="timer-btn timer-btn-ghost" id="btn-timer-add30">${t.add30s}</button>
        <button class="timer-btn timer-btn-primary" id="btn-timer-skip">${t.skipRest}</button>
      </div>
    </div>
  `;

  if (timerInterval) clearInterval(timerInterval);

  timerInterval = window.setInterval(() => {
    timerSecondsRemaining--;

    const displayEl = document.getElementById('timer-display');
    const circleEl = document.getElementById('timer-svg-circle');

    if (displayEl) displayEl.innerText = formatTime(timerSecondsRemaining);

    if (circleEl) {
      const progress = 1 - timerSecondsRemaining / timerTotalSeconds;
      const offset = 597 * progress;
      circleEl.style.strokeDashoffset = String(offset);
    }

    if (timerSecondsRemaining <= 0) {
      if (timerInterval) clearInterval(timerInterval);
      audioHaptics.playChime(true);
      closeRestTimer();
    }
  }, 1000);

  document.getElementById('btn-timer-add30')?.addEventListener('click', () => {
    timerSecondsRemaining += 30;
    timerTotalSeconds += 30;
    audioHaptics.playTick();
  });

  document.getElementById('btn-timer-skip')?.addEventListener('click', () => {
    closeRestTimer();
  });
}

function closeRestTimer() {
  if (timerInterval) clearInterval(timerInterval);
  const timerModal = document.getElementById('timer-modal');
  if (timerModal) timerModal.remove();
}

function formatTime(sec: number): string {
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `${m}:${s < 10 ? '0' : ''}${s}`;
}

// Weight Logger Modal
function openWeightModal() {
  const modalContainer = document.getElementById('modal-container');
  if (!modalContainer) return;

  const currentWeight = store.getState().weightHistory[0]?.weightKg || 60.0;
  const t = i18n.t();

  modalContainer.innerHTML = `
    <div class="modal-overlay" id="weight-modal">
      <div class="modal-sheet">
        <div class="modal-handle"></div>
        <h3 class="modal-title">${t.logWeightBtn} (Bio-Métrique)</h3>
        <p class="text-caption text-secondary" style="margin-top: -12px; margin-bottom: 16px;">
          Pesée à jeun après les toilettes. Base de calcul de l'algorithme d'hypertrophie.
        </p>

        <div style="display: flex; gap: 8px; align-items: center; margin-bottom: 16px;">
          <input type="number" step="0.1" id="input-weight-val" class="input-field" value="${currentWeight}" style="flex: 1; font-size: 24px; font-weight: 800; text-align: center;" />
          <span style="font-size: 20px; font-weight: 700; color: var(--text-secondary);">kg</span>
        </div>

        <div style="margin-bottom: 16px;">
          <label class="text-caption" style="font-weight: 600; color: var(--text-secondary); display: block; margin-bottom: 6px;">Tolérance Gastrique / Appétit :</label>
          <select id="select-appetite" class="input-field" style="font-size: 14px; height: 46px;">
            <option value="normal">Normal (Bonne assimilation)</option>
            <option value="satiated">Saturé à 80% (Respect du protocole)</option>
            <option value="nausea_avoided">Nausée / Appétit faible (Activer Anti-Émétique)</option>
          </select>
        </div>

        <button class="btn btn-primary" id="btn-save-weight">${t.validate}</button>
        <button class="btn btn-outline mt-sm" id="btn-cancel-weight">Annuler</button>
      </div>
    </div>
  `;

  document.getElementById('btn-cancel-weight')?.addEventListener('click', () => {
    document.getElementById('weight-modal')?.remove();
  });

  document.getElementById('btn-save-weight')?.addEventListener('click', () => {
    const valInput = document.getElementById('input-weight-val') as HTMLInputElement;
    const appetiteSelect = document.getElementById('select-appetite') as HTMLSelectElement;

    const kg = parseFloat(valInput?.value || '0');
    if (kg < 40 || kg > 120) {
      alert('Veuillez entrer un poids valide.');
      return;
    }

    const today = new Date().toISOString().substring(0, 10);
    store.logWeight({
      date: today,
      weightKg: kg,
      appetiteState: appetiteSelect?.value as any || 'normal',
      notes: 'Pesée enregistrée via le terminal mobile'
    });

    audioHaptics.playChime(true);
    document.getElementById('weight-modal')?.remove();
  });
}

window.addEventListener('DOMContentLoaded', () => {
  initApp();

  // Register Offline Service Worker for 24/7 Gym usage without PC
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js').catch((err) => {
      console.warn('Service Worker registration skipped:', err);
    });
  }
});
