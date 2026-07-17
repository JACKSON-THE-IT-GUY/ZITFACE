// ========================================================
// CENTRAL AUTHENTICATION API ROUTER SERVICE
// ========================================================

/**
 * Dispatches verified credentials over the local Vite dev proxy channel
 * @param {Object} credentials - Contains targeted { email, password } strings
 */
export const login = async (credentials) => {
  console.log("--> API ACTION: Deserializing authentication body dispatch...", credentials);

  try {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(credentials),
    });

    // 1. Intercept and assert the response status header code
    console.log(`--> API RESPONSE: HTTP Status Flag intercepted as [${response.status}]`);

    // 2. Read response as text stream FIRST to shield engine from JSON parse crashes
    const responseText = await response.text();
    console.log("--> API RESPONSE: Raw string buffer context received:", responseText);

    // 3. Handle bad gateway, timeout, or route endpoint failure cases
    if (!response.ok) {
      let errorMessage = `Server error code ${response.status}`;
      try {
        // Attempt to extract systematic validation errors if present
        if (responseText) {
          const parsedError = JSON.parse(responseText);
          errorMessage = parsedError.message || errorMessage;
        }
      } catch (parseFail) {
        // If it isn't valid JSON, fallback to standard error string text
        errorMessage = responseText || errorMessage;
      }
      throw new Error(errorMessage);
    }

    // 4. Assert protection against blank response frames
    if (!responseText || responseText.trim() === "") {
      throw new Error("The server acknowledged the routing channel but delivered an empty body response.");
    }

    // 5. Safe parsing execution path guaranteed
    const data = JSON.parse(responseText);
    
    // Save token if delivered successfully
    if (data.token) {
      localStorage.setItem('token', data.token);
    }

    return data;

  } catch (error) {
    console.error("--> CRITICAL API OPERATION EXCEPTION INTERCEPTED:", error.message);
    throw error; // Bubble error directly up to your Login page UI error state handler
  }
};

/**
 * Dispatches account registration payload profiles
 */
export const register = async (userData) => {
  try {
    const response = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });

    const responseText = await response.text();
    if (!response.ok) {
      let msg = `Registration error [${response.status}]`;
      try { if (responseText) msg = JSON.parse(responseText).message || msg; } catch(e) {}
      throw new Error(msg);
    }

    const data = JSON.parse(responseText);
    if (data.token) localStorage.setItem('token', data.token);
    return data;
  } catch (error) {
    console.error("--> REGISTRATION API ERROR:", error.message);
    throw error;
  }
};