import { ref, computed } from "vue";
import { login, register, logout } from "../api/auth";

const user = ref(JSON.parse(localStorage.getItem("user")) || null);

export function useAuth() {
  const isAuthenticated = computed(() => !!user.value);

  const loginUser = async (credentials, callback) => {
    try {
      const data = await login(credentials);
      user.value = data;
      localStorage.setItem("user", JSON.stringify(data));
      if (callback) callback(null, data);
    } catch (error) {
      if (callback) callback(error, null);
    }
  };

  const registerUser = async (userData, callback) => {
    try {
        const data = await register(userData); 
        user.value = data;
        localStorage.setItem("user", JSON.stringify(data)); 
        if (callback) callback(null, data); 
    } catch (error) {
        if (callback) callback(error, null);
    }
    };

  const logoutUser = () => {
    logout();
    user.value = null;
  };

  return { user, isAuthenticated, loginUser, registerUser, logoutUser };
}
