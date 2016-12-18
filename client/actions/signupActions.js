import axios from 'axios';

export function userSignupRequest(userData) {
  return dispatch => {
    console.log("sending userData = " + userData);
    return axios.post('/api/users', userData);
  }
}