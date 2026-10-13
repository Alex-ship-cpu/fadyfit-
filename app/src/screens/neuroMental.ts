// Screen 4: Neuro-Psychology, Circadian Entrainment & Clinical Lab Workup (Tri-Lingual)
import { CIRCADIAN_SCHEDULE } from '../data/planData';
import { store } from '../data/store';
import { i18n } from '../i18n/translations';

export function renderNeuroMental(): string {
  const t = i18n.t();
  const state = store.getState();
  const journalEntries = state.mentalJournal;

  return `
    <div class="animate-in">
      <!-- Mental Health AI Hero -->
      <div class="card card-padded" style="border-top: 4px solid #8B5CF6;">
        <span class="text-overline" style="color: #8B5CF6;">${t.mentalTitle}</span>
        <h2 class="text-title-1" style="margin-top: 2px;">Si7a Nafsiya & Mind-Muscle</h2>
        <p class="text-caption text-secondary" style="margin-top: 4px;">
          ${t.mentalSubtitle}
        </p>
      </div>

      <!-- ACT Cognitive Defusion Interactive Lab -->
      <div class="section-label">${t.actLabTitle}</div>
      <div class="card card-padded">
        <h3 class="text-headline">${t.actLabTitle}</h3>
        <p class="text-caption text-secondary" style="margin-top: 2px;">
          ${t.actLabDesc}
        </p>

        <div style="margin-top: 12px;">
          <textarea 
            id="input-mental-thought" 
            class="input-field" 
            style="height: 80px; padding: 10px; font-size: 14px; font-weight: 500; resize: none;" 
            placeholder="${t.actPlaceholder}"
          ></textarea>
        </div>

        <button class="btn btn-primary mt-sm" id="btn-defuse-thought" style="background: #8B5CF6;">
          ${t.actBtn}
        </button>

        <div id="defusion-result-container" style="display: none; margin-top: 16px;"></div>
      </div>

      <!-- Historical Defusion Journal -->
      <div class="section-label">Journal ACT (${journalEntries.length})</div>
      <div class="card">
        ${journalEntries.map(entry => `
          <div style="padding: 14px 16px; border-bottom: 1px solid var(--divider);">
            <div class="flex items-center justify-between">
              <span class="badge" style="background: #F3E8FF; color: #7E22CE; font-size: 11px;">
                ${entry.cognitiveStrategy}
              </span>
              <span class="text-caption text-muted">${entry.timestamp}</span>
            </div>
            <p class="text-body text-secondary mt-sm" style="font-size: 14px; font-weight: 500;">
              "${entry.thoughtSnippet}"
            </p>
            <div class="text-caption mt-sm" style="color: var(--success); font-weight: 600;">
              ✓ Signal déconstruit — Zéro fusion cognitive
            </div>
          </div>
        `).join('')}
      </div>

      <!-- Circadian Realignment Schedule -->
      <div class="section-label">${t.circadianTitle}</div>
      <div class="card">
        <div class="card-header">
          <p class="text-caption text-secondary">
            ${t.circadianDesc}
          </p>
        </div>
        <div style="padding: 0 var(--gap-lg) var(--gap-lg);">
          ${CIRCADIAN_SCHEDULE.map(c => `
            <div class="sleep-row">
              <div class="sleep-date">${c.startDate}</div>
              <div class="sleep-target">
                ${t.wakeTarget}: <strong>${c.wakeTarget}</strong> · Coucher: ${c.bedTarget}
              </div>
              <span class="badge badge-primary" style="font-size: 11px;">
                ${c.luxMinutes}m Lux
              </span>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Clinical Medical Checklist -->
      <div class="section-label">${t.medicalTitle}</div>
      <div class="card card-padded">
        <div class="info-box info-warning mb-md">
          <svg viewBox="0 0 24 24"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0zM12 9v4M12 17h.01"/></svg>
          <div>
            <strong>Visite Médicale Recommandée (Semaine 1–2)</strong>
            <p style="font-size: 12px; margin-top: 2px;">
              ${t.medicalDesc}
            </p>
          </div>
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px;">
          <div style="padding: 10px; background: var(--bg); border-radius: var(--radius-sm); font-size: 13px;">
            <strong>NFS / Emocromo</strong>
            <div class="text-caption text-muted">Contrôle anémie</div>
          </div>
          <div style="padding: 10px; background: var(--bg); border-radius: var(--radius-sm); font-size: 13px;">
            <strong>TSH (Tiroide)</strong>
            <div class="text-caption text-muted">Metabolismo basale</div>
          </div>
          <div style="padding: 10px; background: var(--bg); border-radius: var(--radius-sm); font-size: 13px;">
            <strong>Ferritina</strong>
            <div class="text-caption text-muted">Riserve di ferro</div>
          </div>
          <div style="padding: 10px; background: var(--bg); border-radius: var(--radius-sm); font-size: 13px;">
            <strong>Vitamina D3 & B12</strong>
            <div class="text-caption text-muted">Supporto immunitario</div>
          </div>
        </div>
      </div>
    </div>
  `;
}
