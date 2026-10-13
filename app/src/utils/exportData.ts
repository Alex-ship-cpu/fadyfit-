// Clinical and Athletic Data Exporter (JSON & CSV Format for Coaches / Medico)

import { store } from '../data/store';

export class DataExporter {
  public static exportJSON(): void {
    const state = store.getState();
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(state, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `FadyFit_Clinical_Export_${new Date().toISOString().substring(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  }

  public static exportCSV(): void {
    const state = store.getState();
    let csv = 'Type,Date,WeightKg,ExerciseId,SetIndex,LoadKg,Reps,Notes\n';

    // Append weights
    state.weightHistory.forEach(w => {
      csv += `Weight,${w.date},${w.weightKg},,,,,"${w.notes || ''}"\n`;
    });

    // Append workout sets
    state.workoutLogs.forEach(s => {
      csv += `Set,${s.date},,${s.exerciseId},${s.setIndex + 1},${s.weightKg},${s.reps},\n`;
    });

    const dataStr = 'data:text/csv;charset=utf-8,' + encodeURIComponent(csv);
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `FadyFit_TrainingLog_${new Date().toISOString().substring(0, 10)}.csv`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  }
}
