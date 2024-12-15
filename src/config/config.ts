const getBackendURL = (): string => {
    return import.meta.env.VITE_API_URL || "http://localhost:3000"; // Default URL if none is set
  };
  
  export default getBackendURL;