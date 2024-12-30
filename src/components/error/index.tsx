import { AxiosError } from 'axios';

const handleError = (error: AxiosError) => {
  if (error.response?.status === 403) {
    localStorage.removeItem('site');
    localStorage.removeItem('role');
    localStorage.removeItem('email');
    window.location.href = '/';  // Or any route you want
    
    console.error("Access Forbidden! Token has been removed.");
  } else {
    console.error("An error occurred:", error.message);
  }
};

export default handleError;
