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
  // try exchanging with backend if available
  try {
    const res = await fetch(`${API_BASE_URL}/auth/google`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ idToken }),
    });
    if (!res.ok) throw await handleResponse(res);
    return handleResponse(res);
  } catch (err) {
    // fallback: return the firebase idToken as token and minimal user info
    return { user: null, token: idToken };
  }
};
