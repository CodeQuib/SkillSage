import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export async function getRecommendations(userInterest) {
  const response = await axios.post(`${BASE_URL}/api/recommend`, {
    user_interest: userInterest,
  });
  return response.data.recommended_courses;
}
