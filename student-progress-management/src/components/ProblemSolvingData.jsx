import { useState } from 'react';
import SubmissionHeatmap from './SubmissionHeatmap';

export default function ProblemSolvingData({ problems, heatmap }) {
  const [filter, setFilter] = useState(30);

  const filteredProblems = problems.filter(p => {
    const daysAgo = (Date.now() - new Date(p.solvedAt).getTime()) / (1000 * 60 * 60 * 24);
    return daysAgo <= filter;
  });

  const totalSolved = filteredProblems.length;
  const averagePerDay = (totalSolved / filter).toFixed(2);
  const maxRatedProblem = filteredProblems.reduce((max, p) => (p.rating > max.rating ? p : max), { rating: 0 });

  return (
    <div className="p-4 border dark:border-gray-700 rounded-lg">
      <h3 className="text-xl mb-2">Problem Solving Data</h3>
      <div className="mb-2 space-x-2">
        {[7, 30, 90].map(d => (
          <button key={d} onClick={() => setFilter(d)} className="px-2 py-1 bg-green-500 text-white rounded">{d} days</button>
        ))}
      </div>
      <p>Most Difficult Problem: {maxRatedProblem.name} (Rating: {maxRatedProblem.rating})</p>
      <p>Total Solved: {totalSolved}</p>
      <p>Average Problems per Day: {averagePerDay}</p>

      <SubmissionHeatmap heatmap={heatmap} />
    </div>
  );
}
