// Kinesiology Biomechanical Calculators (1RM, Tonnage, Intensity Zones)

export interface OneRepMaxResult {
  estimated1RMKg: number;
  brzyckiKg: number;
  epleyKg: number;
  percentages: {
    p95: number; // 1-2 reps
    p90: number; // 3-4 reps
    p85: number; // 5-6 reps (Fady's strength target)
    p80: number; // 7-8 reps
    p75: number; // 9-10 reps (Fady's volume target)
    p70: number; // 11-12 reps
  };
}

export class KinesiologyEngine {
  /**
   * Calculates 1 Rep Max using dual-equation ensemble (Brzycki + Epley)
   */
  public static calculate1RM(weightKg: number, reps: number): OneRepMaxResult {
    if (weightKg <= 0 || reps <= 0) {
      return {
        estimated1RMKg: 0,
        brzyckiKg: 0,
        epleyKg: 0,
        percentages: { p95: 0, p90: 0, p85: 0, p80: 0, p75: 0, p70: 0 }
      };
    }

    if (reps === 1) {
      const w = Math.round(weightKg * 10) / 10;
      return {
        estimated1RMKg: w,
        brzyckiKg: w,
        epleyKg: w,
        percentages: {
          p95: Math.round(w * 0.95 * 10) / 10,
          p90: Math.round(w * 0.90 * 10) / 10,
          p85: Math.round(w * 0.85 * 10) / 10,
          p80: Math.round(w * 0.80 * 10) / 10,
          p75: Math.round(w * 0.75 * 10) / 10,
          p70: Math.round(w * 0.70 * 10) / 10
        }
      };
    }

    // Brzycki formula: W / (1.0278 - 0.0278 * R)
    const brzycki = weightKg / (1.0278 - 0.0278 * Math.min(reps, 15));

    // Epley formula: W * (1 + R / 30)
    const epley = weightKg * (1 + reps / 30);

    // Composite average
    const composite = (brzycki + epley) / 2;
    const rounded = Math.round(composite * 10) / 10;

    return {
      estimated1RMKg: rounded,
      brzyckiKg: Math.round(brzycki * 10) / 10,
      epleyKg: Math.round(epley * 10) / 10,
      percentages: {
        p95: Math.round(rounded * 0.95 * 10) / 10,
        p90: Math.round(rounded * 0.90 * 10) / 10,
        p85: Math.round(rounded * 0.85 * 10) / 10,
        p80: Math.round(rounded * 0.80 * 10) / 10,
        p75: Math.round(rounded * 0.75 * 10) / 10,
        p70: Math.round(rounded * 0.70 * 10) / 10
      }
    };
  }

  /**
   * Computes Volume Tonnage (Sum of Load * Reps)
   */
  public static calculateTonnage(sets: Array<{ weightKg: number; reps: number }>): number {
    return sets.reduce((acc, s) => acc + (s.weightKg * s.reps), 0);
  }
}
