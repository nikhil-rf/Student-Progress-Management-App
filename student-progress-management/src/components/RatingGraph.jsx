import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export default function RatingGraph({ contests }) {
  const data = contests.map(c => ({
    name: c.contestName,
    rating: c.newRating
  }));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="rating" stroke="#8884d8" />
      </LineChart>
    </ResponsiveContainer>
  );
}
