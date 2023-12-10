// Obtener el estado de autenticación desde localStorage
export const isAuthenticated = () => {
  return localStorage.getItem('auth') === 'true';
};

// Iniciar sesión
export const login = () => {
  localStorage.setItem('auth', 'true');
};

// Cerrar sesión
export const logout = () => {
  localStorage.setItem('auth', 'false');
};
