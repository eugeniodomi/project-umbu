export const auth = {
  isAuthenticated: (): boolean => {
    try {
      const token = localStorage.getItem('auth_token');
      return !!token;
    } catch (e) { return false; }
  },
  login: (token: string) => {
    localStorage.setItem('auth_token', token);
    (window as any).__auth_state = { logged: true, token };
  },
  logout: () => {
    localStorage.removeItem('auth_token');
    (window as any).__auth_state = { logged: false };
  }
};
