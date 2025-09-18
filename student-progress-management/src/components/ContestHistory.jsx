import { useState } from 'react';
import RatingGraph from './RatingGraph';

export default function ContestHistory({ contests }) {
  const [filter, setFilter] = useState(365);

  const filteredContests = contests.filter(c => {
    const daysAgo = (Date.now() - c.ratingUpdateTimeSeconds * 1000) / (1000 * 60 * 60 * 24);
    return daysAgo <= filter;
  });

  return (
    <div className="p-4 border dark:border-gray-700 rounded-lg">
      <h3 className="text-xl mb-2">Contest History</h3>
      <div className="mb-2 space-x-2">
        {[30, 90, 365].map(d => (
          <button key={d} onClick={() => setFilter(d)} className="px-2 py-1 bg-blue-500 text-white rounded">{d} days</button>
        ))}
      </div>
      <RatingGraph contests={filteredContests} />
      <table className="table-auto w-full mt-4">
        <thead>
          <tr className="bg-gray-200 dark:bg-gray-800">
            <th>Contest</th>
            <th>Old Rating</th>
            <th>New Rating</th>
            <th>Rank</th>
          </tr>
        </thead>
        <tbody>
          {filteredContests.map(contest => (
            <tr key={contest.contestId} className="text-center border-b dark:border-gray-700">
              <td>{contest.contestName}</td>
              <td>{contest.oldRating}</td>
              <td>{contest.newRating}</td>
              <td>{contest.rank}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
