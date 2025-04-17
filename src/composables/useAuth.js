import { ref, computed } from "vue";
import { login, register, logout } from "../api/auth";

const user = ref(getStoredUser());

function getStoredUser() {
  return JSON.parse(localStorage.getItem("user")) || null;
}

function saveUser(data) {
  user.value = data;
  localStorage.setItem("user", JSON.stringify(data));
}

function clearUser() {
  user.value = null;
  localStorage.removeItem("user");
}

async function authenticate(action, payload, callback) {
  try {
    const data = await action(payload);
    saveUser(data);
    callback?.(null, data);
  } catch (error) {
    callback?.(error, null);
  }
}

function loginUser(credentials, callback) {
  return authenticate(login, credentials, callback);
}

function registerUser(userData, callback) {
  return authenticate(register, userData, callback);
}

function logoutUser() {
  logout();
  clearUser();
}

const isAuthenticated = computed(() => !!user.value);

export function useAuth() {
  return {
    user,
    isAuthenticated,
    loginUser,
    registerUser,
    logoutUser,
  };
}
