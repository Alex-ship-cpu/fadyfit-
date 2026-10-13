// Screen 2: Athletic Training Lab with Real-Time Set Logger & Kinesiology 1RM Analytics
import { WORKOUT_ROSTER, type WorkoutSession, type Exercise } from '../data/planData';
import { store } from '../data/store';
import { ApexNeuroEngine } from '../ai/neuroEngine';
import { KinesiologyEngine } from '../utils/kinesiology';
import { i18n } from '../i18n/translations';

export let activeDayId = 'lundi';

export function setActiveDayId(dayId: string) {
  activeDayId = dayId;
}

export function renderTraining(): string {
  const t = i18n.t();
  const session: WorkoutSession = WORKOUT_ROSTER.find(w => w.dayId === activeDayId) || WORKOUT_ROSTER[0];
  const today = new Date().toISOString().substring(0, 10);

  // Compute session total tonnage so far today
  const todaysSessionSets = store.getState().workoutLogs.filter(
    l => l.date === today && session.exercises.some(e => e.id === l.exerciseId)
  );
  const totalTonnageKg = KinesiologyEngine.calculateTonnage(todaysSessionSets);

  return `
    <div class="animate-in">
      <!-- Day Selector Bar -->
      <div class="day-selector">
        ${WORKOUT_ROSTER.map(w => `
          <button class="day-pill ${w.dayId === activeDayId ? 'active' : ''}" data-day="${w.dayId}">
            ${w.dayName}
          </button>
        `).join('')}
      </div>

      <!-- Session Title Card with Live Tonnage Counter -->
      <div class="card card-padded mt-sm" style="border-left: 4px solid var(--primary-light);">
        <div class="flex items-center justify-between">
          <span class="badge badge-primary">${session.dayName} · 17:30 - 19:00</span>
          <span class="badge badge-energy" id="session-tonnage-badge">
            ${t.calcTonnage}: ${totalTonnageKg.toLocaleString()} kg
          </span>
        </div>
        <h2 class="text-title-2 mt-sm">${session.focus}</h2>
        <p class="text-caption text-secondary" style="margin-top: 4px;">
          RIR / RPE Target: 1-2 reps in reserve. Isolation to true failure.
        </p>
      </div>

      <!-- Warmup Checklist Accordion -->
      <div class="card mt-md">
        <div class="card-header flex items-center justify-between" style="padding-bottom: var(--gap-sm);">
          <span class="text-overline" style="color: var(--accent-energy);">${t.warmupProtocol}</span>
        </div>
        <div class="card-body">
          <ul style="list-style: none; padding-left: 0;">
            ${session.warmupProtocol.map(item => `
              <li class="text-body text-secondary" style="font-size: 13px; padding: 4px 0; display: flex; align-items: center; gap: 8px;">
                <span style="width: 6px; height: 6px; border-radius: 50%; background: var(--accent-energy);"></span>
                ${item}
              </li>
            `).join('')}
          </ul>
        </div>
      </div>

      <!-- Exercises List -->
      <div class="section-label">${t.exercisesTitle} (${session.exercises.length})</div>
      <div class="exercise-roster">
        ${session.exercises.map((exercise, index) => renderExerciseBlock(exercise, index + 1, today, t)).join('')}
      </div>

      <!-- Post-Session Conditioning (If exists) -->
      ${session.postSession ? `
        <div class="card card-padded mt-lg" style="background: var(--accent-energy-pale); border-color: #FDBA74;">
          <div class="flex items-center gap-sm">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--accent-energy)" stroke-width="2"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
            <span class="text-headline" style="color: #9A3412;">Conditioning Football : ${session.postSession.type}</span>
          </div>
          <p class="text-body text-secondary mt-sm" style="font-size: 13px; color: #7C2D12;">
            ${session.postSession.protocol}
          </p>
        </div>
      ` : ''}
    </div>
  `;
}

function renderExerciseBlock(exercise: Exercise, exerciseNumber: number, today: string, t: any): string {
  const loggedSets = store.getSetsForExercise(today, exercise.id);
  const overload = ApexNeuroEngine.evaluateOverload(exercise.id);

  // Best set for 1RM estimate
  const bestSet = loggedSets.reduce((max, s) => (s.weightKg > max.weightKg ? s : max), { weightKg: 0, reps: 0 });
  const oneRM = bestSet.weightKg > 0 ? KinesiologyEngine.calculate1RM(bestSet.weightKg, bestSet.reps) : null;

  return `
    <div class="card mt-md" style="overflow: visible;">
      <div class="card-padded" style="border-bottom: 1px solid var(--divider);">
        <div class="flex items-start justify-between">
          <div class="flex items-start gap-md">
            <div class="exercise-num ${loggedSets.length >= exercise.sets ? 'done' : ''}">${exerciseNumber}</div>
            <div>
              <h3 class="exercise-name" style="font-size: 17px;">${exercise.name}</h3>
              <div class="exercise-detail">
                <span>${exercise.sets} ${t.series}</span>
                <span>${exercise.repsTarget}</span>
                <span>Repos: ${exercise.restSeconds}s</span>
              </div>
            </div>
          </div>
          <div style="text-align: right;">
            <span class="badge ${overload.status === 'INCREASE_WEIGHT' ? 'badge-success' : 'badge-primary'}">
              RPE ${exercise.rpeTarget}
            </span>
            ${oneRM ? `
              <div class="text-caption" style="color: var(--primary-light); font-weight: 700; margin-top: 4px;">
                1RM: ~${oneRM.estimated1RMKg} kg
              </div>
            ` : ''}
          </div>
        </div>

        <!-- Technique Cues -->
        <div style="background: var(--bg); border-radius: var(--radius-sm); padding: 8px 12px; margin-top: 10px;">
          <div class="text-caption" style="color: var(--text-secondary); font-weight: 600;">
            ${t.techniqueCue}
          </div>
          <p style="font-size: 13px; color: var(--text); margin-top: 2px;">
            ${exercise.techniqueDarija}
          </p>
        </div>

        <!-- AI Overload status -->
        <div class="text-caption mt-sm" style="color: ${overload.status === 'INCREASE_WEIGHT' ? 'var(--success)' : 'var(--text-secondary)'}; font-weight: 600;">
          ${overload.recommendationText}
        </div>
      </div>

      <!-- Set-by-Set Logging Rows -->
      <div class="set-log">
        <div style="display: flex; justify-content: space-between; font-size: 11px; font-weight: 700; color: var(--text-muted); text-transform: uppercase; margin-bottom: 6px; padding: 0 4px;">
          <span>${t.series}</span>
          <span style="flex: 1; text-align: center;">${t.weight}</span>
          <span style="flex: 1; text-align: center;">${t.reps}</span>
          <span style="width: 36px; text-align: center;">${t.validate}</span>
        </div>

        ${Array.from({ length: exercise.sets }).map((_, setIdx) => {
          const log = loggedSets.find(s => s.setIndex === setIdx);
          const weightVal = log ? log.weightKg : '';
          const repsVal = log ? log.reps : '';
          const isDone = log ? log.completed : false;

          return `
            <div class="set-row">
              <span class="set-label">S${setIdx + 1}</span>
              <div class="set-input" style="justify-content: center;">
                <input 
                  type="number" 
                  step="0.5" 
                  placeholder="kg" 
                  value="${weightVal}"
                  data-ex="${exercise.id}" 
                  data-set="${setIdx}" 
                  data-field="weight"
                  ${isDone ? 'disabled' : ''}
                />
              </div>
              <div class="set-input" style="justify-content: center;">
                <input 
                  type="number" 
                  placeholder="reps" 
                  value="${repsVal}"
                  data-ex="${exercise.id}" 
                  data-set="${setIdx}" 
                  data-field="reps"
                  ${isDone ? 'disabled' : ''}
                />
              </div>
              <button 
                class="set-check ${isDone ? 'checked' : ''}" 
                data-ex="${exercise.id}" 
                data-ex-name="${exercise.name}"
                data-set="${setIdx}" 
                data-rest="${exercise.restSeconds}"
                title="${t.validate}"
              >
                <svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>
              </button>
            </div>
          `;
        }).join('')}
      </div>
    </div>
  `;
}
