import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';

export default function SubmissionHeatmap({ heatmap }) {
  const values = heatmap.map(h => ({
    date: h.date,
    count: h.count
  }));

  return (
    <div className="mt-4">
      <CalendarHeatmap
        startDate={new Date(new Date().setFullYear(new Date().getFullYear() - 1))}
        endDate={new Date()}
        values={values}
        classForValue={value => {
          if (!value) return 'color-empty';
          if (value.count >= 5) return 'color-scale-4';
          if (value.count >= 3) return 'color-scale-3';
          if (value.count >= 1) return 'color-scale-2';
          return 'color-scale-1';
        }}
      />
    </div>
  );
}
