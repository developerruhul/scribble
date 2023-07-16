import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import jwt_decode from 'jwt-decode';
import jsCookie from 'js-cookie';

interface User {
  name?: string;
  email?: string;
  avatar?: string;
}

interface AuthInfoStore {
  jwt?: string | null;
  user?: null | User;
  login: (jwt: string) => void;
  logout: () => void;
  updateUser: (user: User) => void;
}

const initialState = {
  user: null,
  jwt: null,
};

export const useAuthStore = create<AuthInfoStore>()(
  persist(
    (set) => ({
      jwt: null,
      user: null,
      login: (jwt: string) => {
        jsCookie.set('jwt', jwt, { sameSite: 'strict' });
        set(() => ({ jwt, user: jwt_decode(jwt) }));
      },
      logout: () => {
        jsCookie.remove('jwt');
        set(initialState);
      },
      updateUser: (user: User) => set({ user }),
    }),
    { name: 'auth-store' }
  )
);
