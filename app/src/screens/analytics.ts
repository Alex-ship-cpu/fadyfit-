// Screen 5: Mass Trajectory Analytics & Weekly Bilan Engine (Tri-Lingual with Data Exporter)
import { store } from '../data/store';
import { PROGRESSION_TRAJECTORY } from '../data/planData';
import { i18n } from '../i18n/translations';

export function renderAnalytics(): string {
  const t = i18n.t();
  const state = store.getState();
  const history = state.weightHistory;

  // Render SVG Line Chart
  const svgChart = generateWeightSvgChart(history);

  return `
    <div class="animate-in">
      <!-- Trajectory Overview -->
      <div class="card card-padded" style="border-top: 4px solid var(--success);">
        <div class="flex items-center justify-between">
          <div>
            <span class="text-overline" style="color: var(--success);">${t.trajectoryTitle}</span>
            <h2 class="text-title-1" style="margin-top: 2px;">60 → 70 kg</h2>
            <p class="text-caption text-secondary">${t.trajectoryDesc}</p>
          </div>
          <span class="badge badge-success">+10 kg Target</span>
        </div>

        <!-- Interactive SVG Chart -->
        <div style="margin-top: 16px;">
          ${svgChart}
        </div>
      </div>

      <!-- Export Data Action Bar -->
      <div class="card card-padded mt-md" style="background: var(--primary-pale); border-color: var(--primary-surface);">
        <div class="flex items-center justify-between">
          <div>
            <h3 class="text-headline" style="color: var(--primary);">${t.exportDataBtn}</h3>
            <p class="text-caption text-secondary">Export pour le préparateur physique ou le médecin</p>
          </div>
          <div class="flex gap-sm">
            <button class="btn btn-primary btn-sm" id="btn-export-json" style="width: auto;">
              JSON
            </button>
            <button class="btn btn-secondary btn-sm" id="btn-export-csv" style="width: auto; background: white;">
              CSV
            </button>
          </div>
        </div>
      </div>

      <!-- Weekly Decision Bilan Table -->
      <div class="section-label">${t.weeklyBilanTitle}</div>
      <div class="card">
        <table class="data-table">
          <thead>
            <tr>
              <th>Semaine</th>
              <th>Dates</th>
              <th>Cible</th>
              <th>Phase Athlétique</th>
            </tr>
          </thead>
          <tbody>
            ${PROGRESSION_TRAJECTORY.map(target => {
              const isCurrent = target.week === 1;
              return `
                <tr class="${isCurrent ? 'row-highlight' : ''}">
                  <td><strong>S${target.week}</strong></td>
                  <td>${target.dates}</td>
                  <td><strong>${target.targetWeightKg} kg</strong></td>
                  <td>
                    <div style="font-size: 13px;">${target.phase}</div>
                    <div class="text-caption text-muted">${target.focusNote}</div>
                  </td>
                </tr>
              `;
            }).join('')}
          </tbody>
        </table>
      </div>

      <!-- Algorithmic Decision Tree Protocol -->
      <div class="section-label">${t.decisionTreeTitle}</div>
      <div class="card card-padded">
        <div style="display: flex; flex-direction: column; gap: 12px;">
          <div style="display: flex; align-items: flex-start; gap: 10px;">
            <div style="width: 24px; height: 24px; border-radius: 50%; background: var(--danger-pale); color: var(--danger); font-weight: 700; font-size: 12px; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">1</div>
            <div>
              <strong style="font-size: 14px;">Sous la cible hebdomadaire :</strong>
              <p class="text-caption text-secondary">Ajouter 1 booster calorique dans l'ordre (+500 kcal gainer à 11h, puis huile d'olive +240 kcal).</p>
            </div>
          </div>

          <div style="display: flex; align-items: flex-start; gap: 10px;">
            <div style="width: 24px; height: 24px; border-radius: 50%; background: var(--success-pale); color: var(--success); font-weight: 700; font-size: 12px; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">2</div>
            <div>
              <strong style="font-size: 14px;">Égale ou au-dessus de la cible :</strong>
              <p class="text-caption text-secondary">Maintenir le protocole sans altération. La surcompensation se déroule parfaitement.</p>
            </div>
          </div>

          <div style="display: flex; align-items: flex-start; gap: 10px;">
            <div style="width: 24px; height: 24px; border-radius: 50%; background: var(--warning-pale); color: var(--warning); font-weight: 700; font-size: 12px; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">3</div>
            <div>
              <strong style="font-size: 14px;">Survenue de nausées ou brûlures :</strong>
              <p class="text-caption text-secondary">Zéro augmentation calorique. Shakes froids fractionnés et consultation médicale.</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Morphological Photo Milestones -->
      <div class="section-label">${t.photosTitle}</div>
      <div class="card card-padded">
        <div class="flex justify-between items-center" style="padding: 6px 0; border-bottom: 1px solid var(--divider);">
          <span style="font-size: 14px; font-weight: 600;">1. Départ (13 Octobre 2026)</span>
          <span class="badge badge-success">Verrouillé (60 kg)</span>
        </div>
        <div class="flex justify-between items-center" style="padding: 6px 0; border-bottom: 1px solid var(--divider);">
          <span style="font-size: 14px; font-weight: 600;">2. Mi-Parcours (09 Novembre 2026)</span>
          <span class="badge badge-primary">À Venir (~65 kg)</span>
        </div>
        <div class="flex justify-between items-center" style="padding: 6px 0;">
          <span style="font-size: 14px; font-weight: 600;">3. Objectif Atteint (07 Décembre 2026)</span>
          <span class="badge badge-primary">Final (~70 kg)</span>
        </div>
      </div>
    </div>
  `;
}

function generateWeightSvgChart(history: any[]): string {
  const width = 340;
  const height = 150;
  const padding = 25;

  const minKg = 59;
  const maxKg = 71;

  const targetPoints = PROGRESSION_TRAJECTORY.map((t, idx) => {
    const x = padding + (idx / (PROGRESSION_TRAJECTORY.length - 1)) * (width - 2 * padding);
    const y = height - padding - ((t.targetWeightKg - minKg) / (maxKg - minKg)) * (height - 2 * padding);
    return `${x},${y}`;
  }).join(' ');

  const currentKg = history[0]?.weightKg || 60;
  const curX = padding;
  const curY = height - padding - ((currentKg - minKg) / (maxKg - minKg)) * (height - 2 * padding);

  return `
    <div style="background: var(--bg); border-radius: var(--radius-md); padding: 10px;">
      <svg viewBox="0 0 ${width} ${height}" style="width: 100%; height: auto; display: block;">
        <defs>
          <linearGradient id="chartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#059669" stop-opacity="0.3"/>
            <stop offset="100%" stop-color="#059669" stop-opacity="0.0"/>
          </linearGradient>
        </defs>

        <line x1="${padding}" y1="${height - padding}" x2="${width - padding}" y2="${height - padding}" stroke="#E2E8F0" stroke-width="1"/>
        <line x1="${padding}" y1="${padding}" x2="${width - padding}" y2="${padding}" stroke="#E2E8F0" stroke-width="1" stroke-dasharray="4"/>

        <polyline points="${targetPoints}" fill="none" stroke="#059669" stroke-width="2.5" stroke-dasharray="5 3"/>

        <circle cx="${curX}" cy="${curY}" r="5" fill="#1E3A5F" stroke="white" stroke-width="2"/>
        <circle cx="${width - padding}" cy="${padding + 5}" r="6" fill="#059669" stroke="white" stroke-width="2"/>

        <text x="${padding}" y="${height - 8}" font-size="10" fill="#64748B" font-weight="600">60 kg (Départ)</text>
        <text x="${width - padding - 45}" y="${padding - 5}" font-size="10" fill="#059669" font-weight="700">70 kg (Cible)</text>
      </svg>
    </div>
  `;
}
