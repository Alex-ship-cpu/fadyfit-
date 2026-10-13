// Screen 3: Metabolic Nutrition, Osmotic Pacing & Italian Catalog (Tri-Lingual)
import { NUTRITION_PLAN, SUPPLEMENTS_ROSTER, ITALIAN_SUPERMARKET_CATALOG } from '../data/planData';
import { store } from '../data/store';
import { i18n } from '../i18n/translations';

export function renderNutrition(): string {
  const t = i18n.t();
  const today = new Date().toISOString().substring(0, 10);
  const totalKcal = NUTRITION_PLAN.reduce((acc, m) => acc + m.kcal, 0);
  const totalProt = NUTRITION_PLAN.reduce((acc, m) => acc + m.proteinG, 0);

  return `
    <div class="animate-in">
      <!-- Nutrition Executive Header -->
      <div class="card card-padded" style="border-top: 4px solid var(--accent-energy);">
        <div class="flex items-center justify-between">
          <div>
            <span class="text-overline" style="color: var(--accent-energy);">${t.nutritionTitle}</span>
            <h2 class="text-title-1" style="margin-top: 2px;">~${totalKcal} <span style="font-size: 18px; font-weight: 600; color: var(--text-secondary);">kcal / ${i18n.getLang() === 'it' ? 'giorno' : i18n.getLang() === 'en' ? 'day' : 'nhar'}</span></h2>
            <p class="text-caption text-secondary">~${totalProt}g ${t.protein} · 6 ${t.mealsTitle}</p>
          </div>
          <span class="badge badge-energy">Phase 4100+</span>
        </div>

        <div class="macros-bar">
          <div class="macros-bar-segment" style="width: 50%; background: var(--accent-energy);" title="${t.carbs} 50%"></div>
          <div class="macros-bar-segment" style="width: 25%; background: var(--primary-light);" title="${t.protein} 25%"></div>
          <div class="macros-bar-segment" style="width: 25%; background: var(--warning);" title="${t.fats} 25%"></div>
        </div>
        <div class="flex justify-between text-caption text-secondary mt-sm">
          <span>${t.carbs}: ~520g</span>
          <span>${t.protein}: ~200g</span>
          <span>${t.fats}: ~135g</span>
        </div>
      </div>

      <!-- Progressive Adaptation Protocol -->
      <div class="section-label">${t.titrationTitle}</div>
      <div class="card">
        <table class="data-table">
          <thead>
            <tr>
              <th>Période</th>
              <th>Calories</th>
              <th>Protocole</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Jours 1–4</strong></td>
              <td>~2800 kcal</td>
              <td>Sans collation 23:30, demi-shake Serious Mass</td>
            </tr>
            <tr>
              <td><strong>Jours 5–10</strong></td>
              <td>~3400 kcal</td>
              <td>Shake complet (1 scoop), sans collation 23:30</td>
            </tr>
            <tr class="row-highlight">
              <td><strong>Jours 11+</strong></td>
              <td>~4170 kcal</td>
              <td>Plan complet à 100% avec les 6 repas verrouillés</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Meals Timeline -->
      <div class="section-label">${t.mealsTitle} (${NUTRITION_PLAN.length})</div>
      <div class="card">
        ${NUTRITION_PLAN.map(meal => `
          <div class="meal-item">
            <div class="flex items-center justify-between">
              <span class="meal-time">${meal.timeTarget}</span>
              <div class="meal-macros">
                <span class="meal-macro macro-kcal">${meal.kcal} kcal</span>
                <span class="meal-macro macro-prot">${meal.proteinG}g prot</span>
              </div>
            </div>
            <h3 class="meal-title">${meal.title}</h3>
            <ul style="margin: 6px 0 8px 18px; font-size: 13px; color: var(--text-secondary); line-height: 1.4;">
              ${meal.ingredients.map(ing => `<li>${ing}</li>`).join('')}
            </ul>
            <div style="background: var(--bg); border-radius: var(--radius-sm); padding: 8px 10px; font-size: 12px; color: var(--text-secondary);">
              <strong style="color: var(--primary);">${t.digestiveAdvice}</strong> ${meal.gastricPacingTip}
            </div>
          </div>
        `).join('')}
      </div>

      <!-- Supplements Checklist Today -->
      <div class="section-label">${t.supplementsTitle}</div>
      <div class="card">
        ${SUPPLEMENTS_ROSTER.map(supp => {
          const isTaken = store.isSupplementTaken(today, supp.id);
          return `
            <div class="supp-item">
              <button class="supp-check ${isTaken ? 'checked' : ''}" data-supp-id="${supp.id}">
                <svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>
              </button>
              <div class="supp-info">
                <div class="supp-name">${supp.name}</div>
                <div class="supp-dose">${supp.dosage} · ${supp.takenWithMeal}</div>
                <div class="text-caption text-secondary" style="margin-top: 2px;">${supp.clinicalPurpose}</div>
              </div>
              <span class="supp-time">${supp.time}</span>
            </div>
          `;
        }).join('')}
      </div>

      <!-- Italian Supermarket Matrix -->
      <div class="section-label">${t.supermarketTitle}</div>
      <div class="card">
        <div class="card-header">
          <span class="text-caption text-secondary">Prodotti essenziali nei supermercati di Capoliveri (Conad / Coop) :</span>
        </div>
        <div class="shop-grid">
          ${ITALIAN_SUPERMARKET_CATALOG.map(p => `
            <div class="shop-item">
              <span class="dot"></span>
              <div>
                <strong style="font-size: 13px; color: var(--text);">${p.item}</strong>
                <div style="font-size: 11px; color: var(--text-muted);">${p.cat} · ${p.note}</div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `;
}
