import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import jsCookie from 'js-cookie';
import fetcher from '../axios';

interface User {
  name?: string;
  email?: string;
  avatar?: string;
}

interface AuthInfoStore {
  token?: string | null;
  user?: null | User;
  login: (token: string, user: User) => void;
  logout: () => void;
  updateUser: (user: User) => void;
}

const initialState = {
  user: null,
  token: null,
};

export const useAuthStore = create<AuthInfoStore>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      login: (token: string, user: User) => {
        jsCookie.set('token', token, { sameSite: 'strict' });
        set(() => ({ token: token, user }));
      },
      logout: () => {
        try {
          fetcher.post('/auth/logout');
        } catch (error) {}
        jsCookie.remove('token');
        set(initialState);
      },
      updateUser: (user: User) => set({ user }),
    }),
    { name: 'auth-store' }
  )
);
