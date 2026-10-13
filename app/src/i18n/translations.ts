// FadyFit Apex — Tri-Lingual Internationalization Engine (Darija, Italiano, English)

export type Language = 'da' | 'it' | 'en';

export interface TranslationDictionary {
  // Navigation & Shell
  navOverview: string;
  navWorkouts: string;
  navNutrition: string;
  navPsyche: string;
  navAnalytics: string;
  langSelector: string;

  // Dashboard
  athleteStatus: string;
  subTitle: string;
  readinessLabel: string;
  readinessDesc: string;
  currentWeight: string;
  targetWeight: string;
  remainingKg: string;
  metabolicPhase: string;
  targetKcal: string;
  logWeightBtn: string;
  todayWorkout: string;
  startSessionBtn: string;
  psychAlertTitle: string;
  psychAlertDesc: string;
  dailyDirectiveTitle: string;
  dailyDirectiveText: string;

  // Training & Lab
  warmupProtocol: string;
  warmupTime: string;
  exercisesTitle: string;
  techniqueCue: string;
  series: string;
  weight: string;
  reps: string;
  validate: string;
  overloadSignal: string;
  calc1RM: string;
  calcTonnage: string;

  // Rest Timer
  restTitle: string;
  atpRecovery: string;
  add30s: string;
  skipRest: string;

  // Nutrition
  nutritionTitle: string;
  macroRatio: string;
  carbs: string;
  protein: string;
  fats: string;
  titrationTitle: string;
  mealsTitle: string;
  digestiveAdvice: string;
  supplementsTitle: string;
  supermarketTitle: string;

  // Mental & Circadian
  mentalTitle: string;
  mentalSubtitle: string;
  actLabTitle: string;
  actLabDesc: string;
  actPlaceholder: string;
  actBtn: string;
  circadianTitle: string;
  circadianDesc: string;
  wakeTarget: string;
  medicalTitle: string;
  medicalDesc: string;

  // Analytics & Trajectory
  trajectoryTitle: string;
  trajectoryDesc: string;
  weeklyBilanTitle: string;
  decisionTreeTitle: string;
  photosTitle: string;
  exportDataBtn: string;
}

export const translations: Record<Language, TranslationDictionary> = {
  da: {
    navOverview: 'Aperçu',
    navWorkouts: 'Séances',
    navNutrition: 'Nutrition',
    navPsyche: 'Psyche',
    navAnalytics: 'Courbe',
    langSelector: 'Lougha',

    athleteStatus: 'AI Athletic Bio-Telemetry',
    subTitle: 'Capoliveri, Isola d\'Elba · Test Koura f ~8 simanat',
    readinessLabel: 'L-Jasad w L-A3sab Wajdin',
    readinessDesc: 'Système nerveux central disposé l l-effort maximal. Anabolisme favorable.',
    currentWeight: 'L-Wazn L-7ali',
    targetWeight: 'L-Hadaf d L-Koura',
    remainingKg: 'B9at lik bach twsel',
    metabolicPhase: 'L-Mar7ala d L-Metabolisme',
    targetKcal: 'Kcal l-hadaf f nhar',
    logWeightBtn: '+ Wazn Jdid',
    todayWorkout: 'Séance d Lyouma (Kinesiology AI)',
    startSessionBtn: 'Bda L-Entraînement',
    psychAlertTitle: 'Protocoles Gastrique & Sommeil Khdamin',
    psychAlertDesc: 'Protection anti-nausea (80% saturation) & réveil calibré',
    dailyDirectiveTitle: 'Directive Neuro-Psyche d Lyouma :',
    dailyDirectiveText: '"L-waswas d lil w l-khof mn lmrad ghir signaux d a3sab. Matna9chhomch, khllihom ydouzou bla ma tlse9 fihom."',

    warmupProtocol: 'Échauffement Dynamique (10 min)',
    warmupTime: 'Échauffement',
    exercisesTitle: 'Tamarin d L-Séance',
    techniqueCue: '💡 Technique Darija :',
    series: 'Série',
    weight: 'Poids (kg)',
    reps: 'Reps',
    validate: 'Valider',
    overloadSignal: 'AI Signal Overload',
    calc1RM: '1RM Estimé',
    calcTonnage: 'Tonnage Total',

    restTitle: 'REPOS ANABOLIQUE',
    atpRecovery: 'Restitution ATP & A3sab',
    add30s: '+30s',
    skipRest: 'Kmml Repos',

    nutritionTitle: 'Makla & Anabolic Bio-Energy',
    macroRatio: 'Tawazoun d Macros',
    carbs: 'Glucides',
    protein: 'Protéines',
    fats: 'Lipides',
    titrationTitle: 'Tadrij Al-M3da (Caloric Titration)',
    mealsTitle: 'Wjbat d Nhar',
    digestiveAdvice: 'Nasi7a d L-Hazm :',
    supplementsTitle: 'Suppléments d Lyouma',
    supermarketTitle: 'Supermarché Italien (Capoliveri/Elba)',

    mentalTitle: 'Si7a Nafsiya & Neuro-Biométrie',
    mentalSubtitle: 'L-muscle khasso système parasympathique hani bach ykber.',
    actLabTitle: 'Laboratoire ACT (Défusion d L-Waswas)',
    actLabDesc: 'Kteb l-fikra li mchwcha 3lik f dmaghk (waswas d lmrad, koura, n3ass) :',
    actPlaceholder: 'Kteb hna l-waswas li ja f balk...',
    actBtn: 'Tahlil & Défusion b l-AI',
    circadianTitle: 'Recalage Circadien d N-N3ass',
    circadianDesc: 'Avancement progressif d r-réveil kol 3 iyam m3a chems sba7.',
    wakeTarget: 'Réveil',
    medicalTitle: 'Bilan Médical & Analyses d Tbib',
    medicalDesc: 'Analyses mtlouba 3nd medico di base (NFS, TSH, Ferritine, Vit D3).',

    trajectoryTitle: 'Trajectoire 60 → 70 kg',
    trajectoryDesc: 'Hadaf: +1.2 kg / simana bach twsel 70 kg f l-we9t.',
    weeklyBilanTitle: 'Bilan d Simana (Kol Mardi)',
    decisionTreeTitle: 'Qawa3id d D-Décision d L-Coach',
    photosTitle: 'Jalons Photographiques',
    exportDataBtn: 'Exportation des Données (JSON/CSV)'
  },

  it: {
    navOverview: 'Panoramica',
    navWorkouts: 'Allenamento',
    navNutrition: 'Nutrizione',
    navPsyche: 'Psiche',
    navAnalytics: 'Traiettoria',
    langSelector: 'Lingua',

    athleteStatus: 'AI Athletic Bio-Telemetry',
    subTitle: 'Capoliveri, Isola d\'Elba · Provino Calcio tra ~8 settimane',
    readinessLabel: 'Stato Anabolico Ottimale',
    readinessDesc: 'Sistema nervoso centrale pronto per sforzo massimale. Recupero ideale.',
    currentWeight: 'Peso Attuale',
    targetWeight: 'Obiettivo Peso',
    remainingKg: 'Massa Rimanente',
    metabolicPhase: 'Fase Metabolica Attiva',
    targetKcal: 'Calorie Giornaliere',
    logWeightBtn: '+ Registra Peso',
    todayWorkout: 'Sessione di Oggi (Kinesiology AI)',
    startSessionBtn: 'Inizia Allenamento',
    psychAlertTitle: 'Protocolli Gastrico e Sonno Attivi',
    psychAlertDesc: 'Protezione anti-nausea (80% sazietà) & sveglia sincronizzata',
    dailyDirectiveTitle: 'Direttiva Neuro-Psichica del Giorno :',
    dailyDirectiveText: '"I pensieri intrusivi sulla salute sono solo scariche neurali transitorie. Osservali passare senza fonderti con essi."',

    warmupProtocol: 'Riscaldamento Dinamico (10 min)',
    warmupTime: 'Riscaldamento',
    exercisesTitle: 'Esercizi della Sessione',
    techniqueCue: '💡 Esecuzione Tecnica :',
    series: 'Serie',
    weight: 'Carico (kg)',
    reps: 'Ripetizioni',
    validate: 'Conferma',
    overloadSignal: 'Segnale Sovraccarico AI',
    calc1RM: '1RM Stimato',
    calcTonnage: 'Tonnellaggio Totale',

    restTitle: 'RECUPERO ANABOLICO',
    atpRecovery: 'Rigenerazione ATP e Sistema Nervoso',
    add30s: '+30s',
    skipRest: 'Termina Riposo',

    nutritionTitle: 'Nutrizione & Bio-Energia Anabolica',
    macroRatio: 'Rapporto Macronutrienti',
    carbs: 'Carboidrati',
    protein: 'Proteine',
    fats: 'Grassi',
    titrationTitle: 'Progressione Gastrica (Adattamento)',
    mealsTitle: 'Pasti Giornalieri',
    digestiveAdvice: 'Consiglio Digeribilità :',
    supplementsTitle: 'Integrazione del Giorno',
    supermarketTitle: 'Supermercato Italiano (Coop / Conad Elba)',

    mentalTitle: 'Salute Mentale & Neuro-Biometria',
    mentalSubtitle: 'L\'ipertrofia necessita del sistema parasimpatico attivo.',
    actLabTitle: 'Laboratorio ACT (Defusione Cognitiva)',
    actLabDesc: 'Scrivi la preoccupazione o il pensiero intrusivo (salute, provino, sonno) :',
    actPlaceholder: 'Scrivi qui la tua ansia o pensiero...',
    actBtn: 'Analisi & Defusione AI (ACT)',
    circadianTitle: 'Allineamento Circadiano del Sonno',
    circadianDesc: 'Anticipo graduale della sveglia ogni 3 giorni con luce solare mattutina.',
    wakeTarget: 'Sveglia',
    medicalTitle: 'Esami Medici (Medico di Base)',
    medicalDesc: 'Pannello clinico raccomandato: Emocromo, TSH, Ferritina, Vit D3.',

    trajectoryTitle: 'Traiettoria Massa 60 → 70 kg',
    trajectoryDesc: 'Target: +1.2 kg a settimana per raggiungere 70 kg prima del provino.',
    weeklyBilanTitle: 'Bilancio Settimanale (Ogni Martedì)',
    decisionTreeTitle: 'Albero Decisionale del Coach',
    photosTitle: 'Foto Monitoraggio',
    exportDataBtn: 'Esporta Cartella Clinica (JSON/CSV)'
  },

  en: {
    navOverview: 'Overview',
    navWorkouts: 'Workouts',
    navNutrition: 'Nutrition',
    navPsyche: 'Psyche',
    navAnalytics: 'Trajectory',
    langSelector: 'Language',

    athleteStatus: 'AI Athletic Bio-Telemetry',
    subTitle: 'Capoliveri, Elba Island · Football Trial in ~8 weeks',
    readinessLabel: 'Optimal Anabolic Readiness',
    readinessDesc: 'Central nervous system primed for maximal output. Positive anabolic state.',
    currentWeight: 'Current Weight',
    targetWeight: 'Target Weight',
    remainingKg: 'Remaining Target',
    metabolicPhase: 'Active Metabolic Phase',
    targetKcal: 'Target Daily Calories',
    logWeightBtn: '+ Log Weight',
    todayWorkout: 'Today\'s Session (Kinesiology AI)',
    startSessionBtn: 'Begin Workout',
    psychAlertTitle: 'Gastric & Circadian Guardrails Active',
    psychAlertDesc: 'Anti-emetic protection (80% fullness rule) & sleep phase titration',
    dailyDirectiveTitle: 'Daily Neuro-Psychological Directive :',
    dailyDirectiveText: '"Intrusive thoughts and somatic anxiety are temporary electrical signals. Observe them pass without fusing or negotiating."',

    warmupProtocol: 'Dynamic Warmup Protocol (10 min)',
    warmupTime: 'Warmup',
    exercisesTitle: 'Session Movements',
    techniqueCue: '💡 Biomechanical Cues :',
    series: 'Set',
    weight: 'Load (kg)',
    reps: 'Reps',
    validate: 'Log Set',
    overloadSignal: 'AI Overload Signal',
    calc1RM: 'Estimated 1RM',
    calcTonnage: 'Total Tonnage',

    restTitle: 'ANABOLIC REST INTERVAL',
    atpRecovery: 'ATP & Neural Recovery',
    add30s: '+30s',
    skipRest: 'Finish Rest',

    nutritionTitle: 'Metabolic Nutrition & Bio-Energy',
    macroRatio: 'Macronutrient Partitioning',
    carbs: 'Carbs',
    protein: 'Protein',
    fats: 'Fats',
    titrationTitle: 'Gastric Volume Titration Protocol',
    mealsTitle: 'Daily Meal Roster',
    digestiveAdvice: 'Digestive Motility Cue :',
    supplementsTitle: 'Daily Supplement Matrix',
    supermarketTitle: 'Italian Market Catalog (Capoliveri, Elba)',

    mentalTitle: 'Neuro-Psychology & Performance Resilience',
    mentalSubtitle: 'Hypertrophic synthesis strictly requires parasympathetic dominance.',
    actLabTitle: 'ACT Cognitive Defusion Laboratory',
    actLabDesc: 'Input intrusive anxiety (health concerns, football trial stakes, insomnia) :',
    actPlaceholder: 'Type your intrusive worry here...',
    actBtn: 'Defuse with AI (ACT Protocol)',
    circadianTitle: 'Circadian Entrainment Protocol',
    circadianDesc: 'Phase advance every 3 days paired with morning high-lux sunlight.',
    wakeTarget: 'Wakeup',
    medicalTitle: 'Clinical Bloodwork Matrix (PCP)',
    medicalDesc: 'Mandatory clinical lab work: CBC, TSH, Ferritin, 25-OH Vitamin D.',

    trajectoryTitle: 'Mass Trajectory 60 → 70 kg',
    trajectoryDesc: 'Target: +1.2 kg / week velocity to secure 70 kg prior to trials.',
    weeklyBilanTitle: 'Weekly Assessment Matrix (Tuesdays)',
    decisionTreeTitle: 'Coach Algorithmic Logic',
    photosTitle: 'Morphological Milestones',
    exportDataBtn: 'Export Clinical Data (JSON/CSV)'
  }
};

class I18nManager {
  private currentLanguage: Language = 'da';
  private listeners: Array<(lang: Language) => void> = [];

  constructor() {
    const saved = localStorage.getItem('fadyfit_lang') as Language;
    if (saved && (saved === 'da' || saved === 'it' || saved === 'en')) {
      this.currentLanguage = saved;
    }
  }

  public getLang(): Language {
    return this.currentLanguage;
  }

  public setLang(lang: Language) {
    this.currentLanguage = lang;
    localStorage.setItem('fadyfit_lang', lang);
    this.listeners.forEach(fn => fn(lang));
  }

  public t(): TranslationDictionary {
    return translations[this.currentLanguage];
  }

  public subscribe(fn: (lang: Language) => void): () => void {
    this.listeners.push(fn);
    return () => {
      this.listeners = this.listeners.filter(l => l !== fn);
    };
  }
}

export const i18n = new I18nManager();
