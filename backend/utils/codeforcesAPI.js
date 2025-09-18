const axios = require('axios');

async function fetchUserInfo(handle) {
  const url = `https://codeforces.com/api/user.info?handles=${handle}`;
  const response = await axios.get(url);
  return response.data.result[0];
}

async function fetchUserRating(handle) {
  const url = `https://codeforces.com/api/user.rating?handle=${handle}`;
  const response = await axios.get(url);
  return response.data.result;
}

async function fetchUserSubmissions(handle) {
  const url = `https://codeforces.com/api/user.status?handle=${handle}`;
  const response = await axios.get(url);
  return response.data.result;
}

module.exports = {
  fetchUserInfo,
  fetchUserRating,
  fetchUserSubmissions
};
