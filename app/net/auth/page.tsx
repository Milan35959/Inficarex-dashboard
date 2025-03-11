// net/auth.js

export async function fetchWithAuth(endpoint, options = {}) {
    const API_BASE_URL = "https://api.inficurex.com/api/v1"; // Your API root URL
    const accessToken = "9|MtjQnisozL58VBIMpSEUsYh8BfqvNWUPDcfIJ2KOdb4148f5"; // Your token
  
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: options.method || "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${accessToken}`,
          ...options.headers, // Any extra headers you want to pass
        },
        body: options.body ? JSON.stringify(options.body) : null,
      });
  
      // If response isn't ok, throw error to be handled
      if (!response.ok) {
        const errorText = await response.text(); // Get the error message
        throw new Error(`HTTP ${response.status}: ${errorText}`);
      }
  
      // Try parsing as JSON
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("API fetch error:", error.message);
      throw error;
    }
  }
  