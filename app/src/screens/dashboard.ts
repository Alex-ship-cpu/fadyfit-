// Screen 1: Executive Athletic Dashboard (Tri-Lingual Enabled)
import { store } from '../data/store';
import { WORKOUT_ROSTER } from '../data/planData';
import { ApexNeuroEngine } from '../ai/neuroEngine';
import { i18n } from '../i18n/translations';

export function renderDashboard(): string {
  const t = i18n.t();
  const state = store.getState();
  const currentWeight = state.weightHistory[0]?.weightKg || 60.0;
  const startWeight = state.user.startWeightKg;
  const targetWeight = state.user.targetWeightKg;
  const weightGained = (currentWeight - startWeight).toFixed(1);
  const remaining = (targetWeight - currentWeight).toFixed(1);

  const readiness = ApexNeuroEngine.calculateDailyReadiness();
  const gastric = ApexNeuroEngine.computeGastricPrescription(currentWeight);

  const dayIndex = new Date().getDay();
  const dayIds = ['dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi'];
  const currentDayId = dayIds[dayIndex];
  const todayWorkout = WORKOUT_ROSTER.find(w => w.dayId === currentDayId) || WORKOUT_ROSTER[0];

  return `
    <div class="animate-in">
      <!-- Athlete Profile & Readiness Card -->
      <div class="card card-padded" style="border-top: 4px solid var(--primary-light);">
        <div class="flex items-center justify-between">
          <div>
            <span class="text-overline" style="color: var(--primary-light);">${t.athleteStatus}</span>
            <h2 class="text-title-1" style="margin-top: 2px;">Fady · 19 ${i18n.getLang() === 'it' ? 'anni' : i18n.getLang() === 'en' ? 'yo' : '3am'}</h2>
            <p class="text-caption text-secondary">${t.subTitle}</p>
          </div>
          <div class="progress-ring">
            <svg width="60" height="60">
              <circle class="pr-bg" cx="30" cy="30" r="24"></circle>
              <circle class="pr-fill" cx="30" cy="30" r="24" stroke="var(--primary-light)" stroke-dasharray="150" stroke-dashoffset="${150 - (150 * readiness.score) / 100}"></circle>
            </svg>
            <div class="pr-value" style="color: var(--primary);">${readiness.score}%</div>
          </div>
        </div>

        <div class="info-box info-tip mt-md">
          <svg viewBox="0 0 24 24"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
          <div>
            <strong style="font-size: 13px;">${t.readinessLabel} (${readiness.score}%)</strong>
            <p style="font-size: 12px; margin-top: 2px;">${t.readinessDesc}</p>
          </div>
        </div>
      </div>

      <!-- Weight & Trajectory Metrics -->
      <div class="section-label">${t.trajectoryTitle}</div>
      <div class="metrics-grid">
        <div class="metric-card">
          <div class="metric-label">${t.currentWeight}</div>
          <div class="metric-value">${currentWeight.toFixed(1)} <span class="unit">kg</span></div>
          <div class="metric-sub metric-trend-up">Start: ${startWeight} kg (${weightGained >= '0' ? '+' : ''}${weightGained} kg)</div>
        </div>

        <div class="metric-card">
          <div class="metric-label">${t.targetWeight}</div>
          <div class="metric-value">${targetWeight.toFixed(0)} <span class="unit">kg</span></div>
          <div class="metric-sub" style="color: var(--text-secondary);">${t.remainingKg}: ${remaining} kg</div>
        </div>

        <div class="metric-card wide">
          <div class="flex items-center justify-between">
            <div>
              <div class="metric-label">${t.metabolicPhase}</div>
              <div style="font-size: 16px; font-weight: 700; color: var(--text);">${gastric.intervention}</div>
              <div class="text-caption text-secondary" style="margin-top: 4px;">${t.targetKcal}: ~${gastric.currentPhaseKcal} kcal</div>
            </div>
            <button class="btn btn-secondary btn-sm" id="btn-quick-log-weight" style="width: auto;">
              ${t.logWeightBtn}
            </button>
          </div>
        </div>
      </div>

      <!-- Today's Workout Card -->
      <div class="section-label">${t.todayWorkout}</div>
      <div class="workout-card">
        <div class="wc-day">${todayWorkout.dayName} · 17:30 - 19:00</div>
        <div class="wc-title">${todayWorkout.focus}</div>
        <div class="wc-meta">
          <span>
            <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
            ${todayWorkout.durationMin} min
          </span>
          <span>
            <svg viewBox="0 0 24 24"><path d="M6 4v16M18 4v16M2 8h4M18 8h4M2 16h4M18 16h4"/></svg>
            ${todayWorkout.exercises.length} ${t.exercisesTitle}
          </span>
        </div>
        <button class="btn btn-primary mt-lg" id="btn-jump-workout" style="background: white; color: var(--primary);">
          ${t.startSessionBtn}
        </button>
      </div>

      <!-- Psychological & Circadian Guardrails -->
      <div class="section-label">AI Health & Neuro-Guardrails</div>
      <div class="card card-padded">
        <div class="flex items-center gap-md">
          <div style="width: 38px; height: 38px; border-radius: 50%; background: var(--success-pale); display: flex; align-items: center; justify-content: center; color: var(--success);">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
          </div>
          <div style="flex: 1;">
            <div class="text-headline">${t.psychAlertTitle}</div>
            <div class="text-caption text-secondary">${t.psychAlertDesc}</div>
          </div>
        </div>

        <div style="margin-top: 14px; padding-top: 12px; border-top: 1px solid var(--divider);">
          <div class="text-callout" style="font-weight: 600; color: var(--primary-light);">
            ${t.dailyDirectiveTitle}
          </div>
          <p class="text-body text-secondary" style="font-size: 13px; margin-top: 4px;">
            ${t.dailyDirectiveText}
          </p>
        </div>
      </div>
    </div>
  `;
}
