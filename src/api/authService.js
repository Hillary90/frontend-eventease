import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";

const auth = getAuth();
const provider = new GoogleAuthProvider();

const TOKEN_KEY = "jwt_token";

export const authService = {
  async register(email, password) {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const token = await userCredential.user.getIdToken();
    localStorage.setItem(TOKEN_KEY, token);

    return {
      user: userCredential.user,
      token,
    };
  },

  async login(email, password) {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const token = await userCredential.user.getIdToken();
    localStorage.setItem(TOKEN_KEY, token);

    return {
      user: userCredential.user,
      token,
    };
  },

  async loginWithGoogle() {
    const result = await signInWithPopup(auth, provider);
    const token = await result.user.getIdToken();
    localStorage.setItem(TOKEN_KEY, token);

    return {
      user: result.user,
      token,
    };
  },

  async logout() {
    await signOut(auth);
    localStorage.removeItem(TOKEN_KEY);
  },

  getToken() {
    return localStorage.getItem(TOKEN_KEY);
  },
};
