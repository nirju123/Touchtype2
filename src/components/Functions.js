export const isTokenExpired = (token) => {
    if (!token) {
      return true;
    }
  
    const tokenPayload = JSON.parse(atob(token.split('.')[1])); // Decode the token payload
    const expirationTime = tokenPayload.exp * 1000; // Convert expiration time from seconds to milliseconds
    const currentTime = Date.now(); // Get the current time in milliseconds
  
    return currentTime >= expirationTime; // Check if the current time is greater than or equal to the expiration time
  };

  