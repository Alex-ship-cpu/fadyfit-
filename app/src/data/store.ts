// FadyFit Reactive Local Store with Strong Typing & Event Bus
// Designed for iPhone 17 Pro Max Offline-First Architecture

export interface WeightEntry {
  date: string; // YYYY-MM-DD
  weightKg: number;
  caloriesTaken?: number;
  appetiteState?: 'normal' | 'satiated' | 'nausea_avoided' | 'suppressed';
  sleepRecorded?: string;
  notes?: string;
}

export interface SetLog {
  id: string;
  date: string; // YYYY-MM-DD
  exerciseId: string;
  setIndex: number;
  weightKg: number;
  reps: number;
  completed: boolean;
  rpe?: number;
}

export interface MentalJournalEntry {
  id: string;
  timestamp: string;
  thoughtSnippet: string;
  cognitiveStrategy: 'ACT_Defusion' | 'Somatic_Grounding' | 'Reality_Test';
  status: 'Detached' | 'Processed';
}

export interface AppState {
  version: number;
  user: {
    name: string;
    startWeightKg: number;
    targetWeightKg: number;
    startDate: string;
    competitionDate: string;
    heightCm: number;
    age: number;
    location: string;
  };
  weightHistory: WeightEntry[];
  workoutLogs: SetLog[];
  completedSupplements: Record<string, boolean>; // key format: YYYY-MM-DD_suppId
  mentalJournal: MentalJournalEntry[];
  currentRestTimer: {
    duration: number;
    remaining: number;
    exerciseName: string;
    isActive: boolean;
  } | null;
}

const STORAGE_KEY = 'fadyfit_apex_store_v1';

const INITIAL_STATE: AppState = {
  version: 1,
  user: {
    name: 'Fady',
    startWeightKg: 60.0,
    targetWeightKg: 70.0,
    startDate: '2026-10-13',
    competitionDate: '2026-12-13',
    heightCm: 180,
    age: 19,
    location: 'Capoliveri, Isola d\'Elba, Italie'
  },
  weightHistory: [
    {
      date: '2026-10-13',
      weightKg: 60.0,
      caloriesTaken: 2800,
      appetiteState: 'normal',
      sleepRecorded: '11:30',
      notes: 'Départ officiel du protocole d\'hypertrophie'
    }
  ],
  workoutLogs: [],
  completedSupplements: {},
  mentalJournal: [
    {
      id: 'init_act_01',
      timestamp: '2026-10-13 10:15',
      thoughtSnippet: 'Khyel dyal waswas 3la l-mrad wla nti7 f l-wazn',
      cognitiveStrategy: 'ACT_Defusion',
      status: 'Detached'
    }
  ],
  currentRestTimer: null
};

class StoreService {
  private state: AppState;
  private listeners: Array<(state: AppState) => void> = [];

  constructor() {
    this.state = this.load();
  }

  private load(): AppState {
    try {
      const serialized = localStorage.getItem(STORAGE_KEY);
      if (!serialized) return INITIAL_STATE;
      const parsed = JSON.parse(serialized);
      return { ...INITIAL_STATE, ...parsed };
    } catch (e) {
      console.error('Failed to load store, initializing defaults', e);
      return INITIAL_STATE;
    }
  }

  private persist() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.state));
      this.notify();
    } catch (e) {
      console.error('Failed to persist store', e);
    }
  }

  public getState(): AppState {
    return this.state;
  }

  public subscribe(fn: (state: AppState) => void): () => void {
    this.listeners.push(fn);
    return () => {
      this.listeners = this.listeners.filter(l => l !== fn);
    };
  }

  private notify() {
    for (const listener of this.listeners) {
      listener(this.state);
    }
  }

  // Weight Mutation
  public logWeight(entry: WeightEntry) {
    const existingIndex = this.state.weightHistory.findIndex(w => w.date === entry.date);
    if (existingIndex >= 0) {
      this.state.weightHistory[existingIndex] = entry;
    } else {
      this.state.weightHistory.unshift(entry);
    }
    this.persist();
  }

  // Workout Set Mutation
  public logSet(log: SetLog) {
    const existingIndex = this.state.workoutLogs.findIndex(
      l => l.date === log.date && l.exerciseId === log.exerciseId && l.setIndex === log.setIndex
    );
    if (existingIndex >= 0) {
      this.state.workoutLogs[existingIndex] = log;
    } else {
      this.state.workoutLogs.push(log);
    }
    this.persist();
  }

  public getSetsForExercise(date: string, exerciseId: string): SetLog[] {
    return this.state.workoutLogs.filter(l => l.date === date && l.exerciseId === exerciseId);
  }

  // Supplement Toggle
  public toggleSupplement(date: string, suppId: string): boolean {
    const key = `${date}_${suppId}`;
    const current = !!this.state.completedSupplements[key];
    this.state.completedSupplements[key] = !current;
    this.persist();
    return !current;
  }

  public isSupplementTaken(date: string, suppId: string): boolean {
    return !!this.state.completedSupplements[`${date}_${suppId}`];
  }

  // Mental Health Log Mutation
  public addMentalEntry(thought: string, strategy: 'ACT_Defusion' | 'Somatic_Grounding' | 'Reality_Test') {
    const entry: MentalJournalEntry = {
      id: 'act_' + Date.now(),
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16),
      thoughtSnippet: thought,
      cognitiveStrategy: strategy,
      status: 'Detached'
    };
    this.state.mentalJournal.unshift(entry);
    this.persist();
  }

  // Rest Timer State
  public setRestTimer(timer: AppState['currentRestTimer']) {
    this.state.currentRestTimer = timer;
    this.persist();
  }
}

export const store = new StoreService();
