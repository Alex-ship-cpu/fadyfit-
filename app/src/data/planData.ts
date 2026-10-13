// FadyFit Bio-Engine Data Architecture
// Formulated strictly from clinical notes, kinesiology standards & circadian protocols

export interface Exercise {
  id: string;
  name: string;
  sets: number;
  repsTarget: string;
  restSeconds: number;
  rpeTarget: number; // Rate of Perceived Exertion (1-10)
  cues: string[];
  muscleGroup: string;
  techniqueDarija: string;
  alternatives?: string[];
}

export interface WorkoutSession {
  dayId: string;
  dayName: string;
  focus: string;
  durationMin: number;
  warmupMinutes: number;
  warmupProtocol: string[];
  exercises: Exercise[];
  postSession?: {
    type: string;
    protocol: string;
  };
}

export interface Meal {
  id: string;
  timeTarget: string;
  title: string;
  kcal: number;
  proteinG: number;
  carbsG: number;
  fatsG: number;
  ingredients: string[];
  prepNotes: string;
  gastricPacingTip: string;
}

export interface Supplement {
  id: string;
  time: string;
  name: string;
  dosage: string;
  clinicalPurpose: string;
  safetyWarning?: string;
  takenWithMeal: string;
}

export interface CircadianPhase {
  startDate: string;
  wakeTarget: string;
  bedTarget: string;
  luxMinutes: number;
  screensCutoff: string;
}

export interface WeeklyTarget {
  week: number;
  dates: string;
  targetWeightKg: number;
  phase: string;
  focusNote: string;
}

// 1. TRAINING PROTOCOL (Mon-Fri Hypertrophy & Football Conditioning)
export const WORKOUT_ROSTER: WorkoutSession[] = [
  {
    dayId: 'lundi',
    dayName: 'Lundi',
    focus: 'Upper 9owa (Maximal Neural Recruitment)',
    durationMin: 75,
    warmupMinutes: 10,
    warmupProtocol: [
      '3 min jri sahl w rotasyon d ktaf (Scapular mobilization)',
      'Band pull-aparts w arm swings',
      '2 séries dyal échauffement progressif f Développé couché'
    ],
    exercises: [
      {
        id: 'bench_press',
        name: 'Développé couché (Barre)',
        sets: 4,
        repsTarget: '6 reps',
        restSeconds: 150,
        rpeTarget: 8.5,
        muscleGroup: 'Pectoraux / Triceps / Deltoïde antérieur',
        techniqueDarija: 'Mstle9 3la banc, rjlik mzyan f l2rd, dfe3 lbarre mn sdrek b blast thbet kontrolé f 2-3s.',
        cues: ['Retract scapulae', 'Arch naturel', 'Bar path jey l sternum']
      },
      {
        id: 'barbell_row',
        name: 'Rowing barre (Overhand/Pronation)',
        sets: 4,
        repsTarget: '6-8 reps',
        restSeconds: 150,
        rpeTarget: 8,
        muscleGroup: 'Dorsaux / Rhomboïdes / Trapèzes',
        techniqueDarija: 'M7ni l9eddam b 45°, dhr mestawi, jbed lbarre l soretk bla ma thzz dhrk.',
        cues: ['Coude l l-lour', 'Squeeze l-omoplates', 'Rkabi 5faf flex']
      },
      {
        id: 'military_press',
        name: 'Développé militaire (Overhead Press)',
        sets: 3,
        repsTarget: '8 reps',
        restSeconds: 120,
        rpeTarget: 8,
        muscleGroup: 'Deltoïdes antérieurs & latéraux',
        techniqueDarija: 'Dfe3 lbarre mn ktafk direct l fou9 rassek b dhr chayed w fessiers mzyrin.',
        cues: ['Glutes locked', 'Barre f ligne droite', 'Tla3 rasek bach tfout lbarre']
      },
      {
        id: 'pullups',
        name: 'Tractions (Prise large wla neutre)',
        sets: 3,
        repsTarget: 'Max (Khlli 1 rep f lkhzan)',
        restSeconds: 120,
        rpeTarget: 9,
        muscleGroup: 'Grand dorsal / Biceps',
        techniqueDarija: 'M3l9 f barre, tla3 7tta dgnek yfout lbarre bla balancement.',
        cues: ['Deadstop l-ta7t', 'Pectoraux mwejh l lbarre']
      },
      {
        id: 'barbell_curl',
        name: 'Curl barre droite',
        sets: 3,
        repsTarget: '10 reps',
        restSeconds: 90,
        rpeTarget: 8.5,
        muscleGroup: 'Biceps Brachii',
        techniqueDarija: 'Tla3 lbarre b drak b vitesse contrôlée bla momentum d dhr.',
        cues: ['Coude fixe m3a l-jnab', 'Eccentric 2s']
      },
      {
        id: 'skull_crusher',
        name: 'Barre au front (Skull Crusher)',
        sets: 3,
        repsTarget: '10 reps',
        restSeconds: 90,
        rpeTarget: 8.5,
        muscleGroup: 'Triceps (Longue portion)',
        techniqueDarija: 'Mstle9 3la banc, hbet lbarre l jbhtek b drak w 3awed mdd.',
        cues: ['Coude vers le haut', 'Kontrol f thbet']
      }
    ]
  },
  {
    dayId: 'mardi',
    dayName: 'Mardi',
    focus: 'Lower 9owa & Football Structural Foundation',
    durationMin: 75,
    warmupMinutes: 10,
    warmupProtocol: [
      'Ankle dorsiflexion mobility (3 min)',
      'Hip 90/90 openers & dynamic leg swings',
      'Squat à vide 2x15'
    ],
    exercises: [
      {
        id: 'barbell_squat',
        name: 'Squat barre (High/Low bar)',
        sets: 4,
        repsTarget: '6 reps',
        restSeconds: 180,
        rpeTarget: 8.5,
        muscleGroup: 'Quadriceps / Fessiers / Core',
        techniqueDarija: 'Lbarre 3la ktafk, hbet 7tta l fkhad mwazyin m3a l2rd w dfe3 b lk3ab.',
        cues: ['Chest up', 'Rkabi mwejhine m3a rjline', 'Creuse pas le dos']
      },
      {
        id: 'rdl',
        name: 'Soulevé de terre roumain (RDL)',
        sets: 3,
        repsTarget: '8 reps',
        restSeconds: 150,
        rpeTarget: 8,
        muscleGroup: 'Ischio-jambiers / Fessiers',
        techniqueDarija: 'Dhr mestawi, rkabi chwiya flex, dfe3 lwrk lour 7tta t7ess b ischio kytjebdo.',
        cues: ['Hips back', 'Barre rasante m3a rjline', 'Neutral neck']
      },
      {
        id: 'bulgarian_split_squat',
        name: 'Fentes bulgares (Haltères)',
        sets: 3,
        repsTarget: '10 reps / rjel',
        restSeconds: 90,
        rpeTarget: 8.5,
        muscleGroup: 'Quadriceps / Fessiers / Stabilité unilatérale',
        techniqueDarija: 'Rjel lour fou9 banc, hbet verticalement 7tta t9reb rkba lourani l l2rd.',
        cues: ['Droit k l-alif', 'Focus 3la rjel l9damia']
      },
      {
        id: 'nordic_curl',
        name: 'Nordic curl (wla Leg curl machine)',
        sets: 3,
        repsTarget: '5 reps (wla 10 reps machine)',
        restSeconds: 120,
        rpeTarget: 9,
        muscleGroup: 'Ischio-jambiers (Protection contre déchirures football)',
        techniqueDarija: '3la rkabik, rjlik mchedin, ti7 l9eddam b chwiya w resisté b ischio.',
        cues: ['Hips extended', 'Résiste l-maximum f thbet']
      },
      {
        id: 'standing_calf_raise',
        name: 'Mollets debout (Calf Raises)',
        sets: 4,
        repsTarget: '12 reps',
        restSeconds: 60,
        rpeTarget: 9,
        muscleGroup: 'Gastrocnémiens',
        techniqueDarija: 'Tla3 3la rous sba3k f marche, 7bes 1s lfou9 w hbet stretch kamel.',
        cues: ['Pause 1s au sommet', 'Full stretch bas']
      }
    ]
  },
  {
    dayId: 'mercredi',
    dayName: 'Mercredi',
    focus: 'Push Hypertrophy & Neuromuscular Speed (Sprints 30m)',
    durationMin: 80,
    warmupMinutes: 10,
    warmupProtocol: [
      'Scapular pushups & shoulder dislocates',
      'Pectoral dynamic stretch',
      '2 séries légères développé incliné'
    ],
    exercises: [
      {
        id: 'incline_db_press',
        name: 'Développé incliné haltères (30°)',
        sets: 4,
        repsTarget: '10 reps',
        restSeconds: 120,
        rpeTarget: 8.5,
        muscleGroup: 'Haut des pectoraux / Deltoïde antérieur',
        techniqueDarija: 'Banc mayl 30°, dfe3 haltères f trajectoire directe w hbet stretch profond.',
        cues: ['Angle 30° machi 45°', 'Coude à 45° du buste']
      },
      {
        id: 'dips',
        name: 'Dips (Barres parallèles)',
        sets: 3,
        repsTarget: '10-12 reps',
        restSeconds: 90,
        rpeTarget: 8.5,
        muscleGroup: 'Triceps / Bas des pectoraux',
        techniqueDarija: 'Hbet 7tta coude yformi 90°, mayel jsdak l9eddam chwiya bach tkhdem sder.',
        cues: ['Penché pour pecs', 'Coude stable']
      },
      {
        id: 'lateral_raises',
        name: 'Élévations latérales haltères',
        sets: 4,
        repsTarget: '15 reps',
        restSeconds: 60,
        rpeTarget: 9,
        muscleGroup: 'Deltoïde latéral (Largeur)',
        techniqueDarija: 'Tla3 haltères mn jnab 7tta l niveau d ktaf b coude chwiya mtwiy.',
        cues: ['Coude y9oud l-7araka', 'Contrôle à la descente']
      },
      {
        id: 'dumbbell_flyes',
        name: 'Écarté haltères couché',
        sets: 3,
        repsTarget: '12 reps',
        restSeconds: 60,
        rpeTarget: 8,
        muscleGroup: 'Pectoraux (Stretch)',
        techniqueDarija: 'Fte7 ydik b 7nana b coude bloqué, jme3 haltères fou9 sdrek.',
        cues: ['Stretch doux', 'Ne pas claquer les haltères']
      },
      {
        id: 'triceps_rope_extension',
        name: 'Extension triceps poulie haute / haltère',
        sets: 3,
        repsTarget: '12 reps',
        restSeconds: 60,
        rpeTarget: 9,
        muscleGroup: 'Triceps',
        techniqueDarija: 'Mdd drak l l-ta7t w fte7 l-corde f akhir l-mouvement.',
        cues: ['Coude collé au flanc', 'Lockout 1s']
      }
    ],
    postSession: {
      type: 'Sprint Explosif Football',
      protocol: '6 sprints × 30 mètres (Effort maximal 100%). Repos: 90s mchi hani bin sprint w sprint.'
    }
  },
  {
    dayId: 'jeudi',
    dayName: 'Jeudi',
    focus: 'Pull Hypertrophy & Back Density',
    durationMin: 70,
    warmupMinutes: 10,
    warmupProtocol: ['Deadhang 30s', 'Lat dynamic stretches', 'Rowing à vide'],
    exercises: [
      {
        id: 'lat_pulldown_or_pullups',
        name: 'Tirage vertical (Lat Pulldown / Tractions)',
        sets: 4,
        repsTarget: '10 reps',
        restSeconds: 120,
        rpeTarget: 8.5,
        muscleGroup: 'Grand dorsal (Largeur du dos)',
        techniqueDarija: 'Jbed lbarre l sdrek l fou9ani, rj3 ktafk l l-lour w l-ta7t.',
        cues: ['Conduire avec les coudes', 'Pause 1s clavicules']
      },
      {
        id: 'single_arm_db_row',
        name: 'Rowing haltère à un bras (Unilatéral)',
        sets: 4,
        repsTarget: '10 reps / côté',
        restSeconds: 90,
        rpeTarget: 8.5,
        muscleGroup: 'Épaisseur du dos / Rhomboïdes',
        techniqueDarija: 'Rkba w yed 3la banc, jbed haltère vers l-hanche machi l sder.',
        cues: ['Trajectoire jeyha l l-wrk', 'Dhr plat']
      },
      {
        id: 'rear_delt_flyes',
        name: 'Oiseau haltères / Machine (Rear Delts)',
        sets: 3,
        repsTarget: '15 reps',
        restSeconds: 60,
        rpeTarget: 9,
        muscleGroup: 'Deltoïde postérieur (Posture & Épaules rondes)',
        techniqueDarija: 'M7ni l9eddam b 90°, tla3 haltères b ktafk l lourani.',
        cues: ['Isoler l-arrière d ktaf', 'Légère rotation interne']
      },
      {
        id: 'shrugs',
        name: 'Shrugs haltères / barre',
        sets: 3,
        repsTarget: '12 reps',
        restSeconds: 60,
        rpeTarget: 8.5,
        muscleGroup: 'Trapèzes supérieurs',
        techniqueDarija: 'Hzz ktafk direct l wdnik bla ma tdwer ktafk.',
        cues: ['Directement vertical', 'Hold 1s']
      },
      {
        id: 'incline_bicep_curl',
        name: 'Curl incliné haltères (Banc à 45-60°)',
        sets: 3,
        repsTarget: '12 reps',
        restSeconds: 60,
        rpeTarget: 9,
        muscleGroup: 'Biceps (Stretch max longue portion)',
        techniqueDarija: 'Gales f banc mayl, drak mdellin l lour, tla3 haltère b supination.',
        cues: ['Stretch maximal derrière le corps']
      },
      {
        id: 'hammer_curl',
        name: 'Curl marteau (Hammer Curls)',
        sets: 3,
        repsTarget: '12 reps',
        restSeconds: 60,
        rpeTarget: 9,
        muscleGroup: 'Brachial antérieur & Brachio-radial (Épaisseur bras)',
        techniqueDarija: '9bda b7al l-martou (paumes m9ablin), tla3 haltères bla lwa.',
        cues: ['Prise neutre constante', 'Avant-bras d 7did']
      }
    ]
  },
  {
    dayId: 'vendredi',
    dayName: 'Vendredi',
    focus: 'Legs Volume & Adductor / Core Reinforcement',
    durationMin: 75,
    warmupMinutes: 10,
    warmupProtocol: ['Glute bridge 2x15', 'Adductor rock backs (3 min)', 'Goblet squat léger'],
    exercises: [
      {
        id: 'goblet_or_hack_squat',
        name: 'Goblet Squat (wla Hack Squat machine)',
        sets: 4,
        repsTarget: '10 reps',
        restSeconds: 120,
        rpeTarget: 8.5,
        muscleGroup: 'Quadriceps / Gainage antérieur',
        techniqueDarija: 'Haltère m9ebbed 3nd sdrek, hbet deep squat b buste vertical.',
        cues: ['Profondeur maximale', 'Coude bin les genoux']
      },
      {
        id: 'hip_thrust',
        name: 'Hip Thrust (Barre au bassin)',
        sets: 4,
        repsTarget: '10 reps',
        restSeconds: 120,
        rpeTarget: 8.5,
        muscleGroup: 'Fessiers / Puissance sprint football',
        techniqueDarija: 'Dhrek 3la banc, barre m7tota 3la lwrk m3a mousse, tla3 lwrk w sirri.',
        cues: ['Lockout horizontal', 'Tibia vertical à 90°']
      },
      {
        id: 'walking_lunges',
        name: 'Fentes marchées haltères',
        sets: 3,
        repsTarget: '12 reps / rjel',
        restSeconds: 90,
        rpeTarget: 9,
        muscleGroup: 'Chaîne postérieure & Quadriceps',
        techniqueDarija: 'Khatwa kbira l9eddam, hbet 90°, w df3 direct l khatwa li b3dha.',
        cues: ['Stabilité constante', 'Genou ne dépasse pas trop']
      },
      {
        id: 'leg_extension',
        name: 'Leg Extension machine (wla Split squat)',
        sets: 3,
        repsTarget: '15 reps',
        restSeconds: 60,
        rpeTarget: 9.5,
        muscleGroup: 'Rectus femoris & Vastes',
        techniqueDarija: 'Tla3 rjlik 7tta ytmddo kamlin, squeeze 1s lfou9 w hbet b chwiya.',
        cues: ['Brûlure métabolique', 'Descente 2s contrôlée']
      },
      {
        id: 'copenhagen_plank',
        name: 'Copenhagen Plank (Protection pubalgie)',
        sets: 3,
        repsTarget: '20s / côté',
        restSeconds: 60,
        rpeTarget: 8,
        muscleGroup: 'Adducteurs (Critique pour footballeur)',
        techniqueDarija: 'Planche 3la jnab, rjel lfou9ania m7tota 3la banc, tla3 bassin f l-hawa.',
        cues: ['Ligne parfaite', 'Active les adducteurs']
      },
      {
        id: 'seated_or_standing_calves',
        name: 'Mollets volume',
        sets: 4,
        repsTarget: '15 reps',
        restSeconds: 60,
        rpeTarget: 9,
        muscleGroup: 'Mollets',
        techniqueDarija: '15 répétitions propres avec arrêt en bas pour tuer le réflexe myotatique.',
        cues: ['Stop en bas 2s', 'Explosion haut']
      }
    ]
  }
];

// 2. NUTRITIONAL TIMELINE (~4,170 kcal | ~200g Protein)
export const NUTRITION_PLAN: Meal[] = [
  {
    id: 'breakfast_915',
    timeTarget: '09:15',
    title: 'Petit-déjeuner Anabolique & Énergie Métabolique',
    kcal: 680,
    proteinG: 27,
    carbsG: 82,
    fatsG: 28,
    ingredients: [
      '3 œufs entiers cuits dans 1 c. à soupe d’huile d’olive extra-vierge',
      '2 tranches de pain complet / artisanal',
      '1 c. à soupe de miel pur',
      '300 ml de jus d’orange pressé frais'
    ],
    prepNotes: 'Tyeb l-bid mzyan bla ma t7r9 zit. Chreb l-3assir b chwiya bach mat3mrch l-m3da d9a w7da.',
    gastricPacingTip: '80% saturation rule: Kol w 7bes bla forçage. L-m3da ghadi telf f 4 iyam.'
  },
  {
    id: 'lunch_1300',
    timeTarget: '13:00',
    title: 'Déjeuner Hyper-Protéiné & Glycogène',
    kcal: 850,
    proteinG: 60,
    carbsG: 95,
    fatsG: 24,
    ingredients: [
      '150g blanc de poulet / dinde ou poisson blanc cuit (sans peau)',
      '120g pâtes ou riz pesé cru (environ 280-300g cuit)',
      '1.5 c. à soupe d’huile d’olive extra-vierge crue ajoutée sur l’assiette'
    ],
    prepNotes: 'Rouz mtyb f bouillon bch yji khfif. Khlli zit zitoun 7tta l l-akhir crue.',
    gastricPacingTip: 'Mat chrbch l-ma m3a l-ghda! Chreb 30 min 9bel wla 45 min ba3d l-makla bach les enzymes ykhdmo.'
  },
  {
    id: 'snack_1600',
    timeTarget: '16:00',
    title: 'Collation Pré-Training & Charge Glucidique',
    kcal: 500,
    proteinG: 13,
    carbsG: 65,
    fatsG: 21,
    ingredients: [
      '2 tranches de pain frais',
      '30g beurre de cacahuète pur (100% arachidi)',
      '1 banane mûre coupée en rondelles',
      '1 c. à soupe de miel'
    ],
    prepNotes: 'Toast le pain légèrement. Étaler le beurre de cacahuète puis banane et miel.',
    gastricPacingTip: 'Collation rapide à digérer. Donne le flux d’ATP pour la séance de 17:30.'
  },
  {
    id: 'shake_1915',
    timeTarget: '19:15',
    title: 'Hyper-Mass Nutrient Delivery Shake (Post-Workout)',
    kcal: 1100,
    proteinG: 45,
    carbsG: 175,
    fatsG: 22,
    ingredients: [
      '1 scoop Serious Mass (~167g)',
      '400 ml lait entier (latte intero italien)',
      '1 banane mûre',
      '20g beurre de cacahuète',
      '5g créatine monohydrate micronisée'
    ],
    prepNotes: 'Mixeur à fond avec glaçons pour rendre le shake très fluide et très froid. Boire en 20-30 minutes.',
    gastricPacingTip: 'Nhar 1 à 4: Prendre demi-dose (1/2 scoop + 250ml lait ~550 kcal) pour habituer l’estomac sans nausée.'
  },
  {
    id: 'dinner_2130',
    timeTarget: '21:30',
    title: 'Dîner de Récupération Tissulaire',
    kcal: 640,
    proteinG: 36,
    carbsG: 80,
    fatsG: 18,
    ingredients: [
      '1 boîte de thon au naturel égoutté (ou 3 œufs pochés/brouillés)',
      '300g de riz ou pâtes pesés cuits',
      '1 c. à soupe d’huile d’olive extra-vierge'
    ],
    prepNotes: 'Repas doux, sel modéré. Ne pas charger d’épices fortes qui irritent l’estomac avant la nuit.',
    gastricPacingTip: 'Marcher 10 minutes tranquillement après le dîner pour stimuler la motilité gastrique.'
  },
  {
    id: 'nocturnal_2330',
    timeTarget: '23:30',
    title: 'Collation Anti-Catabolique Nocturne',
    kcal: 400,
    proteinG: 21,
    carbsG: 26,
    fatsG: 24,
    ingredients: [
      '170g Yaourt grec entier (authentique 10% MG)',
      '1 c. à soupe de miel pur',
      '30g d’amandes entières fraîches'
    ],
    prepNotes: 'La caséine naturelle du yaourt grec diffuse les acides aminés pendant 7 heures de sommeil.',
    gastricPacingTip: 'À consommer assis au calme, sans écran.'
  }
];

// 3. SUPPLEMENTATION MATRIX
export const SUPPLEMENTS_ROSTER: Supplement[] = [
  {
    id: 'vit_d3_k2',
    time: '09:15',
    name: 'Vitamine D3 + K2',
    dosage: '2000 UI (Gouttes ou softgel)',
    clinicalPurpose: 'Densité osseuse, production testostérone naturelle, modulation immunitaire.',
    safetyWarning: 'Toujours D3 (Cholécalciférol), jamais D2 synthétique.',
    takenWithMeal: 'Petit-déjeuner (Liposoluble)'
  },
  {
    id: 'omega_3',
    time: '13:00',
    name: 'Oméga-3 Haute Pureté (EPA/DHA)',
    dosage: '1 à 2g EPA+DHA combinés',
    clinicalPurpose: 'Résolution de l’inflammation articulaire, sensibilité à l’insuline musculaire.',
    takenWithMeal: 'Déjeuner'
  },
  {
    id: 'digezym_lunch',
    time: '13:00',
    name: 'DigeZyme (Enzymes digestives multienzymatiques)',
    dosage: '1 gélule',
    clinicalPurpose: 'Digestion optimale des protéines lourdes et des féculents sans lourdeur gastrique.',
    takenWithMeal: 'Déjeuner'
  },
  {
    id: 'creatine_mono',
    time: '19:15',
    name: 'Créatine Monohydrate Pure',
    dosage: '5g (dans le shake)',
    clinicalPurpose: 'Régénération ATP musculaire, force explosive, volumisation cellulaire.',
    safetyWarning: 'Prendre tous les jours sans interruption, même les jours de repos.',
    takenWithMeal: 'Post-Workout Shake'
  },
  {
    id: 'digezym_dinner',
    time: '21:30',
    name: 'DigeZyme (Enzymes digestives)',
    dosage: '1 gélule',
    clinicalPurpose: 'Prévient les fermentations intestinales nocturnes.',
    takenWithMeal: 'Dîner'
  },
  {
    id: 'ashwagandha_opt',
    time: '23:00',
    name: 'Ashwagandha KSM-66 (Optionnel / Monitoré)',
    dosage: '300-600mg extrait standardisé',
    clinicalPurpose: 'Réduction du cortisol sérique nocturne et réduction des ruminations anxieuses.',
    safetyWarning: 'Arrêter immédiatement si nausée. Signaler au médecin (impact potentiel sur TSH). Max 8 semaines.',
    takenWithMeal: 'Avant le coucher'
  }
];

// 4. CIRCADIAN ENTRAINMENT & SLEEP TARGETS
export const CIRCADIAN_SCHEDULE: CircadianPhase[] = [
  { startDate: '13 Octobre', wakeTarget: '11:30', bedTarget: '02:30', luxMinutes: 15, screensCutoff: '01:30' },
  { startDate: '16 Octobre', wakeTarget: '11:00', bedTarget: '02:00', luxMinutes: 15, screensCutoff: '01:00' },
  { startDate: '19 Octobre', wakeTarget: '10:30', bedTarget: '01:30', luxMinutes: 15, screensCutoff: '00:30' },
  { startDate: '22 Octobre', wakeTarget: '10:00', bedTarget: '01:00', luxMinutes: 15, screensCutoff: '00:00' },
  { startDate: '25 Octobre', wakeTarget: '09:30', bedTarget: '00:30', luxMinutes: 20, screensCutoff: '23:30' },
  { startDate: '28 Octobre', wakeTarget: '09:00 (Verrouillé)', bedTarget: '00:00', luxMinutes: 20, screensCutoff: '23:00' }
];

// 5. WEEKLY PROGRESSION TARGETS (60 kg -> 70 kg)
export const PROGRESSION_TRAJECTORY: WeeklyTarget[] = [
  { week: 1, dates: '13 - 19 Oct', targetWeightKg: 62.0, phase: 'Amorçage Métabolique', focusNote: 'Habituation à 2800 kcal & adaptation neuro-musculaire' },
  { week: 2, dates: '20 - 26 Oct', targetWeightKg: 63.0, phase: 'Surcompensation Glycogénique', focusNote: 'Shake entier, montée à 3400 kcal' },
  { week: 3, dates: '27 Oct - 02 Nov', targetWeightKg: 64.0, phase: 'Hypertrophie Myofibrillaire', focusNote: 'Pleine charge à 4100 kcal, tests RPE 8.5' },
  { week: 4, dates: '03 - 09 Nov', targetWeightKg: 65.0, phase: 'Pivot Mi-Parcours + Photos #2', focusNote: 'Audit morphologique & vérification vitesse sprint' },
  { week: 5, dates: '10 - 16 Nov', targetWeightKg: 66.0, phase: 'Densité & Puissance Football', focusNote: 'Consolidation jambes & adducteurs' },
  { week: 6, dates: '17 - 23 Nov', targetWeightKg: 67.2, phase: 'Vitesse & Force Maximale', focusNote: 'Évaluation RDL et Squats lourds' },
  { week: 7, dates: '24 - 30 Nov', targetWeekKg: 68.5, phase: 'Saturation Protéique', focusNote: 'Contrôle digestif & tests navettes' } as any,
  { week: 8, dates: '01 - 07 Déc', targetWeightKg: 69.5, phase: 'Affûtage Pré-Test', focusNote: 'Dernière phase de surcompensation' },
  { week: 9, dates: '08 - 13 Déc', targetWeightKg: 70.0, phase: 'Objectif Atteint (70.0 kg)', focusNote: 'Peak conditioning pour les recruteurs' }
];

// 6. ITALIAN SHOPPING MATRIX (Capoliveri, Elba)
export const ITALIAN_SUPERMARKET_CATALOG = [
  { item: 'Uova fresche biologiche / allevate a terra', cat: 'Protéines', note: 'Boîte de 10-12 uova' },
  { item: 'Petto di pollo o fesa di tacchino a fette', cat: 'Protéines', note: '150g pesé cuit par jour' },
  { item: 'Filetti di merluzzo o pesce bianco fresco/surgelato', cat: 'Protéines', note: 'Digestion ultra-rapide' },
  { item: 'Tonno al naturale in scatola (Rio Mare / Nostromo)', cat: 'Protéines', note: 'Dîner facile' },
  { item: 'Yogurt Greco autentico 10% grassi (Fage Total)', cat: 'Protéines & Lipides', note: '170g avant coucher' },
  { item: 'Latte fresco intero di alta qualità', cat: 'Liquides Anaboliques', note: 'Pour le gainer Serious Mass' },
  { item: 'Pasta di semola di grano duro (De Cecco / Barilla)', cat: 'Glucides Complexes', note: '120g cru par portion' },
  { item: 'Riso Basmati o Carnaroli', cat: 'Glucides Complexes', note: 'Digestion légère sans ballonnement' },
  { item: 'Pane artigianale o pane in cassetta integrale', cat: 'Glucides', note: 'Pour les tartines beurre cacahuète' },
  { item: 'Burro di arachidi 100% (senza zuccheri né olio di palma)', cat: 'Lipides Sensationnels', note: 'Calorie booster pur' },
  { item: 'Banane mature', cat: 'Glucides & Potassium', note: 'Énergie pré-workout et shake' },
  { item: 'Miele millefiori o d’acacia italiano', cat: 'Glucides Rapides', note: 'Index glycémique haut pour le glycogène' },
  { item: 'Olio extravergine d’oliva italiano spremuto a freddo', cat: 'Lipides Sains', note: 'Base calorique essentielle (+240 kcal/c.à.s)' },
  { item: 'Mandorle sgusciate non salate', cat: 'Micronutriments & Magnésium', note: '30g au coucher' },
  { item: 'Datteri secchi Medjoul', cat: 'Booster d’urgence', note: '3 dattes = +200 kcal instantanées' }
];
