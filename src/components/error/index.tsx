import { AxiosError } from 'axios';
import toast from 'react-hot-toast';

const handleError = (error: AxiosError) => {
  if (error.response?.status === 403) {
    localStorage.removeItem('site');
    localStorage.removeItem('role');
    localStorage.removeItem('email');
    window.location.href = '/'; 

    toast.error("Access Forbidden! Token has been removed.")
  } else {
    const msg = `${error.response?.data}` || "An error occured"
    toast.error(msg)
  }
};

export default handleError;
