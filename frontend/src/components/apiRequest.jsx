import axios from 'axios';

const REFRESH_URL = 'http://127.0.0.1:8000/api/accounts/token/refresh/';

const apiRequest = async ({ method = 'GET', url, data = {}, params = {} }) => {
  const accessToken = localStorage.getItem('access');

  try {
    // Make the API request with the provided method, URL, data, and parameters
    const response = await axios({
      method,
      url,
      data,
      params,
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }
    });

    return response; // Return the response if successful

  } catch (error) {
    // Handle error if the response status is 401 (Unauthorized)
    if (error.response && error.response.status === 401) {
      return handleRefreshTokenAndRetry({ method, url, data, params });
    } else {
      console.error('API request failed', error); // Log the error for debugging
      throw error; // Throw error to be handled by the calling component
    }
  }
};

// Function to handle refreshing the token and retrying the request
const handleRefreshTokenAndRetry = async ({ method, url, data, params }) => {
  try {
    const refreshToken = localStorage.getItem('refresh'); // Retrieve the refresh token from local storage

    // Request a new access token using the refresh token
    const refreshResponse = await axios.post(REFRESH_URL, { refresh: refreshToken });

    // If the refresh is successful, store the new tokens
    if (refreshResponse.status === 200) {
      localStorage.setItem('access', refreshResponse.data.access);
      if (refreshResponse.data.refresh) {
        localStorage.setItem('refresh', refreshResponse.data.refresh);
      }

      // Retry the original request with the new access token
      const retryResponse = await axios({
        method,
        url,
        data,
        params,
        headers: {
          'Authorization': `Bearer ${refreshResponse.data.access}`,
          'Content-Type': 'application/json',
        }
      });

      return retryResponse; // Return the retried response
    }
  } catch (refreshError) {
    console.error('Refresh token failed', refreshError);
    localStorage.removeItem('access'); // Clear access token
    localStorage.removeItem('refresh'); // Clear refresh token
    window.location.href = '/'; // Redirect to login or home page
  }
};

export default apiRequest;
