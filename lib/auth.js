/**
 * Authentication middleware for API requests
 */

// Initialize token from localStorage if available (client-side only)
let accessToken = ""

// Initialize token if in browser environment
if (typeof window !== "undefined") {
  const storedToken = localStorage.getItem("access_token")
  if (storedToken) {
    accessToken = storedToken
  } else {
    accessToken = "20|mneFnA4Bavoy1clb7inRui1oqnIDZsTZuypx2X0laac54a13" // Fallback token
  }
}

// Base API URL
const API_BASE_URL = "https://api.inficurex.com/api/v1"

/**
 * Make an authenticated API request
 * @param {string} endpoint - API endpoint (without the base URL)
 * @param {Object} options - Fetch options
 * @returns {Promise<any>} - JSON response
 */
export async function apiRequest(endpoint, options = {}) {
  // Ensure we have headers object
  if (!options.headers) {
    options.headers = {}
  }

  // Add authorization header
  options.headers = {
    ...options.headers,
    Authorization: `Bearer ${accessToken}`,
    "Content-Type": "application/json",
    Accept: "application/json",
  }

  // Build the full URL
  const url = `${API_BASE_URL}${endpoint.startsWith("/") ? endpoint : "/" + endpoint}`

  try {
    // Make the request
    const response = await fetch(url, options)

    // Check if the response is OK
    if (!response.ok) {
      // Handle different error types
      if (response.status === 401) {
        throw new Error("Authentication failed: Invalid or expired token")
      } else {
        const errorText = await response.text()
        throw new Error(`API request failed with status: ${response.status}, ${errorText}`)
      }
    }

    // Parse and return the JSON response
    return await response.json()
  } catch (error) {
    console.error("API request error:", error)
    throw error
  }
}

/**
 * Update the access token
 * @param {string} newToken - The new access token
 */
export function setAccessToken(newToken) {
  accessToken = newToken

  // Store in localStorage for persistence
  if (typeof window !== "undefined") {
    localStorage.setItem("access_token", newToken)
  }
}

/**
 * Get the current access token
 * @returns {string} - The current access token
 */
export function getAccessToken() {
  return accessToken
}

