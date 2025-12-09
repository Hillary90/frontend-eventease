import { API_BASE_URL } from "../config";

async function handleResponse(res) {
  const text = await res.text();
  try {
    return JSON.parse(text);
  } catch (e) {
    return text;
  }
}

export const registerUser = async (userData) => {
  const res = await fetch(`${API_BASE_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });
  if (!res.ok) throw await handleResponse(res);
  return handleResponse(res);
};

export const loginUser = async (userData) => {
  const res = await fetch(`${API_BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });
  if (!res.ok) throw await handleResponse(res);
  return handleResponse(res);
};

// If you use Firebase Google sign-in, pass the Firebase ID token here. If backend
// supports exchanging it for an app JWT, it'll be handled; otherwise we return
// a best-effort object with token and simple user info.
export const loginWithGoogleToken = async (idToken) => {
  // Send the Firebase ID token to the backend using the Authorization header.
  // Backend has a `GET /auth/me-firebase` endpoint which verifies the token.
  try {
    const res = await fetch(`${API_BASE_URL}/auth/me-firebase`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${idToken}`,
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) throw await handleResponse(res);
    const data = await handleResponse(res);
    // return user and token for the app to store
    return { user: data, token: idToken };
  } catch (err) {
    // If exchange fails, fallback to calling me-firebase (may be available)
    try {
      const res = await fetch(`${API_BASE_URL}/auth/me-firebase`, {
        method: "GET",
        headers: { Authorization: `Bearer ${idToken}` },
      });
      if (!res.ok) throw await handleResponse(res);
      const data = await handleResponse(res);
      return { user: data, token: idToken };
    } catch (e) {
      return { user: null, token: idToken };
    }
  }
};
