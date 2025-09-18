const mongoose = require('mongoose');

const ContestSchema = new mongoose.Schema({
  contestId: Number,
  contestName: String,
  rank: Number,
  oldRating: Number,
  newRating: Number,
  ratingUpdateTimeSeconds: Number
});

const ProblemStatsSchema = new mongoose.Schema({
  problemId: String,
  name: String,
  rating: Number,
  tags: [String],
  solvedAt: Date
});

const HeatmapEntrySchema = new mongoose.Schema({
  date: String,  // Format: YYYY-MM-DD
  count: Number
});

const CFDataSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Student' },
  contests: [ContestSchema],
  problems: [ProblemStatsSchema],
  heatmap: [HeatmapEntrySchema],
  lastFetched: { type: Date, default: Date.now }
});

module.exports = mongoose.model('CFData', CFDataSchema);
